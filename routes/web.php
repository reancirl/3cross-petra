<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\EquipmentListingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MarketplaceController;
use App\Models\EquipmentSubmission;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/equipment', [MarketplaceController::class, 'index']);

Route::get('/equipment/{listing}', [EquipmentListingController::class, 'show'])
    ->where('listing', '[A-Za-z0-9-]+')
    ->name('equipment.show');
Route::post('/equipment/{listing}/inquiries', [EquipmentListingController::class, 'storeInquiry'])
    ->where('listing', '[A-Za-z0-9-]+')
    ->name('equipment.inquiries.store');

Route::get('/sell-equipment', fn () => Inertia::render('SellEquipment', [
    'canonicalUrl' => url('/sell-equipment'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
]));

Route::get('/request-equipment', fn () => Inertia::render('RequestEquipment', [
    'canonicalUrl' => url('/request-equipment'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
]));

Route::get('/services', fn () => Inertia::render('Services', [
    'canonicalUrl' => url('/services'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
]));

Route::get('/industries', fn () => Inertia::render('Industries', [
    'canonicalUrl' => url('/industries'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
]));

Route::get('/about', fn () => Inertia::render('About', [
    'canonicalUrl' => url('/about'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
]));

Route::get('/resources', fn () => Inertia::render('Resources', [
    'canonicalUrl' => url('/resources'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
]));

Route::get('/contact', fn () => Inertia::render('Contact', [
    'canonicalUrl' => url('/contact'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
    'assetContext' => request()->only(['asset', 'equipment']),
]));

Route::get('/privacy', fn () => Inertia::render('LegalPage', [
    'pageKey' => 'privacy',
    'canonicalUrl' => url('/privacy'),
]));

Route::get('/terms', fn () => Inertia::render('LegalPage', [
    'pageKey' => 'terms',
    'canonicalUrl' => url('/terms'),
]));

Route::get('/cookies', fn () => Inertia::render('LegalPage', [
    'pageKey' => 'cookies',
    'canonicalUrl' => url('/cookies'),
]));

Route::get('/disclaimer', fn () => Inertia::render('LegalPage', [
    'pageKey' => 'disclaimer',
    'canonicalUrl' => url('/disclaimer'),
]));

Route::redirect('/services/equipment-brokerage', '/services', 301);
Route::redirect('/industries/oil-and-gas-production', '/industries', 301);

Route::redirect('/inventory', '/equipment', 301);

Route::middleware(['guest', 'no.back.history'])->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('throttle:6,1');

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store'])->middleware('throttle:6,1');

    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->middleware('throttle:6,1')->name('password.email');

    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->middleware('throttle:6,1')->name('password.store');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware(['auth', 'no.back.history'])
    ->name('logout');

Route::get('/dashboard', fn () => redirect()->route(request()->user()->portalRouteName()))
    ->middleware(['auth', 'no.back.history'])
    ->name('dashboard');

require __DIR__.'/web/seller.php';
require __DIR__.'/web/buyer.php';
require __DIR__.'/web/broker.php';

Route::get('/sitemap.xml', function () {
    $urls = [
        [
            'loc' => url('/'),
            'changefreq' => 'weekly',
            'priority' => '1.0',
        ],
        [
            'loc' => url('/equipment'),
            'changefreq' => 'daily',
            'priority' => '0.9',
        ],
        [
            'loc' => url('/sell-equipment'),
            'changefreq' => 'weekly',
            'priority' => '0.8',
        ],
        [
            'loc' => url('/request-equipment'),
            'changefreq' => 'weekly',
            'priority' => '0.8',
        ],
        [
            'loc' => url('/services'),
            'changefreq' => 'weekly',
            'priority' => '0.7',
        ],
        [
            'loc' => url('/industries'),
            'changefreq' => 'weekly',
            'priority' => '0.7',
        ],
        [
            'loc' => url('/about'),
            'changefreq' => 'monthly',
            'priority' => '0.6',
        ],
        [
            'loc' => url('/resources'),
            'changefreq' => 'monthly',
            'priority' => '0.6',
        ],
        [
            'loc' => url('/contact'),
            'changefreq' => 'monthly',
            'priority' => '0.6',
        ],
    ];
    $equipmentUrls = EquipmentSubmission::query()
        ->publiclyVisible()
        ->orderByDesc('published_at')
        ->pluck('public_id')
        ->filter()
        ->map(fn (string $publicId): array => [
            'loc' => url("/equipment/{$publicId}"),
            'changefreq' => 'daily',
            'priority' => '0.8',
        ])->all();
    $urls = array_merge($urls, $equipmentUrls);

    $entries = collect($urls)->map(function ($url) {
        $loc = htmlspecialchars($url['loc'], ENT_XML1);

        return <<<XML
    <url>
        <loc>{$loc}</loc>
        <changefreq>{$url['changefreq']}</changefreq>
        <priority>{$url['priority']}</priority>
    </url>
XML;
    })->implode("\n");

    $xml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{$entries}
</urlset>
XML;

    return response($xml, 200)->header('Content-Type', 'application/xml');
});
