<?php

namespace App\Http\Requests\Broker;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RespondToOfferRequest extends FormRequest
{
    public const ACTION_ACCEPT = 'accept';

    public const ACTION_DECLINE = 'decline';

    public const ACTION_COUNTER = 'counter';

    /**
     * Broker-only access is enforced by the route (user.type:broker); brokers act on
     * every listing, so there is no per-record ownership check to make here.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * The broker's half of the negotiation loop, mirroring the seller's
     * Portal\RespondToOfferRequest: accept the seller's counter, decline it, or
     * re-offer at a new amount (which puts the offer back to the seller as Pending).
     *
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'action' => ['required', Rule::in([self::ACTION_ACCEPT, self::ACTION_DECLINE, self::ACTION_COUNTER])],
            'amount' => ['nullable', 'required_if:action,'.self::ACTION_COUNTER, 'numeric', 'min:0'],
        ];
    }
}
