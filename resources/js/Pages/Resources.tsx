import { Head } from '@inertiajs/react';
import { FeatureIcon } from '../Components/home-icons';
import resourcesData from '../data/resources.json';

type ResourcesProps = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { intro, topics, note } = resourcesData;
const pageTitle = 'Resources | Petra';
const pageDescription =
    'Market insights and guides for buyers and sellers working in real equipment markets. Content is written for operators, not marketers.';

export default function Resources({ canonicalUrl, ogImageUrl }: ResourcesProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${canonicalUrl}#resources`,
                name: 'Market Insights & Guides',
                url: canonicalUrl,
                description: pageDescription,
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'Petra',
                    url: canonicalUrl.replace(/\/resources$/, ''),
                },
                about: topics,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: canonicalUrl.replace(/\/resources$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Resources',
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
                            <h1 className="max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]">
                                Market Insights &amp; Guides
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                {intro}
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
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14">
                        <div className="max-w-3xl lg:col-span-5">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Guides
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Topics Include
                            </h2>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="border border-[#dad5cb] bg-white p-6 sm:p-8">
                                <div className="grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2">
                                    {topics.map((topic) => (
                                        <article key={topic} className="flex min-h-24 items-start gap-4 bg-white p-5 sm:last:col-span-2">
                                            <FeatureIcon type="check" className="mt-1 h-5 w-5 shrink-0" />
                                            <h3 className="font-heading text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-950">
                                                {topic}
                                            </h3>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#1c1a16] text-white">
                    <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-10">
                        <p className="mx-auto max-w-3xl text-center text-lg leading-8 text-white/75">{note}</p>
                    </div>
                </section>
            </main>
        </>
    );
}
