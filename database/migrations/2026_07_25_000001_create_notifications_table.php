<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * The in-app notification feed — one row per event the portal wants to resurface.
     *
     * Two recipient shapes share the table. A customer notification carries
     * recipient_type = 'user' and a recipient_id, and its read state is that user's
     * alone. A broker notification carries recipient_type = 'broker' and a null
     * recipient_id: the broker feed is shared, the same shared-inbox model the messaging
     * work established, so one row serves every broker and its read_at is shared between
     * them. That decision — shared read state rather than a broker_notification_reads
     * table — is the simpler of the two the spec offered, and it is the consistent one:
     * thread_read_markers already keys broker read state on the side, not the user, and
     * there is a single broker account behind the queues. If Petra ever issues per-broker
     * logins that need private read state, a reads table is the same additive step the
     * documents badge already anticipates.
     *
     * subject_type / subject_id is the hand-rolled polymorphic pair threads and documents
     * use, storing the short 'listing' / 'buyer_request' vocabulary (plus 'thread',
     * 'document' and 'broker_inquiry', which are notification-only and not in the morph
     * map). It is what a row resolves its deep link from — the feed never renders a
     * subject through Eloquent, it builds a URL from the pair.
     *
     * title is rendered once, at creation ("Your … is now Published"), and stored — the
     * subject may change status or be deleted afterwards, and the feed should still read
     * as it did when the event happened.
     *
     * Retention is 90 days, enforced by the Prunable trait on the model plus a daily
     * model:prune schedule (routes/console.php); see App\Models\Notification::prunable().
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table): void {
            $table->id();

            // 'user' or 'broker'. Broker rows are the shared feed and leave recipient_id null.
            $table->string('recipient_type');
            $table->foreignId('recipient_id')->nullable()->constrained('users')->cascadeOnDelete();

            $table->string('type');

            // What the notification is about, for the deep link. Nullable so a future
            // account-level notice with no subject still fits.
            $table->string('subject_type')->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();

            // Rendered at creation and frozen — see the class comment above.
            $table->string('title');

            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            // The feed: "my notifications, newest first."
            $table->index(['recipient_type', 'recipient_id', 'created_at']);
            // The unread count and the message-collapse lookup both filter on read_at
            // within a recipient.
            $table->index(['recipient_type', 'recipient_id', 'read_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
