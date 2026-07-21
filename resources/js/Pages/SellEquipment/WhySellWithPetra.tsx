import { breadcrumbNode, PublicPageMeta, sellEquipmentServiceNode } from '../../Components/public-page-meta';
import {
    CardGrid,
    CheckList,
    FinalCta,
    PageHero,
    RichText,
    RichTextList,
    Section,
    SectionHeading,
} from '../../Components/sell-equipment-ui';
import content from '../../data/sell-equipment/why-sell-with-petra.json';

type Props = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { meta, hero, moreThanPosting, whatMakesDifferent, builtForWyoming, supportingOwners, rightFit, ourApproach, finalCta } =
    content;

export default function WhySellWithPetra({ canonicalUrl, ogImageUrl }: Props) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            sellEquipmentServiceNode(canonicalUrl, meta.description),
            breadcrumbNode(canonicalUrl, { name: 'Why Sell With Petra', url: canonicalUrl }),
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
                    <SectionHeading eyebrow="The Problem" title={moreThanPosting.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={moreThanPosting.intro} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                    <CheckList items={moreThanPosting.items} columns={2} />
                    <RichText value={moreThanPosting.outro} className="mt-8 max-w-3xl text-base leading-7 text-neutral-600" />
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Our Difference" title={whatMakesDifferent.title} />
                    <CardGrid items={whatMakesDifferent.items} columns={3} />
                    <RichText value={whatMakesDifferent.outro} className="mt-8 max-w-3xl text-base leading-7 text-neutral-600" />
                </Section>

                <Section background="dark">
                    <SectionHeading eyebrow="Regional Focus" title={builtForWyoming.title} tone="dark" />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={builtForWyoming.body} className="text-base leading-7 text-white/70 sm:text-lg" />
                    </div>
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Who We Serve" title={supportingOwners.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={supportingOwners.intro} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                    <CheckList items={supportingOwners.items} columns={3} />
                    <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-600">{supportingOwners.outro}</p>
                </Section>

                <Section background="cream">
                    <SectionHeading eyebrow="Fit Check" title={rightFit.title} />
                    <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">{rightFit.intro}</p>
                    <CheckList items={rightFit.items} columns={2} />
                    <RichText value={rightFit.outro} className="mt-8 max-w-3xl text-base leading-7 text-neutral-600" />
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Principles" title={ourApproach.title} />
                    <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">{ourApproach.intro}</p>
                    <CardGrid items={ourApproach.items.map((item) => ({ title: item.title, body: [item.body] }))} columns={2} />
                </Section>

                <FinalCta {...finalCta} />
            </main>
        </>
    );
}
