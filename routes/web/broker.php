<?php

use App\Http\Controllers\Broker\SubmissionReviewController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'no.back.history', 'user.type:broker'])
    ->prefix('broker')
    ->name('broker.')
    ->group(function () {
        Route::get('/submissions', [SubmissionReviewController::class, 'index'])->name('submissions');
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
