<?php

namespace App\Support;

use App\Enums\ThreadSide;
use App\Enums\ThreadSubjectType;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use App\Models\Message;
use App\Models\MessageAttachment;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

/**
 * The single place threads, messages, and their subjects become JSON.
 *
 * Modelled on PublicListingPresenter: centralising serialization is what keeps a
 * leak from being one forgotten field in one controller. Two rules live here and
 * nowhere else:
 *
 *  1. A broker's identity is never sent to a customer. Broker messages serialize
 *     with author "Petra"; sender_id stays server-side.
 *  2. Read markers are never serialized to the opposite side — the spec rules out
 *     read receipts, so neither party can see the other's marker.
 */
class ThreadPresenter
{
    /**
     * A row in a thread list, for either side.
     *
     * @return array<string, mixed>
     */
    public static function summary(Thread $thread, ThreadSide $viewerSide): array
    {
        $latest = $thread->latestMessage;

        return [
            'id' => $thread->id,
            'url' => self::urlFor($thread, $viewerSide),
            'subjectType' => $thread->subject_type,
            'subjectTypeLabel' => $thread->subjectType()->label(),
            'subjectTitle' => self::subjectTitle($thread),
            'subjectStatus' => self::subjectStatus($thread),
            'status' => $thread->status,
            'statusLabel' => $thread->threadStatus()->label(),
            'isClosed' => $thread->isClosed(),
            'snippet' => $latest?->snippet(120) ?? 'No messages yet',
            'lastMessageAt' => $thread->last_message_at?->toIso8601String(),
            'lastMessageFrom' => $latest?->sender_type,
            'unreadCount' => $thread->unreadCountFor($viewerSide),
        ];
    }

    /**
     * A thread list row as the broker inbox needs it — adds who the customer is.
     * Only ever sent to brokers.
     *
     * @return array<string, mixed>
     */
    public static function inboxSummary(Thread $thread): array
    {
        return self::summary($thread, ThreadSide::Broker) + [
            'userName' => $thread->user?->name ?? 'Unknown',
            'userRole' => $thread->user?->userTypeLabel() ?? 'Unknown',
            'userType' => $thread->user?->user_type,
        ];
    }

