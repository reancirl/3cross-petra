<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * The one place uploaded files are written to disk.
 *
 * Extracted from EquipmentSubmissionController so listing photos and message
 * attachments share a single implementation, but the two callers deliberately use
 * different disks:
 *
 *  - Listing photos and documents go to 'public'. They are served as static files
 *    by Nginx through the storage symlink, with no auth in the path.
 *  - Message attachments go to 'local' (private) and are readable only through
 *    MessageAttachmentController, which checks thread access first. A thread is
 *    scoped to one customer, and a world-readable URL cannot honour that.
 *
 * Callers pass the disk explicitly rather than defaulting, so nobody adds a new
 * upload path and inherits public visibility without having chosen it.
 */
class UploadStore
{
    /**
     * @return array{name: string, path: string, mime: string, size: int}
     */
    public static function store(UploadedFile $file, string $folder, string $disk): array
    {
        $path = $file->store($folder, $disk);

        return [
            'name' => $file->getClientOriginalName(),
            'path' => $path,
            // getMimeType() reads the file's magic bytes rather than trusting the
            // client-supplied Content-Type header, which is attacker-controlled.
            'mime' => $file->getMimeType() ?? 'application/octet-stream',
            'size' => (int) $file->getSize(),
        ];
    }

    /**
     * Store on the public disk and include the resolved URL, the shape the
     * equipment_submissions JSON columns have always held.
     *
     * @param  array<int, UploadedFile>  $files
     * @return array<int, array<string, mixed>>
     */
    public static function storePublicBatch(array $files, string $folder): array
    {
        return collect($files)
            ->map(function (UploadedFile $file) use ($folder): array {
                $stored = self::store($file, $folder, 'public');

                return [
                    'name' => $stored['name'],
                    'path' => $stored['path'],
                    'url' => Storage::disk('public')->url($stored['path']),
                    'size' => $stored['size'],
                ];
            })
            ->values()
            ->all();
    }
}
