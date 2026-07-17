import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import type { BuyerQuote, PortalData, SharedPageProps } from '../../types';

type BuyerQuotesProps = {
    portal: PortalData;
    quotes: BuyerQuote[];
    statusOptions: Record<string, string>;
};

export default function BuyerQuotes({ portal, quotes }: BuyerQuotesProps) {
    const { status } = usePage<SharedPageProps>().props;

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <Head title="Quotes | Buyer Portal" />

            <PortalShell portal={portal} title="Quotes">
                <div className="grid gap-6">
                    <section className="flex flex-col justify-between gap-4 border border-[#dad5cb] bg-white p-5 sm:flex-row sm:items-center sm:p-6">
                        <div>
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">Quote Requests</span>
                            <h2 className="mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">Your Quotes</h2>
                            <p className="mt-2 max-w-2xl text-base leading-7 text-neutral-600">
                                Quotes you requested from equipment listings, with the current review status. Start a new quote from any listing’s
                                “Request Quote” button.
                            </p>
                        </div>
                        <Link
                            href="/equipment"
                            className="button-press focus-copper inline-flex h-12 w-full items-center justify-center bg-[#a56437] px-6 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto"
                        >
                            Browse Equipment
                        </Link>
                    </section>

                    <section className="grid gap-4">
                        {quotes.length === 0 ? (
                            <article className="border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600">
                                You haven’t requested any quotes yet. Open a listing and use “Request Quote” to ask Petra about availability and
                                pricing — your requests will appear here.
                            </article>
                        ) : (
                            <div className="grid gap-4">
                                {quotes.map((quote) => (
                                    <article key={quote.id} className="border border-[#dad5cb] bg-white p-6">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                                    {quote.equipment_name}
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-neutral-500">Requested {quote.created_at}</p>
                                            </div>
                                            <StatusBadge label={quote.status_label} />
                                        </div>

                                        <dl className="mt-5 grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                            <Detail label="Listing">
                                                {quote.listing_href && quote.listing_public_id ? (
                                                    <Link
                                                        href={quote.listing_href}
                                                        className="focus-copper font-semibold text-[#a56437] underline-offset-4 hover:underline"
                                                    >
                                                        {quote.listing_public_id}
                                                    </Link>
                                                ) : (
                                                    <span className="text-neutral-500">No longer listed</span>
                                                )}
                                            </Detail>
                                            <Detail label="Date requested">
                                                <span className="text-neutral-700">{quote.created_at ?? 'Not available'}</span>
                                            </Detail>
                                        </dl>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </PortalShell>
        </>
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

function StatusBadge({ label }: { label: string }) {
    return (
        <span className="inline-flex h-8 items-center border border-[#dad5cb] bg-[#f8f8f6] px-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-[#a56437]">
            {label}
        </span>
    );
}
