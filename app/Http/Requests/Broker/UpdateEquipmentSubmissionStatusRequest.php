<?php

namespace App\Http\Requests\Broker;

use App\Enums\ListingStatus;
use App\Models\EquipmentSubmission;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEquipmentSubmissionStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'featured' => $this->boolean('featured'),
            'year' => $this->input('year') === '' ? null : $this->input('year'),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'status' => ['required', Rule::enum(ListingStatus::class)],
            'public_description' => ['nullable', 'string', 'max:5000'],
            'manufacturer' => ['nullable', 'string', 'max:255'],
            'model' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'integer', 'min:1900', 'max:'.(date('Y') + 1)],
            'capacity' => ['nullable', 'string', 'max:255'],
            'featured' => ['boolean'],
            // Documents are no longer edited here. They were a JSON array on this row
            // with per-index public toggles; they are now their own table with a
            // visibility chosen at upload time (App\Enums\DocumentVisibility), managed
            // from the Documents tab beside this form.
        ];
    }

    /**
     * Publishing is gated: a listing can only go Published if it has everything a
     * public card needs. The checklist is reported as field errors so the broker UI
     * can show exactly what is missing.
     */
    protected function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if ($validator->errors()->isNotEmpty()) {
                return;
            }

            if ($this->input('status') !== ListingStatus::Published->value) {
                return;
            }

            /** @var EquipmentSubmission $listing */
            $listing = $this->route('equipmentSubmission');

            // Prerequisites the broker cannot edit on this screen are reported as a
            // single checklist banner; the editable public_description gets its own
            // inline error so it lands under the field.
            $missing = [];

            if (blank($listing->title)) {
                $missing[] = 'a title';
            }

            if (blank($listing->category)) {
                $missing[] = 'a category';
            }

            if (blank($listing->region)) {
                $missing[] = 'a region';
            }

            if (blank($listing->condition)) {
                $missing[] = 'a condition';
            }

            if (count($listing->photos ?? []) === 0) {
                $missing[] = 'at least one photo';
            }

            if ($missing !== []) {
                $validator->errors()->add('publish_block', 'Cannot publish — still missing: '.implode(', ', $missing).'.');
            }

            // Accept an incoming public description or one already saved.
            $description = $this->filled('public_description') ? $this->input('public_description') : $listing->public_description;

            if (blank($description)) {
                $validator->errors()->add('public_description', 'A public description is required to publish.');
            }
        });
    }
}
