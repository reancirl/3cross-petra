import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { DocumentPicker, PhotoPicker } from './file-pickers';
import { Consent, Field, Honeypot, inputClass, Legend, RadioGroup } from './public-form-fields';
import { useFormDraft } from '../use-form-draft';
import type { SharedPageProps } from '../types';

export type PublicLocationOption = {
    value: string;
    label: string;
    group: string;
};

type Props = {
    categoryOptions: string[];
    locationOptions: PublicLocationOption[];
    conditionOptions: Record<string, string>;
    ownershipOptions: Record<string, string>;
    intentOptions: Record<string, string>;
    availabilityOptions: Record<string, string>;
    valueRangeOptions: Record<string, string>;
    copy: {
        title: string;
        subtitle: string;
        intro: string;
        requiredNote: string;
        sections: Record<string, string>;
        labels: Record<string, string>;
        hints: Record<string, string | string[]>;
        guideLinks: Record<string, { label: string; href: string }>;
        consent: { accuracy: string; contact: string };
        submitLabel: string;
        supportingText: string;
    };
};

type SubmissionForm = {
    full_name: string;
    company: string;
    email: string;
    phone: string;
    category: string;
    description: string;
    quantity: string;
    location: string;
    condition: string;
    is_owner: string;
    intent: string[];
    availability: string;
    estimated_value_range: string;
    additional_info: string;
    consent_accuracy: boolean;
    consent_contact: boolean;
    photos: File[];
    documents: File[];
    /** Honeypot: real people never see it, bots fill it, the server drops those silently. */
    website: string;
};

type RequiredField =
    | 'full_name'
    | 'company'
    | 'email'
    | 'phone'
    | 'category'
    | 'description'
    | 'quantity'
    | 'location'
    | 'condition'
    | 'is_owner'
    | 'intent'
    | 'availability'
    | 'consent_accuracy'
    | 'consent_contact';

type Focusable = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

const DRAFT_KEY = 'petra:draft:equipment-submission';

function emptyForm(): SubmissionForm {
    return {
        full_name: '',
        company: '',
        email: '',
        phone: '',
        category: '',
        description: '',
        quantity: '1',
        location: '',
        condition: '',
        is_owner: '',
        intent: [],
        availability: '',
        estimated_value_range: '',
        additional_info: '',
        consent_accuracy: false,
        consent_contact: false,
        photos: [],
        documents: [],
        website: '',
    };
}

