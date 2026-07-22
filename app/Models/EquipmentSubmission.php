<?php

namespace App\Models;

use App\Enums\ListingStatus;
use App\Enums\OfferStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

#[Fillable([
    'user_id',
    'public_id',
    'title',
    'quantity',
    'category',
    'region',
    'city',
    'wyoming_subregion',
    'condition',
    'condition_notes',
    'manufacturer',
    'model',
    'year',
    'capacity',
    'public_description',
    'featured',
    'asking_price',
    'needs_valuation',
    'is_owner',
    'intent',
    'availability',
    'estimated_value_range',
    'contact_name',
    'contact_company',
    'contact_email',
    'contact_phone',
    'consented_at',
    'source',
    'photos',
    'documents',
    'status',
    'published_at',
    'sold_at',
])]
class EquipmentSubmission extends Model
{
    /**
     * How long a sold listing stays visible on the public marketplace.
     */
    public const SOLD_VISIBLE_DAYS = 30;

    public const CARD_IMAGE_PLACEHOLDER = '/images/petra-equipment-yard-hero.png';

    /**
     * Ordered as the content doc's submission-form dropdown. The order flows straight to
     * the portal form and the marketplace filter, so both stay in step with the doc.
     */
    public const CATEGORIES = [
        'Compressors',
        'Separators',
        'Production Equipment',
        'Processing Equipment',
        'Pumps',
        'Tanks & Tank Batteries',
        'Generators',
        'Flowback Equipment',
        'Pipe & Tubular',
        'Valves & Controls',
        'Instrumentation',
        'Wellhead Equipment',
        'Electrical Equipment',
        'Drilling Equipment',
        'Other Equipment',
    ];

    public const CATEGORY_FALLBACK = 'Other Equipment';

    /**
     * Categories as value => label, for the public submission form's dropdown.
     *
     * Every label equals its stored value except the catch-all: the content doc's dropdown
     * ends with plain "Other", while the stored vocabulary keeps "Other Equipment" — renaming
     * the stored value would touch existing listings, the marketplace filter and the seeder
     * for a wording change. The option value is still the stored string, so validation
     * (Rule::in on CATEGORIES) and persistence are unaffected.
     *
     * @return array<string, string>
     */
    public static function categoryOptions(): array
    {
        return array_combine(self::CATEGORIES, array_map(
            fn (string $category): string => $category === self::CATEGORY_FALLBACK ? 'Other' : $category,
            self::CATEGORIES,
        ));
    }

    public const REGIONS = [
        'Wyoming',
        'North Dakota',
        'Colorado',
        'Utah',
        'New Mexico',
        'Montana',
        'Other',
    ];

    public const REGION_FALLBACK = 'Other';

    public const CONDITION_OPERATING = 'operating';

    public const CONDITION_OPERATIONAL_BUT_IDLE = 'operational_but_idle';

    public const CONDITION_REMOVED_FROM_SERVICE = 'removed_from_service';

    public const CONDITION_NEEDS_REPAIR = 'needs_repair';

    public const CONDITION_UNKNOWN = 'unknown';

    public const CONDITIONS = [
        self::CONDITION_OPERATING => 'Operating',
        self::CONDITION_OPERATIONAL_BUT_IDLE => 'Operational but Idle',
        self::CONDITION_REMOVED_FROM_SERVICE => 'Removed from Service',
        self::CONDITION_NEEDS_REPAIR => 'Needs Repair',
        self::CONDITION_UNKNOWN => 'Unknown',
    ];

    public const WYOMING_SUBREGIONS = [
        'powder_river' => 'Powder River',
        'jonah' => 'Jonah',
        'green_river_basin' => 'Green River Basin',
    ];

    public const OWNERSHIP_OPTIONS = [
        'owner' => 'Yes',
        'no' => 'No',
        'representing_owner' => 'Representing the Owner',
    ];

