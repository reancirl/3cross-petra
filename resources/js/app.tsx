import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import type { ReactNode } from 'react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import AppLayout from './Layouts/AppLayout';
import BlankLayout from './Layouts/BlankLayout';
import { trackNavigation } from './navigation';

// Records where each visit came from, so back affordances can pop history (restoring
// scroll + remembered state) instead of navigating forward to the top of a page.
trackNavigation();

type InertiaPageModule = {
    default: ComponentType<Record<string, unknown>> & {
        layout?: (page: ReactNode) => ReactNode;
    };
};

createInertiaApp({
    progress: {
        color: '#a56437',
        delay: 120,
        showSpinner: false,
    },
    resolve: (name) => {
        const pages = import.meta.glob<InertiaPageModule>('./Pages/**/*.tsx', { eager: true });
        const page = pages[`./Pages/${name}.tsx`];

        page.default.layout ??= (pageContent: ReactNode) => {
            const Layout = name.startsWith('Auth/') || name.startsWith('Broker/') || name.startsWith('Portal/') ? BlankLayout : AppLayout;

            return <Layout>{pageContent}</Layout>;
        };

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
