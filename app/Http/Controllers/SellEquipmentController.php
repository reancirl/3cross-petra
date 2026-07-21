<?php

namespace App\Http\Controllers;

use App\Enums\ListingStatus;
use App\Http\Requests\StorePublicEquipmentSubmissionRequest;
use App\Models\EquipmentSubmission;
use App\Models\User;
use App\Support\PublicLocationOptions;
use App\Support\UploadStore;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The public Sell Equipment section's interactive pages. The purely editorial pages are
 * plain closures in routes/web.php; these two need option lists and accept submissions.
 */
class SellEquipmentController extends Controller
{
    public function submissionForm(): Response
    {
        return Inertia::render('SellEquipment/EquipmentSubmission', [
            'canonicalUrl' => url('/sell-equipment/equipment-submission'),
            'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
            // Every option list comes from the model / support class rather than the copy
            // JSON, so the dropdowns and the validation rules can never disagree.
            'categoryOptions' => EquipmentSubmission::CATEGORIES,
            'locationOptions' => PublicLocationOptions::all(),
            'conditionOptions' => EquipmentSubmission::CONDITIONS,
            'ownershipOptions' => EquipmentSubmission::OWNERSHIP_OPTIONS,
            'intentOptions' => EquipmentSubmission::INTENT_OPTIONS,
            'availabilityOptions' => EquipmentSubmission::AVAILABILITY_OPTIONS,
            'valueRangeOptions' => EquipmentSubmission::VALUE_RANGE_OPTIONS,
        ]);
    }

    /**
     * Take a public submission into the same review pipeline the portal feeds.
     *
     * A signed-in seller's submission is attached to their account and shows up in My
     * Listings. Anyone else — a guest, or a signed-in buyer or broker, neither of whom has a
     * seller portal to see it in — becomes an unclaimed lead: user_id stays null and the
     * broker works it from the contact_* columns. No account is created on a visitor's
     * behalf, which is a deliberate departure from the buyer inquiry flow in
     * EquipmentListingController::storeInquiry.
     */
    public function storeSubmission(StorePublicEquipmentSubmissionRequest $request): RedirectResponse
    {
        // Honeypot. The field is hidden from people and from screen readers, so anything in
        // it came from a bot. Answer exactly as a real submission would — a bot that can tell
        // it was filtered just adapts.
        if (filled($request->input('website'))) {
            return redirect('/sell-equipment/equipment-submission/thank-you');
        }

        $validated = $request->validated();
        $location = PublicLocationOptions::resolve($validated['location']);
        $intent = $validated['intent'];
        $user = $request->user();
        $isSeller = $user?->user_type === User::TYPE_SELLER;

        EquipmentSubmission::create([
            'user_id' => $isSeller ? $user->id : null,
            'title' => $validated['description'],
            'quantity' => $validated['quantity'],
            'category' => $validated['category'],
            'region' => $location['region'],
            'wyoming_subregion' => $location['wyoming_subregion'],
            'condition' => $validated['condition'],
            'condition_notes' => $validated['additional_info'] ?? null,
            // Asking price is never collected here; estimated_value_range records the
            // seller's own ballpark, and a valuation request sets the existing flag the
            // portal and broker queue already read.
            'asking_price' => null,
            'needs_valuation' => in_array(EquipmentSubmission::INTENT_REQUEST_VALUATION, $intent, true),
            'is_owner' => $validated['is_owner'],
            'intent' => $intent,
            'availability' => $validated['availability'],
            'estimated_value_range' => $validated['estimated_value_range'] ?? null,
            'contact_name' => $isSeller ? null : $validated['full_name'],
            'contact_company' => $isSeller ? null : $validated['company'],
            'contact_email' => $isSeller ? null : $validated['email'],
            'contact_phone' => $isSeller ? null : $validated['phone'],
            'consented_at' => now(),
            'source' => EquipmentSubmission::SOURCE_PUBLIC,
            'photos' => $this->storeUploads($request->file('photos', []), 'photos'),
            'documents' => $this->storeUploads($request->file('documents', []), 'documents'),
            'status' => ListingStatus::UnderReview,
        ]);

        return redirect('/sell-equipment/equipment-submission/thank-you');
    }

    /**
     * @param  array<int, UploadedFile>  $files
     * @return array<int, array<string, mixed>>
     */
    private function storeUploads(array $files, string $folder): array
    {
        // Same folders as the portal: a broker reviewing a listing should not care which
        // form it arrived through.
        return UploadStore::storePublicBatch($files, "portal/equipment-submissions/{$folder}");
    }
}
