<?php

namespace Tests\Feature;

use App\Enums\ListingStatus;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Tests\TestCase;

class EquipmentDetailTest extends TestCase
{
    use LazilyRefreshDatabase;

    private function publishedListing(): EquipmentSubmission
    {
        $seller = User::factory()->seller()->create();

        return $seller->equipmentSubmissions()->create([
            'title' => '3-Phase Production Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'city' => 'Casper',
            'condition' => 'sitting_idle',
            'manufacturer' => 'Production Package',
            'year' => 2020,
            'capacity' => '36 in x 10 ft',
            'public_description' => 'Field-proven separator available for redeployment.',
            'photos' => [['name' => 'a.jpg', 'path' => 'p/a.jpg', 'url' => '/storage/p/a.jpg', 'size' => 1]],
            'status' => ListingStatus::Published,
            'public_id' => 'PH-9902',
            'published_at' => now(),
        ]);
    }

    public function test_equipment_detail_page_renders_listing_data(): void
    {
        $this->publishedListing();

        $this->get('/equipment/PH-9902')
            ->assertOk()
            ->assertSee('EquipmentDetail')
            ->assertSee('PH-9902')
            ->assertSee('3-Phase Production Separator')
            ->assertSee('Available');
    }

    public function test_unknown_equipment_detail_page_returns_not_found(): void
    {
        $this->get('/equipment/PH-0000')->assertNotFound();
    }

    public function test_listing_quote_request_is_saved_for_broker_review(): void
    {
        $listing = $this->publishedListing();

        $this->from('/equipment/PH-9902')
            ->post('/equipment/PH-9902/inquiries', [
                'name' => 'Buyer Contact',
                'email' => 'buyer-contact@example.com',
                'phone' => '555-0199',
                'company_name' => 'Acme Energy',
                'note' => 'Please confirm inspection timing and current pricing.',
            ])
            ->assertRedirect('/equipment/PH-9902')
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Request sent to Petra broker review.');

        $this->assertDatabaseHas('users', [
            'name' => 'Buyer Contact',
            'email' => 'buyer-contact@example.com',
            'phone' => '555-0199',
            'company_name' => 'Acme Energy',
            'user_type' => User::TYPE_BUYER,
        ]);

        $this->assertDatabaseHas('equipment_requests', [
            'equipment_submission_id' => $listing->id,
            'equipment_type' => 'Quote Request: 3-Phase Production Separator',
            'budget_range' => 'Quote requested',
            'status' => 'submitted',
        ]);

        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->get('/broker/submissions')
            ->assertOk()
            ->assertSee('Quote Request: 3-Phase Production Separator')
            ->assertSee('buyer-contact@example.com')
            ->assertSee('555-0199')
            ->assertSee('Acme Energy');
    }

