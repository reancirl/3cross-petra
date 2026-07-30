<?php

namespace App\Support;

use App\Enums\ListingStatus;
use App\Enums\NotificationRecipientType;
use App\Enums\NotificationType;
use App\Enums\ThreadSide;
use App\Models\BrokerInquiry;
use App\Models\Document;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use App\Models\Message;
use App\Models\Notification;
use App\Models\Thread;

/**
 * The one place a domain event becomes an outward signal.
 *
 * One event, two outputs: every method here writes the in-app notification, and the two
 * events that also send an email (a new message, a shared document) delegate that email
 * to the existing Notifier service unchanged — ThreadNotifier and DocumentNotifier still
 * own the batching windows and the recipient resolution, this class does not re-derive
 * them. Reuse, not duplication: there is exactly one Mail::to call per email in the
 * codebase, and it is still theirs.
 *
 * The five events that never had an email (a listing or request changing status, a
 * submission, request or inquiry arriving in a broker queue) produce only the in-app
 * row. Those were silent before this feed existed.
 *
 * Broker-facing events write a single shared row (recipient_type = broker, no user);
 * customer-facing events write one row for the one person concerned.
 */
class Notifier
{
    public function __construct(
        private readonly ThreadNotifier $threadNotifier,
        private readonly DocumentNotifier $documentNotifier,
    ) {}

    /**
     * A broker changed a listing's status. The seller learns their unit moved.
     *
     * Skipped for an unclaimed public-form lead — there is no account to notify, and the
     * broker is the one who filed it.
     */
    public function listingStatusChanged(EquipmentSubmission $submission, ListingStatus $status): void
    {
        if ($submission->user_id === null) {
            return;
        }

        $this->toUser(
            $submission->user_id,
            NotificationType::ListingStatus,
            'listing',
            $submission->id,
            "Your {$submission->title} is now {$status->label()}",
        );
    }

    /**
     * A broker advanced a buyer's request through the queue.
     */
    public function requestStatusChanged(EquipmentRequest $request): void
    {
        $this->toUser(
            $request->user_id,
            NotificationType::RequestStatus,
            'buyer_request',
            $request->id,
            "Your request \"{$request->equipment_type}\" is now {$request->statusLabel()}",
        );
    }

    /**
     * A message was posted. The side that did not write it gets an in-app notification;
     * the email is ThreadNotifier's, batching and all.
     *
     * Collapse rule: a thread with an unread new_message notification already sitting in
     * the recipient's feed has its timestamp bumped instead of gaining a second row, so
     * a burst of replies is one feed entry that floats to the top, matching the one
     * email the batching window already produces.
     *
     * $recordInApp is false for the opening message of a listing quote inquiry: that
     * event already produced a new_request notification for the broker feed (the
     * actionable queue item), so a second row for the same buyer action would be noise.
     * The email and the thread's own unread badge still fire — nothing is lost, the
     * broker just gets one feed entry instead of two. See EquipmentListingController.
     */
    public function newMessage(Thread $thread, Message $message, bool $recordInApp = true): void
    {
        if ($recordInApp) {
            $recipientSide = $message->side()->opposite();
            $title = 'New message about '.ThreadPresenter::subjectTitle($thread);

            if ($recipientSide === ThreadSide::Broker) {
                $this->toBrokerCollapsingByThread(NotificationType::NewMessage, $thread->id, $title);
            } elseif ($thread->user_id !== null) {
                $this->toUserCollapsingByThread($thread->user_id, NotificationType::NewMessage, $thread->id, $title);
            }
        }

        // The email, unchanged — its own batching window decides whether it actually sends.
        $this->threadNotifier->notifyOtherSide($thread, $message);
    }

    /**
     * Petra shared a document with one customer. The email is DocumentNotifier's.
     *
     * The stored subject is the document's subject (the listing or request), not the
     * document row, so the deep link lands on the right group in the Documents hub.
     */
    public function documentShared(Document $document): void
    {
        if ($document->shared_with_user_id !== null) {
            $document->loadMissing('subject');

            $this->toUser(
                $document->shared_with_user_id,
                NotificationType::DocumentShared,
                $document->subject_type,
                (int) $document->subject_id,
                'Petra shared a document on '.DocumentPresenter::subjectTitle($document->subject),
            );
        }

        // The email, unchanged — batched per recipient in DocumentNotifier.
        $this->documentNotifier->notifyShare($document);
    }

    /**
     * A new equipment submission reached the seller review queue.
     */
    public function newSubmission(EquipmentSubmission $submission): void
    {
        $this->toBroker(
            NotificationType::NewSubmission,
            'listing',
            $submission->id,
            "New equipment submission: {$submission->title}",
        );
    }

    /**
     * A new buyer request or quote inquiry reached the buyer request queue.
     */
    public function newRequest(EquipmentRequest $request): void
    {
        $this->toBroker(
            NotificationType::NewRequest,
            'buyer_request',
            $request->id,
            "New buyer request: {$request->equipment_type}",
        );
    }

    /**
     * A Talk to a Broker inquiry reached the leads queue.
     */
    public function newInquiry(BrokerInquiry $inquiry): void
    {
        $this->toBroker(
            NotificationType::NewInquiry,
            'broker_inquiry',
            $inquiry->id,
            "New broker inquiry from {$inquiry->full_name}",
        );
    }

    private function toUser(int $userId, NotificationType $type, ?string $subjectType, ?int $subjectId, string $title): Notification
    {
        return Notification::create([
            'recipient_type' => NotificationRecipientType::User->value,
            'recipient_id' => $userId,
            'type' => $type->value,
            'subject_type' => $subjectType,
            'subject_id' => $subjectId,
            'title' => $title,
        ]);
    }

    private function toBroker(NotificationType $type, ?string $subjectType, ?int $subjectId, string $title): Notification
    {
        return Notification::create([
            'recipient_type' => NotificationRecipientType::Broker->value,
            'recipient_id' => null,
            'type' => $type->value,
            'subject_type' => $subjectType,
            'subject_id' => $subjectId,
            'title' => $title,
        ]);
    }

    private function toUserCollapsingByThread(int $userId, NotificationType $type, int $threadId, string $title): void
    {
        $existing = Notification::query()
            ->where('recipient_type', NotificationRecipientType::User->value)
            ->where('recipient_id', $userId)
            ->where('type', $type->value)
            ->where('subject_type', 'thread')
            ->where('subject_id', $threadId)
            ->whereNull('read_at')
            ->first();

        if ($existing !== null) {
            $this->touch($existing, $title);

            return;
        }

        $this->toUser($userId, $type, 'thread', $threadId, $title);
    }

    private function toBrokerCollapsingByThread(NotificationType $type, int $threadId, string $title): void
    {
        $existing = Notification::query()
            ->where('recipient_type', NotificationRecipientType::Broker->value)
            ->where('type', $type->value)
            ->where('subject_type', 'thread')
            ->where('subject_id', $threadId)
            ->whereNull('read_at')
            ->first();

        if ($existing !== null) {
            $this->touch($existing, $title);

            return;
        }

        $this->toBroker($type, 'thread', $threadId, $title);
    }

    /**
     * Float a collapsed notification back to the top of the feed. created_at is the sort
     * key the feed orders on, so bumping it is what "update its timestamp" means here;
     * the title is refreshed too in case the subject was renamed between messages.
     */
    private function touch(Notification $notification, string $title): void
    {
        $notification->forceFill([
            'title' => $title,
            'created_at' => now(),
            'updated_at' => now(),
        ])->save();
    }
}
