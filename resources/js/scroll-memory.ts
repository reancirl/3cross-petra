import { useEffect } from 'react';
import { clearScroll, onLeavingPage, readScroll, saveScroll } from './navigation';

// ~40 frames (≈650ms). Has to outlast two things that land after the effect runs:
// Inertia's own scroll reset on arrival, and the incoming list settling — until it
// does, the document is short and the offset clamps to a smaller maximum.
const RESTORE_FRAMES = 40;

type ScrollMemoryOptions = {
    /** sessionStorage key. Unique per list, so two lists never restore each other. */
    key: string;
    /** Path prefix of the detail pages this list opens, e.g. '/equipment/'. */
    detailPrefix: string;
};

/**
 * Returns a list to the position it was left at when the user comes back from one of
 * its detail pages.
 *
 * Opening the last row of a long list and then heading back used to land at the top,
 * forcing a re-scroll. This restores the offset for every route back — an in-page back
 * link, a nav item (a full page reload), and the browser back button.
 *
 * THE DECISION IS MADE ON THE WAY OUT. Detecting "the user is coming back" on arrival
 * is not reliable: browser back is a popstate, which never fires Inertia's 'before'
 * event, so any "where did I come from" check is a step stale by the time the list
 * mounts. Leaving *for a detail page* is unambiguous, so a stored offset simply means
 * "expected back". Leaving anywhere else drops it and the next arrival starts at the
 * top, which is what a genuinely fresh visit should do.
 */
export function useScrollMemory({ key, detailPrefix }: ScrollMemoryOptions): void {
    useEffect(
        () =>
            onLeavingPage((target) => {
                if (target !== null && target.startsWith(detailPrefix)) {
                    saveScroll(key);
                } else {
                    clearScroll(key);
                }
            }),
        [key, detailPrefix],
    );

    useEffect(() => {
        const target = readScroll(key);

        if (target === null) {
            return;
        }

        // Consumed on use, so a restored position is never replayed onto a later fresh
        // visit to the list.
        clearScroll(key);

        // behavior 'instant' is essential, not a preference. The document sets
        // scroll-behavior: smooth (app.css), which a bare scrollTo inherits — and since
        // this re-applies every frame, each call restarts the easing from wherever the
        // last one reached, so the position converges on the target without ever
        // arriving. It lands a few hundred pixels short and reads as a clamping bug.
        const jumpTo = (top: number) => window.scrollTo({ top, left: 0, behavior: 'instant' });

        let frame = 0;
        let attempts = 0;

        const apply = () => {
            if (Math.abs(window.scrollY - target) > 2) {
                jumpTo(target);
            }

            attempts += 1;

            if (attempts < RESTORE_FRAMES) {
                frame = requestAnimationFrame(apply);
            }
        };

        jumpTo(target);
        frame = requestAnimationFrame(apply);

        return () => cancelAnimationFrame(frame);
    }, [key]);
}
