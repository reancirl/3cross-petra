<?php

namespace Tests\Feature;

use App\Enums\ListingStatus;
use App\Models\EquipmentSubmission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MarketplaceTest extends TestCase
{
    use RefreshDatabase;

    private function listing(array $overrides = []): EquipmentSubmission
    {
        $seller = User::factory()->seller()->create();

        return $seller->equipmentSubmissions()->create(array_merge([
            'title' => 'Test Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'city' => 'Casper',
            'condition' => 'sitting_idle',
            'condition_notes' => 'SECRET seller notes',
            'asking_price' => 42500,
            'manufacturer' => 'Ariel',
            'year' => 2020,
            'capacity' => '36 in',
            'public_description' => 'A field-proven separator.',
            'photos' => [['name' => 'a.jpg', 'path' => 'p/a.jpg', 'url' => '/storage/p/a.jpg', 'size' => 1]],
            'status' => ListingStatus::Published,
            'public_id' => EquipmentSubmission::generatePublicId(),
            'published_at' => now(),
        ], $overrides));
    }

    public function test_marketplace_shows_only_publishable_statuses(): void
    {
        $published = $this->listing(['title' => 'Published Unit']);
        $this->listing(['title' => 'Under Review Unit', 'status' => ListingStatus::UnderReview, 'public_id' => null, 'published_at' => null]);
        $this->listing(['title' => 'Not Accepted Unit', 'status' => ListingStatus::NotAccepted, 'public_id' => null, 'published_at' => null]);

        $this->get('/equipment')
            ->assertOk()
            ->assertSee('Published Unit')
            ->assertDontSee('Under Review Unit')
            ->assertDontSee('Not Accepted Unit');

        $this->assertSame(1, EquipmentSubmission::query()->publiclyVisible()->count());
        $this->assertNotNull($published->public_id);
    }

    public function test_sold_listing_visible_within_30_days_then_hidden(): void
    {
        $this->listing(['title' => 'Recently Sold', 'status' => ListingStatus::Sold, 'sold_at' => now()->subDays(5)]);
        $this->listing(['title' => 'Long Ago Sold', 'status' => ListingStatus::Sold, 'sold_at' => now()->subDays(45)]);

        $this->get('/equipment')
            ->assertOk()
            ->assertSee('Recently Sold')
            ->assertDontSee('Long Ago Sold');
    }

    public function test_public_payload_never_exposes_seller_price_or_raw_notes(): void
    {
        $this->listing(['title' => 'Guarded Unit']);

        $response = $this->get('/equipment');
        $props = $response->viewData('page')['props'];
        $encoded = json_encode($props['listings']);

        $this->assertStringContainsString('Guarded Unit', $encoded);
        $this->assertStringNotContainsString('SECRET seller notes', $encoded);
        $this->assertStringNotContainsString('42500', $encoded);
        $this->assertStringNotContainsString('asking_price', $encoded);
        $this->assertStringNotContainsString('condition_notes', $encoded);
        $this->assertStringNotContainsString('user_id', $encoded);
        // Public availability label, not the internal status name.
        $this->assertStringContainsString('Available', $encoded);
        $this->assertStringNotContainsString('published', $encoded);
    }

    public function test_detail_page_hides_private_documents(): void
    {
        $listing = $this->listing([
            'documents' => [
                ['name' => 'public-spec.pdf', 'path' => 'd/1.pdf', 'url' => '/storage/d/1.pdf', 'size' => 1, 'public' => true],
                ['name' => 'private-invoice.pdf', 'path' => 'd/2.pdf', 'url' => '/storage/d/2.pdf', 'size' => 1, 'public' => false],
            ],
        ]);

        $props = $this->get("/equipment/{$listing->public_id}")->assertOk()->viewData('page')['props'];
        $encoded = json_encode($props['listing']['documents']);

        $this->assertStringContainsString('public-spec.pdf', $encoded);
        $this->assertStringNotContainsString('private-invoice.pdf', $encoded);
    }

    public function test_non_public_listing_detail_returns_404(): void
    {
        $hidden = $this->listing(['status' => ListingStatus::UnderReview, 'public_id' => 'PH-0001', 'published_at' => null]);

        $this->get("/equipment/{$hidden->public_id}")->assertNotFound();
    }

    public function test_guest_inquiry_creates_linked_request(): void
    {
        $listing = $this->listing();

        $this->post("/equipment/{$listing->public_id}/inquiries", [
            'name' => 'Jane Buyer',
            'email' => 'jane@example.com',
            'phone' => '555-1000',
            'note' => 'Is it still available?',
        ])->assertSessionHasNoErrors();

        $this->assertDatabaseHas('equipment_requests', [
            'equipment_submission_id' => $listing->id,
        ]);
        $this->assertDatabaseHas('users', ['email' => 'jane@example.com', 'user_type' => 'buyer']);
    }

    public function test_authenticated_buyer_inquiry_links_to_their_account(): void
    {
        $listing = $this->listing();
        $buyer = User::factory()->buyer()->create();

        $this->actingAs($buyer)
            ->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'Interested.'])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('equipment_requests', [
            'equipment_submission_id' => $listing->id,
            'user_id' => $buyer->id,
        ]);
    }

    public function test_publish_is_blocked_without_photo_or_description(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $submission = $seller->equipmentSubmissions()->create([
            'title' => 'Bare Unit',
            'category' => 'Tanks',
            'region' => 'Montana',
            'condition' => 'unknown',
        ]);

        $this->actingAs($broker)
            ->from('/broker/submissions')
            ->patch("/broker/seller-submissions/{$submission->id}", ['status' => 'published'])
            ->assertSessionHasErrors(['publish_block', 'public_description']);

        $this->assertDatabaseHas('equipment_submissions', ['id' => $submission->id, 'status' => 'under_review']);
    }
}
