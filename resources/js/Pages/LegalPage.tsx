import { Head } from '@inertiajs/react';
import legalPages from '../data/legal-pages.json';

type LegalPageKey = keyof typeof legalPages;

type LegalPageProps = {
    pageKey: LegalPageKey;
    canonicalUrl: string;
};

export default function LegalPage({ pageKey, canonicalUrl }: LegalPageProps) {
    const page = legalPages[pageKey];

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        url: canonicalUrl,
        description: page.description,
    };

    return (
        <>
            <Head title={page.metaTitle}>
                <meta name="description" content={page.description} />
                <link rel="canonical" href={canonicalUrl} />
                <meta name="robots" content="noindex, follow" />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Head>

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto max-w-[960px] px-5 py-20 sm:px-10 lg:py-24">
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                            {page.eyebrow}
                        </span>
                        <h1 className="mt-5 font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem]">
                            {page.title}
                        </h1>
                        <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                            {page.intro}
                        </p>
                        <p className="mt-5 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
                            Last updated July 8, 2026
                        </p>
                    </div>
                </section>

                <section className="py-16 sm:py-20">
                    <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-px bg-[#dad5cb] px-5 sm:px-10">
                        {page.sections.map((section) => (
                            <article key={section.heading} className="bg-white p-7 sm:p-8">
                                <h2 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                    {section.heading}
                                </h2>
                                <p className="mt-4 text-base leading-7 text-neutral-600">{section.body}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
