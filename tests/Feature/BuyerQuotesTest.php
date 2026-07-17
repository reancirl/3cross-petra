<?php

namespace Tests\Feature;

use App\Enums\ListingStatus;
use App\Models\EquipmentSubmission;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Tests\TestCase;

class BuyerQuotesTest extends TestCase
{
    use LazilyRefreshDatabase;

    private function publishedListing(string $publicId = 'PH-9902', string $title = '3-Phase Production Separator'): EquipmentSubmission
    {
        $seller = User::factory()->seller()->create();

        return $seller->equipmentSubmissions()->create([
            'title' => $title,
            'category' => 'Separators',
            'region' => 'Wyoming',
            'city' => 'Casper',
            'condition' => 'sitting_idle',
            'public_description' => 'Field-proven separator available for redeployment.',
            'photos' => [['name' => 'a.jpg', 'path' => 'p/a.jpg', 'url' => '/storage/p/a.jpg', 'size' => 1]],
            'status' => ListingStatus::Published,
            'public_id' => $publicId,
            'published_at' => now(),
        ]);
    }

    public function test_buyer_sees_their_own_quote_inquiries(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();

        $buyer->equipmentRequests()->create([
            'equipment_submission_id' => $listing->id,
            'equipment_type' => "Quote Request: {$listing->title}",
            'budget_range' => 'Quote requested',
            'location_preference' => 'Wyoming',
            'timeline' => 'Availability requested',
        ]);

        $this->actingAs($buyer)
            ->get('/buyer/quotes')
            ->assertOk()
            ->assertSee('BuyerQuotes')
            ->assertSee('3-Phase Production Separator')
            ->assertSee('PH-9902')
            ->assertSee('Submitted');
    }

    public function test_buyer_never_sees_another_buyers_quotes(): void
    {
        $listing = $this->publishedListing();
        $owner = User::factory()->buyer()->create();
        $otherBuyer = User::factory()->buyer()->create();

        $owner->equipmentRequests()->create([
            'equipment_submission_id' => $listing->id,
            'equipment_type' => 'Quote Request: Owner Only Separator',
            'budget_range' => 'Quote requested',
            'location_preference' => 'Wyoming',
            'timeline' => 'Availability requested',
        ]);

        $this->actingAs($otherBuyer)
            ->get('/buyer/quotes')
            ->assertOk()
            ->assertDontSee('Owner Only Separator');
    }

    public function test_free_form_requests_do_not_appear_on_quotes_page(): void
    {
        $buyer = User::factory()->buyer()->create();

        $buyer->equipmentRequests()->create([
            'equipment_type' => 'Free Form Compressor',
            'budget_range' => '$50k-$80k',
            'location_preference' => 'Permian',
            'timeline' => 'Q3',
        ]);

        $this->actingAs($buyer)
            ->get('/buyer/quotes')
            ->assertOk()
            ->assertDontSee('Free Form Compressor');
    }

    public function test_quote_inquiries_do_not_appear_on_my_requests_page(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();

        // A quote inquiry (tied to a listing)...
        $buyer->equipmentRequests()->create([
            'equipment_submission_id' => $listing->id,
            'equipment_type' => 'Quote Request: Listing Bound Item',
            'budget_range' => 'Quote requested',
            'location_preference' => 'Wyoming',
            'timeline' => 'Availability requested',
        ]);

        // ...and a free-form request (no listing).
        $buyer->equipmentRequests()->create([
            'equipment_type' => 'Free Form Item',
            'budget_range' => '$10k',
            'location_preference' => 'Rockies',
            'timeline' => 'Q4',
        ]);

        $this->actingAs($buyer)
            ->get('/buyer/saved-equipment')
            ->assertOk()
            ->assertSee('Free Form Item')
            ->assertDontSee('Listing Bound Item');
    }

    public function test_seller_cannot_access_buyer_quotes_route(): void
    {
        $seller = User::factory()->seller()->create();

        $this->actingAs($seller)
            ->get('/buyer/quotes')
            ->assertRedirect('/seller/dashboard');
    }

    public function test_seller_quotes_stays_a_soon_placeholder(): void
    {
        $seller = User::factory()->seller()->create();

        // Seller Quotes stays wired to the generic "Soon" placeholder component —
        // it is never pointed at the buyer Quotes page or its data.
        $this->actingAs($seller)
            ->get('/seller/quotes')
            ->assertOk()
            ->assertSee('Placeholder');
    }

    public function test_guest_is_redirected_from_buyer_quotes_to_login(): void
    {
        $this->get('/buyer/quotes')->assertRedirect('/login');
    }

    public function test_quote_inquiries_remain_visible_to_broker_after_scoping(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();

        $buyer->equipmentRequests()->create([
            'equipment_submission_id' => $listing->id,
            'equipment_type' => "Quote Request: {$listing->title}",
            'specifications' => 'Buyer wants inspection timing.',
            'budget_range' => 'Quote requested',
            'location_preference' => 'Wyoming',
            'timeline' => 'Availability requested',
        ]);

        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->get('/broker/submissions')
            ->assertOk()
            ->assertSee('Quote Request: 3-Phase Production Separator');
    }
}
