<?php

namespace App\Support;

use App\Mail\DocumentSharedMail;
use App\Models\Document;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

/**
 * Emails a customer when Petra shares a document with them.
 *
 * Batching reuses ThreadNotifier's trick — "was one sent in the last N minutes",
 * answered by a single timestamp, with no scheduler, worker or digest state. The one
 * difference is the key: threads batch per side per thread, documents batch per
 * recipient (users.documents_notified_at). A broker attaching an inspection report, a
 * title and a bill of sale in one sitting should cost the seller one email even though
 * the files may land on different subjects, and a per-subject window would send three.
 *
 * The tradeoff is inherited: suppressed shares are never re-notified. The customer
 * finds them on the Documents page the first email pointed them at, which is where we
 * want them anyway — and unlike messages, the page carries a "new" badge that survives
 * until they actually look.
 */
class DocumentNotifier
{
    public function notifyShare(Document $document): void
    {
        $recipient = $document->sharedWithUser;

        if (! $recipient instanceof User) {
            return;
        }

        if (! $recipient->shouldNotifyAboutDocuments($this->batchMinutes())) {
            return;
        }

        $email = trim((string) $recipient->email);

        if ($email === '') {
            // Loud rather than silent, matching ThreadNotifier: a share nobody was
            // told about is recoverable — the document is on their page — but only
            // if somebody notices the account has no address.
            Log::warning('Document share notification skipped: recipient has no email address.', [
                'document_id' => $document->id,
                'user_id' => $recipient->id,
            ]);

            return;
        }

        $document->loadMissing('subject');

        Mail::to($email)->send(new DocumentSharedMail(
            document: $document,
            subjectTitle: DocumentPresenter::subjectTitle($document->subject),
            documentsUrl: url("/{$recipient->user_type}/documents"),
        ));

        $recipient->markDocumentsNotified();
    }

    private function batchMinutes(): int
    {
        return (int) config(
            'petra.document_notification_batch_minutes',
            config('petra.message_notification_batch_minutes', 10),
        );
    }
}
