import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import SlideOver from '../../Components/slide-over';
import type { EquipmentSubmission, PortalData, StatusTone, UploadFileMeta } from '../../types';

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

export default function SellerListings({ portal, submissions, categoryOptions, regionOptions, conditionOptions }: SellerListingsProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
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

    return (
        <>
            <Head title="My Listings | Seller Portal" />

            <PortalShell portal={portal} title="My Listings">
                <div className="grid gap-6">
                    <section className="flex flex-col justify-between gap-4 border border-[#dad5cb] bg-white p-5 sm:flex-row sm:items-center sm:p-6">
                        <div>
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">Listed Equipment</span>
                            <h2 className="mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">Your Submissions</h2>
                            <p className="mt-2 max-w-2xl text-base leading-7 text-neutral-600">
                                Submit equipment to Petra and track the current review status here.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => openForm()}
                            className="button-press focus-copper inline-flex h-12 w-full shrink-0 items-center justify-center bg-[#a56437] px-6 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto"
                        >
                            Submit Equipment
                        </button>
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

                    <section className="grid gap-4">
                        {submissions.length === 0 ? (
                            <EmptyState onSubmit={() => openForm()} />
                        ) : (
                            <div className="grid gap-4">
                                {submissions.map((submission) => (
                                    <article key={submission.id} className="border border-[#dad5cb] bg-white p-6">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                                    {submission.title}
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-neutral-500">{submission.created_at}</p>
                                            </div>

                                            <div className="flex flex-col items-start gap-2 sm:items-end">
                                                <StatusBadge label={submission.status_label} tone={submission.status_tone} />
                                                {submission.status_explanation && (
                                                    <p className="text-sm leading-6 text-neutral-500 sm:text-right">{submission.status_explanation}</p>
                                                )}
                                            </div>
                                        </div>

                                        <dl className="mt-5 grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                            <Detail label="Category" value={submission.category} />
                                            <Detail label="Region" value={formatRegion(submission)} />
                                            <Detail label="Condition" value={submission.condition_label} />
                                            <Detail label="Asking price" value={formatPrice(submission)} />
                                            {submission.condition_notes && (
                                                <div className="sm:col-span-2">
                                                    <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Condition notes</dt>
                                                    <dd className="mt-1 whitespace-pre-line text-neutral-700">{submission.condition_notes}</dd>
                                                </div>
                                            )}
                                        </dl>

                                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Photos</span>
                                                <div className="mt-2">
                                                    <PhotoThumbnails photos={submission.photos} />
                                                </div>
                                            </div>

                                            <div>
                                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">Documents</span>
                                                <div className="mt-2">
                                                    <DocumentLinks documents={submission.documents} />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
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
            className={`inline-flex h-8 shrink-0 items-center border px-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] ${toneClasses[tone] ?? toneClasses.neutral}`}
        >
            {label}
        </span>
    );
}

function EmptyState({ onSubmit }: { onSubmit: () => void }) {
    return (
        <article className="border border-[#dad5cb] bg-white p-8 text-center sm:p-12">
            <h3 className="font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl">
                Got equipment sitting in a yard?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-neutral-600">
                Submit it to Petra and a broker will review the asset, position it, and work the buyer side for you.
            </p>
            <button
                type="button"
                onClick={onSubmit}
                className="button-press focus-copper mt-8 inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            >
                Submit Equipment
            </button>
        </article>
    );
}

function PhotoThumbnails({ photos }: { photos: UploadFileMeta[] }) {
    if (photos.length === 0) {
        return <p className="text-base leading-7 text-neutral-500">No photos uploaded</p>;
    }

    const visible = photos.slice(0, 4);
    const remaining = photos.length - visible.length;

    return (
        <div className="flex flex-wrap gap-2">
            {visible.map((photo) => (
                <a
                    key={photo.path}
                    href={photo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-copper block h-20 w-20 overflow-hidden border border-[#dad5cb] bg-[#f3f1ec]"
                    title={photo.name}
                >
                    <img src={photo.url} alt={photo.name} loading="lazy" className="h-full w-full object-cover" />
                </a>
            ))}

            {remaining > 0 && (
                <span className="flex h-20 w-20 items-center justify-center border border-[#dad5cb] bg-[#f3f1ec] px-1 text-center font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600">
                    +{remaining} more
                </span>
            )}
        </div>
    );
}

function DocumentLinks({ documents }: { documents: UploadFileMeta[] }) {
    if (documents.length === 0) {
        return <p className="text-base leading-7 text-neutral-500">No documents uploaded</p>;
    }

    return (
        <ul className="grid gap-2">
            {documents.map((document) => (
                <li key={document.path}>
                    <a
                        href={document.url}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-copper flex items-center gap-3 border border-[#dad5cb] bg-white p-3 transition-colors hover:border-[#a56437]"
                    >
                        <FileIcon />
                        <span className="min-w-0 truncate text-sm font-semibold text-neutral-900">{document.name}</span>
                    </a>
                </li>
            ))}
        </ul>
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
