import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import type { ComponentType, ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import AppLayout from './Layouts/AppLayout';

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

            resolvedPage.default.layout ??= (pageContent: ReactNode) => <AppLayout>{pageContent}</AppLayout>;

            return resolvedPage;
        },
        setup({ App, props }) {
            return <App {...props} />;
        },
    }),
);
