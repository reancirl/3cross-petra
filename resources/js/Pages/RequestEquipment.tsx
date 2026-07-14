import { Head } from '@inertiajs/react';
import { FeatureIcon } from '../Components/home-icons';
import requestEquipmentData from '../data/request-equipment.json';

type RequestEquipmentProps = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { heroImage, requestedAssets, processSteps, requirements, buyerBenefits, regions, faqs } = requestEquipmentData;
const pageTitle = 'Request Equipment | Petra Equipment Sourcing';
const pageDescription =
    'Most buyers do not need more listings. Petra helps source the right size, spec, condition, and equipment fit through people who know where to find it.';

export default function RequestEquipment({ canonicalUrl, ogImageUrl }: RequestEquipmentProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                '@id': `${canonicalUrl}#equipment-sourcing-service`,
                name: 'Used oilfield equipment sourcing for buyers',
                url: canonicalUrl,
                description: pageDescription,
                provider: {
                    '@type': 'Organization',
                    name: 'Petra',
                    url: canonicalUrl.replace(/\/request-equipment$/, ''),
                },
                areaServed: regions,
                serviceType: 'Used oilfield and industrial equipment sourcing',
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: canonicalUrl.replace(/\/request-equipment$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Request Equipment',
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
                <meta property="og:image:alt" content="Oilfield equipment yard represented by Petra for equipment sourcing." />

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
                                    Procurement Service
                                </span>
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                                    Specific Asset Sourcing
                                </span>
                            </div>
                            */}

                            <h1 className="max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]">
                                Request Equipment
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                Looking for specific equipment? We source directly through regional networks instead of
                                relying only on listings.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="#buyer-request"
                                    className="inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                                >
                                    Submit Request
                                </a>
                                <a
                                    href="/equipment"
                                    className="inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                                >
                                    View Equipment
                                </a>
                            </div>
                        </div>

                        {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                        <figure className="relative min-h-[300px] overflow-hidden border border-[#dad5cb] bg-neutral-950 lg:min-h-[420px]">
                            <img
                                src={heroImage}
                                alt="Used oilfield equipment yard for buyers sourcing through Petra."
                                className="absolute inset-0 h-full w-full object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
                            <figcaption className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-black/55 p-6 backdrop-blur-sm">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#b06b3d]">
                                    Buyer Focus
                                </span>
                                <p className="mt-2 text-sm leading-6 text-white/75">
                                    Sourcing is reviewed against specs, site fit, condition, documentation, timing, and logistics.
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
                                Equipment Requests
                            </span>
                            <h2 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl">
                                What We Help Source
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-3 lg:grid-cols-5">
                            {requestedAssets.map((assetType) => (
                                <div key={assetType} className="bg-[#1c1a16] p-5 text-center transition-colors hover:bg-[#24211c]">
                                    <div className="mx-auto mb-4 h-1.5 w-1.5 bg-[#a56437]" />
                                    <h3 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-white">
                                        {assetType}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 max-w-3xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Sourcing Process
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                How Petra Sources Equipment
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-2 lg:grid-cols-5">
                            {processSteps.map((step) => (
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

                <section id="buyer-request" className="bg-[#f3f1ec] py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14">
                        <div className="max-w-3xl lg:col-span-5">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Buyer Requirements
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                What to Include
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-neutral-600">
                                The more of this you can share up front, the faster we can work the network:
                            </p>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="border border-[#dad5cb] bg-white p-6 sm:p-8">
                                <div className="grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2">
                                    {requirements.map((requirement) => (
                                        <article key={requirement} className="flex min-h-24 items-start gap-4 bg-white p-5">
                                            <FeatureIcon type="check" className="mt-1 h-5 w-5 shrink-0" />
                                            <h3 className="font-heading text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-950">
                                                {requirement}
                                            </h3>
                                        </article>
                                    ))}
                                </div>

                                <p className="mt-6 border-t border-[#dad5cb] pt-6 text-lg leading-8 text-neutral-600">
                                    Tell us what you're trying to source.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section id="buyer-request-creative" className="bg-[#f3f1ec] py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
                        <div>
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Build the Request
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                What Petra Needs From a Buyer
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-neutral-600">
                                The tighter the request, the faster Petra can separate real options from poor fits. We
                                care about specs, field use, location, documentation, and timing.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-5">
                                {buyerBenefits.map((benefit) => (
                                    <article key={benefit.title} className="border border-[#dad5cb] bg-white p-6">
                                        <div className="mb-5 flex items-center gap-4">
                                            <FeatureIcon type="check" className="h-5 w-5 shrink-0" />
                                            <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                                {benefit.title}
                                            </h3>
                                        </div>
                                        <p className="text-base leading-7 text-neutral-600">{benefit.description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <aside className="border border-[#dad5cb] bg-white p-8">
                            <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                Buyer Checklist
                            </h2>
                            <p className="mt-4 text-base leading-7 text-neutral-600">
                                Use this list to prepare a request that can be sourced and verified quickly.
                            </p>

                            <ul className="mt-8 space-y-5">
                                {requirements.map((requirement) => (
                                    <li key={requirement} className="flex items-start gap-4 border-b border-[#dad5cb] pb-5 last:border-b-0 last:pb-0">
                                        <FeatureIcon type="check" className="mt-0.5 h-5 w-5 shrink-0" />
                                        <span className="text-base leading-7 text-neutral-700">{requirement}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 border border-[#dad5cb] bg-[#f3f1ec] p-6">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-[#a56437]">
                                    Next Step
                                </span>
                                <p className="mt-3 text-base leading-7 text-neutral-700">
                                    Prepare the target spec and timing. Petra can then review active listings, seller
                                    relationships, and regional equipment movement against the request.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>
                */}

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="border-y border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 max-w-3xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Buyer Questions
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Common Sourcing Questions
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
