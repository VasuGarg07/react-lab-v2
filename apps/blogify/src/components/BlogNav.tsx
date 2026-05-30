import { type ReactNode } from 'react';
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
    return (
        <header className="sticky top-0 z-50 w-full border-b border-stone-200/60 dark:border-stone-800/60 bg-amber-50/80 dark:bg-stone-950/80 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
                {/* Brand */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-7 h-7 rounded-lg bg-stone-900 dark:bg-amber-50 flex items-center justify-center">
                        <Feather className="w-3.5 h-3.5 text-amber-50 dark:text-stone-900" strokeWidth={2} />
                    </div>
                    <span className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100 hidden sm:block">
                        Blogify
                    </span>
                </div>

                {/* Nav links */}
                <nav className="flex items-center gap-0.5">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                    isActive
                                        ? 'bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900'
                                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                                }`
                            }
                        >
                            <span className="w-4 h-4 shrink-0">{item.icon}</span>
                            <span className="hidden md:block">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Right slot */}
                {rightSlot && (
                    <div className="flex items-center shrink-0">
                        {rightSlot}
                    </div>
                )}
            </div>
        </header>
    );
}
