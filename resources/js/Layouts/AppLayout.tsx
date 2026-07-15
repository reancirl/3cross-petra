import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import Footer from '../Components/footer';
import NavBar from '../Components/nav-bar';
import { AnimatedPage } from '../Components/polish';

type AppLayoutProps = {
    children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        const removeStartListener = router.on('start', () => setIsNavigating(true));
        const removeFinishListener = router.on('finish', () => setIsNavigating(false));

        return () => {
            removeStartListener();
            removeFinishListener();
        };
    }, []);

    return (
        <div className="min-h-screen bg-transparent text-neutral-950">
            <NavBar />
            <AnimatedPage busy={isNavigating}>{children}</AnimatedPage>
            <Footer />
            <Toaster
                position="top-right"
                toastOptions={{
                    classNames: {
                        toast: 'border border-[#dad5cb] bg-white text-neutral-950 shadow-none',
                        title: 'font-sans text-sm font-semibold',
                        description: 'font-sans text-sm text-neutral-600',
                    },
                }}
            />
        </div>
    );
}
