<?php

namespace App\Enums;

use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;

/**
 * What a message thread is anchored to.
 *
 * Threads are subject-anchored, not peer-to-peer: every conversation is about a
 * specific listing or buyer request. The two cases map onto the two models a
 * customer can own — note that there is no Listing model, a listing is an
 * EquipmentSubmission.
 *
 * EquipmentRequest does double duty (a free-form request when
 * equipment_submission_id is null, a quote inquiry on a listing when it is not).
 * Either kind can anchor a BuyerRequest thread; the subject is the request row
 * itself, so no disambiguation is needed here.
 */
enum ThreadSubjectType: string
{
    case Listing = 'listing';
    case BuyerRequest = 'buyer_request';

    /**
     * The Eloquent model class backing this subject.
     *
     * @return class-string<EquipmentSubmission|EquipmentRequest>
     */
    public function modelClass(): string
    {
        return match ($this) {
            self::Listing => EquipmentSubmission::class,
            self::BuyerRequest => EquipmentRequest::class,
        };
    }

    public function label(): string
    {
        return match ($this) {
            self::Listing => 'Listing',
            self::BuyerRequest => 'Buyer Request',
        };
    }

    /**
     * @return array<string, string> value => label, for select inputs.
     */
    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn (self $type): array => [$type->value => $type->label()])
            ->all();
    }
}
