<?php

namespace App\Support;

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
            'documents' => array_map(fn (array $document): array => [
                'name' => $document['name'] ?? 'Document',
                'url' => $document['url'] ?? '#',
            ], $listing->publicDocuments()),
            'specifications' => [
                'manufacturer' => $listing->manufacturer,
                'model' => $listing->model,
                'year' => $listing->year !== null ? (string) $listing->year : null,
                'capacity' => $listing->capacity,
            ],
        ]);
    }
}
