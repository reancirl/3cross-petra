<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DocumentDownloadController;
use App\Http\Controllers\EquipmentListingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\MessageAttachmentController;
use App\Http\Controllers\SellEquipmentController;
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

/**
 * Sell Equipment is a hub, not a page: an index plus eight sub-pages that cross-link heavily
 * (see docs/Sell Equipment Pages.pdf). Each renders a component under Pages/SellEquipment/ and
 * receives the canonical + OG URLs the shared PublicPageMeta head block needs.
 *
 * Equipment Inspection Services is deliberately absent — the content doc marks it in progress.
 */
Route::prefix('sell-equipment')->group(function (): void {
    $page = fn (string $component, string $path) => fn () => Inertia::render("SellEquipment/{$component}", [
        'canonicalUrl' => url($path),
        'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
    ]);

    Route::get('/', $page('Index', '/sell-equipment'))->name('sell-equipment');
    Route::get('/why-sell-with-petra', $page('WhySellWithPetra', '/sell-equipment/why-sell-with-petra'))
        ->name('sell-equipment.why');
    Route::get('/seller-process', $page('SellerProcess', '/sell-equipment/seller-process'))
        ->name('sell-equipment.process');
    Route::get('/equipment-submission', [SellEquipmentController::class, 'submissionForm'])
        ->name('sell-equipment.submission');
    // Throttled: a public endpoint that writes rows and accepts uploads. The form also
    // carries a honeypot field the request rejects silently.
    Route::post('/equipment-submission', [SellEquipmentController::class, 'storeSubmission'])
        ->middleware('throttle:10,1')
        ->name('sell-equipment.submission.store');
    Route::get('/equipment-submission/thank-you', $page('SubmissionThanks', '/sell-equipment/equipment-submission/thank-you'))
        ->name('sell-equipment.submission.thanks');
    Route::get('/upload-photos', $page('UploadPhotos', '/sell-equipment/upload-photos'))
        ->name('sell-equipment.photos');
    Route::get('/upload-documents', $page('UploadDocuments', '/sell-equipment/upload-documents'))
        ->name('sell-equipment.documents');
    Route::get('/request-valuation', $page('RequestValuation', '/sell-equipment/request-valuation'))
        ->name('sell-equipment.valuation');
    Route::get('/faqs', $page('Faqs', '/sell-equipment/faqs'))->name('sell-equipment.faqs');
    Route::get('/contact-broker', [SellEquipmentController::class, 'contactBroker'])
        ->name('sell-equipment.contact-broker');
    // Throttled and honeypotted for the same reason as the submission POST above.
    Route::post('/contact-broker', [SellEquipmentController::class, 'storeBrokerInquiry'])
        ->middleware('throttle:10,1')
        ->name('sell-equipment.contact-broker.store');
});

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

// Message attachments are on the private disk, so they are served by a controller
// that checks thread access first — never as a static file. Registered once outside
// the portal groups because all three roles reach the same endpoint and the access
// question ("can you see this thread") is identical for each.
Route::get('/messages/attachments/{attachment}', [MessageAttachmentController::class, 'show'])
    ->middleware(['auth'])
    ->whereNumber('attachment')
    ->name('messages.attachments.show');

// Documents live on the private disk and are served only by these two endpoints — the
// authenticated one asks Document::visibleTo, the public one proves the document is
// published with a listing the marketplace is already showing. Registered outside the
// portal groups for the same reason attachments are: all three roles hit the same URL
// and the access question does not vary by portal.
Route::get('/documents/{document}/download', [DocumentDownloadController::class, 'download'])
    ->middleware(['auth'])
    ->whereNumber('document')
    ->name('documents.download');

Route::get('/documents/{document}/public', [DocumentDownloadController::class, 'publicShow'])
    ->whereNumber('document')
    ->name('documents.public');

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
            'loc' => url('/sell-equipment/why-sell-with-petra'),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ],
        [
            'loc' => url('/sell-equipment/seller-process'),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ],
        [
            'loc' => url('/sell-equipment/equipment-submission'),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ],
        [
            'loc' => url('/sell-equipment/upload-photos'),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ],
        [
            'loc' => url('/sell-equipment/upload-documents'),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ],
        [
            'loc' => url('/sell-equipment/request-valuation'),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ],
        [
            'loc' => url('/sell-equipment/faqs'),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ],
        [
            'loc' => url('/sell-equipment/contact-broker'),
            'changefreq' => 'monthly',
            'priority' => '0.7',
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
