import { Head } from '@inertiajs/react';
import PortalPageHeader from '../../Components/portal-page-header';
import PortalShell from '../../Components/portal-shell';
import StatusBadge from '../../Components/status-badge';
import { DocumentRow, DocumentRows } from '../../Components/document-list';
import type { DocumentGroup, PortalData } from '../../types';

type DocumentsProps = {
    portal: PortalData;
    groups: DocumentGroup[];
};

/**
 * The customer Documents hub — buyer and seller alike.
 *
 * Grouped by subject rather than presented as one flat list, because a document is only
 * meaningful next to the thing it is about: a seller with three listings needs to know
 * which valuation belongs to which unit, and a date column cannot tell them.
 *
 * Read-only by design. There is no upload control here — a customer sending Petra a
 * file is part of a conversation, and belongs in Messages where the broker will see it
 * in context. This page is what Petra has given them.
 */
export default function Documents({ portal, groups }: DocumentsProps) {
    const documentCount = groups.reduce((total, group) => total + group.documents.length, 0);
    const newCount = groups.reduce(
        (total, group) => total + group.documents.filter((document) => document.isNew).length,
        0,
    );

    return (
        <>
            <Head title={`Documents | ${portal.roleLabel} Portal`} />

            <PortalShell portal={portal} title="Documents">
                <div className="grid gap-5">
                    <PortalPageHeader
                        eyebrow="Your files"
                        title="Documents"
                        description={
                            documentCount === 0
                                ? 'Nothing here yet'
                                : `${documentCount} ${documentCount === 1 ? 'document' : 'documents'}${
                                      newCount > 0 ? ` · ${newCount} new` : ''
                                  }`
                        }
                    />

                    {groups.length === 0 ? (
                        <EmptyState />
                    ) : (
                        groups.map((group) => (
                            <section
                                key={group.key}
                                className="overflow-hidden rounded-xl border border-[#dad5cb] bg-white shadow-sm"
                            >
                                <header className="flex flex-col gap-2 border-b border-[#ece7dd] bg-[#f9f7f3] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                                    <div className="min-w-0">
                                        <span className="font-heading text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                                            {group.kindLabel}
                                        </span>
                                        <h3 className="mt-0.5 truncate font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950">
                                            {group.title}
                                        </h3>
                                    </div>
                                    <StatusBadge label={group.statusLabel} tone={group.statusTone} />
                                </header>

                                <DocumentRows>
                                    {group.documents.map((document) => (
                                        <DocumentRow key={document.key} document={document} />
                                    ))}
                                </DocumentRows>
                            </section>
                        ))
                    )}
                </div>
            </PortalShell>
        </>
    );
}

function EmptyState() {
    return (
        <article className="rounded-xl border border-dashed border-[#cfc7ba] bg-white px-6 py-12 text-center">
            <p className="mx-auto max-w-md text-base leading-7 text-neutral-600">
                Documents related to your equipment and deals will appear here.
            </p>
        </article>
    );
}
