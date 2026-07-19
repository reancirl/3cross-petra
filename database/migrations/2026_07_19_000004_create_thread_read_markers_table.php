<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * How far each side has read into a thread. One row per side per thread,
     * enforced by the unique index.
     *
     * A high-water mark rather than per-message read rows: unread is
     * "messages.id > last_read_message_id", which is a single indexed comparison
     * and needs no backfill when a thread is created. Note this is read state for
     * the *reader's* own UI only — the spec explicitly rules out showing read
     * receipts to the other side, and nothing serializes these rows to the
     * counterparty.
     *
     * last_read_message_id is nullable so a marker can exist meaning "nothing read
     * yet", and nullOnDelete keeps the marker sane if its message ever disappears.
     */
    public function up(): void
    {
        Schema::create('thread_read_markers', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('thread_id')->constrained()->cascadeOnDelete();
            $table->string('side');
            $table->foreignId('last_read_message_id')->nullable()->constrained('messages')->nullOnDelete();
            $table->timestamps();

            $table->unique(['thread_id', 'side']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('thread_read_markers');
    }
};
