<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'seller@example.com'],
            [
                'name' => 'Petra Seller',
                'password' => Hash::make('password'),
                'phone' => '555-0101',
                'company_name' => 'Seller Demo Co',
                'user_type' => User::TYPE_SELLER,
            ],
        );

        User::updateOrCreate(
            ['email' => 'buyer@example.com'],
            [
                'name' => 'Petra Buyer',
                'password' => Hash::make('password'),
                'phone' => '555-0102',
                'company_name' => 'Buyer Demo Co',
                'user_type' => User::TYPE_BUYER,
            ],
        );
    }
}
