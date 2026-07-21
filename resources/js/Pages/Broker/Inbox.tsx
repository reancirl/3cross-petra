import { Head, Link, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import ConfirmDialog from '../../Components/confirm-dialog';
import MessageComposer from '../../Components/message-composer';
import MessageThread from '../../Components/message-thread';
import PortalPageHeader from '../../Components/portal-page-header';
import PortalShell from '../../Components/portal-shell';
import StatusBadge from '../../Components/status-badge';
import ThreadList from '../../Components/thread-list';
import { registerPollCancel } from '../../messaging';
import type {
    CannedResponse,
    PortalData,
    SharedPageProps,
    ThreadMessagePage,
    ThreadSubjectContext,
    ThreadSummary,
} from '../../types';

const THREAD_POLL_MS = 20_000;

type InboxProps = {
    portal: PortalData;
    threads: ThreadSummary[];
    thread: ThreadSummary | null;
    messages: ThreadMessagePage | null;
    context: ThreadSubjectContext | null;
    cannedResponses: CannedResponse[];
    filters: { unreadOnly: boolean; subjectType: string | null; listingStatus: string | null };
    filterOptions: { subjectTypes: Record<string, string>; listingStatuses: Record<string, string> };
};

/**
 * The broker inbox: every customer conversation, unread first.
 *
 * Same three-part shape as the customer Messages screen (list / transcript /
 * composer) plus the two things only a broker needs: a context panel on the linked
 * subject, and canned responses.
 */
export default function Inbox({
    portal,
    threads,
    thread,
    messages,
    context,
    cannedResponses,
    filters,
    filterOptions,
}: InboxProps) {
    const { status } = usePage<SharedPageProps>().props;
    const [closeDialogOpen, setCloseDialogOpen] = useState(false);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    const threadId = thread?.id ?? null;

    // Same 20s cadence and visibility rules as the customer side.
    useEffect(() => {
        if (threadId === null) {
            return;
        }

        function refresh() {
            if (document.hidden) {
                return;
            }

            router.reload({
                only: ['thread', 'messages', 'threads', 'unreadMessageThreads'],
                // Hand the cancel token to the composer, which aborts this poll
                // before sending so a stale response cannot clobber the new message.
                onCancelToken: (token) => registerPollCancel(token.cancel),
                onFinish: () => registerPollCancel(null),
            });
        }

        const timer = window.setInterval(refresh, THREAD_POLL_MS);
        document.addEventListener('visibilitychange', refresh);

        return () => {
            window.clearInterval(timer);
            document.removeEventListener('visibilitychange', refresh);
        };
    }, [threadId]);

    const markRead = useCallback(() => {
        if (threadId === null) {
            return;
        }

        router.post(
            `/broker/inbox/${threadId}/read`,
            {},
            { preserveScroll: true, preserveState: true, only: ['threads', 'unreadMessageThreads'] },
        );
    }, [threadId]);

    function applyFilter(next: Partial<{ unread_only: boolean; subject_type: string; listing_status: string }>) {
        const query: Record<string, string> = {};

        const unreadOnly = next.unread_only ?? filters.unreadOnly;
        const subjectType = next.subject_type ?? filters.subjectType ?? '';
        const listingStatus = next.listing_status ?? filters.listingStatus ?? '';

        if (unreadOnly) {
            query.unread_only = '1';
        }
        if (subjectType) {
            query.subject_type = subjectType;
        }
        if (listingStatus) {
            query.listing_status = listingStatus;
        }

        // Filters apply to the list only, so stay on the open thread if there is one.
        router.get(threadId ? `/broker/inbox/${threadId}` : '/broker/inbox', query, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function setThreadStatus(nextStatus: 'open' | 'closed') {
        setCloseDialogOpen(false);

        if (threadId === null) {
            return;
        }

        router.patch(`/broker/inbox/${threadId}/status`, { status: nextStatus }, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Inbox | Broker Portal" />

            <PortalShell portal={portal} title="Inbox">
                <div className="grid gap-6">
                    <PortalPageHeader
                        eyebrow="Conversations"
                        title="Inbox"
                        description="Every buyer and seller conversation, unread first."
                    />

                    <InboxFilters filters={filters} options={filterOptions} onChange={applyFilter} />

                    <div className="grid gap-4 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
                        <div className={`min-w-0 ${thread ? 'hidden lg:block' : 'block'}`}>
                            <ThreadList
                                threads={threads}
                                activeId={threadId}
                                showParticipant
                                emptyLabel={
                                    filters.unreadOnly || filters.subjectType || filters.listingStatus
                                        ? 'No conversations match these filters.'
                                        : 'No conversations yet.'
                                }
                            />
                        </div>

                        {thread && messages ? (
                            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
                                <div className="flex min-h-[26rem] flex-col overflow-hidden rounded-xl border border-[#dad5cb] bg-[#f9f7f3] shadow-sm lg:h-[calc(100dvh-15rem)]">
                                    <header className="grid gap-0.5 border-b border-[#ece7dd] bg-white px-4 py-2.5 sm:px-5">
                                        <Link
                                            href="/broker/inbox"
                                            className="focus-copper w-fit font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline lg:hidden"
                                        >
                                            ← All conversations
                                        </Link>
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950">
                                                    {thread.subjectTitle}
                                                </h2>
                                                {thread.isClosed && <StatusBadge label="Closed" tone="muted" />}
                                            </div>
                                            {thread.isClosed ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setThreadStatus('open')}
                                                    className="focus-copper font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline"
                                                >
                                                    Reopen
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setCloseDialogOpen(true)}
                                                    className="focus-copper font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500 underline-offset-4 hover:text-[#a56437] hover:underline"
                                                >
                                                    Close thread
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-sm text-neutral-500">
                                            {thread.userName} · {thread.userRole}
                                        </p>
                                    </header>

                                    <MessageThread page={messages} onNewMessages={markRead} />

                                    <MessageComposer
                                        action={`/broker/inbox/${thread.id}/messages`}
                                        placeholder="Reply as Petra…"
                                        toolbar={(insert) => <CannedResponses responses={cannedResponses} onInsert={insert} />}
                                    />
                                </div>

                                {context && <ContextPanel context={context} />}
                            </section>
                        ) : (
                            <section className="hidden items-center justify-center rounded-xl border border-dashed border-[#dad5cb] bg-white p-10 text-center text-sm text-neutral-500 lg:flex">
                                Select a conversation to read it.
                            </section>
                        )}
                    </div>
                </div>
            </PortalShell>

            <ConfirmDialog
                open={closeDialogOpen}
                title="Close this thread?"
                description="The customer keeps full access and any new message reopens it automatically."
                confirmLabel="Close thread"
                onCancel={() => setCloseDialogOpen(false)}
                onConfirm={() => setThreadStatus('closed')}
            />
        </>
    );
}

function InboxFilters({
    filters,
    options,
    onChange,
}: {
    filters: InboxProps['filters'];
    options: InboxProps['filterOptions'];
    onChange: (next: Partial<{ unread_only: boolean; subject_type: string; listing_status: string }>) => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#dad5cb] bg-white p-3 shadow-sm">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <input
                    type="checkbox"
                    checked={filters.unreadOnly}
                    onChange={(event) => onChange({ unread_only: event.target.checked })}
                    className="h-4 w-4 rounded border-[#dad5cb] text-[#a56437] focus:ring-[#a56437]/40"
                />
                Unread only
            </label>

            <label className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-neutral-500">Subject</span>
                <select
                    value={filters.subjectType ?? ''}
                    onChange={(event) => onChange({ subject_type: event.target.value })}
                    className="focus-copper rounded-lg border border-[#dad5cb] bg-white px-2 py-1.5 text-sm"
                >
                    <option value="">All</option>
                    {Object.entries(options.subjectTypes).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-neutral-500">
                    Listing status
                </span>
                <select
                    value={filters.listingStatus ?? ''}
                    onChange={(event) => onChange({ listing_status: event.target.value })}
                    className="focus-copper rounded-lg border border-[#dad5cb] bg-white px-2 py-1.5 text-sm"
                >
                    <option value="">Any</option>
                    {Object.entries(options.listingStatuses).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

/**
 * Canned responses insert at the caret rather than replacing the draft, so a broker
 * can top-and-tail a snippet instead of losing what they had already typed.
 */
function CannedResponses({ responses, onInsert }: { responses: CannedResponse[]; onInsert: (text: string) => void }) {
    if (responses.length === 0) {
        return null;
    }

    // No flex-wrap: the parent scrolls this row sideways, so adding a sixth canned
    // reply costs zero vertical space instead of another line of composer.
    return (
        <>
            <span className="flex shrink-0 items-center font-heading text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                Quick replies
            </span>
            {responses.map((response) => (
                <button
                    key={response.id}
                    type="button"
                    onClick={() => onInsert(response.body)}
                    title={response.body}
                    className="button-press focus-copper shrink-0 whitespace-nowrap rounded-full border border-[#dad5cb] bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 transition-colors hover:border-[#a56437] hover:text-[#8a5330]"
                >
                    {response.title}
                </button>
            ))}
        </>
    );
}

function ContextPanel({ context }: { context: ThreadSubjectContext }) {
    const isListing = context.kind === 'listing';

    return (
        <aside className="grid h-fit gap-3 rounded-xl border border-[#dad5cb] bg-white p-4 shadow-sm">
            <div className="grid gap-2">
                <span className="font-heading text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                    {isListing ? 'Linked listing' : 'Buyer request'}
                </span>
                <h3 className="font-heading text-base font-semibold uppercase tracking-[0.04em] text-neutral-950">{context.title}</h3>
                <StatusBadge label={context.statusLabel} tone={context.statusTone} />
            </div>

            {isListing && context.photos && context.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                    {context.photos.slice(0, 4).map((photo) => (
                        <img
                            key={photo.url}
                            src={photo.url}
                            alt={photo.name}
                            loading="lazy"
                            className="aspect-[4/3] w-full rounded-lg object-cover"
                        />
                    ))}
                </div>
            )}

            <dl className="grid gap-2 text-sm">
                {isListing ? (
                    <>
                        <ContextRow label="Listing ID" value={context.publicId ?? 'Not published'} />
                        <ContextRow label="Category" value={context.category} />
                        <ContextRow label="Region" value={context.region} />
                        <ContextRow label="Condition" value={context.condition} />
                        <ContextRow label="Condition notes" value={context.conditionNotes} />
                        <ContextRow
                            label="Asking price"
                            value={context.needsValuation ? 'Valuation requested' : context.askingPrice}
                        />
                    </>
                ) : (
                    <>
                        <ContextRow label="Specifications" value={context.specifications} />
                        <ContextRow label="Budget" value={context.budget} />
                        <ContextRow label="Timeline" value={context.timeline} />
                        <ContextRow label="Location" value={context.locationPreference} />
                    </>
                )}
            </dl>

            {context.href && (
                <Link
                    href={context.href}
                    className="focus-copper w-fit font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline"
                >
                    Open full record
                </Link>
            )}
        </aside>
    );
}

function ContextRow({ label, value }: { label: string; value?: string | null }) {
    if (!value) {
        return null;
    }

    return (
        <div className="grid gap-0.5">
            <dt className="font-heading text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-neutral-400">{label}</dt>
            <dd className="text-sm leading-6 text-neutral-800">{value}</dd>
        </div>
    );
}
