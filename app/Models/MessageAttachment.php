<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * A file attached to a message, stored on the private 'local' disk and served
 * only through the authorizing download route.
 */
#[Fillable(['message_id', 'name', 'file_path', 'mime', 'size'])]
class MessageAttachment extends Model
{
    /**
     * Types a message may carry. Deliberately narrower than the listing pipeline,
     * whose documents.* rule accepts any mime at all.
     *
     * HEIC is listed explicitly because Laravel's `image` rule does not match it —
     * it is the default iPhone camera format, so phone-shot data plates would
     * otherwise be rejected at the exact moment a broker asks for one.
     */
    public const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif', 'pdf'];

    public const MAX_SIZE_KB = 10240;

    public const MAX_PER_MESSAGE = 8;

    /**
     * Mimes that should render as an inline preview rather than a file chip.
     */
    public const PREVIEWABLE_MIMES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif',
    ];

    /**
     * @return BelongsTo<Message, $this>
     */
    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }

    public function isPreviewable(): bool
    {
        return in_array($this->mime, self::PREVIEWABLE_MIMES, true);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'size' => 'integer',
        ];
    }
}
