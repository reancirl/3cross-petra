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
     * Threads this user owns the customer side of.
     *
     * Brokers do not use this relationship — they are staff and see every thread
     * (Thread::scopeVisibleTo). For buyers and sellers it is the access boundary:
     * querying through it makes "you only see your own threads" structural rather
     * than a check each new endpoint has to remember.
     *
     * @return HasMany<Thread, $this>
     */
    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class);
    }

    /**
     * Documents a broker shared with this user by name. Does not cover everything the
     * user can see — their own uploads and public listing documents reach them through
     * Document::scopeVisibleTo, which is the authoritative rule. This relationship
     * exists for the notification path, which only ever deals with direct shares.
     *
     * @return HasMany<Document, $this>
     */
    public function sharedDocuments(): HasMany
    {
        return $this->hasMany(Document::class, 'shared_with_user_id');
    }

    /**
     * Documents added since this user last opened the Documents page — the nav badge.
     *
     * Counted against a single high-water mark rather than a per-document seen table:
     * the page shows everything at once, so "anything new since you last looked" is
     * exactly as precise as the question the badge asks. A user who has never visited
     * sees everything as new, which is correct.
     */
    public static function unseenDocumentCountFor(User $user): int
    {
        if ($user->isBroker()) {
            // Brokers upload and share; they are not the audience for a "new for you"
            // badge on their own work, and their view is the per-subject panel anyway.
            return 0;
        }

        return Document::query()
            ->visibleTo($user)
            ->when(
                $user->documents_last_viewed_at !== null,
                fn ($query) => $query->where('documents.created_at', '>', $user->documents_last_viewed_at),
            )
            ->count();
    }

    public function markDocumentsViewed(): void
    {
        $this->forceFill(['documents_last_viewed_at' => now()])->save();
    }

    /**
     * Whether a document-share email may go out now, or whether one went inside the
     * batching window and this one should be suppressed. Mirrors Thread::shouldNotify.
     */
    public function shouldNotifyAboutDocuments(int $withinMinutes): bool
    {
        return $this->documents_notified_at === null
            || $this->documents_notified_at->lt(now()->subMinutes($withinMinutes));
    }

    public function markDocumentsNotified(): void
    {
        $this->forceFill(['documents_notified_at' => now()])->save();
    }

    public function isBroker(): bool
    {
        return $this->user_type === self::TYPE_BROKER;
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
            'documents_last_viewed_at' => 'datetime',
            'documents_notified_at' => 'datetime',
        ];
    }
}
