import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type SlideOverProps = {
    children: ReactNode;
    eyebrow?: string;
    open: boolean;
    title: string;
    onClose: () => void;
};

export default function SlideOver({ children, eyebrow, open, title, onClose }: SlideOverProps) {
    const [shouldRender, setShouldRender] = useState(open);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setShouldRender(true);
            requestAnimationFrame(() => setIsVisible(true));

            return;
        }

        setIsVisible(false);
        const timeout = window.setTimeout(() => setShouldRender(false), 260);

        return () => window.clearTimeout(timeout);
    }, [open]);

    useEffect(() => {
        if (!shouldRender) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [shouldRender, onClose]);

    if (!shouldRender) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[80]">
            <button
                type="button"
                aria-label="Close panel"
                onClick={onClose}
                className={`absolute inset-0 cursor-default bg-neutral-950/40 transition-opacity duration-[250ms] ease-out ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="slide-over-title"
                className={`absolute right-0 top-0 grid h-full w-full max-w-2xl content-start overflow-y-auto border-l border-[#dad5cb] bg-[#f8f8f6] shadow-2xl transition-[opacity,transform] duration-[250ms] ease-out ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
            >
                <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#dad5cb] bg-white px-5 py-5 sm:px-7">
                    <div>
                        {eyebrow && (
                            <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]">
                                {eyebrow}
                            </span>
                        )}
                        <h2 id="slide-over-title" className="mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950">
                            {title}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="button-press focus-copper inline-flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-400 font-heading text-2xl leading-none text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                        aria-label="Close"
                    >
                        X
                    </button>
                </header>

                <div className="px-5 py-6 sm:px-7">{children}</div>
            </aside>
        </div>
    );
}
