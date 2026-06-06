import { useEffect, useState, type ReactNode } from 'react';
import { NavLink } from 'react-router';
import { Feather } from 'lucide-react';

interface NavItem {
    to: string;
    icon: ReactNode;
    label: string;
}

interface BlogNavProps {
    navItems: NavItem[];
    rightSlot?: ReactNode;
}

export default function BlogNav({ navItems, rightSlot }: BlogNavProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? 'border-b border-navy/10 bg-beige/85 backdrop-blur-xl'
                    : 'border-b border-transparent bg-beige/60 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Brand */}
                <div className="flex items-center gap-2.5 shrink-0">
                    <div className="relative w-9 h-9 rounded-xl bg-onyx flex items-center justify-center">
                        <Feather className="w-4 h-4 text-beige" strokeWidth={2} />
                    </div>
                    <span className="font-serif text-lg font-semibold text-navy hidden sm:block tracking-tight">
                        Blogify
                    </span>
                </div>

                {/* Nav links */}
                <nav className="flex items-center gap-0.5 rounded-full bg-white/50 border border-navy/5 p-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                                    isActive
                                        ? 'bg-navy text-beige shadow-sm'
                                        : 'text-stone-500 hover:text-navy hover:bg-white/70'
                                }`
                            }
                        >
                            <span className="w-4 h-4 shrink-0">{item.icon}</span>
                            <span className="hidden md:block">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Right slot */}
                {rightSlot && <div className="flex items-center shrink-0">{rightSlot}</div>}
            </div>
        </header>
    );
}
