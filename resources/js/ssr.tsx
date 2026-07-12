import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import type { ComponentType, ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import AppLayout from './Layouts/AppLayout';
import BlankLayout from './Layouts/BlankLayout';

type InertiaPageModule = {
    default: ComponentType<Record<string, unknown>> & {
        layout?: (page: ReactNode) => ReactNode;
    };
};

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => {
            const pages = import.meta.glob<InertiaPageModule>('./Pages/**/*.tsx', { eager: true });
            const resolvedPage = pages[`./Pages/${name}.tsx`];

            resolvedPage.default.layout ??= (pageContent: ReactNode) => {
                const Layout = name.startsWith('Auth/') || name.startsWith('Portal/') ? BlankLayout : AppLayout;

                return <Layout>{pageContent}</Layout>;
            };

            return resolvedPage;
        },
        setup({ App, props }) {
            return <App {...props} />;
        },
    }),
);
