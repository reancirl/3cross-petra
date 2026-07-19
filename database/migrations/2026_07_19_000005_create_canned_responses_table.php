<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Broker-managed reply snippets, insertable into the inbox composer.
     *
     * Not scoped to a broker: Petra speaks with one voice, so the list is shared
     * by all staff and any broker can manage it. Five defaults are seeded by
     * CannedResponseSeeder, keyed on title so re-running the seeder is idempotent
     * and never duplicates or clobbers broker edits to the body.
     */
    public function up(): void
    {
        Schema::create('canned_responses', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->unsignedSmallInteger('position')->default(0);
            $table->timestamps();

            $table->index('position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('canned_responses');
    }
};
