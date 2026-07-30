<?php

namespace App\Enums;

/**
 * Who a notification is addressed to.
 *
 * User rows carry a recipient_id (the one customer). Broker rows do not — the broker
 * feed is shared, exactly like the message inbox, so a broker notification is a single
 * row every broker sees rather than one row per staff account. Read state on a broker
 * row is therefore shared too (the row's own read_at), which mirrors how
 * thread_read_markers keys broker read state on the side rather than the user.
 */
enum NotificationRecipientType: string
{
    case User = 'user';
    case Broker = 'broker';
}
