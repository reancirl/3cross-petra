import { useEffect, useState } from 'react';

/**
 * Photo and document pickers, shared by the seller portal's submission slide-over and the
 * public Equipment Submission form. Both hold File objects in form state and are submitted
 * with Inertia's forceFormData, so the two intake paths upload identically.
 */

type PickerProps = {
    files: File[];
    error?: string;
    onChange: (files: File[]) => void;
    /** Optional label override — the public form uses the content doc's wording. */
    label?: string;
    hint?: string;
};

export function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) {
        return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PhotoPicker({
    files,
    error,
    onChange,
    label = 'Photos optional',
    hint = 'Choose one or more equipment images. Previews will appear below before submission.',
}: PickerProps) {
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
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">{label}</span>
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
                <span className="text-sm leading-6 text-neutral-600">{hint}</span>
            </label>
            {error && <span className="text-sm text-[#b3261e]">{error}</span>}

            {previews.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                    {previews.map((preview, index) => (
                        <article
                            key={`${preview.file.name}-${preview.file.lastModified}`}
                            className="overflow-hidden rounded-lg border border-[#dad5cb] bg-white"
                        >
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

export function DocumentPicker({
    files,
    error,
    onChange,
    label = 'Documents optional',
    hint = 'Upload optional spec sheets, service records, or other supporting files.',
}: PickerProps) {
    function removeFile(index: number) {
        onChange(files.filter((_, fileIndex) => fileIndex !== index));
    }

    return (
        <div className="grid gap-3 sm:col-span-2">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">{label}</span>
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
                <span className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-neutral-950">
                    Add documents
                </span>
                <span className="text-sm leading-6 text-neutral-600">{hint}</span>
            </label>
            {error && <span className="text-sm text-[#b3261e]">{error}</span>}

            {files.length > 0 && (
                <div className="grid gap-2">
                    {files.map((file, index) => (
                        <article
                            key={`${file.name}-${file.lastModified}`}
                            className="flex items-center justify-between gap-4 rounded-lg border border-[#dad5cb] bg-white p-3"
                        >
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
