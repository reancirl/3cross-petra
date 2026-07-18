<?php

namespace App\Http\Controllers;

use App\Models\EquipmentSubmission;
use App\Models\User;
use App\Support\PublicListingPresenter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EquipmentListingController extends Controller
{
    public function show(string $listing): Response
    {
        $equipment = $this->findPublicListing($listing);

        abort_unless($equipment !== null, 404);

        $detail = PublicListingPresenter::detail($equipment);

        return Inertia::render('EquipmentDetail', [
            'listing' => $detail,
            'canonicalUrl' => url("/equipment/{$equipment->public_id}"),
            'ogImageUrl' => asset(ltrim($equipment->cardImageUrl(), '/')),
        ]);
    }

    public function storeInquiry(Request $request, string $listing): RedirectResponse
    {
        $equipment = $this->findPublicListing($listing);

        abort_unless($equipment !== null, 404);

        // A signed-in buyer inquires as themselves; a guest gives contact details,
        // which back a shadow buyer account keyed on email.
        $buyer = $request->user();

        if ($buyer === null) {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'max:255'],
                'phone' => ['nullable', 'string', 'max:40'],
                'company_name' => ['nullable', 'string', 'max:255'],
                'note' => ['nullable', 'string', 'max:2000'],
            ]);

            $buyer = User::firstOrCreate(
                ['email' => $validated['email']],
                [
                    'name' => $validated['name'],
                    'password' => Str::random(40),
                    'phone' => $validated['phone'] ?? null,
                    'company_name' => $validated['company_name'] ?? null,
                    'user_type' => User::TYPE_BUYER,
                ],
            );

            $buyer->forceFill([
                'phone' => $buyer->phone ?: ($validated['phone'] ?? null),
                'company_name' => $buyer->company_name ?: ($validated['company_name'] ?? null),
            ])->save();

            $validated += ['phone' => null, 'company_name' => null, 'note' => null];
        } else {
            $validated = $request->validate([
                'note' => ['nullable', 'string', 'max:2000'],
            ]);
            $validated += [
                'name' => $buyer->name,
                'email' => $buyer->email,
                'phone' => $buyer->phone,
                'company_name' => $buyer->company_name,
            ];
        }

        // One open quote per buyer per listing. Repeat submissions (a reload, a second
        // tab, or simple impatience) would otherwise pile duplicate rows into the broker
        // queue and the buyer's Quotes page. Checked after the buyer is resolved so it
        // covers guests too — their shadow account is keyed on email, so the same person
        // inquiring twice resolves to the same user. Once the broker closes the request
        // the buyer is free to ask again.
        if ($this->hasOpenQuoteInquiry($buyer, $equipment)) {
            return back()->with('status', 'You already have an open quote request on this listing — Petra will follow up there.');
        }

        $buyer->equipmentRequests()->create([
            'equipment_submission_id' => $equipment->id,
            'equipment_type' => "Quote Request: {$equipment->title}",
            'specifications' => $this->formatInquiryNote($equipment, $validated),
            'budget_range' => 'Quote requested',
            'location_preference' => $equipment->city ? "{$equipment->region} — {$equipment->city}" : $equipment->region,
            'timeline' => 'Availability, pricing, and inspection confirmation requested',
        ]);

        return back()->with('status', 'Request sent to Petra broker review.');
    }

    /**
     * Does this buyer already have an unresolved quote request on this listing?
     *
     * The unique index added alongside this (see the add_unique_open_quote_inquiry
     * migration) is the race backstop for two simultaneous submits; this check is what
     * turns that constraint into a friendly message rather than a 500.
     */
    private function hasOpenQuoteInquiry(User $buyer, EquipmentSubmission $equipment): bool
    {
        return $buyer->equipmentRequests()
            ->where('equipment_submission_id', $equipment->id)
            ->open()
            ->exists();
    }

    private function findPublicListing(string $publicId): ?EquipmentSubmission
    {
        return EquipmentSubmission::query()
            ->publiclyVisible()
            ->whereRaw('lower(public_id) = ?', [Str::lower($publicId)])
            ->first();
    }

    /**
     * @param  array<string, string|null>  $contact
     */
    private function formatInquiryNote(EquipmentSubmission $equipment, array $contact): string
    {
        $lines = [
            'Listing inquiry from equipment detail page.',
            "Listing ID: {$equipment->public_id}",
            "Equipment: {$equipment->title}",
            "Availability: {$equipment->listingStatus()->publicLabel()}",
            "Region: {$equipment->region}",
            '',
            "Buyer name: {$contact['name']}",
            "Buyer email: {$contact['email']}",
            'Buyer phone: '.($contact['phone'] ?: 'Not provided'),
            'Company: '.($contact['company_name'] ?: 'Not provided'),
        ];

        if (! empty($contact['note'])) {
            $lines[] = '';
            $lines[] = 'Buyer note:';
            $lines[] = $contact['note'];
        }

        return implode("\n", $lines);
    }
}
