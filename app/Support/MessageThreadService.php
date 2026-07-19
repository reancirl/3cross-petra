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
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

/**
 * Creating threads and appending messages — the only writer for both tables.
 *
 * Controllers call in here rather than touching the models directly so the
 * invariants (one thread per user per subject, activity bump, reopen-on-message,
 * notify the other side) hold no matter which entry point ran.
 */
class MessageThreadService
{
    /**
     * Find or create the thread for one customer and one subject.
     *
     * firstOrCreate against the (subject_type, subject_id, user_id) unique index,
     * so a double-submitted inquiry resolves to the same row rather than racing a
     * duplicate in.
     */
    public function findOrCreateThread(User $user, Model $subject): Thread
    {
        return Thread::firstOrCreate([
            'subject_type' => $this->subjectTypeFor($subject)->value,
            'subject_id' => $subject->getKey(),
            'user_id' => $user->id,
        ]);
    }

    /**
     * Append a message and everything that follows from it.
     *
     * Wrapped in a transaction so a thread can never show a bumped
     * last_message_at for a message whose attachments failed to persist. The
     * notification is dispatched after the transaction (the Mailable calls
     * afterCommit) for the same reason.
     *
     * @param  array<int, UploadedFile>  $attachments
     */
    public function postMessage(
        Thread $thread,
        User $sender,
        ThreadSide $side,
        ?string $body,
        array $attachments = [],
    ): Message {
        $message = DB::transaction(function () use ($thread, $sender, $side, $body, $attachments): Message {
            $message = $thread->messages()->create([
                'sender_type' => $side->value,
                'sender_id' => $sender->id,
                'body' => $body !== null && trim($body) !== '' ? trim($body) : null,
            ]);

            foreach ($attachments as $file) {
                $stored = UploadStore::store($file, 'portal/message-attachments', 'local');

                $message->attachments()->create([
                    'name' => $stored['name'],
                    'file_path' => $stored['path'],
                    'mime' => $stored['mime'],
                    'size' => $stored['size'],
                ]);
            }

            // Bumps last_message_at and reopens the thread if a broker had closed it.
            $thread->recordMessage($message);

            // The author has by definition read their own message, so move their
            // marker too — otherwise posting would leave them holding an unread badge.
            $thread->markReadFor($side);

            return $message;
        });

        $message->load('attachments');

        app(ThreadNotifier::class)->notifyOtherSide($thread->fresh(), $message);

        return $message;
    }

    /**
     * The buyer-inquiry entry point: a logged-in buyer clicking Request Details /
     * Request Quote on a listing.
     *
     * Guests are deliberately excluded by the caller. A guest inquiry creates a
     * shadow account with a random password that nobody can log into, so a thread
     * for one would be unreachable — and emailing it would be messaging a stranger
     * about an account they do not know exists.
     */
    public function openListingInquiry(User $buyer, EquipmentSubmission $listing, ?string $note): Thread
    {
        $thread = $this->findOrCreateThread($buyer, $listing);

        $this->postMessage(
            $thread,
            $buyer,
            ThreadSide::User,
            $note !== null && trim($note) !== ''
                ? $note
                : "I'd like more details on {$listing->title}.",
        );

        return $thread;
    }

    /**
     * Can this buyer open a thread on this listing at all?
     *
     * Threads created by a customer require the listing to be publicly visible —
     * a buyer must not be able to start a conversation about an Under Review or
     * Not Accepted unit by guessing its id. Brokers are not subject to this: they
     * routinely need to reach a seller about a listing that is not yet published.
     */
    public function listingAcceptsBuyerThreads(EquipmentSubmission $listing): bool
    {
        return EquipmentSubmission::query()
            ->publiclyVisible()
            ->whereKey($listing->getKey())
            ->exists();
    }

    private function subjectTypeFor(Model $subject): ThreadSubjectType
    {
        return match (true) {
            $subject instanceof EquipmentSubmission => ThreadSubjectType::Listing,
            $subject instanceof EquipmentRequest => ThreadSubjectType::BuyerRequest,
            default => throw new \InvalidArgumentException(
                'Threads can only be anchored to a listing or a buyer request, got '.$subject::class,
            ),
        };
    }

    /**
     * @return array<int, string>
     */
    public static function allowedAttachmentMimes(): array
    {
        return MessageAttachment::ALLOWED_EXTENSIONS;
    }
}
