<?php

namespace App\Http\Controllers;

use App\Models\EquipmentSubmission;
use App\Support\PublicListingPresenter;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class MarketplaceController extends Controller
{
    public function index(): Response
    {
        $listings = EquipmentSubmission::query()
            ->publiclyVisible()
            ->orderByDesc('featured')
            ->orderByDesc('published_at')
            ->get();

        $cards = $listings->map(fn (EquipmentSubmission $listing): array => PublicListingPresenter::card($listing));

        return Inertia::render('Equipment', [
            'canonicalUrl' => url('/equipment'),
            'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
            'listings' => $cards->values(),
            'filterOptions' => $this->filterOptions($cards),
            'categories' => EquipmentSubmission::CATEGORIES,
            'regions' => EquipmentSubmission::REGIONS,
        ]);
    }

    /**
     * Filter options reflect only values present in the current public listings,
     * except Category and Region which use the fixed enums so the controls are stable.
     *
     * @param  Collection<int, array<string, mixed>>  $cards
     * @return array<string, array<int, string>>
     */
    private function filterOptions(Collection $cards): array
    {
        $present = fn (string $key): array => $cards
            ->pluck($key)
            ->filter()
            ->unique()
            ->sort()
            ->values()
            ->all();

        return [
            'category' => EquipmentSubmission::CATEGORIES,
            'condition' => $present('condition'),
            'region' => EquipmentSubmission::REGIONS,
            'manufacturer' => $present('manufacturer'),
            'availability' => $present('availability'),
        ];
    }
}
