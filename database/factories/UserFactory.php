<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'phone' => $this->faker->optional()->phoneNumber(),
            'company_name' => $this->faker->optional()->company(),
            'user_type' => User::TYPE_BUYER,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function seller(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_type' => User::TYPE_SELLER,
        ]);
    }

    public function buyer(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_type' => User::TYPE_BUYER,
        ]);
    }
}
