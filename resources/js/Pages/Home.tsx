import { Head } from '@inertiajs/react';
import CoverageMap from '../Components/coverage-map';
import { AccentIcon, CategoryIcon, FeatureIcon } from '../Components/home-icons';
import homeData from '../data/home.json';

type HomeProps = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { heroImage, stats, featureItems, categories, processSteps, inventoryItems, states } = homeData;
const pageTitle = 'Petra | Used Oilfield & Industrial Equipment Brokerage';
const pageDescription =
    'Petra connects real buyers and sellers of used oilfield and industrial equipment across Wyoming, the Rockies, the Bakken, and surrounding producing regions.';

export default function Home({ canonicalUrl, ogImageUrl }: HomeProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${canonicalUrl}#organization`,
                name: 'Petra',
                url: canonicalUrl,
                description: 'Used oilfield and industrial equipment brokerage serving Wyoming, the Rockies, and surrounding producing regions.',
                areaServed: ['Wyoming', 'Rockies', 'Bakken', 'North Dakota', 'Colorado', 'Utah', 'New Mexico', 'Montana'],
                knowsAbout: [
                    'Used oilfield equipment',
                    'Industrial equipment brokerage',
                    'Equipment sourcing',
                    'Asset liquidation',
                    'Equipment valuation',
                ],
            },
            {
                '@type': 'WebSite',
                '@id': `${canonicalUrl}#website`,
                name: 'Petra',
                url: canonicalUrl,
                publisher: {
                    '@id': `${canonicalUrl}#organization`,
                },
                description: pageDescription,
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

            <main className="w-full">
                <section
                    className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 px-5 py-20 text-center text-white sm:px-10"
                    style={{
                        backgroundImage: `url('${heroImage}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="absolute inset-0 grayscale" aria-hidden="true" />
                    <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

                    <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
                        <div className="mb-8 flex flex-wrap justify-center gap-4">
                            <span className="border border-white/30 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white/80">
                                Used Oilfield Equipment
                            </span>
                            <span className="border border-white/30 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white/80">
                                Industrial Brokerage
                            </span>
                        </div>

                        <h1 className="font-hero text-[2.65rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-white sm:text-[3.25rem] lg:text-[4rem]">
                            <span className="block sm:whitespace-nowrap">Got Equipment Sitting Idle</span>
                            <span className="block text-[#b06b3d]">Out in the Field?</span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-base font-medium leading-7 text-white/80 sm:text-lg">
                            Petra helps you move equipment faster without the runaround. We connect real buyers and
                            sellers of used oilfield and industrial equipment across Wyoming, the Rockies, and
                            surrounding producing regions.
                        </p>

                        <div className="mt-12 flex w-full max-w-xs flex-col gap-4">
                            <a
                                href="/inventory"
                                className="flex h-16 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                            >
                                See Available Equipment
                            </a>
                            <a
                                href="/sell-equipment"
                                className="flex h-16 items-center justify-center border border-white/50 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10"
                            >
                                Sell Your Equipment
                            </a>
                        </div>
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-5 py-20 text-center sm:px-10 md:grid-cols-4 lg:py-24">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col">
                                <span className="font-heading text-[2.6rem] font-normal uppercase leading-none tracking-[0.03em] text-[#a56437] lg:text-[2.85rem]">
                                    {stat.value}
                                </span>
                                <span className="mt-3 font-heading text-xl font-normal uppercase tracking-[0.08em] text-neutral-700">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-[#dad5cb] bg-white py-8">
                        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-5 sm:px-10 lg:flex-row lg:items-center">
                            <h3 className="font-heading text-base font-semibold tracking-[0.08em] text-neutral-600 lg:whitespace-nowrap">
                                No auctions. No guessing games. No wasted time.
                            </h3>

                            <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:gap-10">
                                {featureItems.map((item) => (
                                    <div key={item.label} className="flex items-center gap-3">
                                        <FeatureIcon type={item.icon} className="h-5 w-5 shrink-0" />
                                        <span className="font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 lg:whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#f3f1ec] py-28 sm:py-36 lg:py-40">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-16 text-center sm:mb-24">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Equipment Types
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                What We Actually Deal With
                            </h2>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
                                If it runs in the field, processes product, or moves production, we probably handle it.
                            </p>
                            <div className="mt-6 flex justify-center">
                                <a className="border-b border-[#a56437] pb-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437] transition-colors hover:border-neutral-950 hover:text-neutral-950" href="/inventory">
                                    Browse Equipment
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            {categories.map((category) => (
                                <a key={category.label} href="/inventory" className="group relative h-[500px] cursor-pointer overflow-hidden bg-neutral-950">
                                    <div
                                        className="absolute inset-0 bg-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                        style={{
                                            backgroundImage: `url('${heroImage}')`,
                                            backgroundPosition: category.imagePosition,
                                        }}
                                        aria-hidden="true"
                                    />
                                    <div className="absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/25" aria-hidden="true" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" aria-hidden="true" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-end p-10">
                                        <div className="translate-y-4 transition-transform group-hover:translate-y-0">
                                            <CategoryIcon type={category.icon} />
                                        </div>
                                        <h4 className="mt-4 font-heading text-xl font-semibold uppercase tracking-[0.08em] text-white">
                                            {category.label}
                                        </h4>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-y border-[#dad5cb] bg-white py-28 sm:py-36 lg:py-40">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-20 text-center sm:mb-28">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Simple Version
                            </span>
                            <h2 className="mt-4 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                How Petra Works
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="absolute left-0 top-8 hidden h-px w-full bg-[#dad5cb] md:block" aria-hidden="true" />
                            <div className="relative z-10 grid grid-cols-1 gap-12 text-center md:grid-cols-5">
                                {processSteps.map((step, index) => (
                                    <div key={step.number} className="flex flex-col items-center gap-8">
                                        <div
                                            className={`flex h-16 w-16 items-center justify-center font-heading text-2xl font-semibold ${
                                                index === 0
                                                    ? 'bg-[#a56437] text-white'
                                                    : 'border border-[#dad5cb] bg-white text-neutral-950'
                                            }`}
                                        >
                                            {step.number}
                                        </div>
                                        <div>
                                            <h3 className="mb-3 font-heading text-xl font-semibold uppercase tracking-[0.06em] text-neutral-950">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm leading-6 text-neutral-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#f3f1ec] py-28 sm:py-36 lg:py-40">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-16 flex flex-col items-center justify-between gap-6 text-center md:mb-24 md:flex-row md:items-end md:text-left">
                            <div>
                                <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                    Featured Equipment
                                </span>
                                <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                    Real Equipment. Real Listings.
                                </h2>
                                <p className="mt-4 text-lg text-neutral-600">
                                    Browse what is currently available or contact us if you're looking for something specific.
                                </p>
                            </div>
                            <a href="/inventory" className="border border-neutral-500 px-8 py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white">
                                View Equipment
                            </a>
                        </div>

                        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
                            {inventoryItems.map((item) => (
                                <article key={item.id} className="group border border-[#dad5cb] bg-white transition-colors duration-500 hover:border-[#a56437]">
                                    <div className="relative h-72 overflow-hidden bg-black">
                                        <div
                                            className="absolute inset-0 bg-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                            style={{ backgroundImage: `url('${heroImage}')`, backgroundPosition: item.imagePosition }}
                                            aria-hidden="true"
                                        />
                                        <div
                                            className={`absolute left-0 top-0 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-[0.08em] ${
                                                item.badgeStyle === 'outline'
                                                    ? 'border border-[#a56437] bg-white/90 text-[#a56437]'
                                                    : item.badgeStyle === 'primary'
                                                      ? 'bg-[#a56437] text-white'
                                                      : 'bg-neutral-500 text-white'
                                            }`}
                                        >
                                            {item.badge}
                                        </div>
                                        <div className="absolute bottom-4 right-4 border border-white/20 bg-black/50 px-2 py-1 font-heading text-sm font-semibold tracking-[0.08em] text-white/80 backdrop-blur-md">
                                            ID: {item.id}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="mb-6 border-b border-[#dad5cb] pb-4 font-heading text-2xl font-semibold uppercase tracking-[0.06em] text-neutral-950">
                                            {item.title}
                                        </h3>
                                        <div className="mb-8 grid grid-cols-2 gap-y-6">
                                            {item.specs.map(([label, value], index) => (
                                                <div key={label} className="flex flex-col">
                                                    <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                                                        {label}
                                                    </span>
                                                    <span className={`font-heading text-base font-semibold ${index === 3 ? 'text-[#a56437]' : 'text-neutral-950'}`}>
                                                        {value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="/contact" className="flex w-full items-center justify-center border border-[#dad5cb] bg-[#f3f1ec] py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white">
                                            Request Details
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-y border-[#dad5cb] bg-white">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 px-5 sm:px-10 md:grid-cols-2">
                        <div className="flex flex-col border-b border-[#dad5cb] py-28 md:border-b-0 md:border-r md:py-40 md:pr-20">
                            <div className="mb-10 flex items-center gap-4">
                                <AccentIcon type="sell" />
                                <div className="h-px flex-grow bg-[#dad5cb]" />
                            </div>
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Selling Equipment
                            </span>
                            <h2 className="mb-8 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950">
                                Sell Your Equipment
                            </h2>
                            <p className="mb-10 text-lg leading-8 text-neutral-600">
                                Most companies do not lose money because the equipment is bad. They lose money because
                                it sits too long, nobody markets it properly, or it is only shown to a small local
                                network.
                            </p>
                            <ul className="mb-12 space-y-6">
                                <li className="flex items-start gap-4">
                                    <FeatureIcon type="check" className="mt-0.5 h-5 w-5" />
                                    <span>Get equipment in front of active buyers.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <FeatureIcon type="check" className="mt-0.5 h-5 w-5" />
                                    <span>Price it based on actual market movement, not guesswork.</span>
                                </li>
                            </ul>
                            <a href="/sell-equipment" className="mt-auto inline-flex h-16 w-fit items-center self-start bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90">
                                Sell Equipment
                            </a>
                        </div>

                        <div className="flex flex-col py-28 md:py-40 md:pl-20">
                            <div className="mb-10 flex items-center gap-4">
                                <div className="h-px flex-grow bg-[#dad5cb]" />
                                <AccentIcon type="search" />
                            </div>
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Looking for Equipment
                            </span>
                            <h2 className="mb-8 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950">
                                Request Equipment
                            </h2>
                            <p className="mb-10 text-lg leading-8 text-neutral-600">
                                Most buyers do not need more listings. They need the right size, the right spec, the
                                right condition, and someone who actually knows where to find it.
                            </p>
                            <ul className="mb-12 space-y-6">
                                <li className="flex items-start gap-4">
                                    <FeatureIcon type="check" className="mt-0.5 h-5 w-5" />
                                    <span>Tell us what you're trying to source.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <FeatureIcon type="check" className="mt-0.5 h-5 w-5" />
                                    <span>We work our network and come back with real options.</span>
                                </li>
                            </ul>
                            <a href="/contact" className="mt-auto inline-flex h-16 w-fit items-center self-start border border-neutral-950 px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white">
                                Request Equipment
                            </a>
                        </div>
                    </div>
                </section>

                <section className="bg-[#f3f1ec] py-28 sm:py-36 lg:py-40">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-5 sm:px-10 md:grid-cols-12">
                        <div className="md:col-span-5">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#a56437]">
                                Service Area
                            </span>
                            <h2 className="mb-8 mt-6 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Where We Operate
                            </h2>
                            <p className="mb-12 text-lg leading-8 text-neutral-600">
                                We work across producing and industrial regions including Wyoming, the Bakken,
                                Colorado energy corridors, Utah, New Mexico, Montana, and regional surplus equipment
                                yards.
                            </p>
                            <div className="flex flex-col gap-6">
                                {states.map((state) => (
                                    <div key={state} className="group flex items-center gap-4 border-b border-[#dad5cb] pb-4">
                                        <div className="h-1.5 w-1.5 bg-[#a56437]" />
                                        <span className="font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors group-hover:text-[#a56437]">
                                            {state}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-[520px] overflow-hidden border border-[#dad5cb] bg-white md:col-span-7 lg:h-[650px]">
                            <CoverageMap />
                            <div className="pointer-events-none absolute inset-0 bg-white/20" aria-hidden="true" />
                            <div className="pointer-events-none absolute inset-6 border border-[#dad5cb]" aria-hidden="true" />
                        </div>
                    </div>
                </section>

                <section className="border-t border-[#dad5cb] bg-[#1c1a16] py-32 text-center text-white sm:py-40 lg:py-48">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <span className="mb-6 block font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#a56437]">
                            Let's Connect
                        </span>
                        <h2 className="mb-10 font-heading text-4xl font-bold uppercase tracking-[0.12em] text-white sm:text-6xl">
                            Let's Move Something
                        </h2>
                        <p className="mx-auto mb-16 max-w-2xl text-lg leading-8 text-white/80">
                            If you've got equipment to sell or you're trying to source something for a job, just reach
                            out. We'll tell you straight up if we can help or not.
                        </p>
                        <div className="flex flex-col justify-center gap-6 md:flex-row md:gap-8">
                            <a href="/contact" className="inline-flex h-16 items-center justify-center bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 sm:px-16">
                                Talk to a Broker
                            </a>
                            <a href="/inventory" className="inline-flex h-16 items-center justify-center border border-white/50 px-12 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10 sm:px-16">
                                Browse Equipment
                            </a>
                        </div>
                    </div>
                </section>
            </main>

        </>
    );
}
