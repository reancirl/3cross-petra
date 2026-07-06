export function FeatureIcon({ type, className = 'h-5 w-5' }: { type: string; className?: string }) {
    if (type === 'badge') {
        return (
            <svg className={`${className} text-[#a56437]`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 3.5 14.2 6l3.3-.3.6 3.2 2.7 1.8-1.6 2.9.8 3.2-3.2.9-1.8 2.8-3-1.5-3 1.5-1.8-2.8-3.2-.9.8-3.2-1.6-2.9 2.7-1.8.6-3.2 3.3.3L12 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path d="m8.8 12.2 2 2 4.4-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    if (type === 'truck') {
        return (
            <svg className={`${className} text-[#a56437]`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h10v9H4V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M14 10h3.4l2.6 3.1V16h-6v-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.8" />
            </svg>
        );
    }

    return (
        <svg className={`${className} text-[#a56437]`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.8" />
            <path d="m8.7 12.1 2.1 2.1 4.6-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function CategoryIcon({ type }: { type: string }) {
    if (type === 'loader') {
        return (
            <svg className="h-7 w-7 text-[#b06b3d]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3.5 15.5h7.4l2.4-5.4h3.4l2.8 5.4h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.3 18.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM16.3 18.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M13.5 10.1 10.8 7.4H8.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    if (type === 'dozer') {
        return (
            <svg className="h-7 w-7 text-[#b06b3d]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 16h9.2l2.2-4.5h2.9l1.7 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 17.5h16.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M7.5 14.5V9.8h4.7l2.1 1.7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M5.8 19.2h12.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    if (type === 'compaction') {
        return (
            <svg className="h-7 w-7 text-[#b06b3d]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 15.6h13.3l2.2-2.8v4.6H5v-1.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M8 15.6V8.5h5.7l2.1 2.5v4.6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M7.3 19.2h11.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    return (
        <svg className="h-7 w-7 text-[#b06b3d]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m14.4 4.5 5.1 5.1-2.7 2.7-1.5-1.5-6.8 6.8-2.1-2.1 6.8-6.8-1.5-1.5 2.7-2.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="m4.5 19.5 4.1-4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

export function AccentIcon({ type }: { type: 'sell' | 'search' }) {
    const paths = {
        sell: 'M5 6h7.5l6.5 6.5-6.5 6.5L5 11.5V6Zm4 4h.01',
        search: 'm20 20-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z',
    };

    return (
        <svg className="h-12 w-12 text-[#a56437]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d={paths[type]} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
