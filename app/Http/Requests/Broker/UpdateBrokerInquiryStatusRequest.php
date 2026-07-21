<?php

namespace App\Http\Requests\Broker;

use App\Models\BrokerInquiry;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * A broker moving a lead along New → Contacted → Closed. Authorization is the
 * user.type:broker middleware on the route group, matching the other broker queues.
 */
class UpdateBrokerInquiryStatusRequest extends FormRequest
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
            'status' => ['required', 'string', Rule::in(array_keys(BrokerInquiry::STATUSES))],
        ];
    }
}
