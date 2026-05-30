import { LogIn, LogOut, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthDispatch, useAuthSelector } from './useRedux';
import { logoutThunk } from './authSlice';

export function UserMenu() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const dispatch = useAuthDispatch();
    const { isLoggedIn, user } = useAuthSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutThunk() as any);
        navigate('/');
        setOpen(false);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setOpen(false);
    };

    const getUserInitial = () => {
        if (!user?.username) return '?';
        return user.username.charAt(0).toUpperCase();
    };

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    if (!isLoggedIn) {
        return (
            <button
                onClick={() => navigate('/auth/login')}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
                <LogIn size={16} />
                <span className="hidden sm:inline">Sign In</span>
            </button>
        );
    }

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-full"
            >
                <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                    {getUserInitial()}
                </div>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg border bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 shadow-lg z-20">
                    <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                                {getUserInitial()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                    {user?.username}
                                </h3>
                                {user?.email && (
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                                        {user.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-2">
                        <button
                            type="button"
                            onClick={() => handleNavigation('/settings')}
                            className="mt-1 flex items-center justify-between w-full px-3 py-2 rounded-md text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none"
                        >
                            <span className="flex items-center gap-3">
                                <Settings size={16} className="text-neutral-500 dark:text-neutral-400" />
                                <span className="font-medium">Settings</span>
                            </span>
                        </button>

                        <div className="my-2 border-t border-neutral-200 dark:border-neutral-700" />

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center w-full px-3 py-2 rounded-md text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <span className="flex items-center gap-3">
                                <LogOut size={16} />
                                <span className="font-medium">Sign Out</span>
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
