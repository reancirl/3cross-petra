<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home', [
    'canonicalUrl' => url('/'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
]));

Route::get('/equipment', fn () => Inertia::render('Equipment', [
    'canonicalUrl' => url('/equipment'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
]));

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

Route::get('/contact', fn () => Inertia::render('Contact', [
    'canonicalUrl' => url('/contact'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
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
            'loc' => url('/contact'),
            'changefreq' => 'monthly',
            'priority' => '0.6',
        ],
    ];
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
