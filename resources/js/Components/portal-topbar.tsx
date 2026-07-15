import { Link, usePage } from '@inertiajs/react';
import type { PortalData, SharedPageProps } from '../types';

type PortalTopbarProps = {
    portal: PortalData;
    title: string;
    subtitle?: string;
    onLogout: () => void;
};

export default function PortalTopbar({ portal, title, subtitle, onLogout }: PortalTopbarProps) {
    const { auth } = usePage<SharedPageProps>().props;
    const userName = auth.user?.name ?? portal.profileName ?? portal.roleLabel;
    const userInitial = userName.charAt(0).toUpperCase();
    const profileHref = `/${portal.userType}/profile`;

    return (
        <header className="sticky top-0 z-30 border-b border-[#dad5cb] bg-white/95 backdrop-blur-sm">
            <div className="flex min-h-[72px] items-center justify-between gap-4 px-5 py-3 sm:px-7 lg:px-8">
                <div className="min-w-0">
                    <h1 className="truncate font-heading text-2xl font-bold uppercase leading-none tracking-[0.08em] text-neutral-950 sm:text-[1.75rem]">
                        {title}
                    </h1>
                    {subtitle && <p className="mt-1 truncate text-sm text-neutral-500">{subtitle}</p>}
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden">
                    <Link
                        href={profileHref}
                        className="focus-copper button-press group flex items-center gap-2.5 rounded-full border border-[#dad5cb] bg-white py-1 pl-1 pr-2 transition-colors hover:border-[#a56437] sm:pr-3"
                    >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#a56437] font-heading text-sm font-semibold uppercase text-white">
                            {userInitial}
                        </span>
                        <span className="hidden min-w-0 sm:block">
                            <span className="block max-w-[10rem] truncate text-sm font-semibold text-neutral-900">{userName}</span>
                            <span className="block font-heading text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                                {portal.roleLabel}
                            </span>
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={onLogout}
                        className="button-press focus-copper inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white sm:px-6"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </header>
    );
}
