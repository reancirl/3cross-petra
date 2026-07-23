<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Who fetched which document, and when.
     *
     * One row per download rather than a counter on documents: "did the seller ever
     * actually open the inspection report we sent" is a question about a moment, and a
     * running total cannot answer it. Append-only, like the documents it tracks.
     *
     * user_id is nullable because a public listing document can be downloaded by an
     * anonymous marketplace visitor — the row still records that the file went out.
     *
     * downloaded_at is its own column rather than relying on created_at, so the table
     * reads correctly if rows are ever backfilled from access logs.
     */
    public function up(): void
    {
        Schema::create('download_logs', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('document_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('downloaded_at');
            $table->timestamps();

            // "Download history for this document", newest first.
            $table->index(['document_id', 'downloaded_at']);
            $table->index(['user_id', 'downloaded_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('download_logs');
    }
};
