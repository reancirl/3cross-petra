<?php

namespace App\Http\Requests;

use App\Models\EquipmentSubmission;
use App\Models\User;
use App\Support\PublicLocationOptions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * The public Sell Equipment submission form.
 *
 * Wider than the portal's StoreEquipmentSubmissionRequest because the visitor may be a
 * stranger: it collects contact details and the doc's selling-intent questions, and it
 * requires both consent checkboxes. A signed-in seller is exempt from the contact fields —
 * their account already carries that information.
 */
class StorePublicEquipmentSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * True when the submitter's contact details have to be typed rather than read off an
     * account. Sellers own listings; everyone else (guests, buyers, brokers) submits an
     * unclaimed lead a broker works from the contact_* columns.
     */
    public function needsContactDetails(): bool
    {
        return $this->user()?->user_type !== User::TYPE_SELLER;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        $contactRequired = Rule::requiredIf(fn (): bool => $this->needsContactDetails());

        return [
            'full_name' => [$contactRequired, 'nullable', 'string', 'max:255'],
            'company' => [$contactRequired, 'nullable', 'string', 'max:255'],
            'email' => [$contactRequired, 'nullable', 'email', 'max:255'],
            'phone' => [$contactRequired, 'nullable', 'string', 'max:40'],

            'category' => ['required', 'string', Rule::in(EquipmentSubmission::CATEGORIES)],
            // Stored as the listing title — it is the one-line "what is it" the broker queue shows.
            'description' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'min:1', 'max:10000'],
            'location' => ['required', 'string', Rule::in(PublicLocationOptions::values())],
            'condition' => ['required', 'string', Rule::in(array_keys(EquipmentSubmission::CONDITIONS))],

            'is_owner' => ['required', 'string', Rule::in(array_keys(EquipmentSubmission::OWNERSHIP_OPTIONS))],
            'intent' => ['required', 'array', 'min:1'],
            'intent.*' => ['string', Rule::in(array_keys(EquipmentSubmission::INTENT_OPTIONS))],
            'availability' => ['required', 'string', Rule::in(array_keys(EquipmentSubmission::AVAILABILITY_OPTIONS))],
            'estimated_value_range' => ['nullable', 'string', Rule::in(array_keys(EquipmentSubmission::VALUE_RANGE_OPTIONS))],

            // Same limits as the portal form so the two intake paths accept the same uploads.
            'photos' => ['nullable', 'array', 'max:'.EquipmentSubmission::MAX_PHOTOS],
            'photos.*' => ['file', 'image', 'max:'.EquipmentSubmission::MAX_PHOTO_SIZE_KB],
            'documents' => ['nullable', 'array', 'max:8'],
            'documents.*' => ['file', 'max:20480'],

            'additional_info' => ['nullable', 'string', 'max:5000'],

            'consent_accuracy' => ['accepted'],
            'consent_contact' => ['accepted'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'intent.required' => 'Select at least one option so we know what you are looking to do.',
            'consent_accuracy.accepted' => 'Please confirm the information provided is accurate.',
            'consent_contact.accepted' => 'Please authorize Petra to contact you about this submission.',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'full_name' => 'full name',
            'company' => 'company name',
            'description' => 'equipment description',
            'location' => 'equipment location',
            'condition' => 'general condition',
            'is_owner' => 'ownership',
            'estimated_value_range' => 'estimated equipment value',
            'additional_info' => 'additional information',
        ];
    }
}
