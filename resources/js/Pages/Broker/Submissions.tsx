import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import SlideOver from '../../Components/slide-over';
import DataTable, { CellStack } from '../../Components/data-table';
import type { DataTableColumn } from '../../Components/data-table';
import {
    Detail,
    EmptyState,
    NoResults,
    QueueToolbar,
    SlideOverTabs,
    StatusBadge,
    formatUSD,
    summaryPrice,
    todayIso,
    useQueue,
} from '../../Components/broker-queue';
import BrokerDocumentsPanel from '../../Components/broker-documents-panel';
import type { BrokerOffer, SellerSubmission } from '../../Components/broker-queue';
import type { PortalData, SharedPageProps } from '../../types';

type BrokerSubmissionsProps = {
    portal: PortalData;
    sellerSubmissions: SellerSubmission[];
    sellerStatusOptions: Record<string, string>;
    offerStatusOptions: Record<string, string>;
};

/**
 * The seller review queue, and the broker's landing page.
 *
 * This used to be one page holding both queues behind tabs, with every submission's
 * full review form expanding inline — a single very long scroll. The buyer queue is now
 * its own sidebar destination (Pages/Broker/Requests), and the review form opens in a
 * slide-over so the list itself stays a scannable set of rows.
 */
export default function BrokerSubmissions({
    portal,
    sellerSubmissions,
    sellerStatusOptions,
    offerStatusOptions,
}: BrokerSubmissionsProps) {
    const { status } = usePage<SharedPageProps>().props;
    // Track the open submission by id, not by object: after any save the props are
    // replaced, and a held object would keep rendering pre-save data in the panel.
    const [activeId, setActiveId] = useState<number | null>(null);
    const active = sellerSubmissions.find((submission) => submission.id === activeId) ?? null;
    // Reset with the panel, not with the row: reopening a submission should start on
    // Review, and a broker who left the last one on Documents would otherwise land
    // straight on the upload form for a different listing.
    const [tab, setTab] = useState<'review' | 'documents'>('review');

    const queue = useQueue(sellerSubmissions, sellerStatusOptions, (item) => [
        item.title,
        item.seller,
        item.email,
        // An unclaimed lead is often remembered by the company or the number on the message,
        // since there is no account to look it up by.
        item.company,
        item.phone,
        item.category,
        item.region,
        item.city,
        item.status_label,
        item.public_id,
    ]);

    const needsReview = sellerSubmissions.filter((item) => item.status === 'under_review').length;

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <Head title="Seller Submissions | Broker Portal" />

            <PortalShell
                portal={portal}
                title="Seller Submissions"
                eyebrow={`${sellerSubmissions.length} total${needsReview > 0 ? ` · ${needsReview} need review` : ''}`}
            >
                <div className="grid gap-4">
                    <QueueToolbar
                        search={queue.search}
                        onSearch={queue.onSearch}
                        chips={queue.chips}
                        activeStatus={queue.statusFilter}
                        onStatus={queue.setStatusFilter}
                        sort={queue.sort}
                        onSort={queue.setSort}
                        placeholder="Search by title, seller, email, or ID"
                    />

                    {sellerSubmissions.length === 0 ? (
                        <EmptyState text="No seller equipment has been submitted yet." />
                    ) : queue.visible.length === 0 ? (
                        <NoResults onClear={queue.clear} />
                    ) : (
                        <DataTable
                            columns={SUBMISSION_COLUMNS}
                            rows={queue.visible}
                            rowKey={(submission) => submission.id}
                            onRowClick={(submission) => setActiveId(submission.id)}
                            rowLabel={(submission) => `Review ${submission.title}`}
                            caption="Seller equipment submissions awaiting broker review"
                        />
                    )}
                </div>

                <SlideOver
                    open={active !== null}
                    onClose={() => {
                        setActiveId(null);
                        setTab('review');
                    }}
                    eyebrow={active?.public_id ?? 'Review submission'}
                    title={active?.title ?? ''}
                >
                    {active && (
                        <div className="grid gap-6">
                            <SlideOverTabs
                                tabs={[
                                    { key: 'review', label: 'Review' },
                                    { key: 'documents', label: 'Documents', count: active.documents.length },
                                ]}
                                active={tab}
                                onSelect={setTab}
                            />

                            {tab === 'documents' ? (
                                <BrokerDocumentsPanel
                                    documents={active.documents}
                                    subjectType="listing"
                                    subjectId={active.id}
                                    // An unclaimed lead has no account, so there is
                                    // nobody the "share" option could address.
                                    recipientName={active.is_unclaimed_lead ? null : active.seller}
                                />
                            ) : (
                            <>
                            {active.is_unclaimed_lead && (
                                <p className="rounded-lg border border-[#a56437]/30 bg-[#f4ece4] px-4 py-3 text-sm leading-6 text-[#8a5330]">
                                    <strong className="font-semibold">Unclaimed lead.</strong> This came from the public form
                                    without a signed-in seller, so there is no account to message. Reach out using the contact
                                    details below.
                                </p>
                            )}

                            <dl className="grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                <Detail label={active.is_unclaimed_lead ? 'Contact' : 'Seller'} value={active.seller} />
                                <Detail label="Company" value={active.company} />
                                <Detail label="Email" value={active.email} />
                                <Detail label="Phone" value={active.phone} />
                                <Detail label="Category" value={active.category} />
                                <Detail label="Region" value={regionOf(active)} />
                                <Detail label="Condition" value={active.condition_label} />
                                {/* Portal submissions are always a single unit and never asked. */}
                                {active.quantity > 1 && <Detail label="Quantity" value={`${active.quantity} units`} />}
                                <Detail
                                    label="Asking price"
                                    value={
                                        active.needs_valuation
                                            ? 'Valuation requested'
                                            : active.asking_price
                                              ? formatUSD(active.asking_price)
                                              : null
                                    }
                                />
                                <Detail label="Photos" value={`${active.photo_count} uploaded`} />
                                <Detail label="Submitted" value={active.created_at} />
                                <Detail label="Submitted via" value={sourceLabel(active.source)} />

                                {/* The public form's selling-intent block. Absent entirely on portal
                                    submissions, so each row appears only when it was actually asked. */}
                                {active.ownership_label && <Detail label="Owns the equipment" value={active.ownership_label} />}
                                {active.availability_label && <Detail label="Available to sell" value={active.availability_label} />}
                                {active.value_range_label && (
                                    <Detail label="Seller's value estimate" value={active.value_range_label} />
                                )}
                                {active.intent_labels.length > 0 && (
                                    <div className="sm:col-span-2">
                                        <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                            Looking to
                                        </dt>
                                        <dd className="mt-1 text-neutral-700">{active.intent_labels.join(' · ')}</dd>
                                    </div>
                                )}

                                {active.condition_notes && (
                                    <div className="sm:col-span-2">
                                        <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                            Condition notes (private)
                                        </dt>
                                        <dd className="mt-1 whitespace-pre-line text-neutral-700">{active.condition_notes}</dd>
                                    </div>
                                )}
                            </dl>

                            {/* Keyed on id AND status so the form remounts when the server moves the
                                listing underneath it — accepting an offer auto-advances the status to
                                Pending, and without this the dropdown would keep showing the old value. */}
                            <SellerReviewForm key={`${active.id}:${active.status}`} submission={active} options={sellerStatusOptions} />

                            <OfferManager submission={active} statusOptions={offerStatusOptions} />
                            </>
                            )}
                        </div>
                    )}
                </SlideOver>
            </PortalShell>
        </>
    );
}

