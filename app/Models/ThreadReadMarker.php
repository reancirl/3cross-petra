<?php

namespace App\Models;

use App\Enums\ThreadSide;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * How far one side has read into one thread. At most one row per (thread, side).
 *
 * This is private to the side that owns it. The spec rules out read receipts, so
 * nothing serializes a marker to the other party — a broker cannot tell whether a
 * customer has opened their reply, and vice versa.
 */
#[Fillable(['thread_id', 'side', 'last_read_message_id'])]
class ThreadReadMarker extends Model
{
    /**
     * @return BelongsTo<Thread, $this>
     */
    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class);
    }

    public function threadSide(): ThreadSide
    {
        return ThreadSide::from($this->side);
    }
}
