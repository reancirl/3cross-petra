import { Link, usePage } from '@inertiajs/react';
import type { PortalData, SharedPageProps } from '../types';

type PortalNavIconName =
    | 'dashboard'
    | 'equipment'
    | 'quotes'
    | 'offers'
    | 'documents'
    | 'messages'
    | 'notifications'
    | 'profile';

type PortalNavItem = {
    label: string;
    path: string;
    real: boolean;
    icon: PortalNavIconName;
};

type PortalNavGroup = {
    label: string;
    items: PortalNavItem[];
};

// Messages and notifications are deferred and intentionally absent from the seller portal.
const sellerNavGroups: PortalNavGroup[] = [
    {
        label: 'Main Menu',
        items: [
            { label: 'Dashboard', path: 'dashboard', real: true, icon: 'dashboard' },
            { label: 'My Listings', path: 'listings', real: true, icon: 'equipment' },
            { label: 'Quotes', path: 'quotes', real: false, icon: 'quotes' },
            { label: 'Offers', path: 'offers', real: false, icon: 'offers' },
        ],
    },
    {
        label: 'Other',
        items: [{ label: 'Documents', path: 'documents', real: false, icon: 'documents' }],
    },
    {
        label: 'Account',
        items: [{ label: 'Profile', path: 'profile', real: true, icon: 'profile' }],
    },
];

const buyerNavGroups: PortalNavGroup[] = [
    {
        label: 'Main Menu',
        items: [
            { label: 'Dashboard', path: 'dashboard', real: true, icon: 'dashboard' },
            { label: 'My Requests', path: 'saved-equipment', real: true, icon: 'equipment' },
            { label: 'Saved Equipment', path: 'saved-equipment-watchlist', real: false, icon: 'equipment' },
            { label: 'Quotes', path: 'quotes', real: false, icon: 'quotes' },
            { label: 'Offers', path: 'offers', real: false, icon: 'offers' },
        ],
    },
    {
        label: 'Other',
        items: [
            { label: 'Documents', path: 'documents', real: false, icon: 'documents' },
            { label: 'Messages', path: 'messages', real: false, icon: 'messages' },
            { label: 'Notifications', path: 'notifications', real: false, icon: 'notifications' },
        ],
    },
    {
        label: 'Account',
        items: [{ label: 'Profile', path: 'profile', real: true, icon: 'profile' }],
    },
];

type PortalSidebarProps = {
    portal: PortalData;
    collapsed: boolean;
    onToggleCollapsed: () => void;
    onLogout: () => void;
};

function hrefFor(portal: PortalData, path: string) {
    if (path === 'dashboard') {
        return `/${portal.userType}/dashboard`;
    }

    return `/${portal.userType}/${path}`;
}

