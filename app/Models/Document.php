<?php

namespace App\Models;

use App\Enums\DocumentVisibility;
use App\Enums\ThreadSubjectType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

/**
 * A file attached to a listing or a buyer request.
 *
 * Append-only. Nothing deletes or replaces a document in v1 — a broker retires one by
 * archiving it, which hides it from customers while leaving it in the broker's view.
 * That is deliberate: a customer who was shown a valuation should be able to point at
 * it later, and a store that can quietly rewrite itself cannot support that.
 */
#[Fillable([
    'subject_type',
    'subject_id',
    'uploaded_by_type',
    'uploaded_by_id',
    'shared_with_user_id',
    'visibility',
    'disk',
    'file_path',
    'original_name',
    'mime',
    'size',
])]
class Document extends Model
{
    public const UPLOADER_USER = 'user';

    public const UPLOADER_BROKER = 'broker';

    /**
     * Types a broker may upload. The same list message attachments accept, plus the
     * office formats a deal actually runs on — a bill of sale arrives as a .docx far
     * more often than the messaging build's photo-and-PDF assumption allowed for.
     */
    public const ALLOWED_EXTENSIONS = [
        'jpg', 'jpeg', 'png', 'webp', 'heic', 'heif',
        'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt',
    ];

    public const MAX_SIZE_KB = 20480;

    public const MAX_PER_UPLOAD = 8;

    /**
     * Mimes the UI may render inline. The brief allows images only; a PDF opens or
     * downloads natively in the browser rather than getting a preview pane here.
     */
    public const PREVIEWABLE_MIMES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif',
    ];

    /**
     * The listing or buyer request this document hangs off. Resolved through the same
     * morph map threads use (AppServiceProvider), so subject_type stores 'listing' /
     * 'buyer_request' rather than a class name.
     *
     * @return MorphTo<Model, $this>
     */
    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function sharedWithUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'shared_with_user_id');
    }

    /**
     * @return HasMany<DownloadLog, $this>
     */
    public function downloadLogs(): HasMany
    {
        return $this->hasMany(DownloadLog::class);
    }

    /**
     * Documents a given user may read. The single authorization seam for this feature.
     *
     * Every read path — the hub, the broker panel, the download endpoint — queries
     * through here rather than fetching by id and checking afterwards, so a new
     * endpoint cannot forget the check. Thread::scopeVisibleTo sets the precedent.
     *
     * Brokers are staff and see everything, archived included. For everyone else a
     * document is visible when any one of these holds:
     *
     *   1. They uploaded it. A seller never loses sight of their own submission files,
     *      whatever the broker later sets the visibility to.
     *   2. It was shared with them by name.
     *   3. It is public on a listing they are connected to — one they own, one they
     *      raised a quote inquiry on, or one they have a message thread about. Public
     *      here means "published with the listing", not "readable by the whole portal":
     *      a buyer with no relationship to a listing gets nothing, which is why this is
     *      a subject-connection test rather than a bare visibility check.
     *
     * Archived documents drop out for all three.
     *
     * @param  Builder<Document>  $query
     * @return Builder<Document>
     */
    public function scopeVisibleTo(Builder $query, ?User $user): Builder
    {
        if ($user?->isBroker() === true) {
            return $query;
        }

        if ($user === null) {
            // Guests reach documents only through the public marketplace route, which
            // additionally proves the listing itself is publicly visible.
            return $query->whereNull('archived_at')->whereRaw('1 = 0');
        }

        return $query
            ->whereNull('archived_at')
            ->where(function (Builder $visible) use ($user): void {
                $visible
                    ->where(function (Builder $own) use ($user): void {
                        $own->where('uploaded_by_type', self::UPLOADER_USER)
                            ->where('uploaded_by_id', $user->id);
                    })
                    ->orWhere(function (Builder $shared) use ($user): void {
                        $shared->where('visibility', DocumentVisibility::SharedUser->value)
                            ->where('shared_with_user_id', $user->id);
                    })
                    ->orWhere(function (Builder $public) use ($user): void {
                        $public->where('visibility', DocumentVisibility::PublicListing->value)
                            ->where('subject_type', ThreadSubjectType::Listing->value)
                            ->whereIn('subject_id', self::connectedListingIds($user));
                    });
            });
    }

    /**
     * Listings a customer has a relationship with, for the public-document rule above.
     *
     * A subquery per source rather than one clever join: the three relationships are
     * genuinely unrelated (ownership, a quote inquiry, a conversation) and expressing
     * them separately keeps each one readable and independently correct. Returned as a
     * query builder so the ids never round-trip through PHP.
     */
    private static function connectedListingIds(User $user): QueryBuilder
    {
        $owned = DB::table('equipment_submissions')
            ->select('id')
            ->where('user_id', $user->id);

        $inquiredOn = DB::table('equipment_requests')
            ->select('equipment_submission_id')
            ->where('user_id', $user->id)
            ->whereNotNull('equipment_submission_id');

        $threadedOn = DB::table('threads')
            ->select('subject_id')
            ->where('user_id', $user->id)
            ->where('subject_type', ThreadSubjectType::Listing->value);

        return $owned->union($inquiredOn)->union($threadedOn);
    }

    /**
     * @param  Builder<Document>  $query
     * @return Builder<Document>
     */
    public function scopeForSubject(Builder $query, string $subjectType, int $subjectId): Builder
    {
        return $query->where('subject_type', $subjectType)->where('subject_id', $subjectId);
    }

    /**
     * Documents published with a listing, for the public marketplace detail page.
     *
     * @param  Builder<Document>  $query
     * @return Builder<Document>
     */
    public function scopePublicOnListing(Builder $query, int $listingId): Builder
    {
        return $query
            ->whereNull('archived_at')
            ->where('visibility', DocumentVisibility::PublicListing->value)
            ->forSubject(ThreadSubjectType::Listing->value, $listingId);
    }

    /**
     * Not a cast, and not named visibility(): the column is read raw in queries and an
     * enum cast on a column this scope filters by hands the query builder an object.
     * Same reasoning as EquipmentSubmission::listingStatus.
     */
    public function documentVisibility(): DocumentVisibility
    {
        return $this->visibility instanceof DocumentVisibility
            ? $this->visibility
            : (DocumentVisibility::tryFrom((string) $this->visibility) ?? DocumentVisibility::PrivateBroker);
    }

    public function subjectType(): ThreadSubjectType
    {
        return ThreadSubjectType::from($this->subject_type);
    }

    public function isArchived(): bool
    {
        return $this->archived_at !== null;
    }

    public function isFromBroker(): bool
    {
        return $this->uploaded_by_type === self::UPLOADER_BROKER;
    }

    public function isPreviewable(): bool
    {
        return in_array($this->mime, self::PREVIEWABLE_MIMES, true);
    }

    /**
     * Whether the bytes are still there. Rows outlive their files — anything written
     * before storage/app became a persisted volume was destroyed on the next container
     * rebuild, and the messaging screens already learned to say so plainly rather than
     * hand the reader a broken link.
     */
    public function fileExists(): bool
    {
        return Storage::disk($this->disk)->exists($this->file_path);
    }

    /**
     * Hide from customers without losing the record. There is no unarchive in v1 for
     * the same reason there is no delete: the hub is a record of what was exchanged.
     */
    public function archive(): void
    {
        if ($this->archived_at === null) {
            $this->forceFill(['archived_at' => now()])->save();
        }
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'size' => 'integer',
            'archived_at' => 'datetime',
        ];
    }
}
