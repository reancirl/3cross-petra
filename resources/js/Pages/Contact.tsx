import { Head } from '@inertiajs/react';
import { FeatureIcon } from '../Components/home-icons';

type ContactProps = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const pageTitle = "Contact Petra | Let's Move Something";
const pageDescription =
    "If you've got equipment to sell or you're trying to source something for a job, reach out. Petra will tell you straight up if we can help or not.";

const contactTopics = [
    'Selling used oilfield or industrial equipment',
    'Sourcing a specific compressor, separator, tank battery, pump package, or surplus asset',
    'Reviewing condition, documentation, logistics, or regional fit',
    'Discussing buyer demand across Wyoming, the Rockies, the Bakken, and nearby producing regions',
];

const nextSteps = [
    'Tell us whether you are selling, sourcing, or evaluating equipment.',
    'Include the equipment type, location, condition, and relevant specs.',
    'Share photos, serial plates, documents, timing, and deal constraints when available.',
    'Petra will review whether the opportunity is a fit for brokerage or sourcing support.',
];

export default function Contact({ canonicalUrl, ogImageUrl }: ContactProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ContactPage',
                '@id': `${canonicalUrl}#contact`,
                name: 'Contact Petra',
                url: canonicalUrl,
                description: pageDescription,
                about: ['Used oilfield equipment brokerage', 'Equipment sourcing', 'Industrial surplus equipment'],
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: canonicalUrl.replace(/\/contact$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Contact',
                        item: canonicalUrl,
                    },
                ],
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
                <meta property="og:image:alt" content="Oilfield equipment yard represented by Petra brokerage." />

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
                                    Contact
                                </span>
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                                    Broker Review
                                </span>
                            </div>
                            */}

                            <h1 className="max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]">
                                Let's Move Something
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                If you've got equipment to sell or you're trying to source something for a job, just
                                reach out. We'll tell you straight up if we can help or not.
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

                        {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                        <aside className="border border-[#dad5cb] bg-[#f3f1ec] p-8">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]">
                                Useful Context
                            </span>
                            <ul className="mt-7 space-y-5">
                                {contactTopics.map((topic) => (
                                    <li key={topic} className="flex items-start gap-4 border-b border-[#dad5cb] pb-5 last:border-b-0 last:pb-0">
                                        <FeatureIcon type="check" className="mt-0.5 h-5 w-5 shrink-0" />
                                        <span className="text-base leading-7 text-neutral-700">{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                        */}
                    </div>
                </section>

                {/* Commented out pending client confirmation — not in original content doc. See 2026-07-08 audit.
                <section className="border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                        <div className="mb-12 max-w-3xl">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Before Outreach
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                What to Have Ready
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-4">
                            {nextSteps.map((step, index) => (
                                <article key={step} className="bg-white p-7">
                                    <span className="font-heading text-3xl font-semibold uppercase tracking-[0.05em] text-[#a56437]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <p className="mt-8 text-base leading-7 text-neutral-600">{step}</p>
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
