<?php

namespace App\Models;

use App\Enums\OfferStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * An offer a broker has logged against a seller's listing.
 *
 * ASSUMPTION (field list): the client content doc defines "Offers" only as the
 * final step of the seller process (Sell Equipment page: "We handle outreach and
 * negotiation" → "You receive actual offers"). It does not spell out what an Offer
 * contains, so this model is kept intentionally minimal and inferrable from context:
 *   - equipment_submission_id — which of the seller's listings the offer is on
 *   - amount                  — the offer amount
 *   - offered_at              — the date of the offer
 *   - status                  — Pending / Accepted / Declined / Countered
 *   - counter_amount          — set when a seller responds with "Counter", and kept
 *                               on the record if the broker then accepts that counter
 *                               (it becomes the agreed price — see agreedAmount())
 * Expand this once the client confirms the real field set.
 *
 * NEGOTIATION LOOP: a single offer row carries the whole back-and-forth rather than
 * spawning a new row per round. Broker logs Pending → seller Counters → broker either
 * accepts the counter, declines it, or re-offers a new amount which resets the row to
 * Pending for the seller. Only one side holds the ball at a time; see isOpenForSeller()
 * and isOpenForBroker().
 *
 * RELATIONSHIP TO QUOTES (not built): a real-world flow likely connects a buyer's
 * Quote request to a seller's Offer (buyer requests a quote → broker negotiates
 * off-platform → broker logs an offer for the seller). That linkage is deliberately
 * NOT modelled here — Offers and Quotes (EquipmentRequest) remain separate, unlinked
 * records until the client confirms they should be connected. See EquipmentRequest.
 *
 * Offers are created and edited only by brokers (see Broker\SubmissionReviewController);
 * sellers view and respond to them (see Portal\OfferController).
 */
#[Fillable(['equipment_submission_id', 'amount', 'offered_at', 'counter_amount', 'status'])]
class Offer extends Model
{
    /**
     * The listing this offer was made on.
     *
     * @return BelongsTo<EquipmentSubmission, Offer>
     */
    public function equipmentSubmission(): BelongsTo
    {
        return $this->belongsTo(EquipmentSubmission::class);
    }

    public function offerStatus(): OfferStatus
    {
        return $this->status instanceof OfferStatus
            ? $this->status
            : (OfferStatus::tryFrom((string) $this->status) ?? OfferStatus::Pending);
    }

    public function statusLabel(): string
    {
        return $this->offerStatus()->label();
    }

    /**
     * A seller may only respond while the offer is still open (Pending). Once a
     * seller has accepted, declined, or countered, the offer is resolved from the
     * seller's side.
     */
    public function isOpenForSeller(): bool
    {
        return $this->offerStatus() === OfferStatus::Pending;
    }

    /**
     * The ball is in the broker's court only once a seller has countered. Pending
     * offers are the seller's to answer; Accepted/Declined are final for both sides.
     */
    public function isOpenForBroker(): bool
    {
        return $this->offerStatus() === OfferStatus::Countered;
    }

    /**
     * Still under negotiation — the ball is with the seller (Pending) or back with the
     * broker (Countered). Accepted and Declined are final for both sides.
     *
     * A listing may only carry one open offer at a time (see
     * EquipmentSubmission::hasOpenOffer): logging a second offer alongside an unresolved
     * one produced contradictory state, e.g. a Pending $10,000 sitting next to an
     * Accepted $1,000 on the same unit, with nothing saying which one governs.
     */
    public function isOpen(): bool
    {
        return $this->isOpenForSeller() || $this->isOpenForBroker();
    }

    /**
     * The amount the two sides actually settled on.
     *
     * A counter overwrites the number under negotiation, so once an offer is
     * Accepted with a counter_amount still set, that counter is the agreed price —
     * a seller accepting outright clears counter_amount (see Portal\OfferController),
     * so a surviving counter_amount unambiguously means "the broker took the counter".
     */
    public function agreedAmount(): string
    {
        return $this->counter_amount ?? $this->amount;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'counter_amount' => 'decimal:2',
            'offered_at' => 'date',
            'status' => OfferStatus::class,
        ];
    }
}
