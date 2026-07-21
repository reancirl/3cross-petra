import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import SlideOver from '../../Components/slide-over';
import DataTable, { CellStack } from '../../Components/data-table';
import type { DataTableColumn } from '../../Components/data-table';
import { Detail, EmptyState, NoResults, QueueToolbar, StatusBadge, StatusForm, useQueue } from '../../Components/broker-queue';
import type { BrokerLead } from '../../Components/broker-queue';
import type { PortalData, SharedPageProps } from '../../types';

type BrokerLeadsProps = {
    portal: PortalData;
    leads: BrokerLead[];
    leadStatusOptions: Record<string, string>;
};

/**
 * Talk to a Broker inquiries from the public Sell Equipment section. Same shape as the two
 * review queues — rows in the list, detail in a slide-over — but a lead has no record to
 * publish or price, so the panel is contact details, the message, and a status to move.
 */
export default function BrokerLeads({ portal, leads, leadStatusOptions }: BrokerLeadsProps) {
    const { status } = usePage<SharedPageProps>().props;
    // By id, not by object: props are replaced after a status save (see Submissions).
    const [activeId, setActiveId] = useState<number | null>(null);
    const active = leads.find((lead) => lead.id === activeId) ?? null;

    const queue = useQueue(leads, leadStatusOptions, (item) => [
        item.full_name,
        item.company,
        item.email,
        item.phone,
        item.topic_label,
        item.equipment_type,
        item.status_label,
    ]);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <Head title="Leads | Broker Portal" />

            <PortalShell
                portal={portal}
                title="Leads"
                eyebrow={`${leads.length} ${leads.length === 1 ? 'inquiry' : 'inquiries'}`}
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
                        placeholder="Search by name, company, email, or topic"
                    />

                    {leads.length === 0 ? (
                        <EmptyState text="No broker inquiries have been submitted yet." />
                    ) : queue.visible.length === 0 ? (
                        <NoResults onClear={queue.clear} />
                    ) : (
                        <DataTable
                            columns={LEAD_COLUMNS}
                            rows={queue.visible}
                            rowKey={(lead) => lead.id}
                            onRowClick={(lead) => setActiveId(lead.id)}
                            rowLabel={(lead) => `Review inquiry from ${lead.full_name}`}
                            caption="Talk to a Broker inquiries awaiting a response"
                        />
                    )}
                </div>

                <SlideOver
                    open={active !== null}
                    onClose={() => setActiveId(null)}
                    eyebrow="Broker inquiry"
                    title={active?.full_name ?? ''}
                >
                    {active && (
                        <div className="grid gap-6">
                            <dl className="grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                <Detail label="Company" value={active.company} />
                                <Detail label="Topic" value={active.topic_label} />
                                <Detail label="Email" value={active.email} />
                                <Detail label="Phone" value={active.phone} />
                                <Detail label="Prefers" value={active.preferred_contact_label} />
                                <Detail label="Equipment type" value={active.equipment_type} />
                                <Detail label="Submitted" value={active.created_at} />
                                {/* Only when the visitor was signed in. Shown so a broker can
                                    connect the lead to existing listings or threads — the reply
                                    still goes to the contact details above. */}
                                {active.account_name && (
                                    <Detail
                                        label="Signed in as"
                                        value={`${active.account_name} (${active.account_email})`}
                                    />
                                )}
                                <div className="sm:col-span-2">
                                    <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                        Message
                                    </dt>
                                    <dd className="mt-1 whitespace-pre-line text-neutral-700">{active.message}</dd>
                                </div>
                            </dl>

                            <div className="border-t border-[#dad5cb] pt-6">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]">
                                    Lead status
                                </span>
                                <div className="mt-3">
                                    {/* Keyed on status so the control re-baselines if the record
                                        moves server-side (see the same note in Submissions). */}
                                    <StatusForm
                                        key={`${active.id}:${active.status}`}
                                        value={active.status}
                                        options={leadStatusOptions}
                                        action={`/broker/leads/${active.id}`}
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

/** Column layout for the lead queue. Mirrors the other two queues' responsive priorities. */
const LEAD_COLUMNS: DataTableColumn<BrokerLead>[] = [
    {
        key: 'contact',
        header: 'Contact',
        cell: (lead) => (
            <CellStack
                primary={
                    <span className="font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950">
                        {lead.full_name}
                    </span>
                }
                secondary={lead.company ?? undefined}
            />
        ),
    },
    {
        key: 'topic',
        header: 'Topic',
        hideBelow: 'md',
        cell: (lead) => <CellStack primary={lead.topic_label} secondary={lead.equipment_type ?? undefined} />,
    },
    {
        key: 'reach',
        header: 'Reach them',
        hideBelow: 'lg',
        cell: (lead) => <CellStack primary={lead.email} secondary={lead.phone} />,
    },
    {
        key: 'prefers',
        header: 'Prefers',
        hideBelow: 'xl',
        cell: (lead) => <span className="whitespace-nowrap">{lead.preferred_contact_label}</span>,
    },
    {
        key: 'status',
        header: 'Status',
        align: 'right',
        cell: (lead) => <StatusBadge status={lead.status} label={lead.status_label} />,
    },
];
