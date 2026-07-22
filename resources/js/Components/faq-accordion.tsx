import { useId, useState } from 'react';

export type Faq = {
    question: string;
    answer: string;
};

/**
 * FAQPage structured data for a set of question/answer pairs.
 *
 * Answers are always present in the rendered DOM (the accordion hides collapsed panels with
 * the `hidden` attribute rather than unmounting them), so this node describes markup that
 * genuinely exists on the page.
 */
export function faqPageNode(canonicalUrl: string, faqs: Faq[]) {
    return {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/**
 * Accessible disclosure list. Each question is an aria-expanded button controlling its own
 * panel, and any number can be open at once — readers comparing two answers should not have
 * one close as they open the other.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
    const [openQuestions, setOpenQuestions] = useState<string[]>([]);
    const baseId = useId();

    const toggle = (question: string) =>
        setOpenQuestions((current) =>
            current.includes(question) ? current.filter((item) => item !== question) : [...current, question],
        );

    return (
        <div className="border-t border-[#dad5cb]">
            {faqs.map((faq, index) => {
                const isOpen = openQuestions.includes(faq.question);
                const buttonId = `${baseId}-q-${index}`;
                const panelId = `${baseId}-a-${index}`;

                return (
                    <div key={faq.question} className="border-b border-[#dad5cb]">
                        <h3>
                            <button
                                type="button"
                                id={buttonId}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggle(faq.question)}
                                className="flex w-full items-start justify-between gap-6 bg-transparent py-6 text-left transition-colors hover:text-[#a56437]"
                            >
                                <span className="font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950 sm:text-xl">
                                    {faq.question}
                                </span>
                                <span
                                    aria-hidden="true"
                                    className={`mt-1 shrink-0 text-[#a56437] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="square" />
                                    </svg>
                                </span>
                            </button>
                        </h3>

                        {/* Hidden, not unmounted: the answer stays in the DOM for crawlers and in-page search. */}
                        <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
                            <p className="pb-6 pr-10 text-base leading-7 text-neutral-600">{faq.answer}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
