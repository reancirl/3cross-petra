import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import ConfirmDialog from './confirm-dialog';
import type { PortalData, SharedPageProps } from '../types';

const sellerNavItems = [
    { label: 'Dashboard', path: 'dashboard', real: true, icon: 'dashboard' },
    { label: 'My Listings', path: 'saved-equipment', real: true, icon: 'equipment' },
    { label: 'Quotes', path: 'quotes', real: false, icon: 'quotes' },
    { label: 'Offers', path: 'offers', real: false, icon: 'offers' },
    { label: 'Documents', path: 'documents', real: false, icon: 'documents' },
    { label: 'Messages', path: 'messages', real: false, icon: 'messages' },
    { label: 'Notifications', path: 'notifications', real: false, icon: 'notifications' },
    { label: 'Profile', path: 'profile', real: true, icon: 'profile' },
];

const buyerNavItems = [
    { label: 'Dashboard', path: 'dashboard', real: true, icon: 'dashboard' },
    { label: 'My Requests', path: 'saved-equipment', real: true, icon: 'equipment' },
    { label: 'Saved Equipment', path: 'saved-equipment-watchlist', real: false, icon: 'equipment' },
    { label: 'Quotes', path: 'quotes', real: false, icon: 'quotes' },
    { label: 'Offers', path: 'offers', real: false, icon: 'offers' },
    { label: 'Documents', path: 'documents', real: false, icon: 'documents' },
    { label: 'Messages', path: 'messages', real: false, icon: 'messages' },
    { label: 'Notifications', path: 'notifications', real: false, icon: 'notifications' },
    { label: 'Profile', path: 'profile', real: true, icon: 'profile' },
];

type PortalNavItem = (typeof sellerNavItems | typeof buyerNavItems)[number];
type PortalNavIconName = PortalNavItem['icon'];

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

