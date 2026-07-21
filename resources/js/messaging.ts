/**
 * Non-component values for the messaging screens.
 *
 * These live in a plain module rather than next to the components that use them
 * because React Fast Refresh only keeps a hot boundary for files that export
 * components and nothing else. A single exported constant alongside a component
 * makes Vite fall back to a full page reload on every edit to that file, which is
 * most of what "HMR isn't working" feels like in practice.
 */

/** Mirrors App\Models\MessageAttachment::MAX_SIZE_KB. */
export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

/** Mirrors App\Models\MessageAttachment::MAX_PER_MESSAGE. */
export const MAX_ATTACHMENTS = 8;

/** Mirrors the `body` rule in StoreMessageRequest. */
export const MAX_BODY_LENGTH = 5000;

export const ACCEPTED_ATTACHMENT_TYPES = '.jpg,.jpeg,.png,.webp,.heic,.heif,.pdf,image/*,application/pdf';

/** Mirrors App\Models\MessageAttachment::ALLOWED_EXTENSIONS. */
export const ACCEPTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif', 'pdf'];

/**
 * Sent on visits that should not show navigation chrome — read by BlankLayout so
 * sending a message does not dim the page behind the composer.
 */
export const QUIET_VISIT_HEADERS = { 'X-Petra-Quiet-Visit': '1' } as const;

/**
 * Cancellation handle for the in-flight thread poll.
 *
 * The 20s poll and sending a message are separate Inertia visits, so they can
 * overlap: a poll fired a moment before you hit Send is still fetching the
 * pre-send state, and if its response lands after the send's, it overwrites the
 * props and the message you just sent vanishes from the transcript until the next
 * poll. The row is safely in the database the whole time — it is purely the
 * rendered state going backwards.
 *
 * The composer cancels any active poll before posting, so a stale response can
 * never win that race.
 */
let cancelActivePoll: (() => void) | null = null;

export function registerPollCancel(cancel: (() => void) | null): void {
    cancelActivePoll = cancel;
}

export function cancelActivePolling(): void {
    cancelActivePoll?.();
    cancelActivePoll = null;
}

export function formatFileSize(bytes: number | null): string {
    if (bytes === null) {
        return '';
    }

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${Math.round(bytes / 1024)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
