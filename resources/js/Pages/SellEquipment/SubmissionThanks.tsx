import { breadcrumbNode, PublicPageMeta } from '../../Components/public-page-meta';
import { PrimaryButton, SecondaryButton } from '../../Components/sell-equipment-ui';
import content from '../../data/sell-equipment/equipment-submission.json';

type Props = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { confirmationPage } = content;

/**
 * Post-submission confirmation. Noindexed: it is a step in a flow, not a landing page, and
 * it would otherwise compete with the submission page in search results.
 */
export default function SubmissionThanks({ canonicalUrl, ogImageUrl }: Props) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [breadcrumbNode(canonicalUrl, { name: 'Thank You', url: canonicalUrl })],
    };

    return (
        <>
            <PublicPageMeta
                title={confirmationPage.meta.title}
                description={confirmationPage.meta.description}
                canonicalUrl={canonicalUrl}
                ogImageUrl={ogImageUrl}
                noindex
                structuredData={structuredData}
            />

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-28">
                        <div className="max-w-3xl">
                            <span className="mb-6 flex h-14 w-14 items-center justify-center bg-[#a56437] text-white">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="square" />
                                </svg>
                            </span>

                            <h1 className="font-hero text-[2.4rem] font-bold uppercase leading-[1.04] tracking-[0.08em] text-neutral-950 sm:text-[3.1rem]">
                                {confirmationPage.title}
                            </h1>

                            <div className="mt-6 space-y-4">
                                {confirmationPage.body.map((paragraph) => (
                                    <p key={paragraph} className="text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <PrimaryButton {...confirmationPage.primaryCta} />
                                <SecondaryButton {...confirmationPage.secondaryCta} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
