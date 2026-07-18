<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Portal\StoreEquipmentRequestRequest;
use App\Models\EquipmentRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EquipmentRequestController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Portal/BuyerRequests', [
            'portal' => [
                'userType' => User::TYPE_BUYER,
                'roleLabel' => 'Buyer',
                'dashboardUrl' => route('portal.buyer.dashboard'),
                'profileName' => $request->user()->name,
            ],
            // Free-form equipment requests only. "Request Quote" inquiries (tied to a
            // specific listing) now live on the dedicated buyer Quotes page, so they
            // are excluded here to avoid listing the same inquiry in two places.
            'requests' => $request->user()
                ->equipmentRequests()
                ->freeFormRequests()
                ->latest()
                ->get()
                ->map(fn (EquipmentRequest $equipmentRequest): array => $this->serializeRequest($equipmentRequest))
                ->values(),
            'statusOptions' => EquipmentRequest::STATUSES,
        ]);
    }

    public function store(StoreEquipmentRequestRequest $request): RedirectResponse
    {
        $request->user()->equipmentRequests()->create($request->safe()->only([
            'equipment_type',
            'specifications',
            'budget_range',
            'location_preference',
            'timeline',
        ]));

        return back()->with('status', 'Equipment request submitted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeRequest(EquipmentRequest $equipmentRequest): array
    {
        return [
            'id' => $equipmentRequest->id,
            'equipment_type' => $equipmentRequest->equipment_type,
            'specifications' => $equipmentRequest->specifications,
            'budget_range' => $equipmentRequest->budget_range,
            'location_preference' => $equipmentRequest->location_preference,
            'timeline' => $equipmentRequest->timeline,
            'status' => $equipmentRequest->status,
            'status_label' => $equipmentRequest->statusLabel(),
            'created_at' => $equipmentRequest->created_at?->toFormattedDateString(),
        ];
    }
}
