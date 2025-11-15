import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import Header from '../components/Header';

export default function Layout() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
            <Header />
            <main className="flex-1">
                <Outlet /> {/* Route content will render here */}
            </main>
            <Footer />
        </div>
    );
}