    public function test_buyer_cannot_raise_a_second_open_quote_on_the_same_listing(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();

        $this->actingAs($buyer)
            ->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'First ask.'])
            ->assertSessionHas('status', 'Request sent to Petra broker review.');

        $this->actingAs($buyer)
            ->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'Same ask again.'])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'You already have an open quote request on this listing — Petra will follow up there.');

        $this->assertDatabaseCount('equipment_requests', 1);
    }

    public function test_guest_cannot_raise_a_second_open_quote_on_the_same_listing(): void
    {
        $listing = $this->publishedListing();

        $inquiry = [
            'name' => 'Buyer Contact',
            'email' => 'buyer-contact@example.com',
            'note' => 'First ask.',
        ];

        // Guests are deduplicated through the shadow account keyed on their email, so
        // the same person inquiring twice resolves to the same buyer.
        $this->post("/equipment/{$listing->public_id}/inquiries", $inquiry)
            ->assertSessionHas('status', 'Request sent to Petra broker review.');

        $this->post("/equipment/{$listing->public_id}/inquiries", $inquiry)
            ->assertSessionHas('status', 'You already have an open quote request on this listing — Petra will follow up there.');

        $this->assertDatabaseCount('equipment_requests', 1);
    }

    public function test_buyer_can_quote_a_different_listing_while_one_is_open(): void
    {
        $first = $this->publishedListing();
        $second = $first->user->equipmentSubmissions()->create([
            'title' => 'Vertical Heater Treater',
            'category' => 'Treaters',
            'region' => 'Texas',
            'condition' => 'sitting_idle',
            'public_description' => 'Second listing.',
            'photos' => [['name' => 'b.jpg', 'path' => 'p/b.jpg', 'url' => '/storage/p/b.jpg', 'size' => 1]],
            'status' => ListingStatus::Published,
            'public_id' => 'PH-9903',
            'published_at' => now(),
        ]);

        $buyer = User::factory()->buyer()->create();

        // The block is per listing, not a global one-quote-at-a-time rule.
        $this->actingAs($buyer)->post("/equipment/{$first->public_id}/inquiries", ['note' => 'A']);
        $this->actingAs($buyer)
            ->post("/equipment/{$second->public_id}/inquiries", ['note' => 'B'])
            ->assertSessionHas('status', 'Request sent to Petra broker review.');

        $this->assertDatabaseCount('equipment_requests', 2);
    }

    public function test_buyer_can_re_ask_once_the_broker_closes_the_quote(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();

        $this->actingAs($buyer)->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'First ask.']);

        // Closing is what releases the block — without a terminal status the buyer
        // would be locked out of this listing permanently.
        $buyer->equipmentRequests()->firstOrFail()->update(['status' => EquipmentRequest::STATUS_CLOSED]);

        $this->actingAs($buyer)
            ->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'Circling back months later.'])
            ->assertSessionHas('status', 'Request sent to Petra broker review.');

        $this->assertDatabaseCount('equipment_requests', 2);
    }

    public function test_database_rejects_a_duplicate_open_quote_even_bypassing_the_controller(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();

        $attributes = [
            'equipment_submission_id' => $listing->id,
            'equipment_type' => "Quote Request: {$listing->title}",
            'budget_range' => 'Quote requested',
            'location_preference' => $listing->region,
            'timeline' => 'Availability requested',
        ];

        $buyer->equipmentRequests()->create($attributes);

        // Writing straight through the model skips storeInquiry's friendly check, so
        // this is the partial unique index itself talking — the backstop for two
        // submits racing each other.
        $this->expectException(QueryException::class);

        $buyer->equipmentRequests()->create($attributes);
    }

    public function test_database_allows_a_new_quote_once_the_previous_one_is_closed(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();

        $attributes = [
            'equipment_submission_id' => $listing->id,
            'equipment_type' => "Quote Request: {$listing->title}",
            'budget_range' => 'Quote requested',
            'location_preference' => $listing->region,
            'timeline' => 'Availability requested',
        ];

        $first = $buyer->equipmentRequests()->create($attributes);
        $first->update(['status' => EquipmentRequest::STATUS_CLOSED]);

        // The index is partial on status, so a closed row no longer occupies the slot.
        $buyer->equipmentRequests()->create($attributes);

        $this->assertDatabaseCount('equipment_requests', 2);
    }

    public function test_database_does_not_constrain_free_form_requests(): void
    {
        $buyer = User::factory()->buyer()->create();

        $attributes = [
            'equipment_submission_id' => null,
            'equipment_type' => 'Looking for a separator',
            'budget_range' => '$50k-$100k',
            'location_preference' => 'Wyoming',
            'timeline' => 'Q3',
        ];

        // Free-form sourcing requests carry no listing and stay unlimited by design.
        $buyer->equipmentRequests()->create($attributes);
        $buyer->equipmentRequests()->create($attributes);

        $this->assertDatabaseCount('equipment_requests', 2);
    }

    public function test_broker_can_close_a_quote_request(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();
        $this->actingAs($buyer)->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'Ask.']);

        $quote = $buyer->equipmentRequests()->firstOrFail();
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->patch("/broker/buyer-requests/{$quote->id}", ['status' => EquipmentRequest::STATUS_CLOSED])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Buyer request status updated.');

        $this->assertDatabaseHas('equipment_requests', ['id' => $quote->id, 'status' => 'closed']);
    }

    public function test_talk_to_broker_contact_route_carries_listing_context(): void
    {
        $this->get('/contact?asset=PH-9902&equipment=3-Phase%20Production%20Separator')
            ->assertOk()
            ->assertSee('assetContext')
            ->assertSee('3-Phase Production Separator')
            ->assertSee('PH-9902');
    }
}
