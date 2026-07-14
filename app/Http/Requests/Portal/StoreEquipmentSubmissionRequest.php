<?php

namespace App\Http\Requests\Portal;

use Illuminate\Foundation\Http\FormRequest;

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
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'equipment_type' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'condition' => ['required', 'string', 'max:2000'],
            'photos' => ['nullable', 'array', 'max:8'],
            'photos.*' => ['file', 'image', 'max:10240'],
            'documents' => ['nullable', 'array', 'max:8'],
            'documents.*' => ['file', 'max:20480'],
        ];
    }
}
