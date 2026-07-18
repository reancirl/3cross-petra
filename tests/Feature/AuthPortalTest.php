<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AuthPortalTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_guest_is_redirected_from_portal_to_login(): void
    {
        $this->get('/seller/dashboard')
            ->assertRedirect('/login');
    }

    public function test_buyer_can_register_and_is_redirected_to_buyer_dashboard(): void
    {
        $response = $this->post('/register', [
            'name' => 'Buyer User',
            'email' => 'buyer@example.com',
            'phone' => '555-0100',
            'company_name' => 'Buyer Co',
            'user_type' => User::TYPE_BUYER,
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $user = User::where('email', 'buyer@example.com')->firstOrFail();

        $response->assertRedirect('/buyer/dashboard');
        $this->assertAuthenticatedAs($user);
        $this->assertSame(User::TYPE_BUYER, $user->user_type);
        $this->assertSame('Buyer Co', $user->company_name);
    }

    public function test_seller_login_redirects_to_seller_dashboard(): void
    {
        $user = User::factory()->create([
            'email' => 'seller@example.com',
            'user_type' => User::TYPE_SELLER,
        ]);

        $response = $this->post('/login', [
            'email' => 'seller@example.com',
            'password' => 'password',
        ]);

        $response->assertRedirect('/seller/dashboard');
        $this->assertAuthenticatedAs($user);
    }

    public function test_role_scoped_routes_redirect_to_the_authenticated_role(): void
    {
        $user = User::factory()->create([
            'user_type' => User::TYPE_BUYER,
        ]);

        $this->actingAs($user)
            ->get('/seller/dashboard')
            ->assertRedirect('/buyer/dashboard');
    }

    public function test_profile_can_be_updated(): void
    {
        $user = User::factory()->create([
            'user_type' => User::TYPE_SELLER,
        ]);

        $this->actingAs($user)
            ->patch('/seller/profile', [
                'name' => 'Updated Seller',
                'email' => $user->email,
                'phone' => '555-0101',
                'company_name' => 'Seller Co',
            ])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Profile updated.');

        $user->refresh();

        $this->assertSame('Updated Seller', $user->name);
        $this->assertSame('555-0101', $user->phone);
        $this->assertSame('Seller Co', $user->company_name);
    }

    public function test_placeholder_portal_sections_are_available_for_later_phases(): void
    {
        $user = User::factory()->create([
            'user_type' => User::TYPE_SELLER,
        ]);

        $this->actingAs($user)
            ->get('/seller/quotes')
            ->assertOk();
    }

    public function test_seller_can_submit_equipment_and_see_it_on_listings(): void
    {
        Storage::fake('public');

        $user = User::factory()->seller()->create();

        $this->actingAs($user)
            ->post('/seller/listings', [
                'title' => 'Ajax DPC-2803 Compressor',
                'category' => 'Compressors',
                'region' => 'Wyoming',
                'city' => 'Casper',
                'condition' => 'sitting_idle',
                'condition_notes' => 'Pulled last spring, stored inside.',
                'asking_price' => '42500',
                'photos' => [
                    UploadedFile::fake()->image('pump.jpg'),
                ],
                'documents' => [
                    UploadedFile::fake()->create('spec-sheet.pdf', 128, 'application/pdf'),
                ],
            ])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Equipment submitted.');

        $this->assertDatabaseHas('equipment_submissions', [
            'user_id' => $user->id,
            'title' => 'Ajax DPC-2803 Compressor',
            'category' => 'Compressors',
            'region' => 'Wyoming',
            'city' => 'Casper',
            'condition' => 'sitting_idle',
            'asking_price' => '42500.00',
            'needs_valuation' => false,
            'status' => 'under_review',
        ]);

        $this->actingAs($user)
            ->get('/seller/listings')
            ->assertOk()
            ->assertSee('Ajax DPC-2803 Compressor');
    }

    public function test_seller_asking_for_a_valuation_stores_no_price(): void
    {
        $user = User::factory()->seller()->create();

        $this->actingAs($user)
            ->post('/seller/listings', [
                'title' => 'Tank battery',
                'category' => 'Tanks',
                'region' => 'Montana',
                'condition' => 'unknown',
                'asking_price' => '',
                'needs_valuation' => '1',
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('equipment_submissions', [
            'user_id' => $user->id,
            'title' => 'Tank battery',
            'asking_price' => null,
            'needs_valuation' => true,
        ]);
    }

    public function test_seller_submission_requires_the_structured_fields(): void
    {
        $user = User::factory()->seller()->create();

        $this->actingAs($user)
            ->from('/seller/listings')
            ->post('/seller/listings', [
                'title' => '',
                'category' => 'Not A Real Category',
                'region' => '',
                'condition' => 'melted',
            ])
            ->assertSessionHasErrors(['title', 'category', 'region', 'condition']);

        $this->assertDatabaseCount('equipment_submissions', 0);
    }

    public function test_legacy_saved_equipment_path_redirects_to_listings(): void
    {
        $this->actingAs(User::factory()->seller()->create())
            ->get('/seller/saved-equipment')
            ->assertRedirect('/seller/listings');
    }

    public function test_buyer_can_submit_equipment_request_and_see_it_on_requests_page(): void
    {
        $user = User::factory()->buyer()->create();

        $this->actingAs($user)
            ->post('/buyer/requests', [
                'equipment_type' => 'Separator',
                'specifications' => 'Three phase if available',
                'budget_range' => '40,000',
                'location_preference' => 'Rockies',
                'timeline' => 'Aug 1, 2026 - Aug 31, 2026',
            ])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Equipment request submitted.');

        $this->assertDatabaseHas('equipment_requests', [
            'user_id' => $user->id,
            'equipment_type' => 'Separator',
            'budget_range' => '40,000',
            'location_preference' => 'Rockies',
            'timeline' => 'Aug 1, 2026 - Aug 31, 2026',
            'status' => 'submitted',
        ]);

        $this->actingAs($user)
            ->get('/buyer/requests')
            ->assertOk()
            ->assertSee('Separator');
    }

    public function test_buyer_saved_equipment_is_the_watchlist_placeholder_not_the_request_list(): void
    {
        $user = User::factory()->buyer()->create();

        $user->equipmentRequests()->create([
            'equipment_type' => 'Separator',
            'budget_range' => '40,000',
            'location_preference' => 'Rockies',
            'timeline' => 'Aug 1, 2026 - Aug 31, 2026',
        ]);

        // /buyer/saved-equipment is reserved for the sitemap's "Saved Equipment (Future)"
        // watchlist. It must not fall back to the free-form request list that used to own
        // this path, so the two features stay distinct.
        $this->actingAs($user)
            ->get('/buyer/saved-equipment')
            ->assertOk()
            ->assertSee('Placeholder')
            ->assertDontSee('Separator');
    }

    public function test_buyer_equipment_request_budget_must_be_numeric(): void
    {
        $user = User::factory()->buyer()->create();

        $this->actingAs($user)
            ->from('/buyer/requests')
            ->post('/buyer/requests', [
                'equipment_type' => 'Separator',
                'specifications' => 'Three phase if available',
                'budget_range' => '$25k-$40k',
                'location_preference' => 'Rockies',
                'timeline' => 'Aug 1, 2026 - Aug 31, 2026',
            ])
            ->assertRedirect('/buyer/requests')
            ->assertSessionHasErrors('budget_range');

        $this->assertDatabaseMissing('equipment_requests', [
            'user_id' => $user->id,
            'equipment_type' => 'Separator',
            'budget_range' => '$25k-$40k',
        ]);
    }

    public function test_broker_can_update_submission_and_request_statuses(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $buyer = User::factory()->buyer()->create();

        $submission = $seller->equipmentSubmissions()->create([
            'title' => 'Tank battery',
            'category' => 'Tanks',
            'region' => 'Montana',
            'condition' => 'sitting_idle',
            'photos' => [['name' => 'tank.jpg', 'path' => 'p/tank.jpg', 'url' => '/storage/p/tank.jpg', 'size' => 1]],
        ]);

        $equipmentRequest = $buyer->equipmentRequests()->create([
            'equipment_type' => 'Compressor',
            'budget_range' => '$50k-$80k',
            'location_preference' => 'Permian',
            'timeline' => 'Q3',
        ]);

        $this->actingAs($broker)
            ->patch("/broker/seller-submissions/{$submission->id}", [
                'status' => 'published',
                'public_description' => 'Cleaned tank battery ready for redeployment.',
            ])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status');

        $this->actingAs($broker)
            ->patch("/broker/buyer-requests/{$equipmentRequest->id}", [
                'status' => 'options_presented',
            ])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Buyer request status updated.');

        $submission->refresh();
        $this->assertNotNull($submission->public_id);
        $this->assertNotNull($submission->published_at);

        $this->assertDatabaseHas('equipment_submissions', [
            'id' => $submission->id,
            'status' => 'published',
        ]);

        $this->assertDatabaseHas('equipment_requests', [
            'id' => $equipmentRequest->id,
            'status' => 'options_presented',
        ]);
    }

    public function test_broker_status_updates_are_visible_in_customer_portal_lists(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $buyer = User::factory()->buyer()->create();

        $submission = $seller->equipmentSubmissions()->create([
            'title' => 'Tank battery',
            'category' => 'Tanks',
            'region' => 'Montana',
            'condition' => 'sitting_idle',
            'photos' => [['name' => 'tank.jpg', 'path' => 'p/tank.jpg', 'url' => '/storage/p/tank.jpg', 'size' => 1]],
        ]);

        $equipmentRequest = $buyer->equipmentRequests()->create([
            'equipment_type' => 'Compressor',
            'budget_range' => '$50k-$80k',
            'location_preference' => 'Permian',
            'timeline' => 'Q3',
        ]);

        $this->actingAs($broker)
            ->patch("/broker/seller-submissions/{$submission->id}", [
                'status' => 'published',
                'public_description' => 'Cleaned tank battery ready for redeployment.',
            ])
            ->assertSessionHasNoErrors();

        $this->actingAs($broker)
            ->patch("/broker/buyer-requests/{$equipmentRequest->id}", [
                'status' => 'options_presented',
            ])
            ->assertSessionHasNoErrors();

        $this->actingAs($seller)
            ->get('/seller/listings')
            ->assertOk()
            ->assertSee('Tank battery')
            ->assertSee('Published')
            ->assertSee('Live on the Petra marketplace.');

        $this->actingAs($buyer)
            ->get('/buyer/requests')
            ->assertOk()
            ->assertSee('Compressor')
            ->assertSee('Options Presented');
    }

    public function test_customer_cannot_access_broker_review_page(): void
    {
        $user = User::factory()->seller()->create();

        $this->actingAs($user)
            ->get('/broker/submissions')
            ->assertRedirect('/seller/dashboard');
    }

    public function test_customer_cannot_access_the_broker_buyer_request_queue(): void
    {
        $this->actingAs(User::factory()->buyer()->create())
            ->get('/broker/requests')
            ->assertRedirect('/buyer/dashboard');
    }

    public function test_broker_can_open_both_queues_and_their_profile(): void
    {
        $broker = User::factory()->broker()->create();

        // The broker portal now runs on the shared PortalShell, so it has the same
        // sidebar destinations the seller and buyer portals do.
        $this->actingAs($broker)->get('/broker/submissions')->assertOk();
        $this->actingAs($broker)->get('/broker/requests')->assertOk();
        $this->actingAs($broker)->get('/broker/profile')->assertOk();
    }

    public function test_broker_can_update_their_profile(): void
    {
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->patch('/broker/profile', [
                'name' => 'Petra Broker Renamed',
                'email' => 'broker.renamed@example.com',
            ])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status', 'Profile updated.');

        $this->assertDatabaseHas('users', [
            'id' => $broker->id,
            'name' => 'Petra Broker Renamed',
            'email' => 'broker.renamed@example.com',
        ]);
    }

    public function test_broker_landing_page_is_the_seller_queue(): void
    {
        // Brokers have no dashboard; /dashboard resolves via User::portalRouteName.
        $this->actingAs(User::factory()->broker()->create())
            ->get('/dashboard')
            ->assertRedirect('/broker/submissions');
    }

    public function test_portal_responses_prevent_browser_back_cache(): void
    {
        $user = User::factory()->create([
            'user_type' => User::TYPE_SELLER,
        ]);

        $response = $this->actingAs($user)
            ->get('/seller/dashboard')
            ->assertOk()
            ->assertHeader('Pragma', 'no-cache')
            ->assertHeader('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT');

        $cacheControl = $response->headers->get('Cache-Control');

        $this->assertStringContainsString('no-store', $cacheControl);
        $this->assertStringContainsString('no-cache', $cacheControl);
        $this->assertStringContainsString('must-revalidate', $cacheControl);
        $this->assertStringContainsString('max-age=0', $cacheControl);
    }

    public function test_auth_pages_prevent_browser_back_cache(): void
    {
        $response = $this->get('/login')
            ->assertOk()
            ->assertHeader('Pragma', 'no-cache')
            ->assertHeader('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT');

        $cacheControl = $response->headers->get('Cache-Control');

        $this->assertStringContainsString('no-store', $cacheControl);
        $this->assertStringContainsString('no-cache', $cacheControl);
        $this->assertStringContainsString('must-revalidate', $cacheControl);
        $this->assertStringContainsString('max-age=0', $cacheControl);
    }

    public function test_password_reset_link_can_be_requested(): void
    {
        Notification::fake();

        $user = User::factory()->create([
            'email' => 'reset@example.com',
        ]);

        $this->post('/forgot-password', [
            'email' => 'reset@example.com',
        ])
            ->assertSessionHasNoErrors()
            ->assertSessionHas('status');

        Notification::assertSentTo($user, ResetPassword::class);
    }
}
