import { cn } from '@/shared/cn';
import { BookOpen, Globe, Plus, Search, User } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import CreateNotebook from './CreateNotebook';
import SearchDialog from './SearchDialog';

const ArchivraNav = () => {
    const location = useLocation();
    const [showCreate, setShowCreate] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const linkActive = (path: string) => location.pathname.endsWith(path);

    const SIDENAV_ITEMS = [
        { to: '/archivra/public', icon: <Globe size={18} />, label: 'Public Diaries' },
        { to: '/archivra/my', icon: <BookOpen size={18} />, label: 'My Diaries' },
        { to: 'profile', icon: <User size={18} />, label: 'User Profile' }
    ];

    const BOTTOM_NAV_ITEWS = [
        { to: '/archivra/public', icon: <Globe size={18} />, label: 'Public' },
        { to: '/archivra/my', icon: <BookOpen size={18} />, label: 'Personal' },
        { to: 'profile', icon: <User size={18} />, label: 'Profile' }
    ];

    const renderSideNav = () => (
        <nav className="hidden md:block w-[260px] flex-shrink-0">
            <div className="fixed w-[260px] h-[calc(100vh-54px)] border-r border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm p-4 flex flex-col">
                <div className="flex items-center gap-3 mb-6 pl-2">
                    <img src="/notebook.png" alt="Archivra" className="w-10 h-10" />
                    <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">Archivra</h1>
                </div>

                <ul className="space-y-1">
                    {SIDENAV_ITEMS.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                        "hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:translate-x-1",
                                        isActive || linkActive(item.to)
                                            ? "text-indigo-600 dark:text-fuchsia-400 bg-indigo-50 dark:bg-indigo-900/20"
                                            : "text-zinc-700 dark:text-zinc-300"
                                    )
                                }
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto pt-6 flex flex-col gap-2">
                    <button
                        onClick={() => setShowCreate(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 text-white rounded-md text-sm"
                    >
                        <Plus size={16} /> Create New
                    </button>
                    <button
                        onClick={() => setShowSearch(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-100 rounded-md transition"
                    >
                        <Search size={16} />
                        Search
                    </button>
                </div>
            </div>
        </nav>
    );

    const renderBottomNav = () => (
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 z-50 shadow-lg rounded-t-xl">
            <ul className="flex items-center justify-around px-2 py-1">
                <li>
                    <NavLink
                        to={BOTTOM_NAV_ITEWS[0].to}
                        className={({ isActive }) =>
                            cn(
                                "flex flex-col items-center py-2 px-1 transition-all",
                                isActive || linkActive(BOTTOM_NAV_ITEWS[0].to)
                                    ? "text-indigo-600 dark:text-fuchsia-400"
                                    : "text-zinc-500 dark:text-zinc-400"
                            )
                        }
                    >
                        {BOTTOM_NAV_ITEWS[0].icon}
                        <span className="text-[0.7rem] mt-1 font-medium">{BOTTOM_NAV_ITEWS[0].label}</span>
                    </NavLink>
                </li>

                <li>
                    <button
                        onClick={() => setShowSearch(true)}
                        className="flex flex-col items-center text-zinc-500 dark:text-zinc-400"
                    >
                        <Search size={18} />
                        <span className="text-[0.7rem] mt-1 font-medium">Search</span>
                    </button>
                </li>


                <li>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex flex-col items-center text-indigo-600 dark:text-fuchsia-400"
                    >
                        <Plus size={18} />
                        <span className="text-[0.7rem] mt-1 font-medium">New</span>
                    </button>
                </li>

                {BOTTOM_NAV_ITEWS.slice(1).map((item) => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                cn(
                                    "flex flex-col items-center py-2 px-1 transition-all",
                                    isActive || linkActive(item.to)
                                        ? "text-indigo-600 dark:text-fuchsia-400"
                                        : "text-zinc-500 dark:text-zinc-400"
                                )
                            }
                        >
                            {item.icon}
                            <span className="text-[0.7rem] mt-1 font-medium">{item.label}</span>
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

            <CreateNotebook
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
                onSuccess={() => setShowCreate(false)}
            />
            <SearchDialog
                isOpen={showSearch}
                onClose={() => setShowSearch(false)}
            />
        </>
    );
};

export default ArchivraNav;
