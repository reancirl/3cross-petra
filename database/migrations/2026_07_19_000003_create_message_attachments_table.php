<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Files attached to a message.
     *
     * Unlike listing photos and documents — which are stored as JSON blobs on
     * equipment_submissions and written to the world-readable 'public' disk —
     * message attachments get a real table and live on the private 'local' disk,
     * reachable only through an authorizing download route
     * (MessageAttachmentController). Threads carry a per-user access rule, and a
     * static Nginx-served URL cannot honour it.
     *
     * Consequently there is no url column: the URL is a route, derived at
     * serialization time from the id. The listing pipeline froze absolute URLs
     * into its JSON at upload time, which breaks if APP_URL or the disk ever
     * changes; storing only the relative file_path avoids inheriting that.
     */
    public function up(): void
    {
        Schema::create('message_attachments', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('message_id')->constrained()->cascadeOnDelete();
            // The original filename, shown to both sides; the stored path is random.
            $table->string('name');
            $table->string('file_path');
            $table->string('mime');
            $table->unsignedInteger('size');
            $table->timestamps();

            $table->index('message_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('message_attachments');
    }
};
