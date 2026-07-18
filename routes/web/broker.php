<?php

use App\Http\Controllers\Broker\SubmissionReviewController;
use App\Http\Controllers\Portal\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'no.back.history', 'user.type:broker'])
    ->prefix('broker')
    ->name('broker.')
    ->group(function () {
        // The seller queue is also the broker landing page — brokers have no dashboard
        // (see User::portalRouteName and portalHome in portal-sidebar).
        Route::get('/submissions', [SubmissionReviewController::class, 'index'])->name('submissions');
        // The buyer queue. Split out of /broker/submissions, where both queues shared
        // one tabbed page and made a single very long scroll.
        Route::get('/requests', [SubmissionReviewController::class, 'requests'])->name('requests');
        // Same generic profile screen the seller and buyer portals use; the userType
        // default drives the shell chrome and the form's own patch/put URLs.
        Route::get('/profile', [ProfileController::class, 'show'])->defaults('userType', 'broker')->name('profile');
        Route::patch('/profile', [ProfileController::class, 'update'])->defaults('userType', 'broker')->name('profile.update');
        Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->defaults('userType', 'broker')->name('profile.password');
        Route::patch('/seller-submissions/{equipmentSubmission}', [SubmissionReviewController::class, 'updateSellerSubmission'])
            ->name('seller-submissions.update');
        // Offers have no submission path anywhere else (unlike Quotes). The broker is
        // the only actor who can create one — logged against a seller's listing after
        // working the buyer side off-platform ("we handle outreach and negotiation").
        Route::post('/seller-submissions/{equipmentSubmission}/offers', [SubmissionReviewController::class, 'storeOffer'])
            ->name('seller-submissions.offers.store');
        // The broker's half of the negotiation loop: answer a seller's counter in
        // place (accept / decline / re-offer) instead of logging a duplicate offer.
        Route::patch('/offers/{offer}', [SubmissionReviewController::class, 'respondToOffer'])
            ->name('offers.respond');
        Route::patch('/buyer-requests/{equipmentRequest}', [SubmissionReviewController::class, 'updateBuyerRequest'])
            ->name('buyer-requests.update');
    });
