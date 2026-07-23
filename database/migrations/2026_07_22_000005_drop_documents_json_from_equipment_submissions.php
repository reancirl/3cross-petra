<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Retire the equipment_submissions.documents JSON column.
     *
     * Split from the migration that copies its contents into the documents table so the
     * two halves can be reasoned about separately, but mainly because leaving the column
     * in place would be actively dangerous: an Eloquent relation named documents() and a
     * cast attribute named documents cannot coexist — the attribute wins, and every
     * caller would silently keep reading the stale JSON while the broker edited rows.
     * One name, one meaning.
     *
     * Rolling back re-creates the column empty; the previous migration's down() is what
     * refills it, and migrations reverse in order, so the pair round-trips.
     *
     * The photos column is untouched. Photos are not documents, they have no visibility
     * rules, and the marketplace gallery still serves them statically from the public disk.
     */
    public function up(): void
    {
        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->dropColumn('documents');
        });
    }

    public function down(): void
    {
        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->json('documents')->nullable()->after('photos');
        });
    }
};
