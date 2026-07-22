import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import StatusBadge from './status-badge';
import { DocumentRow, DocumentRows, formatFileSize } from './document-list';
import type { PortalDocument } from '../types';

/**
 * The broker's Documents tab, for one listing or one buyer request.
 *
 * Its job is to be the only place a broker has to look. Files reach a subject from
 * three unrelated directions — the seller's original submission, anything either side
 * attached to a message in the thread, and the broker's own uploads — and before this
 * panel a broker had to open the review form, the conversation, and the marketplace
 * page to see all three. They arrive here as one list with a source label each.
 *
 * Uploading demands a visibility choice with no default. "Private" would be the safe
 * default and "share" the useful one, and quietly picking either is how a valuation
 * ends up either invisible to the seller or visible to the wrong person. The submit
 * button stays disabled until the broker says which.
 */

type BrokerDocumentsPanelProps = {
    documents: PortalDocument[];
    /** 'listing' | 'buyer_request' — the first half of the upload URL. */
    subjectType: 'listing' | 'buyer_request';
    subjectId: number;
    /**
     * Who "Share" would send to, e.g. "Dana Reyes". Null when nobody owns the subject —
     * an unclaimed public-form submission — in which case sharing is not offered at all
     * rather than offered and then rejected by the server.
     */
    recipientName: string | null;
};

const MAX_FILES = 8;

