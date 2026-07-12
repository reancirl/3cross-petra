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
        post('/login', { replace: true });
    }

    return (
        <>
            <Head title="Customer Login" />

            <main className="flex min-h-[100svh] items-center justify-center bg-[#f3f1ec] px-3 py-3 text-neutral-950 sm:px-8 sm:py-8 lg:px-10">
                <section className="grid w-full max-w-[460px] overflow-hidden border border-[#dad5cb] bg-white shadow-[0_24px_80px_rgba(15,15,15,0.06)] lg:min-h-[560px] lg:max-w-[1120px] lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)]">
                    <div className="flex flex-col justify-between gap-5 border-b border-[#dad5cb] bg-[#fbfaf7] p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-12">
                        <div>
                            <Link href="/" className="focus-copper inline-block font-heading text-[1.4rem] font-semibold uppercase tracking-[0.22em] text-neutral-950 sm:text-[1.8rem]">
                                Petra
                            </Link>

                            <div className="mt-5 max-w-[560px] sm:mt-8 lg:mt-20">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                    Customer Portal
                                </span>
                                <h1 className="mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-[0.08em] text-neutral-950 sm:mt-3 sm:text-5xl lg:mt-5 lg:text-7xl">
                                    Login
                                </h1>
                                <p className="mt-6 hidden text-base font-medium leading-7 text-neutral-600 lg:block lg:text-lg">
                                    Access seller and buyer workspace tools for saved equipment, quotes, offers, documents, and account details.
                                </p>
                            </div>
                        </div>

                        <div className="hidden gap-3 text-sm leading-6 text-neutral-600 lg:grid lg:grid-cols-2">
                            <div className="border border-[#dad5cb] bg-white p-4">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-950">
                                    Sellers
                                </span>
                                <p className="mt-2">Manage activity, saved equipment, profile details, and future deal workflows.</p>
                            </div>
                            <div className="border border-[#dad5cb] bg-white p-4">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-950">
                                    Buyers
                                </span>
                                <p className="mt-2">Track watched equipment, account details, and portal updates as features come online.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center bg-white p-5 sm:p-8 lg:p-12">
                        <form onSubmit={submit} className="grid w-full gap-3.5 sm:gap-5">
                            <div className="hidden sm:mb-2 sm:block">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-[#a56437]">
                                    Secure Access
                                </span>
                                <h2 className="font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:mt-3 sm:text-3xl">
                                    Sign in
                                </h2>
                            </div>

                            <label className="grid gap-2">
                                <span className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
                                    Email
                                </span>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    className="portal-input bg-[#fbfaf7]"
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
                                    className="portal-input bg-[#fbfaf7]"
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
                                className="button-press focus-copper mt-1 inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:mt-2 sm:h-14 sm:px-10"
                            >
                                {processing ? 'Signing in' : 'Sign in'}
                            </button>

                            <p className="mt-1 border-t border-[#dad5cb] pt-4 text-base leading-7 text-neutral-600 sm:mt-2 sm:pt-5">
                                Need portal access?{' '}
                                <Link href="/register" className="font-heading font-semibold uppercase tracking-[0.08em] text-neutral-950">
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}
