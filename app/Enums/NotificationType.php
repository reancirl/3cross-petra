<?php

namespace App\Enums;

use App\Models\User;

/**
 * The kinds of event that surface in the in-app notification feed.
 *
 * One case per existing domain event that already had, or should have, an outward
 * signal. Two of them (NewMessage, DocumentShared) also send an email — those are the
 * events that had a Mailable before this feed existed, and App\Support\Notifier fires
 * the email alongside the in-app row so one event still produces one email. The other
 * five had no signal at all; the in-app notification is their only output.
 *
 * Each case knows who it is for. Customer-facing events (a seller's listing published, a
 * buyer's request advanced, a message or a document addressed to one person) go to that
 * one User. Broker-facing events (a submission, a request or an inquiry arriving in a
 * queue) go to the shared broker feed, which is why they carry no recipient user.
 */
enum NotificationType: string
{
    // Customer-facing.
    case ListingStatus = 'listing_status';
    case RequestStatus = 'request_status';
    case NewMessage = 'new_message';
    case DocumentShared = 'document_shared';

    // Broker-facing (shared feed).
    case NewSubmission = 'new_submission';
    case NewRequest = 'new_request';
    case NewInquiry = 'new_inquiry';

    /**
     * Which side of the portal this event is addressed to. Broker-facing events land in
     * the shared feed (recipient_type = broker, no recipient user); everything else is
     * for a single customer.
     */
    public function recipientType(): NotificationRecipientType
    {
        return match ($this) {
            self::NewSubmission, self::NewRequest, self::NewInquiry => NotificationRecipientType::Broker,
            default => NotificationRecipientType::User,
        };
    }

    /**
     * The sidebar/feed icon glyph, matching the PortalNavIcon name vocabulary the React
     * side already knows. Rendered by the notification row, not the nav, but reusing the
     * same set keeps one icon language across the portal.
     */
    public function icon(): string
    {
        return match ($this) {
            self::ListingStatus, self::NewSubmission => 'equipment',
            self::RequestStatus, self::NewRequest => 'quotes',
            self::NewMessage => 'messages',
            self::DocumentShared => 'documents',
            self::NewInquiry => 'leads',
        };
    }

    /**
     * Whether this event also sends an email today. The two that do keep their existing
     * Mailable; the dispatcher reuses it rather than duplicating the send.
     */
    public function alsoEmails(): bool
    {
        return $this === self::NewMessage || $this === self::DocumentShared;
    }
}