export default function BrokerDocumentsPanel({
    documents,
    subjectType,
    subjectId,
    recipientName,
}: BrokerDocumentsPanelProps) {
    const [showArchived, setShowArchived] = useState(false);

    const form = useForm<{ visibility: string; documents: File[] }>({
        visibility: '',
        documents: [],
    });

    const archivedCount = documents.filter((document) => document.archived).length;
    const visible = showArchived ? documents : documents.filter((document) => !document.archived);

    function submit(event: FormEvent) {
        event.preventDefault();

        form.post(`/broker/documents/${subjectType}/${subjectId}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    }

    return (
        <div className="grid gap-6">
            <section className="overflow-hidden rounded-lg border border-[#dad5cb] bg-white">
                <header className="flex items-center justify-between gap-3 border-b border-[#ece7dd] px-4 py-3">
                    <h4 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                        All files
                    </h4>
                    {archivedCount > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowArchived((value) => !value)}
                            className="focus-copper font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline"
                        >
                            {showArchived ? 'Hide' : 'Show'} archived ({archivedCount})
                        </button>
                    )}
                </header>

                {visible.length === 0 ? (
                    <p className="px-4 py-8 text-center text-sm text-neutral-500">
                        No documents on this {subjectType === 'listing' ? 'listing' : 'request'} yet.
                    </p>
                ) : (
                    <DocumentRows>
                        {visible.map((document) => (
                            <DocumentRow
                                key={document.key}
                                document={document}
                                meta={
                                    <>
                                        <StatusBadge
                                            label={document.visibilityLabel ?? 'Unknown'}
                                            tone={document.visibilityTone ?? 'neutral'}
                                        />
                                        <span className="rounded-full border border-[#dad5cb] bg-[#f3f1ec] px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-neutral-500">
                                            {document.sourceLabel}
                                        </span>
                                        {document.sharedWith && (
                                            <span className="text-xs text-neutral-500">→ {document.sharedWith}</span>
                                        )}
                                        {document.archived && (
                                            <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-neutral-500">
                                                Archived
                                            </span>
                                        )}
                                        {typeof document.downloadCount === 'number' && document.downloadCount > 0 && (
                                            <span className="text-xs text-neutral-500">
                                                {document.downloadCount} download
                                                {document.downloadCount === 1 ? '' : 's'}
                                            </span>
                                        )}
                                    </>
                                }
                                actions={<ArchiveButton document={document} />}
                            />
                        ))}
                    </DocumentRows>
                )}
            </section>

            <form onSubmit={submit} className="grid gap-4 rounded-lg border border-[#dad5cb] bg-white p-4">
                <h4 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                    Add documents
                </h4>

                <fieldset className="grid gap-2">
                    <legend className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
                        Who can see this
                    </legend>

                    <VisibilityChoice
                        checked={form.data.visibility === 'private_broker'}
                        onSelect={() => form.setData('visibility', 'private_broker')}
                        label="Private"
                        hint="Brokers only. Nobody outside Petra sees it."
                    />

                    {recipientName ? (
                        <VisibilityChoice
                            checked={form.data.visibility === 'shared_user'}
                            onSelect={() => form.setData('visibility', 'shared_user')}
                            label={`Share with ${recipientName}`}
                            hint="Appears in their Documents page, and emails them a link."
                        />
                    ) : (
                        <p className="rounded-lg border border-dashed border-[#cfc7ba] px-3 py-2 text-xs leading-5 text-neutral-500">
                            This submission has no account behind it, so there is nobody to share with. Reach the
                            seller using the contact details above.
                        </p>
                    )}

                    {/* Public is a listing-only concept — a buyer request has no public
                        page for a document to appear on. */}
                    {subjectType === 'listing' && (
                        <VisibilityChoice
                            checked={form.data.visibility === 'public_listing'}
                            onSelect={() => form.setData('visibility', 'public_listing')}
                            label="Public on listing"
                            hint="Shown to anyone viewing this listing on the marketplace."
                        />
                    )}

                    {form.errors.visibility && <span className="text-sm text-[#b3261e]">{form.errors.visibility}</span>}
                </fieldset>

                <label className="button-press focus-within:ring-2 focus-within:ring-[#a56437]/40 grid cursor-pointer gap-1 rounded-lg border border-dashed border-[#cfc7ba] p-4 transition-colors hover:border-[#a56437] hover:bg-[#fbfaf8]">
                    <input
                        type="file"
                        multiple
                        onChange={(event) => {
                            form.setData('documents', Array.from(event.target.files ?? []));
                            event.currentTarget.value = '';
                        }}
                        className="sr-only"
                    />
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-950">
                        Choose files
                    </span>
                    <span className="text-xs leading-5 text-neutral-500">
                        Up to {MAX_FILES} files, 20 MB each. Images, PDFs, Office files, CSV or text.
                    </span>
                </label>

                {form.errors.documents && <span className="text-sm text-[#b3261e]">{form.errors.documents}</span>}

                {form.data.documents.length > 0 && (
                    <ul className="grid gap-1.5">
                        {form.data.documents.map((file, index) => (
                            <li
                                key={`${file.name}-${file.lastModified}`}
                                className="flex items-center justify-between gap-3 rounded-lg bg-[#f9f7f3] px-3 py-2"
                            >
                                <span className="min-w-0 truncate text-sm text-neutral-800">{file.name}</span>
                                <span className="flex shrink-0 items-center gap-3">
                                    <span className="text-xs text-neutral-500">{formatFileSize(file.size)}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            form.setData(
                                                'documents',
                                                form.data.documents.filter((_, fileIndex) => fileIndex !== index),
                                            )
                                        }
                                        className="focus-copper font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    type="submit"
                    // No implicit visibility. Picking one for the broker is how a private
                    // valuation ends up on the public marketplace.
                    disabled={form.processing || form.data.documents.length === 0 || form.data.visibility === ''}
                    className="button-press focus-copper inline-flex h-11 items-center justify-center rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {form.processing ? 'Adding…' : 'Add documents'}
                </button>
            </form>
        </div>
    );
}

function VisibilityChoice({
    checked,
    onSelect,
    label,
    hint,
}: {
    checked: boolean;
    onSelect: () => void;
    label: string;
    hint: string;
}) {
    return (
        <label
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                checked ? 'border-[#a56437] bg-[#f4ece4]' : 'border-[#dad5cb] hover:bg-[#f9f7f3]'
            }`}
        >
            <input
                type="radio"
                name="visibility"
                checked={checked}
                onChange={onSelect}
                className="mt-1 h-4 w-4 shrink-0 accent-[#a56437]"
            />
            <span className="min-w-0">
                <span className="block text-sm font-semibold text-neutral-900">{label}</span>
                <span className="mt-0.5 block text-xs leading-5 text-neutral-500">{hint}</span>
            </span>
        </label>
    );
}

/**
 * Archive hides a document from the customer without removing it from the record.
 * Message attachments have no archive URL — they belong to a conversation, and taking
 * one out of the document view would not take it out of the thread it is quoted in.
 */
function ArchiveButton({ document }: { document: PortalDocument }) {
    const form = useForm({});

    if (!document.archiveUrl || document.archived) {
        return null;
    }

    return (
        <button
            type="button"
            disabled={form.processing}
            onClick={() => form.patch(document.archiveUrl as string, { preserveScroll: true })}
            className="focus-copper font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500 underline-offset-4 transition-colors hover:text-[#b3261e] hover:underline disabled:opacity-40"
        >
            Archive
        </button>
    );
}
