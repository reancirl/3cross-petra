<?php

namespace Tests\Feature;

use App\Enums\ListingStatus;
use App\Models\EquipmentSubmission;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

/**
 * Adding and removing listing photos after submission.
 *
 * These endpoints exist because photos used to be write-once at submission, which made
 * the broker's publish checklist ("at least one photo") unsatisfiable for any seller who
 * forgot them: no screen anywhere could add one. The end-to-end test at the bottom is
 * that exact scenario, and is the reason the rest of this file exists.
 */
class ListingPhotosTest extends TestCase
{
    use LazilyRefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Photos are written to the public disk for real by the upload path.
        Storage::fake('public');
    }

    private function seller(array $overrides = []): User
    {
        return User::factory()->create(array_merge([
            'user_type' => User::TYPE_SELLER,
        ], $overrides));
    }

    private function listingFor(User $seller, array $overrides = []): EquipmentSubmission
    {
        return $seller->equipmentSubmissions()->create(array_merge([
            'title' => '3-Phase Production Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'city' => 'Casper',
            'condition' => 'operational_but_idle',
            'photos' => [],
            'status' => ListingStatus::UnderReview,
        ], $overrides));
    }

    public function test_seller_can_add_a_photo_to_their_own_listing(): void
    {
        $seller = $this->seller();
        $listing = $this->listingFor($seller);

        $this->actingAs($seller)
            ->post("/seller/listings/{$listing->id}/photos", [
                'photos' => [UploadedFile::fake()->image('unit.jpg')],
            ])
            ->assertRedirect();

        $listing->refresh();

        $this->assertCount(1, $listing->photos);
        $this->assertSame('unit.jpg', $listing->photos[0]['name']);
        Storage::disk('public')->assertExists($listing->photos[0]['path']);
    }

    /**
     * Append, not replace. A second upload discarding the first is the failure mode the
     * model helper exists to prevent.
     */
    public function test_a_second_upload_appends_rather_than_replacing(): void
    {
        $seller = $this->seller();
        $listing = $this->listingFor($seller);

        $this->actingAs($seller)->post("/seller/listings/{$listing->id}/photos", [
            'photos' => [UploadedFile::fake()->image('first.jpg')],
        ]);
        $this->actingAs($seller)->post("/seller/listings/{$listing->id}/photos", [
            'photos' => [UploadedFile::fake()->image('second.jpg')],
        ]);

        $listing->refresh();

        $this->assertCount(2, $listing->photos);
        $this->assertSame(['first.jpg', 'second.jpg'], array_column($listing->photos, 'name'));
    }

    /**
     * The regression that route model binding alone would introduce: binding resolves by
     * id, so without the explicit ownership check any seller could post onto any listing
     * by editing the id in the URL.
     */
    public function test_a_seller_cannot_add_photos_to_another_sellers_listing(): void
    {
        $owner = $this->seller();
        $intruder = $this->seller();
        $listing = $this->listingFor($owner);

        $this->actingAs($intruder)
            ->post("/seller/listings/{$listing->id}/photos", [
                'photos' => [UploadedFile::fake()->image('unit.jpg')],
            ])
            ->assertForbidden();

        $this->assertSame([], $listing->fresh()->photos);
    }

    public function test_a_seller_cannot_delete_a_photo_from_another_sellers_listing(): void
    {
        $owner = $this->seller();
        $intruder = $this->seller();
        $listing = $this->listingFor($owner);

        $this->actingAs($owner)->post("/seller/listings/{$listing->id}/photos", [
            'photos' => [UploadedFile::fake()->image('unit.jpg')],
        ]);

        $this->actingAs($intruder)
            ->delete("/seller/listings/{$listing->id}/photos/0")
            ->assertForbidden();

        $this->assertCount(1, $listing->fresh()->photos);
    }

    public function test_deleting_a_photo_removes_the_row_and_the_file(): void
    {
        $seller = $this->seller();
        $listing = $this->listingFor($seller);

        $this->actingAs($seller)->post("/seller/listings/{$listing->id}/photos", [
            'photos' => [UploadedFile::fake()->image('keep.jpg'), UploadedFile::fake()->image('drop.jpg')],
        ]);

        $dropped = $listing->fresh()->photos[1]['path'];

        $this->actingAs($seller)
            ->delete("/seller/listings/{$listing->id}/photos/1")
            ->assertRedirect();

        $listing->refresh();

        $this->assertCount(1, $listing->photos);
        $this->assertSame('keep.jpg', $listing->photos[0]['name']);
        // Deleted for real, unlike a document — a photo is presentation, not part of the
        // record of the deal, so it should leave nothing behind on the public disk.
        Storage::disk('public')->assertMissing($dropped);
    }

    /**
     * A stale page posting an index another session already removed. Reported, not fatal.
     */
    public function test_deleting_a_missing_index_leaves_the_set_alone(): void
    {
        $seller = $this->seller();
        $listing = $this->listingFor($seller);

        $this->actingAs($seller)->post("/seller/listings/{$listing->id}/photos", [
            'photos' => [UploadedFile::fake()->image('unit.jpg')],
        ]);

        $this->actingAs($seller)
            ->delete("/seller/listings/{$listing->id}/photos/7")
            ->assertRedirect();

        $this->assertCount(1, $listing->fresh()->photos);
    }

    /**
     * The cap is a total across every upload, not a per-request limit — the point of
     * moving it out of the submission form's `max:8`.
     */
    public function test_the_photo_cap_counts_photos_already_stored(): void
    {
        $seller = $this->seller();
        $listing = $this->listingFor($seller);

        $this->actingAs($seller)->post("/seller/listings/{$listing->id}/photos", [
            'photos' => array_map(
                fn (int $i) => UploadedFile::fake()->image("unit-{$i}.jpg"),
                range(1, EquipmentSubmission::MAX_PHOTOS),
            ),
        ]);

        $this->assertCount(EquipmentSubmission::MAX_PHOTOS, $listing->fresh()->photos);

        $this->actingAs($seller)
            ->post("/seller/listings/{$listing->id}/photos", [
                'photos' => [UploadedFile::fake()->image('one-too-many.jpg')],
            ])
            ->assertSessionHasErrors('photos');

        // Rejected before anything was written, so no half-uploaded set is left behind.
        $this->assertCount(EquipmentSubmission::MAX_PHOTOS, $listing->fresh()->photos);
    }

    public function test_non_image_uploads_are_rejected(): void
    {
        $seller = $this->seller();
        $listing = $this->listingFor($seller);

        $this->actingAs($seller)
            ->post("/seller/listings/{$listing->id}/photos", [
                'photos' => [UploadedFile::fake()->create('spec.pdf', 12, 'application/pdf')],
            ])
            ->assertSessionHasErrors('photos.0');

        $this->assertSame([], $listing->fresh()->photos);
    }

    /**
     * Published is deliberately editable — a live listing with the wrong photos is what
     * a seller most needs to fix. Sold is not.
     */
    public function test_photos_can_be_added_to_a_published_listing(): void
    {
        $seller = $this->seller();
        $listing = $this->listingFor($seller, [
            'status' => ListingStatus::Published,
            'public_id' => 'PH-9901',
            'published_at' => now(),
        ]);

        $this->actingAs($seller)
            ->post("/seller/listings/{$listing->id}/photos", [
                'photos' => [UploadedFile::fake()->image('unit.jpg')],
            ])
            ->assertRedirect();

        $this->assertCount(1, $listing->fresh()->photos);
    }

    public function test_photos_are_closed_on_a_sold_listing(): void
    {
        $seller = $this->seller();
        $listing = $this->listingFor($seller, [
            'status' => ListingStatus::Sold,
            'public_id' => 'PH-9902',
            'published_at' => now()->subMonth(),
            'sold_at' => now(),
        ]);

        $this->actingAs($seller)
            ->post("/seller/listings/{$listing->id}/photos", [
                'photos' => [UploadedFile::fake()->image('unit.jpg')],
            ])
            ->assertForbidden();
    }

    public function test_a_broker_can_add_photos_to_any_listing(): void
    {
        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);
        $listing = $this->listingFor($this->seller());

        $this->actingAs($broker)
            ->post("/broker/seller-submissions/{$listing->id}/photos", [
                'photos' => [UploadedFile::fake()->image('emailed-by-seller.jpg')],
            ])
            ->assertRedirect();

        $listing->refresh();

        $this->assertCount(1, $listing->photos);
        $this->assertSame('emailed-by-seller.jpg', $listing->photos[0]['name']);
    }

    public function test_a_broker_can_delete_a_photo(): void
    {
        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);
        $listing = $this->listingFor($this->seller());

        $this->actingAs($broker)->post("/broker/seller-submissions/{$listing->id}/photos", [
            'photos' => [UploadedFile::fake()->image('wrong-unit.jpg')],
        ]);

        $this->actingAs($broker)
            ->delete("/broker/seller-submissions/{$listing->id}/photos/0")
            ->assertRedirect();

        $this->assertSame([], $listing->fresh()->photos);
    }

    public function test_a_seller_cannot_reach_the_broker_photo_endpoint(): void
    {
        $seller = $this->seller();
        $listing = $this->listingFor($seller);

        $this->actingAs($seller)
            ->post("/broker/seller-submissions/{$listing->id}/photos", [
                'photos' => [UploadedFile::fake()->image('unit.jpg')],
            ])
            ->assertRedirect();

        $this->assertSame([], $listing->fresh()->photos);
    }

    public function test_a_guest_cannot_add_photos(): void
    {
        $listing = $this->listingFor($this->seller());

        $this->post("/seller/listings/{$listing->id}/photos", [
            'photos' => [UploadedFile::fake()->image('unit.jpg')],
        ])->assertRedirect('/login');

        $this->assertSame([], $listing->fresh()->photos);
    }

    /**
     * The upload control is driven by a server-sent flag, not re-derived in the browser,
     * so a screen can never offer an upload the controller would then 403.
     */
    public function test_the_seller_detail_page_carries_the_photo_edit_flags(): void
    {
        $seller = $this->seller();
        $open = $this->listingFor($seller);
        $closed = $this->listingFor($seller, [
            'status' => ListingStatus::Sold,
            'public_id' => 'PH-9903',
            'published_at' => now()->subMonth(),
            'sold_at' => now(),
        ]);

        $this->actingAs($seller)
            ->get("/seller/listings/{$open->id}")
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->where('listing.photos_editable', true)
                ->where('listing.max_photos', EquipmentSubmission::MAX_PHOTOS));

        $this->actingAs($seller)
            ->get("/seller/listings/{$closed->id}")
            ->assertInertia(fn (AssertableInertia $page) => $page->where('listing.photos_editable', false));
    }

    public function test_the_broker_queue_carries_the_photo_set(): void
    {
        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);
        $listing = $this->listingFor($this->seller());

        $this->actingAs($broker)->post("/broker/seller-submissions/{$listing->id}/photos", [
            'photos' => [UploadedFile::fake()->image('unit.jpg')],
        ]);

        $this->actingAs($broker)
            ->get('/broker/submissions')
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->where('sellerSubmissions.0.photo_count', 1)
                ->where('sellerSubmissions.0.photos_editable', true)
                ->where('sellerSubmissions.0.photos.0.name', 'unit.jpg'));
    }

    /**
     * The whole reason this feature exists: a seller forgets photos, the broker works the
     * deal, and publishing is blocked with no way out until a photo can be added.
     */
    public function test_a_photoless_listing_blocks_publishing_until_a_photo_is_added(): void
    {
        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);
        $listing = $this->listingFor($this->seller(), [
            'public_description' => 'Field-proven separator available for redeployment.',
        ]);

        $publish = fn () => $this->actingAs($broker)->patch("/broker/seller-submissions/{$listing->id}", [
            'status' => ListingStatus::Published->value,
            'public_description' => 'Field-proven separator available for redeployment.',
        ]);

        $publish()->assertSessionHasErrors('publish_block');
        $this->assertNull($listing->fresh()->published_at);

        $this->actingAs($broker)->post("/broker/seller-submissions/{$listing->id}/photos", [
            'photos' => [UploadedFile::fake()->image('unit.jpg')],
        ]);

        $publish()->assertSessionHasNoErrors();

        $listing->refresh();

        $this->assertSame(ListingStatus::Published, $listing->listingStatus());
        $this->assertNotNull($listing->published_at);
        $this->assertNotNull($listing->public_id);
    }
}
