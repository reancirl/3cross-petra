import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { ReactNode } from 'react';

type ResetPasswordProps = {
    email: string;
    token: string;
};

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ email, token }: ResetPasswordProps) {
    const { data, setData, post, processing, errors } = useForm<ResetPasswordForm>({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/reset-password');
    }

    return (
        <>
            <Head title="Set New Password" />

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto max-w-[760px] px-5 py-20 sm:px-10 lg:py-24">
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                            Account Access
                        </span>
                        <h1 className="mt-5 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                            New Password
                        </h1>

                        <form onSubmit={submit} className="mt-8 grid gap-5 border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8">
                            <input type="hidden" value={data.token} />

                            <Field label="Email" error={errors.email}>
                                <input type="email" value={data.email} onChange={(event) => setData('email', event.target.value)} className="portal-input" autoComplete="email" required />
                            </Field>

                            <Field label="Password" error={errors.password}>
                                <input type="password" value={data.password} onChange={(event) => setData('password', event.target.value)} className="portal-input" autoComplete="new-password" required />
                            </Field>

                            <Field label="Confirm password" error={errors.password_confirmation}>
                                <input type="password" value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)} className="portal-input" autoComplete="new-password" required />
                            </Field>

                            <button type="submit" disabled={processing} className="button-press focus-copper inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60">
                                {processing ? 'Saving' : 'Save password'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
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