export default function PublicSubmissionForm({
    categoryOptions,
    locationOptions,
    conditionOptions,
    ownershipOptions,
    intentOptions,
    availabilityOptions,
    valueRangeOptions,
    copy,
}: Props) {
    const { auth } = usePage<SharedPageProps>().props;
    // A signed-in seller owns the listing, so their account details are used and the contact
    // block is replaced by a short note. Buyers and brokers still type contact details:
    // their submission becomes an unclaimed lead a broker works from those fields.
    const isSeller = auth.user?.user_type === 'seller';

    const form = useForm<SubmissionForm>({
        ...emptyForm(),
        full_name: auth.user && !isSeller ? auth.user.name : '',
        email: auth.user && !isSeller ? auth.user.email : '',
        phone: auth.user && !isSeller ? (auth.user.phone ?? '') : '',
        company: auth.user && !isSeller ? (auth.user.company_name ?? '') : '',
    });

    const [clientErrors, setClientErrors] = useState<Partial<Record<RequiredField, string>>>({});
    const fieldRefs = useRef<Partial<Record<RequiredField, Focusable>>>({});

    // Files cannot be serialised, so they stay in memory. The guide links open in a new tab,
    // which keeps this form mounted and the chosen files intact.
    const draft = useFormDraft<SubmissionForm>(DRAFT_KEY, form.data, form.setData, {
        omit: ['photos', 'documents', 'website'],
    });

    const requiredFields: { name: RequiredField; message: string }[] = [
        ...(isSeller
            ? []
            : ([
                  { name: 'full_name', message: 'Enter your full name.' },
                  { name: 'company', message: 'Enter your company name.' },
                  { name: 'email', message: 'Enter your email address.' },
                  { name: 'phone', message: 'Enter your phone number.' },
              ] as { name: RequiredField; message: string }[])),
        { name: 'category', message: 'Select an equipment category.' },
        { name: 'description', message: 'Tell us what you are selling.' },
        { name: 'quantity', message: 'Enter a quantity.' },
        { name: 'location', message: 'Select the equipment location.' },
        { name: 'condition', message: 'Select the general condition.' },
        { name: 'is_owner', message: 'Let us know if you own the equipment.' },
        { name: 'intent', message: 'Select at least one option.' },
        { name: 'availability', message: 'Let us know if the equipment is available.' },
        { name: 'consent_accuracy', message: 'Please confirm the information is accurate.' },
        { name: 'consent_contact', message: 'Please authorize Petra to contact you.' },
    ];

    function errorFor(field: keyof SubmissionForm): string | undefined {
        const serverErrors = form.errors as Partial<Record<keyof SubmissionForm, string>>;

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

        if (typeof value === 'boolean') {
            return !value;
        }

        if (Array.isArray(value)) {
            return value.length === 0;
        }

        return !String(value ?? '').trim();
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const errors: Partial<Record<RequiredField, string>> = {};

        requiredFields.forEach((field) => {
            if (isEmpty(field.name)) {
                errors[field.name] = field.message;
            }
        });

        setClientErrors(errors);

        const firstInvalid = requiredFields.find((field) => errors[field.name]);

        if (firstInvalid) {
            fieldRefs.current[firstInvalid.name]?.focus();
            fieldRefs.current[firstInvalid.name]?.scrollIntoView({ block: 'center', behavior: 'smooth' });

            return;
        }

        form.post('/sell-equipment/equipment-submission', {
            forceFormData: true,
            // Clear before the redirect lands so returning to the form starts clean.
            onSuccess: () => draft.clear(),
        });
    }

    function toggleIntent(value: string) {
        clearError('intent');
        form.setData(
            'intent',
            form.data.intent.includes(value)
                ? form.data.intent.filter((entry) => entry !== value)
                : [...form.data.intent, value],
        );
    }

    const locationGroups = Array.from(new Set(locationOptions.map((option) => option.group)));

    return (
        <section id="equipment-submission-form" className="border-b border-[#dad5cb] bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[900px] px-5 sm:px-10">
                <h2 className="font-heading text-3xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl">
                    {copy.title}
                </h2>
                <p className="mt-4 font-heading text-lg font-semibold uppercase tracking-[0.06em] text-[#a56437]">
                    {copy.subtitle}
                </p>
                <p className="mt-4 text-base leading-7 text-neutral-600">{copy.intro}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{copy.requiredNote}</p>

                <form onSubmit={submit} noValidate className="mt-10 grid gap-10">
                    {/* Contact ------------------------------------------------------------ */}
                    <fieldset className="grid gap-5">
                        <Legend>{copy.sections.contact}</Legend>

                        {isSeller ? (
                            <p className="border border-[#dad5cb] bg-[#f3f1ec] p-5 text-base leading-7 text-neutral-700">
                                Submitting as <strong className="font-semibold">{auth.user?.name}</strong> ({auth.user?.email}).
                                This listing will appear in your portal under My Listings.
                            </p>
                        ) : (
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

                                <Field label={copy.labels.company} required error={errorFor('company')}>
                                    <input
                                        ref={(element) => {
                                            fieldRefs.current.company = element;
                                        }}
                                        type="text"
                                        value={form.data.company}
                                        onChange={(event) => {
                                            clearError('company');
                                            form.setData('company', event.target.value);
                                        }}
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
                        )}
                    </fieldset>

                    {/* Equipment ---------------------------------------------------------- */}
                    <fieldset className="grid gap-5">
                        <Legend>{copy.sections.equipment}</Legend>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label={copy.labels.category} required error={errorFor('category')}>
                                <select
                                    ref={(element) => {
                                        fieldRefs.current.category = element;
                                    }}
                                    value={form.data.category}
                                    onChange={(event) => {
                                        clearError('category');
                                        form.setData('category', event.target.value);
                                    }}
                                    className={inputClass(errorFor('category'))}
                                >
                                    <option value="">Select a category</option>
                                    {categoryOptions.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label={copy.labels.quantity} required error={errorFor('quantity')}>
                                <input
                                    ref={(element) => {
                                        fieldRefs.current.quantity = element;
                                    }}
                                    type="number"
                                    min={1}
                                    step={1}
                                    value={form.data.quantity}
                                    onChange={(event) => {
                                        clearError('quantity');
                                        form.setData('quantity', event.target.value);
                                    }}
                                    className={inputClass(errorFor('quantity'))}
                                />
                            </Field>

                            <Field
                                label={copy.labels.description}
                                required
                                error={errorFor('description')}
                                className="sm:col-span-2"
                                hint={copy.hints.description as string}
                            >
                                <input
                                    ref={(element) => {
                                        fieldRefs.current.description = element;
                                    }}
                                    type="text"
                                    placeholder={copy.hints.descriptionPlaceholder as string}
                                    value={form.data.description}
                                    onChange={(event) => {
                                        clearError('description');
                                        form.setData('description', event.target.value);
                                    }}
                                    className={inputClass(errorFor('description'))}
                                />
                            </Field>

                            <Field label={copy.labels.location} required error={errorFor('location')}>
                                <select
                                    ref={(element) => {
                                        fieldRefs.current.location = element;
                                    }}
                                    value={form.data.location}
                                    onChange={(event) => {
                                        clearError('location');
                                        form.setData('location', event.target.value);
                                    }}
                                    className={inputClass(errorFor('location'))}
                                >
                                    <option value="">Select a location</option>
                                    {locationGroups.map((group) => (
                                        <optgroup key={group} label={group}>
                                            {locationOptions
                                                .filter((option) => option.group === group)
                                                .map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </Field>

                            <Field label={copy.labels.condition} required error={errorFor('condition')}>
                                <select
                                    ref={(element) => {
                                        fieldRefs.current.condition = element;
                                    }}
                                    value={form.data.condition}
                                    onChange={(event) => {
                                        clearError('condition');
                                        form.setData('condition', event.target.value);
                                    }}
                                    className={inputClass(errorFor('condition'))}
                                >
                                    <option value="">Select a condition</option>
                                    {Object.entries(conditionOptions).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                    </fieldset>

                    {/* Selling information ------------------------------------------------ */}
                    <fieldset className="grid gap-6">
                        <Legend>{copy.sections.selling}</Legend>

                        <RadioGroup
                            legend={copy.labels.isOwner}
                            required
                            options={ownershipOptions}
                            value={form.data.is_owner}
                            error={errorFor('is_owner')}
                            onChange={(value) => {
                                clearError('is_owner');
                                form.setData('is_owner', value);
                            }}
                            firstRef={(element) => {
                                fieldRefs.current.is_owner = element;
                            }}
                        />

                        <div className="grid gap-3">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                                {copy.labels.intent}
                            </span>
                            <span className="text-sm leading-6 text-neutral-500">{copy.hints.intent as string}</span>
                            <div className="grid gap-2">
                                {Object.entries(intentOptions).map(([value, label], index) => (
                                    <label key={value} className="flex items-start gap-3 text-base leading-7 text-neutral-700">
                                        <input
                                            ref={index === 0 ? (element) => {
                                                fieldRefs.current.intent = element;
                                            } : undefined}
                                            type="checkbox"
                                            checked={form.data.intent.includes(value)}
                                            onChange={() => toggleIntent(value)}
                                            className="mt-1.5 h-4 w-4 shrink-0 accent-[#a56437]"
                                        />
                                        {label}
                                    </label>
                                ))}
                            </div>
                            {errorFor('intent') && <span className="text-sm text-[#b3261e]">{errorFor('intent')}</span>}
                        </div>

                        <RadioGroup
                            legend={copy.labels.availability}
                            required
                            options={availabilityOptions}
                            value={form.data.availability}
                            error={errorFor('availability')}
                            onChange={(value) => {
                                clearError('availability');
                                form.setData('availability', value);
                            }}
                            firstRef={(element) => {
                                fieldRefs.current.availability = element;
                            }}
                        />

                        <Field label={copy.labels.estimatedValue} error={errorFor('estimated_value_range')}>
                            <select
                                value={form.data.estimated_value_range}
                                onChange={(event) => form.setData('estimated_value_range', event.target.value)}
                                className={inputClass(errorFor('estimated_value_range'))}
                            >
                                <option value="">Select a range</option>
                                {Object.entries(valueRangeOptions).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </Field>
                    </fieldset>

                    {/* Uploads ------------------------------------------------------------ */}
                    <fieldset className="grid gap-5">
                        <Legend>{copy.sections.photos}</Legend>
                        <p className="text-base leading-7 text-neutral-600">{copy.hints.photos as string}</p>
                        <HelpfulList intro={copy.hints.photosHelpful as string} items={copy.hints.photoItems as string[]} />
                        <PhotoPicker
                            files={form.data.photos}
                            error={errorFor('photos')}
                            onChange={(files) => form.setData('photos', files)}
                            label={copy.sections.photos}
                            hint={copy.hints.photos as string}
                        />
                        <GuidePrompt prompt={copy.hints.photoGuidePrompt as string} link={copy.guideLinks.photos} />
                    </fieldset>

                    <fieldset className="grid gap-5">
                        <Legend>{copy.sections.documents}</Legend>
                        <p className="text-base leading-7 text-neutral-600">{copy.hints.documents as string}</p>
                        <HelpfulList intro={copy.hints.documentsHelpful as string} items={copy.hints.documentItems as string[]} />
                        <DocumentPicker
                            files={form.data.documents}
                            error={errorFor('documents')}
                            onChange={(files) => form.setData('documents', files)}
                            label={copy.sections.documents}
                            hint={copy.hints.documents as string}
                        />
                        <GuidePrompt prompt={copy.hints.documentGuidePrompt as string} link={copy.guideLinks.documents} />
                    </fieldset>

                    {/* Additional information --------------------------------------------- */}
                    <fieldset className="grid gap-5">
                        <Legend>{copy.sections.additional}</Legend>
                        <HelpfulList intro="Examples:" items={copy.hints.additionalInfoExamples as string[]} />
                        <Field label={copy.labels.additionalInfo} error={errorFor('additional_info')}>
                            <textarea
                                rows={5}
                                value={form.data.additional_info}
                                onChange={(event) => form.setData('additional_info', event.target.value)}
                                className={inputClass(errorFor('additional_info'))}
                            />
                        </Field>
                    </fieldset>

                    {/* Consent ------------------------------------------------------------ */}
                    <fieldset className="grid gap-4">
                        <Legend>{copy.sections.confirmation}</Legend>

                        <Consent
                            label={copy.consent.accuracy}
                            checked={form.data.consent_accuracy}
                            error={errorFor('consent_accuracy')}
                            inputRef={(element) => {
                                fieldRefs.current.consent_accuracy = element;
                            }}
                            onChange={(checked) => {
                                clearError('consent_accuracy');
                                form.setData('consent_accuracy', checked);
                            }}
                        />

                        <Consent
                            label={copy.consent.contact}
                            checked={form.data.consent_contact}
                            error={errorFor('consent_contact')}
                            inputRef={(element) => {
                                fieldRefs.current.consent_contact = element;
                            }}
                            onChange={(checked) => {
                                clearError('consent_contact');
                                form.setData('consent_contact', checked);
                            }}
                        />
                    </fieldset>

                    <Honeypot value={form.data.website} onChange={(value) => form.setData('website', value)} />

                    <div className="grid gap-4 border-t border-[#dad5cb] pt-8">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="button-press inline-flex h-14 w-fit items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                        >
                            {form.processing ? 'Submitting…' : copy.submitLabel}
                        </button>
                        <p className="text-sm leading-6 text-neutral-500">{copy.supportingText}</p>
                    </div>
                </form>
            </div>
        </section>
    );
}

function HelpfulList({ intro, items }: { intro: string; items: string[] }) {
    return (
        <div className="grid gap-2">
            <span className="text-sm font-semibold text-neutral-700">{intro}</span>
            <ul className="grid gap-1">
                {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-neutral-600">
                        <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 bg-[#a56437]" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Guide links open in a new tab on purpose: the visitor keeps this form mounted, so the
 * files they already chose are still attached when they come back.
 */
function GuidePrompt({ prompt, link }: { prompt: string; link: { label: string; href: string } }) {
    return (
        <p className="text-sm leading-6 text-neutral-600">
            {prompt}{' '}
            <a
                href={link.href}
                target="_blank"
                rel="noopener"
                className="font-semibold text-[#a56437] underline underline-offset-4 transition-colors hover:text-neutral-950"
            >
                {link.label}
            </a>
        </p>
    );
}
