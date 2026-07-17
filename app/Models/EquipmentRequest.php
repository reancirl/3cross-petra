<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
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

    // NOTE (open question — quote status ladder): these statuses were designed for
    // free-form sourcing requests, where the broker checks inventory and contacts
    // multiple sellers before presenting options. A "Request Quote" inquiry on an
    // already-listed item (equipment_submission_id set) does not fit this ladder
    // cleanly — "Checking Inventory"/"Contacting Sellers"/"Options Presented" read
    // oddly when the buyer is asking about ONE known listing with a known seller.
    // Per the content doc, quotes reuse this same field/values for now; a
    // quote-specific status set is still pending client confirmation. Do not
    // redesign this ladder without that confirmation.
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

    /**
     * The public listing this inquiry was raised against. Null for free-form
     * equipment requests submitted from the buyer's "My Requests" workspace.
     *
     * @return BelongsTo<EquipmentSubmission, EquipmentRequest>
     */
    public function equipmentSubmission(): BelongsTo
    {
        return $this->belongsTo(EquipmentSubmission::class);
    }

    /**
     * Quote inquiries: requests tied to a specific listing, created by the
     * "Request Quote" CTA on an Equipment Detail page.
     *
     * @param  Builder<EquipmentRequest>  $query
     * @return Builder<EquipmentRequest>
     */
    public function scopeQuoteInquiries(Builder $query): Builder
    {
        return $query->whereNotNull('equipment_submission_id');
    }

    /**
     * Free-form equipment requests: not tied to any listing, submitted from the
     * buyer's "My Requests" workspace.
     *
     * @param  Builder<EquipmentRequest>  $query
     * @return Builder<EquipmentRequest>
     */
    public function scopeFreeFormRequests(Builder $query): Builder
    {
        return $query->whereNull('equipment_submission_id');
    }

    public function isQuoteInquiry(): bool
    {
        return $this->equipment_submission_id !== null;
    }

    public function statusLabel(): string
    {
        return self::STATUSES[$this->status] ?? $this->status;
    }
}
