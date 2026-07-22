<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * One row per document download.
 *
 * Written only by DocumentDownloadController, after the access check passes — a logged
 * row therefore means "these bytes were served", not "somebody tried". Reading the
 * table as an audit trail depends on that, so nothing else should ever insert here.
 */
#[Fillable(['document_id', 'user_id', 'downloaded_at'])]
class DownloadLog extends Model
{
    /**
     * @return BelongsTo<Document, $this>
     */
    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    /**
     * Null for an anonymous marketplace visitor pulling a public listing document.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'downloaded_at' => 'datetime',
        ];
    }
}
