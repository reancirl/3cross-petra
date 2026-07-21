import { Head, Link, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import MessageComposer from '../../Components/message-composer';
import MessageThread from '../../Components/message-thread';
import PortalPageHeader from '../../Components/portal-page-header';
import PortalShell from '../../Components/portal-shell';
import StatusBadge from '../../Components/status-badge';
import ThreadList from '../../Components/thread-list';
import type { PortalData, SharedPageProps, ThreadMessagePage, ThreadSummary } from '../../types';

const THREAD_POLL_MS = 20_000;

type MessagesProps = {
    portal: PortalData;
    threads: ThreadSummary[];
    thread: ThreadSummary | null;
    messages: ThreadMessagePage | null;
};

/**
 * The customer side of messaging, for both the buyer and seller portals.
 *
 * List and conversation are two URLs rather than client-side view state, which is
 * what makes the mobile split work: the list is its own screen, opening a thread is
 * a navigation, and Back is the browser's own. On desktop both panes show at once.
 */
export default function Messages({ portal, threads, thread, messages }: MessagesProps) {
    const { status } = usePage<SharedPageProps>().props;

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    const threadId = thread?.id ?? null;

    /**
     * Refresh the open conversation every 20s.
     *
     * Partial reload of just the thread props, so a poll never re-fetches the whole
     * page. Paused while the tab is hidden — a backgrounded tab polling every 20s is
     * pure waste — and fired once on return so the reader is never looking at a stale
     * conversation while the tab is in front of them.
     */
    useEffect(() => {
        if (threadId === null) {
            return;
        }

        function refresh() {
            if (document.hidden) {
                return;
            }

            router.reload({ only: ['thread', 'messages', 'threads', 'unreadMessageThreads'] });
        }

        const timer = window.setInterval(refresh, THREAD_POLL_MS);
        document.addEventListener('visibilitychange', refresh);

        return () => {
            window.clearInterval(timer);
            document.removeEventListener('visibilitychange', refresh);
        };
    }, [threadId]);

    /**
     * Mark read when messages arrive while the thread is already open. Opening a
     * thread is already marked server-side by the show() action, so this covers only
     * the polling case.
     */
    const markRead = useCallback(() => {
        if (threadId === null) {
            return;
        }

        router.post(
            `/${portal.userType}/messages/${threadId}/read`,
            {},
            { preserveScroll: true, preserveState: true, only: ['threads', 'unreadMessageThreads'] },
        );
    }, [portal.userType, threadId]);

    return (
        <>
            <Head title="Messages | Petra Portal" />

            <PortalShell portal={portal} title="Messages">
                <div className="grid gap-6">
                    <PortalPageHeader
                        eyebrow="Conversations"
                        title="Messages"
                        description="Talk to your Petra broker about your equipment."
                    />

                    {threads.length === 0 ? (
                        <article className="rounded-xl border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600 shadow-sm">
                            No messages yet — conversations with your broker about your equipment will appear here.
                        </article>
                    ) : (
                        <div className="grid gap-4 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
                            {/* On mobile only one pane shows: the list, or the open thread. */}
                            <div className={`min-w-0 ${thread ? 'hidden lg:block' : 'block'}`}>
                                <ThreadList threads={threads} activeId={threadId} />
                            </div>

                            {thread && messages ? (
                                <section className="flex min-h-[26rem] flex-col overflow-hidden rounded-xl border border-[#dad5cb] bg-[#f9f7f3] shadow-sm lg:h-[calc(100dvh-15rem)]">
                                    <header className="grid gap-0.5 border-b border-[#ece7dd] bg-white px-4 py-2.5 sm:px-5">
                                        <Link
                                            href={`/${portal.userType}/messages`}
                                            className="focus-copper w-fit font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline lg:hidden"
                                        >
                                            ← All messages
                                        </Link>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950">
                                                {thread.subjectTitle}
                                            </h2>
                                            {thread.context?.statusLabel && (
                                                <StatusBadge label={thread.context.statusLabel} tone={thread.context.statusTone} />
                                            )}
                                            {thread.isClosed && <StatusBadge label="Closed" tone="muted" />}
                                        </div>
                                        {thread.context?.href && (
                                            <Link
                                                href={thread.context.href}
                                                className="focus-copper w-fit text-sm text-[#a56437] underline-offset-4 hover:underline"
                                            >
                                                View {thread.subjectTypeLabel.toLowerCase()}
                                            </Link>
                                        )}
                                    </header>

                                    <MessageThread page={messages} onNewMessages={markRead} />

                                    <MessageComposer
                                        action={`/${portal.userType}/messages/${thread.id}/messages`}
                                        placeholder="Write a message to Petra…"
                                    />
                                </section>
                            ) : (
                                <section className="hidden items-center justify-center rounded-xl border border-dashed border-[#dad5cb] bg-white p-10 text-center text-sm text-neutral-500 lg:flex">
                                    Select a conversation to read it.
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </PortalShell>
        </>
    );
}

