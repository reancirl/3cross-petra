<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home', [
    'canonicalUrl' => url('/'),
    'ogImageUrl' => asset('images/petra-equipment-yard-hero.png'),
]));

Route::get('/sitemap.xml', function () {
    $homeUrl = htmlspecialchars(url('/'), ENT_XML1);
    $lastModified = now()->toDateString();

    $xml = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{$homeUrl}</loc>
        <lastmod>{$lastModified}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
XML;

    return response($xml, 200)->header('Content-Type', 'application/xml');
});
