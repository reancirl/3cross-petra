<?php

namespace App\Enums;

/**
 * The canonical status vocabulary for a piece of equipment moving through Petra.
 *
 * Shared by the seller portal and the broker portal. The public marketplace shows
 * buyer-facing wording instead (see publicLabel) because the client content doc
 * specifies "Available / Pending / Sold" for listings.
 */
enum ListingStatus: string
{
    case UnderReview = 'under_review';
    case Published = 'published';
    case Pending = 'pending';
    case Sold = 'sold';
    case NotAccepted = 'not_accepted';

    public function label(): string
    {
        return match ($this) {
            self::UnderReview => 'Under Review',
            self::Published => 'Published',
            self::Pending => 'Pending',
            self::Sold => 'Sold',
            self::NotAccepted => 'Not Accepted',
        };
    }

    /**
     * Buyer-facing wording. A public listing is by definition already published,
     * so buyers see "Available" rather than the internal "Published".
     */
    public function publicLabel(): string
    {
        return match ($this) {
            self::Published => 'Available',
            default => $this->label(),
        };
    }

    /**
     * Badge tone. Consumed by the portal StatusBadge component.
     */
    public function tone(): string
    {
        return match ($this) {
            self::UnderReview => 'neutral',
            self::Published => 'success',
            self::Pending => 'warning',
            self::Sold => 'muted',
            self::NotAccepted => 'danger',
        };
    }

    /**
     * One-line explanation shown to the seller under the status badge.
     *
     * Null where the client has not supplied approved seller-facing copy.
     */
    public function sellerExplanation(): ?string
    {
        return match ($this) {
            self::UnderReview => 'A broker is reviewing your submission.',
            self::Published => 'Live on the Petra marketplace.',
            self::Pending => 'A broker is working a deal on this unit.',
            self::Sold => 'This unit has sold.',
            self::NotAccepted => null,
        };
    }

    /**
     * Statuses that may appear on the public marketplace at all. Sold is included
     * here but additionally gated by the 30-day sold_at window in the query scope.
     *
     * @return array<int, self>
     */
    public static function publiclyVisible(): array
    {
        return [self::Published, self::Pending, self::Sold];
    }

    /**
     * Whether the photo set may still be changed.
     *
     * Published is deliberately included: a listing going live with the wrong photos —
     * or with none, which blocks publishing in the first place — is the whole reason
     * post-submission uploads exist. Sold and Not Accepted are closed records; a Sold
     * listing stays publicly visible for 30 days and its gallery should not move
     * underneath the buyers still looking at it.
     */
    public function acceptsPhotoEdits(): bool
    {
        return match ($this) {
            self::UnderReview, self::Published, self::Pending => true,
            self::Sold, self::NotAccepted => false,
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

    /**
     * Maps the pre-2026-07-14 statuses onto the canonical vocabulary.
     *
     * @return array<string, string>
     */
    public static function legacyMap(): array
    {
        return [
            'submitted' => self::UnderReview->value,
            'under_review' => self::UnderReview->value,
            'buyers_identified' => self::Published->value,
            'in_negotiation' => self::Pending->value,
            'offer_received' => self::Pending->value,
        ];
    }
}
