<?php

use App\Http\Controllers\Portal\DashboardController;
use App\Http\Controllers\Portal\DocumentController;
use App\Http\Controllers\Portal\EquipmentSubmissionController;
use App\Http\Controllers\Portal\MessageThreadController;
use App\Http\Controllers\Portal\OfferController;
use App\Http\Controllers\Portal\ProfileController;
use Illuminate\Support\Facades\Route;

// Notifications stay deferred. Quotes stays as a "Soon" placeholder.
// 'offers', 'messages' and 'documents' are now real seller pages (see the dedicated
// routes below), so they are no longer served by the generic "Soon" placeholder.
$portalSections = ['quotes'];

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
        // Messaging with Petra — the same controller and screen the buyer portal uses.
        // Sellers were previously excluded from Messages entirely; they now reach their
        // broker about their own submissions here.
        Route::get('/messages', [MessageThreadController::class, 'index'])->name('messages');
        Route::get('/messages/{thread}', [MessageThreadController::class, 'show'])->whereNumber('thread')->name('messages.show');
        Route::post('/messages/{thread}/messages', [MessageThreadController::class, 'store'])->whereNumber('thread')->name('messages.store');
        Route::post('/messages/{thread}/read', [MessageThreadController::class, 'markRead'])->whereNumber('thread')->name('messages.read');
        // The Documents hub. Read-only: everything a seller can see here arrives from
        // their own submission or from a broker sharing it. The same controller serves
        // the buyer portal — the access rule is Document::visibleTo either way.
        Route::get('/documents', [DocumentController::class, 'index'])->defaults('userType', 'seller')->name('documents');
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