/**
 * "Wyoming — Powder River" / "Wyoming — Casper". The portal form collects a city, the public
 * form collects a Wyoming sub-region instead; a row carries at most one of them.
 */
function regionOf(submission: SellerSubmission): string {
    const detail = submission.city ?? submission.wyoming_subregion_label;

    return detail ? `${submission.region} — ${detail}` : submission.region;
}

/**
 * Flags a submission with nobody behind it. The broker's whole workflow changes: there is no
 * account to message and no seller who can answer an offer, so the contact details on the row
 * are the only way to reach this person.
 */
function sourceLabel(source: string): string {
    return source === 'public' ? 'Public website form' : 'Seller portal';
}

function UnclaimedLeadChip() {
    return (
        <span className="rounded-full bg-[#f4ece4] px-2 py-0.5 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#8a5330]">
            Unclaimed lead
        </span>
    );
}

/**
 * Column layout for the seller queue. Equipment and Status stay at every width; the
 * rest drop away on smaller screens rather than forcing a sideways scroll to read a row.
 */
const SUBMISSION_COLUMNS: DataTableColumn<SellerSubmission>[] = [
    {
        key: 'equipment',
        header: 'Equipment',
        cell: (submission) => {
            const openOffers = submission.offers.filter(
                (offer) => offer.status === 'pending' || offer.status === 'countered',
            ).length;

            return (
                <CellStack
                    primary={
                        <>
                            <span className="font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950">
                                {submission.title}
                            </span>
                            {submission.public_id && (
                                <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-[#a56437]">
                                    {submission.public_id}
                                </span>
                            )}
                            {openOffers > 0 && (
                                <span className="rounded-full bg-amber-50 px-2 py-0.5 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-amber-800">
                                    {openOffers === 1 ? 'Offer open' : `${openOffers} offers open`}
                                </span>
                            )}
                            {submission.is_unclaimed_lead && <UnclaimedLeadChip />}
                        </>
                    }
                    secondary={`${submission.category} · ${regionOf(submission)}${
                        submission.quantity > 1 ? ` · ${submission.quantity} units` : ''
                    }`}
                />
            );
        },
    },
    {
        key: 'seller',
        header: 'Seller',
        hideBelow: 'lg',
        cell: (submission) => <CellStack primary={submission.seller ?? '—'} secondary={submission.email ?? undefined} />,
    },
    {
        key: 'price',
        header: 'Asking price',
        hideBelow: 'md',
        align: 'right',
        cell: (submission) => <span className="whitespace-nowrap">{summaryPrice(submission)}</span>,
    },
    {
        key: 'submitted',
        header: 'Submitted',
        hideBelow: 'xl',
        cell: (submission) => <span className="whitespace-nowrap">{submission.created_at ?? '—'}</span>,
    },
    {
        key: 'status',
        header: 'Status',
        align: 'right',
        cell: (submission) => <StatusBadge status={submission.status} label={submission.status_label} />,
    },
];

function SellerReviewForm({ submission, options }: { submission: SellerSubmission; options: Record<string, string> }) {
    const form = useForm({
        status: submission.status,
        public_description: submission.public_description ?? '',
        manufacturer: submission.manufacturer ?? '',
        model: submission.model ?? '',
        year: submission.year != null ? String(submission.year) : '',
        capacity: submission.capacity ?? '',
        featured: submission.featured,
    });

    const errors = form.errors as Record<string, string>;

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.patch(`/broker/seller-submissions/${submission.id}`, {
            preserveScroll: true,
            // Re-baseline so the button goes back to disabled after a save; without this
            // isDirty stays true against the original props and the button stays live.
            onSuccess: () => form.setDefaults(),
        });
    }

    return (
        <form onSubmit={submit} className="border-t border-[#dad5cb] pt-6">
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
                    <input
                        value={form.data.manufacturer}
                        onChange={(event) => form.setData('manufacturer', event.target.value)}
                        className="portal-input"
                    />
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
                    <input
                        value={form.data.capacity}
                        onChange={(event) => form.setData('capacity', event.target.value)}
                        className="portal-input"
                    />
                </EnrichField>
            </div>

            {/* Document visibility used to be a row of checkboxes here, aligned to an
                index in a JSON array. It moved to the Documents tab, where visibility is
                chosen per file at upload time and a public document is one of three
                states rather than a boolean. */}

            <label className="mt-5 flex w-fit cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    checked={form.data.featured}
                    onChange={(event) => form.setData('featured', event.target.checked)}
                    className="h-4 w-4 shrink-0 accent-[#a56437]"
                />
                <span className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700">
                    Feature on homepage &amp; top of marketplace
                </span>
            </label>

            <div className="mt-6 flex flex-wrap items-end gap-3 border-t border-[#dad5cb] pt-5">
                <label className="grid gap-2">
                    {/* "Listing status" — distinct from the per-offer status below. Both
                        vocabularies have a "Pending"; this one means a deal is in progress. */}
                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Listing status</span>
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
                    disabled={form.processing || !form.isDirty}
                    className="button-press focus-copper h-10 rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    {form.data.status === 'published' ? 'Publish' : 'Save'}
                </button>
                {!form.isDirty && !form.processing && <span className="pb-2.5 text-sm text-neutral-400">No unsaved changes</span>}
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

function OfferManager({ submission, statusOptions }: { submission: SellerSubmission; statusOptions: Record<string, string> }) {
    // Offers have no entry point anywhere else — the broker logs them here after
    // working the buyer side off-platform. The seller then accepts / declines /
    // counters from their own Offers page.
    const defaultStatus = 'pending' in statusOptions ? 'pending' : (Object.keys(statusOptions)[0] ?? '');
    const form = useForm<{ amount: string; offered_at: string; status: string }>({
        amount: '',
        offered_at: todayIso(),
        status: defaultStatus,
    });

    const errors = form.errors as Record<string, string>;

    // A listing carries one negotiation at a time. While an offer is still open the
    // log-offer form is replaced by an explanation of what has to happen first —
    // showing a form whose submit is guaranteed to bounce is worse than not showing it.
    // Mirrors the server guard in Broker\SubmissionReviewController::storeOffer.
    const openOffer = submission.offers.find((offer) => offer.status === 'pending' || offer.status === 'countered');

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post(`/broker/seller-submissions/${submission.id}/offers`, {
            preserveScroll: true,
            onSuccess: () => form.reset('amount'),
        });
    }

    return (
        <section className="border-t border-[#dad5cb] pt-6">
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

            {submission.is_unclaimed_lead ? (
                <p className="mt-4 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3 text-sm leading-6 text-neutral-600">
                    Offers cannot be logged against an unclaimed lead. An offer is answered by the seller from their own
                    Offers page, and this submission has no account behind it — one logged here could never be accepted,
                    declined, or countered. Negotiate using the contact details above; once this person has a seller
                    account the submission can be attached to it.
                </p>
            ) : openOffer ? (
                <p className="mt-4 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3 text-sm leading-6 text-neutral-600">
                    {openOffer.status === 'countered'
                        ? `The seller countered ${formatUSD(openOffer.counter_amount ?? openOffer.amount)}. Accept, decline, or re-offer above — a re-offer replaces this negotiation rather than starting a second one.`
                        : `${formatUSD(openOffer.amount)} is awaiting the seller's response. You can log another offer once the seller accepts, declines, or counters it.`}
                </p>
            ) : (
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
                        {/* "Offer status", not "Status" — the listing has its own separate status
                            vocabulary above, and both sets contain a "Pending" meaning different
                            things (offer: awaiting the seller; listing: a deal is in progress). */}
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Offer status</span>
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
                        disabled={form.processing || form.data.amount.trim() === ''}
                        className="button-press focus-copper h-10 rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                        Log offer
                    </button>
                </form>
            )}
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
