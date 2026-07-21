import { useEffect, useState } from 'react';
import { ACCEPTED_ATTACHMENT_TYPES, ACCEPTED_EXTENSIONS, MAX_ATTACHMENT_BYTES, formatFileSize } from '../messaging';

/**
 * File picker for the message composer.
 *
 * Lifted out of the local PhotoPicker in Pages/Portal/SellerListings, with one
 * behavioural change: picking files **appends** rather than replaces. In the listing
 * form you choose a photo set once; in a composer you add files one at a time, and
 * replacing silently discarded everything picked before.
 *
 * Limits are mirrored from the server (see ../messaging) so an oversize or
 * wrong-typed file is rejected before upload instead of coming back as a validation
 * error — the server still enforces both, this is only a courtesy.
 *
 * This file exports components only, so Vite can keep a Fast Refresh boundary here.
 */

type AttachmentPickerProps = {
    files: File[];
    max: number;
    onChange: (files: File[]) => void;
    onReject: (message: string) => void;
};

/**
 * The picker is split into a trigger and a list so the composer can put the button
 * inline with Send while the selected files sit above it. Keeping them as one block
 * cost a whole extra row of composer height, which comes straight out of the
 * transcript on a laptop screen.
 */
export function AttachmentTrigger({ files, max, onChange, onReject }: AttachmentPickerProps) {
    function addFiles(picked: File[]) {
        const accepted: File[] = [];
        const rejected: string[] = [];

        for (const file of picked) {
            const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

            if (!ACCEPTED_EXTENSIONS.includes(extension)) {
                rejected.push(`${file.name} is not an accepted type`);
                continue;
            }

            if (file.size > MAX_ATTACHMENT_BYTES) {
                rejected.push(`${file.name} is larger than 10MB`);
                continue;
            }

            accepted.push(file);
        }

        const combined = [...files, ...accepted];

        if (combined.length > max) {
            rejected.push(`You can attach at most ${max} files to one message`);
        }

        if (rejected.length > 0) {
            onReject(rejected.join('. '));
        }

        onChange(combined.slice(0, max));
    }

    return (
        <label
            title="Attach images or PDFs (max 10MB each)"
            className="button-press focus-within:ring-2 focus-within:ring-[#a56437]/40 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#dad5cb] bg-white text-neutral-500 transition-colors hover:border-[#a56437] hover:text-[#a56437]"
        >
            <input
                type="file"
                multiple
                accept={ACCEPTED_ATTACHMENT_TYPES}
                onChange={(event) => {
                    addFiles(Array.from(event.target.files ?? []));
                    // Clearing lets the same file be picked again after removal;
                    // otherwise the input reports no change and nothing happens.
                    event.currentTarget.value = '';
                }}
                className="sr-only"
            />
            <span className="sr-only">Attach files</span>
            <PaperclipIcon />
        </label>
    );
}

export function AttachmentList({ files, onChange }: { files: File[]; onChange: (files: File[]) => void }) {
    const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

    // Object URLs are revoked on every change, not just unmount — a composer can
    // cycle through many selections in one page life, and leaking each one holds
    // the whole file in memory until navigation.
    useEffect(() => {
        const next = files
            .filter((file) => file.type.startsWith('image/'))
            .map((file) => ({ file, url: URL.createObjectURL(file) }));

        setPreviews(next);

        return () => {
            next.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [files]);

    if (files.length === 0) {
        return null;
    }

    return (
        <ul className="flex flex-wrap gap-1.5">
            {files.map((file, index) => {
                const preview = previews.find((item) => item.file === file);

                return (
                    <li
                        key={`${file.name}-${file.lastModified}-${index}`}
                        className="flex max-w-full items-center gap-2 rounded-lg border border-[#dad5cb] bg-white py-1 pl-1 pr-2"
                    >
                        {preview ? (
                            <img src={preview.url} alt="" className="h-7 w-7 shrink-0 rounded object-cover" />
                        ) : (
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#f3f1ec] font-heading text-[0.5rem] font-semibold uppercase text-neutral-500">
                                PDF
                            </span>
                        )}
                        <span className="min-w-0 truncate text-xs font-medium text-neutral-800">{file.name}</span>
                        <span className="shrink-0 text-[0.65rem] text-neutral-400">{formatFileSize(file.size)}</span>
                        <button
                            type="button"
                            onClick={() => onChange(files.filter((_, fileIndex) => fileIndex !== index))}
                            aria-label={`Remove ${file.name}`}
                            className="focus-copper shrink-0 text-neutral-400 transition-colors hover:text-[#b3261e]"
                        >
                            <CloseIcon />
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

function CloseIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
        </svg>
    );
}

function PaperclipIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
        </svg>
    );
}
