import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AnimatedPage } from '../Components/polish';

type BlankLayoutProps = {
    children: ReactNode;
};

/**
 * A visit the reader did not initiate as navigation: either a partial reload (the
 * messaging polls and mark-as-read, which carry `only`) or one explicitly flagged
 * quiet (sending a message).
 *
 * Read defensively — both fields are Inertia-internal, and anything unexpected
 * should fall through to "treat it as a real navigation" rather than throw.
 */
function isBackgroundVisit(event: unknown): boolean {
    const visit = (event as {
        detail?: { visit?: { only?: unknown; headers?: Record<string, string> } };
    })?.detail?.visit;

    if (Array.isArray(visit?.only) && visit.only.length > 0) {
        return true;
    }

    return visit?.headers?.['X-Petra-Quiet-Visit'] === '1';
}

export default function BlankLayout({ children }: BlankLayoutProps) {
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        // Only real navigations dim the page. Partial reloads — the messaging
        // unread/thread polls and mark-as-read, which carry `only` — are background
        // traffic the reader never asked for, and dimming the page every 20 seconds
        // while someone is mid-sentence reads as the app glitching.
        const removeStartListener = router.on('start', (event) => {
            if (isBackgroundVisit(event)) {
                return;
            }

            setIsNavigating(true);
        });

        const removeFinishListener = router.on('finish', () => setIsNavigating(false));

        return () => {
            removeStartListener();
            removeFinishListener();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#f3f1ec] text-neutral-950">
            <AnimatedPage busy={isNavigating}>{children}</AnimatedPage>
            <Toaster
                position="top-right"
                toastOptions={{
                    classNames: {
                        toast: 'border border-[#dad5cb] bg-white text-neutral-950 shadow-none',
                        title: 'font-sans text-sm font-semibold',
                        description: 'font-sans text-sm text-neutral-600',
                    },
                }}
            />
        </div>
    );
}
