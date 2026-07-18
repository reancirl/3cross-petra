import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import ConfirmDialog from './confirm-dialog';
import PortalSidebar from './portal-sidebar';
import PortalTopbar from './portal-topbar';
import type { PortalData } from '../types';

const SIDEBAR_COLLAPSED_KEY = 'petra-portal-sidebar-collapsed';

type PortalShellProps = {
    portal: PortalData;
    title: string;
    eyebrow?: string;
    children: ReactNode;
};

export default function PortalShell({ portal, title, eyebrow, children }: PortalShellProps) {
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    // Restore the collapsed preference after mount so SSR and first client render match.
    useEffect(() => {
        setCollapsed(window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1');
    }, []);

    function toggleCollapsed() {
        setCollapsed((value) => {
            const next = !value;
            window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? '1' : '0');
            return next;
        });
    }

    function logout() {
        setLogoutDialogOpen(false);
        router.post('/logout', {}, { replace: true });
    }

    return (
        <main
            // portal-shell scopes the soft-edge rules in app.css to authenticated screens,
            // leaving the public marketplace's squared edges alone.
            className={`portal-shell min-h-screen bg-[#f3f1ec] text-neutral-950 lg:grid ${
                collapsed ? 'lg:grid-cols-[80px_minmax(0,1fr)]' : 'lg:grid-cols-[296px_minmax(0,1fr)]'
            }`}
        >
            <PortalSidebar
                portal={portal}
                collapsed={collapsed}
                onToggleCollapsed={toggleCollapsed}
                onLogout={() => setLogoutDialogOpen(true)}
            />

            <section className="min-w-0">
                <PortalTopbar portal={portal} title={title} subtitle={eyebrow} onLogout={() => setLogoutDialogOpen(true)} />

                <div className="px-5 py-6 sm:px-8 lg:px-10 lg:py-8">{children}</div>
            </section>

            <ConfirmDialog
                open={logoutDialogOpen}
                title="Log out?"
                description="You will be signed out of your Petra portal session and returned to the login page."
                confirmLabel="Log out"
                onCancel={() => setLogoutDialogOpen(false)}
                onConfirm={logout}
            />
        </main>
    );
}
