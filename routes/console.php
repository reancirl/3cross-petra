<?php

use App\Models\Notification;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Notification retention: rows older than 90 days are pruned nightly. The window and the
// prunable query live on the model (Notification::prunable, RETENTION_DAYS); this only
// schedules the built-in model:prune against it, so there is no bespoke command to keep
// in sync. Needs `php artisan schedule:run` on a cron (or the queue worker's scheduler)
// in production — see the manual steps in the notifications implementation notes.
Schedule::command('model:prune', ['--model' => [Notification::class]])->daily();
