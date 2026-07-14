<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'equipment_type', 'location', 'condition', 'photos', 'documents', 'status'])]
class EquipmentSubmission extends Model
{
    public const STATUS_SUBMITTED = 'submitted';

    public const STATUS_UNDER_REVIEW = 'under_review';

    public const STATUS_BUYERS_IDENTIFIED = 'buyers_identified';

    public const STATUS_IN_NEGOTIATION = 'in_negotiation';

    public const STATUS_OFFER_RECEIVED = 'offer_received';

    public const STATUSES = [
        self::STATUS_SUBMITTED => 'Submitted',
        self::STATUS_UNDER_REVIEW => 'Under Review',
        self::STATUS_BUYERS_IDENTIFIED => 'Buyers Identified',
        self::STATUS_IN_NEGOTIATION => 'In Negotiation',
        self::STATUS_OFFER_RECEIVED => 'Offer Received',
    ];

    /**
     * @return BelongsTo<User, EquipmentSubmission>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function statusLabel(): string
    {
        return self::STATUSES[$this->status] ?? $this->status;
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
        ];
    }
}
