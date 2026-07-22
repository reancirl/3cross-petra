<?php

namespace Tests\Feature;

use App\Enums\DocumentVisibility;
use App\Enums\ListingStatus;
use App\Enums\ThreadSide;
use App\Enums\ThreadSubjectType;
use App\Mail\DocumentSharedMail;
use App\Models\Document;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use App\Models\User;
use App\Support\MessageThreadService;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

/**
 * The Documents hub, exercised through the API rather than the screens.
 *
 * The interesting behaviour here is all authorization, and authorization is a property
 * of the endpoints — a component that never renders a document is not the same thing as
 * a server that never sends one. Every "cannot see" assertion below therefore goes
 * through a real request with a real second account.
 */
class DocumentsTest extends TestCase
{
    use LazilyRefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Documents are written to the private disk for real by the upload path, so
        // both disks are faked to keep test files out of storage/app. Faking 'public'
        // too is what lets the "not on the world-readable disk" assertions mean
        // something rather than passing because nothing ever wrote there.
        Storage::fake('local');
        Storage::fake('public');
    }

    private function listingFor(User $seller, array $overrides = []): EquipmentSubmission
    {
        return $seller->equipmentSubmissions()->create(array_merge([
            'title' => '3-Phase Production Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'city' => 'Casper',
            'condition' => 'operational_but_idle',
            'public_description' => 'Field-proven separator available for redeployment.',
            'photos' => [['name' => 'a.jpg', 'path' => 'p/a.jpg', 'url' => '/storage/p/a.jpg', 'size' => 1]],
            'status' => ListingStatus::Published,
            'public_id' => 'PH-9901',
            'published_at' => now(),
        ], $overrides));
    }

    /**
     * A document with real bytes behind it, so download assertions exercise the
     * streaming path rather than the "file is missing" 404.
     */
    private function documentOn(
        EquipmentSubmission|EquipmentRequest $subject,
        DocumentVisibility $visibility,
        array $overrides = [],
    ): Document {
        $path = 'portal/documents/'.uniqid().'.pdf';
        Storage::disk('local')->put($path, '%PDF-1.4 test');

        $subjectType = $subject instanceof EquipmentSubmission
            ? ThreadSubjectType::Listing
            : ThreadSubjectType::BuyerRequest;

        return Document::create(array_merge([
            'subject_type' => $subjectType->value,
            'subject_id' => $subject->id,
            'uploaded_by_type' => Document::UPLOADER_BROKER,
            'uploaded_by_id' => null,
            'shared_with_user_id' => null,
            'visibility' => $visibility->value,
            'disk' => 'local',
            'file_path' => $path,
            'original_name' => 'inspection-report.pdf',
            'mime' => 'application/pdf',
            'size' => 13,
        ], $overrides));
    }

    public function test_seller_sees_own_uploads_and_broker_shared_documents_but_not_private_ones(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        $ownUpload = $this->documentOn($listing, DocumentVisibility::SharedUser, [
            'uploaded_by_type' => Document::UPLOADER_USER,
            'uploaded_by_id' => $seller->id,
            'shared_with_user_id' => $seller->id,
            'original_name' => 'service-records.pdf',
        ]);

        $shared = $this->documentOn($listing, DocumentVisibility::SharedUser, [
            'shared_with_user_id' => $seller->id,
            'original_name' => 'valuation.pdf',
        ]);

        $brokerPrivate = $this->documentOn($listing, DocumentVisibility::PrivateBroker, [
            'original_name' => 'internal-margin-notes.pdf',
        ]);

        $names = $this->documentNamesOnHub($seller, '/seller/documents');

        $this->assertContains('service-records.pdf', $names);
        $this->assertContains('valuation.pdf', $names);
        $this->assertNotContains('internal-margin-notes.pdf', $names);

        // The page is one thing; the endpoint is the actual boundary.
        $this->actingAs($seller)->get("/documents/{$ownUpload->id}/download")->assertOk();
        $this->actingAs($seller)->get("/documents/{$shared->id}/download")->assertOk();
        $this->actingAs($seller)->get("/documents/{$brokerPrivate->id}/download")->assertNotFound();
    }

    public function test_a_seller_cannot_reach_another_sellers_documents(): void
    {
        $owner = User::factory()->seller()->create();
        $intruder = User::factory()->seller()->create();

        $listing = $this->listingFor($owner);
        $document = $this->documentOn($listing, DocumentVisibility::SharedUser, [
            'shared_with_user_id' => $owner->id,
        ]);

        // 404 rather than 403 on purpose: a 403 confirms the row exists, which is a
        // yes/no oracle for guessing ids.
        $this->actingAs($intruder)->get("/documents/{$document->id}/download")->assertNotFound();

        $this->assertNotContains(
            'inspection-report.pdf',
            $this->documentNamesOnHub($intruder, '/seller/documents'),
        );
    }

    public function test_buyer_with_an_inquiry_sees_public_listing_documents_and_a_stranger_does_not(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        $inquiring = User::factory()->buyer()->create();
        $stranger = User::factory()->buyer()->create();

        EquipmentRequest::create([
            'user_id' => $inquiring->id,
            'equipment_submission_id' => $listing->id,
            'equipment_type' => $listing->title,
            'budget_range' => 'Not specified',
            'location_preference' => 'Wyoming',
            'timeline' => 'Immediate',
        ]);

        $spec = $this->documentOn($listing, DocumentVisibility::PublicListing, [
            'original_name' => 'spec-sheet.pdf',
        ]);

        $this->assertContains('spec-sheet.pdf', $this->documentNamesOnHub($inquiring, '/buyer/documents'));
        $this->actingAs($inquiring)->get("/documents/{$spec->id}/download")->assertOk();

        // No inquiry, no thread, no ownership — nothing connects this buyer to the
        // listing, so the authenticated endpoint must refuse even though the document
        // is "public". Public means published with the listing, not readable by any
        // signed-in account.
        $this->assertNotContains('spec-sheet.pdf', $this->documentNamesOnHub($stranger, '/buyer/documents'));
        $this->actingAs($stranger)->get("/documents/{$spec->id}/download")->assertNotFound();
    }

    public function test_a_private_document_is_not_reachable_without_authorization(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $private = $this->documentOn($listing, DocumentVisibility::PrivateBroker);

        // Guest on the authenticated route.
        $this->get("/documents/{$private->id}/download")->assertRedirect('/login');

        // Guest on the public route: the document is not public, so it 404s rather
        // than falling through to the bytes.
        $this->get("/documents/{$private->id}/public")->assertNotFound();

        // And there is no static path to fall back on — the file is on the private
        // disk, which Nginx never serves.
        $this->assertSame('local', $private->disk);
        $this->assertTrue(Storage::disk('local')->exists($private->file_path));
        $this->assertFalse(Storage::disk('public')->exists($private->file_path));
    }

    public function test_a_public_document_stops_being_public_when_its_listing_is_unpublished(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $spec = $this->documentOn($listing, DocumentVisibility::PublicListing);

        $this->get("/documents/{$spec->id}/public")->assertOk();

        $listing->update(['status' => ListingStatus::UnderReview]);

        $this->get("/documents/{$spec->id}/public")->assertNotFound();
    }

    public function test_every_download_is_logged_with_the_user_and_a_timestamp(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $document = $this->documentOn($listing, DocumentVisibility::SharedUser, [
            'shared_with_user_id' => $seller->id,
        ]);

        $this->actingAs($seller)->get("/documents/{$document->id}/download")->assertOk();

        $this->assertDatabaseCount('download_logs', 1);

        $log = $document->downloadLogs()->sole();

        $this->assertSame($seller->id, $log->user_id);
        $this->assertNotNull($log->downloaded_at);

        // A refused request must not leave a row — the table is an audit trail of bytes
        // served, not of attempts.
        $intruder = User::factory()->seller()->create();
        $this->actingAs($intruder)->get("/documents/{$document->id}/download")->assertNotFound();
        $this->assertDatabaseCount('download_logs', 1);
    }

    public function test_a_guest_download_of_a_public_document_is_logged_without_a_user(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);
        $spec = $this->documentOn($listing, DocumentVisibility::PublicListing);

        $this->get("/documents/{$spec->id}/public")->assertOk();

        $this->assertDatabaseHas('download_logs', [
            'document_id' => $spec->id,
            'user_id' => null,
        ]);
    }

    public function test_broker_sharing_a_document_emails_the_user_once_and_marks_it_new(): void
    {
        Mail::fake();

        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        // Nothing seen yet, but nothing to see either.
        $this->actingAs($seller)->get('/seller/documents')->assertOk();
        $seller->refresh();
        $this->assertNotNull($seller->documents_last_viewed_at);

        $this->travel(1)->minutes();

        $this->actingAs($broker)
            ->post("/broker/documents/listing/{$listing->id}", [
                'visibility' => DocumentVisibility::SharedUser->value,
                'documents' => [UploadedFile::fake()->create('valuation.pdf', 20, 'application/pdf')],
            ])
            ->assertRedirect();

        // assertQueued, not assertSent: the Mailable is ShouldQueue, so Mail::sent()
        // is always empty for it. Same convention as MessagingTest.
        Mail::assertQueued(DocumentSharedMail::class, 1);
        Mail::assertQueued(
            DocumentSharedMail::class,
            fn (DocumentSharedMail $mail): bool => $mail->hasTo($seller->email)
                && $mail->subjectTitle === $listing->title,
        );

        // A second share inside the batching window costs no further email.
        $this->actingAs($broker)
            ->post("/broker/documents/listing/{$listing->id}", [
                'visibility' => DocumentVisibility::SharedUser->value,
                'documents' => [UploadedFile::fake()->create('title.pdf', 20, 'application/pdf')],
            ])
            ->assertRedirect();

        Mail::assertQueued(DocumentSharedMail::class, 1);

        // Both documents are new to the seller, and stay new until they look.
        $this->assertSame(2, User::unseenDocumentCountFor($seller->fresh()));

        $names = $this->documentNamesOnHub($seller, '/seller/documents');
        $this->assertContains('valuation.pdf', $names);
        $this->assertContains('title.pdf', $names);

        // Visiting cleared the marker, so the badge drops to zero.
        $this->assertSame(0, User::unseenDocumentCountFor($seller->fresh()));
    }

    public function test_a_shared_document_is_flagged_new_on_the_visit_that_clears_the_marker(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        $this->actingAs($seller)->get('/seller/documents')->assertOk();

        // The marker is a strict > comparison, so a document created in the same
        // second as the visit that cleared it is genuinely not new. Step the clock
        // rather than letting the assertion depend on where the second boundary fell.
        $this->travel(1)->minutes();

        $this->documentOn($listing, DocumentVisibility::SharedUser, [
            'shared_with_user_id' => $seller->id,
            'uploaded_by_id' => $broker->id,
        ]);

        // The badge must survive the request that renders the page — marking first
        // would tell the seller there is something new and then show them nothing lit.
        $response = $this->actingAs($seller)->get('/seller/documents');
        $document = $response->viewData('page')['props']['groups'][0]['documents'][0];

        $this->assertTrue($document['isNew']);
        $this->assertSame('Added by Petra', $document['addedByLabel']);

        $second = $this->actingAs($seller)->get('/seller/documents');
        $this->assertFalse($second->viewData('page')['props']['groups'][0]['documents'][0]['isNew']);
    }

    public function test_archiving_hides_a_document_from_the_user_but_not_from_the_broker(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        $document = $this->documentOn($listing, DocumentVisibility::SharedUser, [
            'shared_with_user_id' => $seller->id,
        ]);

        $this->actingAs($broker)
            ->patch("/broker/documents/{$document->id}/archive")
            ->assertRedirect();

        $this->assertNotNull($document->fresh()->archived_at);

        $this->assertNotContains(
            'inspection-report.pdf',
            $this->documentNamesOnHub($seller, '/seller/documents'),
        );
        $this->actingAs($seller)->get("/documents/{$document->id}/download")->assertNotFound();

        $brokerView = $this->actingAs($broker)->get('/broker/submissions');
        $row = collect($brokerView->viewData('page')['props']['sellerSubmissions'])->firstWhere('id', $listing->id);
        $archived = collect($row['documents'])->firstWhere('name', 'inspection-report.pdf');

        $this->assertNotNull($archived, 'The broker keeps seeing archived documents.');
        $this->assertTrue($archived['archived']);
    }

    public function test_broker_unified_view_labels_every_source(): void
    {
        $broker = User::factory()->broker()->create();
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        // Source 1: a submission upload from the seller.
        $this->documentOn($listing, DocumentVisibility::SharedUser, [
            'uploaded_by_type' => Document::UPLOADER_USER,
            'uploaded_by_id' => $seller->id,
            'shared_with_user_id' => $seller->id,
            'original_name' => 'seller-service-records.pdf',
        ]);

        // Source 2: a broker upload.
        $this->documentOn($listing, DocumentVisibility::PrivateBroker, [
            'uploaded_by_id' => $broker->id,
            'original_name' => 'broker-notes.pdf',
        ]);

        // Source 3: a message attachment, created through the real messaging path so
        // the thread wiring is exercised rather than faked.
        $thread = app(MessageThreadService::class)->findOrCreateThread($seller, $listing);
        app(MessageThreadService::class)->postMessage(
            $thread,
            $seller,
            ThreadSide::User,
            'Here is the data plate.',
            [UploadedFile::fake()->image('data-plate.jpg')],
        );

        $response = $this->actingAs($broker)->get('/broker/submissions');
        $row = collect($response->viewData('page')['props']['sellerSubmissions'])->firstWhere('id', $listing->id);
        $bySource = collect($row['documents'])->keyBy('name');

        $this->assertSame('Submission upload', $bySource['seller-service-records.pdf']['sourceLabel']);
        $this->assertSame('Broker upload', $bySource['broker-notes.pdf']['sourceLabel']);
        $this->assertSame('Message attachment', $bySource['data-plate.jpg']['sourceLabel']);
    }

    public function test_public_visibility_is_rejected_on_a_buyer_request(): void
    {
        $broker = User::factory()->broker()->create();
        $buyer = User::factory()->buyer()->create();

        $buyerRequest = EquipmentRequest::create([
            'user_id' => $buyer->id,
            'equipment_type' => '400 HP Compressor',
            'budget_range' => '$100k-$250k',
            'location_preference' => 'Wyoming',
            'timeline' => 'Q3',
        ]);

        $this->actingAs($broker)
            ->post("/broker/documents/buyer_request/{$buyerRequest->id}", [
                'visibility' => DocumentVisibility::PublicListing->value,
                'documents' => [UploadedFile::fake()->create('sourcing-list.pdf', 20, 'application/pdf')],
            ])
            ->assertRedirect();

        $this->assertDatabaseCount('documents', 0);
    }

    public function test_sharing_is_refused_when_the_submission_has_no_account_behind_it(): void
    {
        $broker = User::factory()->broker()->create();

        $unclaimed = EquipmentSubmission::create([
            'user_id' => null,
            'title' => 'Surplus Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'condition' => 'unknown',
            'contact_email' => 'lead@example.com',
            'source' => EquipmentSubmission::SOURCE_PUBLIC,
            'status' => ListingStatus::UnderReview,
        ]);

        $this->actingAs($broker)
            ->post("/broker/documents/listing/{$unclaimed->id}", [
                'visibility' => DocumentVisibility::SharedUser->value,
                'documents' => [UploadedFile::fake()->create('valuation.pdf', 20, 'application/pdf')],
            ])
            ->assertRedirect();

        $this->assertDatabaseCount('documents', 0);
    }

    public function test_customers_cannot_upload_documents(): void
    {
        $seller = User::factory()->seller()->create();
        $listing = $this->listingFor($seller);

        // The broker routes are the only write path, and they are broker-only: a
        // customer hitting one is bounced to their own portal.
        $this->actingAs($seller)
            ->post("/broker/documents/listing/{$listing->id}", [
                'visibility' => DocumentVisibility::PublicListing->value,
                'documents' => [UploadedFile::fake()->create('anything.pdf', 20, 'application/pdf')],
            ])
            ->assertRedirect(route('portal.seller.dashboard'));

        $this->assertDatabaseCount('documents', 0);
    }

    public function test_a_seller_submission_files_its_documents_privately(): void
    {
        $seller = User::factory()->seller()->create();

        $this->actingAs($seller)
            ->post('/seller/listings', [
                'title' => 'Vertical Separator',
                'category' => 'Separators',
                'region' => 'Wyoming',
                'condition' => 'operating',
                'needs_valuation' => true,
                'documents' => [UploadedFile::fake()->create('service-records.pdf', 20, 'application/pdf')],
            ])
            ->assertRedirect();

        $document = Document::sole();

        $this->assertSame(Document::UPLOADER_USER, $document->uploaded_by_type);
        $this->assertSame($seller->id, $document->uploaded_by_id);
        $this->assertSame(DocumentVisibility::SharedUser->value, $document->visibility);
        // The whole point of the move: a seller's paperwork is not on the world-
        // readable disk any more.
        $this->assertSame('local', $document->disk);
        Storage::disk('local')->assertExists($document->file_path);
        Storage::disk('public')->assertMissing($document->file_path);
    }

    public function test_the_hub_renders_a_component_that_exists(): void
    {
        // Inertia::render takes a string and never checks it, so a typo'd component
        // name ships an empty page while every props assertion still passes. Asserted
        // by hand because the package's own check cannot find this repo's Pages
        // directory — see the note in documentNamesOnHub.
        $this->assertFileExists(resource_path('js/Pages/Portal/Documents.tsx'));
    }

    /**
     * @return array<int, string>
     */
    private function documentNamesOnHub(User $user, string $url): array
    {
        $response = $this->actingAs($user)->get($url);

        $response->assertOk();
        // `false` disables Inertia's own page-file lookup, matching the rest of the
        // suite: its default search path is resource_path('js/pages') and this repo
        // capitalises Pages, so the lookup never resolves on a case-sensitive disk.
        // The component file is checked directly in the test below instead.
        $response->assertInertia(fn (AssertableInertia $page) => $page->component('Portal/Documents', false));

        return collect($response->viewData('page')['props']['groups'])
            ->flatMap(fn (array $group): array => array_column($group['documents'], 'name'))
            ->all();
    }
}
