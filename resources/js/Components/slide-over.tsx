import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';

type SlideOverProps = {
    children: ReactNode;
    eyebrow?: string;
    open: boolean;
    title: string;
    onClose: () => void;
};

/**
 * Right-hand slide-over panel, built on Radix Dialog.
 *
 * This was hand-rolled: a rAF/setTimeout pair drove the transition, and it handled
 * Escape and body-scroll locking itself. It did NOT trap focus — Tab walked straight out
 * of the panel into the page behind it — nor restore focus to the trigger on close, nor
 * hide the background from screen readers. Radix supplies all three, plus a Presence
 * layer that keeps the node mounted through the exit animation, which is what makes
 * closing animate rather than snap.
 *
 * The props are unchanged from the hand-rolled version so call sites did not move; the
 * animation lives in app.css keyed off Radix's data-state attributes.
 */
export default function SlideOver({ children, eyebrow, open, title, onClose }: SlideOverProps) {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={(next) => {
                // Radix reports both directions; the panel is opened by the caller's own
                // state, so only the close edge is ours to forward.
                if (!next) {
                    onClose();
                }
            }}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="slide-over-overlay fixed inset-0 z-[80] bg-neutral-950/40" />

                <Dialog.Content
                    // Radix warns when a dialog has no description. These panels are
                    // labelled by their title and the body is arbitrary content, so opt
                    // out explicitly rather than inventing prose for the screen reader.
                    aria-describedby={undefined}
                    // portal-shell is repeated here on purpose: Radix renders this through
                    // a Portal at the end of <body>, outside the PortalShell <main>, so the
                    // scoped soft-edge rules in app.css would not otherwise reach the inputs
                    // inside the panel. The panel itself stays square — it is edge-anchored.
                    className="portal-shell slide-over-panel fixed right-0 top-0 z-[80] grid h-dvh w-full max-w-none content-start overflow-y-auto overscroll-contain border-[#dad5cb] bg-[#f8f8f6] shadow-2xl focus:outline-none sm:max-w-2xl sm:border-l"
                >
                    <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#dad5cb] bg-white px-5 py-5 sm:px-7">
                        <div>
                            {eyebrow && (
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                    {eyebrow}
                                </span>
                            )}
                            <Dialog.Title className="mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                {title}
                            </Dialog.Title>
                        </div>
                        {/*
                          * Matches the sidebar's collapse toggle rather than defining a third
                          * icon-button style. This was a literal capital "X" in a square box:
                          * a text glyph reads at a different weight from every real icon in
                          * the portal, and it sat optically off-centre in its own button.
                          */}
                        <Dialog.Close
                            aria-label="Close panel"
                            className="button-press focus-copper inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#dad5cb] text-neutral-500 transition-colors hover:border-[#a56437] hover:bg-[#f3f1ec] hover:text-neutral-900"
                        >
                            <CloseIcon />
                        </Dialog.Close>
                    </header>

                    <div className="px-5 py-6 sm:px-7">{children}</div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

function CloseIcon() {
    return (
        <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
        </svg>
    );
}
