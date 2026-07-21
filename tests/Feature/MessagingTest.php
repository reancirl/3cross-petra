<?php

namespace Tests\Feature;

use App\Enums\ListingStatus;
use App\Enums\ThreadSide;
use App\Mail\NewThreadMessageMail;
use App\Models\EquipmentSubmission;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MessagingTest extends TestCase
{
    use LazilyRefreshDatabase;

    private function publishedListing(): EquipmentSubmission
    {
        $seller = User::factory()->seller()->create();

        return $seller->equipmentSubmissions()->create([
            'title' => '3-Phase Production Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'city' => 'Casper',
            'condition' => 'operational_but_idle',
            'public_description' => 'Field-proven separator available for redeployment.',
            'photos' => [['name' => 'a.jpg', 'path' => 'p/a.jpg', 'url' => '/storage/p/a.jpg', 'size' => 1]],
            'status' => ListingStatus::Published,
            'public_id' => 'PH-9902',
            'published_at' => now(),
        ]);
    }

    private function underReviewListing(): EquipmentSubmission
    {
        $seller = User::factory()->seller()->create();

        return $seller->equipmentSubmissions()->create([
            'title' => 'Unreviewed Compressor',
            'category' => 'Compressors',
            'region' => 'Wyoming',
            'condition' => 'unknown',
            'status' => ListingStatus::UnderReview,
        ]);
    }

    // 1. Buyer clicks Request Details → thread created, broker sees it with context.

    public function test_buyer_inquiry_opens_a_thread_the_broker_can_see_with_listing_context(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create(['name' => 'Dana Buyer']);

        $this->actingAs($buyer)
            ->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'Is this still available in Casper?'])
            ->assertSessionHasNoErrors();

        $thread = Thread::firstOrFail();

        $this->assertSame('listing', $thread->subject_type);
        $this->assertSame($listing->id, (int) $thread->subject_id);
        $this->assertSame($buyer->id, $thread->user_id);
        $this->assertDatabaseHas('messages', [
            'thread_id' => $thread->id,
            'sender_type' => ThreadSide::User->value,
            'body' => 'Is this still available in Casper?',
        ]);

        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->get('/broker/inbox')
            ->assertOk()
            ->assertSee('Broker\/Inbox')
            ->assertSee('3-Phase Production Separator')
            ->assertSee('Dana Buyer');

        // The context panel carries the linked listing.
        $this->actingAs($broker)
            ->get("/broker/inbox/{$thread->id}")
            ->assertOk()
            ->assertSee('Is this still available in Casper?')
            ->assertSee('PH-9902');
    }

    public function test_buyer_inquiry_without_a_note_still_opens_a_thread(): void
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();

        $this->actingAs($buyer)->post("/equipment/{$listing->public_id}/inquiries", []);

        $this->assertDatabaseCount('threads', 1);
        $this->assertDatabaseCount('messages', 1);
    }

    public function test_guest_inquiry_does_not_open_a_thread(): void
    {
        $listing = $this->publishedListing();

        // A guest's shadow account cannot be logged into, so a thread on it would be
        // unreachable — and its notification would email a stranger.
        $this->post("/equipment/{$listing->public_id}/inquiries", [
            'name' => 'Guest Buyer',
            'email' => 'guest@example.com',
            'note' => 'Interested.',
        ])->assertSessionHasNoErrors();

        $this->assertDatabaseCount('equipment_requests', 1);
        $this->assertDatabaseCount('threads', 0);
    }

    // 2. Broker reply emails the buyer once; a second reply inside the window does not.

    public function test_broker_reply_emails_the_buyer_once_and_batches_the_next(): void
    {
        Mail::fake();

        $thread = $this->buyerThread();
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->post("/broker/inbox/{$thread->id}/messages", ['body' => 'Yes, still available.'])
            ->assertSessionHasNoErrors();

        // Scoped to the buyer's address: the buyer's own opening message already
        // queued a separate email to the broker, and counting both would hide a
        // regression in either direction.
        $this->assertSame(1, $this->queuedEmailsTo($thread->user->email));

        $this->actingAs($broker)
            ->post("/broker/inbox/{$thread->id}/messages", ['body' => 'Adding: it ships from Casper.']);

        // Two minutes later, inside the 10-minute window: still exactly one email.
        $this->assertSame(1, $this->queuedEmailsTo($thread->user->email));

        $this->assertDatabaseCount('messages', 3);
    }

    public function test_a_reply_after_the_batch_window_emails_again(): void
    {
        Mail::fake();

        $thread = $this->buyerThread();
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)->post("/broker/inbox/{$thread->id}/messages", ['body' => 'First.']);

        // Push the recorded notification time outside the window rather than
        // travelling in time, so the test does not depend on a clock helper.
        $thread->fresh()->forceFill(['user_notified_at' => now()->subMinutes(30)])->save();

        $this->actingAs($broker)->post("/broker/inbox/{$thread->id}/messages", ['body' => 'Second.']);

        $this->assertSame(2, $this->queuedEmailsTo($thread->user->email));
    }

    public function test_notification_emails_credit_petra_to_customers_and_a_first_name_to_brokers(): void
    {
        Mail::fake();

        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create(['name' => 'Jordan Callahan']);

        $this->actingAs($buyer)->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'Opening.']);

        // Brokers see the customer by first name only — never the full name.
        Mail::assertQueued(
            NewThreadMessageMail::class,
            fn (NewThreadMessageMail $mail): bool => $mail->hasTo(config('petra.broker_notification_email'))
                && $mail->senderName === 'Jordan',
        );

        $broker = User::factory()->broker()->create(['name' => 'Alex Broker']);
        $thread = Thread::firstOrFail();

        $this->actingAs($broker)->post("/broker/inbox/{$thread->id}/messages", ['body' => 'Replying.']);

        // Customers only ever see Petra, never the individual broker.
        Mail::assertQueued(
            NewThreadMessageMail::class,
            fn (NewThreadMessageMail $mail): bool => $mail->hasTo($buyer->email)
                && $mail->senderName === 'Petra',
        );
    }

    public function test_a_missing_broker_address_is_logged_rather_than_silently_dropped(): void
    {
        Mail::fake();
        Log::spy();

        // A support inbox that drops customer messages without a trace is worse than
        // one that errors, so the unconfigured case has to be noisy.
        config(['petra.broker_notification_email' => null]);

        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create();

        $this->actingAs($buyer)->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'Hello.']);

        Mail::assertNothingQueued();
        Log::shouldHaveReceived('warning')
            ->withArgs(fn (string $message): bool => str_contains($message, 'no recipient address'));

        // The message itself is still safely stored — the notification is what failed.
        $this->assertDatabaseCount('messages', 1);
    }

    public function test_buyer_can_read_both_broker_replies(): void
    {
        $thread = $this->buyerThread();
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)->post("/broker/inbox/{$thread->id}/messages", ['body' => 'Reply one.']);
        $this->actingAs($broker)->post("/broker/inbox/{$thread->id}/messages", ['body' => 'Reply two.']);

        $this->actingAs($thread->user)
            ->get("/buyer/messages/{$thread->id}")
            ->assertOk()
            ->assertSee('Reply one.')
            ->assertSee('Reply two.')
            // Brokers are never named to a customer.
            ->assertSee('Petra')
            ->assertDontSee($broker->name);
    }

    // 3. Seller ↔ broker thread on a submission.

    public function test_broker_can_open_a_thread_with_a_seller_on_their_submission(): void
    {
        Mail::fake();

        $listing = $this->underReviewListing();
        $seller = $listing->user;
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->post('/broker/inbox/threads', [
                'subject_type' => 'listing',
                'subject_id' => $listing->id,
                'body' => 'Could you send data-plate photos?',
            ])
            ->assertSessionHasNoErrors();

        $thread = Thread::firstOrFail();

        // The customer side is taken from the subject's owner, never from the request.
        $this->assertSame($seller->id, $thread->user_id);

        $this->actingAs($seller)
            ->get('/seller/messages')
            ->assertOk()
            ->assertSee('Portal\/Messages')
            ->assertSee('Unreviewed Compressor');

        $this->actingAs($seller)
            ->post("/seller/messages/{$thread->id}/messages", ['body' => 'Sending them today.'])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('messages', [
            'thread_id' => $thread->id,
            'sender_type' => ThreadSide::User->value,
            'body' => 'Sending them today.',
        ]);
    }

    // 4. Security.

    public function test_a_user_cannot_fetch_another_users_thread_by_id(): void
    {
        $thread = $this->buyerThread();
        $otherBuyer = User::factory()->buyer()->create();

        // Hitting the API directly, not through the UI.
        $this->actingAs($otherBuyer)->get("/buyer/messages/{$thread->id}")->assertNotFound();
        $this->actingAs($otherBuyer)
            ->post("/buyer/messages/{$thread->id}/messages", ['body' => 'Intruding.'])
            ->assertNotFound();
        $this->actingAs($otherBuyer)->post("/buyer/messages/{$thread->id}/read")->assertNotFound();

        $this->assertDatabaseMissing('messages', ['body' => 'Intruding.']);
    }

    public function test_a_seller_cannot_reach_a_buyers_thread(): void
    {
        $thread = $this->buyerThread();
        $seller = User::factory()->seller()->create();

        // Cross-role: the seller portal's own messaging route, another user's thread.
        $this->actingAs($seller)->get("/seller/messages/{$thread->id}")->assertNotFound();
    }

    public function test_a_customer_cannot_reach_the_broker_inbox(): void
    {
        $thread = $this->buyerThread();

        // user.type:broker redirects a customer to their own portal.
        $this->actingAs($thread->user)->get('/broker/inbox')->assertRedirect('/buyer/dashboard');
        $this->actingAs($thread->user)->patch("/broker/inbox/{$thread->id}/status", ['status' => 'closed'])
            ->assertRedirect('/buyer/dashboard');

        $this->assertSame('open', $thread->fresh()->status);
    }

    public function test_a_buyer_cannot_open_a_thread_on_an_under_review_listing(): void
    {
        $listing = $this->underReviewListing();
        $buyer = User::factory()->buyer()->create();

        // The listing is not publicly visible, so the detail route 404s before any
        // thread can be created — a buyer cannot reach it by guessing the id.
        $this->actingAs($buyer)
            ->post("/equipment/{$listing->id}/inquiries", ['note' => 'Sneaking in.'])
            ->assertNotFound();

        $this->assertDatabaseCount('threads', 0);
    }

    public function test_attachments_are_not_readable_by_another_user(): void
    {
        Storage::fake('local');

        $thread = $this->buyerThread();

        $this->actingAs($thread->user)->post("/buyer/messages/{$thread->id}/messages", [
            'body' => 'Photo attached.',
            'attachments' => [UploadedFile::fake()->image('plate.jpg')],
        ])->assertSessionHasNoErrors();

        $attachmentId = \App\Models\MessageAttachment::firstOrFail()->id;
        $url = "/messages/attachments/{$attachmentId}";

        $this->actingAs($thread->user)->get($url)->assertOk();

        $otherBuyer = User::factory()->buyer()->create();
        $this->actingAs($otherBuyer)->get($url)->assertNotFound();

        // Unlike listing photos, an attachment is never served without a session.
        auth()->logout();
        $this->get($url)->assertRedirect('/login');
    }

    // 5. Attachments.

    public function test_image_and_pdf_attachments_are_accepted_and_stored_privately(): void
    {
        Storage::fake('local');

        $thread = $this->buyerThread();

        $this->actingAs($thread->user)
            ->post("/buyer/messages/{$thread->id}/messages", [
                'body' => 'Plate and spec sheet.',
                'attachments' => [
                    UploadedFile::fake()->image('plate.jpg'),
                    UploadedFile::fake()->create('specs.pdf', 128, 'application/pdf'),
                ],
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseCount('message_attachments', 2);

        foreach (\App\Models\MessageAttachment::all() as $attachment) {
            Storage::disk('local')->assertExists($attachment->file_path);
            // Never the world-readable disk the listing pipeline uses.
            Storage::disk('public')->assertMissing($attachment->file_path);
        }
    }

    public function test_an_oversize_attachment_is_rejected_with_a_clear_error(): void
    {
        Storage::fake('local');

        $thread = $this->buyerThread();

        $this->actingAs($thread->user)
            ->post("/buyer/messages/{$thread->id}/messages", [
                'body' => 'Huge file.',
                // 15MB, over the 10MB cap.
                'attachments' => [UploadedFile::fake()->create('huge.pdf', 15 * 1024, 'application/pdf')],
            ])
            ->assertSessionHasErrors(['attachments.0' => 'Each attachment must be 10MB or smaller.']);

        $this->assertDatabaseCount('message_attachments', 0);
        $this->assertDatabaseCount('messages', 1);
    }

    public function test_a_disallowed_file_type_is_rejected_with_a_clear_error(): void
    {
        Storage::fake('local');

        $thread = $this->buyerThread();

        $this->actingAs($thread->user)
            ->post("/buyer/messages/{$thread->id}/messages", [
                'body' => 'Executable.',
                'attachments' => [UploadedFile::fake()->create('payload.exe', 16, 'application/x-msdownload')],
            ])
            ->assertSessionHasErrors(['attachments.0' => 'Attachments must be images (JPG, PNG, WEBP, HEIC) or PDFs.']);

        $this->assertDatabaseCount('message_attachments', 0);
    }

    public function test_a_message_needs_a_body_or_an_attachment(): void
    {
        $thread = $this->buyerThread();

        $this->actingAs($thread->user)
            ->post("/buyer/messages/{$thread->id}/messages", ['body' => '   '])
            ->assertSessionHasErrors(['body' => 'Write a message or attach a file.']);

        $this->assertDatabaseCount('messages', 1);
    }

    public function test_an_attachment_only_message_is_accepted(): void
    {
        Storage::fake('local');

        $thread = $this->buyerThread();

        $this->actingAs($thread->user)
            ->post("/buyer/messages/{$thread->id}/messages", [
                'attachments' => [UploadedFile::fake()->image('plate.jpg')],
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseCount('messages', 2);
    }

    // 6. Closed thread reopens on a new message and notifies the broker.

    public function test_a_closed_thread_reopens_and_notifies_the_broker_on_a_new_message(): void
    {
        Mail::fake();

        $thread = $this->buyerThread();
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->patch("/broker/inbox/{$thread->id}/status", ['status' => 'closed'])
            ->assertSessionHas('status', 'Thread closed.');

        $this->assertSame('closed', $thread->fresh()->status);

        $this->actingAs($thread->user)
            ->post("/buyer/messages/{$thread->id}/messages", ['body' => 'One more question.'])
            ->assertSessionHasNoErrors();

        $this->assertSame('open', $thread->fresh()->status);
        Mail::assertQueued(NewThreadMessageMail::class);
    }

    public function test_only_a_broker_can_close_a_thread(): void
    {
        $thread = $this->buyerThread();

        $this->actingAs($thread->user)
            ->patch("/broker/inbox/{$thread->id}/status", ['status' => 'closed'])
            ->assertRedirect('/buyer/dashboard');

        $this->assertSame('open', $thread->fresh()->status);
    }

    // 7. Unread counts.

    public function test_unread_counts_track_each_side_independently(): void
    {
        $thread = $this->buyerThread();
        $buyer = $thread->user;
        $broker = User::factory()->broker()->create();

        // The buyer's own opening message is unread for the broker, not for the buyer.
        $this->assertSame(1, Thread::unreadThreadCountFor($broker));
        $this->assertSame(0, Thread::unreadThreadCountFor($buyer));

        // Broker opens it: their side clears.
        $this->actingAs($broker)->get("/broker/inbox/{$thread->id}")->assertOk();
        $this->assertSame(0, Thread::unreadThreadCountFor($broker));

        // Broker replies: the buyer now has one unread, the broker still none.
        $this->actingAs($broker)->post("/broker/inbox/{$thread->id}/messages", ['body' => 'Answering.']);
        $this->assertSame(1, Thread::unreadThreadCountFor($buyer));
        $this->assertSame(0, Thread::unreadThreadCountFor($broker));

        // Buyer opens it: clears. This is the second-session case — the count is
        // derived from stored read markers, not per-session state, so any browser
        // the buyer signs into sees the same number.
        $this->actingAs($buyer)->get("/buyer/messages/{$thread->id}")->assertOk();
        $this->assertSame(0, Thread::unreadThreadCountFor($buyer));
    }

    public function test_the_unread_count_is_shared_with_every_portal_page(): void
    {
        $thread = $this->buyerThread();
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)->post("/broker/inbox/{$thread->id}/messages", ['body' => 'Reply.']);

        // The badge is a shared prop, so it rides along on an unrelated page.
        $this->actingAs($thread->user)
            ->get('/buyer/dashboard')
            ->assertOk()
            ->assertSee('unreadMessageThreads');

        $this->assertSame(1, Thread::unreadThreadCountFor($thread->user));
    }

    public function test_mark_read_endpoint_clears_the_badge(): void
    {
        $thread = $this->buyerThread();
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)->post("/broker/inbox/{$thread->id}/messages", ['body' => 'Reply.']);
        $this->assertSame(1, Thread::unreadThreadCountFor($thread->user));

        $this->actingAs($thread->user)->post("/buyer/messages/{$thread->id}/read");

        $this->assertSame(0, Thread::unreadThreadCountFor($thread->user));
    }

    // Thread identity.

    public function test_one_thread_per_user_per_subject(): void
    {
        $listing = $this->publishedListing();
        $first = User::factory()->buyer()->create();
        $second = User::factory()->buyer()->create();

        $this->actingAs($first)->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'A']);
        $this->actingAs($first)->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'A again']);
        $this->actingAs($second)->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'B']);

        // Two buyers, one listing: two threads, not three and not one.
        $this->assertDatabaseCount('threads', 2);
    }

    /**
     * How many new-message emails are queued for one address.
     *
     * The Mailable is ShouldQueue, so this counts the queued set — Mail::sent() is
     * always empty for it, which is why the repo's own rules mandate assertQueued.
     */
    private function queuedEmailsTo(string $email): int
    {
        return Mail::queued(NewThreadMessageMail::class, fn ($mail): bool => $mail->hasTo($email))->count();
    }

    /**
     * A buyer thread with its opening message, the state after a Request Details click.
     */
    private function buyerThread(): Thread
    {
        $listing = $this->publishedListing();
        $buyer = User::factory()->buyer()->create(['name' => 'Dana Buyer']);

        $this->actingAs($buyer)->post("/equipment/{$listing->public_id}/inquiries", ['note' => 'Opening question.']);

        // Re-resolve without the acting session so callers start from a clean auth state.
        auth()->logout();

        return Thread::with('user')->firstOrFail();
    }
}
