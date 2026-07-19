<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * A reusable reply snippet brokers can insert into the inbox composer.
 *
 * Shared across all brokers rather than owned per-broker: Petra presents one voice
 * to customers, and a per-broker list would fragment it.
 */
#[Fillable(['title', 'body', 'position'])]
class CannedResponse extends Model
{
    /**
     * @param  Builder<CannedResponse>  $query
     * @return Builder<CannedResponse>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('position')->orderBy('title');
    }
}
