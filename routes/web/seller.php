<?php

use App\Http\Controllers\Portal\DashboardController;
use App\Http\Controllers\Portal\EquipmentSubmissionController;
use App\Http\Controllers\Portal\ProfileController;
use Illuminate\Support\Facades\Route;

$portalSections = ['saved-equipment', 'quotes', 'offers', 'documents', 'messages', 'notifications'];

Route::middleware(['auth', 'no.back.history', 'user.type:seller'])
    ->prefix('seller')
    ->name('portal.seller.')
    ->group(function () use ($portalSections) {
        Route::get('/dashboard', [DashboardController::class, 'index'])->defaults('userType', 'seller')->name('dashboard');
        Route::get('/saved-equipment', [EquipmentSubmissionController::class, 'index'])->name('saved-equipment');
        Route::post('/saved-equipment', [EquipmentSubmissionController::class, 'store'])->name('saved-equipment.store');
        Route::get('/profile', [ProfileController::class, 'show'])->defaults('userType', 'seller')->name('profile');
        Route::patch('/profile', [ProfileController::class, 'update'])->defaults('userType', 'seller')->name('profile.update');
        Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->defaults('userType', 'seller')->name('profile.password');
        Route::get('/{section}', [DashboardController::class, 'placeholder'])
            ->whereIn('section', $portalSections)
            ->defaults('userType', 'seller')
            ->name('placeholder');
    });
