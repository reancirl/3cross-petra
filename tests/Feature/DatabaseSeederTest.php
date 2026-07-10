<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Tests\TestCase;

class DatabaseSeederTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_database_seeder_creates_one_user_for_each_portal_role(): void
    {
        $this->seed(DatabaseSeeder::class);

        $seller = User::where('email', 'seller@example.com')->firstOrFail();
        $buyer = User::where('email', 'buyer@example.com')->firstOrFail();

        $this->assertSame(User::TYPE_SELLER, $seller->user_type);
        $this->assertSame(User::TYPE_BUYER, $buyer->user_type);
        $this->assertSame('Seller Demo Co', $seller->company_name);
        $this->assertSame('Buyer Demo Co', $buyer->company_name);
    }
}
