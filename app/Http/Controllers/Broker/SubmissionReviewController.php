<?php

namespace App\Http\Controllers\Broker;

use App\Enums\ListingStatus;
use App\Enums\OfferStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Broker\RespondToOfferRequest;
use App\Http\Requests\Broker\StoreOfferRequest;
use App\Http\Requests\Broker\UpdateEquipmentRequestStatusRequest;
use App\Http\Requests\Broker\UpdateEquipmentSubmissionStatusRequest;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubmissionReviewController extends Controller
{
    /**
     * The seller review queue, and the broker's landing page after login.
     *
     * The two queues used to share one tabbed page, which made a single very long
     * scroll. They are now separate sidebar destinations (see routes/web/broker.php),
     * so each page loads only the records it renders.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Broker/Submissions', [
            'portal' => $this->portalData($request),
            'sellerSubmissions' => EquipmentSubmission::with(['user', 'offers' => fn ($query) => $query->latest()])
                ->latest()
                ->get()
                ->map(fn (EquipmentSubmission $submission): array => [
                    'id' => $submission->id,
                    'seller' => $submission->user?->name,
                    'email' => $submission->user?->email,
                    'title' => $submission->title,
                    'category' => $submission->category,
                    'region' => $submission->region,
                    'city' => $submission->city,
                    'condition_label' => $submission->conditionLabel(),
                    'condition_notes' => $submission->condition_notes,
                    'asking_price' => $submission->asking_price,
                    'needs_valuation' => $submission->needs_valuation,
                    'public_id' => $submission->public_id,
                    'public_description' => $submission->public_description,
                    'manufacturer' => $submission->manufacturer,
                    'model' => $submission->model,
                    'year' => $submission->year,
                    'capacity' => $submission->capacity,
                    'featured' => $submission->featured,
                    'photo_count' => count($submission->photos ?? []),
                    'documents' => collect($submission->documents ?? [])->map(fn (array $document): array => [
                        'name' => $document['name'] ?? 'Document',
                        'public' => (bool) ($document['public'] ?? false),
                    ])->values(),
                    'status' => $submission->listingStatus()->value,
                    'status_label' => $submission->statusLabel(),
                    'status_tone' => $submission->listingStatus()->tone(),
                    'created_at' => $submission->created_at?->toFormattedDateString(),
                    'created_at_timestamp' => $submission->created_at?->getTimestamp(),
                    // Offers already logged on this listing, so the broker has context
                    // (including any seller counter) before logging another.
                    'offers' => $submission->offers->map(fn (Offer $offer): array => [
                        'id' => $offer->id,
                        'amount' => $offer->amount,
                        'counter_amount' => $offer->counter_amount,
                        'offered_at' => $offer->offered_at?->toFormattedDateString(),
                        'status' => $offer->offerStatus()->value,
                        'status_label' => $offer->statusLabel(),
                        'status_tone' => $offer->offerStatus()->tone(),
                        // Drives the accept / decline / re-offer controls: true only
                        // while a seller counter is waiting on the broker.
                        'can_respond' => $offer->isOpenForBroker(),
                    ])->values(),
                ])
                ->values(),
            'sellerStatusOptions' => ListingStatus::options(),
            'offerStatusOptions' => OfferStatus::options(),
        ]);
    }

    /**
     * The buyer request queue — the second half of what used to be a tabbed page.
     */
    public function requests(Request $request): Response
    {
        return Inertia::render('Broker/Requests', [
            'portal' => $this->portalData($request),
            'buyerRequests' => EquipmentRequest::with('user')
                ->latest()
                ->get()
                ->map(fn (EquipmentRequest $equipmentRequest): array => [
                    'id' => $equipmentRequest->id,
                    'buyer' => $equipmentRequest->user?->name,
                    'email' => $equipmentRequest->user?->email,
                    'phone' => $equipmentRequest->user?->phone,
                    'company_name' => $equipmentRequest->user?->company_name,
                    'equipment_type' => $equipmentRequest->equipment_type,
                    'specifications' => $equipmentRequest->specifications,
                    'budget_range' => $equipmentRequest->budget_range,
                    'location_preference' => $equipmentRequest->location_preference,
                    'timeline' => $equipmentRequest->timeline,
                    'status' => $equipmentRequest->status,
                    'status_label' => $equipmentRequest->statusLabel(),
                    'created_at' => $equipmentRequest->created_at?->toFormattedDateString(),
                    'created_at_timestamp' => $equipmentRequest->created_at?->getTimestamp(),
                ])
                ->values(),
            'buyerStatusOptions' => EquipmentRequest::STATUSES,
        ]);
    }

    /**
     * Shell data for the shared PortalShell (sidebar + topbar). Brokers have no
     * dashboard, so dashboardUrl points at the seller queue they land on.
     *
     * @return array<string, string>
     */
    private function portalData(Request $request): array
    {
        return [
            'userType' => User::TYPE_BROKER,
            'roleLabel' => 'Broker',
            'dashboardUrl' => route('broker.submissions'),
            'profileName' => $request->user()->name,
        ];
    }

    /**
     * Log an offer against a seller's listing. This is the only entry point for
     * creating an offer anywhere in the app — brokers enter it after negotiating with
     * a buyer off-platform. Sellers then respond from their own Offers page.
     *
     * NOTE (Quotes linkage — not built): a real-world flow likely connects a buyer's
     * Quote request (EquipmentRequest) to the resulting Offer. That link is not
     * modelled — an offer is attached only to the listing, not to any quote. Wire it
     * up once the client confirms Offers and Quotes should be connected.
     */
    public function storeOffer(StoreOfferRequest $request, EquipmentSubmission $equipmentSubmission): RedirectResponse
    {
        // One open negotiation per listing. Without this a broker could stack a second
        // offer on top of an unresolved one, leaving contradictory state on the unit
        // (a Pending offer beside an Accepted one) with nothing saying which governs.
        // The UI hides the form in this case; this is the guard behind it. Flashes
        // rather than 4xx-ing, matching respondToOffer's handling of a resolved offer.
        if ($equipmentSubmission->hasOpenOffer()) {
            return back()->with('status', 'This listing already has an open offer. Resolve it before logging another.');
        }

        $offer = $equipmentSubmission->offers()->create($request->validated());

        // A broker may log an already-agreed deal directly as Accepted, which should
        // move the listing just as a seller's acceptance does.
        if ($offer->offerStatus() === OfferStatus::Accepted) {
            $equipmentSubmission->markDealAgreed();
        }

        return back()->with('status', 'Offer logged for the seller.');
    }

    /**
     * Close the broker's half of the negotiation loop on a seller's counter.
     *
     * A counter used to be a dead end — the broker could only log a second, unrelated
     * offer at the countered amount, leaving the original stuck on "Countered" forever
     * and the two rows unlinked. Instead the broker now resolves the counter in place:
     *
     *   accept  → Accepted, keeping counter_amount as the agreed price (Offer::agreedAmount)
     *   decline → Declined, and the counter amount is cleared with the negotiation
     *   counter → a fresh amount, back to Pending, so the ball returns to the seller
     */
    public function respondToOffer(RespondToOfferRequest $request, Offer $offer): RedirectResponse
    {
        // Only a seller counter is the broker's to answer. Matches the seller-side
        // convention of flashing rather than 4xx-ing on an already-resolved offer.
        if (! $offer->isOpenForBroker()) {
            return back()->with('status', 'This offer is not awaiting a broker response.');
        }

        $validated = $request->validated();

        [$attributes, $message] = match ($validated['action']) {
            RespondToOfferRequest::ACTION_ACCEPT => [
                ['status' => OfferStatus::Accepted],
                'Counter offer accepted at $'.number_format((float) $offer->agreedAmount()).'.',
            ],
            RespondToOfferRequest::ACTION_DECLINE => [
                ['status' => OfferStatus::Declined, 'counter_amount' => null],
                'Counter offer declined.',
            ],
            RespondToOfferRequest::ACTION_COUNTER => [
                [
                    'status' => OfferStatus::Pending,
                    'amount' => $validated['amount'],
                    // The negotiation moves to the new amount, so the stale seller
                    // counter is cleared and the offer re-opens for the seller.
                    'counter_amount' => null,
                    'offered_at' => now()->toDateString(),
                ],
                'Re-offer sent to the seller.',
            ],
        };

        $offer->update($attributes);

        // Accepting the seller's counter closes the negotiation, so the listing moves
        // to Pending alongside it (see EquipmentSubmission::markDealAgreed).
        if ($validated['action'] === RespondToOfferRequest::ACTION_ACCEPT) {
            $offer->equipmentSubmission?->markDealAgreed();
        }

        return back()->with('status', $message);
    }

    public function updateSellerSubmission(
        UpdateEquipmentSubmissionStatusRequest $request,
        EquipmentSubmission $equipmentSubmission,
    ): RedirectResponse {
        $status = ListingStatus::from($request->validated('status'));

        $attributes = [
            'status' => $status,
            'public_description' => $request->validated('public_description'),
            'manufacturer' => $request->validated('manufacturer'),
            'model' => $request->validated('model'),
            'year' => $request->validated('year'),
            'capacity' => $request->validated('capacity'),
            'featured' => $request->boolean('featured'),
            'documents' => $this->applyDocumentVisibility(
                $equipmentSubmission->documents ?? [],
                $request->validated('documents_public', []),
            ),
        ];

        // Stamp a public id + publish time the first time a listing goes public.
        if ($status === ListingStatus::Published) {
            $attributes['public_id'] = $equipmentSubmission->public_id ?? EquipmentSubmission::generatePublicId();
            $attributes['published_at'] = $equipmentSubmission->published_at ?? now();
        }

        // Track the sold moment for the 30-day public-visibility window.
        $attributes['sold_at'] = $status === ListingStatus::Sold
            ? ($equipmentSubmission->sold_at ?? now())
            : null;

        $equipmentSubmission->update($attributes);

        $message = $status === ListingStatus::Published
            ? "Listing published as {$equipmentSubmission->public_id}."
            : 'Seller submission updated.';

        return back()->with('status', $message);
    }

    /**
     * Merge broker per-document public/private choices back into the stored documents.
     *
     * @param  array<int, array<string, mixed>>  $documents
     * @param  array<int, bool>  $visibility
     * @return array<int, array<string, mixed>>
     */
    private function applyDocumentVisibility(array $documents, array $visibility): array
    {
        return collect($documents)
            ->map(function (array $document, int $index) use ($visibility): array {
                $document['public'] = (bool) ($visibility[$index] ?? ($document['public'] ?? false));

                return $document;
            })
            ->all();
    }

    public function updateBuyerRequest(
        UpdateEquipmentRequestStatusRequest $request,
        EquipmentRequest $equipmentRequest,
    ): RedirectResponse {
        $equipmentRequest->update($request->safe()->only(['status']));

        return back()->with('status', 'Buyer request status updated.');
    }
}
