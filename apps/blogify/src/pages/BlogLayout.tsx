import { Compass, Home, Library, PenLine } from 'lucide-react';
import { Outlet } from 'react-router';
import BlogNav from '../components/BlogNav';
import { useScrollToTop } from '@react-lab/shared';
import { UserMenu } from '@react-lab/auth';

const NAV_ITEMS = [
    { to: '/blogify/home', icon: <Home size={16} />, label: 'Home' },
    { to: '/blogify/discover', icon: <Compass size={16} />, label: 'Discover' },
    { to: '/blogify/library', icon: <Library size={16} />, label: 'Library' },
    { to: '/blogify/write', icon: <PenLine size={16} />, label: 'Write' },
];

export default function BlogLayout() {
    useScrollToTop();

    return (
        <div className="min-h-screen bg-amber-50/40 dark:bg-stone-950 transition-colors duration-300">
            <BlogNav navItems={NAV_ITEMS} rightSlot={<UserMenu />} />
            <main className="px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}
