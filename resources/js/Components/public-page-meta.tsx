import { Head } from '@inertiajs/react';

type PublicPageMetaProps = {
    title: string;
    description: string;
    canonicalUrl: string;
    ogImageUrl: string;
    ogImageAlt?: string;
    /** Confirmation pages and anything else that should stay out of search results. */
    noindex?: boolean;
    structuredData?: unknown;
};

/**
 * The head block every public page repeats: title, description, canonical, Open Graph,
 * Twitter card, and a JSON-LD graph. Extracted while building the Sell Equipment section,
 * where ten pages would otherwise carry ten copies of the same twelve tags.
 */
export function PublicPageMeta({
    title,
    description,
    canonicalUrl,
    ogImageUrl,
    ogImageAlt = 'Oilfield equipment yard represented by Petra equipment brokerage.',
    noindex = false,
    structuredData,
}: PublicPageMetaProps) {
    return (
        <Head title={title}>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:alt" content={ogImageAlt} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />

            {structuredData ? <script type="application/ld+json">{JSON.stringify(structuredData)}</script> : null}
        </Head>
    );
}

/**
 * Origin of an absolute canonical URL. Sell Equipment nests two levels deep, so the
 * older `canonicalUrl.replace(/\/sell-equipment$/, '')` trick no longer gets back to the
 * site root.
 */
export function siteOrigin(canonicalUrl: string): string {
    try {
        return new URL(canonicalUrl).origin;
    } catch {
        return '';
    }
}

/**
 * BreadcrumbList for a page under /sell-equipment. Pass the leaf's name and URL; Home and
 * Sell Equipment are always the first two rungs. Omit the leaf for the section index.
 */
export function breadcrumbNode(canonicalUrl: string, leaf?: { name: string; url: string }) {
    const origin = siteOrigin(canonicalUrl);

    const trail = [
        { name: 'Home', item: origin },
        { name: 'Sell Equipment', item: `${origin}/sell-equipment` },
        ...(leaf ? [{ name: leaf.name, item: leaf.url }] : []),
    ];

    return {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumbs`,
        itemListElement: trail.map((rung, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: rung.name,
            item: rung.item,
        })),
    };
}

/**
 * The Organization/Service node shared by the Sell Equipment pages.
 */
export function sellEquipmentServiceNode(canonicalUrl: string, description: string) {
    return {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: 'Used oilfield and industrial equipment brokerage for sellers',
        url: canonicalUrl,
        description,
        provider: {
            '@type': 'Organization',
            name: 'Petra',
            url: siteOrigin(canonicalUrl),
        },
        areaServed: ['Wyoming', 'Rockies', 'Bakken', 'North Dakota', 'Colorado', 'Utah', 'New Mexico', 'Montana'],
        serviceType: 'Used oilfield and industrial equipment brokerage',
    };
}
