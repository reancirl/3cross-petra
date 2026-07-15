<?php

namespace App\Http\Controllers\Portal;

use App\Enums\ListingStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Portal\StoreEquipmentSubmissionRequest;
use App\Models\EquipmentSubmission;
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
