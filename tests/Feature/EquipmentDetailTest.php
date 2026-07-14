<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Tests\TestCase;

class EquipmentDetailTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_equipment_detail_page_renders_listing_data(): void
    {
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
            ->assertSessionHas('status', 'Quote request sent to Petra broker review.');

        $this->assertDatabaseHas('users', [
            'name' => 'Buyer Contact',
            'email' => 'buyer-contact@example.com',
            'phone' => '555-0199',
            'company_name' => 'Acme Energy',
            'user_type' => User::TYPE_BUYER,
        ]);

        $this->assertDatabaseHas('equipment_requests', [
            'equipment_type' => 'Quote Request: 3-Phase Production Separator',
            'budget_range' => 'Quote requested',
            'location_preference' => 'Wyoming Oilfields',
            'timeline' => 'Availability, pricing, and inspection confirmation requested',
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
