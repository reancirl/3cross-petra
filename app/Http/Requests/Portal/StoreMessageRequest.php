<?php

namespace App\Http\Requests\Portal;

use App\Models\MessageAttachment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreMessageRequest extends FormRequest
{
    /**
     * Thread access is enforced by the controller, which resolves the thread
     * through Thread::visibleTo rather than by id — matching how the rest of the
     * app authorizes (route middleware for role, query scoping for ownership).
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'body' => ['nullable', 'string', 'max:5000'],
            'attachments' => ['nullable', 'array', 'max:'.MessageAttachment::MAX_PER_MESSAGE],
            // Both rules are needed: `mimes` checks the real type sniffed from the
            // file's contents, while the extension list is what a user actually sees
            // in an error message. HEIC is included explicitly because Laravel's
            // `image` rule does not recognise it.
            'attachments.*' => [
                'file',
                'mimes:'.implode(',', MessageAttachment::ALLOWED_EXTENSIONS),
                'max:'.MessageAttachment::MAX_SIZE_KB,
            ],
        ];
    }

    /**
     * A message must say something: text, a file, or both. Enforced after the
     * field rules so an oversize upload reports its own error rather than
     * collapsing into "write a message".
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->isNotEmpty()) {
                    return;
                }

                $hasBody = trim((string) $this->input('body')) !== '';
                $hasAttachment = ! empty($this->file('attachments', []));

                if (! $hasBody && ! $hasAttachment) {
                    $validator->errors()->add('body', 'Write a message or attach a file.');
                }
            },
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'body.max' => 'A message can be at most 5,000 characters.',
            'attachments.max' => 'You can attach at most '.MessageAttachment::MAX_PER_MESSAGE.' files to one message.',
            'attachments.*.mimes' => 'Attachments must be images (JPG, PNG, WEBP, HEIC) or PDFs.',
            'attachments.*.max' => 'Each attachment must be 10MB or smaller.',
        ];
    }
}
