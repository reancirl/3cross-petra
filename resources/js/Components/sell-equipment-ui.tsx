import type { ReactNode } from 'react';
import { FeatureIcon } from './home-icons';

/**
 * Shared building blocks for the Sell Equipment section.
 *
 * The copy in resources/js/data/sell-equipment/*.json is transcribed verbatim from the
 * client's content doc, including its in-sentence cross-links. Those arrive as
 * {before, link, after} segments (plus a middle/secondLink pair where one sentence carries
 * two links); everything else is a plain string. RichText renders either shape.
 */

export type LinkRef = {
    label: string;
    href: string;
};

export type RichParagraph =
    | string
    | {
          before?: string;
          link?: LinkRef;
          middle?: string;
          secondLink?: LinkRef;
          after?: string;
      };

function InlineLink({ label, href }: LinkRef) {
    return (
        <a
            href={href}
            className="font-semibold text-[#a56437] underline underline-offset-4 transition-colors hover:text-neutral-950"
        >
            {label}
        </a>
    );
}

export function RichText({ value, className }: { value: RichParagraph; className?: string }) {
    if (typeof value === 'string') {
        return <p className={className}>{value}</p>;
    }

    return (
        <p className={className}>
            {value.before}
            {value.link ? <InlineLink {...value.link} /> : null}
            {value.middle}
            {value.secondLink ? <InlineLink {...value.secondLink} /> : null}
            {value.after}
        </p>
    );
}

export function RichTextList({ items, className }: { items: RichParagraph[]; className?: string }) {
    return (
        <>
            {items.map((item, index) => (
                <RichText key={index} value={item} className={className} />
            ))}
        </>
    );
}

/** Copper eyebrow + heading, the section opener used across the public site. */
export function SectionHeading({
    eyebrow,
    title,
    children,
    tone = 'light',
}: {
    eyebrow?: string;
    title: string;
    children?: ReactNode;
    tone?: 'light' | 'dark';
}) {
    return (
        <div className="max-w-3xl">
            {eyebrow ? (
                <span
                    className={`mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] ${
                        tone === 'dark' ? 'text-[#b06b3d]' : 'text-[#a56437]'
                    }`}
                >
                    {eyebrow}
                </span>
            ) : null}
            <h2
                className={`font-heading text-3xl font-bold uppercase tracking-[0.08em] sm:text-4xl ${
                    tone === 'dark' ? 'text-white' : 'text-neutral-950'
                }`}
            >
                {title}
            </h2>
            {children}
        </div>
    );
}

export function Section({
    children,
    background = 'cream',
    id,
}: {
    children: ReactNode;
    background?: 'cream' | 'white' | 'dark';
    id?: string;
}) {
    const backgrounds = {
        cream: 'border-b border-[#dad5cb] bg-[#f3f1ec]',
        white: 'border-b border-[#dad5cb] bg-white',
        dark: 'border-b border-[#dad5cb] bg-[#1c1a16] text-white',
    } as const;

    return (
        <section id={id} className={`${backgrounds[background]} py-16 sm:py-20 lg:py-24`}>
            <div className="mx-auto max-w-[1280px] px-5 sm:px-10">{children}</div>
        </section>
    );
}

export function PageHero({
    title,
    subtitle,
    body,
    primaryCta,
    secondaryCta,
}: {
    title: string;
    subtitle?: string;
    body: RichParagraph[];
    primaryCta?: LinkRef;
    secondaryCta?: LinkRef;
}) {
    return (
        <section className="border-b border-[#dad5cb] bg-white">
            <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-20 lg:py-24">
                <h1 className="max-w-4xl font-hero text-[2.4rem] font-bold uppercase leading-[1.04] tracking-[0.08em] text-neutral-950 sm:text-[3.1rem] lg:text-[3.8rem]">
                    {title}
                </h1>

                {subtitle ? (
                    <p className="mt-6 max-w-3xl font-heading text-xl font-semibold uppercase tracking-[0.06em] text-[#a56437] sm:text-2xl">
                        {subtitle}
                    </p>
                ) : null}

                <div className="mt-6 max-w-3xl space-y-4">
                    <RichTextList items={body} className="text-base font-medium leading-7 text-neutral-600 sm:text-lg" />
                </div>

                {primaryCta || secondaryCta ? (
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        {primaryCta ? <PrimaryButton {...primaryCta} /> : null}
                        {secondaryCta ? <SecondaryButton {...secondaryCta} /> : null}
                    </div>
                ) : null}
            </div>
        </section>
    );
}

