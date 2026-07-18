import { router } from '@inertiajs/react';

/**
 * Where the current page was reached from, plus remembered scroll offsets.
 *
 * Returning to a long list has to put the buyer back where they were regardless of how
 * they got there — the in-page back link, the top nav, or the browser back button.
 * Those take three different routes through the stack:
 *
 *   - Inertia <Link> visits are client-side, so document.referrer is never updated and
 *     only the tracker below knows the previous page.
 *   - Plain <a> navigations are full page loads that wipe the tracker, but the browser
 *     does set document.referrer.
 *   - Browser back is a popstate, which fires 'navigate' but never 'before'.
 *
 * TIMING: the previous page is recorded on 'before', not 'navigate'. 'navigate' fires
 * after React has committed the incoming page, so a component reading the tracker in
 * its first effect would always see the state from before the visit. 'before' fires
 * while the outgoing page is still mounted, which is early enough.
 */
let previousUrl: string | null = null;
let currentUrl: string | null = null;

const SCROLL_PREFIX = 'petra:scroll:';

/** Receives the path being navigated to, or null when the document itself is unloading. */
type LeaveHandler = (target: string | null) => void;

const leaveHandlers = new Set<LeaveHandler>();

function notifyLeaving(target: string | null): void {
    leaveHandlers.forEach((handler) => handler(target));
}

function locationPath(): string {
    return window.location.pathname + window.location.search;
}

export function trackNavigation(): void {
    if (typeof window === 'undefined') {
        return;
    }

    currentUrl = locationPath();

    router.on('before', (event) => {
        const visit = event.detail.visit;

        // Only real page changes. A POST (the inquiry form) leaves the user where they
        // are, and recording it would make the page look like its own previous page.
        if (visit.method !== 'get') {
            return;
        }

        const target = visit.url.pathname + visit.url.search;

        if (target === currentUrl) {
            return;
        }

        notifyLeaving(visit.url.pathname);
        previousUrl = currentUrl;
        currentUrl = target;
    });

    // Browser back/forward never fires 'before', so the trail is picked up here instead.
    router.on('navigate', (event) => {
        const url = event.detail.page.url;

        if (url === currentUrl) {
            return;
        }

        previousUrl = currentUrl;
        currentUrl = url;
    });

    // Full page loads (a plain <a>, or closing the tab) bypass Inertia entirely. The
    // destination is unknowable here, hence the null.
    window.addEventListener('pagehide', () => notifyLeaving(null));
}

/**
 * Runs a callback at the moment the user navigates away, with the destination path.
 *
 * Scroll offsets are captured here rather than on every scroll event: during a visit
 * the page keeps emitting scroll events — including Inertia's own reset to the top on
 * arrival — so a continuously-saving listener overwrites the departure position with a
 * mid-transition value and then with 0.
 *
 * Knowing the destination is what lets a page decide whether the position is worth
 * keeping ("off to a detail page, I'll be back") or should be dropped ("off elsewhere,
 * next arrival is a fresh visit"). That decision has to happen on the way OUT, because
 * on the way back in there is no reliable way to tell how the user got there —
 * popstate never fires 'before', so the tracker is a step behind on browser back.
 *
 * @return unsubscribe
 */
export function onLeavingPage(handler: LeaveHandler): () => void {
    leaveHandlers.add(handler);

    return () => {
        leaveHandlers.delete(handler);
    };
}

/**
 * Pathname of the page the user came from, or null on a cold entry (typed URL, shared
 * link, search result). Prefers the tracker, since on a client-side visit
 * document.referrer still points at whatever last caused a full page load.
 */
export function previousPath(): string | null {
    if (previousUrl !== null) {
        return previousUrl.split('?')[0];
    }

    if (typeof document === 'undefined' || document.referrer === '') {
        return null;
    }

    try {
        const referrer = new URL(document.referrer);

        // Off-site referrers are cold entries — arriving from a search result is not
        // "coming back".
        return referrer.origin === window.location.origin ? referrer.pathname : null;
    } catch {
        return null;
    }
}

export function arrivedFrom(path: string): boolean {
    return previousPath() === path;
}

export function saveScroll(key: string): void {
    if (typeof window === 'undefined') {
        return;
    }

    window.sessionStorage.setItem(SCROLL_PREFIX + key, String(Math.round(window.scrollY)));
}

/**
 * sessionStorage rather than memory: a plain <a> navigation reloads the document and
 * destroys anything held in JS.
 */
export function clearScroll(key: string): void {
    if (typeof window === 'undefined') {
        return;
    }

    window.sessionStorage.removeItem(SCROLL_PREFIX + key);
}

export function readScroll(key: string): number | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const stored = Number(window.sessionStorage.getItem(SCROLL_PREFIX + key));

    return Number.isFinite(stored) && stored > 0 ? stored : null;
}
