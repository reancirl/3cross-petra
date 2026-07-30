import { Head, router } from '@inertiajs/react';
import PortalPageHeader, { portalHeaderActionClass } from '../../Components/portal-page-header';
import PortalShell from '../../Components/portal-shell';
import type { NotificationFeed, NotificationItem, PortalData } from '../../types';

type NotificationsProps = {
    portal: PortalData;
    notifications: NotificationFeed;
};

/**
 * The in-app notification feed — one screen, all three portals.
 *
 * Rows are the shared feed of events the portal already surfaces elsewhere: a listing
 * published, a message posted, a document shared, a submission arriving in a broker
 * queue. Clicking a row marks it read and lands on the thing it is about (the deep link
 * the server resolved), so the feed is a router into the portal rather than a place to
 * read anything in full.
 *
 * Server-paginated, newest first, 20 to a page — the badge count comes from the same 45s
 * shared-prop poll as Messages and Documents, never a second loop.
 */
export default function Notifications({ portal, notifications }: NotificationsProps) {
    const { items, currentPage, lastPage, total } = notifications;
    const unreadCount = items.filter((item) => !item.isRead).length;

    function open(item: NotificationItem, event: React.MouseEvent) {
        // Let a modified click (new tab / new window) through untouched — the row is a
        // real link to its subject, and opening it elsewhere should not hijack this tab.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        event.preventDefault();

        if (item.isRead) {
            router.visit(item.url);
            return;
        }

        // Mark read first so the badge and the dot are correct on arrival, then navigate.
        router.post(
            `/${portal.userType}/notifications/${item.id}/read`,
            {},
            { preserveScroll: true, onFinish: () => router.visit(item.url) },
        );
    }

    function markAllRead() {
        router.post(`/${portal.userType}/notifications/read-all`, {}, { preserveScroll: true });
    }

    return (
        <>
            <Head title={`Notifications | ${portal.roleLabel} Portal`} />

            <PortalShell portal={portal} title="Notifications">
                <div className="grid gap-5">
                    <PortalPageHeader
                        eyebrow="Your activity"
                        title="Notifications"
                        description={
                            total === 0
                                ? 'Nothing here yet'
                                : `${total} ${total === 1 ? 'notification' : 'notifications'}${
                                      unreadCount > 0 ? ` · ${unreadCount} unread on this page` : ''
                                  }`
                        }
                        actions={
                            unreadCount > 0 ? (
                                <button type="button" onClick={markAllRead} className={portalHeaderActionClass}>
                                    Mark all read
                                </button>
                            ) : undefined
                        }
                    />

                    {items.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <section className="overflow-hidden rounded-xl border border-[#dad5cb] bg-white shadow-sm">
                            <ul className="divide-y divide-[#ece7dd]">
                                {items.map((item) => (
                                    <li key={item.id}>
                                        <a
                                            href={item.url}
                                            onClick={(event) => open(item, event)}
                                            className={`flex items-start gap-4 px-4 py-4 transition-colors hover:bg-[#f9f7f3] sm:px-5 ${
                                                item.isRead ? '' : 'bg-[#faf6f1]'
                                            }`}
                                        >
                                            <span
                                                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                                    item.isRead
                                                        ? 'bg-neutral-100 text-neutral-400'
                                                        : 'bg-[#f4ece4] text-[#a56437]'
                                                }`}
                                            >
                                                <NotificationIcon name={item.icon} />
                                            </span>

                                            <span className="min-w-0 flex-1">
                                                <span
                                                    className={`block text-sm leading-6 ${
                                                        item.isRead ? 'text-neutral-600' : 'font-semibold text-neutral-950'
                                                    }`}
                                                >
                                                    {item.title}
                                                </span>
                                                <span className="mt-0.5 block font-heading text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                                                    {formatRelative(item.createdAt)}
                                                </span>
                                            </span>

                                            {!item.isRead && (
                                                <span
                                                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#a56437]"
                                                    aria-label="Unread"
                                                />
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {lastPage > 1 && (
                        <nav className="flex items-center justify-between" aria-label="Notifications pages">
                            <PageLink
                                portal={portal}
                                page={currentPage - 1}
                                disabled={currentPage <= 1}
                                label="Newer"
                            />
                            <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                                Page {currentPage} of {lastPage}
                            </span>
                            <PageLink
                                portal={portal}
                                page={currentPage + 1}
                                disabled={currentPage >= lastPage}
                                label="Older"
                            />
                        </nav>
                    )}
                </div>
            </PortalShell>
        </>
    );
}

function PageLink({
    portal,
    page,
    disabled,
    label,
}: {
    portal: PortalData;
    page: number;
    disabled: boolean;
    label: string;
}) {
    if (disabled) {
        return (
            <span className="inline-flex h-10 items-center rounded-lg border border-[#e4dfd5] px-4 font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-300">
                {label}
            </span>
        );
    }

    return (
        <button
            type="button"
            onClick={() => router.visit(`/${portal.userType}/notifications?page=${page}`, { preserveScroll: true })}
            className="focus-copper inline-flex h-10 items-center rounded-lg border border-[#dad5cb] px-4 font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-600 transition-colors hover:bg-[#f3f1ec] hover:text-neutral-900"
        >
            {label}
        </button>
    );
}

function EmptyState() {
    return (
        <article className="rounded-xl border border-dashed border-[#cfc7ba] bg-white px-6 py-12 text-center">
            <p className="mx-auto max-w-md text-base leading-7 text-neutral-600">You're all caught up.</p>
        </article>
    );
}

/**
 * Relative age for a feed row. Seconds and minutes read as "just now" / "5m ago"; past a
 * day it falls back to a plain date, because "34d ago" is less useful than "Jun 21".
 */
function formatRelative(iso: string | null): string {
    if (!iso) {
        return '';
    }

    const then = new Date(iso);
    const seconds = Math.floor((Date.now() - then.getTime()) / 1000);

    if (seconds < 45) {
        return 'Just now';
    }
    if (seconds < 3600) {
        return `${Math.max(1, Math.floor(seconds / 60))}m ago`;
    }
    if (seconds < 86400) {
        return `${Math.floor(seconds / 3600)}h ago`;
    }

    const now = new Date();
    if (then.getFullYear() === now.getFullYear()) {
        return then.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    return then.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * The feed glyphs, matching the PortalNavIcon vocabulary the sidebar uses so a
 * notification wears the same icon as the section it points at.
 */
function NotificationIcon({ name }: { name: string }) {
    const common = {
        className: 'h-4 w-4 shrink-0',
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        strokeWidth: 1.8,
        viewBox: '0 0 24 24',
        'aria-hidden': true,
    };

    switch (name) {
        case 'equipment':
            return (
                <svg {...common}>
                    <path d="M4 16h16" />
                    <path d="M6 16l2-6h8l2 6" />
                    <path d="M8 18.5h.01" />
                    <path d="M16 18.5h.01" />
                    <path d="M9 10V7h6v3" />
                </svg>
            );
        case 'quotes':
            return (
                <svg {...common}>
                    <path d="M7 7h10" />
                    <path d="M7 12h8" />
                    <path d="M7 17h5" />
                    <path d="M5 3h14v18H5z" />
                </svg>
            );
        case 'documents':
            return (
                <svg {...common}>
                    <path d="M7 3h7l4 4v14H7z" />
                    <path d="M14 3v5h5" />
                    <path d="M10 13h6" />
                    <path d="M10 17h4" />
                </svg>
            );
        case 'leads':
            return (
                <svg {...common}>
                    <path d="M10 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    <path d="M3 20a7 7 0 0 1 11.3-5.5" />
                    <path d="M18 14v6" />
                    <path d="M15 17h6" />
                </svg>
            );
        case 'messages':
        default:
            return (
                <svg {...common}>
                    <path d="M4 5h16v11H8l-4 4z" />
                    <path d="M8 9h8" />
                    <path d="M8 13h5" />
                </svg>
            );
    }
}
