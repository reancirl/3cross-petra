<?php

namespace App\Support;

use App\Models\Document;
use App\Models\EquipmentSubmission;

/**
 * The single place that decides what a public visitor may see about a listing.
 *
 * Deliberately never emits: seller identity/contact, user_id, asking_price,
 * needs_valuation, or the raw seller condition_notes. If a field is not built here,
 * it does not reach the public site.
 */
class PublicListingPresenter
{
    /**
     * Compact shape for a marketplace card.
     *
     * @return array<string, mixed>
     */
    public static function card(EquipmentSubmission $listing): array
    {
        $status = $listing->listingStatus();

        return [
            'public_id' => $listing->public_id,
            'title' => $listing->title,
            'category' => $listing->category,
            'region' => $listing->region,
            'city' => $listing->city,
            'condition' => $listing->conditionLabel(),
            'availability' => $status->publicLabel(),
            'status_tone' => $status->tone(),
            'manufacturer' => $listing->manufacturer,
            'year' => $listing->year !== null ? (string) $listing->year : null,
            'capacity' => $listing->capacity,
            'description' => $listing->publicDescription(),
            'image_url' => $listing->cardImageUrl(),
            'featured' => (bool) $listing->featured,
            'href' => "/equipment/{$listing->public_id}",
        ];
    }

    /**
     * Full shape for the detail page. Extends the card with the gallery, specs,
     * and only the documents a broker has marked public.
     *
     * @return array<string, mixed>
     */
    public static function detail(EquipmentSubmission $listing): array
    {
        return array_merge(self::card($listing), [
            'model' => $listing->model,
            'photos' => array_map(fn (array $photo): array => [
                'url' => $photo['url'] ?? EquipmentSubmission::CARD_IMAGE_PLACEHOLDER,
                'alt' => $photo['name'] ?? $listing->title,
            ], $listing->photos ?? []),
            // Route URLs, not static paths. Documents live on the private disk and are
            // handed out by DocumentDownloadController::publicShow, which re-checks that
            // this listing is still publicly visible — so unpublishing a listing takes
            // its paperwork off the internet with it, which a frozen static URL could
            // never do.
            'documents' => $listing->publicDocuments()
                ->map(fn (Document $document): array => [
                    'name' => $document->original_name,
                    'url' => route('documents.public', $document),
                ])
                ->values()
                ->all(),
            'specifications' => [
                'manufacturer' => $listing->manufacturer,
                'model' => $listing->model,
                'year' => $listing->year !== null ? (string) $listing->year : null,
                'capacity' => $listing->capacity,
            ],
        ]);
    }
}
