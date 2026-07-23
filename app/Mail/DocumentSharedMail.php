<?php

namespace App\Mail;

use App\Models\Document;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * "Petra added a document to X" — sent to the customer a document was shared with.
 *
 * A Mailable rather than a Notification for the same reason NewThreadMessageMail is
 * one: the two customer-facing emails in this app should be built the same way, and
 * the recipient is addressed with Mail::to() rather than resolved from a notifiable.
 *
 * Petra does not accept inbound email, so the template drives the reader into the
 * portal rather than inviting a reply.
 */
class DocumentSharedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Document $document,
        public string $subjectTitle,
        public string $documentsUrl,
    ) {
        // Documents are written inside a transaction with their file; without this a
        // queued send can run before the commit and load a missing row.
        $this->afterCommit();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Petra added a document to {$this->subjectTitle}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.documents.shared',
        );
    }
}
