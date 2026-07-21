<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class SellEquipmentPagesTest extends TestCase
{
    // None of these routes touch the database; the trait is lazy, so it costs nothing here
    // and keeps the class consistent with the rest of the suite.
    use LazilyRefreshDatabase;

    /**
     * Every page in the Sell Equipment section, and the Inertia component it must resolve to.
     *
     * Equipment Inspection Services is deliberately absent — the content doc marks it in
     * progress, so the page does not exist yet.
     *
     * @var array<string, string>
     */
    private const PAGES = [
        '/sell-equipment' => 'SellEquipment/Index',
        '/sell-equipment/why-sell-with-petra' => 'SellEquipment/WhySellWithPetra',
        '/sell-equipment/seller-process' => 'SellEquipment/SellerProcess',
        '/sell-equipment/equipment-submission' => 'SellEquipment/EquipmentSubmission',
        '/sell-equipment/equipment-submission/thank-you' => 'SellEquipment/SubmissionThanks',
        '/sell-equipment/upload-photos' => 'SellEquipment/UploadPhotos',
        '/sell-equipment/upload-documents' => 'SellEquipment/UploadDocuments',
        '/sell-equipment/request-valuation' => 'SellEquipment/RequestValuation',
        '/sell-equipment/faqs' => 'SellEquipment/Faqs',
        '/sell-equipment/contact-broker' => 'SellEquipment/ContactBroker',
    ];

    /**
     * The thank-you page is noindex and intentionally kept out of the sitemap; every other
     * page in the section belongs there.
     *
     * @var array<int, string>
     */
    private const UNINDEXED = ['/sell-equipment/equipment-submission/thank-you'];

    private const COPY_DIRECTORY = 'resources/js/data/sell-equipment';

    public function test_every_page_renders_its_own_inertia_component(): void
    {
        foreach (self::PAGES as $path => $component) {
            // `false` disables Inertia's own on-disk lookup: it searches the package default
            // resource_path('js/pages'), and this project's directory is Pages with a capital
            // P, so on a case-sensitive filesystem every check fails. The assertion below does
            // the same job against the real path, and names the file it wanted when it fails.
            $this->get($path)
                ->assertOk()
                ->assertInertia(fn (AssertableInertia $page) => $page->component($component, false));

            $file = resource_path("js/Pages/{$component}.tsx");

            $this->assertFileExists($file, "Route {$path} renders [{$component}], which has no component file.");
        }
    }

    public function test_every_page_carries_the_canonical_and_og_urls_its_head_block_needs(): void
    {
        // PublicPageMeta builds the canonical, og: and twitter: tags from these two props. A
        // page that lost them would still render, and would silently ship no canonical tag.
        foreach (array_keys(self::PAGES) as $path) {
            $this->get($path)->assertInertia(fn (AssertableInertia $page) => $page
                ->where('canonicalUrl', url($path))
                ->where('ogImageUrl', asset('images/petra-equipment-yard-hero.png'))
                ->etc());
        }
    }

    public function test_the_sitemap_lists_every_indexable_page_and_omits_the_thank_you_page(): void
    {
        $response = $this->get('/sitemap.xml')->assertOk();

        foreach (array_keys(self::PAGES) as $path) {
            if (in_array($path, self::UNINDEXED, true)) {
                $response->assertDontSee('<loc>'.url($path).'</loc>', false);

                continue;
            }

            $response->assertSee('<loc>'.url($path).'</loc>', false);
        }
    }

    /**
     * Walks every href in the transcribed copy and follows it.
     *
     * The nine copy JSONs carry ~68 cross-links, hand-transcribed from a 74-page PDF. A single
     * typo'd path is a dead CTA on a marketing page — invisible in review and invisible until
     * a seller clicks it. This is the check that makes the whole cross-link map enforceable.
     */
    public function test_every_internal_link_in_the_transcribed_copy_resolves(): void
    {
        $links = $this->copyLinks();

        $this->assertNotEmpty($links, 'No hrefs found — the copy directory or the walker is wrong.');

        foreach ($links as $path => $sources) {
            // assertOk()/assertStatus() take no message argument, and naming the offending copy
            // file is the entire value of this test — otherwise a failure is a bare "404 !== 200"
            // with nothing saying which of the nine files to open.
            $this->assertSame(
                200,
                $this->get($path)->getStatusCode(),
                sprintf('Dead link "%s", written in: %s', $path, implode(', ', $sources)),
            );
        }
    }

    /**
     * The section's two in-page CTAs ("Talk to a Broker" → the form further down the page)
     * are anchors, so no route resolves them — the target id has to exist in the markup. An
     * earlier version of this section shipped a #seller-intake CTA pointing at nothing.
     */
    public function test_every_in_page_anchor_target_exists_in_the_markup(): void
    {
        $anchors = $this->copyAnchors();

        $this->assertNotEmpty($anchors, 'No anchor hrefs found — the walker is wrong.');

        $ids = [];
        foreach (['resources/js/Pages/SellEquipment', 'resources/js/Components'] as $directory) {
            foreach (glob(base_path($directory).'/*.tsx') as $file) {
                // Collected into a list rather than matched against one concatenated blob, so a
                // failure prints the ids that DO exist instead of every line of every component.
                preg_match_all('/id="([^"]+)"/', (string) file_get_contents($file), $matches);
                $ids = [...$ids, ...$matches[1]];
            }
        }

        foreach ($anchors as $anchor => $sources) {
            $this->assertContains(
                $anchor,
                $ids,
                sprintf('Anchor "#%s" has no target, written in: %s', $anchor, implode(', ', $sources)),
            );
        }
    }

    /**
     * Internal paths from the copy, deduped, each mapped to the files that reference it.
     *
     * @return array<string, array<int, string>>
     */
    private function copyLinks(): array
    {
        return $this->collectHrefs(fn (string $href): ?string => str_starts_with($href, '/')
            // Drop any fragment: "/sell-equipment/faqs#pricing" is a request for /sell-equipment/faqs.
            ? (explode('#', $href)[0] ?: null)
            : null);
    }

    /**
     * Bare in-page anchors ("#talk-to-a-broker-form"), without the leading hash.
     *
     * @return array<string, array<int, string>>
     */
    private function copyAnchors(): array
    {
        return $this->collectHrefs(fn (string $href): ?string => str_starts_with($href, '#')
            ? substr($href, 1)
            : null);
    }

    /**
     * Recursively pull every "href" out of the copy JSONs, keyed by whatever $normalise
     * returns, with the source filenames as the value. Returning null skips the href.
     *
     * @param  callable(string): ?string  $normalise
     * @return array<string, array<int, string>>
     */
    private function collectHrefs(callable $normalise): array
    {
        $found = [];

        foreach (glob(base_path(self::COPY_DIRECTORY).'/*.json') as $file) {
            $decoded = json_decode(file_get_contents($file), true, flags: JSON_THROW_ON_ERROR);

            foreach ($this->hrefsIn($decoded) as $href) {
                $key = $normalise($href);

                if ($key === null) {
                    continue;
                }

                $found[$key][basename($file)] = basename($file);
            }
        }

        return array_map(array_values(...), $found);
    }

    /**
     * @param  mixed  $node
     * @return array<int, string>
     */
    private function hrefsIn($node): array
    {
        if (! is_array($node)) {
            return [];
        }

        $hrefs = [];

        foreach ($node as $key => $value) {
            if ($key === 'href' && is_string($value)) {
                $hrefs[] = $value;

                continue;
            }

            $hrefs = [...$hrefs, ...$this->hrefsIn($value)];
        }

        return $hrefs;
    }
}
