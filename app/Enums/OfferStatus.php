<?php

namespace App\Enums;

/**
 * The status of an Offer as it moves between the broker and the seller.
 *
 * ASSUMPTION: the content doc does not define an offer status vocabulary beyond
 * "you receive actual offers". This minimal ladder is inferred from context — a
 * broker logs a Pending offer, and the seller responds Accept / Decline / Counter.
 * Mirrors the shape of App\Enums\ListingStatus (value → label → tone).
 */
enum OfferStatus: string
{
    case Pending = 'pending';
    case Accepted = 'accepted';
    case Declined = 'declined';
    case Countered = 'countered';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::Accepted => 'Accepted',
            self::Declined => 'Declined',
            self::Countered => 'Countered',
        };
    }

    /**
     * Badge tone. Consumed by the portal StatusBadge components (StatusTone in types.ts).
     */
    public function tone(): string
    {
        return match ($this) {
            self::Pending => 'warning',
            self::Accepted => 'success',
            self::Declined => 'danger',
            self::Countered => 'neutral',
        };
    }

    /**
     * @return array<string, string> value => label, for select inputs.
     */
    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn (self $status): array => [$status->value => $status->label()])
            ->all();
    }
}
