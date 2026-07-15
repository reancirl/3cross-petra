import { Head } from '@inertiajs/react';
import PortalShell from '../../Components/portal-shell';
import type { PortalData } from '../../types';

type DashboardProps = {
    portal: PortalData;
};

export default function Dashboard({ portal }: DashboardProps) {
    const summaryCards = portal.userType === 'seller'
        ? [
            {
                label: 'My Listings',
                state: 'Live',
                description: 'Submit equipment and track review status from My Listings.',
            },
            {
                label: 'Quotes',
                state: 'Soon',
                description: 'Quote workflows are reserved for a later phase.',
            },
            {
                label: 'Messages',
                state: 'Soon',
                description: 'Messaging is reserved for a later phase.',
            },
        ]
        : [
            {
                label: 'My Requests',
                state: 'Live',
                description: 'Submit equipment requests and track review status from My Requests.',
            },
            {
                label: 'Saved Equipment',
                state: 'Soon',
                description: 'The marketplace watchlist is reserved for a later phase.',
            },
            {
                label: 'Quotes',
                state: 'Soon',
                description: 'Quote workflows are reserved for a later phase.',
            },
        ];

    const subtitle = portal.userType === 'seller'
        ? 'Track your listings and portal activity'
        : 'Track your requests and portal activity';

    return (
        <>
            <Head title={`${portal.roleLabel} Dashboard`} />

            <PortalShell portal={portal} title={`${portal.roleLabel} Dashboard`} eyebrow={subtitle}>
                <section className="grid gap-6">
                    <article className="rounded-2xl border border-[#dad5cb] bg-white p-7 shadow-sm sm:p-8">
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                            Overview
                        </span>
                        <h2 className="mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                            Activity Summary
                        </h2>
                        <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600">{portal.summary}</p>
                    </article>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {summaryCards.map((card) => (
                            <article
                                key={card.label}
                                className="interactive-lift rounded-2xl border border-[#dad5cb] bg-white p-6 shadow-sm"
                            >
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4ece4] text-[#a56437]">
                                        <span className="h-2 w-2 rounded-full bg-[#a56437]" />
                                    </span>
                                    <span className={`rounded-full border px-2.5 py-1 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${
                                        card.state === 'Live'
                                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                            : 'border-neutral-200 bg-neutral-50 text-neutral-500'
                                    }`}>
                                        {card.state}
                                    </span>
                                </div>
                                <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                    {card.label}
                                </h3>
                                <p className="mt-4 text-sm leading-6 text-neutral-600">
                                    {card.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </PortalShell>
        </>
    );
}
