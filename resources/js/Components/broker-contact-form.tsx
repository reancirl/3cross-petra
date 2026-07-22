import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Consent, Field, Honeypot, inputClass, Legend, RadioGroup, selectClass } from './public-form-fields';
import { useFormDraft } from '../use-form-draft';
import type { SharedPageProps, SiteContact } from '../types';

type Props = {
    topicOptions: Record<string, string>;
    preferredContactOptions: Record<string, string>;
    /** True on the render that follows a successful POST — the form is replaced by a receipt. */
    inquirySent: boolean;
    copy: {
        title: string;
        intro: string;
        requiredNote: string;
        labels: Record<string, string>;
        placeholders: Record<string, string>;
        consent: string;
        submitLabel: string;
        successTitle: string;
        successBody: string[];
    };
    sidebar: {
        title: string;
        intro: string;
        contactHeading: string;
        phoneLabel: string;
        emailLabel: string;
        hoursLabel: string;
        serviceAreaLabel: string;
        closing: string;
    };
};

type InquiryForm = {
    full_name: string;
    company: string;
    email: string;
    phone: string;
    topic: string;
    equipment_type: string;
    message: string;
    preferred_contact: string;
    consent: boolean;
    /** Honeypot: real people never see it, bots fill it, the server drops those silently. */
    website: string;
};

type RequiredField = 'full_name' | 'email' | 'phone' | 'topic' | 'message' | 'preferred_contact' | 'consent';

type Focusable = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

const DRAFT_KEY = 'petra:draft:contact-broker';

const REQUIRED_FIELDS: { name: RequiredField; message: string }[] = [
    { name: 'full_name', message: 'Enter your full name.' },
    { name: 'email', message: 'Enter your email address.' },
    { name: 'phone', message: 'Enter your phone number.' },
    { name: 'topic', message: 'Let us know how we can help.' },
    { name: 'message', message: 'Tell us a little about your equipment or question.' },
    { name: 'preferred_contact', message: 'Choose how you would like us to reach you.' },
    { name: 'consent', message: 'Please authorize Petra to contact you.' },
];

