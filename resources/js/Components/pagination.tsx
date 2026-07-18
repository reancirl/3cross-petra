import type { ReactNode } from 'react';

/**
 * Client-side pagination controls: a range readout, an optional page-size selector, and
 * a page-number nav that collapses to ellipses past seven pages.
 *
 * Extracted from My Listings, which had the only implementation in the codebase. Nothing
 * is paginated server-side — every controller returns its full collection — so this
 * slices an in-memory array. That is fine at current volumes but will not hold if a
 * broker queue grows into the thousands; at that point this becomes the seam to swap for
 * a real paginated endpoint.
 */

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

export const DEFAULT_PAGE_SIZE = 10;

/**
 * Below this many rows the controls are hidden entirely — one short page needs no
 * navigation, and no page-size choice would change what is on screen.
 */
export const PAGINATION_THRESHOLD = 10;

export function pageWindow(current: number, total: number): (number | 'ellipsis')[] {
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
    /** Omit to render without a page-size selector (My Listings uses a fixed size). */
    pageSize?: number;
    onPageSizeChange?: (size: number) => void;
};

export default function Pagination({
    page,
    totalPages,
    rangeStart,
    rangeEnd,
    total,
    onChange,
    pageSize,
    onPageSizeChange,
}: PaginationProps) {
    return (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm text-neutral-500">
                    Showing {rangeStart}–{rangeEnd} of {total}
                </p>

                {pageSize !== undefined && onPageSizeChange && (
                    <label className="flex items-center gap-2">
                        <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Per page</span>
                        <select
                            value={pageSize}
                            onChange={(event) => onPageSizeChange(Number(event.target.value))}
                            className="polished-select h-9 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-8 font-heading text-sm font-semibold text-neutral-800"
                        >
                            {PAGE_SIZE_OPTIONS.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
            </div>

            {/* One page needs no navigation, but the size selector above still earns its
                place — it is what gets the reader back to more than one page. */}
            {totalPages > 1 && (
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
            )}
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
