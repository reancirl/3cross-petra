import { Link } from '@inertiajs/react';
import type { ThreadSummary } from '../types';

/**
 * The conversation list, shared by the customer Messages screen and the broker
 * Inbox. Rows are Links rather than click handlers so a thread is a real URL —
 * back/forward, middle-click, and the mobile split all follow from that.
 *
 * `showParticipant` is what separates the two uses: the broker needs to know who
 * they are talking to, while a customer only ever has one counterparty (Petra) and
 * would gain nothing from a column repeating it.
 */

type ThreadListProps = {
    threads: ThreadSummary[];
    activeId: number | null;
    showParticipant?: boolean;
    emptyLabel?: string;
};

function formatTimestamp(iso: string | null): string {
    if (!iso) {
        return '';
    }

    const date = new Date(iso);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    }

    if (date.getFullYear() === now.getFullYear()) {
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function Chip({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
    return (
        <span
            className={`max-w-full truncate rounded-full px-2 py-0.5 font-heading text-[0.6rem] font-semibold uppercase tracking-[0.08em] ${
                muted ? 'bg-neutral-100 text-neutral-400' : 'bg-[#f3f1ec] text-neutral-500'
            }`}
        >
            {children}
        </span>
    );
}

export default function ThreadList({ threads, activeId, showParticipant = false, emptyLabel }: ThreadListProps) {
    if (threads.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-[#dad5cb] bg-white p-6 text-sm leading-6 text-neutral-500">
                {emptyLabel ?? 'No conversations.'}
            </div>
        );
    }

    return (
        // overflow-x-hidden and the min-w-0 chain below matter: without them a long
        // subject or snippet widens the grid track and the whole list gets a
        // horizontal scrollbar instead of truncating.
        <ul className="grid max-h-[calc(100dvh-15rem)] min-w-0 gap-1 overflow-y-auto overflow-x-hidden rounded-xl border border-[#dad5cb] bg-white p-2 shadow-sm">
            {threads.map((thread) => {
                const active = thread.id === activeId;
                const unread = thread.unreadCount > 0;

                return (
                    <li key={thread.id} className="min-w-0">
                        <Link
                            href={thread.url}
                            aria-current={active ? 'true' : undefined}
                            // overflow-hidden so nothing can paint past the rounded
                            // border of the row itself.
                            className={`grid min-w-0 gap-1 overflow-hidden rounded-lg border p-3 transition-colors ${
                                active
                                    ? 'border-[#a56437]/40 bg-[#f4ece4]'
                                    : 'border-transparent hover:border-[#dad5cb] hover:bg-[#f9f7f3]'
                            }`}
                        >
                            {/* min-w-0 on every flex/grid wrapper, not just the text:
                                a flex container defaults to min-width:auto, so without
                                it the row grows to fit its content and the `truncate`
                                on the child never gets a narrower box to clamp to. */}
                            <span className="flex min-w-0 items-start justify-between gap-2">
                                <span
                                    className={`min-w-0 truncate text-sm ${
                                        unread ? 'font-semibold text-neutral-950' : 'font-medium text-neutral-800'
                                    }`}
                                >
                                    {thread.subjectTitle}
                                </span>
                                <span className="shrink-0 text-[0.7rem] text-neutral-400">{formatTimestamp(thread.lastMessageAt)}</span>
                            </span>

                            {showParticipant && thread.userName && (
                                <span className="min-w-0 truncate font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-neutral-500">
                                    {thread.userName} · {thread.userRole}
                                </span>
                            )}

                            <span className="flex min-w-0 items-center justify-between gap-2">
                                <span className={`min-w-0 truncate text-xs ${unread ? 'text-neutral-700' : 'text-neutral-500'}`}>
                                    {thread.snippet}
                                </span>
                                {unread && (
                                    <span
                                        className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#a56437] px-1.5 text-[0.65rem] font-semibold leading-none text-white"
                                        aria-label={`${thread.unreadCount} unread`}
                                    >
                                        {thread.unreadCount > 99 ? '99+' : thread.unreadCount}
                                    </span>
                                )}
                            </span>

                            <span className="flex min-w-0 flex-wrap items-center gap-1">
                                <Chip>{thread.subjectTypeLabel}</Chip>
                                {thread.subjectStatus && <Chip>{thread.subjectStatus.label}</Chip>}
                                {thread.isClosed && <Chip muted>Closed</Chip>}
                            </span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
