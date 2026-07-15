import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import PortalShell from '../../Components/portal-shell';
import SlideOver from '../../Components/slide-over';
import type { EquipmentRequest, PortalData, SharedPageProps } from '../../types';

type BuyerSavedEquipmentProps = {
    portal: PortalData;
    requests: EquipmentRequest[];
    statusOptions: Record<string, string>;
};

type RequestForm = {
    equipment_type: string;
    specifications: string;
    budget_range: string;
    location_preference: string;
    timeline: string;
};

type DateRange = {
    start: Date | null;
    end: Date | null;
};

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function BuyerSavedEquipment({ portal, requests }: BuyerSavedEquipmentProps) {
    const { status } = usePage<SharedPageProps>().props;
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [timelineRange, setTimelineRange] = useState<DateRange>({ start: null, end: null });
    const form = useForm<RequestForm>({
        equipment_type: '',
        specifications: '',
        budget_range: '',
        location_preference: '',
        timeline: '',
    });

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!timelineRange.start || !timelineRange.end) {
            form.setError('timeline', 'Select a start and end date.');

            return;
        }

        form.post('/buyer/saved-equipment', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setTimelineRange({ start: null, end: null });
                setIsFormOpen(false);
            },
        });
    }

    function updateTimeline(nextRange: DateRange) {
        setTimelineRange(nextRange);
        form.setData('timeline', nextRange.start && nextRange.end ? formatDateRange(nextRange.start, nextRange.end) : '');
        form.clearErrors('timeline');
    }

    return (
        <>
            <Head title="My Requests | Buyer Portal" />

            <PortalShell portal={portal} title="My Requests">
                <div className="grid gap-6">
                    <section className="flex flex-col justify-between gap-4 border border-[#dad5cb] bg-white p-5 sm:flex-row sm:items-center sm:p-6">
                        <div>
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">Equipment Requests</span>
                            <h2 className="mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">Your Requests</h2>
                            <p className="mt-2 max-w-2xl text-base leading-7 text-neutral-600">
                                Request equipment from Petra and track the current review status here.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsFormOpen(true)}
                            className="button-press focus-copper inline-flex h-12 w-full items-center justify-center bg-[#a56437] px-6 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto"
                        >
                            Request Equipment
                        </button>
                    </section>

                    <SlideOver open={isFormOpen} onClose={() => setIsFormOpen(false)} eyebrow="Request Equipment" title="What To Include">
                        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                            <Field id="equipment_type" label="Equipment type" error={form.errors.equipment_type}>
                                <input id="equipment_type" value={form.data.equipment_type} onChange={(event) => form.setData('equipment_type', event.target.value)} className="portal-input" required />
                            </Field>

                            <Field id="budget_range" label="Budget range" error={form.errors.budget_range}>
                                <input
                                    id="budget_range"
                                    value={form.data.budget_range}
                                    onChange={(event) => form.setData('budget_range', formatBudgetInput(event.target.value))}
                                    className="portal-input"
                                    inputMode="numeric"
                                    pattern="[0-9,]*"
                                    placeholder="40,000"
                                    required
                                />
                            </Field>

                            <Field id="location_preference" label="Location preference" error={form.errors.location_preference}>
                                <input id="location_preference" value={form.data.location_preference} onChange={(event) => form.setData('location_preference', event.target.value)} className="portal-input" required />
                            </Field>

                            <Field id="timeline_start" label="Timeline" error={form.errors.timeline} className="sm:col-span-2">
                                <DateRangePicker id="timeline_start" value={timelineRange} onChange={updateTimeline} />
                            </Field>

                            <Field id="specifications" label="Specifications optional" error={form.errors.specifications} className="sm:col-span-2">
                                <textarea id="specifications" value={form.data.specifications} onChange={(event) => form.setData('specifications', event.target.value)} className="portal-input min-h-28 py-3" />
                            </Field>

                            <div className="sm:col-span-2">
                                <button type="submit" disabled={form.processing} className="button-press focus-copper inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60">
                                    {form.processing ? 'Submitting' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    </SlideOver>

                    <section className="grid gap-4">
                        {requests.length === 0 ? (
                            <article className="border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600">
                                Submitted equipment requests will appear here.
                            </article>
                        ) : (
                            <div className="grid gap-4">
                                {requests.map((request) => (
                                    <article key={request.id} className="border border-[#dad5cb] bg-white p-6">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                                    {request.equipment_type}
                                                </h3>
                                                <p className="mt-2 text-sm leading-6 text-neutral-500">{request.created_at}</p>
                                            </div>
                                            <StatusBadge label={request.status_label} />
                                        </div>

                                        <dl className="mt-5 grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2">
                                            <Detail label="Specifications" value={request.specifications} />
                                            <Detail label="Budget range" value={request.budget_range} />
                                            <Detail label="Location preference" value={request.location_preference} />
                                            <Detail label="Timeline" value={request.timeline} />
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

function DateRangePicker({ id, value, onChange }: { id: string; value: DateRange; onChange: (range: DateRange) => void }) {
    const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
    const months = [visibleMonth, addMonths(visibleMonth, 1)];

    function selectDate(day: Date) {
        const selectedDay = stripTime(day);

        if (!value.start || value.end || selectedDay.getTime() < value.start.getTime()) {
            onChange({ start: selectedDay, end: null });

            return;
        }

        onChange({ start: value.start, end: selectedDay });
    }

    return (
        <div className="border border-[#dad5cb] bg-white">
            <div className="grid gap-3 border-b border-[#dad5cb] bg-[#fbfaf8] p-3 sm:grid-cols-2">
                <div className="border border-[#dad5cb] bg-white px-3 py-2">
                    <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Start date</span>
                    <p className="mt-1 text-sm font-medium text-neutral-950">{value.start ? formatDate(value.start) : 'Select date'}</p>
                </div>
                <div className="border border-[#dad5cb] bg-white px-3 py-2">
                    <span className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">End date</span>
                    <p className="mt-1 text-sm font-medium text-neutral-950">{value.end ? formatDate(value.end) : 'Select date'}</p>
                </div>
            </div>

            <div className="flex items-center justify-between border-b border-[#dad5cb] px-3 py-2">
                <button
                    type="button"
                    onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
                    className="button-press focus-copper inline-flex h-9 w-9 items-center justify-center border border-[#dad5cb] font-heading text-lg text-neutral-950 hover:bg-neutral-950 hover:text-white"
                    aria-label="Previous month"
                >
                    {'<'}
                </button>
                <button
                    type="button"
                    onClick={() => onChange({ start: null, end: null })}
                    className="focus-copper font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline"
                >
                    Clear
                </button>
                <button
                    type="button"
                    onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
                    className="button-press focus-copper inline-flex h-9 w-9 items-center justify-center border border-[#dad5cb] font-heading text-lg text-neutral-950 hover:bg-neutral-950 hover:text-white"
                    aria-label="Next month"
                >
                    {'>'}
                </button>
            </div>

            <div className="grid gap-4 p-3 sm:grid-cols-2">
                {months.map((month, monthIndex) => (
                    <MonthCalendar key={month.toISOString()} id={monthIndex === 0 ? id : undefined} month={month} value={value} onSelect={selectDate} />
                ))}
            </div>
        </div>
    );
}

function MonthCalendar({ id, month, value, onSelect }: { id?: string; month: Date; value: DateRange; onSelect: (date: Date) => void }) {
    const days = getCalendarDays(month);

    return (
        <div>
            <h3 className="text-center font-heading text-lg font-semibold uppercase tracking-[0.08em] text-neutral-950">{monthFormatter.format(month)}</h3>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center">
                {weekdayLabels.map((weekday) => (
                    <span key={weekday} className="py-1 font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        {weekday}
                    </span>
                ))}
                {days.map((day, index) =>
                    day ? (
                        <button
                            id={id && day.getDate() === 1 ? id : undefined}
                            key={day.toISOString()}
                            type="button"
                            onClick={() => onSelect(day)}
                            aria-pressed={isSelected(day, value)}
                            aria-label={formatDate(day)}
                            className={dayButtonClass(day, value)}
                        >
                            {day.getDate()}
                        </button>
                    ) : (
                        <span key={`blank-${index}`} aria-hidden="true" />
                    ),
                )}
            </div>
        </div>
    );
}

function dayButtonClass(day: Date, value: DateRange): string {
    const baseClass =
        'focus-copper grid aspect-square min-h-9 place-items-center border font-heading text-sm font-semibold transition-colors';

    if (isRangeBoundary(day, value)) {
        return `${baseClass} border-neutral-950 bg-neutral-950 text-white`;
    }

    if (isWithinRange(day, value)) {
        return `${baseClass} border-[#eadfd4] bg-[#f1e7dc] text-neutral-950`;
    }

    return `${baseClass} border-transparent text-neutral-700 hover:border-[#a56437] hover:bg-[#fbfaf8]`;
}

function Field({ id, label, error, className = '', children }: { id: string; label: string; error?: string; className?: string; children: ReactNode }) {
    return (
        <div className={`grid gap-2 ${className}`}>
            <label htmlFor={id} className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                {label}
            </label>
            {children}
            {error && <span className="text-sm text-red-700">{error}</span>}
        </div>
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

function StatusBadge({ label }: { label: string }) {
    return (
        <span className="inline-flex h-8 items-center border border-[#dad5cb] bg-[#f8f8f6] px-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-[#a56437]">
            {label}
        </span>
    );
}

function formatBudgetInput(value: string): string {
    const digits = value.replace(/\D/g, '');

    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDate(date: Date): string {
    return dateFormatter.format(date);
}

function formatDateRange(start: Date, end: Date): string {
    return `${formatDate(start)} - ${formatDate(end)}`;
}

function stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number): Date {
    return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function getCalendarDays(month: Date): Array<Date | null> {
    const firstDay = startOfMonth(month);
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const blanks = Array.from<Date | null>({ length: firstDay.getDay() }).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1));

    return [...blanks, ...days];
}

function isSameDay(first: Date | null, second: Date | null): boolean {
    return Boolean(first && second && first.getTime() === second.getTime());
}

function isSelected(day: Date, value: DateRange): boolean {
    return isRangeBoundary(day, value) || isWithinRange(day, value);
}

function isRangeBoundary(day: Date, value: DateRange): boolean {
    return isSameDay(day, value.start) || isSameDay(day, value.end);
}

function isWithinRange(day: Date, value: DateRange): boolean {
    if (!value.start || !value.end) {
        return false;
    }

    const timestamp = day.getTime();

    return timestamp > value.start.getTime() && timestamp < value.end.getTime();
}
