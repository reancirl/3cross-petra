import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import type { PublicListingDetail, SharedPageProps } from '../types';

type EquipmentDetailProps = {
    listing: PublicListingDetail;
    canonicalUrl: string;
    ogImageUrl: string;
};

const PLACEHOLDER_IMAGE = '/images/petra-equipment-yard-hero.png';

function fallbackToPlaceholder(event: { currentTarget: HTMLImageElement }) {
    if (!event.currentTarget.src.endsWith(PLACEHOLDER_IMAGE)) {
        event.currentTarget.src = PLACEHOLDER_IMAGE;
    }
}

type InquiryForm = {
    name: string;
    email: string;
    phone: string;
    company_name: string;
    note: string;
};

export default function EquipmentDetail({ listing, canonicalUrl, ogImageUrl }: EquipmentDetailProps) {
    const { auth, status } = usePage<SharedPageProps>().props;
    const gallery = listing.photos.length > 0 ? listing.photos : [{ url: listing.image_url, alt: listing.title }];
    const [selectedPhoto, setSelectedPhoto] = useState(gallery[0]);
    const isAuthed = Boolean(auth.user);
    const isBuyer = auth.user?.user_type === 'buyer';
    const form = useForm<InquiryForm>({
        name: auth.user?.name ?? '',
        email: auth.user?.email ?? '',
        phone: auth.user?.phone ?? '',
        company_name: auth.user?.company_name ?? '',
        note: '',
    });
    const pageTitle = `${listing.title} | Petra Equipment Detail`;
    const pageDescription = `${listing.title} in ${listing.region}. Review availability, specs, media, and request quote details from Petra.`;
    const talkToBrokerUrl = `/contact?asset=${encodeURIComponent(listing.public_id)}&equipment=${encodeURIComponent(listing.title)}`;

    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Product',
                '@id': `${canonicalUrl}#equipment`,
                name: listing.title,
                identifier: listing.public_id,
                category: listing.category,
                description: listing.description,
                ...(listing.manufacturer ? { brand: { '@type': 'Brand', name: listing.manufacturer } } : {}),
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl.replace(/\/equipment\/[^/]+$/, '') },
                    { '@type': 'ListItem', position: 2, name: 'Equipment', item: canonicalUrl.replace(/\/[^/]+$/, '') },
                    { '@type': 'ListItem', position: 3, name: listing.title, item: canonicalUrl },
                ],
            },
        ],
    };

    // The only flash this page produces is the inquiry confirmation. Signed-in buyers
    // get a route straight to the request they just made; guests have no Quotes page to
    // land on (the inquiry creates a shadow user but does not log them in), and sellers
    // and brokers would be bounced by the buyer-only route.
    useEffect(() => {
        if (!status) {
            return;
        }

        toast.success(status, isBuyer
            ? {
                  description: 'Track it and the broker’s reply from your Quotes page.',
                  action: {
                      label: 'View quotes',
                      onClick: () => router.visit('/buyer/quotes'),
                  },
              }
            : undefined);
    }, [status, isBuyer]);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        form.post(`/equipment/${listing.public_id}/inquiries`, {
            preserveScroll: true,
            onSuccess: () => form.setData('note', ''),
        });
    }

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={canonicalUrl} />
                <meta name="robots" content="index, follow" />

                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="product" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:image:alt" content={selectedPhoto.alt} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={ogImageUrl} />

                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Head>

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-10 sm:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-start lg:py-12">
                        <div>
                            <a
                                href="/equipment"
                                className="focus-copper mb-6 inline-flex font-heading text-sm font-semibold uppercase tracking-[0.14em] text-[#a56437] underline-offset-4 hover:underline"
                            >
                                Back to Equipment
                            </a>

                            <div className="mb-5 flex flex-wrap gap-3">
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]">
                                    {listing.category}
                                </span>
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                                    ID: {listing.public_id}
                                </span>
                                {listing.featured && (
                                    <span className="border border-[#dad5cb] bg-neutral-950 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <h1 className="max-w-4xl font-hero text-[2.2rem] font-bold uppercase leading-[1.03] tracking-[0.08em] text-neutral-950 sm:text-[2.8rem] lg:text-[3.3rem]">
                                {listing.title}
                            </h1>

                            <dl className="mt-6 grid gap-px bg-[#dad5cb] sm:grid-cols-2">
                                <HeaderDetail label="Availability" value={listing.availability} strong />
                                <HeaderDetail label="Region" value={listing.city ? `${listing.region} — ${listing.city}` : listing.region} />
                            </dl>
                        </div>

                        <div className="grid gap-3">
                            <figure className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
                                <img
                                    src={selectedPhoto.url}
                                    alt={selectedPhoto.alt}
                                    onError={fallbackToPlaceholder}
                                    className="absolute inset-0 h-full w-full object-cover opacity-95"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" aria-hidden="true" />
                                <figcaption className="absolute bottom-4 left-4 right-4 font-heading text-xl font-semibold uppercase tracking-[0.06em] text-white sm:text-2xl">
                                    {listing.title}
                                </figcaption>
                            </figure>

                            {gallery.length > 1 && (
                                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                                    {gallery.map((photo, index) => (
                                        <button
                                            key={`${photo.url}-${index}`}
                                            type="button"
                                            onClick={() => setSelectedPhoto(photo)}
                                            className={`focus-copper relative aspect-[4/3] overflow-hidden border text-left ${
                                                selectedPhoto === photo ? 'border-[#a56437]' : 'border-[#dad5cb]'
                                            }`}
                                            aria-label={`View ${photo.alt}`}
                                        >
                                            <img src={photo.url} alt="" loading="lazy" onError={fallbackToPlaceholder} className="absolute inset-0 h-full w-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-10 sm:py-12">
                    <div className="mx-auto grid max-w-[1280px] gap-6 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.28fr)] lg:items-start">
                        <div className="grid gap-6">
                            <section className="border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">Overview</span>
                                <p className="mt-4 text-lg leading-8 text-neutral-700">{listing.description}</p>

                                <h2 className="mt-8 border-t border-[#dad5cb] pt-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                    Specifications
                                </h2>
                                <dl className="mt-4 grid gap-px bg-[#dad5cb] sm:grid-cols-2">
                                    <DetailCell label="Manufacturer" value={listing.specifications.manufacturer} />
                                    <DetailCell label="Model" value={listing.specifications.model} />
                                    <DetailCell label="Year" value={listing.specifications.year} />
                                    <DetailCell label="Capacity" value={listing.specifications.capacity} />
                                </dl>
                            </section>

                            {listing.documents.length > 0 && (
                                <DetailSection eyebrow="Documents" title="Available Files">
                                    <div className="grid gap-px bg-[#dad5cb] sm:grid-cols-2">
                                        {listing.documents.map((document) => (
                                            <a
                                                key={document.url}
                                                href={document.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="focus-copper flex items-center gap-3 bg-white p-4 transition-colors hover:bg-[#fbfaf8]"
                                            >
                                                <FileIcon />
                                                <span className="min-w-0 truncate font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950">
                                                    {document.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </DetailSection>
                            )}
                        </div>

                        <aside id="request-quote" className="h-fit border border-[#dad5cb] bg-white p-6 lg:sticky lg:top-6">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">Inquiry</span>
                            <h2 className="mt-2 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                Interested in this equipment?
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-neutral-600">
                                We can confirm availability, pricing, and arrange inspection.
                            </p>

                            <form onSubmit={submit} className="mt-5 grid gap-4">
                                {!isAuthed && (
                                    <>
                                        <Field label="Name" error={form.errors.name}>
                                            <input value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} className="portal-input" required />
                                        </Field>
                                        <Field label="Email" error={form.errors.email}>
                                            <input type="email" value={form.data.email} onChange={(event) => form.setData('email', event.target.value)} className="portal-input" required />
                                        </Field>
                                        <Field label="Phone" error={form.errors.phone}>
                                            <input value={form.data.phone} onChange={(event) => form.setData('phone', event.target.value)} className="portal-input" autoComplete="tel" />
                                        </Field>
                                        <Field label="Company" error={form.errors.company_name}>
                                            <input value={form.data.company_name} onChange={(event) => form.setData('company_name', event.target.value)} className="portal-input" autoComplete="organization" />
                                        </Field>
                                    </>
                                )}
                                {isAuthed && (
                                    <p className="border border-[#dad5cb] bg-[#f8f8f6] p-4 text-sm leading-6 text-neutral-600">
                                        Sending as <span className="font-semibold text-neutral-900">{auth.user?.name}</span> ({auth.user?.email}).
                                    </p>
                                )}
                                <Field label="Note" error={form.errors.note}>
                                    <textarea value={form.data.note} onChange={(event) => form.setData('note', event.target.value)} className="portal-input min-h-28 py-3" />
                                </Field>

                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="button-press focus-copper inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                                >
                                    {form.processing ? 'Submitting' : 'Request Details'}
                                </button>
                                <a
                                    href={talkToBrokerUrl}
                                    className="button-press focus-copper inline-flex h-12 items-center justify-center border border-neutral-500 px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                                >
                                    Talk to Broker
                                </a>
                            </form>
                        </aside>
                    </div>
                </section>
            </main>
        </>
    );
}

function DetailSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
    return (
        <section className="border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">{eyebrow}</span>
            <h2 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl">{title}</h2>
            <div className="mt-6">{children}</div>
        </section>
    );
}

function HeaderDetail({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
    return (
        <div className="bg-white p-4">
            <dt className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">{label}</dt>
            <dd className={`mt-1 font-heading text-lg font-semibold uppercase tracking-[0.06em] ${strong ? 'text-[#a56437]' : 'text-neutral-950'}`}>
                {value}
            </dd>
        </div>
    );
}

function DetailCell({ label, value }: { label: string; value: string | null }) {
    return (
        <div className="bg-white p-5">
            <dt className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">{label}</dt>
            <dd className="mt-2 text-base leading-7 text-neutral-700">{value || 'Available on request'}</dd>
        </div>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <label className="grid gap-2">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">{label}</span>
            {children}
            {error && <span className="text-sm text-[#b3261e]">{error}</span>}
        </label>
    );
}

function FileIcon() {
    return (
        <svg
            className="h-5 w-5 shrink-0 text-[#a56437]"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M7 3h7l4 4v14H7z" />
            <path d="M14 3v5h5" />
            <path d="M10 13h6" />
            <path d="M10 17h4" />
        </svg>
    );
}
