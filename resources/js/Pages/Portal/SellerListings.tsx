import { Head, useForm } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import SlideOver from '../../Components/slide-over';
import type { EquipmentSubmission, PortalData, StatusTone } from '../../types';

type SellerListingsProps = {
    portal: PortalData;
    submissions: EquipmentSubmission[];
    categoryOptions: string[];
    regionOptions: string[];
    conditionOptions: Record<string, string>;
};

type SubmissionForm = {
    title: string;
    category: string;
    region: string;
    city: string;
    condition: string;
    condition_notes: string;
    asking_price: string;
    needs_valuation: boolean;
    photos: File[];
    documents: File[];
};

type RequiredField = 'title' | 'category' | 'region' | 'condition';

type FocusableField = HTMLInputElement | HTMLSelectElement | null;

// Validated in the browser so sellers get inline errors instead of the native
// tooltip, which clips outside the slide-over panel.
const requiredFields: { name: RequiredField; message: string }[] = [
    { name: 'title', message: 'Enter an equipment title.' },
    { name: 'category', message: 'Select a category.' },
    { name: 'region', message: 'Select a region.' },
    { name: 'condition', message: 'Select a condition.' },
];

function emptyForm(): SubmissionForm {
    return {
        title: '',
        category: '',
        region: '',
        city: '',
        condition: '',
        condition_notes: '',
        asking_price: '',
        needs_valuation: false,
        photos: [],
        documents: [],
    };
}

const PAGE_SIZE = 6;

