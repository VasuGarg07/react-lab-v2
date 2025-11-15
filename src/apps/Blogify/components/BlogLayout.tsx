import { Outlet, Navigate } from 'react-router';
import { Home, PenLine, LayoutGrid, User, Feather } from 'lucide-react';
import { useAppSelector } from '../../../store/useRedux';
import FloatingNav from '../../../ui/FloatingNav';

export default function BlogLayout() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
        return <Navigate to="/auth/login" replace />;
    }

    // Navigation items for Blogify
    const navItems = [
        { to: 'home', icon: <Home className="w-4 h-4" />, label: 'Home' },
        { to: 'publish', icon: <PenLine className="w-4 h-4" />, label: 'Write' },
        { to: 'list', icon: <LayoutGrid className="w-4 h-4" />, label: 'Explore' },
        { to: 'me', icon: <User className="w-4 h-4" />, label: 'My Blogs' },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-200">
            {/* Floating Navigation */}
            <FloatingNav
                appName="Blogify"
                appIcon={<Feather className="w-5 h-5" />}
                navItems={navItems}
            />

            {/* Main Content Area */}
            <main className="p-4 sm:p-8">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};