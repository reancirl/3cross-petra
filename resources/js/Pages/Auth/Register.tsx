import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { ReactNode } from 'react';

type RegisterForm = {
    name: string;
    email: string;
    phone: string;
    company_name: string;
    user_type: 'seller' | 'buyer';
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors } = useForm<RegisterForm>({
        name: '',
        email: '',
        phone: '',
        company_name: '',
        user_type: 'buyer',
        password: '',
        password_confirmation: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/register');
    }

    return (
        <>
            <Head title="Register" />

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto max-w-[900px] px-5 py-20 sm:px-10 lg:py-24">
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                            Customer Portal
                        </span>
                        <h1 className="mt-5 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                            Register
                        </h1>
                        <p className="mt-5 text-base leading-7 text-neutral-600">
                            Create one Petra account and choose whether your primary portal context is seller or buyer. This can be extended later if the client wants fully separate account types.
                        </p>

                        <form onSubmit={submit} className="mt-10 grid gap-5 border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:grid-cols-2 sm:p-8">
                            <Field label="Name" error={errors.name}>
                                <input value={data.name} onChange={(event) => setData('name', event.target.value)} className="portal-input" autoComplete="name" required />
                            </Field>

                            <Field label="Email" error={errors.email}>
                                <input type="email" value={data.email} onChange={(event) => setData('email', event.target.value)} className="portal-input" autoComplete="email" required />
                            </Field>

                            <Field label="Phone" error={errors.phone}>
                                <input value={data.phone} onChange={(event) => setData('phone', event.target.value)} className="portal-input" autoComplete="tel" />
                            </Field>

                            <Field label="Company" error={errors.company_name}>
                                <input value={data.company_name} onChange={(event) => setData('company_name', event.target.value)} className="portal-input" autoComplete="organization" />
                            </Field>

                            <Field label="Portal type" error={errors.user_type}>
                                <select value={data.user_type} onChange={(event) => setData('user_type', event.target.value as RegisterForm['user_type'])} className="portal-input">
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </Field>

                            <div />

                            <Field label="Password" error={errors.password}>
                                <input type="password" value={data.password} onChange={(event) => setData('password', event.target.value)} className="portal-input" autoComplete="new-password" required />
                            </Field>

                            <Field label="Confirm password" error={errors.password_confirmation}>
                                <input type="password" value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)} className="portal-input" autoComplete="new-password" required />
                            </Field>

                            <div className="sm:col-span-2">
                                <button type="submit" disabled={processing} className="button-press focus-copper inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60">
                                    {processing ? 'Creating account' : 'Create account'}
                                </button>
                                <p className="mt-5 text-base leading-7 text-neutral-600">
                                    Already have access?{' '}
                                    <Link href="/login" className="font-heading font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                        Login
                                    </Link>
                                </p>
                            </div>
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
