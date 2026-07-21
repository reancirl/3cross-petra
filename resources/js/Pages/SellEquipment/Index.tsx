import { FaqAccordion, faqPageNode } from '../../Components/faq-accordion';
import { breadcrumbNode, PublicPageMeta, sellEquipmentServiceNode } from '../../Components/public-page-meta';
import {
    CheckList,
    FinalCta,
    NumberedSteps,
    PageHero,
    RichText,
    RichTextList,
    Section,
    SectionHeading,
    PrimaryButton,
} from '../../Components/sell-equipment-ui';
import content from '../../data/sell-equipment/index.json';

type Props = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const {
    meta,
    hero,
    workingCapital,
    whyEquipmentDoesNotSell,
    equipmentYouCanSell,
    whatWeNeed,
    process,
    valuation,
    faqSection,
    faqs,
    finalCta,
} = content;

export default function SellEquipmentIndex({ canonicalUrl, ogImageUrl }: Props) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            sellEquipmentServiceNode(canonicalUrl, meta.description),
            breadcrumbNode(canonicalUrl),
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
                    <SectionHeading eyebrow="Working Capital" title={workingCapital.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={workingCapital.body} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                    <div className="mt-8">
                        <PrimaryButton {...workingCapital.cta} />
                    </div>
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Reality Check" title={whyEquipmentDoesNotSell.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList
                            items={whyEquipmentDoesNotSell.intro}
                            className="text-base leading-7 text-neutral-600 sm:text-lg"
                        />
                    </div>
                    <CheckList items={whyEquipmentDoesNotSell.reasons} columns={2} />
                    <p className="mt-8 max-w-3xl font-heading text-xl font-semibold uppercase tracking-[0.06em] text-neutral-950">
                        {whyEquipmentDoesNotSell.outro}
                    </p>
                </Section>

                <Section background="dark">
                    <SectionHeading eyebrow="What You Can Sell" title={equipmentYouCanSell.title} tone="dark" />
                    <p className="mt-6 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">{equipmentYouCanSell.intro}</p>

                    <div className="mt-10 grid grid-cols-2 gap-px bg-white/15 md:grid-cols-3 lg:grid-cols-4">
                        {equipmentYouCanSell.items.map((item) => (
                            <div key={item} className="bg-[#1c1a16] p-5 transition-colors hover:bg-[#24211c]">
                                <div className="mb-4 h-1.5 w-1.5 bg-[#a56437]" />
                                <h3 className="font-heading text-base font-semibold uppercase tracking-[0.06em] text-white">
                                    {item}
                                </h3>
                            </div>
                        ))}
                    </div>

                    <RichText value={equipmentYouCanSell.outro} className="mt-10 max-w-3xl text-base leading-7 text-white/70" />
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Submit Equipment" title={whatWeNeed.title} />
                    <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">{whatWeNeed.intro}</p>
                    <CheckList items={whatWeNeed.items} columns={3} />
                    <RichText value={whatWeNeed.outro} className="mt-8 max-w-3xl text-base leading-7 text-neutral-600" />
                </Section>

                <Section background="cream">
                    <SectionHeading eyebrow="Seller Process" title={process.title} />
                    <NumberedSteps steps={process.steps.map((step) => ({ title: step.title, text: step.body }))} />
                    <div className="mt-10">
                        <PrimaryButton {...process.cta} />
                    </div>
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Valuation" title={valuation.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={valuation.body} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                    <RichText value={valuation.outro} className="mt-6 max-w-3xl text-base leading-7 text-neutral-600" />
                </Section>

                <Section background="cream">
                    <SectionHeading eyebrow="Questions" title={faqSection.title} />
                    <div className="mt-10 max-w-4xl">
                        <FaqAccordion faqs={faqs} />
                        <RichText value={faqSection.outro} className="mt-8 text-base leading-7 text-neutral-600" />
                    </div>
                </Section>

                <FinalCta {...finalCta} />
            </main>
        </>
    );
}