export default function PortalSidebar({ portal, collapsed, onToggleCollapsed, onLogout }: PortalSidebarProps) {
    const page = usePage<SharedPageProps>();
    const { auth } = page.props;
    const currentPath = page.url.split('?')[0];
    const userName = auth.user?.name ?? portal.profileName;
    const userInitial = (userName ?? portal.roleLabel).charAt(0).toUpperCase();
    const navGroups = portal.userType === 'seller' ? sellerNavGroups : buyerNavGroups;

    return (
        <aside className="border-b border-[#dad5cb] bg-white text-neutral-900 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:self-start lg:border-b-0 lg:border-r">
            <div
                className={`flex items-center gap-3 border-b border-[#ece7dd] px-5 py-4 lg:min-h-[72px] lg:py-3 ${
                    collapsed ? 'lg:flex-col lg:justify-center lg:gap-2 lg:px-2' : 'justify-between lg:px-5'
                }`}
            >
                <Link href={`/${portal.userType}/dashboard`} className="focus-copper flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a56437] font-heading text-xl font-bold uppercase leading-none text-white">
                        P
                    </span>
                    <span className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
                        <span className="block truncate font-heading text-xl font-semibold uppercase leading-none tracking-[0.18em] text-neutral-950">
                            Petra
                        </span>
                        <span className="mt-1 block truncate font-heading text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                            {portal.roleLabel} Portal
                        </span>
                    </span>
                </Link>

                <button
                    type="button"
                    onClick={onToggleCollapsed}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    className="focus-copper hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#dad5cb] text-neutral-500 transition-colors hover:bg-[#f3f1ec] hover:text-neutral-900 lg:flex"
                >
                    <SidebarToggleIcon collapsed={collapsed} />
                </button>
            </div>

            <nav
                aria-label={`${portal.roleLabel} portal navigation`}
                className="overflow-x-auto lg:flex-1 lg:overflow-x-visible lg:overflow-y-auto"
            >
                <div className="flex min-w-max gap-1 p-3 lg:min-w-0 lg:flex-col lg:gap-0 lg:p-3">
                    {navGroups.map((group, groupIndex) => (
                        <div key={group.label} className="flex gap-1 lg:flex-col lg:gap-1">
                            {collapsed
                                ? groupIndex > 0 && (
                                      <span aria-hidden="true" className="hidden lg:mx-2 lg:my-2 lg:block lg:h-px lg:bg-[#ece7dd]" />
                                  )
                                : (
                                    <span
                                        className={`hidden px-3 pb-1 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-neutral-400 lg:block ${
                                            groupIndex === 0 ? 'pt-1' : 'pt-4'
                                        }`}
                                    >
                                        {group.label}
                                    </span>
                                )}

                            {group.items.map((item) => {
                                const href = hrefFor(portal, item.path);
                                const active = currentPath === href;

                                return (
                                    <Link
                                        key={item.path}
                                        href={href}
                                        aria-current={active ? 'page' : undefined}
                                        title={collapsed ? item.label : undefined}
                                        className={`group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 font-heading text-[0.9rem] font-semibold uppercase tracking-[0.06em] transition-colors ${
                                            collapsed ? 'lg:justify-center lg:px-0' : 'justify-between'
                                        } ${
                                            active
                                                ? 'bg-[#f4ece4] text-[#8a5330]'
                                                : 'text-neutral-600 hover:bg-[#f3f1ec] hover:text-neutral-900'
                                        }`}
                                    >
                                        <span className="flex min-w-0 items-center gap-3">
                                            <span className={active ? 'text-[#a56437]' : 'text-neutral-400 group-hover:text-neutral-600'}>
                                                <PortalNavIcon name={item.icon} />
                                            </span>
                                            <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                                        </span>
                                        {!item.real && (
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${
                                                    active ? 'bg-[#a56437]/15 text-[#8a5330]' : 'bg-neutral-100 text-neutral-400'
                                                } ${collapsed ? 'lg:hidden' : ''}`}
                                            >
                                                Soon
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </nav>

            <div className={`hidden border-t border-[#ece7dd] lg:block ${collapsed ? 'lg:p-2' : 'lg:p-4'}`}>
                <div
                    className={`flex items-center rounded-xl border border-[#dad5cb] bg-[#f9f7f3] ${
                        collapsed ? 'lg:justify-center lg:p-2' : 'gap-3 p-3'
                    }`}
                >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a56437] font-heading text-lg font-semibold uppercase text-white">
                        {userInitial}
                    </span>
                    {!collapsed && (
                        <>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold text-neutral-900">{userName}</span>
                                <span className="mt-0.5 block font-heading text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                                    {portal.roleLabel}
                                </span>
                            </span>
                            <button
                                type="button"
                                onClick={onLogout}
                                aria-label="Log out"
                                title="Log out"
                                className="focus-copper flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-neutral-400 transition-colors hover:border-[#dad5cb] hover:bg-white hover:text-[#a56437]"
                            >
                                <LogoutIcon />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
}

function SidebarToggleIcon({ collapsed }: { collapsed: boolean }) {
    return (
        <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            {collapsed ? <path d="M9 6l6 6-6 6" /> : <path d="M15 6l-6 6 6 6" />}
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M15 12H4" />
            <path d="M8 8l-4 4 4 4" />
            <path d="M12 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
        </svg>
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
