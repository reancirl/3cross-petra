<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\DownloadLog;
use App\Models\EquipmentSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * The only way to read a document.
 *
 * Every document written by the app lands on the private 'local' disk precisely so
 * this check cannot be bypassed. Listing documents used to sit at static Nginx-served
 * URLs with no auth in the path — a seller's service records were readable by anyone
 * who could guess a filename — and the backfill migration moved those bytes here.
 *
 * Two entry points, because there are genuinely two questions:
 *
 *   download() — "may this signed-in user read this document", answered by
 *                Document::scopeVisibleTo, the same scope the hub and the broker panel
 *                query through.
 *   publicShow() — "is this document published with a listing the whole world can
 *                see", which needs no account and must not consult the user at all.
 *
 * Both log. A logged row means the bytes were served, never that somebody tried.
 */
class DocumentDownloadController extends Controller
{
    public function download(Request $request, Document $document): StreamedResponse
    {
        // Resolved through the visibility scope rather than checked afterwards, so a
        // customer guessing document ids gets a 404 identical to a missing file rather
        // than a 403 that would confirm the row exists. Same handling as
        // MessageAttachmentController.
        $visible = Document::query()
            ->visibleTo($request->user())
            ->whereKey($document->getKey())
            ->exists();

        abort_unless($visible, 404);

        return $this->stream($document, $request->user()?->id);
    }

    /**
     * A public listing document, for anonymous marketplace visitors.
     *
     * Deliberately does not fall back to the authenticated path: a document is served
     * here only if it is public AND its listing is itself publicly visible. Without the
     * second half, unpublishing a listing would leave its spec sheets reachable — the
     * listing would vanish from the marketplace while its documents did not.
     */
    public function publicShow(Request $request, Document $document): StreamedResponse
    {
        $published = Document::query()
            ->publicOnListing((int) $document->subject_id)
            ->whereKey($document->getKey())
            ->exists();

        abort_unless($published, 404);

        $listingIsPublic = EquipmentSubmission::query()
            ->publiclyVisible()
            ->whereKey($document->subject_id)
            ->exists();

        abort_unless($listingIsPublic, 404);

        return $this->stream($document, $request->user()?->id);
    }

    private function stream(Document $document, ?int $userId): StreamedResponse
    {
        abort_unless(Storage::disk($document->disk)->exists($document->file_path), 404);

        DownloadLog::create([
            'document_id' => $document->id,
            'user_id' => $userId,
            'downloaded_at' => now(),
        ]);

        // Inline so images and PDFs open in the browser rather than forcing a save —
        // the brief rules out a preview pane but expects a PDF to behave natively. The
        // stored filename is random, so the original name is restored for the download.
        return Storage::disk($document->disk)->response(
            $document->file_path,
            $document->original_name,
            ['Content-Type' => $document->mime],
        );
    }
}
