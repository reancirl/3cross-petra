import { useState } from 'react';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Equipment', href: '/equipment' },
    { label: 'Sell Equipment', href: '/sell-equipment' },
    { label: 'Request Equipment', href: '/request-equipment' },
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
];

function isActivePath(href: string) {
    if (typeof window === 'undefined') {
        return href === '/';
    }

    const currentPath = window.location.pathname;

    if (href === '/') {
        return currentPath === '/';
    }

    return currentPath.startsWith(href);
}

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="reveal-down sticky top-0 z-50 w-full border-b border-neutral-300 bg-[#f8f8f6]/95 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] backdrop-blur-sm">
            <nav
                aria-label="Primary navigation"
                className="mx-auto grid min-h-18 w-full max-w-[1200px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 sm:px-10 xl:px-0"
            >
                <a
                    href="/"
                    className="font-heading text-[1.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-950"
                    aria-label="Petra home"
                >
                    PETRA
                </a>

                <div className="hidden items-stretch justify-center gap-8 self-stretch lg:flex">
                    {navItems.map((item) => {
                        const active = isActivePath(item.href);

                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className="group relative flex items-center font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-600 transition-colors duration-200 hover:text-neutral-950 focus-copper"
                            >
                                <span>{item.label}</span>
                                <span
                                    className={`absolute bottom-4 left-0 h-0.5 w-full origin-left bg-[#9d5f35] transition-transform duration-300 ${
                                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}
                                    aria-hidden="true"
                                />
                            </a>
                        );
                    })}
                </div>

                <div className="flex items-center justify-end gap-3">
                    <a
                        href="/contact"
                        className="button-press focus-copper hidden h-10 items-center bg-[#9d5f35] px-6 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#874d29] md:flex"
                    >
                        Talk to a Broker
                    </a>

                    <button
                        type="button"
                        aria-expanded={menuOpen}
                        className="button-press focus-copper flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-800 transition-colors hover:border-[#9d5f35] hover:text-[#9d5f35] lg:hidden"
                        aria-label="Open menu"
                        onClick={() => setMenuOpen((isOpen) => !isOpen)}
                    >
                        <span
                            className={`block h-0.5 w-5 bg-current transition-transform before:block before:h-0.5 before:w-5 before:bg-current before:transition-transform before:content-[''] after:block after:h-0.5 after:w-5 after:bg-current after:transition-transform after:content-[''] ${
                                menuOpen
                                    ? 'rotate-45 before:translate-y-0 after:-translate-y-0.5 after:-rotate-90'
                                    : 'before:-translate-y-1.5 after:translate-y-1'
                            }`}
                        />
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="reveal-down w-full border-b border-neutral-300 bg-[#f8f8f6] px-5 py-4 shadow-sm sm:px-10 lg:hidden">
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const active = isActivePath(item.href);

                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`focus-copper border-l-2 px-3 py-2 font-heading text-base font-semibold uppercase tracking-[0.08em] transition-colors ${
                                        active
                                            ? 'border-[#9d5f35] text-neutral-950'
                                            : 'border-transparent text-neutral-600 hover:text-neutral-950'
                                    }`}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </div>

                    <a
                        href="/contact"
                        className="button-press focus-copper mt-3 flex h-10 items-center justify-center bg-[#9d5f35] px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#874d29] md:hidden"
                    >
                        Talk to a Broker
                    </a>
                </div>
            )}
        </header>
    );
}
