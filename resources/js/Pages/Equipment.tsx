import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { CategoryIcon, FeatureIcon } from '../Components/home-icons';
import equipmentData from '../data/equipment.json';

type EquipmentProps = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { heroImage, categories, listings, regions } = equipmentData;
type FilterKey = 'category' | 'condition' | 'location' | 'manufacturer' | 'availability';

const emptyFilters: Record<FilterKey, string> = {
    category: '',
    condition: '',
    location: '',
    manufacturer: '',
    availability: '',
};

const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
const primaryCategories = categories.slice(0, 4);
const additionalCategories = categories.slice(4);
const categoryIconType = (slug: string) =>
    slug === 'separators' ? 'loader' : slug === 'tank-batteries' ? 'dozer' : slug === 'pump-packages' ? 'compaction' : 'tool';

const pageTitle = 'Used Oilfield Equipment Marketplace | Petra';
const pageDescription =
    'Browse used oilfield and industrial equipment handled by Petra, including compressors, separators, tank batteries, and pump packages across Wyoming, the Rockies, and the Bakken.';

export default function Equipment({ canonicalUrl, ogImageUrl }: EquipmentProps) {
    const [filters, setFilters] = useState<Record<FilterKey, string>>(emptyFilters);
    const hasActiveFilters = Object.values(filters).some(Boolean);
    const filterOptions = useMemo(
        () => ({
            category: categories.map((category) => category.name),
            condition: unique(listings.map((listing) => listing.condition)),
            location: unique(listings.map((listing) => listing.location)),
            manufacturer: unique(listings.map((listing) => listing.manufacturer)),
            availability: unique(listings.map((listing) => listing.status)),
        }),
        [],
    );
    const filterControls: { key: FilterKey; label: string; options: string[] }[] = [
        { key: 'category', label: 'Category', options: filterOptions.category },
        { key: 'condition', label: 'Condition', options: filterOptions.condition },
        { key: 'location', label: 'Location', options: filterOptions.location },
        { key: 'manufacturer', label: 'Manufacturer', options: filterOptions.manufacturer },
        { key: 'availability', label: 'Availability', options: filterOptions.availability },
    ];
    const filteredListings = listings.filter((listing) => {
        return (
            (!filters.category || listing.category === filters.category) &&
            (!filters.condition || listing.condition === filters.condition) &&
            (!filters.location || listing.location === filters.location) &&
            (!filters.manufacturer || listing.manufacturer === filters.manufacturer) &&
            (!filters.availability || listing.status === filters.availability)
        );
    });
    const handleCategorySelect = (categoryName: string) => {
        setFilters((current) => ({
            ...current,
            category: categoryName,
        }));

        document.getElementById('featured-equipment')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

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
                about: categories.map((category) => category.name),
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: canonicalUrl.replace(/\/equipment$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Equipment',
                        item: canonicalUrl,
                    },
                ],
            },
            {
                '@type': 'ItemList',
                '@id': `${canonicalUrl}#featured-equipment`,
                name: 'Featured used oilfield equipment',
                itemListElement: listings.map((listing, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@type': 'Product',
                        name: listing.name,
                        category: listing.category,
                        description: listing.description,
                        identifier: listing.id,
                        brand: {
                            '@type': 'Brand',
                            name: listing.manufacturer,
                        },
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

                            {/* TODO(client-confirm): Content doc specifies hero heading "Available Equipment" and body "Real equipment currently available through Petra brokerage network. Inventory changes quickly—availability is subject to market movement." Current copy appears to be a broader creative rewrite, so leave it until client sign-off. */}
                            <h1 className="max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.4rem] lg:text-[4.2rem]">
                                Used Oilfield Equipment
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                Browse representative listings, active categories, and broker-reviewed used oilfield
                                equipment across Wyoming, the Rockies, the Bakken, and surrounding producing regions.
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

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="border-b border-[#dad5cb] bg-[#1c1a16] text-white">
                    <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24">
                        TODO(client-confirm): Sitemap also names "Pumps" and "Tanks"; those may duplicate existing "Pump Packages" and "Tank Batteries" groupings, so they are not added as separate cards until confirmed.
                        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(280px,0.38fr)_minmax(0,1fr)] lg:items-start">
                            <div className="lg:sticky lg:top-8">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]">
                                    What Gets Listed
                                </span>
                                <h2 className="mt-4 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-white sm:text-5xl">
                                    Equipment Categories
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-white/65">
                                    Core marketplace categories stay prominent, with broader network categories grouped
                                    below for quick scanning.
                                </p>
                                <div className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
                                    <span className="font-heading text-5xl font-semibold uppercase leading-none tracking-[0.04em] text-[#b06b3d]">
                                        {categories.length}
                                    </span>
                                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
                                        Equipment categories tracked
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {primaryCategories.map((category) => (
                                        <button
                                            key={category.slug}
                                            type="button"
                                            onClick={() => handleCategorySelect(category.name)}
                                            className={`group min-h-[260px] border p-7 text-left transition-colors hover:border-[#a56437] hover:bg-[#24211c] focus:outline-none focus-visible:border-[#a56437] focus-visible:ring-2 focus-visible:ring-[#a56437]/40 ${
                                                filters.category === category.name
                                                    ? 'border-[#a56437] bg-[#24211c]'
                                                    : 'border-white/15 bg-[#201d19]'
                                            }`}
                                        >
                                            <div className="mb-7 flex items-start justify-between gap-5">
                                                <CategoryIcon type={categoryIconType(category.slug)} />
                                                <span className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                                                    {category.count}
                                                </span>
                                            </div>
                                            <h3 className="font-heading text-3xl font-semibold uppercase leading-none tracking-[0.08em] text-white">
                                                {category.name}
                                            </h3>
                                            <p className="mt-5 text-sm leading-6 text-white/65">{category.summary}</p>
                                        </button>
                                    ))}
                                </div>

                                <div id="additional-network-categories" className="mt-7 border-t border-white/15 pt-7">
                                    <h3 className="mb-5 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white/60">
                                        Additional Network Categories
                                    </h3>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
                                        {additionalCategories.map((category) => (
                                            <button
                                                key={category.slug}
                                                type="button"
                                                onClick={() => handleCategorySelect(category.name)}
                                                className={`group text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a56437]/40 ${
                                                    filters.category === category.name ? 'text-[#d59a72]' : 'text-white'
                                                }`}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <span
                                                        className={`h-1.5 w-1.5 shrink-0 transition-colors ${
                                                            filters.category === category.name
                                                                ? 'bg-[#d59a72]'
                                                                : 'bg-white/25 group-hover:bg-[#a56437]'
                                                        }`}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="font-heading text-base font-semibold uppercase tracking-[0.08em] group-hover:text-[#d59a72]">
                                                        {category.name}
                                                    </span>
                                                </span>
                                                <span className="mt-2 block pl-4 text-sm leading-6 text-white/50 group-hover:text-white/70">
                                                    {category.summary}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                */}

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
                        <p className="font-heading text-base font-semibold tracking-[0.08em] text-neutral-600">
                            Field-use information visible upfront. No hidden modal-only specs.
                        </p>
                        <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap lg:gap-10">
                            {['Availability Status', 'Condition Notes', 'Regional Fit'].map((label) => (
                                <div key={label} className="flex items-center gap-3">
                                    <FeatureIcon type="check" className="h-5 w-5 shrink-0" />
                                    <span className="font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                */}

                <section id="featured-equipment" className="py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-3xl">
                                <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                    Featured Equipment
                                </span>
                                <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                    Representative Listings
                                </h2>
                                <p className="mt-5 text-lg leading-8 text-neutral-600">
                                    These listings show the type of equipment Petra handles. Availability can move
                                    quickly, so use the inquiry CTA for current condition, location, and documentation.
                                </p>
                            </div>
                            <a
                                href="/sell-equipment"
                                className="inline-flex h-16 w-fit items-center justify-center border border-neutral-500 px-8 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                            >
                                Sell Equipment
                            </a>
                        </div>

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
                                                setFilters((current) => ({
                                                    ...current,
                                                    [filter.key]: event.target.value,
                                                }))
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

                        <div className="space-y-8">
                            {filteredListings.map((listing) => (
                                <article
                                    key={listing.id}
                                    data-polish-reveal
                                    className="listing-transition group grid grid-cols-1 overflow-hidden border border-[#dad5cb] bg-white transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-[#a56437] hover:shadow-[0_24px_55px_rgba(28,26,22,0.12)] lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]"
                                >
                                    <figure className="relative min-h-[260px] overflow-hidden bg-neutral-950 sm:min-h-[330px] lg:min-h-[390px]">
                                        <img
                                            src={heroImage}
                                            alt={`${listing.name} represented in Petra's used oilfield equipment marketplace.`}
                                            loading="lazy"
                                            className="image-lift absolute inset-0 h-full w-full object-cover opacity-95"
                                            style={{ objectPosition: listing.imagePosition }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                                        <div className="absolute left-4 top-4 bg-[#a56437] px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-white">
                                            {listing.category}
                                        </div>
                                        <figcaption className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-4">
                                            <span className="max-w-xl font-heading text-2xl font-semibold uppercase leading-none tracking-[0.06em] text-white sm:text-3xl">
                                                {listing.name}
                                            </span>
                                            <span className="border border-white/20 bg-black/50 px-2 py-1 font-heading text-xs font-semibold tracking-[0.08em] text-white/80 backdrop-blur-md">
                                                ID: {listing.id}
                                            </span>
                                        </figcaption>
                                    </figure>

                                    <div className="flex flex-col p-6 sm:p-8">
                                        <div className="mb-5 flex flex-wrap items-center gap-3">
                                            <span className="bg-[#f3f1ec] px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437]">
                                                {listing.status}
                                            </span>
                                            <span className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
                                                {listing.location}
                                            </span>
                                        </div>

                                        <h3 className="font-heading text-2xl font-semibold uppercase leading-tight tracking-[0.06em] text-neutral-950 sm:text-3xl">
                                            {listing.name}
                                        </h3>
                                        <p className="mt-4 text-base leading-7 text-neutral-600">
                                            {listing.description}
                                        </p>

                                        <dl className="my-6 grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2">
                                            {[
                                                ['Condition', listing.condition],
                                                ['Manufacturer', listing.manufacturer],
                                                ['Year', listing.year],
                                                ['Capacity', listing.capacity],
                                                ['Status', listing.status],
                                                ['Region', listing.location],
                                            ].map(([label, value]) => (
                                                <div key={label} className="bg-white p-4">
                                                    <dt className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
                                                        {label}
                                                    </dt>
                                                    <dd className="mt-1 font-heading text-sm font-semibold text-neutral-950">
                                                        {value}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>

                                        <a
                                            href={`/equipment/${listing.id}`}
                                            className="mt-auto flex h-14 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                                        >
                                            Request Details
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {filteredListings.length === 0 && (
                            <div className="border border-[#dad5cb] bg-white p-8 text-center">
                                <p className="text-lg leading-8 text-neutral-600">
                                    No listed equipment matches those filters right now.
                                </p>
                            </div>
                        )}

                        <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-8 text-neutral-600">
                            If you see equipment that matches your needs, reach out early. High-quality assets move fast.
                        </p>
                    </div>
                </section>

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="border-y border-[#dad5cb] bg-white py-28 sm:py-36 lg:py-40">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-5 sm:px-10 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Regional Reach
                            </span>
                            <h2 className="mt-4 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Built Around Producing Regions
                            </h2>
                            <p className="mt-8 text-lg leading-8 text-neutral-600">
                                Petra works where equipment actually moves: Wyoming, the Rockies, the Bakken, North
                                Dakota, Colorado, Utah, New Mexico, Montana, and surrounding industrial yards.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
                            {regions.map((region) => (
                                <div key={region} className="border border-[#dad5cb] bg-[#f3f1ec] p-6">
                                    <div className="mb-5 h-1.5 w-1.5 bg-[#a56437]" />
                                    <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.1em] text-neutral-950">
                                        {region}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                */}

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="bg-[#1c1a16] py-32 text-center text-white sm:py-40">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <span className="mb-6 block font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#a56437]">
                            Need a Specific Asset?
                        </span>
                        <h2 className="mx-auto max-w-4xl font-heading text-4xl font-bold uppercase tracking-[0.1em] text-white sm:text-6xl">
                            Send the Spec. We Will Tell You What Is Real.
                        </h2>
                        <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-white/80">
                            If the exact unit is not listed publicly, Petra can source through broker relationships,
                            field operators, surplus yards, and verified regional sellers.
                        </p>
                        <div className="mt-14 flex flex-col justify-center gap-6 md:flex-row md:gap-8">
                            <a
                                href="/request-equipment"
                                className="inline-flex h-16 items-center justify-center bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 sm:px-16"
                            >
                                Request Equipment
                            </a>
                            <a
                                href="/sell-equipment"
                                className="inline-flex h-16 items-center justify-center border border-white/50 px-12 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10 sm:px-16"
                            >
                                Sell Equipment
                            </a>
                        </div>
                    </div>
                </section>
                */}
            </main>
        </>
    );
}
