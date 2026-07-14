<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EquipmentListingController extends Controller
{
    public function show(string $listing): Response
    {
        $equipment = $this->findListing($listing);

        abort_unless($equipment, 404);

        $heroImage = $equipment['media']['photos'][0]['src'] ?? $this->equipmentData()['heroImage'];

        return Inertia::render('EquipmentDetail', [
            'listing' => $equipment,
            'canonicalUrl' => url("/equipment/{$equipment['id']}"),
            'ogImageUrl' => asset(ltrim($heroImage, '/')),
        ]);
    }

    public function storeInquiry(Request $request, string $listing): RedirectResponse
    {
        $equipment = $this->findListing($listing);

        abort_unless($equipment, 404);

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

        $buyer->equipmentRequests()->create([
            'equipment_type' => "Quote Request: {$equipment['name']}",
            'specifications' => $this->formatInquiryNote($equipment, $validated),
            'budget_range' => 'Quote requested',
            'location_preference' => $equipment['location'],
            'timeline' => 'Availability, pricing, and inspection confirmation requested',
        ]);

        return back()->with('status', 'Quote request sent to Petra broker review.');
    }

    /**
     * @return array<string, mixed>|null
     */
    private function findListing(string $listingId): ?array
    {
        return collect($this->equipmentData()['listings'] ?? [])
            ->first(fn (array $listing): bool => Str::lower($listing['id']) === Str::lower($listingId));
    }

    /**
     * @return array<string, mixed>
     */
    private function equipmentData(): array
    {
        return json_decode(file_get_contents(resource_path('js/data/equipment.json')), true, flags: JSON_THROW_ON_ERROR);
    }

    /**
     * @param array<string, mixed> $equipment
     * @param array<string, string|null> $validated
     */
    private function formatInquiryNote(array $equipment, array $validated): string
    {
        $lines = [
            'Listing inquiry from equipment detail page.',
            "Equipment ID: {$equipment['id']}",
            "Equipment name: {$equipment['name']}",
            "Status: {$equipment['status']}",
            "Location: {$equipment['location']}",
            '',
            "Buyer name: {$validated['name']}",
            "Buyer email: {$validated['email']}",
            'Buyer phone: '.($validated['phone'] ?: 'Not provided'),
            'Company: '.($validated['company_name'] ?: 'Not provided'),
        ];

        if (! empty($validated['note'])) {
            $lines[] = '';
            $lines[] = 'Buyer note:';
            $lines[] = $validated['note'];
        }

        return implode("\n", $lines);
    }
}
