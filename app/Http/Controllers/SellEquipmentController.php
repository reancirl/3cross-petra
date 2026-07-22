<?php

namespace App\Http\Controllers;

use App\Enums\ListingStatus;
use App\Enums\ThreadSubjectType;
use App\Http\Requests\StoreBrokerInquiryRequest;
use App\Http\Requests\StorePublicEquipmentSubmissionRequest;
use App\Models\BrokerInquiry;
use App\Models\EquipmentSubmission;
use App\Models\User;
use App\Support\DocumentStore;
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
            // value => label: the doc's dropdown ends with "Other" while the stored value
            // stays "Other Equipment" (see EquipmentSubmission::categoryOptions).
            'categoryOptions' => EquipmentSubmission::categoryOptions(),
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

        $submission = EquipmentSubmission::create([
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
            'photos' => $this->storePhotos($request->file('photos', [])),
            'status' => ListingStatus::UnderReview,
        ]);

        // Documents go to the private disk as rows, not into a JSON blob on the public
        // one — the same path the portal form now takes. A submission with no seller
        // account behind it has no uploader to credit and nobody to share back to, so
        // its documents stay broker-only until the listing is claimed.
        DocumentStore::storeCustomerUploads(
            $request->file('documents', []),
            ThreadSubjectType::Listing,
            $submission->id,
            $isSeller ? $user->id : null,
        );

        return redirect('/sell-equipment/equipment-submission/thank-you');
    }

    public function contactBroker(): Response
    {
        return Inertia::render('SellEquipment/ContactBroker', [
            'canonicalUrl' => url('/sell-equipment/contact-broker'),
            'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
            'topicOptions' => BrokerInquiry::TOPICS,
            'preferredContactOptions' => BrokerInquiry::PREFERRED_CONTACT,
            // A dedicated flash key rather than the shared `status` prop, which the portal
            // renders as a toast: here it swaps the whole form out for a success panel, and
            // that is not something an unrelated flash message should be able to trigger.
            'inquirySent' => (bool) session('broker_inquiry_sent'),
        ]);
    }

    /**
     * Record a Talk to a Broker inquiry for the broker Leads queue.
     *
     * Unlike a submission, this never becomes a listing and never creates an account. The
     * row carries its own contact details even for a signed-in visitor — user_id is recorded
     * alongside so a broker can see the account, not instead of the details typed here.
     */
    public function storeBrokerInquiry(StoreBrokerInquiryRequest $request): RedirectResponse
    {
        // Same silent honeypot handling as the submission form above.
        if (filled($request->input('website'))) {
            return $this->backToContactForm();
        }

        BrokerInquiry::create([
            ...$request->safe()->except('consent'),
            'type' => BrokerInquiry::TYPE_BROKER_INQUIRY,
            'user_id' => $request->user()?->id,
            'consented_at' => now(),
            'status' => BrokerInquiry::STATUS_NEW,
        ]);

        return $this->backToContactForm();
    }

    /**
     * Land back on the form's own section so the success panel is what the visitor sees,
     * rather than the top of a long editorial page.
     */
    private function backToContactForm(): RedirectResponse
    {
        return redirect()
            ->to(route('sell-equipment.contact-broker').'#talk-to-a-broker-form')
            ->with('broker_inquiry_sent', true);
    }

    /**
     * @param  array<int, UploadedFile>  $files
     * @return array<int, array<string, mixed>>
     */
    private function storePhotos(array $files): array
    {
        // Same folder as the portal: a broker reviewing a listing should not care which
        // form it arrived through. Photos only — documents are rows now, see
        // App\Support\DocumentStore.
        return UploadStore::storePublicBatch($files, 'portal/equipment-submissions/photos');
    }
}
