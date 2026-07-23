<?php

namespace App\Http\Requests\Broker;

use App\Enums\DocumentVisibility;
use App\Models\Document;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * A broker adding files to a listing or a buyer request.
 *
 * Note what is NOT here: who the document is shared with. The recipient is derived
 * from the subject in the controller — a listing has exactly one seller, a request has
 * exactly one buyer — rather than accepted from the form. A client-supplied user id
 * would be a way to hand a competitor's document to any account by editing a hidden
 * field, and there is no case where the answer is not already determined by the subject.
 */
class StoreDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        // The route sits behind user.type:broker, which is the whole authorization
        // story here — brokers are staff and every subject is theirs to work.
        return $this->user()?->isBroker() === true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'visibility' => ['required', Rule::in(DocumentVisibility::values())],
            'documents' => ['required', 'array', 'max:'.Document::MAX_PER_UPLOAD],
            // Both rules are needed, matching StoreMessageRequest: `mimes` checks the
            // real type sniffed from the file, `extensions` checks the claimed name, and
            // a file that passes only one of them is exactly the file we do not want.
            'documents.*' => [
                'file',
                'mimes:'.implode(',', Document::ALLOWED_EXTENSIONS),
                'extensions:'.implode(',', Document::ALLOWED_EXTENSIONS),
                'max:'.Document::MAX_SIZE_KB,
            ],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'documents.required' => 'Choose at least one file to add.',
            'documents.max' => 'Add at most '.Document::MAX_PER_UPLOAD.' files at a time.',
            'documents.*.mimes' => 'Documents must be images, PDFs, Office files, CSV or text.',
            'documents.*.extensions' => 'Documents must be images, PDFs, Office files, CSV or text.',
            'documents.*.max' => 'Each file must be under '.(Document::MAX_SIZE_KB / 1024).' MB.',
        ];
    }

    public function visibility(): DocumentVisibility
    {
        return DocumentVisibility::from($this->validated('visibility'));
    }
}
