<?php

namespace App\Http\Controllers\Portal;

use App\Enums\OfferStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Portal\RespondToOfferRequest;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    /**
     * Seller-facing list of offers made on the authenticated seller's listings.
     *
     * The query is scoped through the user's `offers()` has-many-through relationship,
     * so a seller only ever sees offers tied to their own listings — never another
     * seller's. Route-level protection (user.type:seller) additionally keeps buyers
     * and brokers out of this page entirely.
     *
     * Offers are never created here — brokers create them (see
     * Broker\SubmissionReviewController::storeOffer). Sellers only view and respond.
     */
    public function index(Request $request): Response
    {
        $offers = $request->user()
            ->offers()
            ->with('equipmentSubmission')
            // Qualify the column: this relationship joins offers + equipment_submissions,
            // and both carry a created_at. An unqualified latest() is ambiguous on Postgres.
            ->latest('offers.created_at')
            ->get()
            ->map(fn (Offer $offer): array => $this->serializeOffer($offer))
            ->values();

        return Inertia::render('Portal/SellerOffers', [
            'portal' => [
                'userType' => User::TYPE_SELLER,
                'roleLabel' => 'Seller',
                'dashboardUrl' => route('portal.seller.dashboard'),
                'profileName' => $request->user()->name,
            ],
            'offers' => $offers,
        ]);
    }

    /**
     * Record a seller's response to a pending offer: Accept, Decline, or Counter.
     *
     * COUNTER: stored as status "Countered" plus the seller's counter_amount, which
     * hands the offer back to the broker. The broker answers it in place from the
     * review view — accept the counter, decline it, or re-offer a new amount, which
     * resets this row to Pending and re-opens it here (see
     * Broker\SubmissionReviewController::respondToOffer). Note that accept/decline
     * clear counter_amount, so a counter_amount surviving on an Accepted offer means
     * the broker took the seller's number (see Offer::agreedAmount).
     */
    public function respond(RespondToOfferRequest $request, Offer $offer): RedirectResponse
    {
        // Ownership guard: the offer must belong to one of this seller's listings.
        // Route model binding alone does not scope by owner, so verify explicitly.
        if ($offer->equipmentSubmission?->user_id !== $request->user()->id) {
            abort(403);
        }

        // Only open (Pending) offers can be responded to; a resolved offer is final
        // from the seller's side.
        if (! $offer->isOpenForSeller()) {
            return back()->with('status', 'This offer has already been responded to.');
        }

        $validated = $request->validated();

        [$status, $counterAmount, $message] = match ($validated['action']) {
            RespondToOfferRequest::ACTION_ACCEPT => [OfferStatus::Accepted, null, 'Offer accepted.'],
            RespondToOfferRequest::ACTION_DECLINE => [OfferStatus::Declined, null, 'Offer declined.'],
            RespondToOfferRequest::ACTION_COUNTER => [OfferStatus::Countered, $validated['counter_amount'], 'Counter offer sent.'],
        };

        $offer->update([
            'status' => $status,
            'counter_amount' => $counterAmount,
        ]);

        return back()->with('status', $message);
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeOffer(Offer $offer): array
    {
        $listing = $offer->equipmentSubmission;
        $status = $offer->offerStatus();

        return [
            'id' => $offer->id,
            'listing_title' => $listing?->title,
            'listing_public_id' => $listing?->public_id,
            // Only link when the listing carries a public id (i.e. it was published).
            'listing_href' => $listing?->public_id ? "/equipment/{$listing->public_id}" : null,
            'amount' => $offer->amount,
            'counter_amount' => $offer->counter_amount,
            'offered_at' => $offer->offered_at?->toFormattedDateString(),
            'status' => $status->value,
            'status_label' => $status->label(),
            'status_tone' => $status->tone(),
            'can_respond' => $offer->isOpenForSeller(),
        ];
    }
}
