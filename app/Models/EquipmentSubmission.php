<?php

namespace App\Models;

use App\Enums\ListingStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'title',
    'category',
    'region',
    'city',
    'condition',
    'condition_notes',
    'asking_price',
    'needs_valuation',
    'photos',
    'documents',
    'status',
])]
class EquipmentSubmission extends Model
{
    public const CATEGORIES = [
        'Compressors',
        'Separators',
        'Production Equipment',
        'Processing Equipment',
        'Pumps',
        'Tanks',
        'Generators',
        'Drilling Equipment',
        'Electrical Equipment',
        'Pipe & Tubular',
        'Valves & Controls',
        'Instrumentation',
        'Wellhead Equipment',
        'Other Equipment',
    ];

    public const CATEGORY_FALLBACK = 'Other Equipment';

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

    public const CONDITION_RUNNING = 'running';

    public const CONDITION_RECENTLY_PULLED = 'recently_pulled';

    public const CONDITION_SITTING_IDLE = 'sitting_idle';

    public const CONDITION_NEEDS_WORK = 'needs_work';

    public const CONDITION_UNKNOWN = 'unknown';

    public const CONDITIONS = [
        self::CONDITION_RUNNING => 'Running',
        self::CONDITION_RECENTLY_PULLED => 'Recently pulled',
        self::CONDITION_SITTING_IDLE => 'Sitting idle',
        self::CONDITION_NEEDS_WORK => 'Needs work',
        self::CONDITION_UNKNOWN => 'Unknown',
    ];

    /**
     * @return BelongsTo<User, EquipmentSubmission>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'photos' => 'array',
            'documents' => 'array',
            'asking_price' => 'decimal:2',
            'needs_valuation' => 'boolean',
            'status' => ListingStatus::class,
        ];
    }
}
