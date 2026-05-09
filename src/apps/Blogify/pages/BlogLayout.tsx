import { Compass, Home, Library, PenLine } from 'lucide-react';
import { Outlet } from 'react-router';
import BlogNav from '../components/BlogNav';

const NAV_ITEMS = [
    { to: '/blogify/home', icon: <Home size={18} />, label: 'Home' },
    { to: '/blogify/discover', icon: <Compass size={18} />, label: 'Discover' },
    { to: '/blogify/library', icon: <Library size={18} />, label: 'Library' },
    { to: '/blogify/write', icon: <PenLine size={18} />, label: 'Write' },
];

export default function BlogLayout() {
    return (
        <div className="min-h-screen bg-amber-50/40 dark:bg-stone-950 transition-colors duration-300">
            <main className="px-4 pt-8 pb-28">
                <Outlet />
            </main>
            <BlogNav navItems={NAV_ITEMS} />
        </div>
    );
}