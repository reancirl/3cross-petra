import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import PortalPageHeader, { portalHeaderActionClass } from '../../Components/portal-page-header';
import BackLink from '../../Components/back-link';
import { DocumentRow, DocumentRows } from '../../Components/document-list';
import { NoPhotosNotice, PhotoUploadForm, RemovePhotoButton } from '../../Components/photo-manager';
import type { EquipmentSubmissionDetail, PortalData, SharedPageProps, StatusTone } from '../../types';

type SellerListingDetailProps = {
    portal: PortalData;
    listing: EquipmentSubmissionDetail;
};

/**
 * One listing, from its seller's side.
 *
 * A dedicated route rather than a slide-over like the other portal lists: the photo set,
 * the document list, and the broker's buyer-facing copy are more than a panel holds, and
 * a listing is the thing a seller actually wants to link to and come back to.
 *
 * Read-only by design. A seller submits a listing and Petra takes it from there, so
 * nothing here is editable — offers are answered on the Offers page, which this links to.
 */
export default function SellerListingDetail({ portal, listing }: SellerListingDetailProps) {
    const { status } = usePage<SharedPageProps>().props;
    const openOffers = listing.offers.filter((offer) => offer.status === 'pending').length;

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <Head title={`${listing.title} | Seller Portal`} />

            <PortalShell portal={portal} title={listing.title}>
                <div className="grid gap-4">
                    <PortalPageHeader
                        eyebrow={listing.public_id ?? 'Listing'}
                        title={listing.title}
                        description={[listing.status_label, listing.status_explanation].filter(Boolean).join(' · ')}
                        actions={
                            <>
                                <BackLink
                                    href="/seller/listings"
                                    className="button-press focus-copper inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#dad5cb] bg-white px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700 transition-colors hover:border-[#a56437] hover:text-[#a56437] sm:w-auto"
                                >
                                    All listings
                                </BackLink>
                                {/* Only rendered when the listing is genuinely reachable —
                                    an unpublished one has no public page to open. */}
                                {listing.public_href && (
                                    <a href={listing.public_href} target="_blank" rel="noreferrer" className={portalHeaderActionClass}>
                                        View public page
                                    </a>
                                )}
                            </>
                        }
                    />

                    {/*
                      * Two columns from xl up. The photo is the one thing a seller already
                      * knows — they uploaded it — so at full content width it was pushing
                      * every actual fact past the fold. Narrowing the media column drops the
                      * hero to roughly half its height and lifts the price, status dates, and
                      * offers into view on arrival.
                      */}
                    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] xl:items-start">
                        {/* The rail a seller actually came to read: what it is worth, where it
                            stands, and whether anyone has bid. */}
                        <div className="grid gap-4 xl:order-2">
                            <Panel title="Listing details">
                                <div className="rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3">
                                    <dt className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                        Asking price
                                    </dt>
                                    <dd className="mt-1 font-heading text-2xl font-semibold text-neutral-900">
                                        {listing.needs_valuation
                                            ? 'Valuation requested'
                                            : (formatUSD(listing.asking_price) ?? 'Not provided')}
                                    </dd>
                                </div>

                                {/* Label/value rows rather than a two-column grid: the rail is
                                    narrow, and paired columns left long values like
                                    "North Dakota — Williston" wrapping against short ones,
                                    with an odd field stranded on its own line. */}
                                <dl className="mt-4 divide-y divide-[#ece7dd]">
                                    <RailRow label="Category" value={listing.category} />
                                    <RailRow
                                        label="Region"
                                        value={listing.city ? `${listing.region} — ${listing.city}` : listing.region}
                                    />
                                    <RailRow label="Condition" value={listing.condition_label} />
                                    <RailRow label="Submitted" value={listing.created_at} />
                                    <RailRow label="Published" value={listing.published_at} />
                                    {listing.sold_at && <RailRow label="Sold" value={listing.sold_at} />}
                                </dl>

                                {listing.condition_notes && (
                                    <div className="mt-4 border-t border-[#ece7dd] pt-4">
                                        <dt className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                            Your condition notes (private)
                                        </dt>
                                        <dd className="mt-1 whitespace-pre-line text-sm leading-6 text-neutral-700">
                                            {listing.condition_notes}
                                        </dd>
                                    </div>
                                )}
                            </Panel>

                            <Panel
                                title="Offers"
                                aside={
                                    listing.offers.length > 0 ? (
                                        <Link
                                            href="/seller/offers"
                                            className="focus-copper font-heading text-xs font-semibold uppercase tracking-[0.12em] text-[#a56437] underline-offset-4 hover:underline"
                                        >
                                            {openOffers > 0 ? `Respond to ${openOffers}` : 'Go to Offers'}
                                        </Link>
                                    ) : undefined
                                }
                            >
                                {listing.offers.length === 0 ? (
                                    <p className="text-base leading-7 text-neutral-600">
                                        No offers yet. Petra logs them here once a buyer deal is worked up.
                                    </p>
                                ) : (
                                    <ul className="grid gap-2">
                                        {listing.offers.map((offer) => (
                                            <li
                                                key={offer.id}
                                                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3"
                                            >
                                                <div className="min-w-0">
                                                    <p className="font-heading text-base font-semibold text-neutral-900">
                                                        {formatUSD(offer.amount)}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-neutral-500">
                                                        Offered {offer.offered_at ?? 'n/a'}
                                                        {offer.counter_amount ? ` · countered ${formatUSD(offer.counter_amount)}` : ''}
                                                    </p>
                                                </div>
                                                <Pill tone={offer.status_tone}>{offer.status_label}</Pill>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Panel>
                        </div>
                        <div className="grid gap-4 xl:order-1">
                            <PhotoGallery listing={listing} />

                            {/*
                              * What buyers see. These fields are written by a broker after review, so
                              * before that happens the panel explains the wait rather than showing a
                              * grid of blanks that reads like something failed to load.
                              */}
                            <Panel
                                title="What buyers see"
                                aside={listing.featured ? <Pill tone="success">Featured</Pill> : undefined}
                            >
                                {hasEnrichment(listing) ? (
                                    <dl className="grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                        <Detail label="Manufacturer" value={listing.manufacturer} />
                                        <Detail label="Model" value={listing.model} />
                                        <Detail label="Year" value={listing.year != null ? String(listing.year) : null} />
                                        <Detail label="Capacity" value={listing.capacity} />
                                        {listing.public_description && (
                                            <div className="sm:col-span-2">
                                                <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                                    Public description
                                                </dt>
                                                <dd className="mt-1 whitespace-pre-line text-neutral-700">{listing.public_description}</dd>
                                            </div>
                                        )}
                                    </dl>
                                ) : (
                                    <p className="text-base leading-7 text-neutral-600">
                                        Petra has not written the buyer-facing copy for this unit yet. It appears here once a broker
                                        completes the review.
                                    </p>
                                )}
                            </Panel>

                            <Panel title="Documents">
                                {listing.documents.length === 0 ? (
                                    <p className="text-base leading-7 text-neutral-600">No documents uploaded.</p>
                                ) : (
                                    <div className="-mx-1 overflow-hidden rounded-lg border border-[#dad5cb]">
                                        {/* The same row the Documents hub renders, so a file looks
                                            and behaves identically wherever the seller meets it —
                                            including going through the authorizing download route
                                            rather than a static path. */}
                                        <DocumentRows>
                                            {listing.documents.map((document) => (
                                                <DocumentRow
                                                    key={document.key}
                                                    document={document}
                                                    meta={
                                                        // Private until a broker publishes it, so the
                                                        // seller can see which of theirs buyers read.
                                                        <Pill tone={document.isPublic ? 'success' : 'muted'}>
                                                            {document.isPublic ? 'Public' : 'Private'}
                                                        </Pill>
                                                    }
                                                />
                                            ))}
                                        </DocumentRows>
                                    </div>
                                )}
                            </Panel>
                        </div>

                    </div>
                </div>
            </PortalShell>
        </>
    );
}

function hasEnrichment(listing: EquipmentSubmissionDetail): boolean {
    return Boolean(
        listing.public_description || listing.manufacturer || listing.model || listing.year != null || listing.capacity,
    );
}

/**
 * The seller's own gallery, and the one place they can correct it.
 *
 * The upload lives here rather than on the listings index because this is where a seller
 * lands when a broker tells them the listing cannot go live yet — and until it existed,
 * "add a photo" was not something the product could do at all after submission.
 */
function PhotoGallery({ listing }: { listing: EquipmentSubmissionDetail }) {
    const { photos, title } = listing;
    const [activeIndex, setActiveIndex] = useState(0);
    const [failed, setFailed] = useState<Record<number, boolean>>({});
    // Clamped rather than reset: removing the last photo in the set would otherwise leave
    // activeIndex pointing past the end and blank the hero until something else re-rendered.
    const safeIndex = Math.min(activeIndex, Math.max(0, photos.length - 1));
    const active = photos[safeIndex];
    const uploadUrl = `/seller/listings/${listing.id}/photos`;

    return (
        <div className="grid gap-2">
            {photos.length === 0 ? (
                // 'Under Review' is the state where a missing photo is actively holding
                // the listing back; on a Sold one it is just history.
                <NoPhotosNotice blocksPublishing={listing.status === 'under_review'} />
            ) : (
                <>
                    {/* Aspect ratio keeps the frame stable while the photo loads; the max height
                        is the backstop that stops a wide viewport from turning the hero into a
                        full screen of image and pushing the listing facts out of sight. */}
                    <div className="relative aspect-[16/9] max-h-[360px] overflow-hidden rounded-xl border border-[#dad5cb] bg-[#f3f1ec] shadow-sm">
                        {active && !failed[safeIndex] ? (
                            <img
                                src={active.url}
                                alt={`${title} — photo ${safeIndex + 1} of ${photos.length}`}
                                className="h-full w-full object-cover"
                                onError={() => setFailed((current) => ({ ...current, [safeIndex]: true }))}
                            />
                        ) : (
                            <div className="grid h-full place-items-center text-sm text-neutral-500">Image unavailable</div>
                        )}

                        {listing.photos_editable && (
                            <div className="absolute right-2 top-2">
                                <RemovePhotoButton
                                    action={`${uploadUrl}/${safeIndex}`}
                                    label={`Remove photo ${safeIndex + 1}`}
                                />
                            </div>
                        )}
                    </div>

                    {photos.length > 1 && (
                        <div className="flex flex-wrap gap-2">
                            {photos.map((photo, index) => (
                                <button
                                    key={photo.path}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`Show photo ${index + 1}`}
                                    aria-current={index === safeIndex}
                                    className={`focus-copper h-16 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                                        index === safeIndex ? 'border-[#a56437]' : 'border-transparent hover:border-[#dad5cb]'
                                    }`}
                                >
                                    {failed[index] ? (
                                        <span className="grid h-full w-full place-items-center bg-[#f3f1ec] text-[0.6rem] text-neutral-400">n/a</span>
                                    ) : (
                                        <img
                                            src={photo.url}
                                            alt=""
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                            onError={() => setFailed((current) => ({ ...current, [index]: true }))}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

            <PhotoUploadForm
                action={uploadUrl}
                photoCount={photos.length}
                maxPhotos={listing.max_photos}
                editable={listing.photos_editable}
            />
        </div>
    );
}

function Panel({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
    return (
        <section className="rounded-xl border border-[#dad5cb] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]">{title}</h2>
                {aside}
            </div>
            <div className="mt-4">{children}</div>
        </section>
    );
}

const toneClasses: Record<StatusTone, string> = {
    neutral: 'border-[#dad5cb] bg-[#f3f1ec] text-neutral-700',
    success: 'border-emerald-800/25 bg-emerald-50 text-emerald-800',
    warning: 'border-amber-800/25 bg-amber-50 text-amber-800',
    muted: 'border-neutral-300 bg-neutral-100 text-neutral-500',
    danger: 'border-[#b3261e]/25 bg-red-50 text-[#b3261e]',
};

function Pill({ tone, children }: { tone: StatusTone; children: ReactNode }) {
    return (
        <span
            className={`inline-flex h-7 shrink-0 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${toneClasses[tone] ?? toneClasses.neutral}`}
        >
            {children}
        </span>
    );
}

/** A compact row for the side rail, where vertical space is worth more than symmetry. */
function RailRow({ label, value }: { label: string; value: string | null }) {
    return (
        <div className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</dt>
            <dd className="min-w-0 text-right text-sm text-neutral-800">{value || 'Not provided'}</dd>
        </div>
    );
}

function Detail({ label, value }: { label: string; value: string | null }) {
    return (
        <div>
            <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</dt>
            <dd className="mt-1 text-neutral-700">{value || 'Not provided'}</dd>
        </div>
    );
}

function formatUSD(value: string | null): string | null {
    if (!value) {
        return null;
    }

    const amount = Number(value);

    return Number.isNaN(amount)
        ? value
        : amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
