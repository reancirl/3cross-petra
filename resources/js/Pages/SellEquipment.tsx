import { Head } from '@inertiajs/react';
import { FeatureIcon } from '../Components/home-icons';
import sellEquipmentData from '../data/sell-equipment.json';

type SellEquipmentProps = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { heroImage, assetTypes, processSteps, requirements, sellerBenefits, faqs } = sellEquipmentData;
const pageTitle = 'Sell Your Equipment | Petra Equipment Brokerage';
const pageDescription =
    'Got equipment sitting in a yard or out in the field? Petra helps you turn unused oilfield and industrial equipment into real buyers.';

export default function SellEquipment({ canonicalUrl, ogImageUrl }: SellEquipmentProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                '@id': `${canonicalUrl}#sell-equipment-service`,
                name: 'Used oilfield equipment brokerage for sellers',
                url: canonicalUrl,
                description: pageDescription,
                provider: {
                    '@type': 'Organization',
                    name: 'Petra',
                    url: canonicalUrl.replace(/\/sell-equipment$/, ''),
                },
                areaServed: ['Wyoming', 'Rockies', 'Bakken', 'North Dakota', 'Colorado', 'Utah', 'New Mexico', 'Montana'],
                serviceType: 'Used oilfield and industrial equipment brokerage',
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: canonicalUrl.replace(/\/sell-equipment$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Sell Equipment',
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
                <meta property="og:image:alt" content="Oilfield equipment yard represented by Petra for used equipment sellers." />

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
                                    Divestment Support
                                </span>
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                                    Brokerage First
                                </span>
                            </div>
                            */}

                            <h1 className="max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]">
                                Sell Your Equipment
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                Got equipment sitting in a yard or out in the field? We help you turn unused oilfield
                                and industrial equipment into real buyers.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="#seller-intake"
                                    className="inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                                >
                                    Submit Equipment
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
                                alt="Used oilfield equipment yard for sellers working with Petra brokerage."
                                className="absolute inset-0 h-full w-full object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
                            <figcaption className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-black/55 p-6 backdrop-blur-sm">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#b06b3d]">
                                    Seller Focus
                                </span>
                                <p className="mt-2 text-sm leading-6 text-white/75">
                                    Equipment is reviewed for condition, market fit, documentation, buyer relevance, and logistics.
                                </p>
                            </figcaption>
                        </figure>
                        */}
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-[#f3f1ec] py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="max-w-4xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Reality Check
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Most equipment doesn't fail to sell because it's bad.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-neutral-600">
                                It fails because:
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-3">
                            {["nobody is actively marketing it", "it's stuck in a small network", "or pricing isn't aligned with the market"].map((item) => (
                                <article key={item} className="bg-white p-7">
                                    <FeatureIcon type="check" className="mb-6 h-5 w-5" />
                                    <p className="text-lg leading-8 text-neutral-700">{item}</p>
                                </article>
                            ))}
                        </div>

                        <p className="mt-10 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                            We fix that.
                        </p>
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-[#1c1a16] text-white">
                    <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-10">
                        <div className="mx-auto mb-9 max-w-3xl text-center">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]">
                                What You Can Send
                            </span>
                            <h2 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl">
                                What You Can Send
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4">
                            {assetTypes.map((assetType) => (
                                <div key={assetType} className="bg-[#1c1a16] p-5 text-center transition-colors hover:bg-[#24211c]">
                                    <div className="mx-auto mb-4 h-1.5 w-1.5 bg-[#a56437]" />
                                    <h3 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-white">
                                        {assetType}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        <p className="mx-auto mt-9 max-w-3xl text-center text-lg leading-8 text-white/70">
                            If you're not sure it's sellable—send it anyway.
                        </p>
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 max-w-3xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Seller Process
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                How Petra Handles a Sale
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

                <section id="seller-intake" className="bg-[#f3f1ec] py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 max-w-3xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Submit Equipment
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                What We Need
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2 lg:grid-cols-5">
                            {requirements.map((requirement) => (
                                <article key={requirement} className="bg-white p-7">
                                    <FeatureIcon type="check" className="mb-6 h-5 w-5" />
                                    <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                        {requirement}
                                    </h3>
                                </article>
                            ))}
                        </div>

                        <p className="mt-10 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                            We don't let equipment sit. If it can move, we move it.
                        </p>
                    </div>
                </section>

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section id="seller-intake-creative" className="bg-[#f3f1ec] py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
                        <div>
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Start the Review
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                What Petra Needs From a Seller
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-neutral-600">
                                The first review does not need to be perfect. Clear basics are enough to decide whether
                                the equipment is a fit for brokerage and which buyers may care.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-5">
                                {sellerBenefits.map((benefit) => (
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
                                Seller Checklist
                            </h2>
                            <p className="mt-4 text-base leading-7 text-neutral-600">
                                Gather what you have. Missing details can be resolved during review.
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
                                    Send the available information through your broker contact, or use this checklist to
                                    prepare the asset package before outreach.
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
                                Seller Questions
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Common Sale Questions
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
