import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { AttachmentList, AttachmentTrigger } from './attachment-picker';
import { MAX_ATTACHMENTS, MAX_BODY_LENGTH, QUIET_VISIT_HEADERS } from '../messaging';

type MessageComposerProps = {
    action: string;
    /** Rendered above the textarea; the broker inbox uses it for canned responses. */
    toolbar?: (insert: (text: string) => void) => React.ReactNode;
    placeholder?: string;
    /** Shown instead of the form when the conversation cannot take new messages. */
    disabledNotice?: string;
};

/**
 * The message input, shared by both sides.
 *
 * Enter inserts a newline and never submits — equipment questions run long and
 * contain lists, and a stray Enter mid-thought sending a half-written message is
 * worse than requiring a deliberate click. Submission is the button only.
 */
export default function MessageComposer({ action, toolbar, placeholder, disabledNotice }: MessageComposerProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const form = useForm<{ body: string; attachments: File[] }>({
        body: '',
        attachments: [],
    });

    // Surface server-side validation (an oversize file, a rejected type) as a toast:
    // the composer is a single control with no room for a field-level error list, and
    // the rejection usually concerns a file rather than the text.
    useEffect(() => {
        const firstError = Object.values(form.errors)[0];

        if (firstError) {
            toast.error(firstError);
        }
    }, [form.errors]);

    function insertAtCursor(text: string) {
        const textarea = textareaRef.current;

        if (!textarea) {
            form.setData('body', form.data.body ? `${form.data.body}\n\n${text}` : text);
            return;
        }

        const { selectionStart, selectionEnd } = textarea;
        const current = form.data.body;
        const next = `${current.slice(0, selectionStart)}${text}${current.slice(selectionEnd)}`;

        form.setData('body', next.slice(0, MAX_BODY_LENGTH));

        // Restore focus and drop the caret after the inserted text, so a broker can
        // keep typing straight after picking a canned response.
        window.requestAnimationFrame(() => {
            textarea.focus();
            const caret = selectionStart + text.length;
            textarea.setSelectionRange(caret, caret);
        });
    }

    function submit(event: React.FormEvent) {
        event.preventDefault();

        if (form.processing) {
            return;
        }

        const hasBody = form.data.body.trim() !== '';

        if (!hasBody && form.data.attachments.length === 0) {
            toast.error('Write a message or attach a file.');
            return;
        }

        form.post(action, {
            // Attachments make this multipart; without it the files are dropped.
            forceFormData: true,
            preserveScroll: true,
            // Marks the visit as quiet so BlankLayout does not dim the page behind
            // the composer. A header rather than `only`, because narrowing the props
            // would also drop the shared `errors` bag and silently kill the
            // rejected-attachment toast.
            headers: QUIET_VISIT_HEADERS,
            onSuccess: () => form.reset(),
        });
    }

    if (disabledNotice) {
        return (
            <div className="border-t border-[#ece7dd] bg-[#f9f7f3] px-4 py-4 text-sm text-neutral-600 sm:px-6">{disabledNotice}</div>
        );
    }

    const remaining = MAX_BODY_LENGTH - form.data.body.length;

    return (
        <form onSubmit={submit} className="grid gap-2 border-t border-[#ece7dd] bg-white px-3 py-3 sm:px-4">
            {/* One scrollable row rather than a wrapping block. Five canned replies
                wrapped to three rows on a laptop, and every row came out of the
                transcript's height. */}
            {toolbar && (
                <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:thin]">
                    {toolbar(insertAtCursor)}
                </div>
            )}

            <textarea
                ref={textareaRef}
                value={form.data.body}
                maxLength={MAX_BODY_LENGTH}
                onChange={(event) => form.setData('body', event.target.value)}
                rows={2}
                placeholder={placeholder ?? 'Write a message…'}
                className="focus-copper max-h-40 w-full resize-y rounded-lg border border-[#dad5cb] bg-white px-3 py-2 text-sm leading-6 text-neutral-900 placeholder:text-neutral-400"
            />

            <AttachmentList files={form.data.attachments} onChange={(files) => form.setData('attachments', files)} />

            {/* Attach, hint and Send share one row — the attach button used to be its
                own full-width block. */}
            <div className="flex items-center gap-2">
                <AttachmentTrigger
                    files={form.data.attachments}
                    max={MAX_ATTACHMENTS}
                    onChange={(files) => form.setData('attachments', files)}
                    onReject={(message) => toast.error(message)}
                />
                <span className="min-w-0 flex-1 truncate text-xs text-neutral-400">
                    {remaining < 500 ? `${remaining} characters left` : 'Enter adds a new line'}
                </span>
                {/* No processing state on the button: it stays "Send" and stays
                    enabled. Sending is fast enough that a spinner reads as a flicker,
                    and the composer clearing is the real confirmation. Double-submit
                    is still impossible — submit() bails while a post is in flight,
                    which matters because messages are append-only and a duplicate
                    could not be deleted afterwards. */}
                <button
                    type="submit"
                    className="button-press focus-copper h-9 shrink-0 rounded-lg bg-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#8a5330]"
                >
                    Send
                </button>
            </div>
        </form>
    );
}
