<?php

namespace App\Enums;

use App\Models\User;

/**
 * The two sides of every thread.
 *
 * This is a support-ticket model, not peer-to-peer chat: one side is always the
 * customer who owns the thread (buyer or seller), the other is always Petra. A
 * buyer and a seller can never be the two sides of the same thread.
 *
 * Used for both messages.sender_type and thread_read_markers.side — they carry
 * the same vocabulary and are deliberately one enum so a message's author and a
 * read marker's owner can be compared directly.
 */
enum ThreadSide: string
{
    case User = 'user';
    case Broker = 'broker';

    /**
     * The side a given user acts as. Brokers are staff and always act as Petra,
     * on every thread; everyone else only ever acts as the user side of their own.
     */
    public static function forUser(User $user): self
    {
        return $user->user_type === User::TYPE_BROKER ? self::Broker : self::User;
    }

    /**
     * The side that should be notified about a message from this one.
     */
    public function opposite(): self
    {
        return match ($this) {
            self::User => self::Broker,
            self::Broker => self::User,
        };
    }

    /**
     * How this side is credited to customers. Individual brokers are never named
     * publicly — the customer's counterparty is always "Petra" — while the real
     * sender_id is still stored for internal attribution.
     */
    public function publicSenderName(?string $userName): string
    {
        return match ($this) {
            self::Broker => 'Petra',
            self::User => $userName ?? 'You',
        };
    }
}
