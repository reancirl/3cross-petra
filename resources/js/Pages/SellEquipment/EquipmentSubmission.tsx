import { FaqAccordion, faqPageNode } from '../../Components/faq-accordion';
import { breadcrumbNode, PublicPageMeta, sellEquipmentServiceNode } from '../../Components/public-page-meta';
import PublicSubmissionForm, { type PublicLocationOption } from '../../Components/public-submission-form';
import {
    FinalCta,
    NumberedSteps,
    PageHero,
    RichText,
    RichTextList,
    Section,
    SectionHeading,
    SecondaryButton,
} from '../../Components/sell-equipment-ui';
import content from '../../data/sell-equipment/equipment-submission.json';

type Props = {
    canonicalUrl: string;
    ogImageUrl: string;
    categoryOptions: Record<string, string>;
    locationOptions: PublicLocationOption[];
    conditionOptions: Record<string, string>;
    ownershipOptions: Record<string, string>;
    intentOptions: Record<string, string>;
    availabilityOptions: Record<string, string>;
    valueRangeOptions: Record<string, string>;
};

const { meta, hero, whatToInclude, afterYouSubmit, form, faqSection, faqs, needAssistance, finalCta } = content;

export default function EquipmentSubmission({
    canonicalUrl,
    ogImageUrl,
    categoryOptions,
    locationOptions,
    conditionOptions,
    ownershipOptions,
    intentOptions,
    availabilityOptions,
    valueRangeOptions,
}: Props) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            sellEquipmentServiceNode(canonicalUrl, meta.description),
            breadcrumbNode(canonicalUrl, { name: 'Equipment Submission', url: canonicalUrl }),
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
                    <SectionHeading eyebrow="Before You Start" title={whatToInclude.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={whatToInclude.body} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-2 lg:grid-cols-3">
                        {whatToInclude.groups.map((group) => (
                            <article key={group.title} className="bg-white p-7">
                                <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                    {group.title}
                                </h3>

                                <div className="mt-4 space-y-3">
                                    <RichTextList items={group.intro} className="text-base leading-7 text-neutral-600" />
                                </div>

                                <ul className="mt-4 space-y-2">
                                    {group.items.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-base leading-7 text-neutral-700">
                                            <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 bg-[#a56437]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <p className="mt-4 text-base leading-7 text-neutral-600">{group.outro}</p>

                                {'guideLink' in group && group.guideLink ? (
                                    <a
                                        href={group.guideLink.href}
                                        className="mt-4 inline-block font-semibold text-[#a56437] underline underline-offset-4 transition-colors hover:text-neutral-950"
                                    >
                                        {group.guideLink.label}
                                    </a>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </Section>

                <PublicSubmissionForm
                    categoryOptions={categoryOptions}
                    locationOptions={locationOptions}
                    conditionOptions={conditionOptions}
                    ownershipOptions={ownershipOptions}
                    intentOptions={intentOptions}
                    availabilityOptions={availabilityOptions}
                    valueRangeOptions={valueRangeOptions}
                    copy={form}
                />

                <Section background="white">
                    <SectionHeading eyebrow="After Submitting" title={afterYouSubmit.title} />
                    <NumberedSteps steps={afterYouSubmit.steps.map((step) => ({ text: step }))} />
                    <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-600">{afterYouSubmit.outro}</p>
                </Section>

                <Section background="cream">
                    <SectionHeading eyebrow="Questions" title={faqSection.title} />
                    <div className="mt-10 max-w-4xl">
                        <FaqAccordion faqs={faqs} />
                    </div>
                </Section>

                <Section background="white">
                    <SectionHeading eyebrow="Talk First" title={needAssistance.title} />
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichTextList items={needAssistance.body} className="text-base leading-7 text-neutral-600 sm:text-lg" />
                    </div>
                    <div className="mt-8">
                        <SecondaryButton {...needAssistance.cta} />
                    </div>
                </Section>

                <FinalCta
                    title={finalCta.title}
                    body={finalCta.body}
                    primaryCta={finalCta.primaryCta}
                >
                    <div className="mt-6 max-w-3xl space-y-4">
                        <RichText value={finalCta.valuationPrompt} className="text-base leading-7 text-white/70" />
                        <RichText value={finalCta.questionsPrompt} className="text-base leading-7 text-white/70" />
                    </div>
                </FinalCta>
            </main>
        </>
    );
}
