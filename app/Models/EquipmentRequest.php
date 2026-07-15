<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'equipment_submission_id', 'equipment_type', 'specifications', 'budget_range', 'location_preference', 'timeline', 'status'])]
class EquipmentRequest extends Model
{
    public const STATUS_SUBMITTED = 'submitted';

    public const STATUS_CHECKING_INVENTORY = 'checking_inventory';

    public const STATUS_CONTACTING_SELLERS = 'contacting_sellers';

    public const STATUS_OPTIONS_PRESENTED = 'options_presented';

    public const STATUS_REVIEWING_OPTIONS = 'reviewing_options';

    public const STATUSES = [
        self::STATUS_SUBMITTED => 'Submitted',
        self::STATUS_CHECKING_INVENTORY => 'Checking Inventory',
        self::STATUS_CONTACTING_SELLERS => 'Contacting Sellers',
        self::STATUS_OPTIONS_PRESENTED => 'Options Presented',
        self::STATUS_REVIEWING_OPTIONS => 'Reviewing Options',
    ];

    /**
     * @return BelongsTo<User, EquipmentRequest>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function statusLabel(): string
    {
        return self::STATUSES[$this->status] ?? $this->status;
    }
}
