<?php

namespace App\Models;

use App\Enums\NotificationRecipientType;
use App\Enums\NotificationType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * One row in the in-app notification feed.
 *
 * A customer row (recipient_type = user) is owned by one User and read by them alone. A
 * broker row (recipient_type = broker, recipient_id null) is the shared broker feed:
 * one row every broker sees, its read_at shared between them — see the migration for why
 * that is the consistent choice rather than a per-broker reads table.
 *
 * The row never resolves its subject through Eloquent. subject_type / subject_id exist
 * only to build a deep link, and two of the five subject vocabularies ('thread',
 * 'document', 'broker_inquiry') are not even in the morph map. deepLinkFor is the whole
 * resolution story.
 */
#[Fillable([
    'recipient_type',
    'recipient_id',
    'type',
    'subject_type',
    'subject_id',
    'title',
    'read_at',
])]
class Notification extends Model
{
    use Prunable;

    /**
     * Retention window. Rows older than this are deleted by the daily model:prune
     * schedule (routes/console.php) — 90 days per the spec.
     */
    public const RETENTION_DAYS = 90;

    /**
     * The feed page size. Newest first, 20 to a page.
     */
    public const PER_PAGE = 20;

    /**
     * @return Builder<Notification>
     */
    public function prunable(): Builder
    {
        return static::query()->where('created_at', '<', now()->subDays(self::RETENTION_DAYS));
    }

    public function recipient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function notificationType(): NotificationType
    {
        return NotificationType::from($this->type);
    }

    public function isRead(): bool
    {
        return $this->read_at !== null;
    }

    /**
     * Everything addressed to this user's feed. A broker reads the shared broker feed; a
     * customer reads only their own rows. This is the whole authorization boundary — a
     * buyer can never scope into a seller's notifications because recipient_id is pinned
     * to their own id here.
     *
     * @param  Builder<Notification>  $query
     * @return Builder<Notification>
     */
    public function scopeForRecipient(Builder $query, User $user): Builder
    {
        if ($user->isBroker()) {
            return $query->where('recipient_type', NotificationRecipientType::Broker->value);
        }

        return $query
            ->where('recipient_type', NotificationRecipientType::User->value)
            ->where('recipient_id', $user->id);
    }

    /**
     * The unread badge count, integrated into the same shared-prop poll as messages and
     * documents (HandleInertiaRequests) rather than a second loop.
     */
    public static function unreadCountFor(User $user): int
    {
        return static::query()
            ->forRecipient($user)
            ->whereNull('read_at')
            ->count();
    }

    public function markRead(): void
    {
        if ($this->read_at === null) {
            $this->forceFill(['read_at' => now()])->save();
        }
    }

    /**
     * Where clicking this notification takes the reader. Resolved from the type and the
     * subject pair against the reader's portal, because the same subject deep-links to a
     * different screen for a customer than for a broker (a thread is /seller/messages/12
     * for its owner, /broker/inbox/12 for staff).
     */
    public function deepLinkFor(User $user): string
    {
        $type = $this->notificationType();
        $id = $this->subject_id;
        $portal = $user->user_type;

        return match ($type) {
            NotificationType::ListingStatus => "/{$portal}/listings/{$id}",
            NotificationType::RequestStatus => "/{$portal}/requests",
            NotificationType::NewMessage => $user->isBroker()
                ? "/broker/inbox/{$id}"
                : "/{$portal}/messages/{$id}",
            // The Documents hub is grouped by subject; the hash targets the group's
            // section (see Pages/Portal/Documents anchor ids). subject_type/_id here are
            // the document's subject, not the document, precisely so this resolves.
            NotificationType::DocumentShared => "/{$portal}/documents#doc-{$this->subject_type}-{$id}",
            NotificationType::NewSubmission => '/broker/submissions',
            NotificationType::NewRequest => '/broker/requests',
            NotificationType::NewInquiry => '/broker/leads',
        };
    }

    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
        ];
    }
}
