import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import type { SharedPageProps, StatusTone } from '../../types';

type SellerSubmissionDocument = {
    name: string;
    public: boolean;
};

type BrokerOffer = {
    id: number;
    amount: string;
    counter_amount: string | null;
    offered_at: string | null;
    status: string;
    status_label: string;
    status_tone: StatusTone;
    // True only while a seller counter is waiting on the broker.
    can_respond: boolean;
};

type SellerSubmission = {
    id: number;
    seller: string | null;
    email: string | null;
    title: string;
    category: string;
    region: string;
    city: string | null;
    condition_label: string;
    condition_notes: string | null;
    asking_price: string | null;
    needs_valuation: boolean;
    public_id: string | null;
    public_description: string | null;
    manufacturer: string | null;
    model: string | null;
    year: number | null;
    capacity: string | null;
    featured: boolean;
    photo_count: number;
    documents: SellerSubmissionDocument[];
    status: string;
    status_label: string;
    status_tone: StatusTone;
    created_at: string | null;
    created_at_timestamp: number | null;
    offers: BrokerOffer[];
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
    offerStatusOptions: Record<string, string>;
};

export default function BrokerSubmissions({
    sellerSubmissions,
    buyerRequests,
    sellerStatusOptions,
    buyerStatusOptions,
    offerStatusOptions,
}: BrokerSubmissionsProps) {
    const { auth, status } = usePage<SharedPageProps>().props;
    const [activeTab, setActiveTab] = useState<QueueTab>('seller');
    const [expandedSeller, setExpandedSeller] = useState<number | null>(null);
    const [expandedBuyer, setExpandedBuyer] = useState<number | null>(null);

    const [sellerSearch, setSellerSearch] = useState('');
    const [sellerStatusFilter, setSellerStatusFilter] = useState('all');
    const [sellerSortDirection, setSellerSortDirection] = useState<SortDirection>('desc');

    const [buyerSearch, setBuyerSearch] = useState('');
    const [buyerStatusFilter, setBuyerStatusFilter] = useState('all');
    const [buyerSortDirection, setBuyerSortDirection] = useState<SortDirection>('desc');

    const sellerSearched = useMemo(
        () => searchItems(sellerSubmissions, sellerSearch, (item) => [item.title, item.seller, item.email, item.category, item.region, item.city, item.status_label]),
        [sellerSubmissions, sellerSearch],
    );
    const sellerChips = useMemo(() => buildStatusChips(sellerSearched, sellerStatusOptions), [sellerSearched, sellerStatusOptions]);
    const sellerVisible = useMemo(
        () => sortByDate(sellerSearched.filter((item) => sellerStatusFilter === 'all' || item.status === sellerStatusFilter), sellerSortDirection),
        [sellerSearched, sellerStatusFilter, sellerSortDirection],
    );

    const buyerSearched = useMemo(
        () => searchItems(buyerRequests, buyerSearch, (item) => [item.equipment_type, item.buyer, item.email, item.company_name, item.status_label]),
        [buyerRequests, buyerSearch],
    );
    const buyerChips = useMemo(() => buildStatusChips(buyerSearched, buyerStatusOptions), [buyerSearched, buyerStatusOptions]);
    const buyerVisible = useMemo(
        () => sortByDate(buyerSearched.filter((item) => buyerStatusFilter === 'all' || item.status === buyerStatusFilter), buyerSortDirection),
        [buyerSearched, buyerStatusFilter, buyerSortDirection],
    );

    const sellerNeedsReview = useMemo(
        () => sellerSubmissions.filter((item) => item.status === 'under_review').length,
        [sellerSubmissions],
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
                                Signed in as {auth.user?.name ?? 'Petra Broker'} · {sellerSubmissions.length}{' '}
                                {sellerSubmissions.length === 1 ? 'submission' : 'submissions'}
                                {sellerNeedsReview > 0 && (
                                    <>
                                        {' '}
                                        · <span className="font-semibold text-[#a56437]">{sellerNeedsReview} need review</span>
                                    </>
                                )}
                                {' '}· {buyerRequests.length} buyer {buyerRequests.length === 1 ? 'request' : 'requests'}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={logout}
                            className="button-press focus-copper inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[#a56437] px-6 font-heading text-base font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white"
                        >
                            Log out
                        </button>
                    </div>
                </header>

                <div className="mx-auto grid max-w-[1100px] gap-5 px-5 py-6 sm:px-8">
                    <Tabs
                        active={activeTab}
                        onChange={setActiveTab}
                        sellerCount={sellerSubmissions.length}
                        buyerCount={buyerRequests.length}
                    />

                    {activeTab === 'seller' ? (
                        <div className="grid gap-4">
                            <QueueToolbar
                                search={sellerSearch}
                                onSearch={(value) => {
                                    setSellerSearch(value);
                                    setSellerStatusFilter('all');
                                }}
                                chips={sellerChips}
                                activeStatus={sellerStatusFilter}
                                onStatus={setSellerStatusFilter}
                                sort={sellerSortDirection}
                                onSort={setSellerSortDirection}
                            />

                            {sellerSubmissions.length === 0 ? (
                                <EmptyState text="No seller equipment has been submitted yet." />
                            ) : sellerVisible.length === 0 ? (
                                <NoResults
                                    onClear={() => {
                                        setSellerSearch('');
                                        setSellerStatusFilter('all');
                                    }}
                                />
                            ) : (
                                <div className="grid gap-3">
                                    {sellerVisible.map((submission) => (
                                        <SellerCard
                                            key={submission.id}
                                            submission={submission}
                                            statusOptions={sellerStatusOptions}
                                            offerStatusOptions={offerStatusOptions}
                                            expanded={expandedSeller === submission.id}
                                            onToggle={() => setExpandedSeller((current) => (current === submission.id ? null : submission.id))}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            <QueueToolbar
                                search={buyerSearch}
                                onSearch={(value) => {
                                    setBuyerSearch(value);
                                    setBuyerStatusFilter('all');
                                }}
                                chips={buyerChips}
                                activeStatus={buyerStatusFilter}
                                onStatus={setBuyerStatusFilter}
                                sort={buyerSortDirection}
                                onSort={setBuyerSortDirection}
                            />

                            {buyerRequests.length === 0 ? (
                                <EmptyState text="No buyer requests have been submitted yet." />
                            ) : buyerVisible.length === 0 ? (
                                <NoResults
                                    onClear={() => {
                                        setBuyerSearch('');
                                        setBuyerStatusFilter('all');
                                    }}
                                />
                            ) : (
                                <div className="grid gap-3">
                                    {buyerVisible.map((request) => (
                                        <BuyerCard
                                            key={request.id}
                                            request={request}
                                            statusOptions={buyerStatusOptions}
                                            expanded={expandedBuyer === request.id}
                                            onToggle={() => setExpandedBuyer((current) => (current === request.id ? null : request.id))}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
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

type QueueTab = 'seller' | 'buyer';

type StatusChip = { value: string; label: string; count: number };

function searchItems<T>(items: T[], search: string, fields: (item: T) => (string | null)[]): T[] {
    const term = search.trim().toLowerCase();

    if (!term) {
        return items;
    }

    return items.filter((item) => fields(item).filter(Boolean).join(' ').toLowerCase().includes(term));
}

function buildStatusChips<T extends { status: string }>(items: T[], options: Record<string, string>): StatusChip[] {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
        counts[item.status] = (counts[item.status] ?? 0) + 1;
    });

    const chips: StatusChip[] = [{ value: 'all', label: 'All', count: items.length }];

    Object.entries(options).forEach(([value, label]) => {
        if (counts[value]) {
            chips.push({ value, label, count: counts[value] });
        }
    });

    return chips;
}

function formatUSD(value: string): string {
    const amount = Number(value);

    return Number.isNaN(amount)
        ? value
        : amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

// Local YYYY-MM-DD for the offer-date input default (today).
function todayIso(): string {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;

    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function summaryPrice(submission: SellerSubmission): string {
    if (submission.needs_valuation) {
        return 'Valuation requested';
    }

    return submission.asking_price ? formatUSD(submission.asking_price) : 'No price set';
}

function Tabs({
    active,
    onChange,
    sellerCount,
    buyerCount,
}: {
    active: QueueTab;
    onChange: (tab: QueueTab) => void;
    sellerCount: number;
    buyerCount: number;
}) {
    const tabs: { key: QueueTab; label: string; count: number }[] = [
        { key: 'seller', label: 'Seller Submissions', count: sellerCount },
        { key: 'buyer', label: 'Buyer Requests', count: buyerCount },
    ];

    return (
        <div className="flex flex-wrap gap-1.5 rounded-xl border border-[#dad5cb] bg-white p-1.5 shadow-sm sm:w-fit">
            {tabs.map((tab) => {
                const isActive = tab.key === active;

                return (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => onChange(tab.key)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`focus-copper inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-heading text-sm font-semibold uppercase tracking-[0.08em] transition-colors sm:flex-none ${
                            isActive ? 'bg-[#a56437] text-white' : 'text-neutral-600 hover:bg-[#f3f1ec] hover:text-neutral-900'
                        }`}
                    >
                        {tab.label}
                        <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                                isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                            }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

function QueueToolbar({
    search,
    onSearch,
    chips,
    activeStatus,
    onStatus,
    sort,
    onSort,
}: {
    search: string;
    onSearch: (value: string) => void;
    chips: StatusChip[];
    activeStatus: string;
    onStatus: (value: string) => void;
    sort: SortDirection;
    onSort: (value: SortDirection) => void;
}) {
    return (
        <div className="grid gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative sm:w-80">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        <SearchIcon />
                    </span>
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => onSearch(event.target.value)}
                        placeholder="Search by title, name, or email"
                        aria-label="Search"
                        className="h-11 w-full rounded-lg border border-[#dad5cb] bg-white pl-10 pr-9 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#a56437] focus:ring-2 focus:ring-[#a56437]/15 [&::-webkit-search-cancel-button]:appearance-none"
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => onSearch('')}
                            aria-label="Clear search"
                            className="focus-copper absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-[#f3f1ec] hover:text-neutral-700"
                        >
                            <CloseIcon />
                        </button>
                    )}
                </div>

                <label className="flex items-center gap-2">
                    <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Sort</span>
                    <select
                        value={sort}
                        onChange={(event) => onSort(event.target.value as SortDirection)}
                        className="polished-select h-11 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-9 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800"
                    >
                        <option value="desc">Newest first</option>
                        <option value="asc">Oldest first</option>
                    </select>
                </label>
            </div>

            <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                    <Chip key={chip.value} active={chip.value === activeStatus} count={chip.count} onClick={() => onStatus(chip.value)}>
                        {chip.label}
                    </Chip>
                ))}
            </div>
        </div>
    );
}

function Chip({
    active,
    count,
    onClick,
    children,
}: {
    active: boolean;
    count: number;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`focus-copper inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                active
                    ? 'border-[#a56437] bg-[#a56437] text-white'
                    : 'border-[#dad5cb] bg-white text-neutral-600 hover:border-[#a56437] hover:text-[#a56437]'
            }`}
        >
            {children}
            <span className={`rounded-full px-1.5 text-[0.65rem] ${active ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                {count}
            </span>
        </button>
    );
}

function SellerCard({
    submission,
    statusOptions,
    offerStatusOptions,
    expanded,
    onToggle,
}: {
    submission: SellerSubmission;
    statusOptions: Record<string, string>;
    offerStatusOptions: Record<string, string>;
    expanded: boolean;
    onToggle: () => void;
}) {
    const region = submission.city ? `${submission.region} — ${submission.city}` : submission.region;

    return (
        <article className="overflow-hidden rounded-xl border border-[#dad5cb] bg-white shadow-sm">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={expanded}
                className="focus-copper flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-[#faf8f5]"
            >
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950">{submission.title}</h3>
                        {submission.public_id && (
                            <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-[#a56437]">{submission.public_id}</span>
                        )}
                    </div>
                    <p className="mt-1 truncate text-xs leading-5 text-neutral-500">
                        {[submission.seller, submission.email, submission.created_at].filter(Boolean).join(' · ')}
                    </p>
                    <p className="mt-1 truncate text-xs text-neutral-500">
                        {submission.category} · {region} · {summaryPrice(submission)}
                    </p>
                </div>
                <StatusBadge status={submission.status} label={submission.status_label} />
                <ChevronToggle expanded={expanded} />
            </button>

            <div className={expanded ? 'border-t border-[#ece7dd] px-5 pb-5 pt-5' : 'hidden'}>
                <dl className="grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                    <Detail label="Category" value={submission.category} />
                    <Detail label="Region" value={region} />
                    <Detail label="Condition" value={submission.condition_label} />
                    <Detail
                        label="Asking price"
                        value={submission.needs_valuation ? 'Valuation requested' : submission.asking_price ? formatUSD(submission.asking_price) : null}
                    />
                    <Detail label="Photos" value={`${submission.photo_count} uploaded`} />
                    {submission.condition_notes && (
                        <div className="sm:col-span-2">
                            <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                Condition notes (private)
                            </dt>
                            <dd className="mt-1 whitespace-pre-line text-neutral-700">{submission.condition_notes}</dd>
                        </div>
                    )}
                </dl>

                <SellerReviewForm submission={submission} options={statusOptions} />

                <OfferManager submission={submission} statusOptions={offerStatusOptions} />
            </div>
        </article>
    );
}

function OfferManager({ submission, statusOptions }: { submission: SellerSubmission; statusOptions: Record<string, string> }) {
    // Offers have no entry point anywhere else — the broker logs them here after
    // working the buyer side off-platform. The seller then accepts / declines /
    // counters from their own Offers page.
    const defaultStatus = 'pending' in statusOptions ? 'pending' : Object.keys(statusOptions)[0] ?? '';
    const form = useForm<{ amount: string; offered_at: string; status: string }>({
        amount: '',
        offered_at: todayIso(),
        status: defaultStatus,
    });

    const errors = form.errors as Record<string, string>;

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post(`/broker/seller-submissions/${submission.id}/offers`, {
            preserveScroll: true,
            onSuccess: () => form.reset('amount'),
        });
    }

    return (
        <section className="mt-6 border-t border-[#dad5cb] pt-6">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]">Offers</span>

            {submission.offers.length > 0 ? (
                <div className="mt-3 grid gap-2">
                    {submission.offers.map((offer) => (
                        <OfferRow key={offer.id} offer={offer} />
                    ))}
                </div>
            ) : (
                <p className="mt-3 text-sm leading-6 text-neutral-500">No offers logged yet.</p>
            )}

            <form onSubmit={submit} className="mt-4 flex flex-wrap items-end gap-3">
                <label className="grid gap-2">
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Amount (USD)</span>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        inputMode="decimal"
                        value={form.data.amount}
                        onChange={(event) => form.setData('amount', event.target.value)}
                        placeholder="USD"
                        aria-invalid={Boolean(errors.amount)}
                        className={`portal-input sm:w-44${errors.amount ? ' portal-input-error' : ''}`}
                    />
                </label>
                <label className="grid gap-2">
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Offer date</span>
                    <input
                        type="date"
                        value={form.data.offered_at}
                        onChange={(event) => form.setData('offered_at', event.target.value)}
                        aria-invalid={Boolean(errors.offered_at)}
                        className={`portal-input sm:w-44${errors.offered_at ? ' portal-input-error' : ''}`}
                    />
                </label>
                <label className="grid gap-2">
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Status</span>
                    <select
                        value={form.data.status}
                        onChange={(event) => form.setData('status', event.target.value)}
                        className="polished-select h-10 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-9 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800"
                    >
                        {Object.entries(statusOptions).map(([status, label]) => (
                            <option key={status} value={status}>
                                {label}
                            </option>
                        ))}
                    </select>
                </label>
                <button
                    type="submit"
                    disabled={form.processing}
                    className="button-press focus-copper h-10 rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    Log offer
                </button>
            </form>
            {(errors.amount || errors.offered_at || errors.status) && (
                <p className="mt-2 text-sm text-[#b3261e]">{errors.amount ?? errors.offered_at ?? errors.status}</p>
            )}
        </section>
    );
}

/**
 * One logged offer. Read-only until the seller counters — at that point the ball is in
 * the broker's court (`can_respond`) and the counter is resolved in place: accept the
 * seller's number, decline it, or re-offer, which sends the offer back as Pending.
 */
function OfferRow({ offer }: { offer: BrokerOffer }) {
    const [reofferOpen, setReofferOpen] = useState(false);
    // One form per row covers all three responses; `action` is set at submit time.
    const form = useForm<{ action: string; amount: string }>({ action: '', amount: '' });

    function respond(action: 'accept' | 'decline') {
        form.transform((data) => ({ ...data, action, amount: '' }));
        form.patch(`/broker/offers/${offer.id}`, { preserveScroll: true });
    }

    function submitReoffer(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.transform((data) => ({ ...data, action: 'counter' }));
        form.patch(`/broker/offers/${offer.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setReofferOpen(false);
                form.reset('amount');
            },
        });
    }

    const amountError = (form.errors as Record<string, string>).amount;
    // A counter that survived onto an accepted offer is the price both sides settled on.
    const agreedAtCounter = offer.status === 'accepted' && Boolean(offer.counter_amount);

    return (
        <div className="rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="font-heading text-base font-semibold text-neutral-900">
                        {formatUSD(agreedAtCounter ? (offer.counter_amount as string) : offer.amount)}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                        Offered {offer.offered_at ?? 'n/a'}
                        {offer.counter_amount
                            ? agreedAtCounter
                                ? ` · Agreed at the seller's counter (offered ${formatUSD(offer.amount)})`
                                : ` · Seller countered ${formatUSD(offer.counter_amount)}`
                            : ''}
                    </p>
                </div>
                <StatusBadge status={offer.status} label={offer.status_label} />
            </div>

            {offer.can_respond && (
                <div className="mt-3 border-t border-[#dad5cb] pt-3">
                    <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        Respond to counter
                    </span>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            disabled={form.processing}
                            onClick={() => respond('accept')}
                            className="button-press focus-copper inline-flex h-9 items-center justify-center rounded-lg bg-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                        >
                            Accept {formatUSD(offer.counter_amount ?? offer.amount)}
                        </button>
                        <button
                            type="button"
                            disabled={form.processing}
                            onClick={() => respond('decline')}
                            className="button-press focus-copper inline-flex h-9 items-center justify-center rounded-lg border border-[#b3261e] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#b3261e] transition-colors hover:bg-[#b3261e] hover:text-white disabled:opacity-60"
                        >
                            Decline
                        </button>
                        <button
                            type="button"
                            disabled={form.processing}
                            onClick={() => setReofferOpen((open) => !open)}
                            aria-expanded={reofferOpen}
                            className="button-press focus-copper inline-flex h-9 items-center justify-center rounded-lg border border-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white disabled:opacity-60"
                        >
                            Re-offer
                        </button>
                    </div>

                    {reofferOpen && (
                        <form onSubmit={submitReoffer} className="mt-3 flex flex-wrap items-end gap-2">
                            <label className="grid gap-2">
                                <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                    New amount (USD)
                                </span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    inputMode="decimal"
                                    value={form.data.amount}
                                    onChange={(event) => form.setData('amount', event.target.value)}
                                    placeholder="USD"
                                    aria-invalid={Boolean(amountError)}
                                    className={`portal-input sm:w-44${amountError ? ' portal-input-error' : ''}`}
                                />
                            </label>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                            >
                                Send re-offer
                            </button>
                            {amountError && <span className="text-sm text-[#b3261e]">{amountError}</span>}
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}

function BuyerCard({
    request,
    statusOptions,
    expanded,
    onToggle,
}: {
    request: BuyerRequest;
    statusOptions: Record<string, string>;
    expanded: boolean;
    onToggle: () => void;
}) {
    return (
        <article className="overflow-hidden rounded-xl border border-[#dad5cb] bg-white shadow-sm">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={expanded}
                className="focus-copper flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-[#faf8f5]"
            >
                <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950">{request.equipment_type}</h3>
                    <p className="mt-1 truncate text-xs leading-5 text-neutral-500">
                        {[request.buyer, request.email, request.created_at].filter(Boolean).join(' · ')}
                    </p>
                    <p className="mt-1 truncate text-xs text-neutral-500">
                        {[request.budget_range, request.timeline].filter(Boolean).join(' · ')}
                    </p>
                </div>
                <StatusBadge status={request.status} label={request.status_label} />
                <ChevronToggle expanded={expanded} />
            </button>

            <div className={expanded ? 'border-t border-[#ece7dd] px-5 pb-5 pt-5' : 'hidden'}>
                <dl className="grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                    <Detail label="Phone" value={request.phone} />
                    <Detail label="Company" value={request.company_name} />
                    <Detail label="Specifications" value={request.specifications} />
                    <Detail label="Budget range" value={request.budget_range} />
                    <Detail label="Location preference" value={request.location_preference} />
                    <Detail label="Timeline" value={request.timeline} />
                </dl>

                <div className="mt-5 border-t border-[#dad5cb] pt-5">
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Update status</span>
                    <div className="mt-2">
                        <StatusForm value={request.status} options={statusOptions} action={`/broker/buyer-requests/${request.id}`} />
                    </div>
                </div>
            </div>
        </article>
    );
}

function NoResults({ onClear }: { onClear: () => void }) {
    return (
        <div className="rounded-xl border border-[#dad5cb] bg-white p-8 text-center shadow-sm">
            <p className="text-base leading-7 text-neutral-600">No items match your search or filter.</p>
            <button
                type="button"
                onClick={onClear}
                className="button-press focus-copper mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white"
            >
                Clear filters
            </button>
        </div>
    );
}

function SearchIcon() {
    return (
        <svg
            className="h-5 w-5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
        </svg>
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

function ChevronToggle({ expanded }: { expanded: boolean }) {
    return (
        <svg
            className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

function SellerReviewForm({ submission, options }: { submission: SellerSubmission; options: Record<string, string> }) {
    const form = useForm({
        status: submission.status,
        public_description: submission.public_description ?? '',
        manufacturer: submission.manufacturer ?? '',
        model: submission.model ?? '',
        year: submission.year != null ? String(submission.year) : '',
        capacity: submission.capacity ?? '',
        featured: submission.featured,
        documents_public: submission.documents.map((document) => document.public),
    });

    const errors = form.errors as Record<string, string>;

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.patch(`/broker/seller-submissions/${submission.id}`, { preserveScroll: true });
    }

    return (
        <form onSubmit={submit} className="mt-6 border-t border-[#dad5cb] pt-6">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]">Broker Enrichment</span>

            {errors.publish_block && (
                <p className="mt-3 rounded-lg border border-[#b3261e]/30 bg-red-50 px-4 py-3 text-sm leading-6 text-[#b3261e]">
                    {errors.publish_block}
                </p>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <EnrichField label="Public description" error={errors.public_description} className="sm:col-span-2">
                    <textarea
                        value={form.data.public_description}
                        onChange={(event) => form.setData('public_description', event.target.value)}
                        className={`portal-input min-h-24 py-3${errors.public_description ? ' portal-input-error' : ''}`}
                        placeholder="Buyer-facing description. Required to publish. Never shows raw seller notes."
                    />
                </EnrichField>
                <EnrichField label="Manufacturer" error={errors.manufacturer}>
                    <input value={form.data.manufacturer} onChange={(event) => form.setData('manufacturer', event.target.value)} className="portal-input" />
                </EnrichField>
                <EnrichField label="Model" error={errors.model}>
                    <input value={form.data.model} onChange={(event) => form.setData('model', event.target.value)} className="portal-input" />
                </EnrichField>
                <EnrichField label="Year" error={errors.year}>
                    <input
                        type="number"
                        inputMode="numeric"
                        value={form.data.year}
                        onChange={(event) => form.setData('year', event.target.value)}
                        className={`portal-input${errors.year ? ' portal-input-error' : ''}`}
                    />
                </EnrichField>
                <EnrichField label="Capacity" error={errors.capacity}>
                    <input value={form.data.capacity} onChange={(event) => form.setData('capacity', event.target.value)} className="portal-input" />
                </EnrichField>
            </div>

            {submission.documents.length > 0 && (
                <div className="mt-5">
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Documents — mark public</span>
                    <div className="mt-2 grid gap-2">
                        {submission.documents.map((document, index) => (
                            <label key={`${document.name}-${index}`} className="flex items-center gap-3 rounded-lg border border-[#dad5cb] bg-white p-3">
                                <input
                                    type="checkbox"
                                    checked={form.data.documents_public[index] ?? false}
                                    onChange={(event) =>
                                        form.setData(
                                            'documents_public',
                                            form.data.documents_public.map((value, i) => (i === index ? event.target.checked : value)),
                                        )
                                    }
                                    className="h-4 w-4 shrink-0 accent-[#a56437]"
                                />
                                <span className="min-w-0 truncate text-sm font-semibold text-neutral-900">{document.name}</span>
                                <span className="ml-auto font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                                    {(form.data.documents_public[index] ?? false) ? 'Public' : 'Private'}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <label className="mt-5 flex w-fit cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    checked={form.data.featured}
                    onChange={(event) => form.setData('featured', event.target.checked)}
                    className="h-4 w-4 shrink-0 accent-[#a56437]"
                />
                <span className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700">Feature on homepage &amp; top of marketplace</span>
            </label>

            <div className="mt-6 flex flex-wrap items-end gap-3 border-t border-[#dad5cb] pt-5">
                <label className="grid gap-2">
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Status</span>
                    <select
                        value={form.data.status}
                        onChange={(event) => form.setData('status', event.target.value)}
                        className="polished-select h-10 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-9 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800"
                    >
                        {Object.entries(options).map(([status, label]) => (
                            <option key={status} value={status}>
                                {label}
                            </option>
                        ))}
                    </select>
                </label>
                <button
                    type="submit"
                    disabled={form.processing}
                    className="button-press focus-copper h-10 rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    {form.data.status === 'published' ? 'Publish' : 'Save'}
                </button>
            </div>
        </form>
    );
}

function EnrichField({ label, error, className = '', children }: { label: string; error?: string; className?: string; children: ReactNode }) {
    return (
        <label className={`grid gap-2 ${className}`}>
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</span>
            {children}
            {error && <span className="text-sm text-[#b3261e]">{error}</span>}
        </label>
    );
}

function StatusForm({ value, options, action }: { value: string; options: Record<string, string>; action: string }) {
    const form = useForm({ status: value });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.patch(action, { preserveScroll: true });
    }

    return (
        <form onSubmit={submit} className="flex flex-wrap items-center gap-2">
            <StatusBadge status={form.data.status} label={options[form.data.status] ?? form.data.status} />
            <select value={form.data.status} onChange={(event) => form.setData('status', event.target.value)} className="h-10 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-3 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800">
                {Object.entries(options).map(([status, label]) => (
                    <option key={status} value={status}>
                        {label}
                    </option>
                ))}
            </select>
            <button type="submit" disabled={form.processing} className="button-press focus-copper h-10 rounded-lg border border-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] hover:bg-[#a56437] hover:text-white disabled:opacity-60">
                Save
            </button>
        </form>
    );
}

function StatusBadge({ status, label }: { status: string; label: string }) {
    return (
        <span className={`inline-flex h-7 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] shadow-sm ${statusBadgeClass(status)}`}>
            {label}
        </span>
    );
}

function statusBadgeClass(status: string): string {
    switch (status) {
        // Canonical listing statuses (App\Enums\ListingStatus) — shared with the seller portal.
        case 'under_review':
            return 'border-[#dad5cb] bg-[#f3f1ec] text-neutral-700';
        case 'published':
            return 'border-emerald-800/25 bg-emerald-50 text-emerald-800';
        case 'pending':
            return 'border-amber-800/25 bg-amber-50 text-amber-800';
        case 'sold':
            return 'border-neutral-300 bg-neutral-100 text-neutral-500';
        case 'not_accepted':
            return 'border-[#b3261e]/25 bg-red-50 text-[#b3261e]';

        // Buyer-request statuses keep their own lifecycle and colors.
        case 'checking_inventory':
            return 'border-amber-300 bg-amber-50 text-amber-800';
        case 'contacting_sellers':
            return 'border-sky-300 bg-sky-50 text-sky-800';
        case 'options_presented':
            return 'border-indigo-300 bg-indigo-50 text-indigo-800';
        case 'reviewing_options':
            return 'border-emerald-300 bg-emerald-50 text-emerald-800';
        // Terminal — closing a quote also frees the buyer to request one again.
        case 'closed':
            return 'border-neutral-300 bg-neutral-100 text-neutral-500';

        // Offer statuses (App\Enums\OfferStatus). 'pending'/'accepted' overlap with
        // listing wording above; the remaining two are offer-specific.
        case 'accepted':
            return 'border-emerald-800/25 bg-emerald-50 text-emerald-800';
        case 'declined':
            return 'border-[#b3261e]/25 bg-red-50 text-[#b3261e]';
        case 'countered':
            return 'border-[#dad5cb] bg-[#f3f1ec] text-neutral-700';
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
    return <p className="rounded-xl border border-[#dad5cb] bg-[#f8f8f6] p-5 text-base leading-7 text-neutral-600">{text}</p>;
}
