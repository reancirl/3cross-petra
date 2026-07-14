import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import type { SharedPageProps } from '../../types';

type SellerSubmission = {
    id: number;
    seller: string | null;
    email: string | null;
    equipment_type: string;
    location: string;
    condition: string;
    status: string;
    status_label: string;
    created_at: string | null;
    created_at_timestamp: number | null;
};

type BuyerRequest = {
    id: number;
    buyer: string | null;
    email: string | null;
    phone: string | null;
    company_name: string | null;
    equipment_type: string;
    specifications: string | null;
    budget_range: string;
    location_preference: string;
    timeline: string;
    status: string;
    status_label: string;
    created_at: string | null;
    created_at_timestamp: number | null;
};

type BrokerSubmissionsProps = {
    sellerSubmissions: SellerSubmission[];
    buyerRequests: BuyerRequest[];
    sellerStatusOptions: Record<string, string>;
    buyerStatusOptions: Record<string, string>;
};

export default function BrokerSubmissions({
    sellerSubmissions,
    buyerRequests,
    sellerStatusOptions,
    buyerStatusOptions,
}: BrokerSubmissionsProps) {
    const { auth, status } = usePage<SharedPageProps>().props;
    const [sellerSortDirection, setSellerSortDirection] = useState<SortDirection>('desc');
    const [buyerSortDirection, setBuyerSortDirection] = useState<SortDirection>('desc');
    const sortedSellerSubmissions = useMemo(
        () => sortByDate(sellerSubmissions, sellerSortDirection),
        [sellerSubmissions, sellerSortDirection],
    );
    const sortedBuyerRequests = useMemo(
        () => sortByDate(buyerRequests, buyerSortDirection),
        [buyerRequests, buyerSortDirection],
    );

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    function logout() {
        router.post('/logout', {}, { replace: true });
    }

    return (
        <>
            <Head title="Broker Submissions | Petra" />

            <main className="min-h-screen bg-[#f3f1ec] text-neutral-950">
                <header className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Internal Broker View
                            </span>
                            <h1 className="mt-2 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950">
                                Submission Review
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-neutral-600">
                                Signed in as {auth.user?.name ?? 'Petra Broker'}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={logout}
                            className="button-press focus-copper inline-flex h-10 w-fit items-center justify-center border border-neutral-500 px-6 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                        >
                            Log out
                        </button>
                    </div>
                </header>

                <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-6 sm:px-8 lg:grid-cols-2">
                    <article className="border border-[#dad5cb] bg-white p-5 lg:col-span-2">
                        <h2 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                            Client Flag
                        </h2>
                        <p className="mt-3 max-w-5xl text-base leading-7 text-neutral-600">
                            The sitemap does not define an admin or broker portal. This internal page is the minimum addition needed for Petra staff to manually move seller submissions and buyer requests through the documented process statuses.
                        </p>
                    </article>

                    <SubmissionPanel
                        title="Seller Submissions"
                        itemCount={sellerSubmissions.length}
                        sortDirection={sellerSortDirection}
                        onSortDirectionChange={setSellerSortDirection}
                    >
                        {sortedSellerSubmissions.map((submission) => (
                            <article key={submission.id} className="border border-[#dad5cb] p-5">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                            {submission.equipment_type}
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-neutral-500">
                                            {submission.seller} · {submission.email} · {submission.created_at}
                                        </p>
                                    </div>
                                    <StatusForm
                                        value={submission.status}
                                        options={sellerStatusOptions}
                                        action={`/broker/seller-submissions/${submission.id}`}
                                    />
                                </div>

                                <dl className="mt-5 grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                    <Detail label="Location" value={submission.location} />
                                    <Detail label="Condition" value={submission.condition} />
                                </dl>
                            </article>
                        ))}
                        {sellerSubmissions.length === 0 && <EmptyState text="No seller equipment has been submitted yet." />}
                    </SubmissionPanel>

                    <SubmissionPanel
                        title="Buyer Requests"
                        itemCount={buyerRequests.length}
                        sortDirection={buyerSortDirection}
                        onSortDirectionChange={setBuyerSortDirection}
                    >
                        {sortedBuyerRequests.map((request) => (
                            <article key={request.id} className="border border-[#dad5cb] p-5">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                            {request.equipment_type}
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-neutral-500">
                                            {request.buyer} · {request.email} · {request.created_at}
                                        </p>
                                    </div>
                                    <StatusForm
                                        value={request.status}
                                        options={buyerStatusOptions}
                                        action={`/broker/buyer-requests/${request.id}`}
                                    />
                                </div>

                                <dl className="mt-5 grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                    <Detail label="Phone" value={request.phone} />
                                    <Detail label="Company" value={request.company_name} />
                                    <Detail label="Specifications" value={request.specifications} />
                                    <Detail label="Budget range" value={request.budget_range} />
                                    <Detail label="Location preference" value={request.location_preference} />
                                    <Detail label="Timeline" value={request.timeline} />
                                </dl>
                            </article>
                        ))}
                        {buyerRequests.length === 0 && <EmptyState text="No buyer requests have been submitted yet." />}
                    </SubmissionPanel>
                </div>
            </main>
        </>
    );
}

