<?php

use App\Enums\ListingStatus;
use App\Models\EquipmentSubmission;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Restructure free-text submissions into the structured seller-listing shape.
     *
     * The old free-text `condition` column is renamed (not dropped) to `condition_notes`,
     * so nothing a seller typed is ever lost — the new `condition` enum is derived from it
     * on a best-effort basis and falls back to "unknown".
     */
    public function up(): void
    {
        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->renameColumn('equipment_type', 'title');
            $table->renameColumn('condition', 'condition_notes');
        });

        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->text('condition_notes')->nullable()->change();

            $table->string('category')->nullable()->after('title');
            $table->string('region')->nullable()->after('category');
            $table->string('city')->nullable()->after('region');
            $table->string('condition')->nullable()->after('city');
            $table->decimal('asking_price', 12, 2)->nullable()->after('condition_notes');
            $table->boolean('needs_valuation')->default(false)->after('asking_price');
        });

        $this->backfill();

        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->string('category')->nullable(false)->change();
            $table->string('region')->nullable(false)->change();
            $table->string('condition')->nullable(false)->change();
            $table->dropColumn('location');
        });

        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->string('status')->default(ListingStatus::UnderReview->value)->change();
        });
    }

    /**
     * Each step gets its own Schema::table call. A change() and a renameColumn touching
     * the same column inside one Blueprint are not executed in written order, which
     * makes the rename land before the change and blows up.
     */
    public function down(): void
    {
        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->string('location')->nullable();
        });

        DB::table('equipment_submissions')->orderBy('id')->each(function (object $row): void {
            DB::table('equipment_submissions')->where('id', $row->id)->update([
                'location' => trim(($row->city ? $row->city.', ' : '').($row->region ?? '')) ?: 'Unknown',
                // Never leave this null: it becomes the NOT NULL `condition` column below.
                'condition_notes' => $row->condition_notes ?: ($row->condition ?? 'unknown'),
                'status' => in_array($row->status, ['under_review', 'published'], true) ? 'submitted' : 'in_negotiation',
            ]);
        });

        // Drop the new `condition` column before `condition_notes` is renamed onto that name.
        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->dropColumn(['category', 'region', 'city', 'condition', 'asking_price', 'needs_valuation']);
        });

        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->string('location')->nullable(false)->change();
            $table->text('condition_notes')->nullable(false)->change();
            $table->string('status')->default('submitted')->change();
        });

        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->renameColumn('title', 'equipment_type');
        });

        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->renameColumn('condition_notes', 'condition');
        });
    }

    /**
     * Map the existing free-text rows onto the new structured columns.
     */
    private function backfill(): void
    {
        $statusMap = ListingStatus::legacyMap();

        DB::table('equipment_submissions')->orderBy('id')->each(function (object $row) use ($statusMap): void {
            DB::table('equipment_submissions')->where('id', $row->id)->update([
                'category' => $this->guessCategory($row->title ?? ''),
                'region' => $this->guessRegion($row->location ?? ''),
                'city' => $this->guessCity($row->location ?? ''),
                'condition' => $this->guessCondition($row->condition_notes ?? ''),
                'status' => $statusMap[$row->status] ?? ListingStatus::UnderReview->value,
            ]);
        });
    }

    private function guessCategory(string $title): string
    {
        foreach (EquipmentSubmission::CATEGORIES as $category) {
            // Match on the singular stem so "Compressor" hits the "Compressors" option.
            if (Str::contains(Str::lower($title), Str::lower(Str::singular($category)))) {
                return $category;
            }
        }

        return EquipmentSubmission::CATEGORY_FALLBACK;
    }

    private function guessRegion(string $location): string
    {
        foreach (EquipmentSubmission::REGIONS as $region) {
            if ($region !== EquipmentSubmission::REGION_FALLBACK && Str::contains(Str::lower($location), Str::lower($region))) {
                return $region;
            }
        }

        // Two-letter state codes are common in the old free-text values ("Casper, WY").
        $codes = ['wy' => 'Wyoming', 'nd' => 'North Dakota', 'co' => 'Colorado', 'ut' => 'Utah', 'nm' => 'New Mexico', 'mt' => 'Montana'];

        foreach ($codes as $code => $region) {
            if (preg_match('/\b'.$code.'\b/i', $location) === 1) {
                return $region;
            }
        }

        return EquipmentSubmission::REGION_FALLBACK;
    }

    private function guessCity(string $location): ?string
    {
        $location = trim($location);

        return $location === '' ? null : Str::limit($location, 255, '');
    }

    private function guessCondition(string $notes): string
    {
        $notes = Str::lower($notes);

        // Order matters: a note like "Needs work, sat idle 2 years" is a needs-work
        // asset first and an idle one second, so the stronger signal is matched first.
        return match (true) {
            Str::contains($notes, ['needs work', 'repair', 'broken', 'rough', 'damaged']) => EquipmentSubmission::CONDITION_NEEDS_WORK,
            Str::contains($notes, ['running', 'operational', 'operating']) => EquipmentSubmission::CONDITION_RUNNING,
            Str::contains($notes, ['recently pulled', 'just pulled', 'pulled']) => EquipmentSubmission::CONDITION_RECENTLY_PULLED,
            Str::contains($notes, ['idle', 'sitting', 'stored', 'yard']) => EquipmentSubmission::CONDITION_SITTING_IDLE,
            default => EquipmentSubmission::CONDITION_UNKNOWN,
        };
    }
};
