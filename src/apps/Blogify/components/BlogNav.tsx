import { type ReactNode } from 'react';
import { NavLink } from 'react-router';

interface NavItem {
    to: string;
    icon: ReactNode;
    label: string;
}

interface FloatingNavProps {
    navItems: NavItem[];
}

export default function BlogNav({ navItems }: FloatingNavProps) {
    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center bg-neutral-900 dark:bg-neutral-800 rounded-2xl px-2 py-2 shadow-2xl shadow-neutral-900/25 dark:shadow-black/40">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-white dark:bg-neutral-100 text-neutral-900'
                                : 'text-neutral-400 hover:text-white'
                            }`
                        }
                    >
                        <span className="w-4 h-4">{item.icon}</span>
                        <span className="hidden sm:block">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}