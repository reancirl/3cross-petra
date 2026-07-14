import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import type { SharedPageProps } from '../types';

type ListingPhoto = {
    src: string;
    alt: string;
    position: string;
};

type ListingDocument = {
    label: string;
    type: string;
    href: string;
};

type EquipmentListing = {
    id: string;
    name: string;
    category: string;
    location: string;
    condition: string;
    status: 'Available' | 'Pending' | 'Sold';
    manufacturer: string;
    year: string;
    capacity: string;
    description: string;
    overview: string;
    fieldConditionNotes: {
        operatingCondition: string;
        knownIssues: string;
        storageCondition: string;
        lastKnownUse: string;
    };
    specifications: {
        manufacturer: string;
        model: string;
        serialNumber: string;
        year: string;
        capacity: string;
        technicalSpecs: string[];
    };
    media: {
        photos: ListingPhoto[];
        videoUrl: string;
    };
    documents: ListingDocument[];
};

type EquipmentDetailProps = {
    listing: EquipmentListing;
    canonicalUrl: string;
    ogImageUrl: string;
};

type InquiryForm = {
    name: string;
    email: string;
    phone: string;
    company_name: string;
    note: string;
};

export default function EquipmentDetail({ listing, canonicalUrl, ogImageUrl }: EquipmentDetailProps) {
    const { auth, status } = usePage<SharedPageProps>().props;
    const [selectedPhoto, setSelectedPhoto] = useState<ListingPhoto>(listing.media.photos[0]);
    const form = useForm<InquiryForm>({
        name: auth.user?.name ?? '',
        email: auth.user?.email ?? '',
        phone: auth.user?.phone ?? '',
        company_name: auth.user?.company_name ?? '',
        note: '',
    });
    const pageTitle = `${listing.name} | Petra Equipment Detail`;
    const pageDescription = `${listing.name} in ${listing.location}. Review status, condition notes, specs, media, documents, and request quote details from Petra.`;
    const talkToBrokerUrl = `/contact?asset=${encodeURIComponent(listing.id)}&equipment=${encodeURIComponent(listing.name)}`;
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Product',
                '@id': `${canonicalUrl}#equipment`,
                name: listing.name,
                identifier: listing.id,
                category: listing.category,
                description: listing.overview,
                brand: {
                    '@type': 'Brand',
                    name: listing.specifications.manufacturer,
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: canonicalUrl.replace(/\/equipment\/[^/]+$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Equipment',
                        item: canonicalUrl.replace(/\/[^/]+$/, ''),
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: listing.name,
                        item: canonicalUrl,
                    },
                ],
            },
        ],
    };

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        form.post(`/equipment/${listing.id}/inquiries`, {
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
                    <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-end lg:py-20">
                        <div>
                            <a
                                href="/equipment"
                                className="focus-copper mb-8 inline-flex font-heading text-sm font-semibold uppercase tracking-[0.14em] text-[#a56437] underline-offset-4 hover:underline"
                            >
                                Back to Equipment
                            </a>

                            <div className="mb-7 flex flex-wrap gap-3">
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]">
                                    {listing.category}
                                </span>
                                <span className="border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                                    ID: {listing.id}
                                </span>
                            </div>

                            <h1 className="max-w-4xl font-hero text-[2.4rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.1rem] lg:text-[3.8rem]">
                                {listing.name}
                            </h1>

                            <dl className="mt-8 grid gap-px bg-[#dad5cb] sm:grid-cols-2">
                                <HeaderDetail label="Status" value={listing.status} strong />
                                <HeaderDetail label="Location" value={listing.location} />
                            </dl>
                        </div>

                        <figure className="relative min-h-[320px] overflow-hidden bg-neutral-950 sm:min-h-[430px]">
                            <img
                                src={selectedPhoto.src}
                                alt={selectedPhoto.alt}
                                className="absolute inset-0 h-full w-full object-cover opacity-95"
                                style={{ objectPosition: selectedPhoto.position }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" aria-hidden="true" />
                            <figcaption className="absolute bottom-4 left-4 right-4 font-heading text-2xl font-semibold uppercase tracking-[0.06em] text-white">
                                {listing.name}
                            </figcaption>
                        </figure>
                    </div>
                </section>

                <section className="py-16 sm:py-20 lg:py-24">
                    <div className="mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.28fr)]">
                        <div className="grid gap-8">
                            <DetailSection eyebrow="Overview" title="Equipment Overview">
                                <p className="text-lg leading-8 text-neutral-600">{listing.overview}</p>
                                <p className="mt-5 text-base leading-7 text-neutral-600">{listing.description}</p>
                            </DetailSection>

                            <DetailSection eyebrow="Field Condition Notes" title="Current Field Read">
                                <dl className="grid gap-px bg-[#dad5cb] sm:grid-cols-2">
                                    <DetailCell label="Operating condition" value={listing.fieldConditionNotes.operatingCondition} />
                                    <DetailCell label="Known issues" value={listing.fieldConditionNotes.knownIssues} />
                                    <DetailCell label="Storage condition" value={listing.fieldConditionNotes.storageCondition} />
                                    <DetailCell label="Last known use" value={listing.fieldConditionNotes.lastKnownUse} />
                                </dl>
                            </DetailSection>

                            <DetailSection eyebrow="Specifications" title="Technical Details">
                                <dl className="grid gap-px bg-[#dad5cb] sm:grid-cols-2">
                                    <DetailCell label="Manufacturer" value={listing.specifications.manufacturer} />
                                    <DetailCell label="Model" value={listing.specifications.model} />
                                    <DetailCell label="Serial number" value={listing.specifications.serialNumber} />
                                    <DetailCell label="Year" value={listing.specifications.year} />
                                    <DetailCell label="Capacity" value={listing.specifications.capacity} />
                                </dl>
                                <div className="mt-6 border border-[#dad5cb] bg-white p-6">
                                    <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                        Technical Specs
                                    </h3>
                                    <ul className="mt-5 grid gap-3 text-base leading-7 text-neutral-600">
                                        {listing.specifications.technicalSpecs.map((spec) => (
                                            <li key={spec} className="border-l-2 border-[#a56437] pl-4">
                                                {spec}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </DetailSection>

                            <DetailSection eyebrow="Media" title="Gallery">
                                <div className="grid gap-4">
                                    <figure className="relative min-h-[300px] overflow-hidden bg-neutral-950 sm:min-h-[460px]">
                                        <img
                                            src={selectedPhoto.src}
                                            alt={selectedPhoto.alt}
                                            className="absolute inset-0 h-full w-full object-cover"
                                            style={{ objectPosition: selectedPhoto.position }}
                                        />
                                    </figure>

                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {listing.media.photos.map((photo) => (
                                            <button
                                                key={`${photo.src}-${photo.position}`}
                                                type="button"
                                                onClick={() => setSelectedPhoto(photo)}
                                                className={`focus-copper relative aspect-[4/3] overflow-hidden border text-left ${
                                                    selectedPhoto === photo ? 'border-[#a56437]' : 'border-[#dad5cb]'
                                                }`}
                                                aria-label={`View ${photo.alt}`}
                                            >
                                                <img
                                                    src={photo.src}
                                                    alt=""
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                    style={{ objectPosition: photo.position }}
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {listing.media.videoUrl && (
                                        <a
                                            href={listing.media.videoUrl}
                                            className="focus-copper inline-flex h-12 w-fit items-center justify-center border border-neutral-500 px-6 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                                        >
                                            Video Walkthrough
                                        </a>
                                    )}
                                </div>
                            </DetailSection>

                            <DetailSection eyebrow="Documents" title="Available Files">
                                {listing.documents.length > 0 ? (
                                    <div className="grid gap-px bg-[#dad5cb] sm:grid-cols-2">
                                        {listing.documents.map((document) => (
                                            <a
                                                key={document.href}
                                                href={document.href}
                                                download
                                                className="focus-copper block bg-white p-5 transition-colors hover:bg-[#fbfaf8]"
                                            >
                                                <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                                                    {document.type}
                                                </span>
                                                <span className="mt-2 block font-heading text-xl font-semibold uppercase tracking-[0.06em] text-neutral-950">
                                                    {document.label}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600">
                                        Inspection reports, spec sheets, and maintenance records are available through broker diligence when provided by the seller.
                                    </p>
                                )}
                            </DetailSection>
                        </div>

                        <aside id="request-quote" className="h-fit border border-[#dad5cb] bg-white p-6 lg:sticky lg:top-8">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Inquiry
                            </span>
                            <h2 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                Interested in this equipment?
                            </h2>
                            <p className="mt-4 text-base leading-7 text-neutral-600">
                                Interested in this equipment? We can confirm availability, pricing, and arrange inspection.
                            </p>

                            <form onSubmit={submit} className="mt-6 grid gap-4">
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
                                <Field label="Note" error={form.errors.note}>
                                    <textarea value={form.data.note} onChange={(event) => form.setData('note', event.target.value)} className="portal-input min-h-28 py-3" />
                                </Field>

                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="button-press focus-copper inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                                >
                                    {form.processing ? 'Submitting' : 'Request Quote'}
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
            <h2 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl">
                {title}
            </h2>
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

function DetailCell({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white p-5">
            <dt className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">{label}</dt>
            <dd className="mt-2 text-base leading-7 text-neutral-700">{value}</dd>
        </div>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <label className="grid gap-2">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">{label}</span>
            {children}
            {error && <span className="text-sm text-red-700">{error}</span>}
        </label>
    );
}
