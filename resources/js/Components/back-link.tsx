import { Link } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { arrivedFrom } from '../navigation';

type BackLinkProps = {
    href: string;
    className?: string;
    children: ReactNode;
};

/**
 * A "back to the list" control that actually goes back.
 *
 * A plain link to the list is a forward navigation: it lands at the top with the list's
 * own state (filters, search, page number) reset, so the user has to scroll and
 * re-filter to find where they were. Popping the history entry instead is what lets
 * Inertia restore the remembered state it saved on the way out.
 *
 * Cold entries — a shared link, a bookmark, a hop from somewhere else — have no list
 * entry to pop, so those fall back to a normal visit.
 */
export default function BackLink({ href, className, children }: BackLinkProps) {
    // Resolved once on mount rather than read during render, so this cannot change
    // shape underneath the user if a later visit updates the tracker.
    const [canGoBack] = useState(() => arrivedFrom(href));

    if (!canGoBack) {
        return (
            <Link href={href} className={className}>
                {children}
            </Link>
        );
    }

    return (
        <button type="button" onClick={() => window.history.back()} className={className}>
            {children}
        </button>
    );
}
