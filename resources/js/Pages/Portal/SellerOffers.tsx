import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import PortalPageHeader, { portalHeaderActionClass } from '../../Components/portal-page-header';
import SlideOver from '../../Components/slide-over';
import DataTable, { CellStack } from '../../Components/data-table';
import type { DataTableColumn } from '../../Components/data-table';
import type { PortalData, SellerOffer, SharedPageProps, StatusTone } from '../../types';

type SellerOffersProps = {
    portal: PortalData;
    offers: SellerOffer[];
};

export default function SellerOffers({ portal, offers }: SellerOffersProps) {
    const { status } = usePage<SharedPageProps>().props;
    // By id, not by object: responding replaces the props, and a held object would keep
    // showing the pre-response state in the open panel.
    const [activeId, setActiveId] = useState<number | null>(null);
    const active = offers.find((offer) => offer.id === activeId) ?? null;

    const awaiting = offers.filter((offer) => offer.can_respond).length;

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <Head title="Offers | Seller Portal" />

            {/* No topbar eyebrow: PortalPageHeader below already carries the counts, and
                showing them twice on one screen reads as a mistake. Broker pages do the
                opposite — they have no page header, so the eyebrow is where their counts live. */}
            <PortalShell portal={portal} title="Offers">
                <div className="grid gap-6">
                    <PortalPageHeader
                        eyebrow="Received Offers"
                        title="Your Offers"
                        // Petra negotiates off-platform and logs the result here, so the
                        // useful summary is how many need the seller to do something.
                        description={
                            offers.length === 0
                                ? 'Petra negotiates, then logs each offer here.'
                                : `${offers.length} ${offers.length === 1 ? 'offer' : 'offers'} · ${
                                      awaiting > 0 ? `${awaiting} awaiting your response.` : 'nothing awaiting you.'
                                  }`
                        }
                        actions={
                            <Link href="/seller/listings" className={portalHeaderActionClass}>
                                My Listings
                            </Link>
                        }
                    />

                    {offers.length === 0 ? (
                        <article className="rounded-xl border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600 shadow-sm">
                            No offers yet. Once Petra works a buyer deal on one of your listings, the offer will appear here for you to accept,
                            decline, or counter.
                        </article>
                    ) : (
                        <DataTable
                            columns={OFFER_COLUMNS}
                            rows={offers}
                            rowKey={(offer) => offer.id}
                            onRowClick={(offer) => setActiveId(offer.id)}
                            rowLabel={(offer) => `Open offer on ${offer.listing_title ?? 'removed listing'}`}
                            caption="Offers Petra has logged on your equipment"
                        />
                    )}
                </div>

                <SlideOver
                    open={active !== null}
                    onClose={() => setActiveId(null)}
                    eyebrow={active?.listing_public_id ?? 'Offer'}
                    title={active?.listing_title ?? 'Listing removed'}
                >
                    {active && (
                        <div className="grid gap-6">
                            <dl className="grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                <Detail label="Listing">
                                    {active.listing_href && active.listing_public_id ? (
                                        <Link
                                            href={active.listing_href}
                                            className="focus-copper font-semibold text-[#a56437] underline-offset-4 hover:underline"
                                        >
                                            {active.listing_public_id}
                                        </Link>
                                    ) : (
                                        <span className="text-neutral-500">{active.listing_public_id ?? 'Not yet published'}</span>
                                    )}
                                </Detail>
                                <Detail label="Status">
                                    <StatusBadge label={active.status_label} tone={active.status_tone} />
                                </Detail>
                                <Detail label="Offer amount">
                                    <span className="font-semibold text-neutral-900">{formatUSD(active.amount)}</span>
                                </Detail>
                                <Detail label="Offered">
                                    <span>{active.offered_at ?? 'Date not available'}</span>
                                </Detail>
                                {active.counter_amount && (
                                    // A counter that survives onto an accepted offer means Petra took
                                    // your number — that is the agreed price, not a pending counter.
                                    <Detail label={active.status === 'accepted' ? 'Agreed amount' : 'Your counter'}>
                                        <span className="font-semibold text-neutral-900">{formatUSD(active.counter_amount)}</span>
                                    </Detail>
                                )}
                            </dl>

                            {active.can_respond ? (
                                // Keyed so the form resets if the offer moves server-side.
                                <OfferResponse key={`${active.id}:${active.status}`} offer={active} />
                            ) : (
                                <p className="border-t border-[#dad5cb] pt-5 text-base leading-7 text-neutral-600">
                                    This offer is {active.status_label.toLowerCase()} — there is nothing left for you to respond to. Petra will
                                    be in touch if the negotiation reopens.
                                </p>
                            )}
                        </div>
                    )}
                </SlideOver>
            </PortalShell>
        </>
    );
}

/**
 * Column layout. Listing and Status hold at every width; amounts and the offer date drop
 * away on narrower screens rather than forcing a sideways scroll.
 */
