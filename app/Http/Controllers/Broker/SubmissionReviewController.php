<?php

namespace App\Http\Controllers\Broker;

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
                    'equipment_type' => $submission->equipment_type,
                    'location' => $submission->location,
                    'condition' => $submission->condition,
                    'status' => $submission->status,
                    'status_label' => $submission->statusLabel(),
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
            'sellerStatusOptions' => EquipmentSubmission::STATUSES,
            'buyerStatusOptions' => EquipmentRequest::STATUSES,
        ]);
    }

    public function updateSellerSubmission(
        UpdateEquipmentSubmissionStatusRequest $request,
        EquipmentSubmission $equipmentSubmission,
    ): RedirectResponse {
        $equipmentSubmission->update($request->safe()->only(['status']));

        return back()->with('status', 'Seller submission status updated.');
    }

    public function updateBuyerRequest(
        UpdateEquipmentRequestStatusRequest $request,
        EquipmentRequest $equipmentRequest,
    ): RedirectResponse {
        $equipmentRequest->update($request->safe()->only(['status']));

        return back()->with('status', 'Buyer request status updated.');
    }
}
