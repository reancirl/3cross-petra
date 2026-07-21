import { useEffect, useRef } from 'react';
import { formatFileSize } from '../messaging';
import type { MessageAttachment, ThreadMessage, ThreadMessagePage } from '../types';

/**
 * The message transcript: bubbles, day separators, attachment previews.
 *
 * Shared by the customer Messages screen and the broker Inbox so a conversation
 * looks the same to both sides. Alignment is driven by `mine` (computed server-side
 * against the viewer's side), never by comparing user ids — every broker sees all
 * Petra messages as theirs, which is the point: Petra is one voice.
 */

type MessageThreadProps = {
    page: ThreadMessagePage;
    /** Fires when new messages appear while the thread is open, to mark them read. */
    onNewMessages?: (latestId: number) => void;
    emptyLabel?: string;
};

function dayKey(iso: string): string {
    return new Date(iso).toDateString();
}

function formatDaySeparator(iso: string): string {
    const date = new Date(iso);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }

    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }

    return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

/**
 * Consecutive messages from one side collapse into a run.
 *
 * A run breaks on a change of sender, a new day, or a gap long enough that the
 * two messages are not really the same thought. Without this the transcript
 * repeats "Petra" above every single bubble, which is noise: in a two-party
 * thread the alignment and colour already say who is speaking, so the name only
 * earns its space when the speaker actually changes.
 */
const RUN_GAP_MS = 5 * 60 * 1000;

type GroupedMessage = {
    message: ThreadMessage;
    startsRun: boolean;
    endsRun: boolean;
    startsDay: boolean;
};

function groupMessages(messages: ThreadMessage[]): GroupedMessage[] {
    return messages.map((message, index): GroupedMessage => {
        const previous = index > 0 ? messages[index - 1] : null;
        const next = index < messages.length - 1 ? messages[index + 1] : null;

        const startsDay = previous === null || dayKey(previous.createdAt) !== dayKey(message.createdAt);

        const breaksFromPrevious =
            previous === null ||
            previous.senderType !== message.senderType ||
            startsDay ||
            new Date(message.createdAt).getTime() - new Date(previous.createdAt).getTime() > RUN_GAP_MS;

        const breaksToNext =
            next === null ||
            next.senderType !== message.senderType ||
            dayKey(next.createdAt) !== dayKey(message.createdAt) ||
            new Date(next.createdAt).getTime() - new Date(message.createdAt).getTime() > RUN_GAP_MS;

        return { message, startsRun: breaksFromPrevious, endsRun: breaksToNext, startsDay };
    });
}

/**
 * Square off the corners facing the rest of a run, so stacked bubbles read as one
 * block instead of a column of separate pills.
 */
function bubbleShape(mine: boolean, startsRun: boolean, endsRun: boolean): string {
    const corners = ['rounded-xl'];

    if (!startsRun) {
        corners.push(mine ? 'rounded-tr-sm' : 'rounded-tl-sm');
    }

    if (!endsRun) {
        corners.push(mine ? 'rounded-br-sm' : 'rounded-bl-sm');
    }

    return corners.join(' ');
}

function DaySeparator({ iso }: { iso: string }) {
    return (
        <div className="my-4 flex items-center gap-3 first:mt-0">
            <span className="h-px flex-1 bg-[#e4dfd5]" />
            <span className="font-heading text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                {formatDaySeparator(iso)}
            </span>
            <span className="h-px flex-1 bg-[#e4dfd5]" />
        </div>
    );
}

