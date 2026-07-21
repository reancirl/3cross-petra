<?php

namespace App\Models;

use App\Enums\ThreadSide;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * One message in a thread. Append-only — nothing in the app updates or deletes
 * these rows, and no route exists to do so.
 */
#[Fillable(['thread_id', 'sender_type', 'sender_id', 'body'])]
class Message extends Model
{
    /**
     * @return BelongsTo<Thread, $this>
     */
    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class);
    }

    /**
     * The real author, including for broker messages. Customers never see this —
     * they see "Petra" — but internal attribution needs it.
     *
     * @return BelongsTo<User, $this>
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * @return HasMany<MessageAttachment, $this>
     */
    public function attachments(): HasMany
    {
        return $this->hasMany(MessageAttachment::class);
    }

    public function side(): ThreadSide
    {
        return ThreadSide::from($this->sender_type);
    }

    public function isFromBroker(): bool
    {
        return $this->side() === ThreadSide::Broker;
    }

    /**
     * How this message's author is credited to a customer. Individual brokers are
     * never named; the customer's counterparty is always Petra.
     */
    public function publicSenderName(): string
    {
        return $this->isFromBroker()
            ? 'Petra'
            : ($this->sender?->name ?? 'Customer');
    }

    /**
     * Plain-text preview for thread lists and email bodies. Attachment-only
     * messages have no body, so they describe themselves instead of rendering
     * as an empty row.
     */
    public function snippet(int $length = 200): string
    {
        $body = trim((string) $this->body);

        if ($body !== '') {
            return Str::limit(Str::squish($body), $length);
        }

        $count = $this->attachments_count ?? $this->attachments->count();

        return $count === 1 ? 'Sent an attachment' : "Sent {$count} attachments";
    }
}
