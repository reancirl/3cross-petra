<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Two per-user timestamps behind the Documents hub.
     *
     * documents_last_viewed_at is the "new" badge. Deliberately one marker for the
     * whole hub rather than a per-document seen table: the badge answers "is there
     * anything here I have not looked at", and the page shows everything at once, so
     * a single high-water mark is exactly as precise as the question. Threads need
     * per-thread markers because they are read one at a time; this page is not.
     *
     * documents_notified_at is the share-email suppression window, the same trick
     * App\Support\ThreadNotifier plays with threads.user_notified_at. It is keyed per
     * recipient rather than per subject on purpose: a broker attaching five files in
     * one sitting should cost the customer one email, even when the files land on
     * different listings. The tradeoff is inherited from ThreadNotifier — suppressed
     * shares are never re-notified, and the customer finds them on the page the first
     * email pointed them at.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->timestamp('documents_last_viewed_at')->nullable()->after('company_name');
            $table->timestamp('documents_notified_at')->nullable()->after('documents_last_viewed_at');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['documents_last_viewed_at', 'documents_notified_at']);
        });
    }
};
