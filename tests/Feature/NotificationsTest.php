<?php

namespace Tests\Feature;

use App\Enums\DocumentVisibility;
use App\Enums\ListingStatus;
use App\Enums\NotificationRecipientType;
use App\Enums\NotificationType;
use App\Enums\ThreadSide;
use App\Mail\DocumentSharedMail;
use App\Mail\NewThreadMessageMail;
use App\Models\BrokerInquiry;
use App\Models\EquipmentSubmission;
use App\Models\Notification;
use App\Models\Thread;
use App\Models\User;
use App\Support\MessageThreadService;
use App\Support\Notifier;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

/**
 * The in-app notification feed, exercised through the endpoints that create and read it.
 *
 * The load-bearing properties here are "one event, one email, one notification" (the
 * dispatcher must not double-send), the message collapse rule, and the isolation of one
 * feed from another — all of which are properties of the server, so every assertion goes
 * through a real request or the real dispatcher rather than a component.
 */
class NotificationsTest extends TestCase
{
    use LazilyRefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
        Storage::fake('public');
    }

    private function listingFor(User $seller, array $overrides = []): EquipmentSubmission
    {
        return $seller->equipmentSubmissions()->create(array_merge([
            'title' => 'Ariel JGK/4 Compressor',
            'category' => 'Compressors',
            'region' => 'Wyoming',
            'city' => 'Casper',
            'condition' => 'operational_but_idle',
            'public_description' => 'Field-ready gas compressor.',
            'photos' => [['name' => 'a.jpg', 'path' => 'p/a.jpg', 'url' => '/storage/p/a.jpg', 'size' => 1]],
            'status' => ListingStatus::UnderReview,
        ], $overrides));
    }

    // 1. Broker publishes a listing → the seller gets exactly ONE email... except no
    // email exists for a status change in this app, so the assertion is exactly ONE
    // in-app notification, no email, and the deep link opens the listing + clears the dot.

    public function test_publishing_a_listing_creates_one_seller_notification_and_no_email(): void
    {
        Mail::fake();

        $seller = User::factory()->seller()->create();
        $broker = User::factory()->broker()->create();
        $listing = $this->listingFor($seller);

        $this->actingAs($broker)
            ->patch("/broker/seller-submissions/{$listing->id}", [
                'status' => ListingStatus::Published->value,
            ])
            ->assertSessionHasNoErrors();

        // A status change sends no email in this app — the in-app row is the only output.
        Mail::assertNothingQueued();

        $notifications = Notification::query()
            ->where('recipient_type', NotificationRecipientType::User->value)
            ->where('recipient_id', $seller->id)
            ->where('type', NotificationType::ListingStatus->value)
            ->get();

        $this->assertCount(1, $notifications);
        $this->assertSame('Your Ariel JGK/4 Compressor is now Published', $notifications->first()->title);

        // The deep link resolves to the seller's own listing view, and clicking clears it.
        $this->assertSame("/seller/listings/{$listing->id}", $notifications->first()->deepLinkFor($seller));

        $this->actingAs($seller)
            ->post("/seller/notifications/{$notifications->first()->id}/read")
            ->assertSessionHasNoErrors();

        $this->assertNotNull($notifications->first()->fresh()->read_at);
    }

    public function test_editing_a_listing_without_changing_status_does_not_notify(): void
    {
        $seller = User::factory()->seller()->create();
        $broker = User::factory()->broker()->create();
        $listing = $this->listingFor($seller, ['status' => ListingStatus::Published, 'public_id' => 'PH-1', 'published_at' => now()]);

        $this->actingAs($broker)
            ->patch("/broker/seller-submissions/{$listing->id}", [
                'status' => ListingStatus::Published->value,
                'public_description' => 'Reworded copy, same status.',
            ])
            ->assertSessionHasNoErrors();

        $this->assertSame(0, Notification::query()->where('type', NotificationType::ListingStatus->value)->count());
    }

    public function test_publishing_an_unclaimed_lead_notifies_nobody(): void
    {
        $broker = User::factory()->broker()->create();
        // A public-form submission with no seller account behind it.
        $listing = EquipmentSubmission::create([
            'user_id' => null,
            'title' => 'Orphan Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'condition' => 'unknown',
            'status' => ListingStatus::UnderReview,
        ]);

        $this->actingAs($broker)
            ->patch("/broker/seller-submissions/{$listing->id}", [
                'status' => ListingStatus::NotAccepted->value,
            ])
            ->assertSessionHasNoErrors();

        $this->assertSame(0, Notification::query()->where('type', NotificationType::ListingStatus->value)->count());
    }

    // 2. Three broker messages in one thread within 10 min → one email (existing
    // batching) and ONE collapsed in-app notification for the customer.

    public function test_a_burst_of_broker_messages_collapses_to_one_notification_and_one_email(): void
    {
        Mail::fake();

        $seller = User::factory()->seller()->create();
        $broker = User::factory()->broker()->create();
        $listing = $this->listingFor($seller);

        $service = app(MessageThreadService::class);
        $thread = $service->findOrCreateThread($seller, $listing);
        $service->postMessage($thread, $broker, ThreadSide::Broker, 'First.');
        $service->postMessage($thread, $broker, ThreadSide::Broker, 'Second.');
        $service->postMessage($thread, $broker, ThreadSide::Broker, 'Third.');

        // One email to the seller — the batching window suppressed the other two.
        Mail::assertQueuedCount(1);
        Mail::assertQueued(NewThreadMessageMail::class);

        // One collapsed in-app notification, floated to the top with the latest title.
        $notifications = Notification::query()
            ->where('recipient_type', NotificationRecipientType::User->value)
            ->where('recipient_id', $seller->id)
            ->where('type', NotificationType::NewMessage->value)
            ->get();

        $this->assertCount(1, $notifications);
        $this->assertSame('thread', $notifications->first()->subject_type);
        $this->assertSame($thread->id, (int) $notifications->first()->subject_id);
        $this->assertSame("/seller/messages/{$thread->id}", $notifications->first()->deepLinkFor($seller));
    }

    public function test_a_new_message_after_the_first_is_read_starts_a_fresh_notification(): void
    {
        $seller = User::factory()->seller()->create();
        $broker = User::factory()->broker()->create();
        $listing = $this->listingFor($seller);

        $service = app(MessageThreadService::class);
        $thread = $service->findOrCreateThread($seller, $listing);
        $service->postMessage($thread, $broker, ThreadSide::Broker, 'First.');

        // Seller reads it (marks the one notification read).
        Notification::query()->update(['read_at' => now()]);

        $service->postMessage($thread, $broker, ThreadSide::Broker, 'A later, separate ping.');

        // The collapse only folds into an UNREAD row, so a read one does not resurrect —
        // there are now two rows, one read, one fresh.
        $this->assertSame(2, Notification::query()
            ->where('recipient_id', $seller->id)
            ->where('type', NotificationType::NewMessage->value)
            ->count());
    }

    // 3. User A never sees user B's notifications (direct API test).

    public function test_a_user_cannot_see_or_clear_another_users_notifications(): void
    {
        $sellerA = User::factory()->seller()->create();
        $sellerB = User::factory()->seller()->create();

        $listingA = $this->listingFor($sellerA);
        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)->patch("/broker/seller-submissions/{$listingA->id}", [
            'status' => ListingStatus::Published->value,
        ]);

        $notificationA = Notification::query()->where('recipient_id', $sellerA->id)->firstOrFail();

        // B's feed is empty and does not contain A's row.
        $this->actingAs($sellerB)
            ->get('/seller/notifications')
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Portal/Notifications', false)
                ->where('notifications.total', 0));

        // B cannot mark A's notification read — the scope makes it a 404, and A's row
        // stays unread.
        $this->actingAs($sellerB)
            ->post("/seller/notifications/{$notificationA->id}/read")
            ->assertNotFound();

        $this->assertNull($notificationA->fresh()->read_at);
    }

    // 4. Broker feed shows new submission / request / inquiry events; read state does not
    // leak between brokers (it is shared, by design — asserted explicitly).

    public function test_broker_feed_collects_submission_request_and_inquiry_events(): void
    {
        $buyer = User::factory()->buyer()->create();

        // A public submission.
        $this->post('/sell-equipment/equipment-submission', $this->submissionPayload())
            ->assertRedirect();

        // A free-form buyer request.
        $this->actingAs($buyer)->post('/buyer/requests', [
            'equipment_type' => 'Triplex pump',
            'specifications' => '3in plunger',
            'budget_range' => '15,000',
            'location_preference' => 'Wyoming',
            'timeline' => 'ASAP',
        ])->assertSessionHasNoErrors();

        // A Talk to a Broker inquiry.
        $this->post('/sell-equipment/contact-broker', $this->brokerInquiryPayload())
            ->assertSessionHasNoErrors();

        $broker = User::factory()->broker()->create();

        $this->actingAs($broker)
            ->get('/broker/notifications')
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Portal/Notifications', false)
                ->where('notifications.total', 3));

        // Every broker row is shared (recipient_id null) and broker-facing.
        $brokerRows = Notification::query()
            ->where('recipient_type', NotificationRecipientType::Broker->value)
            ->get();

        $this->assertCount(3, $brokerRows);
        $this->assertTrue($brokerRows->every(fn (Notification $n): bool => $n->recipient_id === null));
        $this->assertEqualsCanonicalizing(
            [
                NotificationType::NewSubmission->value,
                NotificationType::NewRequest->value,
                NotificationType::NewInquiry->value,
            ],
            $brokerRows->pluck('type')->all(),
        );
    }

    public function test_signed_in_buyer_quote_inquiry_makes_one_broker_notification_not_two(): void
    {
        Mail::fake();

        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller, [
            'status' => ListingStatus::Published,
            'public_id' => 'PH-QT',
            'published_at' => now(),
        ]);
        $buyer = User::factory()->buyer()->create();

        // A fresh quote inquiry: creates the request row AND opens a thread with the note.
        $this->actingAs($buyer)
            ->post('/equipment/PH-QT/inquiries', ['note' => 'Still available?'])
            ->assertSessionHasNoErrors();

        // Exactly one broker feed row — the actionable queue item — not a second for the
        // opening message.
        $brokerRows = Notification::query()
            ->where('recipient_type', NotificationRecipientType::Broker->value)
            ->get();
        $this->assertCount(1, $brokerRows);
        $this->assertSame(NotificationType::NewRequest->value, $brokerRows->first()->type);

        // The email and the thread's own unread badge still fire, so the broker is not blind.
        Mail::assertQueued(NewThreadMessageMail::class);
        $this->assertSame(1, Thread::query()->count());

        // A follow-up message on the existing thread (the duplicate-guard path) DOES
        // notify — there is no new request there, so the message is the only signal.
        $this->actingAs($buyer)
            ->post('/equipment/PH-QT/inquiries', ['note' => 'Any update?'])
            ->assertSessionHasNoErrors();

        $this->assertSame(1, Notification::query()
            ->where('recipient_type', NotificationRecipientType::Broker->value)
            ->where('type', NotificationType::NewMessage->value)
            ->count());
    }

    public function test_broker_read_state_is_shared_between_brokers(): void
    {
        // The shared-inbox model: one feed, shared read state. Two broker accounts see
        // the same read/unread as each other — the decision recorded in the migration.
        $brokerOne = User::factory()->broker()->create();
        $brokerTwo = User::factory()->broker()->create();

        app(Notifier::class)->newInquiry(BrokerInquiry::create([
            'type' => BrokerInquiry::TYPE_BROKER_INQUIRY,
            'full_name' => 'Pat Lead',
            'email' => 'pat@example.com',
            'phone' => '307-555-0000',
            'topic' => 'sell_equipment',
            'message' => 'Interested in selling.',
            'preferred_contact' => 'email',
            'status' => BrokerInquiry::STATUS_NEW,
            'consented_at' => now(),
        ]));

        $this->assertSame(1, Notification::unreadCountFor($brokerOne));

        // Broker one clears all.
        $this->actingAs($brokerOne)->post('/broker/notifications/read-all')->assertSessionHasNoErrors();

        // Broker two sees zero unread too — read state is the row's own, shared.
        $this->assertSame(0, Notification::unreadCountFor($brokerTwo));
    }

    // 5. Unread badge (shared prop) updates within one poll cycle; mark-all-read works.

    public function test_unread_count_is_shared_as_a_prop_and_mark_all_read_clears_it(): void
    {
        $seller = User::factory()->seller()->create();
        $broker = User::factory()->broker()->create();
        $listing = $this->listingFor($seller);

        $this->actingAs($broker)->patch("/broker/seller-submissions/{$listing->id}", [
            'status' => ListingStatus::Published->value,
        ]);

        // The badge count rides the same shared prop the 45s poll refreshes.
        $this->actingAs($seller)
            ->get('/seller/dashboard')
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page->where('unseenNotifications', 1));

        $this->actingAs($seller)->post('/seller/notifications/read-all')->assertSessionHasNoErrors();

        $this->actingAs($seller)
            ->get('/seller/dashboard')
            ->assertInertia(fn (AssertableInertia $page) => $page->where('unseenNotifications', 0));
    }

    // 6. Deep links resolve correctly for every notification type.

    public function test_deep_links_resolve_for_every_type(): void
    {
        $seller = User::factory()->seller()->create();
        $buyer = User::factory()->buyer()->create();
        $broker = User::factory()->broker()->create();

        $map = [
            [NotificationType::ListingStatus, 'listing', 42, $seller, '/seller/listings/42'],
            [NotificationType::RequestStatus, 'buyer_request', 7, $buyer, '/buyer/requests'],
            [NotificationType::NewMessage, 'thread', 5, $buyer, '/buyer/messages/5'],
            [NotificationType::NewMessage, 'thread', 5, $broker, '/broker/inbox/5'],
            [NotificationType::DocumentShared, 'listing', 9, $seller, '/seller/documents#doc-listing-9'],
            [NotificationType::NewSubmission, 'listing', 1, $broker, '/broker/submissions'],
            [NotificationType::NewRequest, 'buyer_request', 1, $broker, '/broker/requests'],
            [NotificationType::NewInquiry, 'broker_inquiry', 1, $broker, '/broker/leads'],
        ];

        foreach ($map as [$type, $subjectType, $subjectId, $user, $expected]) {
            $notification = new Notification([
                'type' => $type->value,
                'subject_type' => $subjectType,
                'subject_id' => $subjectId,
            ]);

            $this->assertSame($expected, $notification->deepLinkFor($user), "deep link for {$type->value}");
        }
    }

    public function test_sharing_a_document_creates_one_notification_and_sends_the_email(): void
    {
        Mail::fake();

        $seller = User::factory()->seller()->create();
        $broker = User::factory()->broker()->create();
        $listing = $this->listingFor($seller);

        $this->actingAs($broker)
            ->post("/broker/documents/listing/{$listing->id}", [
                'visibility' => DocumentVisibility::SharedUser->value,
                'documents' => [UploadedFile::fake()->create('valuation.pdf', 40, 'application/pdf')],
            ])
            ->assertSessionHasNoErrors();

        // The email still goes (DocumentNotifier, reused), and there is exactly one.
        Mail::assertQueued(DocumentSharedMail::class);

        $notification = Notification::query()
            ->where('recipient_id', $seller->id)
            ->where('type', NotificationType::DocumentShared->value)
            ->firstOrFail();

        // The subject is the listing, not the document, so the deep link lands on the group.
        $this->assertSame('listing', $notification->subject_type);
        $this->assertSame($listing->id, (int) $notification->subject_id);
        $this->assertSame("/seller/documents#doc-listing-{$listing->id}", $notification->deepLinkFor($seller));
    }

    public function test_pruning_deletes_notifications_older_than_the_retention_window(): void
    {
        $seller = User::factory()->seller()->create();

        $old = Notification::create([
            'recipient_type' => NotificationRecipientType::User->value,
            'recipient_id' => $seller->id,
            'type' => NotificationType::ListingStatus->value,
            'title' => 'Old news',
        ]);
        $old->forceFill(['created_at' => now()->subDays(Notification::RETENTION_DAYS + 1)])->save();

        $fresh = Notification::create([
            'recipient_type' => NotificationRecipientType::User->value,
            'recipient_id' => $seller->id,
            'type' => NotificationType::ListingStatus->value,
            'title' => 'Recent',
        ]);

        $this->artisan('model:prune', ['--model' => [Notification::class]])->assertOk();

        $this->assertNull($old->fresh());
        $this->assertNotNull($fresh->fresh());
    }

    /**
     * @return array<string, mixed>
     */
    private function submissionPayload(): array
    {
        return [
            'full_name' => 'Sam Seller',
            'company' => 'Sam LLC',
            'email' => 'sam@example.com',
            'phone' => '307-555-0142',
            'category' => 'Compressors',
            'description' => 'Ariel JGK/4 Compressor Package',
            'quantity' => 2,
            'location' => 'wyoming_powder_river',
            'condition' => EquipmentSubmission::CONDITION_OPERATIONAL_BUT_IDLE,
            'is_owner' => 'owner',
            'intent' => ['sell_one'],
            'availability' => 'available_now',
            'estimated_value_range' => '100k_500k',
            'consent_accuracy' => true,
            'consent_contact' => true,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function brokerInquiryPayload(): array
    {
        return [
            'full_name' => 'Casey Contact',
            'company' => 'Casey Co',
            'email' => 'casey@example.com',
            'phone' => '555-2000',
            'topic' => 'sell_equipment',
            'message' => 'Please call me about selling a rig.',
            'preferred_contact' => 'email',
            'consent' => true,
        ];
    }
}
