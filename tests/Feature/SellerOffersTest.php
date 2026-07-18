<?php

namespace Tests\Feature;

use App\Enums\ListingStatus;
use App\Enums\OfferStatus;
use App\Models\EquipmentSubmission;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Tests\TestCase;

class SellerOffersTest extends TestCase
{
    use LazilyRefreshDatabase;

    private function listingFor(User $seller, string $title = '3-Phase Production Separator', ?string $publicId = 'PH-9902'): EquipmentSubmission
    {
        return $seller->equipmentSubmissions()->create([
            'title' => $title,
            'category' => 'Separators',
            'region' => 'Wyoming',
            'city' => 'Casper',
            'condition' => 'sitting_idle',
            'public_description' => 'Field-proven separator available for redeployment.',
            'photos' => [['name' => 'a.jpg', 'path' => 'p/a.jpg', 'url' => '/storage/p/a.jpg', 'size' => 1]],
            'status' => $publicId ? ListingStatus::Published : ListingStatus::UnderReview,
            'public_id' => $publicId,
            'published_at' => $publicId ? now() : null,
        ]);
    }

    private function offerOn(EquipmentSubmission $listing, string $status = OfferStatus::Pending->value, float $amount = 42500): Offer
    {
        return $listing->offers()->create([
            'amount' => $amount,
            'offered_at' => now()->toDateString(),
            'status' => $status,
        ]);
    }

    public function test_seller_sees_offers_on_their_own_listings(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $this->offerOn($listing);

        $this->actingAs($seller)
            ->get('/seller/offers')
            ->assertOk()
            ->assertSee('SellerOffers')
            ->assertSee('3-Phase Production Separator')
            ->assertSee('PH-9902')
            ->assertSee('Pending');
    }

    public function test_seller_never_sees_offers_on_another_sellers_listings(): void
    {
        $owner = User::factory()->seller()->create();
        $otherSeller = User::factory()->seller()->create();

        $ownersListing = $this->listingFor($owner, 'Owner Only Separator', 'PH-1001');
        $this->offerOn($ownersListing);

        $this->actingAs($otherSeller)
            ->get('/seller/offers')
            ->assertOk()
            ->assertDontSee('Owner Only Separator');
    }

