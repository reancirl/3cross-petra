import type { ReactNode } from 'react';

/**
 * Field primitives shared by the two public Sell Equipment forms — the Equipment Submission
 * form and Talk to a Broker. Extracted from public-submission-form.tsx when the second form
 * landed, the same way file-pickers.tsx was lifted out of the seller portal.
 *
 * These are the public-site counterparts to the portal's form styling: same `portal-input`
 * classes and copper error treatment, but laid out for a wide marketing page rather than a
 * slide-over.
 */

export function Legend({ children }: { children: ReactNode }) {
    return (
        <legend className="mb-1 font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
            {children}
        </legend>
    );
}

export function Field({
    label,
    error,
    required = false,
    className = '',
    hint,
    children,
}: {
    label: string;
    error?: string;
    required?: boolean;
    className?: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <label className={`grid gap-2 ${className}`}>
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                {label}
                {required ? <span className="ml-1 text-[#a56437]">*</span> : <span className="ml-2 text-neutral-400">Optional</span>}
            </span>
            {hint && <span className="text-sm leading-6 text-neutral-500">{hint}</span>}
            {children}
            {error && <span className="text-sm text-[#b3261e]">{error}</span>}
        </label>
    );
}

export function RadioGroup({
    legend,
    options,
    value,
    error,
    required = false,
    onChange,
    firstRef,
}: {
    legend: string;
    options: Record<string, string>;
    value: string;
    error?: string;
    required?: boolean;
    onChange: (value: string) => void;
    firstRef?: (element: HTMLInputElement | null) => void;
}) {
    return (
        <div role="group" className="grid gap-3">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                {legend}
                {required && <span className="ml-1 text-[#a56437]">*</span>}
            </span>
            <div className="grid gap-2">
                {Object.entries(options).map(([optionValue, label], index) => (
                    <label key={optionValue} className="flex items-start gap-3 text-base leading-7 text-neutral-700">
                        <input
                            ref={index === 0 ? firstRef : undefined}
                            type="radio"
                            name={legend}
                            checked={value === optionValue}
                            onChange={() => onChange(optionValue)}
                            className="mt-1.5 h-4 w-4 shrink-0 accent-[#a56437]"
                        />
                        {label}
                    </label>
                ))}
            </div>
            {error && <span className="text-sm text-[#b3261e]">{error}</span>}
        </div>
    );
}

export function Consent({
    label,
    checked,
    error,
    onChange,
    inputRef,
}: {
    label: string;
    checked: boolean;
    error?: string;
    onChange: (checked: boolean) => void;
    inputRef?: (element: HTMLInputElement | null) => void;
}) {
    return (
        <div className="grid gap-1">
            <label className="flex items-start gap-3 text-base leading-7 text-neutral-700">
                <input
                    ref={inputRef}
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => onChange(event.target.checked)}
                    className="mt-1.5 h-4 w-4 shrink-0 accent-[#a56437]"
                />
                <span>
                    {label}
                    <span className="ml-1 text-[#a56437]">*</span>
                </span>
            </label>
            {error && <span className="pl-7 text-sm text-[#b3261e]">{error}</span>}
        </div>
    );
}

/**
 * Hidden from people and from screen readers, tempting to bots. The controllers treat a
 * filled `website` as spam and answer exactly as they would a real submission.
 */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <div aria-hidden="true" className="hidden">
            <label>
                Website
                <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />
            </label>
        </div>
    );
}

export function inputClass(error?: string) {
    return `portal-input${error ? ' portal-input-error' : ''}`;
}