export default function MessageThread({ page, onNewMessages, emptyLabel }: MessageThreadProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const lastSeenId = useRef<number | null>(null);

    const messages = page.items;
    const latestId = messages.length > 0 ? messages[messages.length - 1].id : null;

    // Pin to the newest message whenever the tail changes. Keyed on the latest id
    // rather than length so a poll that replaces the page without adding anything
    // does not yank a reader who has scrolled up.
    useEffect(() => {
        if (latestId === null) {
            return;
        }

        if (lastSeenId.current !== latestId) {
            scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });

            // Only report genuinely new messages — not the initial render, which the
            // server already marked read when it served the thread.
            if (lastSeenId.current !== null) {
                onNewMessages?.(latestId);
            }

            lastSeenId.current = latestId;
        }
    }, [latestId, onNewMessages]);

    if (messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center p-8 text-center text-sm leading-6 text-neutral-500">
                {emptyLabel ?? 'No messages in this conversation yet.'}
            </div>
        );
    }

    const grouped = groupMessages(messages);

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            {page.hasOlder && (
                <p className="mb-5 text-center text-xs text-neutral-500">
                    Showing the most recent {page.items.length} of {page.total} messages.
                </p>
            )}

            <ol className="grid">
                {grouped.map(({ message, startsRun, endsRun, startsDay }) => (
                    <li
                        key={message.id}
                        // Tight inside a run, open between runs: the spacing is what
                        // signals "same person still talking" now that the name is gone.
                        className={startsRun ? 'mt-4 first:mt-0' : 'mt-0.5'}
                    >
                        {startsDay && <DaySeparator iso={message.createdAt} />}

                        {/* Named once per run, and never for your own messages — you
                            know who you are, and the alignment already says it. */}
                        {startsRun && !message.mine && (
                            <p className="mb-1 ml-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                {message.authorName}
                            </p>
                        )}

                        <div className={`flex ${message.mine ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[85%] px-4 py-2.5 sm:max-w-[70%] ${bubbleShape(message.mine, startsRun, endsRun)} ${
                                    message.mine
                                        ? 'bg-[#a56437] text-white'
                                        : 'border border-[#dad5cb] bg-white text-neutral-900'
                                }`}
                            >
                                {message.body && (
                                    // whitespace-pre-wrap preserves the newlines the composer
                                    // deliberately allows; the body is text, never HTML.
                                    <p className="whitespace-pre-wrap break-words text-sm leading-6">{message.body}</p>
                                )}

                                {message.attachments.length > 0 && (
                                    <ul className={`grid gap-2 ${message.body ? 'mt-2' : ''}`}>
                                        {message.attachments.map((attachment) => (
                                            <li key={attachment.id}>
                                                <AttachmentView attachment={attachment} mine={message.mine} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* One timestamp per run rather than per message. */}
                        {endsRun && (
                            <p className={`mt-1 text-[0.7rem] text-neutral-400 ${message.mine ? 'pr-1 text-right' : 'pl-1'}`}>
                                {formatTime(message.createdAt)}
                            </p>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

function AttachmentView({ attachment, mine }: { attachment: MessageAttachment; mine: boolean }) {
    // Say so outright rather than linking to a 404 or showing a broken-image icon.
    if (!attachment.available) {
        return (
            <span
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                    mine ? 'bg-white/10 text-white/70' : 'bg-[#f3f1ec] text-neutral-500'
                }`}
            >
                <span className="min-w-0 flex-1">
                    <span className="block truncate line-through">{attachment.name}</span>
                    <span className={`block text-xs ${mine ? 'text-white/60' : 'text-neutral-400'}`}>
                        File no longer available
                    </span>
                </span>
            </span>
        );
    }

    if (attachment.isImage) {
        return (
            <a href={attachment.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg">
                <img src={attachment.url} alt={attachment.name} className="max-h-64 w-full object-cover" loading="lazy" />
            </a>
        );
    }

    return (
        <a
            href={attachment.url}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                mine ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-[#f3f1ec] text-neutral-800 hover:bg-[#ece7dd]'
            }`}
        >
            <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded font-heading text-[0.55rem] font-semibold uppercase ${
                    mine ? 'bg-white/20' : 'bg-white'
                }`}
            >
                PDF
            </span>
            <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{attachment.name}</span>
                <span className={`block text-xs ${mine ? 'text-white/70' : 'text-neutral-500'}`}>{formatFileSize(attachment.size)}</span>
            </span>
        </a>
    );
}
