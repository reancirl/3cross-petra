import { Head, useForm, usePage } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';
import PortalShell from '../../Components/portal-shell';
import type { PortalData, SharedPageProps } from '../../types';

type ProfileProps = {
    portal: PortalData;
};

type ProfileForm = {
    name: string;
    email: string;
    phone: string;
    company_name: string;
};

type PasswordForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

export default function Profile({ portal }: ProfileProps) {
    const { auth, status } = usePage<SharedPageProps>().props;
    const user = auth.user;

    const profileForm = useForm<ProfileForm>({
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
        company_name: user?.company_name ?? '',
    });

    const passwordForm = useForm<PasswordForm>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function updateProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        profileForm.patch(`/${portal.userType}/profile`, { preserveScroll: true });
    }

    function updatePassword(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        passwordForm.put(`/${portal.userType}/profile/password`, {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    }

    return (
        <>
            <Head title="Profile" />

            <PortalShell portal={portal} title="Profile">
                <div className="grid gap-6">
                    {status && (
                        <div className="border border-[#a56437] bg-white p-4 text-base leading-7 text-neutral-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={updateProfile} className="grid gap-5 border border-[#dad5cb] bg-white p-7 sm:grid-cols-2 sm:p-8">
                        <div className="sm:col-span-2">
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Account
                            </span>
                            <h2 className="mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                Contact Details
                            </h2>
                        </div>

                        <Field label="Name" error={profileForm.errors.name}>
                            <input value={profileForm.data.name} onChange={(event) => profileForm.setData('name', event.target.value)} className="portal-input" autoComplete="name" required />
                        </Field>

                        <Field label="Email" error={profileForm.errors.email}>
                            <input type="email" value={profileForm.data.email} onChange={(event) => profileForm.setData('email', event.target.value)} className="portal-input" autoComplete="email" required />
                        </Field>

                        <Field label="Phone" error={profileForm.errors.phone}>
                            <input value={profileForm.data.phone} onChange={(event) => profileForm.setData('phone', event.target.value)} className="portal-input" autoComplete="tel" />
                        </Field>

                        <Field label="Company" error={profileForm.errors.company_name}>
                            <input value={profileForm.data.company_name} onChange={(event) => profileForm.setData('company_name', event.target.value)} className="portal-input" autoComplete="organization" />
                        </Field>

                        <Field label="Role">
                            <input value={user?.user_type_label ?? portal.roleLabel} className="portal-input bg-[#f3f1ec] text-neutral-600" readOnly />
                        </Field>

                        <div className="self-end">
                            <button type="submit" disabled={profileForm.processing} className="button-press focus-copper inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60">
                                {profileForm.processing ? 'Saving' : 'Save profile'}
                            </button>
                        </div>
                    </form>

                    <form onSubmit={updatePassword} className="grid gap-5 border border-[#dad5cb] bg-white p-7 sm:p-8">
                        <div>
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Security
                            </span>
                            <h2 className="mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                Change Password
                            </h2>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-3">
                            <Field label="Current password" error={passwordForm.errors.current_password}>
                                <input type="password" value={passwordForm.data.current_password} onChange={(event) => passwordForm.setData('current_password', event.target.value)} className="portal-input" autoComplete="current-password" required />
                            </Field>

                            <Field label="New password" error={passwordForm.errors.password}>
                                <input type="password" value={passwordForm.data.password} onChange={(event) => passwordForm.setData('password', event.target.value)} className="portal-input" autoComplete="new-password" required />
                            </Field>

                            <Field label="Confirm password" error={passwordForm.errors.password_confirmation}>
                                <input type="password" value={passwordForm.data.password_confirmation} onChange={(event) => passwordForm.setData('password_confirmation', event.target.value)} className="portal-input" autoComplete="new-password" required />
                            </Field>
                        </div>

                        <button type="submit" disabled={passwordForm.processing} className="button-press focus-copper inline-flex h-12 w-fit items-center justify-center border border-neutral-500 px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white disabled:opacity-60">
                            {passwordForm.processing ? 'Updating' : 'Update password'}
                        </button>
                    </form>
                </div>
            </PortalShell>
        </>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <label className="grid gap-2">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">{label}</span>
            {children}
            {error && <span className="text-sm text-red-700">{error}</span>}
        </label>
    );
}
