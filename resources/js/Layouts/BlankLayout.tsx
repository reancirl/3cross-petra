import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
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
        </div>
    );
}
