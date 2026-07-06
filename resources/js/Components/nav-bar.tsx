import { useState } from 'react';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Auctions', href: '/auctions' },
    { label: 'Sell Equipment', href: '/sell-equipment' },
    { label: 'Appraisals', href: '/appraisals' },
    { label: 'Financing', href: '/financing' },
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
        <header className="w-full">
            <nav
                aria-label="Primary navigation"
                className="flex min-h-18 w-full items-center justify-between border-b border-neutral-300 bg-[#f8f8f6] px-5 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] sm:px-10"
            >
                <a
                    href="/"
                    className="font-mono text-[1.6rem] font-semibold tracking-[0.22em] text-neutral-950"
                    aria-label="Petra home"
                >
                    PETRA
                </a>

                <div className="hidden items-stretch gap-8 self-stretch lg:flex">
                    {navItems.map((item) => {
                        const active = isActivePath(item.href);

                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className="relative flex items-center font-mono text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600 transition-colors hover:text-neutral-950"
                            >
                                <span>{item.label}</span>
                                {active && (
                                    <span className="absolute bottom-4 left-0 h-0.5 w-full bg-[#9d5f35]" aria-hidden="true" />
                                )}
                            </a>
                        );
                    })}
                </div>

                <a
                    href="/contact"
                    className="hidden h-10 items-center bg-[#9d5f35] px-6 font-mono text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#874d29] md:flex"
                >
                    Talk to a Broker
                </a>

                <button
                    type="button"
                    aria-expanded={menuOpen}
                    className="flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-800 lg:hidden"
                    aria-label="Open menu"
                    onClick={() => setMenuOpen((isOpen) => !isOpen)}
                >
                    <span className="block h-0.5 w-5 bg-current before:block before:h-0.5 before:w-5 before:-translate-y-1.5 before:bg-current before:content-[''] after:block after:h-0.5 after:w-5 after:translate-y-1 after:bg-current after:content-['']" />
                </button>
            </nav>

            {menuOpen && (
                <div className="w-full border-b border-neutral-300 bg-[#f8f8f6] px-5 py-4 shadow-sm sm:px-10 lg:hidden">
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const active = isActivePath(item.href);

                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`border-l-2 px-3 py-2 font-mono text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
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
                        className="mt-3 flex h-10 items-center justify-center bg-[#9d5f35] px-5 font-mono text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#874d29] md:hidden"
                    >
                        Talk to a Broker
                    </a>
                </div>
            )}
        </header>
    );
}
