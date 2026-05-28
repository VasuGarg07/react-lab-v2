import { Outlet, useLocation } from 'react-router';
import { Footer } from '@react-lab/ui';
import { useEffect } from 'react';
import Header from '../components/Header';
import { Suspense } from "react";

export default function Layout() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
            <Header />
            <main className="flex-1">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