const OFFER_COLUMNS: DataTableColumn<SellerOffer>[] = [
    {
        key: 'listing',
        header: 'Listing',
        cell: (offer) => (
            <CellStack
                primary={
                    <>
                        <span className="font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950">
                            {offer.listing_title ?? 'Listing removed'}
                        </span>
                        {offer.can_respond && (
                            <span className="rounded-full bg-amber-50 px-2 py-0.5 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-amber-800">
                                Action needed
                            </span>
                        )}
                    </>
                }
                secondary={offer.listing_public_id ?? 'Not yet published'}
            />
        ),
    },
    {
        key: 'amount',
        header: 'Offer',
        align: 'right',
        cell: (offer) => <span className="whitespace-nowrap font-semibold text-neutral-900">{formatUSD(offer.amount)}</span>,
    },
    {
        key: 'counter',
        header: 'Counter',
        hideBelow: 'md',
        align: 'right',
        cell: (offer) => (
            <span className="whitespace-nowrap">{offer.counter_amount ? formatUSD(offer.counter_amount) : '—'}</span>
        ),
    },
    {
        key: 'offered_at',
        header: 'Offered',
        hideBelow: 'xl',
        cell: (offer) => <span className="whitespace-nowrap">{offer.offered_at ?? '—'}</span>,
    },
    {
        key: 'status',
        header: 'Status',
        align: 'right',
        cell: (offer) => <StatusBadge label={offer.status_label} tone={offer.status_tone} />,
    },
];

/**
 * Accept / decline / counter. A counter records the amount and flips the status to
 * "Countered", handing the offer back to the broker. The broker answers it in the review
 * view — accepting your number, declining, or re-offering, which returns the offer here
 * as Pending for another round.
 */
function OfferResponse({ offer }: { offer: SellerOffer }) {
    const [counterOpen, setCounterOpen] = useState(false);
    // One form handles all three responses; `action` is set at submit time.
    const form = useForm<{ action: string; counter_amount: string }>({ action: '', counter_amount: '' });

    function respond(action: 'accept' | 'decline') {
        form.transform((data) => ({ ...data, action, counter_amount: '' }));
        form.patch(`/seller/offers/${offer.id}`, { preserveScroll: true });
    }

    function submitCounter(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.transform((data) => ({ ...data, action: 'counter' }));
        form.patch(`/seller/offers/${offer.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setCounterOpen(false);
                form.reset('counter_amount');
            },
        });
    }

    const counterError = (form.errors as Record<string, string>).counter_amount;

    return (
        <div className="border-t border-[#dad5cb] pt-5">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Respond</span>
            <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    disabled={form.processing}
                    onClick={() => respond('accept')}
                    className="button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    Accept {formatUSD(offer.amount)}
                </button>
                <button
                    type="button"
                    disabled={form.processing}
                    onClick={() => respond('decline')}
                    className="button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg border border-[#b3261e] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#b3261e] transition-colors hover:bg-[#b3261e] hover:text-white disabled:opacity-60"
                >
                    Decline
                </button>
                <button
                    type="button"
                    disabled={form.processing}
                    onClick={() => setCounterOpen((open) => !open)}
                    aria-expanded={counterOpen}
                    className="button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg border border-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white disabled:opacity-60"
                >
                    Counter
                </button>
            </div>

            {counterOpen && (
                <form onSubmit={submitCounter} className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
                    <label className="grid gap-2">
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                            Counter amount (USD)
                        </span>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            inputMode="decimal"
                            value={form.data.counter_amount}
                            onChange={(event) => form.setData('counter_amount', event.target.value)}
                            placeholder="USD"
                            aria-invalid={Boolean(counterError)}
                            className={`portal-input sm:w-56${counterError ? ' portal-input-error' : ''}`}
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={form.processing || form.data.counter_amount.trim() === ''}
                        className="button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                        Send counter
                    </button>
                    {counterError && <span className="text-sm text-[#b3261e]">{counterError}</span>}
                </form>
            )}
        </div>
    );
}

const toneClasses: Record<StatusTone, string> = {
    neutral: 'border-[#dad5cb] bg-[#f3f1ec] text-neutral-700',
    success: 'border-emerald-800/25 bg-emerald-50 text-emerald-800',
    warning: 'border-amber-800/25 bg-amber-50 text-amber-800',
    muted: 'border-neutral-300 bg-neutral-100 text-neutral-500',
    danger: 'border-[#b3261e]/25 bg-red-50 text-[#b3261e]',
};

function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
    return (
        <span
            className={`inline-flex h-7 shrink-0 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${toneClasses[tone] ?? toneClasses.neutral}`}
        >
            {label}
        </span>
    );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div>
            <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</dt>
            <dd className="mt-1">{children}</dd>
        </div>
    );
}

function formatUSD(value: string): string {
    const amount = Number(value);

    return Number.isNaN(amount)
        ? value
        : amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
