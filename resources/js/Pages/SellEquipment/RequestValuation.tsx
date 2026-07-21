import { FaqAccordion, faqPageNode } from '../../Components/faq-accordion';
import { breadcrumbNode, PublicPageMeta, sellEquipmentServiceNode } from '../../Components/public-page-meta';
import {
    CardGrid,
    CheckList,
    FinalCta,
    NumberedSteps,
    PageHero,
    RichText,
    RichTextList,
    Section,
    SectionHeading,
} from '../../Components/sell-equipment-ui';
import content from '../../data/sell-equipment/request-valuation.json';

type Props = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const {
    meta,
    hero,
    whyRequest,
    whatWeConsider,
    whatYoullNeed,
    afterYouRequest,
    whyDifferent,
    faqSection,
    faqs,
    finalCta,
    valuationNotice,
} = content;

export default function RequestValuation({ canonicalUrl, ogImageUrl }: Props) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            sellEquipmentServiceNode(canonicalUrl, meta.description),
            breadcrumbNode(canonicalUrl, { name: 'Request Equipment Valuation', url: canonicalUrl }),
            faqPageNode(canonicalUrl, faqs),
        ],
    };

    return (
        <>
            <PublicPageMeta
                title={meta.title}
                description={meta.description}
                canonicalUrl={canonicalUrl}
                ogImageUrl={ogImageUrl}
                structuredData={structuredData}
            />

            <main className="w-full bg-[#f3f1ec]">
                <PageHero {...hero} />

                <Section background="cream">
                    <SectionHeading eyebrow="Why Ask" title={whyRequest.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={whyRequest.intro} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                    <CheckList items={whyRequest.items} columns={2} />
                    <RichText value={whyRequest.outro} className="mt-8 max-w-3xl text-base leading-7 text-neutral-600" />
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Our Review" title={whatWeConsider.title} />
                    <CardGrid items={whatWeConsider.items} columns={3} />
                    <RichText value={whatWeConsider.outro} className="mt-8 max-w-3xl text-base leading-7 text-neutral-600" />
                </Section>

                <Section background="cream">
                    <SectionHeading eyebrow="Preparation" title={whatYoullNeed.title} />
                    <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">{whatYoullNeed.intro}</p>
                    <CheckList items={whatYoullNeed.items} columns={3} />
                    <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-600">{whatYoullNeed.outro}</p>
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="What Happens Next" title={afterYouRequest.title} />
                    <NumberedSteps steps={afterYouRequest.steps.map((step) => ({ text: step }))} />
                    <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-600">{afterYouRequest.outro}</p>
                    <RichText value={afterYouRequest.processLink} className="mt-4 max-w-3xl text-base leading-7 text-neutral-600" />
                </Section>

                <Section background="dark">
                    <SectionHeading eyebrow="Our Approach" title={whyDifferent.title} tone="dark" />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={whyDifferent.body} className="text-base leading-7 text-white/70 sm:text-lg" />
                    </div>
                </Section>

                <Section background="cream">
                    <SectionHeading eyebrow="Questions" title={faqSection.title} />
                    <div className="mt-10 max-w-4xl">
                        <FaqAccordion faqs={faqs} />
                        <RichText value={faqSection.outro} className="mt-8 text-base leading-7 text-neutral-600" />
                    </div>
                </Section>

                <FinalCta {...finalCta} />

                {/* Required disclaimer: these valuations are brokerage opinions, not certified appraisals. */}
                <aside className="border-t border-[#dad5cb] bg-[#f3f1ec]">
                    <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-10">
                        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                            {valuationNotice.title}
                        </h2>
                        <p className="mt-3 max-w-4xl text-sm leading-6 text-neutral-500">{valuationNotice.body}</p>
                    </div>
                </aside>
            </main>
        </>
    );
}
