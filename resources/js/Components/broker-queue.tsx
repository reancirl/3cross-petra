import { useForm } from '@inertiajs/react';
import { useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import type { StatusTone } from '../types';

/**
 * Shared plumbing for the two broker review queues (Pages/Broker/Submissions and
 * Pages/Broker/Requests). Both were one tabbed page until the broker portal moved onto
 * the shared PortalShell; splitting them left this list/search/filter machinery in
 * common, so it lives here rather than being duplicated per page.
 */

export type SellerSubmissionDocument = {
    name: string;
    public: boolean;
};

export type BrokerOffer = {
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

export type SellerSubmission = {
    id: number;
    // Account details when there is an account, otherwise what the public form captured.
    seller: string | null;
    email: string | null;
    phone: string | null;
    company: string | null;
    /** No account behind this row — a broker works it from the contact fields above. */
    is_unclaimed_lead: boolean;
    /** 'portal' | 'public'. An owned submission can still be public-sourced. */
    source: string;
    title: string;
    category: string;
    quantity: number;
    region: string;
    city: string | null;
    wyoming_subregion_label: string | null;
    // The public form's selling-intent answers. Null / empty on portal submissions, which
    // never asked them — render each only when present.
    ownership_label: string | null;
    intent_labels: string[];
    availability_label: string | null;
    value_range_label: string | null;
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

export type BuyerRequest = {
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

/**
 * A Talk to a Broker inquiry (App\Models\BrokerInquiry). Unlike the two queues above there
 * is no record behind it to act on — the contact fields are the whole lead, so they are
 * always present rather than nullable account lookups.
 */
export type BrokerLead = {
    id: number;
    full_name: string;
    company: string | null;
    email: string;
    phone: string;
    topic: string;
    topic_label: string;
    equipment_type: string | null;
    message: string;
    preferred_contact_label: string;
    // Set only when the visitor happened to be signed in. Context, not the reply address.
    account_name: string | null;
    account_email: string | null;
    status: string;
    status_label: string;
    status_tone: StatusTone;
    created_at: string | null;
    created_at_timestamp: number | null;
};

export type SortDirection = 'desc' | 'asc';

export type StatusChip = { value: string; label: string; count: number };

type QueueItem = { status: string; created_at_timestamp: number | null };

function sortByDate<T extends QueueItem>(items: T[], direction: SortDirection): T[] {
    return [...items].sort((first, second) => {
        const firstTimestamp = first.created_at_timestamp ?? 0;
        const secondTimestamp = second.created_at_timestamp ?? 0;

        return direction === 'desc' ? secondTimestamp - firstTimestamp : firstTimestamp - secondTimestamp;
    });
}

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

/**
 * Search + status-chip + sort state for one queue. Searching resets the status filter,
 * since the chip counts are derived from the search results and a stale filter would
 * otherwise hide everything the new search found.
 */
export function useQueue<T extends QueueItem>(
    items: T[],
    statusOptions: Record<string, string>,
    fields: (item: T) => (string | null)[],
) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sort, setSort] = useState<SortDirection>('desc');

    // Callers pass `fields` inline, so it is a new function every render. Reading it
    // through a ref keeps it out of the memo deps without going stale.
    const fieldsRef = useRef(fields);
    fieldsRef.current = fields;

    const searched = useMemo(() => searchItems(items, search, (item: T) => fieldsRef.current(item)), [items, search]);
    const chips = useMemo(() => buildStatusChips(searched, statusOptions), [searched, statusOptions]);
    const visible = useMemo(
        () => sortByDate(searched.filter((item) => statusFilter === 'all' || item.status === statusFilter), sort),
        [searched, statusFilter, sort],
    );

    function onSearch(value: string) {
        setSearch(value);
        setStatusFilter('all');
    }

    function clear() {
        setSearch('');
        setStatusFilter('all');
    }

    return { search, onSearch, chips, statusFilter, setStatusFilter, sort, setSort, visible, clear };
}

export function formatUSD(value: string): string {
    const amount = Number(value);

    return Number.isNaN(amount)
        ? value
        : amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

// Local YYYY-MM-DD for the offer-date input default (today).
export function todayIso(): string {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;

    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function summaryPrice(submission: SellerSubmission): string {
    if (submission.needs_valuation) {
        return 'Valuation requested';
    }

    return submission.asking_price ? formatUSD(submission.asking_price) : 'No price set';
}

export function QueueToolbar({
    search,
    onSearch,
    chips,
    activeStatus,
    onStatus,
    sort,
    onSort,
    placeholder = 'Search by title, name, or email',
}: {
    search: string;
    onSearch: (value: string) => void;
    chips: StatusChip[];
    activeStatus: string;
    onStatus: (value: string) => void;
    sort: SortDirection;
    onSort: (value: SortDirection) => void;
    placeholder?: string;
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
                        placeholder={placeholder}
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

export function NoResults({ onClear }: { onClear: () => void }) {
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

export function StatusForm({
    value,
    options,
    action,
    label = 'Save',
}: {
    value: string;
    options: Record<string, string>;
    action: string;
    label?: string;
}) {
    const form = useForm({ status: value });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.patch(action, {
            preserveScroll: true,
            // Re-baseline so the button re-disables after saving; without this isDirty
            // stays true against the original props and the button stays live.
            onSuccess: () => form.setDefaults(),
        });
    }

    return (
        <form onSubmit={submit} className="flex flex-wrap items-center gap-2">
            <StatusBadge status={form.data.status} label={options[form.data.status] ?? form.data.status} />
            <select
                value={form.data.status}
                onChange={(event) => form.setData('status', event.target.value)}
                className="polished-select h-10 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-9 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800"
            >
                {Object.entries(options).map(([status, optionLabel]) => (
                    <option key={status} value={status}>
                        {optionLabel}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                disabled={form.processing || !form.isDirty}
                className="button-press focus-copper h-10 rounded-lg border border-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white disabled:opacity-60"
            >
                {label}
            </button>
        </form>
    );
}

export function StatusBadge({ status, label }: { status: string; label: string }) {
    return (
        <span
            className={`inline-flex h-7 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] shadow-sm ${statusBadgeClass(status)}`}
        >
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
        // Terminal — closing a quote also frees the buyer to request one again. Shared with
        // the broker-lead lifecycle below, which ends the same way and reads the same.
        case 'closed':
            return 'border-neutral-300 bg-neutral-100 text-neutral-500';

        // Broker lead statuses (App\Models\BrokerInquiry). 'new' wears the copper the portal
        // uses for "this one is waiting on you"; nothing else in the app claims it.
        case 'new':
            return 'border-[#a56437]/30 bg-[#f4ece4] text-[#8a5330]';
        case 'contacted':
            return 'border-sky-300 bg-sky-50 text-sky-800';

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

export function Detail({ label, value }: { label: string; value: string | null }) {
    return (
        <div>
            <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</dt>
            <dd className="mt-1 text-neutral-700">{value || 'Not provided'}</dd>
        </div>
    );
}

export function EmptyState({ text }: { text: string }) {
    return <p className="rounded-xl border border-[#dad5cb] bg-[#f8f8f6] p-5 text-base leading-7 text-neutral-600">{text}</p>;
}
