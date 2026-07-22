<?php

namespace Tests\Feature;

use App\Enums\ListingStatus;
use App\Models\EquipmentSubmission;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PublicEquipmentSubmissionTest extends TestCase
{
    use LazilyRefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'full_name' => 'Dale Rivers',
            'company' => 'Rivers Production',
            'email' => 'dale@riversproduction.test',
            'phone' => '307-555-0142',
            'category' => 'Compressors',
            'description' => 'Ariel JGK/4 Compressor Package',
            'quantity' => 2,
            'location' => 'wyoming_powder_river',
            'condition' => EquipmentSubmission::CONDITION_OPERATIONAL_BUT_IDLE,
            'is_owner' => 'owner',
            'intent' => ['sell_one'],
            'availability' => 'available_now',
            'estimated_value_range' => '100k_500k',
            'additional_info' => 'Stored indoors since 2025.',
            'consent_accuracy' => true,
            'consent_contact' => true,
        ], $overrides);
    }

    public function test_guest_submission_creates_an_unclaimed_lead_without_creating_an_account(): void
    {
        $usersBefore = User::count();

        $this->post('/sell-equipment/equipment-submission', $this->payload())
            ->assertRedirect('/sell-equipment/equipment-submission/thank-you');

        $submission = EquipmentSubmission::sole();

        $this->assertNull($submission->user_id, 'A guest submission must stay unclaimed.');
        $this->assertTrue($submission->isUnclaimedLead());
        $this->assertSame('Dale Rivers', $submission->contact_name);
        $this->assertSame('Rivers Production', $submission->contact_company);
        $this->assertSame('dale@riversproduction.test', $submission->contact_email);
        $this->assertSame('307-555-0142', $submission->contact_phone);
        $this->assertSame(EquipmentSubmission::SOURCE_PUBLIC, $submission->source);
        $this->assertSame(ListingStatus::UnderReview, $submission->listingStatus());
        $this->assertNotNull($submission->consented_at);

        // The doc's "Equipment Description" is the listing title; "Additional Information"
        // lands in the notes field the broker already reads.
        $this->assertSame('Ariel JGK/4 Compressor Package', $submission->title);
        $this->assertSame('Stored indoors since 2025.', $submission->condition_notes);
        $this->assertSame(2, $submission->quantity);
        $this->assertSame('owner', $submission->is_owner);
        $this->assertSame(['sell_one'], $submission->intent);
        $this->assertSame('available_now', $submission->availability);
        $this->assertSame('100k_500k', $submission->estimated_value_range);

        $this->assertSame($usersBefore, User::count(), 'Public submissions must never create accounts.');
    }

    public function test_wyoming_sub_region_is_resolved_onto_region_and_subregion(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload());

        $submission = EquipmentSubmission::sole();

        $this->assertSame('Wyoming', $submission->region);
        $this->assertSame('powder_river', $submission->wyoming_subregion);
        $this->assertSame('Powder River', $submission->wyomingSubregionLabel());
    }

    public function test_non_wyoming_location_stores_no_sub_region(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload(['location' => 'north_dakota']));

        $submission = EquipmentSubmission::sole();

        $this->assertSame('North Dakota', $submission->region);
        $this->assertNull($submission->wyoming_subregion);
    }

    public function test_requesting_a_valuation_sets_the_needs_valuation_flag(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload([
            'intent' => ['sell_multiple', EquipmentSubmission::INTENT_REQUEST_VALUATION],
        ]));

        $submission = EquipmentSubmission::sole();

        $this->assertTrue($submission->needs_valuation);
        $this->assertNull($submission->asking_price);
    }

    public function test_intent_without_a_valuation_request_leaves_the_flag_false(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload(['intent' => ['liquidate_surplus']]));

        $this->assertFalse(EquipmentSubmission::sole()->needs_valuation);
    }

    public function test_signed_in_seller_submission_is_attached_and_appears_in_my_listings(): void
    {
        $seller = User::factory()->create(['user_type' => User::TYPE_SELLER]);

        $this->actingAs($seller)
            ->post('/sell-equipment/equipment-submission', $this->payload())
            ->assertRedirect('/sell-equipment/equipment-submission/thank-you');

        $submission = EquipmentSubmission::sole();

        $this->assertSame($seller->id, $submission->user_id);
        $this->assertFalse($submission->isUnclaimedLead());
        // Contact columns stay empty — the account is the source of truth for a seller.
        $this->assertNull($submission->contact_email);

        $this->actingAs($seller)
            ->get('/seller/listings')
            ->assertOk()
            // Not the full title: Inertia serialises page props as JSON, which escapes the
            // slash in "JGK/4" to "JGK\/4".
            ->assertSee('Compressor Package');
    }

    public function test_seller_submission_does_not_require_contact_fields(): void
    {
        $seller = User::factory()->create(['user_type' => User::TYPE_SELLER]);

        $payload = $this->payload();
        unset($payload['full_name'], $payload['company'], $payload['email'], $payload['phone']);

        $this->actingAs($seller)
            ->post('/sell-equipment/equipment-submission', $payload)
            ->assertRedirect('/sell-equipment/equipment-submission/thank-you');

        $this->assertSame($seller->id, EquipmentSubmission::sole()->user_id);
    }

    public function test_signed_in_buyer_submission_stays_an_unclaimed_lead(): void
    {
        // A buyer has no seller portal to see the listing in, so it is worked as a lead.
        $buyer = User::factory()->create(['user_type' => User::TYPE_BUYER]);

        $this->actingAs($buyer)->post('/sell-equipment/equipment-submission', $this->payload());

        $submission = EquipmentSubmission::sole();

        $this->assertNull($submission->user_id);
        $this->assertSame('dale@riversproduction.test', $submission->contact_email);
    }

    public function test_uploads_are_stored_against_the_submission(): void
    {
        Storage::fake('public');

        $this->post('/sell-equipment/equipment-submission', $this->payload([
            'photos' => [UploadedFile::fake()->image('unit.jpg')],
            'documents' => [UploadedFile::fake()->create('spec.pdf', 12)],
        ]));

        $submission = EquipmentSubmission::sole();

        $this->assertCount(1, $submission->photos);
        $this->assertCount(1, $submission->documents);
        $this->assertSame('unit.jpg', $submission->photos[0]['name']);
    }

    public function test_both_consent_checkboxes_are_required(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload(['consent_accuracy' => false]))
            ->assertSessionHasErrors('consent_accuracy');

        $this->post('/sell-equipment/equipment-submission', $this->payload(['consent_contact' => false]))
            ->assertSessionHasErrors('consent_contact');

        $this->assertSame(0, EquipmentSubmission::count());
    }

    public function test_intent_must_have_at_least_one_selection(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload(['intent' => []]))
            ->assertSessionHasErrors('intent');
    }

    public function test_unknown_location_is_rejected(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload(['location' => 'atlantis']))
            ->assertSessionHasErrors('location');
    }

    public function test_guest_must_supply_contact_details(): void
    {
        $payload = $this->payload();
        unset($payload['full_name'], $payload['email'], $payload['phone'], $payload['company']);

        $this->post('/sell-equipment/equipment-submission', $payload)
            ->assertSessionHasErrors(['full_name', 'company', 'email', 'phone']);
    }

    public function test_renamed_condition_values_are_accepted_and_old_ones_are_not(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload([
            'condition' => EquipmentSubmission::CONDITION_REMOVED_FROM_SERVICE,
        ]))->assertRedirect('/sell-equipment/equipment-submission/thank-you');

        $this->post('/sell-equipment/equipment-submission', $this->payload(['condition' => 'sitting_idle']))
            ->assertSessionHasErrors('condition');
    }

    public function test_honeypot_submission_is_silently_discarded(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload(['website' => 'http://spam.test']))
            ->assertRedirect('/sell-equipment/equipment-submission/thank-you');

        $this->assertSame(0, EquipmentSubmission::count(), 'A filled honeypot must not create a row.');
    }

    public function test_broker_sees_the_unclaimed_lead_with_its_contact_details(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload());

        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);

        $this->actingAs($broker)
            ->get('/broker/submissions')
            ->assertOk()
            ->assertSee('Dale Rivers')
            ->assertSee('dale@riversproduction.test')
            ->assertSee('307-555-0142')
            ->assertSee('Rivers Production')
            ->assertSee('"is_unclaimed_lead":true', false);
    }

    public function test_the_broker_queue_carries_the_public_forms_selling_intent_answers(): void
    {
        $this->post('/sell-equipment/equipment-submission', $this->payload());

        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);

        $this->actingAs($broker)
            ->get('/broker/submissions')
            ->assertOk()
            ->assertSee('"quantity":2', false)
            ->assertSee('"source":"public"', false)
            ->assertSee('Powder River')
            // Labels, not raw keys — the queue renders these straight into the slide-over.
            ->assertSee('Sell one piece of equipment')
            // Prefix only: JSON-encoding the props escapes the label's en-dash to –, the
            // same way it escapes "/" (see the note on the seller test above).
            ->assertSee('"value_range_label":"$100,000', false);
    }

    public function test_a_portal_submission_carries_no_selling_intent_answers(): void
    {
        // The portal form never asks them, so the broker UI has nothing to render and the
        // payload must say so rather than inventing defaults.
        $seller = User::factory()->create(['user_type' => User::TYPE_SELLER]);
        EquipmentSubmission::create([
            'user_id' => $seller->id,
            'title' => 'Portal Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'condition' => EquipmentSubmission::CONDITION_OPERATING,
            'status' => ListingStatus::UnderReview,
        ]);

        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);

        $this->actingAs($broker)
            ->get('/broker/submissions')
            ->assertOk()
            ->assertSee('"is_unclaimed_lead":false', false)
            ->assertSee('"source":"portal"', false)
            ->assertSee('"ownership_label":null', false)
            ->assertSee('"intent_labels":[]', false)
            ->assertSee('"wyoming_subregion_label":null', false);
    }

    public function test_an_offer_cannot_be_logged_against_an_unclaimed_lead(): void
    {
        // There is no seller account to accept, decline or counter it, and an offer stuck on
        // Pending would trip the one-open-offer guard and block the listing for good.
        $this->post('/sell-equipment/equipment-submission', $this->payload());

        $submission = EquipmentSubmission::sole();
        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);

        $this->actingAs($broker)
            ->post("/broker/seller-submissions/{$submission->id}/offers", [
                'amount' => '45000',
                'offered_at' => now()->toDateString(),
                'status' => 'pending',
            ])
            ->assertSessionHas('status');

        $this->assertSame(0, $submission->offers()->count());
    }

    public function test_submission_form_and_thank_you_pages_render(): void
    {
        $this->get('/sell-equipment/equipment-submission')->assertOk();
        $this->get('/sell-equipment/equipment-submission/thank-you')->assertOk();
    }

    public function test_the_category_dropdown_shows_the_docs_other_label_but_stores_other_equipment(): void
    {
        // The content doc's dropdown ends with "Other"; the stored vocabulary keeps
        // "Other Equipment" so existing listings and the marketplace filter are untouched.
        $this->get('/sell-equipment/equipment-submission')
            ->assertOk()
            ->assertSee('"Other Equipment":"Other"', false);

        $this->post('/sell-equipment/equipment-submission', $this->payload([
            'category' => EquipmentSubmission::CATEGORY_FALLBACK,
        ]))->assertRedirect('/sell-equipment/equipment-submission/thank-you');

        $this->assertSame(EquipmentSubmission::CATEGORY_FALLBACK, EquipmentSubmission::sole()->category);
    }
}