    /**
     * One message bubble.
     *
     * `mine` drives left/right alignment, so it is computed against the viewer's
     * side rather than a user id: every broker sees all Petra messages as theirs,
     * which is correct — Petra is one voice, not a set of individuals.
     *
     * @return array<string, mixed>
     */
    public static function message(Message $message, ThreadSide $viewerSide): array
    {
        return [
            'id' => $message->id,
            'body' => $message->body,
            'senderType' => $message->sender_type,
            'authorName' => $message->publicSenderName(),
            'mine' => $message->sender_type === $viewerSide->value,
            'createdAt' => $message->created_at->toIso8601String(),
            'attachments' => $message->attachments
                ->map(fn ($attachment): array => self::attachment($attachment))
                ->values()
                ->all(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function attachment(MessageAttachment $attachment): array
    {
        // Whether the bytes are still there. Rows can outlive their file — anything
        // uploaded before storage/app became a persisted volume was destroyed on the
        // next container rebuild. Reporting it lets the UI say so plainly instead of
        // rendering a broken-image icon and leaving the reader to guess.
        $available = Storage::disk('local')->exists($attachment->file_path);

        return [
            'id' => $attachment->id,
            'name' => $attachment->name,
            'mime' => $attachment->mime,
            'size' => $attachment->size,
            'isImage' => $attachment->isPreviewable(),
            'available' => $available,
            // A route, not a stored URL: the file is on the private disk and only
            // this endpoint may hand it out, after checking thread access.
            'url' => route('messages.attachments.show', $attachment),
        ];
    }

    /**
     * The broker context panel — everything about the subject worth seeing without
     * leaving the inbox, plus a link to its full page.
     *
     * Broker-only by construction: it deliberately includes seller-private fields
     * (asking price, condition notes) that PublicListingPresenter strips for buyers.
     *
     * @return array<string, mixed>
     */
    public static function brokerContext(Thread $thread): array
    {
        $subject = $thread->subject;

        if ($subject instanceof EquipmentSubmission) {
            return [
                'kind' => ThreadSubjectType::Listing->value,
                'title' => $subject->title,
                'statusLabel' => $subject->statusLabel(),
                'statusTone' => $subject->listingStatus()->tone(),
                'region' => $subject->city ? "{$subject->region} — {$subject->city}" : $subject->region,
                'condition' => $subject->conditionLabel(),
                'conditionNotes' => $subject->condition_notes,
                'category' => $subject->category,
                'publicId' => $subject->public_id,
                'askingPrice' => $subject->asking_price,
                'needsValuation' => (bool) $subject->needs_valuation,
                'photos' => collect($subject->photos ?? [])
                    ->map(fn (array $photo): array => [
                        'name' => $photo['name'] ?? 'Photo',
                        'url' => $photo['url'] ?? null,
                    ])
                    ->filter(fn (array $photo): bool => $photo['url'] !== null)
                    ->values()
                    ->all(),
                'href' => '/broker/submissions',
            ];
        }

        if ($subject instanceof EquipmentRequest) {
            return [
                'kind' => ThreadSubjectType::BuyerRequest->value,
                'title' => $subject->equipment_type,
                'statusLabel' => $subject->statusLabel(),
                'statusTone' => 'neutral',
                'specifications' => $subject->specifications,
                'budget' => $subject->budget_range,
                'timeline' => $subject->timeline,
                'locationPreference' => $subject->location_preference,
                'isQuoteInquiry' => $subject->isQuoteInquiry(),
                'href' => '/broker/requests',
            ];
        }

        // The subject row was deleted out from under the thread. Rather than 500 in
        // the broker's inbox, degrade to a stub so the conversation stays readable.
        return [
            'kind' => $thread->subject_type,
            'title' => 'Subject no longer available',
            'statusLabel' => 'Unavailable',
            'statusTone' => 'muted',
            'href' => null,
        ];
    }

    /**
     * The customer-facing view of what a thread is about. Strictly narrower than
     * brokerContext — a buyer must not learn the seller's asking price or notes
     * from the messages screen.
     *
     * @return array<string, mixed>
     */
    public static function userContext(Thread $thread): array
    {
        $subject = $thread->subject;

        if ($subject instanceof EquipmentSubmission) {
            $ownsListing = $subject->user_id === $thread->user_id;

            return [
                'kind' => ThreadSubjectType::Listing->value,
                'title' => $subject->title,
                // A seller sees their own internal status; a buyer sees the public
                // vocabulary ("Available"), matching the marketplace they came from.
                'statusLabel' => $ownsListing
                    ? $subject->statusLabel()
                    : $subject->listingStatus()->publicLabel(),
                'statusTone' => $subject->listingStatus()->tone(),
                'href' => $ownsListing
                    ? "/seller/listings/{$subject->id}"
                    : ($subject->public_id ? "/equipment/{$subject->public_id}" : null),
            ];
        }

        if ($subject instanceof EquipmentRequest) {
            return [
                'kind' => ThreadSubjectType::BuyerRequest->value,
                'title' => $subject->equipment_type,
                'statusLabel' => $subject->statusLabel(),
                'statusTone' => 'neutral',
                'href' => $subject->isQuoteInquiry() ? '/buyer/quotes' : '/buyer/requests',
            ];
        }

        return [
            'kind' => $thread->subject_type,
            'title' => 'Subject no longer available',
            'statusLabel' => 'Unavailable',
            'statusTone' => 'muted',
            'href' => null,
        ];
    }

    public static function subjectTitle(Thread $thread): string
    {
        $subject = $thread->subject;

        return match (true) {
            $subject instanceof EquipmentSubmission => $subject->title,
            $subject instanceof EquipmentRequest => $subject->equipment_type,
            default => 'Subject no longer available',
        };
    }

    /**
     * @return array{label: string, tone: string}|null
     */
    public static function subjectStatus(Thread $thread): ?array
    {
        $subject = $thread->subject;

        if ($subject instanceof EquipmentSubmission) {
            return [
                'label' => $subject->statusLabel(),
                'tone' => $subject->listingStatus()->tone(),
            ];
        }

        if ($subject instanceof EquipmentRequest) {
            return ['label' => $subject->statusLabel(), 'tone' => 'neutral'];
        }

        return null;
    }

    /**
     * Where this thread lives for a given side. Brokers read every thread in the
     * inbox; customers read their own inside their portal.
     */
    public static function urlFor(Thread $thread, ThreadSide $side): string
    {
        if ($side === ThreadSide::Broker) {
            return "/broker/inbox/{$thread->id}";
        }

        $userType = $thread->user?->user_type ?? User::TYPE_BUYER;

        return "/{$userType}/messages/{$thread->id}";
    }
}
