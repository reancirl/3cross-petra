<?php

namespace App\Enums;

/**
 * Lifecycle of a message thread.
 *
 * Only a broker can close a thread. Closing is not archival — a closed thread
 * reopens automatically the moment anyone posts to it (see Thread::recordMessage),
 * so "closed" means "we consider this handled", never "no further replies".
 */
enum ThreadStatus: string
{
    case Open = 'open';
    case Closed = 'closed';

    public function label(): string
    {
        return match ($this) {
            self::Open => 'Open',
            self::Closed => 'Closed',
        };
    }

    /**
     * Badge tone, matching the vocabulary the portal StatusBadge already uses.
     */
    public function tone(): string
    {
        return match ($this) {
            self::Open => 'success',
            self::Closed => 'muted',
        };
    }
}
