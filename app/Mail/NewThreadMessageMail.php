<?php

namespace App\Mail;

use App\Models\Message;
use App\Models\Thread;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * "You have a new message about X" — sent to whichever side did not write it.
 *
 * Deliberately not a Notification: the broker recipient is a shared address from
 * config rather than a User row, so there is no single notifiable that covers both
 * sides. A Mailable addressed with Mail::to() handles both uniformly.
 *
 * Petra does not accept inbound email replies, so the template drives the reader
 * back into the portal rather than inviting a reply.
 */
class NewThreadMessageMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Thread $thread,
        public Message $message,
        public string $subjectTitle,
        public string $senderName,
        public string $threadUrl,
    ) {
        // Messages are written inside a transaction with their attachments; without
        // this a queued send can run before the commit and load a missing row.
        $this->afterCommit();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New message about {$this->subjectTitle}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.threads.new-message',
            with: [
                'snippet' => $this->message->snippet(200),
            ],
        );
    }
}