    /**
     * Selecting "request_valuation" is what sets the existing needs_valuation flag — the
     * two are kept in step by the controller rather than stored twice.
     */
    public const INTENT_REQUEST_VALUATION = 'request_valuation';

    public const INTENT_OPTIONS = [
        'sell_one' => 'Sell one piece of equipment',
        'sell_multiple' => 'Sell multiple assets',
        'liquidate_surplus' => 'Liquidate surplus inventory',
        self::INTENT_REQUEST_VALUATION => 'Request a market-based valuation',
    ];

    public const AVAILABILITY_OPTIONS = [
        'available_now' => 'Yes',
        'available_soon' => 'Available Soon',
        'exploring' => 'Just Exploring My Options',
    ];

    public const VALUE_RANGE_OPTIONS = [
        'under_25k' => 'Under $25,000',
        '25k_100k' => '$25,000 – $100,000',
        '100k_500k' => '$100,000 – $500,000',
        'over_500k' => 'Over $500,000',
        'not_sure' => 'Not Sure',
    ];

    public const SOURCE_PORTAL = 'portal';

    public const SOURCE_PUBLIC = 'public';

    /**
     * @return BelongsTo<User, EquipmentSubmission>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Offers a broker has logged against this listing.
     *
     * @return HasMany<Offer, $this>
     */
    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }

    /**
     * True while an offer on this listing is still being negotiated (Pending with the
     * seller, or Countered back to the broker). Guards against logging a second offer
     * on top of an unresolved one — see Offer::isOpen.
     */
    public function hasOpenOffer(): bool
    {
        return $this->offers()
            ->whereIn('status', [OfferStatus::Pending->value, OfferStatus::Countered->value])
            ->exists();
    }

    /**
     * Move the listing to Pending once a side accepts an offer, so the listing stops
     * contradicting its own offers (an Accepted offer under an "Under Review" listing
     * reads as though nothing has happened). Pending is the doc's wording for exactly
     * this state — "A broker is working a deal on this unit".
     *
     * Only Under Review and Published advance. Sold stays sold, Not Accepted stays
     * closed, and Pending is already correct. This does NOT leak an unpublished listing
     * onto the marketplace: scopePubliclyVisible additionally requires public_id and
     * published_at, which only publishing sets. The broker can still override the status
     * by hand afterwards — this sets a sane default, it does not lock anything.
     */
    public function markDealAgreed(): void
    {
        if (in_array($this->listingStatus(), [ListingStatus::UnderReview, ListingStatus::Published], true)) {
            $this->update(['status' => ListingStatus::Pending]);
        }
    }

    public function listingStatus(): ListingStatus
    {
        return $this->status instanceof ListingStatus
            ? $this->status
            : (ListingStatus::tryFrom((string) $this->status) ?? ListingStatus::UnderReview);
    }

    public function statusLabel(): string
    {
        return $this->listingStatus()->label();
    }

    public function conditionLabel(): string
    {
        return self::CONDITIONS[$this->condition] ?? self::CONDITIONS[self::CONDITION_UNKNOWN];
    }

    /**
     * A submission nobody owns: it came from the public form without a signed-in seller,
     * so a broker works it from the contact_* details instead of messaging an account.
     */
    public function isUnclaimedLead(): bool
    {
        return $this->user_id === null;
    }

    public function wyomingSubregionLabel(): ?string
    {
        return self::WYOMING_SUBREGIONS[$this->wyoming_subregion] ?? null;
    }

    public function ownershipLabel(): ?string
    {
        return self::OWNERSHIP_OPTIONS[$this->is_owner] ?? null;
    }

    public function availabilityLabel(): ?string
    {
        return self::AVAILABILITY_OPTIONS[$this->availability] ?? null;
    }

    public function valueRangeLabel(): ?string
    {
        return self::VALUE_RANGE_OPTIONS[$this->estimated_value_range] ?? null;
    }

    /**
     * @return array<int, string>
     */
    public function intentLabels(): array
    {
        return array_values(array_filter(array_map(
            fn (string $intent): ?string => self::INTENT_OPTIONS[$intent] ?? null,
            $this->intent ?? [],
        )));
    }

    /**
     * Contact details for whoever submitted this listing — the account holder when there is
     * one, otherwise the details the public form captured.
     */
    public function contactName(): ?string
    {
        return $this->user?->name ?? $this->contact_name;
    }

    public function contactEmail(): ?string
    {
        return $this->user?->email ?? $this->contact_email;
    }

    public function contactPhone(): ?string
    {
        return $this->user?->phone ?? $this->contact_phone;
    }

    public function contactCompany(): ?string
    {
        return $this->user?->company_name ?? $this->contact_company;
    }

    /**
     * Listings that may appear on the public marketplace: Published/Pending always,
     * Sold only within the 30-day window. Under Review / Not Accepted are never public.
     *
     * @param  Builder<EquipmentSubmission>  $query
     * @return Builder<EquipmentSubmission>
     */
    public function scopePubliclyVisible(Builder $query): Builder
    {
        $visible = array_map(fn (ListingStatus $status): string => $status->value, ListingStatus::publiclyVisible());

        return $query
            ->whereIn('status', $visible)
            // Only listings a broker has actually published carry a public id; this
            // keeps never-published rows (e.g. legacy pending data) off the public site.
            ->whereNotNull('public_id')
            ->whereNotNull('published_at')
            ->where(function (Builder $inner): void {
                $inner->where('status', '!=', ListingStatus::Sold->value)
                    ->orWhere('sold_at', '>=', now()->subDays(self::SOLD_VISIBLE_DAYS));
            });
    }

    /**
     * Public image for a listing card — first uploaded photo, or a safe placeholder.
     *
     * This is the single seam for image optimization: today it returns the original
     * URL; once an image pipeline exists, return a resized derivative here and every
     * caller benefits without change.
     */
    public function cardImageUrl(): string
    {
        return $this->photos[0]['url'] ?? self::CARD_IMAGE_PLACEHOLDER;
    }

    /**
     * Buyer-facing description. Brokers write public_description; if it is somehow
     * empty we fall back to a safe generated summary — never the raw seller notes.
     */
    public function publicDescription(): string
    {
        if (filled($this->public_description)) {
            return $this->public_description;
        }

        return Str::limit(
            sprintf('%s in %s condition, located in %s.', $this->title, Str::lower($this->conditionLabel()), $this->region),
            160,
        );
    }

    /**
     * Documents a broker has explicitly marked public. Seller uploads default to private.
     *
     * @return array<int, array<string, mixed>>
     */
    public function publicDocuments(): array
    {
        return array_values(array_filter(
            $this->documents ?? [],
            fn (array $document): bool => (bool) ($document['public'] ?? false),
        ));
    }

    public function isSoldVisible(): bool
    {
        return $this->listingStatus() === ListingStatus::Sold
            && $this->sold_at !== null
            && $this->sold_at->greaterThanOrEqualTo(now()->subDays(self::SOLD_VISIBLE_DAYS));
    }

    /**
     * Generate a unique public listing id in the PH-#### family. Called on first publish.
     */
    public static function generatePublicId(): string
    {
        do {
            $candidate = 'PH-'.random_int(1000, 9999);
        } while (self::where('public_id', $candidate)->exists());

        return $candidate;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'photos' => 'array',
            'documents' => 'array',
            'intent' => 'array',
            'asking_price' => 'decimal:2',
            'needs_valuation' => 'boolean',
            'featured' => 'boolean',
            'year' => 'integer',
            'quantity' => 'integer',
            'consented_at' => 'datetime',
            'status' => ListingStatus::class,
            'published_at' => 'datetime',
            'sold_at' => 'datetime',
        ];
    }
}
