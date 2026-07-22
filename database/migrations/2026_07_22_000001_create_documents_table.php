<?php

use App\Enums\DocumentVisibility;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * The unified document store behind the portal Documents hub.
     *
     * Before this table there were three unrelated file stores: listing photos and
     * documents as JSON blobs on equipment_submissions (world-readable 'public' disk),
     * the identical store reused by the public submission form, and message_attachments
     * (private 'local' disk, served through an authorizing route). Only the last of
     * those could express "this file is for one person".
     *
     * This table takes over the listing documents (see the backfill migration, which
     * also relocates the bytes onto the private disk). Message attachments deliberately
     * stay where they are — they are owned by a message and cascade-delete with it, so
     * copying rows here would leave orphaned bookkeeping on disk. The broker's unified
     * view joins them in at the presenter layer instead.
     *
     * subject_type / subject_id is the same hand-rolled polymorphic pair threads use,
     * storing the short 'listing' / 'buyer_request' vocabulary (App\Enums\ThreadSubjectType,
     * resolved through the morph map in AppServiceProvider) rather than a class name.
     *
     * Append-only in v1: there is no delete or replace endpoint. A broker retires a
     * document by stamping archived_at, which hides it from customers but keeps it in
     * the broker's view with an "archived" chip. Nothing a customer was shown ever
     * silently disappears from the record.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table): void {
            $table->id();

            $table->string('subject_type');
            $table->unsignedBigInteger('subject_id');

            // 'user' or 'broker'. Drives the customer-facing "Added by Petra" /
            // "Added by you" credit, and the source label in the broker view.
            $table->string('uploaded_by_type');
            // Nullable: a submission from the public form has no account behind it,
            // so its documents have no uploader row to point at.
            $table->foreignId('uploaded_by_id')->nullable()->constrained('users')->nullOnDelete();

            // Set only for visibility = shared_user. The single customer this document
            // was shared with; a document is never shared with a group.
            $table->foreignId('shared_with_user_id')->nullable()->constrained('users')->nullOnDelete();

            $table->string('visibility')->default(DocumentVisibility::PrivateBroker->value);

            // Which Laravel disk file_path is relative to. Every row written by the app
            // is 'local' (private, reachable only through the authorizing download
            // route). The column exists because the backfill relocates historic files
            // and a file it cannot move keeps disk = 'public' rather than 404ing —
            // a degraded row is better than a lost one.
            $table->string('disk')->default('local');
            $table->string('file_path');
            // The name the uploader's machine used. The stored path is random.
            $table->string('original_name');
            $table->string('mime');
            $table->unsignedBigInteger('size');

            // Soft-hide, not soft-delete: brokers still see archived rows.
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();

            // The hub and the broker panel both read "every document on this subject".
            $table->index(['subject_type', 'subject_id']);
            // "Documents shared with me", the buyer/seller hub's own query.
            $table->index(['shared_with_user_id', 'created_at']);
            // "Public documents on this listing", read by the marketplace detail page.
            $table->index(['visibility', 'subject_type', 'subject_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
