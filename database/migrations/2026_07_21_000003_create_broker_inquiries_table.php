<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * "Talk to a Broker" submissions from the public Sell Equipment section.
     *
     * These are leads, not listings and not buyer requests: someone asking a question, who
     * may have no equipment in the system at all. They get their own table so the broker's
     * Leads queue stays separate from the buyer-quote pipeline in equipment_requests.
     *
     * user_id is recorded when a signed-in visitor submits, but it is informational only —
     * every inquiry carries its own contact details and is answered from them.
     */
    public function up(): void
    {
        Schema::create('broker_inquiries', function (Blueprint $table): void {
            $table->id();
            $table->string('type')->default('broker_inquiry');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('full_name');
            $table->string('company')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->string('topic');
            $table->string('equipment_type')->nullable();
            $table->text('message');
            $table->string('preferred_contact');
            $table->timestamp('consented_at')->nullable();
            $table->string('status')->default('new');
            $table->timestamps();

            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('broker_inquiries');
    }
};
