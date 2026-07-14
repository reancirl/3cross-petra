<?php

use App\Http\Controllers\Portal\DashboardController;
use App\Http\Controllers\Portal\EquipmentRequestController;
use App\Http\Controllers\Portal\ProfileController;
use Illuminate\Support\Facades\Route;

$portalSections = ['saved-equipment-watchlist', 'quotes', 'offers', 'documents', 'messages', 'notifications'];

Route::middleware(['auth', 'no.back.history', 'user.type:buyer'])
    ->prefix('buyer')
    ->name('portal.buyer.')
    ->group(function () use ($portalSections) {
        Route::get('/dashboard', [DashboardController::class, 'index'])->defaults('userType', 'buyer')->name('dashboard');
        Route::get('/saved-equipment', [EquipmentRequestController::class, 'index'])->name('saved-equipment');
        Route::post('/saved-equipment', [EquipmentRequestController::class, 'store'])->name('saved-equipment.store');
        Route::get('/profile', [ProfileController::class, 'show'])->defaults('userType', 'buyer')->name('profile');
        Route::patch('/profile', [ProfileController::class, 'update'])->defaults('userType', 'buyer')->name('profile.update');
        Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->defaults('userType', 'buyer')->name('profile.password');
        Route::get('/{section}', [DashboardController::class, 'placeholder'])
            ->whereIn('section', $portalSections)
            ->defaults('userType', 'buyer')
            ->name('placeholder');
    });
