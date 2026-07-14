<?php

namespace App\Http\Controllers\Portal;

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
        return Inertia::render('Portal/SellerSavedEquipment', [
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
            'statusOptions' => EquipmentSubmission::STATUSES,
        ]);
    }

    public function store(StoreEquipmentSubmissionRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $request->user()->equipmentSubmissions()->create([
            'equipment_type' => $validated['equipment_type'],
            'location' => $validated['location'],
            'condition' => $validated['condition'],
            'photos' => $this->storeUploads($request->file('photos', []), 'photos'),
            'documents' => $this->storeUploads($request->file('documents', []), 'documents'),
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
        return [
            'id' => $submission->id,
            'equipment_type' => $submission->equipment_type,
            'location' => $submission->location,
            'condition' => $submission->condition,
            'photos' => $submission->photos ?? [],
            'documents' => $submission->documents ?? [],
            'status' => $submission->status,
            'status_label' => $submission->statusLabel(),
            'created_at' => $submission->created_at?->toFormattedDateString(),
        ];
    }
}
