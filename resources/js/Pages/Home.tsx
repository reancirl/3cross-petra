import { Head } from '@inertiajs/react';

type HomeProps = {
    message: string;
};

export default function Home({ message }: HomeProps) {
    return (
        <>
            <Head title="Home" />

            <main className="w-full px-5 py-12 sm:px-10">
                <h1 className="font-mono text-4xl font-semibold uppercase tracking-[0.08em]">Home</h1>
                <p className="mt-4 max-w-2xl text-base text-neutral-600">{message}</p>
            </main>
        </>
    );
}
