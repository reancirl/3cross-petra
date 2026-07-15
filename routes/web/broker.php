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
        Route::patch('/buyer-requests/{equipmentRequest}', [SubmissionReviewController::class, 'updateBuyerRequest'])
            ->name('buyer-requests.update');
    });
