<?php

namespace Tests\Feature;

use App\Enums\DocumentVisibility;
use App\Enums\ListingStatus;
use App\Enums\ThreadSubjectType;
use App\Models\Document;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * The 2026_07_22 listing-document migration, run against real legacy data.
 *
 * Worth its own test because it is the only code in the change set that moves bytes.
 * The rest of the feature can be re-run; a migration that drops a file on the floor
 * cannot, and the JSON column it reads from is gone by the time anyone notices.
 *
 * The migrations have already run by the time a test boots, so this rolls the pair back
 * far enough to plant legacy rows and then rolls forward again — which also proves the
 * down() path works, since the rollback is what re-creates the column.
 */
class DocumentBackfillTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Both disks faked: the migration genuinely reads and writes files, and a test
        // that exercises that must not scatter them through storage/app.
        Storage::fake('local');
        Storage::fake('public');
    }

    public function test_it_moves_listing_documents_into_the_table_and_off_the_public_disk(): void
    {
        $seller = User::factory()->seller()->create();

        $listing = $seller->equipmentSubmissions()->create([
            'title' => 'Legacy Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'condition' => 'operating',
            'status' => ListingStatus::Published,
            'public_id' => 'PH-1234',
            'published_at' => now(),
        ]);

        // Back to before the documents column was dropped.
        Artisan::call('migrate:rollback', ['--step' => 2]);

        Storage::disk('public')->put('portal/equipment-submissions/documents/spec.pdf', 'spec bytes');
        Storage::disk('public')->put('portal/equipment-submissions/documents/invoice.pdf', 'invoice bytes');

        DB::table('equipment_submissions')->where('id', $listing->id)->update([
            'documents' => json_encode([
                [
                    'name' => 'spec-sheet.pdf',
                    'path' => 'portal/equipment-submissions/documents/spec.pdf',
                    'url' => '/storage/portal/equipment-submissions/documents/spec.pdf',
                    'size' => 10,
                    'public' => true,
                ],
                [
                    'name' => 'seller-invoice.pdf',
                    'path' => 'portal/equipment-submissions/documents/invoice.pdf',
                    'url' => '/storage/portal/equipment-submissions/documents/invoice.pdf',
                    'size' => 13,
                    'public' => false,
                ],
            ]),
        ]);

        Artisan::call('migrate');

        $documents = Document::query()
            ->forSubject(ThreadSubjectType::Listing->value, $listing->id)
            ->get()
            ->keyBy('original_name');

        $this->assertCount(2, $documents);

        $spec = $documents['spec-sheet.pdf'];
        $invoice = $documents['seller-invoice.pdf'];

        // The public flag becomes the visibility value; everything else becomes a
        // document shared back to the seller who uploaded it.
        $this->assertSame(DocumentVisibility::PublicListing->value, $spec->visibility);
        $this->assertNull($spec->shared_with_user_id);
        $this->assertSame(DocumentVisibility::SharedUser->value, $invoice->visibility);
        $this->assertSame($seller->id, $invoice->shared_with_user_id);

        // Both are credited to the seller, not to a broker.
        $this->assertSame(Document::UPLOADER_USER, $invoice->uploaded_by_type);
        $this->assertSame($seller->id, $invoice->uploaded_by_id);

        // The mime the JSON never recorded is read back off the file.
        $this->assertSame('application/pdf', $spec->mime);

        // And the bytes are off the world-readable disk — the whole point.
        foreach ([$spec, $invoice] as $document) {
            $this->assertSame('local', $document->disk);
            Storage::disk('local')->assertExists($document->file_path);
            Storage::disk('public')->assertMissing($document->file_path);
        }

        $this->assertSame('spec bytes', Storage::disk('local')->get($spec->file_path));

        // Backdated to the listing rather than stamped now(), so shipping this does not
        // light up the "new" badge on a customer's entire document history.
        $this->assertTrue($spec->created_at->equalTo($listing->created_at));
    }

    public function test_a_document_whose_file_is_already_gone_still_migrates(): void
    {
        $seller = User::factory()->seller()->create();

        $listing = $seller->equipmentSubmissions()->create([
            'title' => 'Legacy Separator',
            'category' => 'Separators',
            'region' => 'Wyoming',
            'condition' => 'operating',
            'status' => ListingStatus::UnderReview,
        ]);

        Artisan::call('migrate:rollback', ['--step' => 2]);

        // A row whose bytes were destroyed on a container rebuild before storage/app
        // was a persisted volume. The row still has to survive — dropping it would
        // erase the only evidence a document ever existed.
        DB::table('equipment_submissions')->where('id', $listing->id)->update([
            'documents' => json_encode([[
                'name' => 'lost.pdf',
                'path' => 'portal/equipment-submissions/documents/lost.pdf',
                'url' => '/storage/portal/equipment-submissions/documents/lost.pdf',
                'size' => 99,
            ]]),
        ]);

        Artisan::call('migrate');

        $document = Document::sole();

        $this->assertSame('lost.pdf', $document->original_name);
        // No bytes to move, so the row keeps pointing at where they used to be rather
        // than claiming a private-disk path that was never written.
        $this->assertSame('public', $document->disk);
        $this->assertFalse($document->fileExists());
        // The mime falls back to the extension guess.
        $this->assertSame('application/pdf', $document->mime);
    }
}
