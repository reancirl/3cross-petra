<?php

namespace App\Http\Requests;

use App\Models\BrokerInquiry;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * The public "Talk to a Broker" form.
 *
 * Unlike StorePublicEquipmentSubmissionRequest, the contact fields are required of everyone
 * — a signed-in seller included. An inquiry is answered from the details it carries rather
 * than from an account (see BrokerInquiry), and the person asking may want a reply somewhere
 * other than their login address. The account is still recorded on the row when there is one.
 */
class StoreBrokerInquiryRequest extends FormRequest
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
            'full_name' => ['required', 'string', 'max:255'],
            // The only optional contact field: plenty of equipment owners are individuals.
            'company' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:40'],

            'topic' => ['required', 'string', Rule::in(array_keys(BrokerInquiry::TOPICS))],
            'equipment_type' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'preferred_contact' => ['required', 'string', Rule::in(array_keys(BrokerInquiry::PREFERRED_CONTACT))],

            'consent' => ['accepted'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'topic.required' => 'Let us know how we can help so your message reaches the right person.',
            'consent.accepted' => 'Please authorize Petra to contact you about your inquiry.',
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
            'topic' => 'reason for contacting us',
            'equipment_type' => 'equipment type',
            'preferred_contact' => 'preferred contact method',
        ];
    }
}
