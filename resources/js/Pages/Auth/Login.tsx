import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function Login() {
    const { data, setData, post, processing, errors } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/login');
    }

    return (
        <>
            <Head title="Customer Login" />

            <main className="w-full bg-[#f3f1ec]">
                <section className="border-b border-[#dad5cb] bg-white">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.7fr)] lg:py-24">
                        <div>
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                Customer Portal
                            </span>
                            <h1 className="mt-5 max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]">
                                Login
                            </h1>
                            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                                Access seller and buyer workspace tools for saved equipment, quotes, offers, documents, and account details.
                            </p>
                        </div>

                        <form onSubmit={submit} className="border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8">
                            <div className="grid gap-5">
                                <label className="grid gap-2">
                                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                                        Email
                                    </span>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(event) => setData('email', event.target.value)}
                                        className="h-12 border border-[#dad5cb] bg-white px-4 text-base text-neutral-950 outline-none focus:border-[#a56437]"
                                        autoComplete="email"
                                        required
                                    />
                                    {errors.email && <span className="text-sm text-red-700">{errors.email}</span>}
                                </label>

                                <label className="grid gap-2">
                                    <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                                        Password
                                    </span>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(event) => setData('password', event.target.value)}
                                        className="h-12 border border-[#dad5cb] bg-white px-4 text-base text-neutral-950 outline-none focus:border-[#a56437]"
                                        autoComplete="current-password"
                                        required
                                    />
                                    {errors.password && <span className="text-sm text-red-700">{errors.password}</span>}
                                </label>

                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <label className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(event) => setData('remember', event.target.checked)}
                                            className="h-4 w-4 accent-[#a56437]"
                                        />
                                        Remember me
                                    </label>

                                    <Link href="/forgot-password" className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]">
                                        Forgot password
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="button-press focus-copper mt-2 inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                                >
                                    {processing ? 'Signing in' : 'Sign in'}
                                </button>

                                <p className="border-t border-[#dad5cb] pt-5 text-base leading-7 text-neutral-600">
                                    Need portal access?{' '}
                                    <Link href="/register" className="font-heading font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                        Register
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
