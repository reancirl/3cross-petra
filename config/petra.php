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

    /*
    |--------------------------------------------------------------------------
    | Public Contact Details
    |--------------------------------------------------------------------------
    |
    | The phone, email, hours and service area shown beside the Talk to a Broker
    | form. Shared with every page as the `siteContact` Inertia prop so the copy
    | lives in one place instead of being typed into components.
    |
    | The defaults are the placeholders the content doc ships with — the client has
    | not supplied a real number yet. Anything still holding an X is treated as
    | unset by the UI, which renders it as plain text rather than a dead tel: link,
    | so a forgotten env var can never publish a broken "call us" affordance.
    |
    | Set PETRA_CONTACT_PHONE / _EMAIL / _HOURS_DAYS / _HOURS_TIME in the
    | environment before launch. The Docker image ships no .env, so anything not
    | passed through docker-compose.yml falls back to these defaults.
    |
    | Service area is a list, which does not express well in an env var, so it is
    | edited here. It is display copy, not the listing region vocabulary — those
    | are EquipmentSubmission::REGIONS and PublicLocationOptions.
    |
    */

    'contact' => [
        'phone' => env('PETRA_CONTACT_PHONE', '(307) XXX-XXXX'),
        'email' => env('PETRA_CONTACT_EMAIL', 'info@petraequipment.com'),
        'hours_days' => env('PETRA_CONTACT_HOURS_DAYS', 'Monday–Friday'),
        'hours_time' => env('PETRA_CONTACT_HOURS_TIME', '8:00 AM – 5:00 PM'),
        'service_area' => [
            'Wyoming Oilfields (Powder River, Jonah, Green River Basin)',
            'North Dakota (Bakken)',
            'Colorado Energy Corridors',
            'Utah & New Mexico Producing Regions',
            'Montana Industrial Yards',
            'Regional Surplus Equipment Yards & Private Sellers',
            'Surrounding Producing Regions',
        ],
    ],

];
