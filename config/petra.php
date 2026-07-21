<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Broker Notification Recipient
    |--------------------------------------------------------------------------
    |
    | Where customer-side portal messages are emailed. Brokers are staff and share
    | one inbox rather than each holding a personal thread subscription, so this is
    | a single address or distribution list, not a per-user lookup. Delivered with
    | an on-demand notifiable (Mail::to on a bare address) since the recipient is
    | not necessarily a User row.
    |
    | Falls back to MAIL_FROM_ADDRESS so a misconfigured environment still delivers
    | somewhere a human looks, rather than throwing mid-request when a customer
    | posts a message. Note that both are read from the environment: the Docker
    | image ships no .env, so anything not passed through docker-compose.yml
    | resolves to null here.
    |
    | If it does resolve to null, ThreadNotifier logs a warning rather than failing
    | quietly — a support inbox that drops customer messages without a trace is
    | worse than one that errors.
    |
    */

    'broker_notification_email' => env('BROKER_NOTIFICATION_EMAIL', env('MAIL_FROM_ADDRESS')),

    /*
    |--------------------------------------------------------------------------
    | Message Notification Batching
    |--------------------------------------------------------------------------
    |
    | Minutes to suppress further new-message emails to the same side of the same
    | thread. A broker firing off three quick replies should cost the customer one
    | email, not three. Tracked per side on threads.user_notified_at /
    | broker_notified_at.
    |
    */

    'message_notification_batch_minutes' => (int) env('MESSAGE_NOTIFICATION_BATCH_MINUTES', 10),

];
