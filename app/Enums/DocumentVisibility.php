<?php

namespace App\Enums;

/**
 * Who a document is for.
 *
 * This is the whole access vocabulary — there is no per-document ACL. A document is
 * either internal to Petra, aimed at exactly one customer, or attached to a listing
 * for anyone looking at it on the marketplace.
 *
 * PublicListing is the old per-document `public` flag from the marketplace build
 * (equipment_submissions.documents[i]['public']) promoted to a first-class value, so
 * "publish this spec sheet with the listing" keeps meaning what it always meant.
 */
enum DocumentVisibility: string
{
    case PrivateBroker = 'private_broker';
    case SharedUser = 'shared_user';
    case PublicListing = 'public_listing';

    public function label(): string
    {
        return match ($this) {
            self::PrivateBroker => 'Private',
            self::SharedUser => 'Shared',
            self::PublicListing => 'Public',
        };
    }

    /**
     * Badge tone, consumed by the portal StatusBadge component.
     */
    public function tone(): string
    {
        return match ($this) {
            self::PrivateBroker => 'muted',
            self::SharedUser => 'success',
            self::PublicListing => 'neutral',
        };
    }

    /**
     * Only listings can carry a public document — a buyer request has no public page
     * for one to appear on. Enforced in StoreDocumentRequest rather than left to the UI.
     */
    public function allowedOn(ThreadSubjectType $subjectType): bool
    {
        return $this !== self::PublicListing || $subjectType === ThreadSubjectType::Listing;
    }

    /**
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
