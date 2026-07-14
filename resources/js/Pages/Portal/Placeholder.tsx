import { Head } from '@inertiajs/react';
import PortalShell from '../../Components/portal-shell';
import type { PortalData } from '../../types';

const sectionLabels: Record<string, string> = {
    'saved-equipment': 'Saved Equipment',
    'saved-equipment-watchlist': 'Saved Equipment',
    quotes: 'Quotes',
    offers: 'Offers',
    documents: 'Documents',
    messages: 'Messages',
    notifications: 'Notifications',
};

type PlaceholderProps = {
    portal: PortalData;
    section: string;
};

export default function Placeholder({ portal, section }: PlaceholderProps) {
    const title = sectionLabels[section] ?? 'Coming Soon';

    return (
        <>
            <Head title={`${title} | ${portal.roleLabel} Portal`} />

            <PortalShell portal={portal} title={title}>
                <article className="border border-[#dad5cb] bg-white p-7 sm:p-8">
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                        Coming Soon
                    </span>
                    <h2 className="mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                        {title} is a later phase
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600">
                        The sitemap names this section, but it does not yet define the underlying object model, workflow states, or permissions. This pass only reserves the route and navigation entry.
                    </p>
                    {['saved-equipment', 'saved-equipment-watchlist'].includes(section) && (
                        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600">
                            For {portal.roleLabel.toLowerCase()} accounts, the saved-equipment behavior still needs a product decision before data is wired.
                        </p>
                    )}
                </article>
            </PortalShell>
        </>
    );
}
