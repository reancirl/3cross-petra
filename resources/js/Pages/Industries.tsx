import { Head } from '@inertiajs/react';
import { FeatureIcon } from '../Components/home-icons';
import industriesData from '../data/industries.json';

type IndustriesProps = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { heroImage, industries, signals, regions, faqs } = industriesData;
const pageTitle = 'Industries | Petra';
const pageDescription =
    'Petra works across producing and industrial regions including Wyoming, the Bakken, Colorado energy corridors, Utah, New Mexico, Montana, and regional surplus equipment yards.';
const docIndustries = [
    'Oil & Gas Production',
    'Midstream Operations',
    'Gas Processing',
    'Drilling Contractors',
    'Energy Services Companies',
    'Industrial Yards',
    'Power Generation',
];

export default function Industries({ canonicalUrl, ogImageUrl }: IndustriesProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${canonicalUrl}#industries`,
                name: 'Industries',
                url: canonicalUrl,
                description: pageDescription,
                about: [
                    'Wyoming oilfields',
                    'North Dakota Bakken',
                    'Colorado energy corridors',
                    'Utah and New Mexico producing regions',
                    'Montana industrial yards',
                    'Regional surplus equipment yards and private sellers',
                ],
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'Petra',
                    url: canonicalUrl.replace(/\/industries$/, ''),
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: canonicalUrl.replace(/\/industries$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Industries',
                        item: canonicalUrl,
                    },
                ],
            },
            /*
            Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
            {
                '@type': 'FAQPage',
                '@id': `${canonicalUrl}#faq`,
                mainEntity: faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer,
                    },
                })),
            },
            */
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
                <meta property="og:image:alt" content="Oilfield and industrial equipment yard represented by Petra." />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={ogImageUrl} />

                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Head>

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24">
                        <div>
                            {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                            <div className="mb-7 flex flex-wrap gap-3">
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]">
                                    Industry Coverage
                                </span>
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                                    Producing Regions
                                </span>
                            </div>
                            */}

                            <h1 className="max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]">
                                Industries
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                We work across producing and industrial regions including Wyoming, the Bakken, Colorado
                                energy corridors, Utah, New Mexico, Montana, and regional surplus equipment yards.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="/equipment"
                                    className="inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                                >
                                    View Equipment
                                </a>
                                <a
                                    href="/services"
                                    className="inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                                >
                                    View Services
                                </a>
                            </div>
                        </div>

                        {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                        <figure className="relative min-h-[300px] overflow-hidden border border-[#dad5cb] bg-neutral-950 lg:min-h-[420px]">
                            <img
                                src={heroImage}
                                alt="Oilfield and industrial equipment yard serving Petra industry markets."
                                className="absolute inset-0 h-full w-full object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
                            <figcaption className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-black/55 p-6 backdrop-blur-sm">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#b06b3d]">
                                    Field Reality First
                                </span>
                                <p className="mt-2 text-sm leading-6 text-white/75">
                                    Industry fit depends on use case, condition, region, documentation, buyer demand, and logistics.
                                </p>
                            </figcaption>
                        </figure>
                        */}
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-[#1c1a16] text-white">
                    <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-10">
                        <div className="mx-auto mb-9 max-w-3xl text-center">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]">
                                Markets Served
                            </span>
                            <h2 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl">
                                Industries Petra Works In
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
                            {docIndustries.map((industry) => (
                                <article key={industry} className="bg-[#1c1a16] p-6 transition-colors hover:bg-[#24211c]">
                                    <div className="mb-5 h-1.5 w-1.5 bg-[#a56437]" />
                                    <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-white">
                                        {industry}
                                    </h3>
                                </article>
                            ))}
                        </div>

                        <p className="mx-auto mt-9 max-w-3xl text-center text-lg leading-8 text-white/75">
                            We understand how equipment is actually used in the field—not just how it's listed.
                        </p>
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14">
                        <div className="max-w-3xl lg:col-span-5">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Where We Operate
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Regional Markets Petra Knows
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-neutral-600">
                                If equipment is moving in these areas—we're usually already connected to it.
                            </p>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="border border-[#dad5cb] bg-white p-6 sm:p-8">
                                <div className="grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2">
                                    {[
                                        'Wyoming oilfields (Powder River, Jonah, Green River Basin)',
                                        'North Dakota (Bakken)',
                                        'Colorado energy corridors',
                                        'Utah & New Mexico producing regions',
                                        'Montana industrial yards',
                                        'Regional surplus equipment yards and private sellers',
                                    ].map((region) => (
                                        <article key={region} className="flex min-h-24 items-start gap-4 bg-white p-5">
                                            <FeatureIcon type="check" className="mt-1 h-5 w-5 shrink-0" />
                                            <h3 className="font-heading text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-950">
                                                {region}
                                            </h3>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Previous alternate industry grid existed here and remains commented out in case the client intentionally wanted the alternate copy.
                Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="border-b border-[#dad5cb] bg-[#1c1a16] text-white">
                    <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-10">
                        <div className="mx-auto mb-9 max-w-3xl text-center">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]">
                                Markets Served
                            </span>
                            <h2 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl">
                                Industries Petra Works In
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-4">
                            {industries.map((industry) => (
                                <article key={industry.title} className="bg-[#1c1a16] p-6 transition-colors hover:bg-[#24211c]">
                                    <div className="mb-5 h-1.5 w-1.5 bg-[#a56437]" />
                                    <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-white">
                                        {industry.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-6 text-white/65">{industry.summary}</p>
                                    <ul className="mt-6 space-y-3">
                                        {industry.equipment.map((item) => (
                                            <li key={item} className="flex items-center gap-3">
                                                <FeatureIcon type="check" className="h-4 w-4 shrink-0" />
                                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white/75">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                */}

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 max-w-3xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Market Signals
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                What Makes Equipment Move
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-3">
                            {signals.map((signal) => (
                                <article key={signal.title} className="bg-white p-7">
                                    <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                        {signal.title}
                                    </h3>
                                    <p className="mt-5 text-base leading-7 text-neutral-600">{signal.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                */}

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="bg-[#f3f1ec] py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
                        <div>
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Regional Coverage
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Basin and Yard Coverage
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-neutral-600">
                                Petra's industry coverage is regional by design. Equipment demand is tied to where it
                                sits, how quickly it can move, and who can use it next.
                            </p>
                        </div>

                        <aside className="grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-3">
                            {regions.map((region) => (
                                <div key={region} className="bg-white p-6">
                                    <div className="mb-5 h-1.5 w-1.5 bg-[#a56437]" />
                                    <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.1em] text-neutral-950">
                                        {region}
                                    </h3>
                                </div>
                            ))}
                        </aside>
                    </div>
                </section>
                */}

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="border-y border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 max-w-3xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Industry Questions
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Common Industry Questions
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-3">
                            {faqs.map((faq) => (
                                <article key={faq.question} className="bg-white p-7">
                                    <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                        {faq.question}
                                    </h3>
                                    <p className="mt-5 text-base leading-7 text-neutral-600">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                */}
            </main>
        </>
    );
}
