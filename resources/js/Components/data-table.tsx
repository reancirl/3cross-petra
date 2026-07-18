import type { ReactNode } from 'react';

/**
 * A reusable, responsive data table for list/queue screens.
 *
 * Columns are declared as data so a caller describes *what* each column shows and the
 * table owns all the chrome: header styling, row hover, keyboard access, and which
 * columns survive at narrow widths.
 *
 * Rows are clickable when `onRowClick` is given. A bare `onClick` on a `<tr>` is
 * mouse-only and invisible to keyboard and screen-reader users, and putting
 * `role="button"` on a row would destroy the table semantics that make the data
 * navigable in the first place. So the row keeps its native semantics for pointer
 * convenience, and the table appends a real `<button>` in a trailing action cell that
 * carries the same action for everyone else. `rowLabel` names that button.
 */
export type DataTableColumn<T> = {
    key: string;
    header: ReactNode;
    cell: (item: T) => ReactNode;
    /**
     * Drop this column below the given breakpoint. Put secondary detail behind the
     * larger breakpoints so a phone shows the identifying column and the status,
     * rather than a table that scrolls sideways to be legible.
     */
    hideBelow?: 'sm' | 'md' | 'lg' | 'xl';
    align?: 'left' | 'right';
    /** Tailwind width utility, e.g. 'w-32'. Omit to size from content. */
    width?: string;
};

// Tailwind scans source for complete class strings, so these cannot be interpolated.
const HIDE_BELOW_CLASS: Record<NonNullable<DataTableColumn<unknown>['hideBelow']>, string> = {
    sm: 'hidden sm:table-cell',
    md: 'hidden md:table-cell',
    lg: 'hidden lg:table-cell',
    xl: 'hidden xl:table-cell',
};

export default function DataTable<T>({
    columns,
    rows,
    rowKey,
    onRowClick,
    rowLabel,
    caption,
}: {
    columns: DataTableColumn<T>[];
    rows: T[];
    rowKey: (item: T) => string | number;
    onRowClick?: (item: T) => void;
    /** Accessible name for the row's action button, e.g. `Review ${item.title}`. */
    rowLabel?: (item: T) => string;
    /** Visually hidden description of the table for screen readers. */
    caption?: string;
}) {
    const interactive = Boolean(onRowClick);

    return (
        <div className="overflow-x-auto rounded-xl border border-[#dad5cb] bg-white shadow-sm">
            <table className="w-full min-w-[38rem] border-collapse text-left">
                {caption && <caption className="sr-only">{caption}</caption>}
                <thead>
                    <tr className="border-b border-[#dad5cb] bg-[#faf8f5]">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                scope="col"
                                className={[
                                    'px-4 py-3 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-neutral-500',
                                    column.align === 'right' ? 'text-right' : 'text-left',
                                    column.width ?? '',
                                    column.hideBelow ? HIDE_BELOW_CLASS[column.hideBelow] : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                            >
                                {column.header}
                            </th>
                        ))}
                        {interactive && (
                            <th scope="col" className="w-12 px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item) => (
                        <tr
                            key={rowKey(item)}
                            onClick={onRowClick ? () => onRowClick(item) : undefined}
                            className={`border-b border-[#ece7dd] last:border-b-0 ${
                                interactive ? 'cursor-pointer transition-colors hover:bg-[#faf8f5]' : ''
                            }`}
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className={[
                                        'px-4 py-3 align-middle text-sm text-neutral-600',
                                        column.align === 'right' ? 'text-right' : 'text-left',
                                        column.hideBelow ? HIDE_BELOW_CLASS[column.hideBelow] : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                >
                                    {column.cell(item)}
                                </td>
                            ))}
                            {onRowClick && (
                                <td className="px-4 py-3 text-right align-middle">
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            // The row handles the click too; without this the
                                            // action would fire twice as it bubbles.
                                            event.stopPropagation();
                                            onRowClick(item);
                                        }}
                                        aria-label={rowLabel ? rowLabel(item) : 'Open row'}
                                        className="focus-copper inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-[#f3f1ec] hover:text-neutral-900"
                                    >
                                        <ChevronRight />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ChevronRight() {
    return (
        <svg
            className="h-5 w-5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M9 6l6 6-6 6" />
        </svg>
    );
}

/**
 * Stacked primary/secondary text for a table's identifying column — a title with its
 * supporting line, without every caller re-inventing the type scale.
 */
export function CellStack({ primary, secondary }: { primary: ReactNode; secondary?: ReactNode }) {
    return (
        <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">{primary}</div>
            {secondary && <p className="mt-0.5 truncate text-xs leading-5 text-neutral-500">{secondary}</p>}
        </div>
    );
}
