import { Compass, Home, Library, PenLine } from 'lucide-react';
import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../../../store/useRedux';
import BlogNav from '../components/BlogNav';

export default function BlogLayout() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
        return <Navigate to="/auth/login" replace />;
    }

    // Navigation items for Blogify
    const navItems = [
        { to: '/blogify/home', icon: <Home className="w-4 h-4" />, label: 'Home' },
        { to: '/blogify/discover', icon: <Compass className="w-4 h-4" />, label: 'Discover' },
        { to: '/blogify/library', icon: <Library className="w-4 h-4" />, label: 'Library' },
        { to: '/blogify/write', icon: <PenLine className="w-4 h-4" />, label: 'Write' },
    ];

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-neutral-900 transition-colors duration-200">
            <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-24">
                <Outlet />
            </main>

            <BlogNav navItems={navItems} />
        </div>
    );
};