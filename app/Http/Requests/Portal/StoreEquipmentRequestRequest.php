<?php

namespace App\Http\Requests\Portal;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipmentRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'equipment_type' => ['required', 'string', 'max:255'],
            'specifications' => ['nullable', 'string', 'max:2000'],
            'budget_range' => ['required', 'string', 'max:255', 'regex:/^(?:\d+|\d{1,3}(?:,\d{3})+)$/'],
            'location_preference' => ['required', 'string', 'max:255'],
            'timeline' => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'budget_range.regex' => 'The budget range may only contain numbers and thousands separators.',
        ];
    }
}