export default function SellerListings({ portal, submissions, categoryOptions, regionOptions, conditionOptions }: SellerListingsProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [clientErrors, setClientErrors] = useState<Partial<Record<RequiredField, string>>>({});
    const fieldRefs = useRef<Record<RequiredField, FocusableField>>({
        title: null,
        category: null,
        region: null,
        condition: null,
    });
    const form = useForm<SubmissionForm>(emptyForm());

    function openForm(prefill?: Pick<SubmissionForm, 'category' | 'region'>) {
        form.clearErrors();
        setClientErrors({});
        form.setData({ ...emptyForm(), ...prefill });
        setIsFormOpen(true);
    }

    function errorFor(field: keyof SubmissionForm): string | undefined {
        const serverErrors = form.errors as Partial<Record<keyof SubmissionForm, string>>;

        return clientErrors[field as RequiredField] ?? serverErrors[field];
    }

    function clearError(field: RequiredField) {
        setClientErrors((errors) => {
            if (!errors[field]) {
                return errors;
            }

            const next = { ...errors };
            delete next[field];

            return next;
        });
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const errors: Partial<Record<RequiredField, string>> = {};

        requiredFields.forEach((field) => {
            if (!form.data[field.name].trim()) {
                errors[field.name] = field.message;
            }
        });

        setClientErrors(errors);

        const firstInvalid = requiredFields.find((field) => errors[field.name]);

        if (firstInvalid) {
            fieldRefs.current[firstInvalid.name]?.focus();

            return;
        }

        // Captured before reset so "Submit another" can carry them into the next listing.
        const { category, region } = form.data;

        form.post('/seller/listings', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsFormOpen(false);
                setClientErrors({});
                form.reset();
                toast.success('Equipment submitted.', {
                    description: 'A broker will review it shortly.',
                    action: {
                        label: 'Submit another',
                        onClick: () => openForm({ category, region }),
                    },
                });
            },
        });
    }

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) {
            return submissions;
        }

        return submissions.filter((submission) =>
            [
                submission.title,
                submission.category,
                submission.region,
                submission.city,
                submission.condition_label,
                submission.status_label,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(term),
        );
    }, [submissions, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
    const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

    function updateSearch(value: string) {
        setSearch(value);
        setPage(1);
    }

    return (
        <>
            <Head title="My Listings | Seller Portal" />

            <PortalShell portal={portal} title="My Listings">
                <div className="grid gap-4">
                    <section className="flex flex-col gap-4 rounded-2xl border border-[#dad5cb] bg-white px-5 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:px-6">
                        <div className="min-w-0">
                            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#a56437]">Listed Equipment</span>
                            <h2 className="mt-1 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">Your Submissions</h2>
                            <p className="mt-1 text-sm leading-6 text-neutral-500">
                                {search.trim()
                                    ? `${filtered.length} of ${submissions.length} ${submissions.length === 1 ? 'listing' : 'listings'}`
                                    : `${submissions.length} ${submissions.length === 1 ? 'listing' : 'listings'} · track review status here.`}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative sm:w-72">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                    <SearchIcon />
                                </span>
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => updateSearch(event.target.value)}
                                    placeholder="Search listings"
                                    aria-label="Search listings"
                                    className="h-11 w-full rounded-lg border border-[#dad5cb] bg-white pl-10 pr-9 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#a56437] focus:ring-2 focus:ring-[#a56437]/15 [&::-webkit-search-cancel-button]:appearance-none"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => updateSearch('')}
                                        aria-label="Clear search"
                                        className="focus-copper absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-[#f3f1ec] hover:text-neutral-700"
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => openForm()}
                                className="button-press focus-copper inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto"
                            >
                                <PlusIcon />
                                Submit Equipment
                            </button>
                        </div>
                    </section>

                    <SlideOver open={isFormOpen} onClose={() => setIsFormOpen(false)} eyebrow="Submit Equipment" title="What We Need">
                        <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                            <Field label="Equipment title" required error={errorFor('title')} className="sm:col-span-2">
                                <input
                                    ref={(element) => {
                                        fieldRefs.current.title = element;
                                    }}
                                    value={form.data.title}
                                    onChange={(event) => {
                                        form.setData('title', event.target.value);
                                        clearError('title');
                                    }}
                                    placeholder="e.g. Ajax DPC-2803 Compressor"
                                    aria-invalid={Boolean(errorFor('title'))}
                                    className={inputClass(errorFor('title'))}
                                />
                            </Field>

                            <Field label="Category" required error={errorFor('category')}>
                                <select
                                    ref={(element) => {
                                        fieldRefs.current.category = element;
                                    }}
                                    value={form.data.category}
                                    onChange={(event) => {
                                        form.setData('category', event.target.value);
                                        clearError('category');
                                    }}
                                    aria-invalid={Boolean(errorFor('category'))}
                                    className={inputClass(errorFor('category'))}
                                >
                                    <option value="">Select a category</option>
                                    {categoryOptions.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Region" required error={errorFor('region')}>
                                <select
                                    ref={(element) => {
                                        fieldRefs.current.region = element;
                                    }}
                                    value={form.data.region}
                                    onChange={(event) => {
                                        form.setData('region', event.target.value);
                                        clearError('region');
                                    }}
                                    aria-invalid={Boolean(errorFor('region'))}
                                    className={inputClass(errorFor('region'))}
                                >
                                    <option value="">Select a region</option>
                                    {regionOptions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="City / yard location" error={errorFor('city')}>
                                <input
                                    value={form.data.city}
                                    onChange={(event) => form.setData('city', event.target.value)}
                                    placeholder="e.g. Casper"
                                    className={inputClass(errorFor('city'))}
                                />
                            </Field>

                            <Field label="Condition" required error={errorFor('condition')}>
                                <select
                                    ref={(element) => {
                                        fieldRefs.current.condition = element;
                                    }}
                                    value={form.data.condition}
                                    onChange={(event) => {
                                        form.setData('condition', event.target.value);
                                        clearError('condition');
                                    }}
                                    aria-invalid={Boolean(errorFor('condition'))}
                                    className={inputClass(errorFor('condition'))}
                                >
                                    <option value="">Select a condition</option>
                                    {Object.entries(conditionOptions).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Condition notes" error={errorFor('condition_notes')} className="sm:col-span-2">
                                <textarea
                                    value={form.data.condition_notes}
                                    onChange={(event) => form.setData('condition_notes', event.target.value)}
                                    className={`${inputClass(errorFor('condition_notes'))} min-h-28 py-3`}
                                    placeholder="Tell us what you know — last use, known issues, how it's stored. Rough is fine."
                                />
                            </Field>

                            <Field label="Asking price" error={errorFor('asking_price')} className="sm:col-span-2">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    inputMode="decimal"
                                    value={form.data.asking_price}
                                    disabled={form.data.needs_valuation}
                                    onChange={(event) => form.setData('asking_price', event.target.value)}
                                    placeholder="USD"
                                    aria-invalid={Boolean(errorFor('asking_price'))}
                                    className={inputClass(errorFor('asking_price'))}
                                />
                                <label className="mt-1 flex w-fit cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={form.data.needs_valuation}
                                        onChange={(event) => {
                                            const checked = event.target.checked;

                                            form.setData((data) => ({
                                                ...data,
                                                needs_valuation: checked,
                                                asking_price: checked ? '' : data.asking_price,
                                            }));
                                        }}
                                        className="h-4 w-4 shrink-0 accent-[#a56437]"
                                    />
                                    <span className="text-base leading-7 text-neutral-600">Not sure — help me price it</span>
                                </label>
                            </Field>

                            <PhotoPicker files={form.data.photos} error={errorFor('photos')} onChange={(files) => form.setData('photos', files)} />

                            <DocumentPicker files={form.data.documents} error={errorFor('documents')} onChange={(files) => form.setData('documents', files)} />

                            <div className="sm:col-span-2">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="button-press focus-copper inline-flex h-12 w-full items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                                >
                                    {form.processing ? 'Submitting' : 'Submit Equipment'}
                                </button>
                            </div>
                        </form>
                    </SlideOver>

                    <section className="grid gap-5">
                        {submissions.length === 0 ? (
                            <EmptyState onSubmit={() => openForm()} />
                        ) : filtered.length === 0 ? (
                            <NoResults search={search} onClear={() => updateSearch('')} />
                        ) : (
                            <>
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {pageItems.map((submission) => (
                                        <ListingCard key={submission.id} submission={submission} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <Pagination
                                        page={currentPage}
                                        totalPages={totalPages}
                                        rangeStart={rangeStart}
                                        rangeEnd={rangeEnd}
                                        total={filtered.length}
                                        onChange={setPage}
                                    />
                                )}
                            </>
                        )}
                    </section>
                </div>
            </PortalShell>
        </>
    );
}

const toneClasses: Record<StatusTone, string> = {
    neutral: 'border-[#dad5cb] bg-[#f3f1ec] text-neutral-700',
    success: 'border-emerald-800/25 bg-emerald-50 text-emerald-800',
    warning: 'border-amber-800/25 bg-amber-50 text-amber-800',
    muted: 'border-neutral-300 bg-neutral-100 text-neutral-500',
    danger: 'border-[#b3261e]/25 bg-red-50 text-[#b3261e]',
};

function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
    return (
        <span
            className={`inline-flex h-7 shrink-0 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] shadow-sm ${toneClasses[tone] ?? toneClasses.neutral}`}
        >
            {label}
        </span>
    );
}

function ListingCard({ submission }: { submission: EquipmentSubmission }) {
    const [coverFailed, setCoverFailed] = useState(false);
    const cover = submission.photos[0];
    const extraPhotos = submission.photos.length - 1;
    const showCover = Boolean(cover) && !coverFailed;

    return (
        <article className="interactive-lift flex flex-col overflow-hidden rounded-2xl border border-[#dad5cb] bg-white shadow-sm">
            <div className="relative aspect-[16/10] shrink-0 bg-[#f3f1ec]">
                {showCover ? (
                    <img
                        src={cover.url}
                        alt=""
                        loading="lazy"
                        onError={() => setCoverFailed(true)}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="flex h-full w-full items-center justify-center text-[#cbc0ae]">
                        <EquipmentGlyph />
                    </span>
                )}
                <div className="absolute left-3 top-3">
                    <StatusBadge label={submission.status_label} tone={submission.status_tone} />
                </div>
                {extraPhotos > 0 && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-neutral-950/70 px-2.5 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white">
                        +{extraPhotos} {extraPhotos === 1 ? 'photo' : 'photos'}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3
                    className="truncate font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950"
                    title={submission.title}
                >
                    {submission.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                    {submission.created_at}
                    {submission.status_explanation ? ` · ${submission.status_explanation}` : ''}
                </p>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                    <Detail label="Category" value={submission.category} />
                    <Detail label="Region" value={formatRegion(submission)} />
                    <Detail label="Condition" value={submission.condition_label} />
                    <Detail label="Asking price" value={formatPrice(submission)} />
                </dl>

                {submission.condition_notes && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-600">{submission.condition_notes}</p>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                    <span className="inline-flex items-center gap-1.5 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                        <PhotoIcon />
                        {submission.photos.length} {submission.photos.length === 1 ? 'photo' : 'photos'}
                    </span>
                    {submission.documents.length > 0 ? (
                        submission.documents.map((document) => (
                            <a
                                key={document.path}
                                href={document.url}
                                target="_blank"
                                rel="noreferrer"
                                title={document.name}
                                className="focus-copper inline-flex max-w-[11rem] items-center gap-1.5 rounded-full border border-[#dad5cb] bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 transition-colors hover:border-[#a56437] hover:text-[#a56437]"
                            >
                                <FileIcon />
                                <span className="truncate">{document.name}</span>
                            </a>
                        ))
                    ) : (
                        <span className="inline-flex items-center gap-1.5 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                            <FileIcon />
                            No docs
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}

function EmptyState({ onSubmit }: { onSubmit: () => void }) {
    return (
        <article className="rounded-2xl border border-[#dad5cb] bg-white p-8 text-center shadow-sm sm:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4ece4] text-[#a56437]">
                <EquipmentGlyph />
            </span>
            <h3 className="mt-6 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl">
                Got equipment sitting in a yard?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-neutral-600">
                Submit it to Petra and a broker will review the asset, position it, and work the buyer side for you.
            </p>
            <button
                type="button"
                onClick={onSubmit}
                className="button-press focus-copper mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            >
                <PlusIcon />
                Submit Equipment
            </button>
        </article>
    );
}

function FileIcon() {
    return (
        <svg
            className="h-3.5 w-3.5 shrink-0"
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

function PhotoIcon() {
    return (
        <svg
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M4 5h16v14H4z" />
            <path d="M4 15l4-4 4 4 3-3 5 5" />
            <path d="M9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
        </svg>
    );
}

function PlusIcon() {
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
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </svg>
    );
}

function EquipmentGlyph() {
    return (
        <svg
            className="h-7 w-7 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M4 16h16" />
            <path d="M6 16l2-6h8l2 6" />
            <path d="M8 18.5h.01" />
            <path d="M16 18.5h.01" />
            <path d="M9 10V7h6v3" />
        </svg>
    );
}

function SearchIcon({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg
            className={`${className} shrink-0`}
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

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
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
            {dir === 'left' ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
        </svg>
    );
}

function NoResults({ search, onClear }: { search: string; onClear: () => void }) {
    const term = search.trim();

    return (
        <article className="rounded-2xl border border-[#dad5cb] bg-white p-8 text-center shadow-sm sm:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4ece4] text-[#a56437]">
                <SearchIcon className="h-7 w-7" />
            </span>
            <h3 className="mt-6 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                No listings match{term ? ` “${term}”` : ''}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-neutral-600">
                Try a different search — by title, category, region, condition, or status.
            </p>
            <button
                type="button"
                onClick={onClear}
                className="button-press focus-copper mt-6 inline-flex h-11 items-center justify-center rounded-lg border border-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white"
            >
                Clear search
            </button>
        </article>
    );
}

function pageWindow(current: number, total: number): (number | 'ellipsis')[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, index) => index + 1);
    }

    const shown = [...new Set([1, total, current - 1, current, current + 1])]
        .filter((value) => value >= 1 && value <= total)
        .sort((a, b) => a - b);

    const result: (number | 'ellipsis')[] = [];
    let previous = 0;

    for (const value of shown) {
        if (value - previous > 1) {
            result.push('ellipsis');
        }

        result.push(value);
        previous = value;
    }

    return result;
}

type PaginationProps = {
    page: number;
    totalPages: number;
    rangeStart: number;
    rangeEnd: number;
    total: number;
    onChange: (page: number) => void;
};

function Pagination({ page, totalPages, rangeStart, rangeEnd, total, onChange }: PaginationProps) {
    return (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-neutral-500">
                Showing {rangeStart}–{rangeEnd} of {total}
            </p>

            <nav aria-label="Pagination" className="flex items-center gap-1.5">
                <PageButton label="Previous page" disabled={page <= 1} onClick={() => onChange(page - 1)}>
                    <ChevronIcon dir="left" />
                </PageButton>

                {pageWindow(page, totalPages).map((entry, index) =>
                    entry === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className="px-1 text-neutral-400">
                            …
                        </span>
                    ) : (
                        <PageButton key={entry} active={entry === page} onClick={() => onChange(entry)}>
                            {entry}
                        </PageButton>
                    ),
                )}

                <PageButton label="Next page" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
                    <ChevronIcon dir="right" />
                </PageButton>
            </nav>
        </div>
    );
}

type PageButtonProps = {
    children: ReactNode;
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    label?: string;
};

function PageButton({ children, onClick, active = false, disabled = false, label }: PageButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={`focus-copper flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 font-heading text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                active
                    ? 'border-[#a56437] bg-[#a56437] text-white'
                    : 'border-[#dad5cb] bg-white text-neutral-700 hover:border-[#a56437] hover:text-[#a56437]'
            }`}
        >
            {children}
        </button>
    );
}

function PhotoPicker({ files, error, onChange }: { files: File[]; error?: string; onChange: (files: File[]) => void }) {
    const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

    useEffect(() => {
        const nextPreviews = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setPreviews(nextPreviews);

        return () => {
            nextPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [files]);

    function removeFile(index: number) {
        onChange(files.filter((_, fileIndex) => fileIndex !== index));
    }

    return (
        <div className="grid gap-3 sm:col-span-2">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">Photos optional</span>
            <label className="button-press focus-within:ring-2 focus-within:ring-[#a56437]/40 grid cursor-pointer gap-3 border border-dashed border-[#cfc7ba] bg-white p-5 transition-colors hover:border-[#a56437] hover:bg-[#fbfaf8]">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) => {
                        onChange(Array.from(event.target.files ?? []));
                        event.currentTarget.value = '';
                    }}
                    className="sr-only"
                />
                <span className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-neutral-950">Add photos</span>
                <span className="text-sm leading-6 text-neutral-600">Choose one or more equipment images. Previews will appear below before submission.</span>
            </label>
            {error && <span className="text-sm text-[#b3261e]">{error}</span>}

            {previews.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                    {previews.map((preview, index) => (
                        <article key={`${preview.file.name}-${preview.file.lastModified}`} className="overflow-hidden border border-[#dad5cb] bg-white">
                            <div className="aspect-[4/3] bg-[#f3f1ec]">
                                <img src={preview.url} alt={preview.file.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="grid gap-3 p-3">
                                <div>
                                    <p className="truncate text-sm font-semibold text-neutral-900">{preview.file.name}</p>
                                    <p className="mt-1 text-xs text-neutral-500">{formatFileSize(preview.file.size)}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="focus-copper w-fit font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

function DocumentPicker({ files, error, onChange }: { files: File[]; error?: string; onChange: (files: File[]) => void }) {
    function removeFile(index: number) {
        onChange(files.filter((_, fileIndex) => fileIndex !== index));
    }

    return (
        <div className="grid gap-3 sm:col-span-2">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">Documents optional</span>
            <label className="button-press focus-within:ring-2 focus-within:ring-[#a56437]/40 grid cursor-pointer gap-3 border border-dashed border-[#cfc7ba] bg-white p-5 transition-colors hover:border-[#a56437] hover:bg-[#fbfaf8]">
                <input
                    type="file"
                    multiple
                    onChange={(event) => {
                        onChange(Array.from(event.target.files ?? []));
                        event.currentTarget.value = '';
                    }}
                    className="sr-only"
                />
                <span className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-neutral-950">Add documents</span>
                <span className="text-sm leading-6 text-neutral-600">Upload optional spec sheets, service records, or other supporting files.</span>
            </label>
            {error && <span className="text-sm text-[#b3261e]">{error}</span>}

            {files.length > 0 && (
                <div className="grid gap-2">
                    {files.map((file, index) => (
                        <article key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between gap-4 border border-[#dad5cb] bg-white p-3">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-neutral-900">{file.name}</p>
                                <p className="mt-1 text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="focus-copper shrink-0 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline"
                            >
                                Remove
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

function Field({
    label,
    error,
    required = false,
    className = '',
    children,
}: {
    label: string;
    error?: string;
    required?: boolean;
    className?: string;
    children: ReactNode;
}) {
    return (
        <label className={`grid gap-2 ${className}`}>
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                {label}
                {!required && <span className="ml-2 text-neutral-400">Optional</span>}
            </span>
            {children}
            {error && <span className="text-sm text-[#b3261e]">{error}</span>}
        </label>
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

function inputClass(error?: string) {
    return `portal-input${error ? ' portal-input-error' : ''}`;
}

function formatRegion(submission: EquipmentSubmission) {
    return submission.city ? `${submission.region} — ${submission.city}` : submission.region;
}

function formatPrice(submission: EquipmentSubmission) {
    if (submission.needs_valuation) {
        return 'Valuation requested';
    }

    if (!submission.asking_price) {
        return null;
    }

    const amount = Number(submission.asking_price);

    if (Number.isNaN(amount)) {
        return submission.asking_price;
    }

    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });
}

function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) {
        return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
