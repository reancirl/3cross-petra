<?php

namespace Tests\Feature;

use App\Enums\ListingStatus;
use App\Models\EquipmentSubmission;
use App\Models\User;
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

    public function test_talk_to_broker_contact_route_carries_listing_context(): void
    {
        $this->get('/contact?asset=PH-9902&equipment=3-Phase%20Production%20Separator')
            ->assertOk()
            ->assertSee('assetContext')
            ->assertSee('3-Phase Production Separator')
            ->assertSee('PH-9902');
    }
}
