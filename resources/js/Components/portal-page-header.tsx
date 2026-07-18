import type { ReactNode } from 'react';

/**
 * The banner at the top of a portal list page: eyebrow, title, a one-line summary, and
 * optional actions on the right.
 *
 * All four portal list pages had hand-rolled copies of this, and they drifted — My
 * Listings ran a compact scale (xs eyebrow, 2xl title, one-line count) while Offers,
 * Quotes and Requests ran a larger one with a two-line paragraph, so the same UI element
 * looked like two different components depending on the page. This is the compact scale,
 * which reads as a page header rather than competing with the topbar title above it.
 *
 * Keep `description` to a single line. It is the place for counts ("3 offers · 1 awaiting
 * your response"), not for explaining the feature — the topbar already names the page.
 */
type PortalPageHeaderProps = {
    eyebrow: string;
    title: string;
    description?: ReactNode;
    /** Buttons, links, or a search field. Laid out in a row on wide screens. */
    actions?: ReactNode;
};

export default function PortalPageHeader({ eyebrow, title, description, actions }: PortalPageHeaderProps) {
    return (
        <section className="flex flex-col gap-4 rounded-xl border border-[#dad5cb] bg-white px-5 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:px-6">
            <div className="min-w-0">
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#a56437]">{eyebrow}</span>
                <h2 className="mt-1 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">{title}</h2>
                {description && <p className="mt-1 text-sm leading-6 text-neutral-500">{description}</p>}
            </div>

            {actions && <div className="flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>}
        </section>
    );
}

/**
 * Standard action button styling for the header's right-hand slot, sized to the compact
 * header (h-11, matching the search field on My Listings).
 */
export const portalHeaderActionClass =
    'button-press focus-copper inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto';
