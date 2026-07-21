<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * A "Talk to a Broker" submission from the public Sell Equipment section.
 *
 * Distinct from EquipmentRequest (a buyer asking for equipment, with its own quote ladder):
 * an inquiry is an open question from someone who may have nothing in the system yet, and
 * is always answered from the contact details it carries.
 */
#[Fillable([
    'type',
    'user_id',
    'full_name',
    'company',
    'email',
    'phone',
    'topic',
    'equipment_type',
    'message',
    'preferred_contact',
    'consented_at',
    'status',
])]
class BrokerInquiry extends Model
{
    public const TYPE_BROKER_INQUIRY = 'broker_inquiry';

    public const TOPICS = [
        'sell_equipment' => 'I want to sell equipment',
        'request_valuation' => 'I want to request a valuation',
        'looking_for_equipment' => "I'm looking for equipment",
        'questions_selling' => 'I have questions about selling equipment',
        'questions_listing' => 'I have questions about a listing',
        'other' => 'Other',
    ];

    public const PREFERRED_CONTACT = [
        'phone' => 'Phone',
        'email' => 'Email',
        'either' => 'Either',
    ];

    public const STATUS_NEW = 'new';

    public const STATUSES = [
        self::STATUS_NEW => 'New',
        'contacted' => 'Contacted',
        'closed' => 'Closed',
    ];

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function topicLabel(): string
    {
        return self::TOPICS[$this->topic] ?? self::TOPICS['other'];
    }

    public function preferredContactLabel(): string
    {
        return self::PREFERRED_CONTACT[$this->preferred_contact] ?? self::PREFERRED_CONTACT['either'];
    }

    public function statusLabel(): string
    {
        return self::STATUSES[$this->status] ?? self::STATUSES[self::STATUS_NEW];
    }

    /**
     * Badge tone, matching the vocabulary the portal StatusBadge component expects.
     */
    public function statusTone(): string
    {
        return match ($this->status) {
            'contacted' => 'success',
            'closed' => 'muted',
            default => 'neutral',
        };
    }

    /**
     * @param  Builder<BrokerInquiry>  $query
     * @return Builder<BrokerInquiry>
     */
    public function scopeAwaitingResponse(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_NEW);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'consented_at' => 'datetime',
        ];
    }
}
