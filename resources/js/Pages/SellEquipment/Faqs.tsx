import { FaqAccordion, faqPageNode } from '../../Components/faq-accordion';
import { breadcrumbNode, PublicPageMeta, sellEquipmentServiceNode } from '../../Components/public-page-meta';
import { FinalCta, PageHero, RichText, Section, SectionHeading } from '../../Components/sell-equipment-ui';
import content from '../../data/sell-equipment/faqs.json';

type Props = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { meta, hero, groups, finalCta } = content;

/** Every group's questions, flattened — the FAQPage node describes the whole page. */
const allFaqs = groups.flatMap((group) => group.faqs);

export default function SellEquipmentFaqs({ canonicalUrl, ogImageUrl }: Props) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            sellEquipmentServiceNode(canonicalUrl, meta.description),
            breadcrumbNode(canonicalUrl, { name: 'Sell Equipment FAQs', url: canonicalUrl }),
            faqPageNode(canonicalUrl, allFaqs),
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

                {groups.map((group, index) => (
                    <Section key={group.title} background={index % 2 === 0 ? 'cream' : 'white'}>
                        <SectionHeading title={group.title} />

                        {'intro' in group && group.intro ? (
                            <RichText value={group.intro} className="mt-6 max-w-3xl text-base leading-7 text-neutral-600" />
                        ) : null}

                        <div className="mt-10 max-w-4xl">
                            <FaqAccordion faqs={group.faqs} />

                            {'outro' in group && group.outro ? (
                                <RichText value={group.outro} className="mt-8 text-base leading-7 text-neutral-600" />
                            ) : null}
                        </div>
                    </Section>
                ))}

                <FinalCta title={finalCta.title} body={finalCta.body} primaryCta={finalCta.primaryCta} secondaryCta={finalCta.secondaryCta}>
                    <p className="mt-6 text-base leading-7 text-white/70">
                        <a
                            href={finalCta.smallLink.href}
                            className="font-semibold text-[#d69a6c] underline underline-offset-4 transition-colors hover:text-white"
                        >
                            {finalCta.smallLink.label}
                        </a>
                    </p>
                </FinalCta>
            </main>
        </>
    );
}
