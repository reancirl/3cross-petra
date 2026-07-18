<?php

use App\Models\EquipmentRequest;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const INDEX = 'equipment_requests_open_quote_unique';

    /**
     * A buyer may hold only one OPEN quote request per listing.
     *
     * The rule is enforced in EquipmentListingController::storeInquiry, which returns a
     * friendly message; this index is the race backstop for two submits landing at once
     * (second tab, double request in flight).
     *
     * It has to be partial on two counts, which is why it is raw SQL rather than
     * $table->unique() — Laravel's schema builder has no partial-index API:
     *   - equipment_submission_id IS NOT NULL — free-form requests carry no listing and
     *     are unlimited by design (see EquipmentRequest::scopeFreeFormRequests).
     *   - status <> 'closed' — closing a request must free the buyer to ask again,
     *     otherwise the block is permanent (see EquipmentRequest::STATUS_CLOSED).
     *
     * Postgres (dev/prod) and SQLite (tests) share this exact syntax. MySQL supports
     * neither partial nor filtered unique indexes, so this migration would need a
     * driver-specific branch (or a trigger) if the project ever moves to it.
     */
    public function up(): void
    {
        // Pre-existing duplicates would make the index creation fail. Keep the newest
        // open request per (buyer, listing) and close the older ones rather than
        // deleting them — they are real buyer intent and the broker may have worked them.
        $this->closeDuplicateOpenInquiries();

        DB::statement(sprintf(
            'CREATE UNIQUE INDEX %s ON equipment_requests (user_id, equipment_submission_id) WHERE equipment_submission_id IS NOT NULL AND status <> %s',
            self::INDEX,
            "'".EquipmentRequest::STATUS_CLOSED."'",
        ));
    }

    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS '.self::INDEX);
    }

    private function closeDuplicateOpenInquiries(): void
    {
        $duplicates = DB::table('equipment_requests')
            ->select('user_id', 'equipment_submission_id', DB::raw('MAX(id) as keep_id'))
            ->whereNotNull('equipment_submission_id')
            ->where('status', '<>', EquipmentRequest::STATUS_CLOSED)
            ->groupBy('user_id', 'equipment_submission_id')
            ->havingRaw('COUNT(*) > 1')
            ->get();

        foreach ($duplicates as $duplicate) {
            DB::table('equipment_requests')
                ->where('user_id', $duplicate->user_id)
                ->where('equipment_submission_id', $duplicate->equipment_submission_id)
                ->where('status', '<>', EquipmentRequest::STATUS_CLOSED)
                ->where('id', '<>', $duplicate->keep_id)
                ->update(['status' => EquipmentRequest::STATUS_CLOSED]);
        }
    }
};
