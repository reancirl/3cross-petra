import { FaqAccordion, faqPageNode } from '../../Components/faq-accordion';
import { breadcrumbNode, PublicPageMeta, siteOrigin } from '../../Components/public-page-meta';
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
import content from '../../data/sell-equipment/contact-broker.json';

type Props = {
    canonicalUrl: string;
    ogImageUrl: string;
};

const { meta, hero, whenToTalk, duringConversation, whatToHaveReady, whyOwnersChoose, faqSection, faqs, startConversation } =
    content;

export default function ContactBroker({ canonicalUrl, ogImageUrl }: Props) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ContactPage',
                '@id': `${canonicalUrl}#contact`,
                name: meta.title,
                url: canonicalUrl,
                description: meta.description,
                isPartOf: {
                    '@type': 'WebSite',
                    url: siteOrigin(canonicalUrl),
                },
            },
            breadcrumbNode(canonicalUrl, { name: 'Contact a Broker', url: canonicalUrl }),
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
                    <SectionHeading eyebrow="Good Reasons" title={whenToTalk.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={whenToTalk.intro} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                    <CardGrid items={whenToTalk.items} columns={3} />
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="No Pressure" title={duringConversation.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList
                            items={duringConversation.intro}
                            className="text-base leading-7 text-neutral-600 sm:text-lg"
                        />
                    </div>
                    <CheckList items={duringConversation.items} columns={2} />
                    <div className="mt-8 max-w-3xl space-y-4">
                        <RichTextList items={duringConversation.outro} className="text-base leading-7 text-neutral-600" />
                    </div>
                </Section>

                <Section background="cream">
                    <SectionHeading eyebrow="Preparation" title={whatToHaveReady.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={whatToHaveReady.intro} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                    <CheckList items={whatToHaveReady.items} columns={3} />
                    <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-600">{whatToHaveReady.outro}</p>
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Why Petra" title={whyOwnersChoose.title} />
                    <CardGrid items={whyOwnersChoose.items} columns={3} />
                </Section>

                {/* The Talk to a Broker form and its contact sidebar mount here — see Phase 6. */}

                <Section background="cream">
                    <SectionHeading eyebrow="Questions" title={faqSection.title} />
                    <div className="mt-10 max-w-4xl">
                        <FaqAccordion faqs={faqs} />
                        <RichText value={faqSection.outro} className="mt-8 text-base leading-7 text-neutral-600" />
                    </div>
                </Section>

                <FinalCta {...startConversation} />
            </main>
        </>
    );
}
