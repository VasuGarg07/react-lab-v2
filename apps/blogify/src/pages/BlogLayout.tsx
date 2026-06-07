import { Compass, Home, Library, PenLine } from 'lucide-react';
import { Outlet } from 'react-router';
import BlogNav from '../components/BlogNav';
import BlogFooter from '../components/BlogFooter';
import { useScrollToTop } from '@react-lab/shared';
import { UserMenu } from '@react-lab/auth';

const NAV_ITEMS = [
    { to: '/home', icon: <Home size={16} />, label: 'Home' },
    { to: '/discover', icon: <Compass size={16} />, label: 'Discover' },
    { to: '/library', icon: <Library size={16} />, label: 'Library' },
    { to: '/write', icon: <PenLine size={16} />, label: 'Write' },
];

export default function BlogLayout() {
    useScrollToTop();

    return (
        <div className="min-h-screen flex flex-col bg-beige">
            <BlogNav navItems={NAV_ITEMS} rightSlot={<UserMenu accentColor="#0E9E8A" accentFg="#FFFFFF" />} />
            <main className="flex-1 px-4 py-10">
                <Outlet />
            </main>
            <BlogFooter />
        </div>
    );
}
