<?php

namespace App\Http\Controllers\Portal;

use App\Enums\ListingStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Portal\StoreEquipmentSubmissionRequest;
use App\Models\EquipmentSubmission;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EquipmentSubmissionController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Portal/SellerListings', [
            'portal' => [
                'userType' => User::TYPE_SELLER,
                'roleLabel' => 'Seller',
                'dashboardUrl' => route('portal.seller.dashboard'),
                'profileName' => $request->user()->name,
            ],
            'submissions' => $request->user()
                ->equipmentSubmissions()
                ->latest()
                ->get()
                ->map(fn (EquipmentSubmission $submission): array => $this->serializeSubmission($submission))
                ->values(),
            'categoryOptions' => EquipmentSubmission::CATEGORIES,
            'regionOptions' => EquipmentSubmission::REGIONS,
            'conditionOptions' => EquipmentSubmission::CONDITIONS,
        ]);
    }

    /**
     * A seller's own view of one listing: everything they submitted, plus what the
     * broker has since enriched and published. The list page carries only a summary,
     * so this is the one place a seller can see the buyer-facing copy written for
     * their unit, the full photo set, and every document with its visibility.
     */
    public function show(Request $request, EquipmentSubmission $equipmentSubmission): Response
    {
        // Route model binding resolves by id alone, so ownership must be checked
        // explicitly or any seller could read another seller's listing by guessing ids.
        if ($equipmentSubmission->user_id !== $request->user()->id) {
            abort(403);
        }

        $equipmentSubmission->load(['offers' => fn ($query) => $query->latest()]);

        return Inertia::render('Portal/SellerListingDetail', [
            'portal' => [
                'userType' => User::TYPE_SELLER,
                'roleLabel' => 'Seller',
                'dashboardUrl' => route('portal.seller.dashboard'),
                'profileName' => $request->user()->name,
            ],
            'listing' => $this->serializeDetail($equipmentSubmission),
        ]);
    }

    public function store(StoreEquipmentSubmissionRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $needsValuation = (bool) ($validated['needs_valuation'] ?? false);

        $request->user()->equipmentSubmissions()->create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'region' => $validated['region'],
            'city' => $validated['city'] ?? null,
            'condition' => $validated['condition'],
            'condition_notes' => $validated['condition_notes'] ?? null,
            'asking_price' => $needsValuation ? null : ($validated['asking_price'] ?? null),
            'needs_valuation' => $needsValuation,
            'photos' => $this->storeUploads($request->file('photos', []), 'photos'),
            'documents' => $this->storeUploads($request->file('documents', []), 'documents'),
            'status' => ListingStatus::UnderReview,
        ]);

        return back()->with('status', 'Equipment submitted.');
    }

    /**
     * @param  array<int, UploadedFile>  $files
     * @return array<int, array<string, mixed>>
     */
    private function storeUploads(array $files, string $folder): array
    {
        return collect($files)->map(function (UploadedFile $file) use ($folder): array {
            $path = $file->store("portal/equipment-submissions/{$folder}", 'public');

            return [
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'url' => Storage::disk('public')->url($path),
                'size' => $file->getSize(),
            ];
        })->values()->all();
    }

    /**
     * @return array<string, mixed>
     */
    /**
     * The list summary plus everything only the detail page shows.
     *
     * The extra fields are the broker's work on the listing — the buyer-facing
     * description, the spec fields, and whether it is live on the marketplace. A seller
     * has no other way to see what was published on their behalf.
     *
     * @return array<string, mixed>
     */
    private function serializeDetail(EquipmentSubmission $submission): array
    {
        // Only a published listing is reachable publicly: scopePubliclyVisible requires
        // a public id and a publish time, both of which publishing stamps together.
        $isPublic = $submission->public_id
            && $submission->published_at
            && in_array($submission->listingStatus(), ListingStatus::publiclyVisible(), true);

        return array_merge($this->serializeSubmission($submission), [
            'public_id' => $submission->public_id,
            'public_href' => $isPublic ? "/equipment/{$submission->public_id}" : null,
            'public_description' => $submission->public_description,
            'manufacturer' => $submission->manufacturer,
            'model' => $submission->model,
            'year' => $submission->year,
            'capacity' => $submission->capacity,
            'featured' => (bool) $submission->featured,
            'published_at' => $submission->published_at?->toFormattedDateString(),
            'sold_at' => $submission->sold_at?->toFormattedDateString(),
            // Offer amounts only — responding happens on the Offers page, which this
            // page links to rather than duplicating the accept/decline/counter flow.
            'offers' => $submission->offers->map(fn (Offer $offer): array => [
                'id' => $offer->id,
                'amount' => $offer->amount,
                'counter_amount' => $offer->counter_amount,
                'offered_at' => $offer->offered_at?->toFormattedDateString(),
                'status' => $offer->offerStatus()->value,
                'status_label' => $offer->statusLabel(),
                'status_tone' => $offer->offerStatus()->tone(),
            ])->values(),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeSubmission(EquipmentSubmission $submission): array
    {
        $status = $submission->listingStatus();

        return [
            'id' => $submission->id,
            'title' => $submission->title,
            'category' => $submission->category,
            'region' => $submission->region,
            'city' => $submission->city,
            'condition' => $submission->condition,
            'condition_label' => $submission->conditionLabel(),
            'condition_notes' => $submission->condition_notes,
            'asking_price' => $submission->asking_price,
            'needs_valuation' => $submission->needs_valuation,
            'photos' => $submission->photos ?? [],
            'documents' => $submission->documents ?? [],
            'status' => $status->value,
            'status_label' => $status->label(),
            'status_tone' => $status->tone(),
            'status_explanation' => $status->sellerExplanation(),
            'created_at' => $submission->created_at?->toFormattedDateString(),
        ];
    }
}
