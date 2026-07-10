import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { SharedPageProps } from '../../types';

type ForgotPasswordForm = {
    email: string;
};

export default function ForgotPassword() {
    const { status } = usePage<SharedPageProps>().props;
    const { data, setData, post, processing, errors } = useForm<ForgotPasswordForm>({
        email: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/forgot-password');
    }

    return (
        <>
            <Head title="Forgot Password" />

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto max-w-[760px] px-5 py-20 sm:px-10 lg:py-24">
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                            Account Access
                        </span>
                        <h1 className="mt-5 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                            Reset Password
                        </h1>
                        <p className="mt-5 text-base leading-7 text-neutral-600">
                            Enter your email and Petra will send a password reset link if the account exists.
                        </p>

                        {status && (
                            <div className="mt-8 border border-[#a56437] bg-[#f3f1ec] p-4 text-base leading-7 text-neutral-700">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="mt-8 grid gap-5 border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8">
                            <label className="grid gap-2">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                                    Email
                                </span>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    className="portal-input"
                                    autoComplete="email"
                                    required
                                />
                                {errors.email && <span className="text-sm text-red-700">{errors.email}</span>}
                            </label>

                            <div className="flex flex-wrap items-center gap-4">
                                <button type="submit" disabled={processing} className="button-press focus-copper inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60">
                                    {processing ? 'Sending' : 'Send reset link'}
                                </button>
                                <Link href="/login" className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-700 hover:text-neutral-950">
                                    Back to login
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}
