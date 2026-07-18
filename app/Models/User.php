<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
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

    public const TYPE_BROKER = 'broker';

    public const USER_TYPES = [
        self::TYPE_SELLER,
        self::TYPE_BUYER,
        self::TYPE_BROKER,
    ];

    public const CUSTOMER_USER_TYPES = [
        self::TYPE_SELLER,
        self::TYPE_BUYER,
    ];

    protected $attributes = [
        'user_type' => self::TYPE_BUYER,
    ];

    public function portalRouteName(): string
    {
        return match ($this->user_type) {
            self::TYPE_SELLER => 'portal.seller.dashboard',
            self::TYPE_BROKER => 'broker.submissions',
            default => 'portal.buyer.dashboard',
        };
    }

    public function userTypeLabel(): string
    {
        return match ($this->user_type) {
            self::TYPE_SELLER => 'Seller',
            self::TYPE_BROKER => 'Broker',
            default => 'Buyer',
        };
    }

    /**
     * @return HasMany<EquipmentSubmission>
     */
    public function equipmentSubmissions(): HasMany
    {
        return $this->hasMany(EquipmentSubmission::class);
    }

    /**
     * @return HasMany<EquipmentRequest>
     */
    public function equipmentRequests(): HasMany
    {
        return $this->hasMany(EquipmentRequest::class);
    }

    /**
     * Offers made on this seller's listings, reached through their submissions.
     * Scoping every offer query through this relationship guarantees a seller only
     * ever sees offers tied to their own listings — never another seller's.
     *
     * @return HasManyThrough<Offer, EquipmentSubmission, $this>
     */
    public function offers(): HasManyThrough
    {
        return $this->hasManyThrough(Offer::class, EquipmentSubmission::class);
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
