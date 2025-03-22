import React from 'react';
import { BarChart3, History, LayoutGrid, PieChart } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import { cn } from '@/shared/cn';

const NAVIGATION_ITEMS = [
    { to: 'home', icon: <LayoutGrid size={18} />, label: 'Home' },
    { to: 'overview', icon: <History size={18} />, label: 'Overview' },
    { to: 'statistics', icon: <PieChart size={18} />, label: 'Statistics' },
    { to: 'timeline', icon: <BarChart3 size={18} />, label: 'Timeline' }
];

const BudgetNav: React.FC = () => {
    const location = useLocation();

    // Helper function to check if a nav item is active
    const isActive = (path: string) => location.pathname.endsWith(path);

    // Desktop Sidebar Content
    const renderSideNav = () => (
        <nav
            className="hidden md:block w-[280px] flex-shrink-0"
            aria-label="Main Navigation"
        >
            <div className="w-[280px] h-[calc(100vh-54px)] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 p-4 flex flex-col shadow-sm fixed">
                {/* Logo and Title */}
                <div className="flex items-center gap-3 mb-6 pl-2">
                    <img
                        src="/money.png"
                        alt="Budget Logo"
                        className="w-10 h-10"
                    />
                    <h1 className="text-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                        BudgetBuddy
                    </h1>
                </div>

                {/* Navigation List */}
                <ul className="space-y-1">
                    {NAVIGATION_ITEMS.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                    "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:translate-x-1",
                                    isActive
                                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                                        : "text-zinc-700 dark:text-zinc-300"
                                )}
                            >
                                <span className="flex items-center justify-center w-8 h-8 transition-transform duration-200 group-hover:scale-110">
                                    {React.cloneElement(item.icon, {
                                        className: cn(
                                            "transition-all duration-200",
                                            isActive(item.to)
                                                ? "text-emerald-600 dark:text-emerald-400"
                                                : "text-zinc-500 dark:text-zinc-400"
                                        )
                                    })}
                                </span>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );

    // Mobile Bottom Navigation Content
    const renderBottomNav = () => (
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 z-50 rounded-t-xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
            <ul className="flex items-center justify-around px-2 py-1">
                {NAVIGATION_ITEMS.map((item) => (
                    <li key={item.to} className="flex-1">
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => cn(
                                "flex flex-col items-center py-2 px-1 transition-all duration-200",
                                isActive
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-zinc-500 dark:text-zinc-400"
                            )}
                        >
                            {React.cloneElement(item.icon, {
                                className: cn(
                                    "transition-transform duration-200 hover:-translate-y-1",
                                    isActive(item.to)
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-zinc-500 dark:text-zinc-400"
                                )
                            })}
                            <span className="text-[0.7rem] mt-1 font-medium">
                                {item.label}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            {renderSideNav()}
            {renderBottomNav()}
        </>
    );
};

export default BudgetNav;