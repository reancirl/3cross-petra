<?php

use App\Enums\ThreadStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Subject-anchored support threads between one customer and Petra.
     *
     * subject_type / subject_id is a deliberate hand-rolled polymorphic pair rather
     * than $table->morphs(): the two subjects are EquipmentSubmission and
     * EquipmentRequest, and storing the short 'listing' / 'buyer_request' vocabulary
     * (App\Enums\ThreadSubjectType) keeps the column readable and stable if either
     * model class is ever renamed — the same reason the rest of this schema stores
     * enums as plain strings rather than class names or native DB enums.
     *
     * The unique index is what enforces "one thread per user per subject", so the
     * find-or-create in MessageThreadService cannot race two rows into existence.
     *
     * user_notified_at / broker_notified_at back the 10-minute email suppression
     * window (see App\Support\ThreadNotifier). They live here, one column per side,
     * rather than in a separate table because there is exactly one value per side
     * per thread and it is overwritten in place every time.
     */
    public function up(): void
    {
        Schema::create('threads', function (Blueprint $table): void {
            $table->id();
            $table->string('subject_type');
            $table->unsignedBigInteger('subject_id');
            // A thread is meaningless without its customer, so it goes with them.
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('status')->default(ThreadStatus::Open->value);
            $table->timestamp('last_message_at')->nullable();
            $table->timestamp('user_notified_at')->nullable();
            $table->timestamp('broker_notified_at')->nullable();
            $table->timestamps();

            // One thread per user per subject.
            $table->unique(['subject_type', 'subject_id', 'user_id']);
            // The user-side thread list: my threads, most recently active first.
            $table->index(['user_id', 'last_message_at']);
            // The broker inbox: every thread, most recently active first.
            $table->index(['status', 'last_message_at']);
            // Resolving "does this listing already have a thread with this user".
            $table->index(['subject_type', 'subject_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('threads');
    }
};
