<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Fields the public Sell Equipment submission form collects on top of the portal form,
     * plus the columns that let a submission exist without an account.
     *
     * Anonymous submissions are "unclaimed leads": user_id is null and the submitter's
     * details live in the contact_* columns, which a broker works from directly. No account
     * is created on their behalf. A submission is unclaimed exactly when user_id is null,
     * so no separate flag column is needed.
     */
    public function up(): void
    {
        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->unsignedInteger('quantity')->default(1)->after('title');
            $table->string('wyoming_subregion')->nullable()->after('city');
            $table->string('is_owner')->nullable()->after('needs_valuation');
            $table->json('intent')->nullable()->after('is_owner');
            $table->string('availability')->nullable()->after('intent');
            $table->string('estimated_value_range')->nullable()->after('availability');
            $table->string('contact_name')->nullable()->after('estimated_value_range');
            $table->string('contact_company')->nullable()->after('contact_name');
            $table->string('contact_email')->nullable()->after('contact_company');
            $table->string('contact_phone')->nullable()->after('contact_email');
            $table->timestamp('consented_at')->nullable()->after('contact_phone');
            $table->string('source')->default('portal')->after('consented_at');
        });

        // Its own Schema::table call — a change() alongside new column definitions in one
        // Blueprint is not executed in written order (see 2026_07_14_000001).
        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->foreignId('user_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        // Unclaimed leads have no owner to fall back on, so they cannot survive a column
        // that is about to become NOT NULL.
        DB::table('equipment_submissions')->whereNull('user_id')->delete();

        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->foreignId('user_id')->nullable(false)->change();
        });

        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->dropColumn([
                'quantity',
                'wyoming_subregion',
                'is_owner',
                'intent',
                'availability',
                'estimated_value_range',
                'contact_name',
                'contact_company',
                'contact_email',
                'contact_phone',
                'consented_at',
                'source',
            ]);
        });
    }
};
