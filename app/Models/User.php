<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'phone', 'company_name', 'user_type'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    public const TYPE_SELLER = 'seller';

    public const TYPE_BUYER = 'buyer';

    public const USER_TYPES = [
        self::TYPE_SELLER,
        self::TYPE_BUYER,
    ];

    protected $attributes = [
        'user_type' => self::TYPE_BUYER,
    ];

    public function portalRouteName(): string
    {
        return $this->user_type === self::TYPE_SELLER
            ? 'portal.seller.dashboard'
            : 'portal.buyer.dashboard';
    }

    public function userTypeLabel(): string
    {
        return $this->user_type === self::TYPE_SELLER ? 'Seller' : 'Buyer';
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
