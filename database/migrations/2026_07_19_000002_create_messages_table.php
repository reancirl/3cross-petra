<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Append-only message log. There are deliberately no update or delete
     * endpoints — a support transcript that can be rewritten after the fact is
     * not a transcript. Nothing in the app issues an UPDATE against this table.
     *
     * body is nullable because a message may carry only attachments; the
     * "body or at least one attachment" rule is enforced in StoreMessageRequest,
     * which is the only writer.
     *
     * sender_id stores the real author even for broker messages, which customers
     * always see attributed to "Petra" (App\Enums\ThreadSide::publicSenderName).
     * The column is nullable so deleting a staff account redacts authorship
     * without destroying the customer's conversation history.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('thread_id')->constrained()->cascadeOnDelete();
            $table->string('sender_type');
            $table->foreignId('sender_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('body')->nullable();
            $table->timestamps();

            // Paginating a thread newest-first, and resolving its latest message.
            $table->index(['thread_id', 'id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
