import { router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { UploadFileMeta } from '../types';

/**
 * The shared half of managing a listing's photos.
 *
 * Two screens add photos to a listing — the seller's own listing page and the broker's
 * Photos tab — and they present the set very differently: the seller gets a hero image
 * with a filmstrip, the broker gets a flat grid beside the review form. What they share
 * is the plumbing, so that is what lives here: one upload form and one remove button,
 * with the cap arithmetic in one place rather than two.
 *
 * Both exist because photos used to be write-once at submission. A seller who forgot
 * them left the broker with a publish checklist that nothing could satisfy.
 */

export const MAX_PHOTOS_FALLBACK = 8;

type PhotoUploadFormProps = {
    /** Where to POST. Differs per portal; the payload does not. */
    action: string;
    /** How many the listing already holds — the cap is a total, not a per-upload limit. */
    photoCount: number;
    maxPhotos?: number;
    /** False on a closed listing (Sold / Not Accepted), where the server would 403. */
    editable?: boolean;
};

export function PhotoUploadForm({ action, photoCount, maxPhotos = MAX_PHOTOS_FALLBACK, editable = true }: PhotoUploadFormProps) {
    // Cleared by hand after a successful post: form.reset() resets the Inertia state but
    // leaves the native input showing the old filename, which reads as "nothing happened".
    const inputRef = useRef<HTMLInputElement>(null);
    const form = useForm<{ photos: File[] }>({ photos: [] });
    const remaining = Math.max(0, maxPhotos - photoCount);

    if (!editable) {
        return null;
    }

    function submit(event: FormEvent) {
        event.preventDefault();

        form.post(action, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset();

                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            },
        });
    }

    if (remaining === 0) {
        return (
            <p className="rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3 text-sm text-neutral-600">
                This listing has the maximum of {maxPhotos} photos. Remove one to add another.
            </p>
        );
    }

    return (
        <form onSubmit={submit} className="grid gap-2 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] p-4">
            <label
                htmlFor={`photos-${action}`}
                className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-700"
            >
                Add photos
            </label>

            <input
                id={`photos-${action}`}
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(event) => form.setData('photos', Array.from(event.target.files ?? []))}
                className="focus-copper block w-full rounded-lg border border-[#dad5cb] bg-white px-3 py-2 text-sm text-neutral-700 file:mr-3 file:rounded-md file:border-0 file:bg-[#f3f1ec] file:px-3 file:py-1.5 file:font-heading file:text-xs file:font-semibold file:uppercase file:tracking-[0.08em] file:text-neutral-700"
            />

            <p className="text-xs text-neutral-500">
                {remaining} of {maxPhotos} slot{remaining === 1 ? '' : 's'} left. JPG or PNG, up to 10 MB each.
            </p>

            {form.errors.photos && <p className="text-sm text-[#b3261e]">{form.errors.photos}</p>}
            {/* Per-file errors arrive keyed photos.0, photos.1 … — surfaced together so a
                single bad file in a batch says which rule it broke. */}
            {Object.entries(form.errors)
                .filter(([key]) => key.startsWith('photos.'))
                .map(([key, message]) => (
                    <p key={key} className="text-sm text-[#b3261e]">
                        {message}
                    </p>
                ))}

            <div>
                <button
                    type="submit"
                    disabled={form.processing || form.data.photos.length === 0}
                    className="button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg bg-[#a56437] px-5 font-heading text-xs font-semibold uppercase tracking-[0.1em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {form.processing ? 'Uploading…' : 'Upload'}
                </button>
            </div>
        </form>
    );
}

type RemovePhotoButtonProps = {
    /** Where to DELETE — the index is already baked into the URL by the caller. */
    action: string;
    label: string;
};

/**
 * Delete, not archive — the opposite of the rule documents follow. A document a customer
 * has been shown is part of the record of the deal; a photo is presentation, and a
 * duplicate or a shot of the wrong unit on a public card should leave no trace.
 *
 * Confirms first, because it is destructive and one click away from the thumbnail the
 * user is looking at.
 */
export function RemovePhotoButton({ action, label }: RemovePhotoButtonProps) {
    const [working, setWorking] = useState(false);

    function remove() {
        if (!window.confirm('Remove this photo? This cannot be undone.')) {
            return;
        }

        setWorking(true);

        router.delete(action, {
            preserveScroll: true,
            onFinish: () => setWorking(false),
        });
    }

    return (
        <button
            type="button"
            onClick={remove}
            disabled={working}
            aria-label={label}
            title={label}
            className="focus-copper grid h-7 w-7 place-items-center rounded-full border border-[#dad5cb] bg-white/95 text-neutral-600 shadow-sm transition-colors hover:border-[#b3261e] hover:text-[#b3261e] disabled:opacity-50"
        >
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
        </button>
    );
}

/**
 * The empty state. Deliberately not a flat "No photos uploaded." — on a listing waiting
 * to be published, an empty gallery is the thing blocking it, and the screen should say
 * so rather than leave the seller to discover it from the broker.
 */
export function NoPhotosNotice({ blocksPublishing }: { blocksPublishing: boolean }) {
    return (
        <div className="grid gap-1 rounded-xl border border-dashed border-[#dad5cb] bg-white px-4 py-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-neutral-700">No photos yet</p>
            {blocksPublishing && (
                <p className="text-sm text-neutral-500">
                    A listing needs at least one photo before Petra can publish it to the marketplace.
                </p>
            )}
        </div>
    );
}

export type ListingPhoto = UploadFileMeta;
