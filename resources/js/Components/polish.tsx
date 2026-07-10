import { useEffect, useRef } from 'react';
import type { AnchorHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from 'react';

type ClassValue = string | false | null | undefined;

function classes(...values: ClassValue[]) {
    return values.filter(Boolean).join(' ');
}

type AnimatedPageProps = HTMLAttributes<HTMLDivElement> & {
    busy?: boolean;
    children: ReactNode;
};

export function AnimatedPage({ busy = false, children, className, ...props }: AnimatedPageProps) {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const page = pageRef.current;

        if (!page || !('IntersectionObserver' in window)) {
            return;
        }

        const targets = Array.from(
            page.querySelectorAll<HTMLElement>(
                [
                    'main > section:first-child h1',
                    'main > section:first-child p',
                    'main > section:first-child a',
                    'main > section:first-child button',
                    'main > section:first-child span',
                    'main > section:not(:first-child) h2',
                    'main > section:not(:first-child) h3',
                    'main > section:not(:first-child) article',
                    'main > section:not(:first-child) figure',
                    'main > section:not(:first-child) li',
                    '[data-polish-reveal]',
                ].join(', '),
            ),
        );

        targets.forEach((target, index) => {
            target.classList.add('polish-reveal');
            target.style.setProperty('--reveal-delay', `${Math.min(index % 8, 7) * 45}ms`);
        });

        page.querySelectorAll<HTMLElement>('main a, main button').forEach((target) => {
            target.classList.add('button-press', 'focus-copper');
        });

        page.querySelectorAll<HTMLElement>('main select').forEach((target) => {
            target.classList.add('polished-select', 'focus-copper');
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
        );

        targets.forEach((target) => observer.observe(target));

        return () => observer.disconnect();
    }, [children]);

    return (
        <div
            ref={pageRef}
            className={classes('animated-page transition-opacity duration-200', busy && 'page-is-busy', className)}
            aria-busy={busy}
            {...props}
        >
            {children}
        </div>
    );
}

type RevealProps = HTMLAttributes<HTMLDivElement> & {
    delay?: number;
    children: ReactNode;
};

export function Reveal({ delay = 0, children, className, style, ...props }: RevealProps) {
    return (
        <div
            className={classes('reveal-up', className)}
            style={{ '--reveal-delay': `${delay}ms`, ...style } as CSSProperties}
            {...props}
        >
            {children}
        </div>
    );
}

type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: 'primary' | 'outline' | 'dark';
};

export function CtaLink({ variant = 'primary', className, children, ...props }: CtaLinkProps) {
    const variants = {
        primary: 'bg-[#a56437] text-white hover:bg-[#874d29]',
        outline: 'border border-neutral-500 text-neutral-950 hover:bg-neutral-950 hover:text-white',
        dark: 'border border-white/50 text-white hover:bg-white/10',
    };

    return (
        <a
            className={classes(
                'button-press focus-copper inline-flex h-14 items-center justify-center px-8 font-heading text-base font-semibold uppercase tracking-[0.1em]',
                variants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </a>
    );
}

type SkeletonBlockProps = HTMLAttributes<HTMLDivElement>;

export function SkeletonBlock({ className, ...props }: SkeletonBlockProps) {
    return <div className={classes('skeleton-shimmer min-h-12', className)} aria-hidden="true" {...props} />;
}
