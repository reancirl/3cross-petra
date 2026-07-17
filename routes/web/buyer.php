<?php

use App\Http\Controllers\Portal\DashboardController;
use App\Http\Controllers\Portal\EquipmentRequestController;
use App\Http\Controllers\Portal\ProfileController;
use App\Http\Controllers\Portal\QuoteController;
use Illuminate\Support\Facades\Route;

// 'quotes' is now a real buyer page (see the dedicated route below), so it is no
// longer served by the generic "Soon" placeholder.
$portalSections = ['saved-equipment-watchlist', 'offers', 'documents', 'messages', 'notifications'];

Route::middleware(['auth', 'no.back.history', 'user.type:buyer'])
    ->prefix('buyer')
    ->name('portal.buyer.')
    ->group(function () use ($portalSections) {
        Route::get('/dashboard', [DashboardController::class, 'index'])->defaults('userType', 'buyer')->name('dashboard');
        Route::get('/saved-equipment', [EquipmentRequestController::class, 'index'])->name('saved-equipment');
        Route::post('/saved-equipment', [EquipmentRequestController::class, 'store'])->name('saved-equipment.store');
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
