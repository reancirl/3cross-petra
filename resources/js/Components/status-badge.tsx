import type { StatusTone } from '../types';

/**
 * Tone-driven status pill.
 *
 * Lifted verbatim from the copy in Pages/Portal/SellerOffers so the messaging
 * screens render statuses identically to the rest of the portal. Near-identical
 * private copies also live in BuyerQuotes and broker-queue; those are left alone
 * rather than refactored as a side effect of the messaging work, but this is the
 * one to consolidate on if they are ever unified.
 */

const toneClasses: Record<StatusTone, string> = {
    neutral: 'border-[#dad5cb] bg-[#f3f1ec] text-neutral-700',
    success: 'border-emerald-800/25 bg-emerald-50 text-emerald-800',
    warning: 'border-amber-800/25 bg-amber-50 text-amber-800',
    muted: 'border-neutral-300 bg-neutral-100 text-neutral-500',
    danger: 'border-[#b3261e]/25 bg-red-50 text-[#b3261e]',
};

export default function StatusBadge({ label, tone = 'neutral' }: { label: string; tone?: StatusTone }) {
    return (
        <span
            className={`inline-flex h-7 shrink-0 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${
                toneClasses[tone] ?? toneClasses.neutral
            }`}
        >
            {label}
        </span>
    );
}
