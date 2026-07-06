export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-4.5rem)] w-full items-center px-5 py-16 sm:px-10">
            <section className="max-w-2xl">
                <p className="font-heading text-base font-semibold uppercase tracking-[0.18em] text-[#9d5f35]">404</p>
                <h1 className="mt-4 font-heading text-5xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-6xl">
                    Page Not Found
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                    This route does not exist or has moved. Head back to the homepage to continue browsing Petra.
                </p>
                <a
                    href="/"
                    className="mt-8 inline-flex h-11 items-center bg-[#9d5f35] px-6 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#874d29]"
                >
                    Back to Homepage
                </a>
            </section>
        </main>
    );
}
