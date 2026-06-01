import { type ReactNode } from 'react';
import { Footer } from './Footer';

export function Layout({children, showFooter = true}: {children: ReactNode, showFooter?: boolean}) {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
            <main className="flex-1">
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
}
