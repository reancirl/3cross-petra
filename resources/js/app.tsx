import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

type InertiaPageModule = {
    default: ComponentType<Record<string, unknown>>;
};

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<InertiaPageModule>('./Pages/**/*.tsx', { eager: true });
        return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
