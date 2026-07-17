<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\EquipmentRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    /**
     * Buyer-facing list of "Request Quote" inquiries the authenticated buyer has
     * raised from Equipment Detail pages. The query is scoped through the user
     * relationship, so a buyer only ever sees their own inquiries — never another
     * buyer's. Route-level protection (user.type:buyer) additionally keeps sellers
     * and brokers out of this page entirely.
     */
    public function index(Request $request): Response
    {
        $quotes = $request->user()
            ->equipmentRequests()
            ->quoteInquiries()
            ->with('equipmentSubmission')
            ->latest()
            ->get()
            ->map(fn (EquipmentRequest $quote): array => $this->serializeQuote($quote))
            ->values();

        return Inertia::render('Portal/BuyerQuotes', [
            'portal' => [
                'userType' => User::TYPE_BUYER,
                'roleLabel' => 'Buyer',
                'dashboardUrl' => route('portal.buyer.dashboard'),
                'profileName' => $request->user()->name,
            ],
            'quotes' => $quotes,
            // Reused buyer status ladder. See EquipmentRequest::STATUSES for the open
            // question about whether this ladder fits quote-on-a-listing inquiries.
            'statusOptions' => EquipmentRequest::STATUSES,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeQuote(EquipmentRequest $quote): array
    {
        $listing = $quote->equipmentSubmission;

        return [
            'id' => $quote->id,
            // Prefer the live listing title; fall back to the stored label if the
            // listing has since been removed (equipment_submission_id nulled on delete).
            'equipment_name' => $listing?->title ?? $quote->equipment_type,
            'listing_public_id' => $listing?->public_id,
            // Only link when the listing carries a public id (i.e. it was published).
            'listing_href' => $listing?->public_id ? "/equipment/{$listing->public_id}" : null,
            'note' => $quote->specifications,
            'status' => $quote->status,
            'status_label' => $quote->statusLabel(),
            'created_at' => $quote->created_at?->toFormattedDateString(),
        ];
    }
}
