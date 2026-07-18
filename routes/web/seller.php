<?php

use App\Http\Controllers\Portal\DashboardController;
use App\Http\Controllers\Portal\EquipmentSubmissionController;
use App\Http\Controllers\Portal\OfferController;
use App\Http\Controllers\Portal\ProfileController;
use Illuminate\Support\Facades\Route;

// Messages and notifications are deferred. Quotes/documents stay as "Soon" placeholders.
// 'offers' is now a real seller page (see the dedicated routes below), so it is no
// longer served by the generic "Soon" placeholder.
$portalSections = ['quotes', 'documents'];

Route::middleware(['auth', 'no.back.history', 'user.type:seller'])
    ->prefix('seller')
    ->name('portal.seller.')
    ->group(function () use ($portalSections) {
        Route::get('/dashboard', [DashboardController::class, 'index'])->defaults('userType', 'seller')->name('dashboard');
        Route::get('/listings', [EquipmentSubmissionController::class, 'index'])->name('listings');
        Route::post('/listings', [EquipmentSubmissionController::class, 'store'])->name('listings.store');
        // A seller's own view of one listing. Bound by id, so the controller checks
        // ownership explicitly — binding alone would let any seller read any listing.
        Route::get('/listings/{equipmentSubmission}', [EquipmentSubmissionController::class, 'show'])
            ->whereNumber('equipmentSubmission')
            ->name('listings.show');
        // Seller Offers: view offers on your listings and respond. Offers are created
        // by brokers, never here. The user.type:seller middleware on this group
        // redirects any buyer/broker who hits /seller/offers directly to their own portal.
        Route::get('/offers', [OfferController::class, 'index'])->name('offers');
        Route::patch('/offers/{offer}', [OfferController::class, 'respond'])->name('offers.respond');
        Route::get('/profile', [ProfileController::class, 'show'])->defaults('userType', 'seller')->name('profile');
        Route::patch('/profile', [ProfileController::class, 'update'])->defaults('userType', 'seller')->name('profile.update');
        Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->defaults('userType', 'seller')->name('profile.password');
        Route::get('/{section}', [DashboardController::class, 'placeholder'])
            ->whereIn('section', $portalSections)
            ->defaults('userType', 'seller')
            ->name('placeholder');
    });

// /seller/saved-equipment was renamed to /seller/listings.
Route::redirect('/seller/saved-equipment', '/seller/listings', 301);
