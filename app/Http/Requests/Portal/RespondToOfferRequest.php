<?php

namespace App\Http\Requests\Portal;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RespondToOfferRequest extends FormRequest
{
    public const ACTION_ACCEPT = 'accept';

    public const ACTION_DECLINE = 'decline';

    public const ACTION_COUNTER = 'counter';

    /**
     * Ownership is enforced in the controller (the offer must belong to one of the
     * seller's listings), so this only validates the shape of the response.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * A seller may only accept, decline, or counter — never set an arbitrary status.
     * A counter must carry the amount the seller wants back.
     *
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'action' => ['required', Rule::in([self::ACTION_ACCEPT, self::ACTION_DECLINE, self::ACTION_COUNTER])],
            'counter_amount' => ['nullable', 'required_if:action,'.self::ACTION_COUNTER, 'numeric', 'min:0'],
        ];
    }
}
