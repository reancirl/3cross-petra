import { useMemo } from 'react';
import { Head, Link, useRemember } from '@inertiajs/react';
import { useScrollMemory } from '../scroll-memory';
import type { PublicListingCard, StatusTone } from '../types';

const PLACEHOLDER_IMAGE = '/images/petra-equipment-yard-hero.png';

// Fall back to the placeholder if a listing photo fails to load (e.g. an unreachable
// storage URL), so a broken image never leaves a blank black card.
function fallbackToPlaceholder(event: { currentTarget: HTMLImageElement }) {
    if (!event.currentTarget.src.endsWith(PLACEHOLDER_IMAGE)) {
        event.currentTarget.src = PLACEHOLDER_IMAGE;
    }
}

// Availability pill colors for the marketplace cards, keyed on the listing tone.
const availabilityPill: Record<StatusTone, string> = {
    success: 'bg-emerald-700 text-white',
    warning: 'bg-amber-600 text-white',
    muted: 'bg-neutral-700 text-white',
    neutral: 'bg-neutral-700 text-white',
    danger: 'bg-[#b3261e] text-white',
};

type FilterKey = 'category' | 'condition' | 'region' | 'manufacturer' | 'availability';

type EquipmentProps = {
    canonicalUrl: string;
    ogImageUrl: string;
    listings: PublicListingCard[];
    filterOptions: Record<FilterKey, string[]>;
    categories: string[];
    regions: string[];
};

const emptyFilters: Record<FilterKey, string> = {
    category: '',
    condition: '',
    region: '',
    manufacturer: '',
    availability: '',
};

const pageTitle = 'Used Oilfield Equipment Marketplace | Petra';
const pageDescription =
    'Browse used oilfield and industrial equipment handled by Petra, including compressors, separators, tank batteries, and pump packages across Wyoming, the Rockies, and the Bakken.';

