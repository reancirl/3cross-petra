<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Move existing listings onto the content doc's condition vocabulary, and rename the
     * "Tanks" category to "Tanks & Tank Batteries".
     *
     * Values are written as literals rather than model constants: this migration converts
     * one historic vocabulary into another, and both sides must stay pinned to what they
     * meant on 2026-07-21 no matter how the model's constants drift afterwards.
     *
     * `condition` and `category` are plain string columns (never DB enums), so no schema
     * change is needed — only the stored values move.
     */
    private const CONDITION_RENAMES = [
        'running' => 'operating',
        'recently_pulled' => 'removed_from_service',
        'sitting_idle' => 'operational_but_idle',
        'needs_work' => 'needs_repair',
    ];

    private const CATEGORY_RENAMES = [
        'Tanks' => 'Tanks & Tank Batteries',
    ];

    public function up(): void
    {
        $this->rename(self::CONDITION_RENAMES, self::CATEGORY_RENAMES);
    }

    public function down(): void
    {
        $this->rename(
            array_flip(self::CONDITION_RENAMES),
            array_flip(self::CATEGORY_RENAMES),
        );
    }

    /**
     * @param  array<string, string>  $conditions
     * @param  array<string, string>  $categories
     */
    private function rename(array $conditions, array $categories): void
    {
        foreach ($conditions as $from => $to) {
            DB::table('equipment_submissions')->where('condition', $from)->update(['condition' => $to]);
        }

        foreach ($categories as $from => $to) {
            DB::table('equipment_submissions')->where('category', $from)->update(['category' => $to]);
        }
    }
};