export function PrimaryButton({ label, href }: LinkRef) {
    return (
        <a
            href={href}
            className="inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
        >
            {label}
        </a>
    );
}

export function SecondaryButton({ label, href, tone = 'light' }: LinkRef & { tone?: 'light' | 'dark' }) {
    return (
        <a
            href={href}
            className={
                tone === 'dark'
                    ? 'inline-flex h-14 items-center justify-center border border-white/40 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-neutral-950'
                    : 'inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white'
            }
        >
            {label}
        </a>
    );
}

/** Bulleted list rendered as check-marked rows. */
export function CheckList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 | 3 }) {
    const grid = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    } as const;

    return (
        <ul className={`mt-8 grid gap-px bg-[#dad5cb] ${grid[columns]}`}>
            {items.map((item) => (
                <li key={item} className="flex items-start gap-4 bg-white p-5">
                    <FeatureIcon type="check" className="mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-base leading-7 text-neutral-700">{item}</span>
                </li>
            ))}
        </ul>
    );
}

/** Numbered process steps. Handles the 5-step and 7-step layouts from the doc. */
export function NumberedSteps({
    steps,
}: {
    steps: { title?: string; body?: RichParagraph[]; items?: string[]; outro?: RichParagraph; text?: string }[];
}) {
    return (
        <ol className="mt-10 grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
                <li key={step.title ?? index} className="bg-white p-7">
                    <span className="font-heading text-3xl font-semibold uppercase tracking-[0.05em] text-[#a56437]">
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    {step.title ? (
                        <h3 className="mt-6 font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                            {step.title}
                        </h3>
                    ) : null}

                    {step.text ? <p className="mt-4 text-base leading-7 text-neutral-600">{step.text}</p> : null}

                    {step.body ? (
                        <div className="mt-4 space-y-3">
                            <RichTextList items={step.body} className="text-base leading-7 text-neutral-600" />
                        </div>
                    ) : null}

                    {step.items ? (
                        <ul className="mt-4 space-y-2">
                            {step.items.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-base leading-7 text-neutral-700">
                                    <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 bg-[#a56437]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {step.outro ? <RichText value={step.outro} className="mt-4 text-base leading-7 text-neutral-600" /> : null}
                </li>
            ))}
        </ol>
    );
}

/** Titled cards with paragraphs and optional bullets — "What Makes Petra Different?" and friends. */
export function CardGrid({
    items,
    columns = 3,
}: {
    items: { title: string; body?: RichParagraph[]; items?: string[]; outro?: RichParagraph }[];
    columns?: 2 | 3;
}) {
    return (
        <div
            className={`mt-10 grid grid-cols-1 gap-px bg-[#dad5cb] ${
                columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
        >
            {items.map((item) => (
                <article key={item.title} className="bg-white p-7">
                    <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                        {item.title}
                    </h3>

                    {item.body ? (
                        <div className="mt-4 space-y-3">
                            <RichTextList items={item.body} className="text-base leading-7 text-neutral-600" />
                        </div>
                    ) : null}

                    {item.items ? (
                        <ul className="mt-4 space-y-2">
                            {item.items.map((entry) => (
                                <li key={entry} className="flex items-start gap-3 text-base leading-7 text-neutral-700">
                                    <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 bg-[#a56437]" />
                                    {entry}
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {item.outro ? <RichText value={item.outro} className="mt-4 text-base leading-7 text-neutral-600" /> : null}
                </article>
            ))}
        </div>
    );
}

/** Closing call-to-action band. */
export function FinalCta({
    title,
    body,
    primaryCta,
    secondaryCta,
    children,
}: {
    title: string;
    body: RichParagraph[];
    primaryCta?: LinkRef;
    secondaryCta?: LinkRef;
    children?: ReactNode;
}) {
    return (
        <section className="bg-[#1c1a16] py-16 text-white sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
                <h2 className="max-w-3xl font-heading text-3xl font-bold uppercase tracking-[0.08em] text-white sm:text-4xl">
                    {title}
                </h2>

                <div className="mt-6 max-w-3xl space-y-4">
                    <RichTextList items={body} className="text-base leading-7 text-white/70 sm:text-lg" />
                </div>

                {children}

                {primaryCta || secondaryCta ? (
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        {primaryCta ? <PrimaryButton {...primaryCta} /> : null}
                        {secondaryCta ? <SecondaryButton {...secondaryCta} tone="dark" /> : null}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
