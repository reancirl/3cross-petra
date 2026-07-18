import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import SlideOver from '../../Components/slide-over';
import DataTable, { CellStack } from '../../Components/data-table';
import type { DataTableColumn } from '../../Components/data-table';
import { Detail, EmptyState, NoResults, QueueToolbar, StatusBadge, StatusForm, useQueue } from '../../Components/broker-queue';
import type { BuyerRequest } from '../../Components/broker-queue';
import type { PortalData, SharedPageProps } from '../../types';

type BrokerRequestsProps = {
    portal: PortalData;
    buyerRequests: BuyerRequest[];
    buyerStatusOptions: Record<string, string>;
};

/**
 * The buyer request queue. Split out of Pages/Broker/Submissions, where it was the
 * second tab of a single page; it is now its own sidebar destination. Mirrors the
 * seller queue's shape — rows in the list, detail in a slide-over.
 */
export default function BrokerRequests({ portal, buyerRequests, buyerStatusOptions }: BrokerRequestsProps) {
    const { status } = usePage<SharedPageProps>().props;
    // By id, not by object: props are replaced after a status save (see Submissions).
    const [activeId, setActiveId] = useState<number | null>(null);
    const active = buyerRequests.find((request) => request.id === activeId) ?? null;

    const queue = useQueue(buyerRequests, buyerStatusOptions, (item) => [
        item.equipment_type,
        item.buyer,
        item.email,
        item.company_name,
        item.status_label,
    ]);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <Head title="Buyer Requests | Broker Portal" />

            <PortalShell
                portal={portal}
                title="Buyer Requests"
                eyebrow={`${buyerRequests.length} ${buyerRequests.length === 1 ? 'request' : 'requests'}`}
            >
                <div className="grid gap-4">
                    <QueueToolbar
                        search={queue.search}
                        onSearch={queue.onSearch}
                        chips={queue.chips}
                        activeStatus={queue.statusFilter}
                        onStatus={queue.setStatusFilter}
                        sort={queue.sort}
                        onSort={queue.setSort}
                        placeholder="Search by equipment, buyer, email, or company"
                    />

                    {buyerRequests.length === 0 ? (
                        <EmptyState text="No buyer requests have been submitted yet." />
                    ) : queue.visible.length === 0 ? (
                        <NoResults onClear={queue.clear} />
                    ) : (
                        <DataTable
                            columns={REQUEST_COLUMNS}
                            rows={queue.visible}
                            rowKey={(request) => request.id}
                            onRowClick={(request) => setActiveId(request.id)}
                            rowLabel={(request) => `Review request for ${request.equipment_type}`}
                            caption="Buyer equipment requests awaiting broker review"
                        />
                    )}
                </div>

                <SlideOver
                    open={active !== null}
                    onClose={() => setActiveId(null)}
                    eyebrow="Buyer request"
                    title={active?.equipment_type ?? ''}
                >
                    {active && (
                        <div className="grid gap-6">
                            <dl className="grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                <Detail label="Buyer" value={active.buyer} />
                                <Detail label="Email" value={active.email} />
                                <Detail label="Phone" value={active.phone} />
                                <Detail label="Company" value={active.company_name} />
                                <Detail label="Budget range" value={active.budget_range} />
                                <Detail label="Location preference" value={active.location_preference} />
                                <Detail label="Timeline" value={active.timeline} />
                                <Detail label="Submitted" value={active.created_at} />
                                <div className="sm:col-span-2">
                                    <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                        Specifications
                                    </dt>
                                    <dd className="mt-1 whitespace-pre-line text-neutral-700">{active.specifications || 'Not provided'}</dd>
                                </div>
                            </dl>

                            <div className="border-t border-[#dad5cb] pt-6">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]">
                                    Request status
                                </span>
                                <div className="mt-3">
                                    {/* Keyed on status so the control re-baselines if the record
                                        moves server-side (see the same note in Submissions). */}
                                    <StatusForm
                                        key={`${active.id}:${active.status}`}
                                        value={active.status}
                                        options={buyerStatusOptions}
                                        action={`/broker/buyer-requests/${active.id}`}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </SlideOver>
            </PortalShell>
        </>
    );
}

/** Column layout for the buyer queue. Mirrors the seller queue's responsive priorities. */
const REQUEST_COLUMNS: DataTableColumn<BuyerRequest>[] = [
    {
        key: 'equipment',
        header: 'Equipment',
        cell: (request) => (
            <CellStack
                primary={
                    <span className="font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950">
                        {request.equipment_type}
                    </span>
                }
                secondary={request.location_preference}
            />
        ),
    },
    {
        key: 'buyer',
        header: 'Buyer',
        hideBelow: 'lg',
        cell: (request) => <CellStack primary={request.buyer ?? '—'} secondary={request.email ?? undefined} />,
    },
    {
        key: 'budget',
        header: 'Budget',
        hideBelow: 'md',
        align: 'right',
        cell: (request) => <span className="whitespace-nowrap">{request.budget_range || '—'}</span>,
    },
    {
        key: 'timeline',
        header: 'Timeline',
        hideBelow: 'xl',
        cell: (request) => <span className="whitespace-nowrap">{request.timeline || '—'}</span>,
    },
    {
        key: 'status',
        header: 'Status',
        align: 'right',
        cell: (request) => <StatusBadge status={request.status} label={request.status_label} />,
    },
];
