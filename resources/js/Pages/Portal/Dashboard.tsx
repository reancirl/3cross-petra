import { Head } from '@inertiajs/react';
import PortalShell from '../../Components/portal-shell';
import type { PortalData } from '../../types';

type DashboardProps = {
    portal: PortalData;
};

export default function Dashboard({ portal }: DashboardProps) {
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
                        {['Saved Equipment', 'Quotes', 'Messages'].map((label) => (
                            <article key={label} className="bg-white p-6">
                                <div className="mb-5 h-1.5 w-1.5 bg-[#a56437]" />
                                <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                    {label}
                                </h3>
                                <p className="mt-4 text-sm leading-6 text-neutral-600">
                                    Coming soon once the {label.toLowerCase()} data model is defined.
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </PortalShell>
        </>
    );
}
