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

    return (
        <>
            <Head title={`${portal.roleLabel} Dashboard`} />

            <PortalShell portal={portal} title={`${portal.roleLabel} Dashboard`}>
                <section className="grid gap-6">
                    <article className="border border-[#dad5cb] bg-white p-7 sm:p-8">
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                            Overview
                        </span>
                        <h2 className="mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                            Activity Summary
                        </h2>
                        <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600">{portal.summary}</p>
                    </article>

                    <div className="grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-3">
                        {summaryCards.map((card) => (
                            <article key={card.label} className="bg-white p-6">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <span className="h-1.5 w-1.5 bg-[#a56437]" />
                                    <span className={`border px-2.5 py-1 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${
                                        card.state === 'Live'
                                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                                            : 'border-neutral-300 bg-neutral-50 text-neutral-600'
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
