import { type ReactNode } from 'react';
import { NavLink } from 'react-router';

interface NavItem {
    to: string;
    icon: ReactNode;
    label: string;
}

interface FloatingNavProps {
    appName: string;
    appIcon: ReactNode;
    navItems: NavItem[];
}

export default function FloatingNav({ appName, appIcon, navItems }: FloatingNavProps) {
    return (
        <nav className="px-4 py-3">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 rounded-full shadow-sm px-4 py-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 min-w-fit">
                        <div className="w-8 h-8 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                            {appIcon}
                        </div>
                        <span className="hidden sm:block text-sm font-medium tracking-tight text-neutral-800 dark:text-neutral-100">
                            {appName}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 justify-center">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 whitespace-nowrap ${
                                        isActive
                                            ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                                            : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
                                    }`
                                }
                            >
                                <span className="w-4 h-4">{item.icon}</span>
                                <span className="hidden md:inline">{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}