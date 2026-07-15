<?php

namespace App\Http\Requests\Portal;

use App\Models\EquipmentSubmission;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEquipmentSubmissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * The price input is disabled in the UI when the seller asks for help pricing,
     * so an empty string can still arrive alongside needs_valuation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'needs_valuation' => $this->boolean('needs_valuation'),
            'asking_price' => $this->input('asking_price') === '' ? null : $this->input('asking_price'),
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
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', Rule::in(EquipmentSubmission::CATEGORIES)],
            'region' => ['required', 'string', Rule::in(EquipmentSubmission::REGIONS)],
            'city' => ['nullable', 'string', 'max:255'],
            'condition' => ['required', 'string', Rule::in(array_keys(EquipmentSubmission::CONDITIONS))],
            'condition_notes' => ['nullable', 'string', 'max:2000'],
            'asking_price' => ['exclude_if:needs_valuation,true', 'nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'needs_valuation' => ['boolean'],
            'photos' => ['nullable', 'array', 'max:8'],
            'photos.*' => ['file', 'image', 'max:10240'],
            'documents' => ['nullable', 'array', 'max:8'],
            'documents.*' => ['file', 'max:20480'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title' => 'equipment title',
            'condition_notes' => 'condition notes',
            'asking_price' => 'asking price',
            'city' => 'city / yard location',
        ];
    }
}
