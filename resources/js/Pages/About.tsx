import { Head } from '@inertiajs/react';
import { FeatureIcon } from '../Components/home-icons';
import aboutData from '../data/about.json';

type AboutProps = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { intro, beliefs, region } = aboutData;
const pageTitle = 'About | Petra';
const pageDescription =
    'Petra was built because equipment markets are fragmented and inefficient. Good equipment often sits idle while buyers struggle to find reliable sources. We bridge that gap.';

export default function About({ canonicalUrl, ogImageUrl }: AboutProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'AboutPage',
                '@id': `${canonicalUrl}#about`,
                name: 'About Petra',
                url: canonicalUrl,
                description: pageDescription,
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'Petra',
                    url: canonicalUrl.replace(/\/about$/, ''),
                },
                about: {
                    '@type': 'Organization',
                    name: 'Petra',
                    description: 'Used oilfield and industrial equipment brokerage.',
                    areaServed: region,
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
                        item: canonicalUrl.replace(/\/about$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'About',
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
                                About Petra
                            </h1>

                            <div className="mt-6 max-w-3xl space-y-4">
                                {intro.map((paragraph) => (
                                    <p key={paragraph} className="text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="/contact"
                                    className="inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                                >
                                    Talk to a Broker
                                </a>
                                <a
                                    href="/equipment"
                                    className="inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                                >
                                    Browse Equipment
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-[#1c1a16] text-white">
                    <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-10">
                        <div className="mx-auto mb-9 max-w-3xl text-center">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]">
                                Our Standards
                            </span>
                            <h2 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl">
                                What We Believe
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
                            {beliefs.map((belief) => (
                                <article key={belief} className="bg-[#1c1a16] p-6 transition-colors hover:bg-[#24211c]">
                                    <div className="mb-5 h-1.5 w-1.5 bg-[#a56437]" />
                                    <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-white">
                                        {belief}
                                    </h3>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14">
                        <div className="max-w-3xl lg:col-span-5">
                            <span className="mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Coverage
                            </span>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                                Region
                            </h2>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="border border-[#dad5cb] bg-white p-6 sm:p-8">
                                <div className="flex items-start gap-4">
                                    <FeatureIcon type="check" className="mt-1 h-5 w-5 shrink-0" />
                                    <p className="text-lg leading-8 text-neutral-700">{region}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
