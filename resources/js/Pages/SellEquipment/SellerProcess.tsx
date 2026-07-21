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
} from '../../Components/sell-equipment-ui';
import content from '../../data/sell-equipment/seller-process.json';

type Props = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { meta, hero, process, whyStructured, faqSection, faqs, finalCta } = content;

export default function SellerProcess({ canonicalUrl, ogImageUrl }: Props) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            sellEquipmentServiceNode(canonicalUrl, meta.description),
            breadcrumbNode(canonicalUrl, { name: 'Seller Process', url: canonicalUrl }),
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

                <Section background="white">
                    <SectionHeading eyebrow="Step by Step" title={process.title} />
                    <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">{process.intro}</p>
                    <RichText value={process.introLink} className="mt-4 max-w-3xl text-base leading-7 text-neutral-600" />
                    <NumberedSteps steps={process.steps} />
                </Section>

                <Section background="cream">
                    <SectionHeading eyebrow="Why It Matters" title={whyStructured.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={whyStructured.intro} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                    <CheckList items={whyStructured.items} columns={2} />
                    <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-600">{whyStructured.outro}</p>
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Questions" title={faqSection.title} />
                    <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">{faqSection.intro}</p>
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
