<?php

namespace App\Http\Controllers;

use App\Models\EquipmentSubmission;
use App\Support\PublicListingPresenter;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Section 8 surfaces featured listings; fall back to the most recent public
        // listings so the homepage is never empty once inventory exists.
        $featured = EquipmentSubmission::query()
            ->publiclyVisible()
            ->orderByDesc('featured')
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn (EquipmentSubmission $listing): array => PublicListingPresenter::card($listing));

        return Inertia::render('Home', [
            'canonicalUrl' => url('/'),
            'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
            'featuredListings' => $featured->values(),
        ]);
    }
}
