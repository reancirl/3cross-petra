<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Support\Facades\Notification;
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
