<?php

use App\Http\Controllers\Broker\InboxController;
use App\Http\Controllers\Broker\LeadController;
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
        // Talk to a Broker inquiries from the public Sell Equipment section. A third queue
        // rather than a tab, for the same reason the two above are separate pages.
        Route::get('/leads', [LeadController::class, 'index'])->name('leads');
        Route::patch('/leads/{brokerInquiry}', [LeadController::class, 'update'])->name('leads.update');
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
        // Inbox: every thread from every buyer and seller. Brokers are staff, so unlike
        // the customer side there is no ownership filter — user.type:broker on this
        // group is the whole authorization story, matching the queues above.
        Route::get('/inbox', [InboxController::class, 'index'])->name('inbox');
        // Declared before /inbox/{thread} so the literal path is not swallowed by the
        // numeric binding.
        Route::post('/inbox/threads', [InboxController::class, 'storeThread'])->name('inbox.threads.store');
        Route::get('/inbox/{thread}', [InboxController::class, 'show'])->whereNumber('thread')->name('inbox.show');
        Route::post('/inbox/{thread}/messages', [InboxController::class, 'store'])->whereNumber('thread')->name('inbox.messages.store');
        Route::post('/inbox/{thread}/read', [InboxController::class, 'markRead'])->whereNumber('thread')->name('inbox.read');
        // Close / reopen. Broker-only by design: a customer cannot close their own
        // ticket, and any new message reopens it regardless.
        Route::patch('/inbox/{thread}/status', [InboxController::class, 'updateStatus'])->whereNumber('thread')->name('inbox.status');
    });
