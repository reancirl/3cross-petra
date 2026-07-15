<?php

namespace App\Http\Controllers\Broker;

use App\Enums\ListingStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Broker\UpdateEquipmentRequestStatusRequest;
use App\Http\Requests\Broker\UpdateEquipmentSubmissionStatusRequest;
use App\Models\EquipmentRequest;
use App\Models\EquipmentSubmission;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SubmissionReviewController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Broker/Submissions', [
            'sellerSubmissions' => EquipmentSubmission::with('user')
                ->latest()
                ->get()
                ->map(fn (EquipmentSubmission $submission): array => [
                    'id' => $submission->id,
                    'seller' => $submission->user?->name,
                    'email' => $submission->user?->email,
                    'title' => $submission->title,
                    'category' => $submission->category,
                    'region' => $submission->region,
                    'city' => $submission->city,
                    'condition_label' => $submission->conditionLabel(),
                    'condition_notes' => $submission->condition_notes,
                    'asking_price' => $submission->asking_price,
                    'needs_valuation' => $submission->needs_valuation,
                    'public_id' => $submission->public_id,
                    'public_description' => $submission->public_description,
                    'manufacturer' => $submission->manufacturer,
                    'model' => $submission->model,
                    'year' => $submission->year,
                    'capacity' => $submission->capacity,
                    'featured' => $submission->featured,
                    'photo_count' => count($submission->photos ?? []),
                    'documents' => collect($submission->documents ?? [])->map(fn (array $document): array => [
                        'name' => $document['name'] ?? 'Document',
                        'public' => (bool) ($document['public'] ?? false),
                    ])->values(),
                    'status' => $submission->listingStatus()->value,
                    'status_label' => $submission->statusLabel(),
                    'status_tone' => $submission->listingStatus()->tone(),
                    'created_at' => $submission->created_at?->toFormattedDateString(),
                    'created_at_timestamp' => $submission->created_at?->getTimestamp(),
                ])
                ->values(),
            'buyerRequests' => EquipmentRequest::with('user')
                ->latest()
                ->get()
                ->map(fn (EquipmentRequest $equipmentRequest): array => [
                    'id' => $equipmentRequest->id,
                    'buyer' => $equipmentRequest->user?->name,
                    'email' => $equipmentRequest->user?->email,
                    'phone' => $equipmentRequest->user?->phone,
                    'company_name' => $equipmentRequest->user?->company_name,
                    'equipment_type' => $equipmentRequest->equipment_type,
                    'specifications' => $equipmentRequest->specifications,
                    'budget_range' => $equipmentRequest->budget_range,
                    'location_preference' => $equipmentRequest->location_preference,
                    'timeline' => $equipmentRequest->timeline,
                    'status' => $equipmentRequest->status,
                    'status_label' => $equipmentRequest->statusLabel(),
                    'created_at' => $equipmentRequest->created_at?->toFormattedDateString(),
                    'created_at_timestamp' => $equipmentRequest->created_at?->getTimestamp(),
                ])
                ->values(),
            'sellerStatusOptions' => ListingStatus::options(),
            'buyerStatusOptions' => EquipmentRequest::STATUSES,
        ]);
    }

    public function updateSellerSubmission(
        UpdateEquipmentSubmissionStatusRequest $request,
        EquipmentSubmission $equipmentSubmission,
    ): RedirectResponse {
        $status = ListingStatus::from($request->validated('status'));

        $attributes = [
            'status' => $status,
            'public_description' => $request->validated('public_description'),
            'manufacturer' => $request->validated('manufacturer'),
            'model' => $request->validated('model'),
            'year' => $request->validated('year'),
            'capacity' => $request->validated('capacity'),
            'featured' => $request->boolean('featured'),
            'documents' => $this->applyDocumentVisibility(
                $equipmentSubmission->documents ?? [],
                $request->validated('documents_public', []),
            ),
        ];

        // Stamp a public id + publish time the first time a listing goes public.
        if ($status === ListingStatus::Published) {
            $attributes['public_id'] = $equipmentSubmission->public_id ?? EquipmentSubmission::generatePublicId();
            $attributes['published_at'] = $equipmentSubmission->published_at ?? now();
        }

        // Track the sold moment for the 30-day public-visibility window.
        $attributes['sold_at'] = $status === ListingStatus::Sold
            ? ($equipmentSubmission->sold_at ?? now())
            : null;

        $equipmentSubmission->update($attributes);

        $message = $status === ListingStatus::Published
            ? "Listing published as {$equipmentSubmission->public_id}."
            : 'Seller submission updated.';

        return back()->with('status', $message);
    }

    /**
     * Merge broker per-document public/private choices back into the stored documents.
     *
     * @param  array<int, array<string, mixed>>  $documents
     * @param  array<int, bool>  $visibility
     * @return array<int, array<string, mixed>>
     */
    private function applyDocumentVisibility(array $documents, array $visibility): array
    {
        return collect($documents)
            ->map(function (array $document, int $index) use ($visibility): array {
                $document['public'] = (bool) ($visibility[$index] ?? ($document['public'] ?? false));

                return $document;
            })
            ->all();
    }

    public function updateBuyerRequest(
        UpdateEquipmentRequestStatusRequest $request,
        EquipmentRequest $equipmentRequest,
    ): RedirectResponse {
        $equipmentRequest->update($request->safe()->only(['status']));

        return back()->with('status', 'Buyer request status updated.');
    }
}