export default function PortalShell({ portal, title, eyebrow, children }: PortalShellProps) {
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const page = usePage<SharedPageProps>();
    const { auth } = page.props;
    const currentPath = page.url.split('?')[0];
    const userName = auth.user?.name ?? portal.profileName;
    const userInitial = (userName ?? portal.roleLabel).charAt(0).toUpperCase();
    const navItems = portal.userType === 'seller' ? sellerNavItems : buyerNavItems;

    function logout() {
        setLogoutDialogOpen(false);
        router.post('/logout', {}, { replace: true });
    }

    return (
        <main className="min-h-screen bg-[#f3f1ec] text-neutral-950 lg:grid lg:grid-cols-[296px_minmax(0,1fr)]">
            <aside className="border-b border-neutral-800 bg-neutral-950 text-white lg:flex lg:min-h-screen lg:flex-col lg:border-b-0">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 lg:flex lg:min-h-[72px] lg:flex-col lg:items-start lg:justify-center lg:px-5 lg:py-2">
                    <Link href={`/${portal.userType}/dashboard`} className="focus-copper block w-fit">
                        <span className="block font-heading text-[1.65rem] font-semibold uppercase tracking-[0.22em] text-white">
                            Petra
                        </span>
                    </Link>

                    <span className="border border-white/15 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white/70 lg:hidden">
                        {portal.roleLabel}
                    </span>
                </div>

                <nav aria-label={`${portal.roleLabel} portal navigation`} className="overflow-x-auto lg:overflow-visible">
                    <div className="flex min-w-max lg:grid lg:min-w-0 lg:p-3">
                        {navItems.map((item) => {
                            const href = hrefFor(portal, item.path);
                            const active = currentPath === href;

                            return (
                                <Link
                                    key={item.path}
                                    href={href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`flex min-h-14 items-center justify-between gap-4 border-r border-white/10 px-5 py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] transition-colors last:border-r-0 lg:mb-1 lg:border-r-0 lg:px-4 ${
                                        active
                                            ? 'bg-white text-neutral-950 lg:shadow-[inset_4px_0_0_#a56437]'
                                            : 'bg-neutral-950 text-white/65 hover:bg-white/[0.06] hover:text-white'
                                    }`}
                                >
                                    <span className="flex min-w-0 items-center gap-3">
                                        <PortalNavIcon name={item.icon} />
                                        <span className="truncate">{item.label}</span>
                                    </span>
                                    {!item.real && (
                                        <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${active ? 'text-neutral-500' : 'text-white/35'} lg:block`}>
                                            Soon
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className="hidden border-t border-white/10 p-5 lg:mt-auto lg:block">
                    <div className="flex items-center gap-3 border border-white/10 bg-white/[0.04] p-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#a56437] font-heading text-lg font-semibold uppercase text-white">
                            {userInitial}
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-white">
                                {userName}
                            </span>
                            <span className="mt-0.5 block font-heading text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                                {portal.roleLabel}
                            </span>
                        </span>
                    </div>
                </div>
            </aside>

            <section className="min-w-0">
                <header className="border-b border-[#dad5cb] bg-white">
                    <div className="flex min-h-[72px] flex-col gap-3 px-5 py-3 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                        <div className="min-w-0">
                            <h1 className="break-words font-heading text-3xl font-bold uppercase leading-none tracking-[0.08em] text-neutral-950 sm:text-[2rem]">
                                {title}
                            </h1>
                        </div>

                        <button
                            type="button"
                            onClick={() => setLogoutDialogOpen(true)}
                            className="button-press focus-copper inline-flex h-10 w-fit items-center justify-center border border-neutral-500 px-6 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                        >
                            Log out
                        </button>
                    </div>
                </header>

                <div className="px-5 py-6 sm:px-8 lg:px-10 lg:py-8">{children}</div>
            </section>

            <ConfirmDialog
                open={logoutDialogOpen}
                title="Log out?"
                description="You will be signed out of your Petra portal session and returned to the login page."
                confirmLabel="Log out"
                onCancel={() => setLogoutDialogOpen(false)}
                onConfirm={logout}
            />
        </main>
    );
}

function PortalNavIcon({ name }: { name: PortalNavIconName }) {
    const common = {
        className: 'h-4 w-4 shrink-0',
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        strokeWidth: 1.8,
        viewBox: '0 0 24 24',
        'aria-hidden': true,
    };

    switch (name) {
        case 'dashboard':
            return (
                <svg {...common}>
                    <path d="M4 13h6V4H4z" />
                    <path d="M14 20h6v-9h-6z" />
                    <path d="M4 20h6v-4H4z" />
                    <path d="M14 7h6V4h-6z" />
                </svg>
            );
        case 'equipment':
            return (
                <svg {...common}>
                    <path d="M4 16h16" />
                    <path d="M6 16l2-6h8l2 6" />
                    <path d="M8 18.5h.01" />
                    <path d="M16 18.5h.01" />
                    <path d="M9 10V7h6v3" />
                </svg>
            );
        case 'quotes':
            return (
                <svg {...common}>
                    <path d="M7 7h10" />
                    <path d="M7 12h8" />
                    <path d="M7 17h5" />
                    <path d="M5 3h14v18H5z" />
                </svg>
            );
        case 'offers':
            return (
                <svg {...common}>
                    <path d="M20 12l-8 8-8-8 8-8z" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                </svg>
            );
        case 'documents':
            return (
                <svg {...common}>
                    <path d="M7 3h7l4 4v14H7z" />
                    <path d="M14 3v5h5" />
                    <path d="M10 13h6" />
                    <path d="M10 17h4" />
                </svg>
            );
        case 'messages':
            return (
                <svg {...common}>
                    <path d="M4 5h16v11H8l-4 4z" />
                    <path d="M8 9h8" />
                    <path d="M8 13h5" />
                </svg>
            );
        case 'notifications':
            return (
                <svg {...common}>
                    <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                    <path d="M10 21h4" />
                </svg>
            );
        case 'profile':
            return (
                <svg {...common}>
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
            );
    }
}
