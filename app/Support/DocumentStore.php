<?php

namespace App\Support;

use App\Enums\DocumentVisibility;
use App\Enums\ThreadSubjectType;
use App\Models\Document;
use App\Models\User;
use Illuminate\Http\UploadedFile;

/**
 * The one place a Document row is created.
 *
 * Three entry points feed it — the seller portal's submission form, the public Sell
 * Equipment form, and a broker adding files from a queue — and they used to disagree
 * about where files went and who could read them. Routing all three through here is
 * what makes "seller uploads are private to that seller until a broker publishes them"
 * a property of the system rather than a convention three controllers each remember.
 *
 * Every file lands on the private 'local' disk, including documents destined to be
 * public: a public document is served by DocumentDownloadController::publicShow, which
 * re-checks that its listing is still on the marketplace. Writing them to the public
 * disk instead would mean unpublishing a listing left its paperwork reachable.
 */
class DocumentStore
{
    /**
     * A customer's own upload, filed against a subject they own.
     *
     * Shared straight back to the uploader so it appears in their Documents hub. The
     * uploader-id rule in Document::scopeVisibleTo would show it to them anyway; setting
     * shared_with_user_id as well is what lets a broker see, at a glance, who the file
     * is for. Both are null for a public-form submission with no account behind it,
     * which correctly leaves the file broker-only until somebody claims the listing.
     *
     * @param  array<int, UploadedFile>  $files
     * @return array<int, Document>
     */
    public static function storeCustomerUploads(
        array $files,
        ThreadSubjectType $subjectType,
        int $subjectId,
        ?int $userId,
    ): array {
        return self::store(
            $files,
            $subjectType,
            $subjectId,
            Document::UPLOADER_USER,
            $userId,
            DocumentVisibility::SharedUser,
            $userId,
        );
    }

    /**
     * A broker's upload, with the visibility they chose and the recipient the subject
     * implies. Both are decided by the caller, which is the only place that knows them.
     *
     * @param  array<int, UploadedFile>  $files
     * @return array<int, Document>
     */
    public static function storeBrokerUploads(
        array $files,
        ThreadSubjectType $subjectType,
        int $subjectId,
        User $broker,
        DocumentVisibility $visibility,
        ?int $sharedWithUserId,
    ): array {
        return self::store(
            $files,
            $subjectType,
            $subjectId,
            Document::UPLOADER_BROKER,
            $broker->id,
            $visibility,
            $visibility === DocumentVisibility::SharedUser ? $sharedWithUserId : null,
        );
    }

    /**
     * @param  array<int, UploadedFile>  $files
     * @return array<int, Document>
     */
    private static function store(
        array $files,
        ThreadSubjectType $subjectType,
        int $subjectId,
        string $uploaderType,
        ?int $uploaderId,
        DocumentVisibility $visibility,
        ?int $sharedWithUserId,
    ): array {
        $documents = [];

        foreach ($files as $file) {
            $stored = UploadStore::store($file, 'portal/documents', 'local');

            $documents[] = Document::create([
                'subject_type' => $subjectType->value,
                'subject_id' => $subjectId,
                'uploaded_by_type' => $uploaderType,
                'uploaded_by_id' => $uploaderId,
                'shared_with_user_id' => $sharedWithUserId,
                'visibility' => $visibility->value,
                'disk' => 'local',
                'file_path' => $stored['path'],
                'original_name' => $stored['name'],
                'mime' => $stored['mime'],
                'size' => $stored['size'],
            ]);
        }

        return $documents;
    }
}
