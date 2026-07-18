import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import type { PortalData, SellerOffer, SharedPageProps, StatusTone } from '../../types';

type SellerOffersProps = {
    portal: PortalData;
    offers: SellerOffer[];
};

export default function SellerOffers({ portal, offers }: SellerOffersProps) {
    const { status } = usePage<SharedPageProps>().props;

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <Head title="Offers | Seller Portal" />

            <PortalShell portal={portal} title="Offers">
                <div className="grid gap-6">
                    <section className="flex flex-col justify-between gap-4 border border-[#dad5cb] bg-white p-5 sm:flex-row sm:items-center sm:p-6">
                        <div>
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">Received Offers</span>
                            <h2 className="mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">Your Offers</h2>
                            <p className="mt-2 max-w-2xl text-base leading-7 text-neutral-600">
                                Offers Petra has worked up on your submitted equipment. Petra handles outreach and negotiation, then logs the
                                actual offer here for you to accept, decline, or counter.
                            </p>
                        </div>
                        <Link
                            href="/seller/listings"
                            className="button-press focus-copper inline-flex h-12 w-full items-center justify-center bg-[#a56437] px-6 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto"
                        >
                            My Listings
                        </Link>
                    </section>

                    <section className="grid gap-4">
                        {offers.length === 0 ? (
                            <article className="border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600">
                                No offers yet. Once Petra works a buyer deal on one of your listings, the offer will appear here for you to
                                accept, decline, or counter.
                            </article>
                        ) : (
                            <div className="grid gap-4">
                                {offers.map((offer) => (
                                    <OfferCard key={offer.id} offer={offer} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </PortalShell>
        </>
    );
}

function OfferCard({ offer }: { offer: SellerOffer }) {
    const [counterOpen, setCounterOpen] = useState(false);
    // One form per card handles all three responses; `action` is set at submit time.
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
        <article className="border border-[#dad5cb] bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                        {offer.listing_title ?? 'Listing removed'}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-500">Offered {offer.offered_at ?? 'date not available'}</p>
                </div>
                <StatusBadge label={offer.status_label} tone={offer.status_tone} />
            </div>

            <dl className="mt-5 grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                <Detail label="Listing">
                    {offer.listing_href && offer.listing_public_id ? (
                        <Link href={offer.listing_href} className="focus-copper font-semibold text-[#a56437] underline-offset-4 hover:underline">
                            {offer.listing_public_id}
                        </Link>
                    ) : (
                        <span className="text-neutral-500">{offer.listing_public_id ?? 'Not yet published'}</span>
                    )}
                </Detail>
                <Detail label="Offer amount">
                    <span className="font-semibold text-neutral-900">{formatUSD(offer.amount)}</span>
                </Detail>
                {offer.counter_amount && (
                    // A counter that survives onto an accepted offer means Petra took
                    // your number — that is the agreed price, not a pending counter.
                    <Detail label={offer.status === 'accepted' ? 'Agreed amount' : 'Your counter'}>
                        <span className="font-semibold text-neutral-900">{formatUSD(offer.counter_amount)}</span>
                    </Detail>
                )}
            </dl>

            {offer.can_respond && (
                <div className="mt-6 border-t border-[#dad5cb] pt-5">
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Respond</span>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            disabled={form.processing}
                            onClick={() => respond('accept')}
                            className="button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                        >
                            Accept
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

                    {/*
                        A counter records the amount and flips the status to "Countered",
                        handing the offer back to the broker. The broker answers it in the
                        review view — accepting your number, declining, or re-offering, which
                        returns the offer here as Pending for another round.
                    */}
                    {counterOpen && (
                        <form onSubmit={submitCounter} className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
                            <label className="grid gap-2">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Counter amount (USD)</span>
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
                                disabled={form.processing}
                                className="button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                            >
                                Send counter
                            </button>
                            {counterError && <span className="text-sm text-[#b3261e]">{counterError}</span>}
                        </form>
                    )}
                </div>
            )}
        </article>
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
            className={`inline-flex h-8 shrink-0 items-center rounded-full border px-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] ${toneClasses[tone] ?? toneClasses.neutral}`}
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