export default function Equipment({ canonicalUrl, ogImageUrl, listings, filterOptions, categories }: EquipmentProps) {
    // Remembered rather than plain useState: Inertia persists this into the history
    // entry, so returning from a listing detail page restores the same filtered grid.
    // Without it the restored scroll offset would land on a differently-filtered list
    // and put the buyer somewhere arbitrary. A fresh visit still starts unfiltered.
    const [filters, setFilters] = useRemember<Record<FilterKey, string>>(emptyFilters, 'equipment-filters');

    useScrollMemory({ key: 'equipment-listings', detailPrefix: '/equipment/' });

    const hasActiveFilters = Object.values(filters).some(Boolean);

    const filterControls: { key: FilterKey; label: string; options: string[] }[] = [
        { key: 'category', label: 'Category', options: filterOptions.category },
        { key: 'condition', label: 'Condition', options: filterOptions.condition },
        { key: 'region', label: 'Location', options: filterOptions.region },
        { key: 'manufacturer', label: 'Manufacturer', options: filterOptions.manufacturer },
        { key: 'availability', label: 'Availability', options: filterOptions.availability },
    ];

    const filteredListings = useMemo(
        () =>
            listings.filter(
                (listing) =>
                    (!filters.category || listing.category === filters.category) &&
                    (!filters.condition || listing.condition === filters.condition) &&
                    (!filters.region || listing.region === filters.region) &&
                    (!filters.manufacturer || listing.manufacturer === filters.manufacturer) &&
                    (!filters.availability || listing.availability === filters.availability),
            ),
        [listings, filters],
    );

    const hasListings = listings.length > 0;

    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${canonicalUrl}#equipment-marketplace`,
                name: 'Used Oilfield Equipment Marketplace',
                url: canonicalUrl,
                description: pageDescription,
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'Petra',
                    url: canonicalUrl.replace(/\/equipment$/, ''),
                },
                about: categories,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl.replace(/\/equipment$/, '') },
                    { '@type': 'ListItem', position: 2, name: 'Equipment', item: canonicalUrl },
                ],
            },
            {
                '@type': 'ItemList',
                '@id': `${canonicalUrl}#featured-equipment`,
                name: 'Used oilfield equipment available through Petra',
                itemListElement: listings.map((listing, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@type': 'Product',
                        name: listing.title,
                        category: listing.category,
                        description: listing.description,
                        identifier: listing.public_id,
                        ...(listing.manufacturer ? { brand: { '@type': 'Brand', name: listing.manufacturer } } : {}),
                    },
                })),
            },
        ],
    };

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={canonicalUrl} />
                <meta name="robots" content="index, follow" />

                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:image:alt" content="Used oilfield and industrial equipment yard represented by Petra brokerage." />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={ogImageUrl} />

                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Head>

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:py-24">
                        <div>
                            <div className="mb-7 flex flex-wrap gap-3">
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]">
                                    Equipment Marketplace
                                </span>
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                                    Brokerage Verified
                                </span>
                            </div>

                            <h1 className="max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.4rem] lg:text-[4.2rem]">
                                Available Equipment
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                Real equipment currently available through Petra brokerage network. Inventory changes
                                quickly—availability is subject to market movement.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                            <a
                                href="#featured-equipment"
                                className="inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                            >
                                View Equipment
                            </a>
                            <a
                                href="/request-equipment"
                                className="inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                            >
                                Request Equipment
                            </a>
                        </div>
                    </div>
                </section>

                <section id="featured-equipment" className="py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-3xl">
                                <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                    Featured Equipment
                                </span>
                                <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                    Available Listings
                                </h2>
                                <p className="mt-5 text-lg leading-8 text-neutral-600">
                                    Equipment currently available through Petra. Availability can move quickly, so use
                                    the inquiry CTA for current condition, location, and documentation.
                                </p>
                            </div>
                            <a
                                href="/sell-equipment"
                                className="inline-flex h-16 w-fit items-center justify-center border border-neutral-500 px-8 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                            >
                                Sell Equipment
                            </a>
                        </div>

                        {hasListings ? (
                            <>
                                <div data-polish-reveal className="mb-12 border border-[#dad5cb] bg-white p-6 shadow-[0_18px_45px_rgba(28,26,22,0.06)] sm:p-8">
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
                                        {filterControls.map((filter) => (
                                            <label key={filter.key} className="flex flex-col gap-2">
                                                <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                                    {filter.label}
                                                </span>
                                                <select
                                                    value={filters[filter.key]}
                                                    onChange={(event) =>
                                                        setFilters((current) => ({ ...current, [filter.key]: event.target.value }))
                                                    }
                                                    className="h-12 border border-[#dad5cb] bg-[#f3f1ec] px-3 pr-9 font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950 outline-none transition-colors duration-200 hover:border-[#a56437]/60 focus:border-[#a56437]"
                                                >
                                                    <option value="">All {filter.label}</option>
                                                    {filter.options.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex flex-col gap-4 border-t border-[#dad5cb] pt-5 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                                            Showing {filteredListings.length} of {listings.length} listings
                                        </p>
                                        {hasActiveFilters && (
                                            <button
                                                type="button"
                                                onClick={() => setFilters(emptyFilters)}
                                                className="inline-flex h-11 w-fit items-center justify-center border border-neutral-500 px-6 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                                            >
                                                Reset Filters
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredListings.map((listing) => {
                                        const specs = [listing.manufacturer, listing.year, listing.capacity].filter(Boolean).join(' · ');

                                        return (
                                            <Link
                                                key={listing.public_id}
                                                href={listing.href}
                                                data-polish-reveal
                                                className="group flex flex-col overflow-hidden border border-[#dad5cb] bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#a56437] hover:shadow-[0_18px_40px_rgba(28,26,22,0.12)]"
                                            >
                                                <figure className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
                                                    <img
                                                        src={listing.image_url}
                                                        alt={`${listing.title} — used oilfield equipment listed with Petra.`}
                                                        loading="lazy"
                                                        onError={fallbackToPlaceholder}
                                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
                                                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                                                        <span className="bg-[#a56437] px-2.5 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white">
                                                            {listing.category}
                                                        </span>
                                                        {listing.featured && (
                                                            <span className="bg-neutral-950 px-2.5 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span
                                                        className={`absolute right-3 top-3 px-2.5 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.08em] ${availabilityPill[listing.status_tone] ?? availabilityPill.neutral}`}
                                                    >
                                                        {listing.availability}
                                                    </span>
                                                    <span className="absolute bottom-3 right-3 font-heading text-[0.65rem] font-semibold tracking-[0.08em] text-white/70">
                                                        {listing.public_id}
                                                    </span>
                                                </figure>

                                                <div className="flex flex-1 flex-col p-5">
                                                    <span className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#a56437]">
                                                        {listing.city ? `${listing.region} — ${listing.city}` : listing.region}
                                                    </span>
                                                    <h3 className="mt-2 line-clamp-2 font-heading text-xl font-semibold uppercase leading-tight tracking-[0.04em] text-neutral-950">
                                                        {listing.title}
                                                    </h3>
                                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{listing.description}</p>

                                                    {specs && (
                                                        <p className="mt-4 line-clamp-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                                                            {specs}
                                                        </p>
                                                    )}

                                                    <span className="mt-auto flex items-center gap-2 pt-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors group-hover:text-neutral-950">
                                                        View Details
                                                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                                                            →
                                                        </span>
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>

                                {filteredListings.length === 0 && (
                                    <div className="border border-[#dad5cb] bg-white p-8 text-center">
                                        <p className="text-lg leading-8 text-neutral-600">
                                            No listed equipment matches those filters right now.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setFilters(emptyFilters)}
                                            className="mt-6 inline-flex h-12 items-center justify-center border border-neutral-500 px-8 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                                        >
                                            Reset Filters
                                        </button>
                                    </div>
                                )}

                                <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-8 text-neutral-600">
                                    If you see equipment that matches your needs, reach out early. High-quality assets move fast.
                                </p>
                            </>
                        ) : (
                            <div className="border border-[#dad5cb] bg-white p-10 text-center sm:p-16">
                                <h3 className="font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl">
                                    New inventory is added regularly
                                </h3>
                                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
                                    Tell us what you're looking for and Petra will source it through regional networks,
                                    operator relationships, and surplus yards.
                                </p>
                                <a
                                    href="/request-equipment"
                                    className="mt-8 inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                                >
                                    Request Equipment
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
