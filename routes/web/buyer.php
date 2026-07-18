<?php

use App\Http\Controllers\Portal\DashboardController;
use App\Http\Controllers\Portal\EquipmentRequestController;
use App\Http\Controllers\Portal\ProfileController;
use App\Http\Controllers\Portal\QuoteController;
use Illuminate\Support\Facades\Route;

// 'quotes' is now a real buyer page (see the dedicated route below), so it is no
// longer served by the generic "Soon" placeholder.
//
// 'offers' is deliberately absent for buyers — no route, no nav entry. It was a "Soon"
// placeholder, but an Offer (see App\Models\Offer) belongs to a seller's listing and has
// no buyer column at all; the negotiation loop is broker ↔ seller only. There is no buyer
// data such a page could ever show, and the content doc scopes "Offers" to the SELLER
// process ("You receive actual offers"). The seller route (/seller/offers) is protected by
// user.type:seller, so a buyer who hits it directly is redirected to their own portal.
// Re-add here if the client ever defines a buyer-facing offer (e.g. linking a buyer's
// Quote to an Offer — a linkage App\Models\Offer explicitly does not model today).
//
// 'saved-equipment' is the buyer watchlist from the sitemap doc ("Saved Equipment (Future)",
// listed under the Equipment/marketplace branch). It is still a "Soon" placeholder. The
// live free-form request list used to squat on this path and now lives at /buyer/requests;
// the name is deliberately left free here for the watchlist rather than 301-redirected, so
// the two features stop sharing a name. See docs/site-map.md.
$portalSections = ['saved-equipment', 'documents', 'messages', 'notifications'];

Route::middleware(['auth', 'no.back.history', 'user.type:buyer'])
    ->prefix('buyer')
    ->name('portal.buyer.')
    ->group(function () use ($portalSections) {
        Route::get('/dashboard', [DashboardController::class, 'index'])->defaults('userType', 'buyer')->name('dashboard');
        Route::get('/requests', [EquipmentRequestController::class, 'index'])->name('requests');
        Route::post('/requests', [EquipmentRequestController::class, 'store'])->name('requests.store');
        // Buyer-only Quotes list. The user.type:buyer middleware on this group redirects
        // any seller/broker who hits /buyer/quotes directly to their own portal.
        Route::get('/quotes', [QuoteController::class, 'index'])->name('quotes');
        Route::get('/profile', [ProfileController::class, 'show'])->defaults('userType', 'buyer')->name('profile');
        Route::patch('/profile', [ProfileController::class, 'update'])->defaults('userType', 'buyer')->name('profile.update');
        Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->defaults('userType', 'buyer')->name('profile.password');
        Route::get('/{section}', [DashboardController::class, 'placeholder'])
            ->whereIn('section', $portalSections)
            ->defaults('userType', 'buyer')
            ->name('placeholder');
    });