type SortDirection = 'desc' | 'asc';

function sortByDate<T extends { created_at_timestamp: number | null }>(items: T[], direction: SortDirection): T[] {
    return [...items].sort((first, second) => {
        const firstTimestamp = first.created_at_timestamp ?? 0;
        const secondTimestamp = second.created_at_timestamp ?? 0;

        return direction === 'desc' ? secondTimestamp - firstTimestamp : firstTimestamp - secondTimestamp;
    });
}

function SubmissionPanel({
    title,
    itemCount,
    sortDirection,
    onSortDirectionChange,
    children,
}: {
    title: string;
    itemCount: number;
    sortDirection: SortDirection;
    onSortDirectionChange: (direction: SortDirection) => void;
    children: ReactNode;
}) {
    return (
        <section className="grid content-start gap-4 border border-[#dad5cb] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                    {title}
                </h2>
                {itemCount > 10 && (
                    <label className="flex items-center gap-2">
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                            Sort
                        </span>
                        <select
                            value={sortDirection}
                            onChange={(event) => onSortDirectionChange(event.target.value as SortDirection)}
                            className="h-9 border border-[#dad5cb] bg-[#f8f8f6] px-3 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800"
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </label>
                )}
            </div>
            {children}
        </section>
    );
}

function StatusForm({ value, options, action }: { value: string; options: Record<string, string>; action: string }) {
    const form = useForm({ status: value });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.patch(action, { preserveScroll: true });
    }

    return (
        <form onSubmit={submit} className="flex flex-wrap items-center justify-end gap-2">
            <StatusBadge status={form.data.status} label={options[form.data.status] ?? form.data.status} />
            <select value={form.data.status} onChange={(event) => form.setData('status', event.target.value)} className="h-10 border border-[#dad5cb] bg-[#f8f8f6] px-3 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800">
                {Object.entries(options).map(([status, label]) => (
                    <option key={status} value={status}>
                        {label}
                    </option>
                ))}
            </select>
            <button type="submit" disabled={form.processing} className="button-press focus-copper h-10 border border-neutral-500 px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-neutral-950 hover:bg-neutral-950 hover:text-white disabled:opacity-60">
                Save
            </button>
        </form>
    );
}

function StatusBadge({ status, label }: { status: string; label: string }) {
    return (
        <span className={`inline-flex h-8 items-center border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${statusBadgeClass(status)}`}>
            {label}
        </span>
    );
}

function statusBadgeClass(status: string): string {
    switch (status) {
        case 'under_review':
        case 'checking_inventory':
            return 'border-amber-300 bg-amber-50 text-amber-800';
        case 'buyers_identified':
        case 'contacting_sellers':
            return 'border-sky-300 bg-sky-50 text-sky-800';
        case 'in_negotiation':
        case 'options_presented':
            return 'border-indigo-300 bg-indigo-50 text-indigo-800';
        case 'offer_received':
        case 'reviewing_options':
            return 'border-emerald-300 bg-emerald-50 text-emerald-800';
        default:
            return 'border-neutral-300 bg-neutral-50 text-neutral-700';
    }
}

function Detail({ label, value }: { label: string; value: string | null }) {
    return (
        <div>
            <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</dt>
            <dd className="mt-1 text-neutral-700">{value || 'Not provided'}</dd>
        </div>
    );
}

function EmptyState({ text }: { text: string }) {
    return <p className="border border-[#dad5cb] bg-[#f8f8f6] p-5 text-base leading-7 text-neutral-600">{text}</p>;
}