export default function BrokerContactForm({ topicOptions, preferredContactOptions, inquirySent, copy, sidebar }: Props) {
    const { auth } = usePage<SharedPageProps>().props;

    // Prefilled but still editable and still required, unlike the Equipment Submission form
    // where a signed-in seller's account details stand in for the contact block. A lead is
    // answered from what it carries, and the reply may want to go somewhere other than the
    // address someone happens to be logged in with.
    const form = useForm<InquiryForm>({
        full_name: auth.user?.name ?? '',
        company: auth.user?.company_name ?? '',
        email: auth.user?.email ?? '',
        phone: auth.user?.phone ?? '',
        topic: '',
        equipment_type: '',
        message: '',
        preferred_contact: '',
        consent: false,
        website: '',
    });

    const [clientErrors, setClientErrors] = useState<Partial<Record<RequiredField, string>>>({});
    const fieldRefs = useRef<Partial<Record<RequiredField, Focusable>>>({});

    // Persistence stops once the receipt is showing: there is no form left to restore into,
    // and the draft is cleared on success anyway.
    const draft = useFormDraft<InquiryForm>(DRAFT_KEY, form.data, form.setData, {
        omit: ['website'],
        enabled: !inquirySent,
    });

    function errorFor(field: keyof InquiryForm): string | undefined {
        const serverErrors = form.errors as Partial<Record<keyof InquiryForm, string>>;

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

    function isEmpty(field: RequiredField): boolean {
        const value = form.data[field];

        return typeof value === 'boolean' ? !value : !String(value ?? '').trim();
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const errors: Partial<Record<RequiredField, string>> = {};

        REQUIRED_FIELDS.forEach((field) => {
            if (isEmpty(field.name)) {
                errors[field.name] = field.message;
            }
        });

        setClientErrors(errors);

        const firstInvalid = REQUIRED_FIELDS.find((field) => errors[field.name]);

        if (firstInvalid) {
            fieldRefs.current[firstInvalid.name]?.focus();
            fieldRefs.current[firstInvalid.name]?.scrollIntoView({ block: 'center', behavior: 'smooth' });

            return;
        }

        form.post('/sell-equipment/contact-broker', {
            onSuccess: () => draft.clear(),
        });
    }

    return (
        <section id="talk-to-a-broker-form" className="border-b border-[#dad5cb] bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
                <div>
                    <h2 className="font-heading text-3xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl">
                        {copy.title}
                    </h2>

                    {inquirySent ? (
                        <SuccessPanel title={copy.successTitle} body={copy.successBody} />
                    ) : (
                        <>
                            <p className="mt-4 text-base leading-7 text-neutral-600">{copy.intro}</p>
                            <p className="mt-2 text-sm leading-6 text-neutral-500">{copy.requiredNote}</p>

                            <form onSubmit={submit} noValidate className="mt-10 grid gap-10">
                                <fieldset className="grid gap-5">
                                    <Legend>Your Details</Legend>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <Field label={copy.labels.fullName} required error={errorFor('full_name')}>
                                            <input
                                                ref={(element) => {
                                                    fieldRefs.current.full_name = element;
                                                }}
                                                type="text"
                                                value={form.data.full_name}
                                                onChange={(event) => {
                                                    clearError('full_name');
                                                    form.setData('full_name', event.target.value);
                                                }}
                                                className={inputClass(errorFor('full_name'))}
                                            />
                                        </Field>

                                        <Field label={copy.labels.company} error={errorFor('company')}>
                                            <input
                                                type="text"
                                                value={form.data.company}
                                                onChange={(event) => form.setData('company', event.target.value)}
                                                className={inputClass(errorFor('company'))}
                                            />
                                        </Field>

                                        <Field label={copy.labels.email} required error={errorFor('email')}>
                                            <input
                                                ref={(element) => {
                                                    fieldRefs.current.email = element;
                                                }}
                                                type="email"
                                                value={form.data.email}
                                                onChange={(event) => {
                                                    clearError('email');
                                                    form.setData('email', event.target.value);
                                                }}
                                                className={inputClass(errorFor('email'))}
                                            />
                                        </Field>

                                        <Field label={copy.labels.phone} required error={errorFor('phone')}>
                                            <input
                                                ref={(element) => {
                                                    fieldRefs.current.phone = element;
                                                }}
                                                type="tel"
                                                value={form.data.phone}
                                                onChange={(event) => {
                                                    clearError('phone');
                                                    form.setData('phone', event.target.value);
                                                }}
                                                className={inputClass(errorFor('phone'))}
                                            />
                                        </Field>
                                    </div>
                                </fieldset>

                                <fieldset className="grid gap-5">
                                    <Legend>How We Can Help</Legend>

                                    <Field label={copy.labels.topic} required error={errorFor('topic')}>
                                        <select
                                            ref={(element) => {
                                                fieldRefs.current.topic = element;
                                            }}
                                            value={form.data.topic}
                                            onChange={(event) => {
                                                clearError('topic');
                                                form.setData('topic', event.target.value);
                                            }}
                                            className={selectClass(errorFor('topic'))}
                                        >
                                            <option value="">Select an option</option>
                                            {Object.entries(topicOptions).map(([value, label]) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label={copy.labels.equipmentType} error={errorFor('equipment_type')}>
                                        <input
                                            type="text"
                                            placeholder={copy.placeholders.equipmentType}
                                            value={form.data.equipment_type}
                                            onChange={(event) => form.setData('equipment_type', event.target.value)}
                                            className={inputClass(errorFor('equipment_type'))}
                                        />
                                    </Field>

                                    <Field label={copy.labels.message} required error={errorFor('message')}>
                                        <textarea
                                            ref={(element) => {
                                                fieldRefs.current.message = element;
                                            }}
                                            rows={6}
                                            placeholder={copy.placeholders.message}
                                            value={form.data.message}
                                            onChange={(event) => {
                                                clearError('message');
                                                form.setData('message', event.target.value);
                                            }}
                                            className={inputClass(errorFor('message'))}
                                        />
                                    </Field>

                                    <RadioGroup
                                        legend={copy.labels.preferredContact}
                                        required
                                        options={preferredContactOptions}
                                        value={form.data.preferred_contact}
                                        error={errorFor('preferred_contact')}
                                        onChange={(value) => {
                                            clearError('preferred_contact');
                                            form.setData('preferred_contact', value);
                                        }}
                                        firstRef={(element) => {
                                            fieldRefs.current.preferred_contact = element;
                                        }}
                                    />
                                </fieldset>

                                <Consent
                                    label={copy.consent}
                                    checked={form.data.consent}
                                    error={errorFor('consent')}
                                    inputRef={(element) => {
                                        fieldRefs.current.consent = element;
                                    }}
                                    onChange={(checked) => {
                                        clearError('consent');
                                        form.setData('consent', checked);
                                    }}
                                />

                                <Honeypot value={form.data.website} onChange={(value) => form.setData('website', value)} />

                                <div className="border-t border-[#dad5cb] pt-8">
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="button-press inline-flex h-14 w-fit items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                                    >
                                        {form.processing ? 'Sending…' : copy.submitLabel}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                <ContactSidebar copy={sidebar} />
            </div>
        </section>
    );
}

function SuccessPanel({ title, body }: { title: string; body: string[] }) {
    return (
        <div
            // Announced rather than silently swapped in: someone who submitted by keyboard
            // would otherwise get no confirmation that anything happened.
            role="status"
            className="mt-8 border-l-4 border-[#a56437] bg-[#f3f1ec] p-8"
        >
            <h3 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950">{title}</h3>
            <div className="mt-4 space-y-3">
                {body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-7 text-neutral-600">
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    );
}

/**
 * The contact block beside the form. Every value comes from the shared `siteContact` prop
 * (config/petra.php), so the phone number and address live in one place and can be corrected
 * by an env var rather than a code change.
 */
function ContactSidebar({ copy }: { copy: Props['sidebar'] }) {
    const { siteContact } = usePage<SharedPageProps>().props;

    return (
        <aside className="h-fit border border-[#dad5cb] bg-[#f3f1ec] p-8 lg:sticky lg:top-8">
            <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950">{copy.title}</h3>
            <p className="mt-4 text-base leading-7 text-neutral-600">{copy.intro}</p>

            <h4 className="mt-8 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]">
                {copy.contactHeading}
            </h4>

            <dl className="mt-4 grid gap-4">
                <div>
                    <dt className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        {copy.phoneLabel}
                    </dt>
                    <dd className="mt-1 text-base leading-7 text-neutral-700">
                        {isDiallable(siteContact.phone) ? (
                            <a href={`tel:${telHref(siteContact.phone)}`} className={contactLinkClass}>
                                {siteContact.phone}
                            </a>
                        ) : (
                            siteContact.phone
                        )}
                    </dd>
                </div>

                <div>
                    <dt className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        {copy.emailLabel}
                    </dt>
                    <dd className="mt-1 break-words text-base leading-7 text-neutral-700">
                        <a href={`mailto:${siteContact.email}`} className={contactLinkClass}>
                            {siteContact.email}
                        </a>
                    </dd>
                </div>

                <div>
                    <dt className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        {copy.hoursLabel}
                    </dt>
                    <dd className="mt-1 text-base leading-7 text-neutral-700">
                        {siteContact.hours_days}
                        <br />
                        {siteContact.hours_time}
                    </dd>
                </div>

                <div>
                    <dt className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        {copy.serviceAreaLabel}
                    </dt>
                    <dd className="mt-2">
                        <ul className="grid gap-2">
                            {siteContact.service_area.map((area) => (
                                <li key={area} className="flex items-start gap-3 text-base leading-7 text-neutral-700">
                                    <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 bg-[#a56437]" />
                                    {area}
                                </li>
                            ))}
                        </ul>
                    </dd>
                </div>
            </dl>

            <p className="mt-8 border-t border-[#dad5cb] pt-6 text-base leading-7 text-neutral-600">{copy.closing}</p>
        </aside>
    );
}

const contactLinkClass =
    'font-semibold text-[#a56437] underline underline-offset-4 transition-colors hover:text-neutral-950';

/**
 * config/petra.php still defaults to the content doc's placeholder, "(307) XXX-XXXX". A
 * tel: link to that is a dead affordance — worse than plain text, because it looks callable.
 * Anything holding an X is treated as not yet supplied.
 */
function isDiallable(phone: string): boolean {
    return phone.trim().length > 0 && !/x/i.test(phone);
}

function telHref(phone: string): string {
    return phone.replace(/[^\d+]/g, '');
}
