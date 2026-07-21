import { FaqAccordion, faqPageNode } from '../../Components/faq-accordion';
import { breadcrumbNode, PublicPageMeta, sellEquipmentServiceNode } from '../../Components/public-page-meta';
import {
    CardGrid,
    CheckList,
    FinalCta,
    PageHero,
    RichTextList,
    Section,
    SectionHeading,
} from '../../Components/sell-equipment-ui';
import content from '../../data/sell-equipment/upload-documents.json';

type Props = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { meta, hero, whyDocumentationMatters, recommendedDocuments, tips, notEveryDocument, faqSection, faqs, finalCta } =
    content;

export default function UploadDocuments({ canonicalUrl, ogImageUrl }: Props) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            sellEquipmentServiceNode(canonicalUrl, meta.description),
            breadcrumbNode(canonicalUrl, { name: 'Equipment Documentation Guide', url: canonicalUrl }),
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
                    <SectionHeading eyebrow="Why It Helps" title={whyDocumentationMatters.title} />
                    <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">
                        {whyDocumentationMatters.intro}
                    </p>
                    <CheckList items={whyDocumentationMatters.items} columns={2} />
                    <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-600">{whyDocumentationMatters.outro}</p>
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Document Checklist" title={recommendedDocuments.title} />
                    <CardGrid items={recommendedDocuments.items} columns={3} />
                </Section>

                <Section background="dark">
                    <SectionHeading eyebrow="Practical Tips" title={tips.title} tone="dark" />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={tips.intro} className="text-base leading-7 text-white/70 sm:text-lg" />
                    </div>
                    <ul className="mt-10 grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3">
                        {tips.items.map((tip) => (
                            <li key={tip} className="flex items-start gap-4 bg-[#1c1a16] p-5">
                                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[#a56437]" />
                                <span className="text-base leading-7 text-white/80">{tip}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 max-w-3xl text-base leading-7 text-white/70">{tips.outro}</p>
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="No Pressure" title={notEveryDocument.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={notEveryDocument.body} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                </Section>

                <Section background="cream">
                    <SectionHeading eyebrow="Questions" title={faqSection.title} />
                    <div className="mt-10 max-w-4xl">
                        <FaqAccordion faqs={faqs} />
                    </div>
                </Section>

                <FinalCta {...finalCta} />
            </main>
        </>
    );
}
