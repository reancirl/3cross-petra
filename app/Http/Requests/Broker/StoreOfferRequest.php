<?php

namespace App\Http\Requests\Broker;

use App\Enums\OfferStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * The minimal, inferrable offer field set (see App\Models\Offer): the amount,
     * the offer date, and a starting status. A broker normally logs a new offer as
     * Pending (awaiting the seller), but the full status set is allowed so a broker
     * can also record an already-resolved deal.
     *
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'amount' => ['required', 'numeric', 'min:0'],
            'offered_at' => ['required', 'date'],
            'status' => ['required', Rule::enum(OfferStatus::class)],
        ];
    }
}
