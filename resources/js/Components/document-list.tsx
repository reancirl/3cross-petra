import type { ReactNode } from 'react';
import type { PortalDocument } from '../types';

/**
 * A document as a row: file icon, name, who added it, when, and a download link.
 *
 * Shared by the customer hub (Pages/Portal/Documents) and the broker's per-subject
 * panel, because the two render the same object and only differ in what they hang off
 * the right-hand side — the `meta` and `actions` slots. Keeping one row component is
 * what stops the two views drifting into looking like different features.
 *
 * There are no previews beyond the type icon. An image or a PDF opens in place when the
 * link is followed, which the download endpoints serve inline for exactly that reason;
 * anything else downloads. That is the whole viewing story in v1.
 */

export function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) {
        return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type DocumentRowProps = {
    document: PortalDocument;
    /** Extra chips under the name — visibility, source label, archived state. */
    meta?: ReactNode;
    /** Buttons on the right, after the download link. */
    actions?: ReactNode;
};

export function DocumentRow({ document, meta, actions }: DocumentRowProps) {
    return (
        <li className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
            <div className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 shrink-0 text-neutral-400">
                    <FileTypeIcon mime={document.mime} />
                </span>

                <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm font-semibold text-neutral-900">{document.name}</span>
                        {document.isNew && (
                            <span className="shrink-0 rounded-full bg-[#a56437] px-2 py-0.5 font-heading text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-white">
                                New
                            </span>
                        )}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
                        <span>{document.addedByLabel ?? `Added by ${document.addedBy}`}</span>
                        {document.createdAtLabel && (
                            <>
                                <span aria-hidden="true">·</span>
                                <span>{document.createdAtLabel}</span>
                            </>
                        )}
                        <span aria-hidden="true">·</span>
                        <span>{formatFileSize(document.size)}</span>
                    </p>
                    {meta && <p className="mt-2 flex flex-wrap items-center gap-2">{meta}</p>}
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:justify-end">
                {document.available ? (
                    <a
                        href={document.url}
                        className="focus-copper inline-flex items-center gap-1.5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline"
                    >
                        <DownloadIcon />
                        Download
                    </a>
                ) : (
                    // The row survived; the bytes did not. Say so plainly rather than
                    // handing the reader a link that 404s — the messaging screens
                    // already learned this lesson with pre-volume attachments.
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-400">File unavailable</span>
                )}
                {actions}
            </div>
        </li>
    );
}

/**
 * The list container. Rows are separated by hairlines rather than boxed individually,
 * so a subject with eight documents reads as one block instead of eight cards.
 */
export function DocumentRows({ children }: { children: ReactNode }) {
    return <ul className="divide-y divide-[#ece7dd]">{children}</ul>;
}

/**
 * Broad type families only. The brief rules out previews beyond images, so this is
 * scanning aid, not a file-type taxonomy — a docx and an xlsx are both "a document
 * that is not a picture and not a PDF" as far as the eye skimming the list cares.
 */
export function FileTypeIcon({ mime }: { mime: string }) {
    const common = {
        className: 'h-5 w-5 shrink-0',
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        strokeWidth: 1.6,
        viewBox: '0 0 24 24',
        'aria-hidden': true,
    };

    if (mime.startsWith('image/')) {
        return (
            <svg {...common}>
                <path d="M4 5h16v14H4z" />
                <path d="M4 15l4-4 4 4 3-3 5 5" />
                <path d="M9 9.5h.01" />
            </svg>
        );
    }

    if (mime === 'application/pdf') {
        return (
            <svg {...common}>
                <path d="M7 3h7l4 4v14H7z" />
                <path d="M14 3v5h5" />
                <path d="M10 14h1.5a1.25 1.25 0 0 0 0-2.5H10V17" />
                <path d="M14 17v-5.5h1.2a1.4 1.4 0 0 1 0 2.8H14" />
            </svg>
        );
    }

    if (mime.includes('spreadsheet') || mime.includes('excel') || mime === 'text/csv') {
        return (
            <svg {...common}>
                <path d="M7 3h7l4 4v14H7z" />
                <path d="M14 3v5h5" />
                <path d="M10 12l4 5" />
                <path d="M14 12l-4 5" />
            </svg>
        );
    }

    return (
        <svg {...common}>
            <path d="M7 3h7l4 4v14H7z" />
            <path d="M14 3v5h5" />
            <path d="M10 13h6" />
            <path d="M10 17h4" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M12 4v11" />
            <path d="M8 11l4 4 4-4" />
            <path d="M4 19h16" />
        </svg>
    );
}
