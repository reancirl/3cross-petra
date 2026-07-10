import { Link, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import type { PortalData, SharedPageProps } from '../types';

const navItems = [
    { label: 'Dashboard', path: 'dashboard', real: true },
    { label: 'Saved Equipment', path: 'saved-equipment', real: false },
    { label: 'Quotes', path: 'quotes', real: false },
    { label: 'Offers', path: 'offers', real: false },
    { label: 'Documents', path: 'documents', real: false },
    { label: 'Messages', path: 'messages', real: false },
    { label: 'Notifications', path: 'notifications', real: false },
    { label: 'Profile', path: 'profile', real: true },
];

type PortalShellProps = {
    portal: PortalData;
    title: string;
    eyebrow?: string;
    children: ReactNode;
};

function hrefFor(portal: PortalData, path: string) {
    if (path === 'dashboard') {
        return `/${portal.userType}/dashboard`;
    }

    return `/${portal.userType}/${path}`;
}

function isActive(href: string) {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.location.pathname === href;
}

export default function PortalShell({ portal, title, eyebrow, children }: PortalShellProps) {
    const { auth } = usePage<SharedPageProps>().props;

    function logout() {
        router.post('/logout');
    }

    return (
        <main className="min-h-screen bg-[#f3f1ec]">
            <section className="border-b border-[#dad5cb] bg-white">
                <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-10 sm:px-10 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                            {eyebrow ?? `${portal.roleLabel} Portal`}
                        </span>
                        <h1 className="mt-4 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
                            Signed in as {auth.user?.name ?? portal.profileName} · {portal.roleLabel}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={logout}
                        className="button-press focus-copper inline-flex h-12 items-center justify-center border border-neutral-500 px-7 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                    >
                        Log out
                    </button>
                </div>
            </section>

            <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-5 py-8 sm:px-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:py-10">
                <aside className="border border-[#dad5cb] bg-white">
                    <nav aria-label={`${portal.roleLabel} portal navigation`} className="grid gap-px bg-[#dad5cb]">
                        {navItems.map((item) => {
                            const href = hrefFor(portal, item.path);
                            const active = isActive(href);

                            return (
                                <Link
                                    key={item.path}
                                    href={href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`flex items-center justify-between bg-white px-5 py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] transition-colors ${
                                        active
                                            ? 'text-[#a56437]'
                                            : 'text-neutral-700 hover:text-neutral-950'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    {!item.real && (
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                                            Soon
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <div>{children}</div>
            </section>
        </main>
    );
}
