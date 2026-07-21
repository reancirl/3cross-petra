<?php

namespace App\Models;

use App\Enums\ThreadSide;
use App\Enums\ThreadStatus;
use App\Enums\ThreadSubjectType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * A subject-anchored support conversation between one customer and Petra.
 *
 * Threads are never peer-to-peer. Exactly one customer (user_id) sits on the user
 * side; every broker shares the broker side and speaks as "Petra". A buyer and a
 * seller therefore have no way to reach each other — there is no thread shape that
 * would let them.
 */
#[Fillable(['subject_type', 'subject_id', 'user_id', 'status'])]
class Thread extends Model
{
    protected $attributes = [
        'status' => ThreadStatus::Open->value,
    ];

    /**
     * The listing or buyer request this thread is about.
     *
     * Resolved through the morph map registered in AppServiceProvider, so
     * subject_type stores 'listing' / 'buyer_request' rather than a class name.
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
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return HasMany<Message, $this>
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    /**
     * The newest message, for thread-list snippets. A separate HasOne rather than
     * messages()->latest()->first() so inbox queries can eager-load it in one go
     * instead of one query per thread.
     *
     * @return HasOne<Message, $this>
     */
    public function latestMessage(): HasOne
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }

    /**
     * @return HasMany<ThreadReadMarker, $this>
     */
    public function readMarkers(): HasMany
    {
        return $this->hasMany(ThreadReadMarker::class);
    }

    /**
     * Threads a given user is allowed to see.
     *
     * This is the single authorization seam for reads. Brokers are staff and see
     * every thread; everyone else is restricted to their own rows. Controllers
     * query through this rather than fetching by id and checking afterwards, so a
     * new endpoint cannot forget the check — the codebase already learned that
     * lesson with route-model binding on seller listings.
     *
     * @param  Builder<Thread>  $query
     * @return Builder<Thread>
     */
    public function scopeVisibleTo(Builder $query, User $user): Builder
    {
        if ($user->user_type === User::TYPE_BROKER) {
            return $query;
        }

        return $query->where('threads.user_id', $user->id);
    }

    /**
     * Threads carrying at least one message the given side has not read.
     *
     * Expressed as a correlated EXISTS rather than a join so a thread is counted
     * once regardless of how many unread messages it holds — the nav badge counts
     * conversations, not messages. The coalesce covers a side that has never opened
     * the thread and therefore has no marker row yet.
     *
     * Written as raw SQL because Eloquent has no expression for "compare a column
     * against a correlated scalar subquery"; the syntax is portable across the
     * Postgres the app runs on and the SQLite the tests use.
     *
     * @param  Builder<Thread>  $query
     * @return Builder<Thread>
     */
    public function scopeHavingUnreadFor(Builder $query, ThreadSide $side): Builder
    {
        return $query->whereExists(function ($sub) use ($side): void {
            $sub->selectRaw('1')
                ->from('messages')
                ->whereColumn('messages.thread_id', 'threads.id')
                ->where('messages.sender_type', $side->opposite()->value)
                ->whereRaw(
                    'messages.id > coalesce((select last_read_message_id from thread_read_markers'
                    .' where thread_read_markers.thread_id = threads.id and thread_read_markers.side = ?), 0)',
                    [$side->value],
                );
        });
    }

    /**
     * The nav badge number: how many conversations are waiting on this user.
     */
    public static function unreadThreadCountFor(User $user): int
    {
        return static::query()
            ->visibleTo($user)
            ->havingUnreadFor(ThreadSide::forUser($user))
            ->count();
    }

    public function subjectType(): ThreadSubjectType
    {
        return ThreadSubjectType::from($this->subject_type);
    }

    /**
     * Not a cast: morphTo reads subject_type raw to resolve the morph map, and an
     * enum cast would hand it an object instead of the alias string.
     */
    public function threadStatus(): ThreadStatus
    {
        return ThreadStatus::from($this->status);
    }

    public function isClosed(): bool
    {
        return $this->threadStatus() === ThreadStatus::Closed;
    }

    /**
     * Messages the given side has not read yet.
     *
     * A side's own messages never count as unread for that side — the read marker
     * only moves when someone opens the thread, so without this exclusion sending
     * a message would leave you with an unread badge for your own words.
     */
    public function unreadCountFor(ThreadSide $side): int
    {
        return $this->messages()
            ->where('sender_type', '!=', $side->value)
            ->where('id', '>', $this->lastReadMessageIdFor($side) ?? 0)
            ->count();
    }

    public function lastReadMessageIdFor(ThreadSide $side): ?int
    {
        return $this->readMarkers
            ->firstWhere('side', $side->value)?->last_read_message_id;
    }

    /**
     * Move a side's high-water mark to the newest message in the thread.
     *
     * updateOrCreate against the (thread_id, side) unique index, so concurrent
     * marks from two tabs collapse into one row instead of racing.
     */
    public function markReadFor(ThreadSide $side): void
    {
        $latestId = $this->messages()->max('id');

        if ($latestId === null) {
            return;
        }

        $this->readMarkers()->updateOrCreate(
            ['side' => $side->value],
            ['last_read_message_id' => $latestId],
        );

        $this->unsetRelation('readMarkers');
    }

    /**
     * Bump activity for a newly posted message, reopening the thread if a broker
     * had closed it. Closing means "we consider this handled", so any new message
     * — from either side — makes that untrue.
     */
    public function recordMessage(Message $message): void
    {
        $this->forceFill([
            'last_message_at' => $message->created_at,
            'status' => ThreadStatus::Open->value,
        ])->save();
    }

    /**
     * Whether an email may be sent to this side now, or whether one went out
     * inside the batching window and this notification should be suppressed.
     */
    public function shouldNotify(ThreadSide $side, int $withinMinutes): bool
    {
        $sentAt = $side === ThreadSide::User
            ? $this->user_notified_at
            : $this->broker_notified_at;

        return $sentAt === null || $sentAt->lt(now()->subMinutes($withinMinutes));
    }

    public function markNotified(ThreadSide $side): void
    {
        $this->forceFill([
            $side === ThreadSide::User ? 'user_notified_at' : 'broker_notified_at' => now(),
        ])->save();
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'last_message_at' => 'datetime',
            'user_notified_at' => 'datetime',
            'broker_notified_at' => 'datetime',
        ];
    }
}
