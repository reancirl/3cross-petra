<?php

namespace App\Http\Requests;

use App\Models\EquipmentSubmission;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Adding photos to a listing that already exists.
 *
 * One class for both surfaces — the seller's own listing page and the broker's Photos
 * tab — because the file rules and the cap are the same question on both, and two
 * copies of a cap check is how the two drift apart.
 *
 * Authorization is deliberately not here. Each route already sits behind its own
 * user.type middleware, and the seller side needs an ownership check that has to run
 * against the bound listing anyway; that check lives in the controller beside the one
 * EquipmentSubmissionController::show already performs, so there is exactly one place
 * to look for "may this person touch this listing".
 */
class StoreListingPhotosRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'photos' => ['required', 'array'],
            // `image` sniffs the real type rather than trusting the client's
            // Content-Type, the same reason UploadStore reads magic bytes for the mime
            // it records.
            'photos.*' => ['file', 'image', 'max:'.EquipmentSubmission::MAX_PHOTO_SIZE_KB],
        ];
    }

    /**
     * The cap is a total across every upload, so it can only be checked against what the
     * listing already holds. Reported before anything is written, so a batch that would
     * overflow leaves no half-uploaded set behind.
     */
    protected function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if ($validator->errors()->isNotEmpty()) {
                return;
            }

            $listing = $this->listing();
            $remaining = $listing->remainingPhotoSlots();
            $incoming = count($this->file('photos', []));

            if ($incoming <= $remaining) {
                return;
            }

            $validator->errors()->add('photos', $remaining === 0
                ? 'This listing already has the maximum of '.EquipmentSubmission::MAX_PHOTOS.' photos. Remove one before adding another.'
                : 'Only '.$remaining.' more photo'.($remaining === 1 ? '' : 's').' can be added — this listing allows '.EquipmentSubmission::MAX_PHOTOS.' in total.');
        });
    }

    public function listing(): EquipmentSubmission
    {
        /** @var EquipmentSubmission $listing */
        $listing = $this->route('equipmentSubmission');

        return $listing;
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'photos.required' => 'Choose at least one photo to add.',
            'photos.*.image' => 'Photos must be image files.',
            'photos.*.max' => 'Each photo must be under '.(EquipmentSubmission::MAX_PHOTO_SIZE_KB / 1024).' MB.',
        ];
    }
}
