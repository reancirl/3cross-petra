import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import PortalPageHeader, { portalHeaderActionClass } from '../../Components/portal-page-header';
import SlideOver from '../../Components/slide-over';
import DataTable, { CellStack } from '../../Components/data-table';
import type { DataTableColumn } from '../../Components/data-table';
import type { BuyerQuote, PortalData, SharedPageProps } from '../../types';

type BuyerQuotesProps = {
    portal: PortalData;
    quotes: BuyerQuote[];
    statusOptions: Record<string, string>;
};

export default function BuyerQuotes({ portal, quotes }: BuyerQuotesProps) {
    const { status } = usePage<SharedPageProps>().props;
    // By id, not by object — see the same note on the other portal list pages.
    const [activeId, setActiveId] = useState<number | null>(null);
    const active = quotes.find((quote) => quote.id === activeId) ?? null;

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
                    <PortalPageHeader
                        eyebrow="Quote Requests"
                        title="Your Quotes"
                        description={
                            quotes.length === 0
                                ? 'Request a quote from any listing to start one.'
                                : `${quotes.length} ${quotes.length === 1 ? 'quote' : 'quotes'} · request more from any listing.`
                        }
                        actions={
                            <Link href="/equipment" className={portalHeaderActionClass}>
                                Browse Equipment
                            </Link>
                        }
                    />

                    {quotes.length === 0 ? (
                        <article className="rounded-xl border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600 shadow-sm">
                            You haven’t requested any quotes yet. Open a listing and use “Request Quote” to ask Petra about availability and
                            pricing — your requests will appear here.
                        </article>
                    ) : (
                        <DataTable
                            columns={QUOTE_COLUMNS}
                            rows={quotes}
                            rowKey={(quote) => quote.id}
                            onRowClick={(quote) => setActiveId(quote.id)}
                            rowLabel={(quote) => `View your quote request for ${quote.equipment_name}`}
                            caption="Quotes you have requested from Petra"
                        />
                    )}
                </div>

                <SlideOver
                    open={active !== null}
                    onClose={() => setActiveId(null)}
                    eyebrow={active?.listing_public_id ?? 'Quote request'}
                    title={active?.equipment_name ?? ''}
                >
                    {active && (
                        <dl className="grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                            <div>
                                <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Listing</dt>
                                <dd className="mt-1">
                                    {active.listing_href && active.listing_public_id ? (
                                        <Link
                                            href={active.listing_href}
                                            className="focus-copper font-semibold text-[#a56437] underline-offset-4 hover:underline"
                                        >
                                            {active.listing_public_id}
                                        </Link>
                                    ) : (
                                        <span className="text-neutral-500">No longer listed</span>
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Status</dt>
                                <dd className="mt-1">
                                    <StatusBadge label={active.status_label} />
                                </dd>
                            </div>
                            <div>
                                <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Requested</dt>
                                <dd className="mt-1 text-neutral-700">{active.created_at ?? 'Not available'}</dd>
                            </div>
                            {active.note && (
                                // The stored inquiry record: listing context, the contact
                                // details submitted, and any message the buyer added. It has
                                // never been surfaced anywhere until now — the card this
                                // table replaced did not render it either.
                                <div className="sm:col-span-2">
                                    <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                        What you sent
                                    </dt>
                                    <dd className="mt-2 whitespace-pre-line rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3 text-sm leading-6 text-neutral-700">
                                        {active.note}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    )}
                </SlideOver>
            </PortalShell>
        </>
    );
}

const QUOTE_COLUMNS: DataTableColumn<BuyerQuote>[] = [
    {
        key: 'equipment',
        header: 'Equipment',
        cell: (quote) => (
            <CellStack
                primary={
                    <span className="font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950">
                        {quote.equipment_name}
                    </span>
                }
            />
        ),
    },
    {
        key: 'listing',
        header: 'Listing',
        hideBelow: 'md',
        cell: (quote) =>
            quote.listing_href && quote.listing_public_id ? (
                <Link href={quote.listing_href} className="focus-copper font-semibold text-[#a56437] underline-offset-4 hover:underline">
                    {quote.listing_public_id}
                </Link>
            ) : (
                <span className="text-neutral-500">No longer listed</span>
            ),
    },
    {
        key: 'requested',
        header: 'Requested',
        hideBelow: 'lg',
        cell: (quote) => <span className="whitespace-nowrap">{quote.created_at ?? '—'}</span>,
    },
    {
        key: 'status',
        header: 'Status',
        align: 'right',
        cell: (quote) => <StatusBadge label={quote.status_label} />,
    },
];

function StatusBadge({ label }: { label: string }) {
    return (
        <span className="inline-flex h-8 items-center rounded-full border border-[#dad5cb] bg-[#f8f8f6] px-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-[#a56437]">
            {label}
        </span>
    );
}
