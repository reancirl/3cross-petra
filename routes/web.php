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
    ];
    $lastModified = now()->toDateString();
    $entries = collect($urls)->map(function ($url) use ($lastModified) {
        $loc = htmlspecialchars($url['loc'], ENT_XML1);

        return <<<XML
    <url>
        <loc>{$loc}</loc>
        <lastmod>{$lastModified}</lastmod>
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
