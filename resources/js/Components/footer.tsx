function AccentIcon({ type }: { type: 'globe' | 'mail' | 'call' }) {
    const paths = {
        globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-8-9h16M12 3c2.3 2.4 3.4 5.4 3.4 9S14.3 18.6 12 21c-2.3-2.4-3.4-5.4-3.4-9S9.7 5.4 12 3Z',
        mail: 'M4 6h16v12H4V6Zm0 1.5 8 5.5 8-5.5',
        call: 'M6.7 4.5 9 4l2 4-1.7 1.2c.9 1.8 2.3 3.2 4.1 4.1L14.7 12l4 2-.5 2.3c-.2 1-1.1 1.7-2.1 1.7C9.4 18 6 14.6 6 7.9c0-1 .7-1.9 1.7-2.1Z',
    };

    return (
        <svg className="h-12 w-12 text-[#a56437]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d={paths[type]} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="reveal-up w-full border-t border-[#dad5cb] bg-white">
            <div className="stagger-children mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-5 py-20 sm:px-10 md:grid-cols-4 lg:py-24">
                <div className="flex flex-col gap-8">
                    <div>
                        <div className="font-heading text-3xl font-semibold uppercase tracking-[0.2em] text-neutral-950">
                            PETRA
                        </div>
                        <div className="mt-3 h-0.5 w-16 bg-[#a56437]" />
                    </div>
                    <p className="leading-7 text-neutral-600">
                        Used oilfield and industrial equipment brokerage serving Wyoming, the Rockies, and surrounding
                        producing regions.
                    </p>
                </div>

                <div>
                    <h3 className="mb-6 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950">
                        Navigation
                    </h3>
                    <nav className="flex flex-col gap-4 text-neutral-600">
                        <a className="focus-copper transition-colors hover:text-[#a56437]" href="/equipment">
                            Browse Equipment
                        </a>
                        <a className="focus-copper transition-colors hover:text-[#a56437]" href="/sell-equipment">
                            Sell Equipment
                        </a>
                        <a className="focus-copper transition-colors hover:text-[#a56437]" href="/request-equipment">
                            Request Equipment
                        </a>
                        <a className="focus-copper transition-colors hover:text-[#a56437]" href="/contact">
                            Contact
                        </a>
                    </nav>
                </div>

                <div>
                    <h3 className="mb-6 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950">
                        Legal
                    </h3>
                    <nav className="flex flex-col gap-4 text-neutral-600">
                        <a className="focus-copper transition-colors hover:text-[#a56437]" href="/privacy">
                            Privacy Policy
                        </a>
                        <a className="focus-copper transition-colors hover:text-[#a56437]" href="/terms">
                            Terms of Service
                        </a>
                        <a className="focus-copper transition-colors hover:text-[#a56437]" href="/cookies">
                            Cookie Policy
                        </a>
                        <a className="focus-copper transition-colors hover:text-[#a56437]" href="/disclaimer">
                            Disclaimer
                        </a>
                    </nav>
                </div>

                <div>
                    <h3 className="mb-6 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950">
                        Service Area
                    </h3>
                    <p className="leading-8 text-neutral-600">
                        Wyoming oilfields
                        <br />
                        Rockies and Bakken
                        <br />
                        Regional surplus yards
                    </p>
                    <div className="mt-6 flex gap-5 text-neutral-600">
                        <AccentIcon type="globe" />
                        <AccentIcon type="mail" />
                        <AccentIcon type="call" />
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[1280px] border-t border-[#dad5cb]/60 px-5 py-10 text-center sm:px-10">
                <p className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                    © 2024 PETRA Used Oilfield & Industrial Equipment Brokerage. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
