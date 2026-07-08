import { Head } from '@inertiajs/react';
import { FeatureIcon } from '../Components/home-icons';
import servicesData from '../data/services.json';

type ServicesProps = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { heroImage, services, workflow, regions, faqs } = servicesData;
const pageTitle = 'Oilfield Equipment Brokerage Services | Petra';
const pageDescription =
    'Petra provides used oilfield and industrial equipment brokerage, sourcing, market review, and logistics coordination across Wyoming, the Rockies, and producing regions.';

export default function Services({ canonicalUrl, ogImageUrl }: ServicesProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                '@id': `${canonicalUrl}#equipment-brokerage-services`,
                name: 'Oilfield equipment brokerage services',
                url: canonicalUrl,
                description: pageDescription,
                provider: {
                    '@type': 'Organization',
                    name: 'Petra',
                    url: canonicalUrl.replace(/\/services$/, ''),
                },
                areaServed: regions,
                serviceType: services.map((service) => service.title),
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Petra equipment brokerage services',
                    itemListElement: services.map((service) => ({
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: service.title,
                            description: service.summary,
                        },
                    })),
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
                        item: canonicalUrl.replace(/\/services$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Services',
                        item: canonicalUrl,
                    },
                ],
            },
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
                <meta property="og:image:alt" content="Oilfield equipment yard represented by Petra brokerage services." />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={ogImageUrl} />

                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Head>

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:py-24">
                        <div>
                            <div className="mb-7 flex flex-wrap gap-3">
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]">
                                    Brokerage Services
                                </span>
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                                    Field-Aware Support
                                </span>
                            </div>

                            <h1 className="max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]">
                                Oilfield Equipment Brokerage Services
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                Petra helps buyers and sellers move used oilfield and industrial equipment through
                                practical brokerage, sourcing, market review, and deal coordination.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="/sell-equipment"
                                    className="inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                                >
                                    Sell Equipment
                                </a>
                                <a
                                    href="/request-equipment"
                                    className="inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                                >
                                    Request Equipment
                                </a>
                            </div>
                        </div>

                        <figure className="relative min-h-[300px] overflow-hidden border border-[#dad5cb] bg-neutral-950 lg:min-h-[420px]">
                            <img
                                src={heroImage}
                                alt="Oilfield equipment yard showing assets supported by Petra brokerage services."
                                className="absolute inset-0 h-full w-full object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
                            <figcaption className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-black/55 p-6 backdrop-blur-sm">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#b06b3d]">
                                    No Auction Runaround
                                </span>
                                <p className="mt-2 text-sm leading-6 text-white/75">
                                    Brokerage support built around equipment fit, buyer relevance, documentation, and logistics.
                                </p>
                            </figcaption>
                        </figure>
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-[#1c1a16] text-white">
                    <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-10">
                        <div className="mx-auto mb-9 max-w-3xl text-center">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]">
                                Service Lines
                            </span>
                            <h2 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl">
                                How Petra Supports Equipment Deals
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-4">
                            {services.map((service) => (
                                <article key={service.title} className="bg-[#1c1a16] p-6 transition-colors hover:bg-[#24211c]">
                                    <div className="mb-5 h-1.5 w-1.5 bg-[#a56437]" />
                                    <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-white">
                                        {service.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-6 text-white/65">{service.summary}</p>
                                    <ul className="mt-6 space-y-3">
                                        {service.details.map((detail) => (
                                            <li key={detail} className="flex items-center gap-3">
                                                <FeatureIcon type="check" className="h-4 w-4 shrink-0" />
                                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white/75">
                                                    {detail}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 max-w-3xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Workflow
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                From Equipment Review to Deal Support
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-4">
                            {workflow.map((step) => (
                                <article key={step.number} className="bg-white p-7">
                                    <span className="font-heading text-3xl font-semibold uppercase tracking-[0.05em] text-[#a56437]">
                                        {step.number}
                                    </span>
                                    <h3 className="mt-8 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                        {step.title}
                                    </h3>
                                    <p className="mt-4 text-base leading-7 text-neutral-600">{step.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-[#f3f1ec] py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
                        <div>
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Regional Fit
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Built Around Producing Regions
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-neutral-600">
                                Petra works where used equipment actually moves: producing basins, regional yards,
                                industrial surplus channels, and operator networks.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="/equipment"
                                    className="inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                                >
                                    View Equipment
                                </a>
                                <a
                                    href="/request-equipment"
                                    className="inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                                >
                                    Source Equipment
                                </a>
                            </div>
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

                <section className="border-y border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 max-w-3xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Service Questions
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Common Brokerage Questions
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
            </main>
        </>
    );
}
