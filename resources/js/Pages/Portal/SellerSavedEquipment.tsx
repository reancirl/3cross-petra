import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import SlideOver from '../../Components/slide-over';
import type { EquipmentSubmission, PortalData, SharedPageProps, UploadFileMeta } from '../../types';

type SellerSavedEquipmentProps = {
    portal: PortalData;
    submissions: EquipmentSubmission[];
    statusOptions: Record<string, string>;
};

type SubmissionForm = {
    equipment_type: string;
    location: string;
    condition: string;
    photos: File[];
    documents: File[];
};

type PhotoPreview = {
    file: File;
    url: string;
};

export default function SellerSavedEquipment({ portal, submissions }: SellerSavedEquipmentProps) {
    const { status } = usePage<SharedPageProps>().props;
    const [isFormOpen, setIsFormOpen] = useState(false);
    const form = useForm<SubmissionForm>({
        equipment_type: '',
        location: '',
        condition: '',
        photos: [],
        documents: [],
    });

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('/seller/saved-equipment', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setIsFormOpen(false);
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
                            onClick={() => setIsFormOpen(true)}
                            className="button-press focus-copper inline-flex h-12 w-full items-center justify-center bg-[#a56437] px-6 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto"
                        >
                            Submit Equipment
                        </button>
                    </section>

                    <SlideOver open={isFormOpen} onClose={() => setIsFormOpen(false)} eyebrow="Submit Equipment" title="What We Need">
                        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                            <Field label="Equipment type" error={form.errors.equipment_type}>
                                <input value={form.data.equipment_type} onChange={(event) => form.setData('equipment_type', event.target.value)} className="portal-input" required />
                            </Field>

                            <Field label="Location" error={form.errors.location}>
                                <input value={form.data.location} onChange={(event) => form.setData('location', event.target.value)} className="portal-input" required />
                            </Field>

                            <Field label="Condition" error={form.errors.condition} className="sm:col-span-2">
                                <textarea
                                    value={form.data.condition}
                                    onChange={(event) => form.setData('condition', event.target.value)}
                                    className="portal-input min-h-28 py-3"
                                    placeholder="e.g. Used, minor wear, fully operational"
                                    required
                                />
                            </Field>

                            <PhotoPicker
                                files={form.data.photos}
                                error={form.errors.photos}
                                onChange={(files) => form.setData('photos', files)}
                            />

                            <DocumentPicker
                                files={form.data.documents}
                                error={form.errors.documents}
                                onChange={(files) => form.setData('documents', files)}
                            />

                            <div className="sm:col-span-2">
                                <button type="submit" disabled={form.processing} className="button-press focus-copper inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60">
                                    {form.processing ? 'Submitting' : 'Submit Equipment'}
                                </button>
                            </div>
                        </form>
                    </SlideOver>

                    <section className="grid gap-4">
                        {submissions.length === 0 ? (
                            <article className="border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600">
                                Submitted equipment will appear here.
                            </article>
                        ) : (
                            <div className="grid gap-4">
                                {submissions.map((submission) => (
                                    <article key={submission.id} className="border border-[#dad5cb] bg-white p-6">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                                    {submission.equipment_type}
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-neutral-500">{submission.created_at}</p>
                                            </div>
                                            <StatusBadge label={submission.status_label} />
                                        </div>

                                        <dl className="mt-5 grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                            <Detail label="Location" value={submission.location} />
                                            <Detail label="Condition" value={submission.condition} />
                                            <FilesDetail label="Photos" files={submission.photos} />
                                            <FilesDetail label="Documents" files={submission.documents} />
                                        </dl>
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

function PhotoPicker({ files, error, onChange }: { files: File[]; error?: string; onChange: (files: File[]) => void }) {
    const [previews, setPreviews] = useState<PhotoPreview[]>([]);

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
            {error && <span className="text-sm text-red-700">{error}</span>}

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
            {error && <span className="text-sm text-red-700">{error}</span>}

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

function Field({ label, error, className = '', children }: { label: string; error?: string; className?: string; children: ReactNode }) {
    return (
        <label className={`grid gap-2 ${className}`}>
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">{label}</span>
            {children}
            {error && <span className="text-sm text-red-700">{error}</span>}
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

function FilesDetail({ label, files }: { label: string; files: UploadFileMeta[] }) {
    return (
        <div>
            <dt className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</dt>
            <dd className="mt-1 text-neutral-700">
                {files.length === 0 ? (
                    'None uploaded'
                ) : (
                    <ul className="grid gap-1">
                        {files.map((file) => (
                            <li key={file.path}>
                                <a href={file.url} className="text-[#a56437] underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                                    {file.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </dd>
        </div>
    );
}

function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) {
        return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function StatusBadge({ label }: { label: string }) {
    return (
        <span className="inline-flex h-8 items-center border border-[#dad5cb] bg-[#f8f8f6] px-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-[#a56437]">
            {label}
        </span>
    );
}
