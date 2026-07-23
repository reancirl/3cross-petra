<?php

namespace App\Http\Controllers\Broker;

use App\Enums\DocumentVisibility;
use App\Enums\ThreadSubjectType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Broker\StoreDocumentRequest;
use App\Models\Document;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use App\Support\DocumentNotifier;
use App\Support\DocumentStore;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

/**
 * The broker's write side of the document hub: add files, and retire them.
 *
 * There is no update and no delete. A document a customer has already been shown is
 * part of the record of the deal, so the only way to take one back is to archive it —
 * which hides it from customers and leaves it in the broker's view with a chip saying
 * so. Append-only is the whole design, not a v1 shortcut.
 */
class DocumentController extends Controller
{
    public function store(
        StoreDocumentRequest $request,
        string $subjectType,
        int $subjectId,
    ): RedirectResponse {
        $type = ThreadSubjectType::tryFrom($subjectType);

        abort_if($type === null, 404);

        $subject = $this->resolveSubject($type, $subjectId);
        $visibility = $request->visibility();

        // A buyer request has no public page for a document to appear on, so
        // public_listing is meaningless there. Caught here rather than left to the UI,
        // which hides the option — a hidden option is not a rule.
        if (! $visibility->allowedOn($type)) {
            return back()->with('status', 'Public documents can only be added to a listing.');
        }

        $recipientId = $this->recipientFor($subject);

        // Sharing needs somebody to share with. An unclaimed public-form submission has
        // no account behind it, so the file would be addressed to nobody and silently
        // become broker-only — better to say so than to accept the upload and have the
        // broker believe the seller can see it.
        if ($visibility === DocumentVisibility::SharedUser && $recipientId === null) {
            return back()->with('status', 'This submission has no seller account to share with. Add the file as private, or reach the seller using the contact details on the submission.');
        }

        /** @var array<int, UploadedFile> $files */
        $files = $request->file('documents', []);

        // All-or-nothing, so a batch that fails halfway does not leave the broker
        // looking at three of five files with no indication the rest are missing.
        $documents = DB::transaction(fn (): array => DocumentStore::storeBrokerUploads(
            $files,
            $type,
            $subjectId,
            $request->user(),
            $visibility,
            $recipientId,
        ));

        // After the transaction, and only once however many files went up: the batching
        // window in DocumentNotifier collapses the rest, but calling it per document
        // would still cost a query each to discover that.
        if ($visibility === DocumentVisibility::SharedUser && $documents !== []) {
            app(DocumentNotifier::class)->notifyShare($documents[0]);
        }

        $count = count($documents);

        return back()->with('status', $count === 1
            ? "Added {$documents[0]->original_name}."
            : "Added {$count} documents.");
    }

    /**
     * Soft-hide from customers. Idempotent — archiving an already-archived document is
     * a no-op rather than an error, so a double-click cannot rewrite the timestamp.
     */
    public function archive(Request $request, Document $document): RedirectResponse
    {
        $document->archive();

        return back()->with('status', "{$document->original_name} archived.");
    }

    /**
     * The customer this subject belongs to, or null when nobody owns it.
     */
    private function recipientFor(Model $subject): ?int
    {
        return match (true) {
            $subject instanceof EquipmentSubmission => $subject->user_id,
            $subject instanceof EquipmentRequest => $subject->user_id,
            default => null,
        };
    }

    private function resolveSubject(ThreadSubjectType $type, int $subjectId): Model
    {
        return match ($type) {
            ThreadSubjectType::Listing => EquipmentSubmission::query()->findOrFail($subjectId),
            ThreadSubjectType::BuyerRequest => EquipmentRequest::query()->findOrFail($subjectId),
        };
    }
}
