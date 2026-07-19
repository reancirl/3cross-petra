<?php

namespace App\Support;

use App\Enums\ThreadSide;
use App\Mail\NewThreadMessageMail;
use App\Models\Message;
use App\Models\Thread;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

/**
 * Emails the side that did not write the message.
 *
 * Batching is a per-side timestamp on the thread rather than a queued digest job:
 * a broker firing off three quick replies should cost the customer one email, and
 * "was one sent in the last N minutes" answers that with no scheduler, no worker,
 * and no state beyond two columns. The tradeoff is that suppressed messages are
 * never re-notified — the customer learns about them when they open the thread the
 * first email pointed them at, which is where we want them anyway.
 *
 * Inbound replies are not supported, so the template tells the reader to answer in
 * the portal.
 */
class ThreadNotifier
{
    public function notifyOtherSide(Thread $thread, Message $message): void
    {
        $recipientSide = $message->side()->opposite();

        if (! $thread->shouldNotify($recipientSide, $this->batchMinutes())) {
            return;
        }

        $recipient = $this->recipientAddress($thread, $recipientSide);

        if ($recipient === null) {
            // Loud rather than silent. A misconfigured recipient means a customer
            // wrote to Petra and nobody was told — the thread still holds the
            // message, so this is recoverable, but only if somebody notices.
            Log::warning('Thread message notification skipped: no recipient address.', [
                'thread_id' => $thread->id,
                'message_id' => $message->id,
                'side' => $recipientSide->value,
                'hint' => $recipientSide === ThreadSide::Broker
                    ? 'Set BROKER_NOTIFICATION_EMAIL (config/petra.php).'
                    : 'The thread owner has no email address.',
            ]);

            return;
        }

        $thread->loadMissing('user');

        Mail::to($recipient)->send(new NewThreadMessageMail(
            thread: $thread,
            message: $message,
            subjectTitle: ThreadPresenter::subjectTitle($thread),
            senderName: $this->senderNameFor($message),
            threadUrl: url(ThreadPresenter::urlFor($thread, $recipientSide)),
        ));

        $thread->markNotified($recipientSide);
    }

    /**
     * Customers are credited by first name only; brokers are always "Petra".
     */
    private function senderNameFor(Message $message): string
    {
        if ($message->isFromBroker()) {
            return 'Petra';
        }

        $name = trim((string) $message->sender?->name);

        return $name === '' ? 'A customer' : strtok($name, ' ');
    }

    /**
     * The broker side is a shared address from config, not a User row — brokers
     * are staff sharing one inbox rather than individually subscribed to threads.
     */
    private function recipientAddress(Thread $thread, ThreadSide $side): ?string
    {
        if ($side === ThreadSide::Broker) {
            $address = config('petra.broker_notification_email');

            return is_string($address) && $address !== '' ? $address : null;
        }

        $email = $thread->user?->email;

        return is_string($email) && $email !== '' ? $email : null;
    }

    private function batchMinutes(): int
    {
        return (int) config('petra.message_notification_batch_minutes', 10);
    }
}
