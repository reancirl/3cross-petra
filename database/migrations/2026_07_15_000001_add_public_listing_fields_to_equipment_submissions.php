<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Broker-enrichment fields that turn a raw seller submission into a public listing.
     *
     * None are seller-provided; brokers fill them during review. public_id is generated
     * automatically on first publish. published_at / sold_at drive recency + the 30-day
     * sold-visibility rule.
     */
    public function up(): void
    {
        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->string('public_id')->nullable()->unique()->after('id');
            $table->string('manufacturer')->nullable()->after('condition_notes');
            $table->string('model')->nullable()->after('manufacturer');
            $table->unsignedSmallInteger('year')->nullable()->after('model');
            $table->string('capacity')->nullable()->after('year');
            $table->text('public_description')->nullable()->after('capacity');
            $table->boolean('featured')->default(false)->after('public_description');
            $table->timestamp('published_at')->nullable()->after('featured');
            $table->timestamp('sold_at')->nullable()->after('published_at');

            $table->index(['status', 'published_at']);
            $table->index('featured');
        });

        // Link an inquiry back to the listing it came from (null for free-form requests).
        Schema::table('equipment_requests', function (Blueprint $table): void {
            $table->foreignId('equipment_submission_id')
                ->nullable()
                ->after('user_id')
                ->constrained()
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('equipment_requests', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('equipment_submission_id');
        });

        Schema::table('equipment_submissions', function (Blueprint $table): void {
            $table->dropIndex(['status', 'published_at']);
            $table->dropIndex(['featured']);
            $table->dropColumn([
                'public_id',
                'manufacturer',
                'model',
                'year',
                'capacity',
                'public_description',
                'featured',
                'published_at',
                'sold_at',
            ]);
        });
    }
};
