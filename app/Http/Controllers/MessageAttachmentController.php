<?php

namespace App\Http\Controllers;

use App\Models\MessageAttachment;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * The only way to read a message attachment.
 *
 * Attachments live on the private 'local' disk precisely so this check cannot be
 * bypassed: unlike listing photos — which sit at static Nginx-served URLs with no
 * auth — a thread belongs to one customer, and the file has to inherit that rule.
 *
 * Shared by both sides rather than duplicated per portal, because the access
 * question is identical: may this user see the thread the attachment hangs off.
 */
class MessageAttachmentController extends Controller
{
    public function show(Request $request, MessageAttachment $attachment): StreamedResponse
    {
        $attachment->loadMissing('message');

        $threadId = $attachment->message?->thread_id;

        abort_if($threadId === null, 404);

        // Resolved through the same visibility scope the thread screens use, so a
        // customer guessing attachment ids gets a 404 identical to a missing file
        // rather than a 403 that would confirm the row exists.
        $visible = Thread::query()
            ->visibleTo($request->user())
            ->whereKey($threadId)
            ->exists();

        abort_unless($visible, 404);

        abort_unless(Storage::disk('local')->exists($attachment->file_path), 404);

        // Inline so images and PDFs preview in the browser; the stored filename is
        // random, so the original name is restored for the download.
        return Storage::disk('local')->response(
            $attachment->file_path,
            $attachment->name,
            ['Content-Type' => $attachment->mime],
        );
    }
}
