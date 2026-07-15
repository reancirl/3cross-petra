import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AnimatedPage } from '../Components/polish';

type BlankLayoutProps = {
    children: ReactNode;
};

export default function BlankLayout({ children }: BlankLayoutProps) {
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
        <div className="min-h-screen bg-[#f3f1ec] text-neutral-950">
            <AnimatedPage busy={isNavigating}>{children}</AnimatedPage>
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
