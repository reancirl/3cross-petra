<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SitemapTest extends TestCase
{
    use RefreshDatabase;

    public function test_sitemap_lists_public_urls_without_artificial_last_modified_dates(): void
    {
        $response = $this->get('/sitemap.xml');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/xml');
        $response->assertSee('<loc>'.url('/').'</loc>', false);
        $response->assertSee('<loc>'.url('/equipment').'</loc>', false);
        $response->assertDontSee('<lastmod>', false);
    }
}
