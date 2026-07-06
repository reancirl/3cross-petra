import type { ReactNode } from 'react';
import Footer from '../Components/footer';
import NavBar from '../Components/nav-bar';

type AppLayoutProps = {
    children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-transparent text-neutral-950">
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}
