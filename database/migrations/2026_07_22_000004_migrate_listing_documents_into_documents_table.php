<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Move listing documents out of the equipment_submissions.documents JSON column and
     * into the documents table, relocating the files onto the private disk on the way.
     *
     * Why a migration rather than a query-level union over both stores: the per-document
     * public flag would otherwise have two owners — the JSON array (keyed by position,
     * see the old SubmissionReviewController::applyDocumentVisibility) and the new row —
     * and they would disagree the first time a broker toggled one. One store, one flag.
     *
     * The bytes move because these files were written to the world-readable 'public'
     * disk and served as static Nginx URLs with no auth in the path. A seller's service
     * records were therefore readable by anyone who could guess the filename, which is
     * exactly the hole the Documents hub exists to close. After this runs, every listing
     * document is reachable only through DocumentDownloadController.
     *
     * The JSON column is left in place and simply stops being read, so down() can put
     * everything back. Photos are untouched — they are not documents and the marketplace
     * gallery still serves them statically.
     *
     * Visibility strings are frozen literals rather than App\Enums\DocumentVisibility
     * reads, following the convention set by the 2026_07_14 restructure: a migration has
     * to keep producing the values that were current when it was written.
     */
    private const VISIBILITY_SHARED_USER = 'shared_user';

    private const VISIBILITY_PUBLIC_LISTING = 'public_listing';

    private const SUBJECT_LISTING = 'listing';

    public function up(): void
    {
        $now = now();

        DB::table('equipment_submissions')
            ->select(['id', 'user_id', 'documents', 'created_at'])
            ->orderBy('id')
            ->each(function (object $submission) use ($now): void {
                foreach ($this->decodeDocuments($submission->documents) as $document) {
                    $path = $document['path'] ?? null;

                    if (! is_string($path) || $path === '') {
                        continue;
                    }

                    $isPublic = (bool) ($document['public'] ?? false);
                    $disk = $this->relocate($path);

                    DB::table('documents')->insert([
                        'subject_type' => self::SUBJECT_LISTING,
                        'subject_id' => $submission->id,
                        'uploaded_by_type' => 'user',
                        'uploaded_by_id' => $submission->user_id,
                        // A seller's own upload is shared back to them so it keeps
                        // showing on their side of the hub. Unclaimed public-form
                        // submissions have no account, so this stays null and the
                        // document is broker-only until somebody claims it.
                        'shared_with_user_id' => $isPublic ? null : $submission->user_id,
                        'visibility' => $isPublic ? self::VISIBILITY_PUBLIC_LISTING : self::VISIBILITY_SHARED_USER,
                        'disk' => $disk,
                        'file_path' => $path,
                        'original_name' => $document['name'] ?? basename($path),
                        'mime' => $this->guessMime($disk, $path),
                        'size' => (int) ($document['size'] ?? 0),
                        'archived_at' => null,
                        // Backdated to the listing, which is the closest true statement
                        // available — the JSON never recorded a per-file upload time.
                        // Stamping now() instead would light up the "new" badge on every
                        // customer's whole document history the day this ships.
                        'created_at' => $submission->created_at ?? $now,
                        'updated_at' => $now,
                    ]);
                }
            });
    }

    public function down(): void
    {
        DB::table('documents')
            ->where('subject_type', self::SUBJECT_LISTING)
            ->orderBy('subject_id')
            ->get()
            ->groupBy('subject_id')
            ->each(function ($documents, int $submissionId): void {
                $rebuilt = $documents->map(function (object $document): array {
                    // Put the bytes back where the JSON store expects them before
                    // rebuilding the URL that points at them.
                    if ($document->disk === 'local') {
                        $this->restore($document->file_path);
                    }

                    return [
                        'name' => $document->original_name,
                        'path' => $document->file_path,
                        'url' => Storage::disk('public')->url($document->file_path),
                        'size' => $document->size,
                        'public' => $document->visibility === self::VISIBILITY_PUBLIC_LISTING,
                    ];
                })->values()->all();

                DB::table('equipment_submissions')
                    ->where('id', $submissionId)
                    ->update(['documents' => json_encode($rebuilt)]);
            });

        DB::table('documents')->where('subject_type', self::SUBJECT_LISTING)->delete();
    }

    /**
     * Copy one file from the public disk to the private one.
     *
     * @return string the disk the file actually ended up on — 'public' when the move
     *                could not happen, so the row still resolves to readable bytes
     *                instead of becoming a 404 with no way back.
     */
    private function relocate(string $path): string
    {
        $public = Storage::disk('public');
        $local = Storage::disk('local');

        if ($local->exists($path)) {
            return 'local';
        }

        if (! $public->exists($path)) {
            return 'public';
        }

        $stream = $public->readStream($path);

        if ($stream === null || $local->writeStream($path, $stream) === false) {
            return 'public';
        }

        $public->delete($path);

        return 'local';
    }

    private function restore(string $path): void
    {
        $local = Storage::disk('local');

        if (! $local->exists($path) || Storage::disk('public')->exists($path)) {
            return;
        }

        $stream = $local->readStream($path);

        if ($stream !== null && Storage::disk('public')->writeStream($path, $stream) !== false) {
            $local->delete($path);
        }
    }

    /**
     * The JSON store never recorded a mime type, so it is read back off the file. An
     * extension guess covers the case where the bytes are already gone — rows can
     * outlive their file, as the messaging build discovered.
     */
    private function guessMime(string $disk, string $path): string
    {
        $mime = Storage::disk($disk)->exists($path)
            ? Storage::disk($disk)->mimeType($path)
            : null;

        if (is_string($mime) && $mime !== '') {
            return $mime;
        }

        return match (Str::lower(pathinfo($path, PATHINFO_EXTENSION))) {
            'pdf' => 'application/pdf',
            'jpg', 'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'webp' => 'image/webp',
            'heic' => 'image/heic',
            'heif' => 'image/heif',
            'doc' => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls' => 'application/vnd.ms-excel',
            'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'csv' => 'text/csv',
            'txt' => 'text/plain',
            default => 'application/octet-stream',
        };
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function decodeDocuments(mixed $raw): array
    {
        if (is_array($raw)) {
            return $raw;
        }

        if (! is_string($raw) || $raw === '') {
            return [];
        }

        $decoded = json_decode($raw, true);

        return is_array($decoded) ? $decoded : [];
    }
};
