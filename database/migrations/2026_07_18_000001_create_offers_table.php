<?php

use App\Enums\OfferStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Offers a broker has logged against a seller's listing.
     *
     * ASSUMPTION (field list): the content doc only defines "Offers" as the final
     * step of the seller journey ("You receive actual offers") and does not spell
     * out what an Offer contains. These columns — the listing it is on, an amount,
     * a date, and a status — are the minimal, inferrable shape. Revisit once the
     * client defines the object model (see App\Models\Offer for the full note).
     *
     * counter_amount is populated when a seller responds with "Counter", and is kept
     * if the broker then accepts that counter — at which point it is the agreed price
     * (see App\Models\Offer::agreedAmount). A single row carries the whole
     * back-and-forth; a re-offer overwrites amount and resets the row to Pending.
     */
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table): void {
            // An offer is meaningless without its listing, so it is deleted with it.
            $table->id();
            $table->foreignId('equipment_submission_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 12, 2);
            $table->date('offered_at');
            $table->decimal('counter_amount', 12, 2)->nullable();
            $table->string('status')->default(OfferStatus::Pending->value);
            $table->timestamps();

            $table->index(['equipment_submission_id', 'created_at']);
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
