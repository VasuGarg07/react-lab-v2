import { type ReactNode } from 'react';
import { NavLink } from 'react-router';

interface NavItem {
    to: string;
    icon: ReactNode;
    label: string;
}

export default function BlogNav({ navItems }: { navItems: NavItem[] }) {
    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-1 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-700/60 rounded-2xl px-2 py-2 shadow-lg shadow-stone-900/10 dark:shadow-black/40">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? 'bg-stone-900 dark:bg-amber-50 text-amber-50 dark:text-stone-900'
                                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="hidden sm:block">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}