    public function test_seller_can_accept_a_pending_offer(): void
    {
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller));

        $this->actingAs($seller)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'accept'])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Offer accepted.');

        $this->assertDatabaseHas('offers', ['id' => $offer->id, 'status' => 'accepted']);
    }

    public function test_seller_accepting_moves_the_listing_to_pending(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $offer = $this->offerOn($listing);

        $this->actingAs($seller)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'accept'])
            ->assertSessionHasNoErrors();

        // The listing must not stay on Published while carrying an accepted offer.
        $this->assertSame(ListingStatus::Pending, $listing->fresh()->listingStatus());
    }

    public function test_declining_leaves_the_listing_status_alone(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $offer = $this->offerOn($listing);

        $this->actingAs($seller)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'decline'])
            ->assertSessionHasNoErrors();

        $this->assertSame(ListingStatus::Published, $listing->fresh()->listingStatus());
    }

    public function test_accepting_does_not_reopen_a_sold_listing(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $listing->update(['status' => ListingStatus::Sold, 'sold_at' => now()]);
        $offer = $this->offerOn($listing);

        $this->actingAs($seller)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'accept'])
            ->assertSessionHasNoErrors();

        // Sold is terminal — an accepted offer must not walk it back to Pending.
        $this->assertSame(ListingStatus::Sold, $listing->fresh()->listingStatus());
    }

    public function test_accepting_on_an_unpublished_listing_does_not_leak_it_to_the_marketplace(): void
    {
        $seller = User::factory()->seller()->create();
        // No public id / published_at — never published.
        $listing = $this->listingFor($seller, 'Never Published Separator', null);
        $offer = $this->offerOn($listing);

        $this->actingAs($seller)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'accept'])
            ->assertSessionHasNoErrors();

        // Pending is publicly-visible *status*, but scopePubliclyVisible also requires
        // public_id + published_at, so this listing stays off the marketplace.
        $this->assertSame(ListingStatus::Pending, $listing->fresh()->listingStatus());
        $this->get('/equipment')->assertOk()->assertDontSee('Never Published Separator');
    }

    public function test_seller_can_decline_a_pending_offer(): void
    {
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller));

        $this->actingAs($seller)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'decline'])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Offer declined.');

        $this->assertDatabaseHas('offers', ['id' => $offer->id, 'status' => 'declined']);
    }

    public function test_seller_can_counter_a_pending_offer_with_an_amount(): void
    {
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller));

        $this->actingAs($seller)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'counter', 'counter_amount' => '50000'])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Counter offer sent.');

        $this->assertDatabaseHas('offers', [
            'id' => $offer->id,
            'status' => 'countered',
            'counter_amount' => '50000.00',
        ]);
    }

    public function test_counter_requires_an_amount(): void
    {
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller));

        $this->actingAs($seller)
            ->from('/seller/offers')
            ->patch("/seller/offers/{$offer->id}", ['action' => 'counter'])
            ->assertRedirect('/seller/offers')
            ->assertSessionHasErrors('counter_amount');

        $this->assertDatabaseHas('offers', ['id' => $offer->id, 'status' => 'pending']);
    }

    public function test_seller_cannot_respond_to_an_offer_on_another_sellers_listing(): void
    {
        $owner = User::factory()->seller()->create();
        $attacker = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($owner));

        $this->actingAs($attacker)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'accept'])
            ->assertForbidden();

        $this->assertDatabaseHas('offers', ['id' => $offer->id, 'status' => 'pending']);
    }

    public function test_seller_cannot_respond_to_an_already_resolved_offer(): void
    {
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller), OfferStatus::Accepted->value);

        $this->actingAs($seller)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'decline'])
            ->assertSessionHas('status', 'This offer has already been responded to.');

        // Status is unchanged — the resolved offer stays accepted.
        $this->assertDatabaseHas('offers', ['id' => $offer->id, 'status' => 'accepted']);
    }

    public function test_buyer_cannot_access_seller_offers_route(): void
    {
        $buyer = User::factory()->buyer()->create();

        $this->actingAs($buyer)
            ->get('/seller/offers')
            ->assertRedirect('/buyer/dashboard');
    }

    public function test_buyer_offers_route_does_not_exist(): void
    {
        $buyer = User::factory()->buyer()->create();

        // Buyer Offers was dropped rather than left as a "Soon" placeholder: an Offer
        // belongs to a seller's listing and has no buyer column, so there is no buyer
        // data such a page could show. See the note in routes/web/buyer.php.
        $this->actingAs($buyer)
            ->get('/buyer/offers')
            ->assertNotFound();
    }

    public function test_broker_cannot_be_shown_seller_offers_page(): void
    {
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->get('/seller/offers')
            ->assertRedirect('/broker/submissions');
    }

    public function test_guest_is_redirected_from_seller_offers_to_login(): void
    {
        $this->get('/seller/offers')->assertRedirect('/login');
    }

    public function test_broker_can_log_an_offer_and_the_seller_sees_it(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        $this->actingAs($broker)
            ->post("/broker/seller-submissions/{$listing->id}/offers", [
                'amount' => '75000',
                'offered_at' => now()->toDateString(),
                'status' => 'pending',
            ])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Offer logged for the seller.');

        $this->assertDatabaseHas('offers', [
            'equipment_submission_id' => $listing->id,
            'amount' => '75000.00',
            'status' => 'pending',
        ]);

        // The offer now shows on the seller's Offers page.
        $this->actingAs($seller)
            ->get('/seller/offers')
            ->assertOk()
            ->assertSee('3-Phase Production Separator');
    }

    public function test_broker_cannot_log_a_second_offer_while_one_is_pending(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $this->offerOn($listing, OfferStatus::Pending->value, 42500);

        $this->actingAs($broker)
            ->post("/broker/seller-submissions/{$listing->id}/offers", [
                'amount' => '75000',
                'offered_at' => now()->toDateString(),
                'status' => 'pending',
            ])
            ->assertSessionHas('status', 'This listing already has an open offer. Resolve it before logging another.');

        // Still just the original — no contradictory second offer on the same unit.
        $this->assertDatabaseCount('offers', 1);
    }

    public function test_broker_cannot_log_a_second_offer_while_a_counter_is_open(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $this->offerOn($listing, OfferStatus::Countered->value, 42500);

        $this->actingAs($broker)
            ->post("/broker/seller-submissions/{$listing->id}/offers", [
                'amount' => '75000',
                'offered_at' => now()->toDateString(),
                'status' => 'pending',
            ])
            ->assertSessionHas('status', 'This listing already has an open offer. Resolve it before logging another.');

        $this->assertDatabaseCount('offers', 1);
    }

    public function test_broker_can_log_a_new_offer_once_the_previous_one_is_resolved(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $this->offerOn($listing, OfferStatus::Declined->value, 42500);

        $this->actingAs($broker)
            ->post("/broker/seller-submissions/{$listing->id}/offers", [
                'amount' => '75000',
                'offered_at' => now()->toDateString(),
                'status' => 'pending',
            ])
            ->assertSessionHas('status', 'Offer logged for the seller.');

        $this->assertDatabaseCount('offers', 2);
    }

    public function test_broker_accepting_a_counter_moves_the_listing_to_pending(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $offer = $this->offerOn($listing);
        $offer->update(['status' => OfferStatus::Countered, 'counter_amount' => 50000]);

        $this->actingAs($broker)
            ->patch("/broker/offers/{$offer->id}", ['action' => 'accept'])
            ->assertSessionHasNoErrors();

        $this->assertSame(ListingStatus::Pending, $listing->fresh()->listingStatus());
    }

    public function test_broker_logging_an_already_accepted_offer_moves_the_listing_to_pending(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        // A broker may record a deal that was already agreed off-platform.
        $this->actingAs($broker)
            ->post("/broker/seller-submissions/{$listing->id}/offers", [
                'amount' => '75000',
                'offered_at' => now()->toDateString(),
                'status' => 'accepted',
            ])
            ->assertSessionHas('status', 'Offer logged for the seller.');

        $this->assertSame(ListingStatus::Pending, $listing->fresh()->listingStatus());
    }

    public function test_broker_offer_creation_validates_the_fields(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        $this->actingAs($broker)
            ->from('/broker/submissions')
            ->post("/broker/seller-submissions/{$listing->id}/offers", [
                'amount' => 'not-a-number',
                'offered_at' => '',
                'status' => 'bogus',
            ])
            ->assertRedirect('/broker/submissions')
            ->assertSessionHasErrors(['amount', 'offered_at', 'status']);

        $this->assertDatabaseCount('offers', 0);
    }

    public function test_non_broker_cannot_log_an_offer(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        $this->actingAs($seller)
            ->post("/broker/seller-submissions/{$listing->id}/offers", [
                'amount' => '75000',
                'offered_at' => now()->toDateString(),
                'status' => 'pending',
            ])
            ->assertRedirect('/seller/dashboard');

        $this->assertDatabaseCount('offers', 0);
    }

    public function test_broker_review_view_shows_logged_offers_and_seller_counter(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $offer = $this->offerOn($listing);

        // Seller counters, so the broker view should surface the counter amount.
        $offer->update(['status' => OfferStatus::Countered, 'counter_amount' => 50000]);

        $this->actingAs($broker)
            ->get('/broker/submissions')
            ->assertOk()
            ->assertSee('Countered');
    }

    public function test_broker_can_accept_a_seller_counter(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller), OfferStatus::Countered->value);
        $offer->update(['counter_amount' => 50000]);

        $this->actingAs($broker)
            ->patch("/broker/offers/{$offer->id}", ['action' => 'accept'])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Counter offer accepted at $50,000.');

        // The counter amount is kept — it is the price both sides agreed on.
        $this->assertDatabaseHas('offers', [
            'id' => $offer->id,
            'status' => 'accepted',
            'counter_amount' => '50000.00',
        ]);
    }

    public function test_broker_can_decline_a_seller_counter(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller), OfferStatus::Countered->value);
        $offer->update(['counter_amount' => 50000]);

        $this->actingAs($broker)
            ->patch("/broker/offers/{$offer->id}", ['action' => 'decline'])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Counter offer declined.');

        $this->assertDatabaseHas('offers', [
            'id' => $offer->id,
            'status' => 'declined',
            'counter_amount' => null,
        ]);
    }

    public function test_broker_re_offer_reopens_the_offer_for_the_seller(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller), OfferStatus::Countered->value);
        $offer->update(['counter_amount' => 50000]);

        $this->actingAs($broker)
            ->patch("/broker/offers/{$offer->id}", ['action' => 'counter', 'amount' => '46000'])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Re-offer sent to the seller.');

        // The negotiation moves onto the new amount in place — no duplicate row — and
        // the stale seller counter is cleared.
        $this->assertDatabaseCount('offers', 1);
        $this->assertDatabaseHas('offers', [
            'id' => $offer->id,
            'status' => 'pending',
            'amount' => '46000.00',
            'counter_amount' => null,
        ]);

        // The ball is back with the seller, who can respond again.
        $this->actingAs($seller)
            ->patch("/seller/offers/{$offer->id}", ['action' => 'accept'])
            ->assertSessionHas('status', 'Offer accepted.');

        $this->assertDatabaseHas('offers', ['id' => $offer->id, 'status' => 'accepted']);
    }

    public function test_broker_re_offer_requires_an_amount(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller), OfferStatus::Countered->value);

        $this->actingAs($broker)
            ->from('/broker/submissions')
            ->patch("/broker/offers/{$offer->id}", ['action' => 'counter'])
            ->assertRedirect('/broker/submissions')
            ->assertSessionHasErrors('amount');

        $this->assertDatabaseHas('offers', ['id' => $offer->id, 'status' => 'countered']);
    }

    public function test_broker_cannot_respond_to_an_offer_that_is_not_countered(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        // Pending is the seller's to answer, not the broker's.
        $offer = $this->offerOn($this->listingFor($seller));

        $this->actingAs($broker)
            ->patch("/broker/offers/{$offer->id}", ['action' => 'accept'])
            ->assertSessionHas('status', 'This offer is not awaiting a broker response.');

        $this->assertDatabaseHas('offers', ['id' => $offer->id, 'status' => 'pending']);
    }

    public function test_non_broker_cannot_respond_to_a_counter(): void
    {
        $seller = User::factory()->seller()->create();
        $offer = $this->offerOn($this->listingFor($seller), OfferStatus::Countered->value);

        $this->actingAs($seller)
            ->patch("/broker/offers/{$offer->id}", ['action' => 'accept'])
            ->assertRedirect('/seller/dashboard');

        $this->assertDatabaseHas('offers', ['id' => $offer->id, 'status' => 'countered']);
    }

    public function test_offers_are_deleted_with_their_listing(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $offer = $this->offerOn($listing);

        $listing->delete();

        $this->assertDatabaseMissing('offers', ['id' => $offer->id]);
    }
}
