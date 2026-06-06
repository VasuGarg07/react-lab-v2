import { LogIn, LogOut, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthDispatch, useAuthSelector } from './useRedux';
import { logoutThunk } from './authSlice';

interface UserMenuProps {
    dropdownPosition?: 'up' | 'down';
    accentColor?: string;
    accentFg?: string;
}

export function UserMenu({
    dropdownPosition = 'down',
    accentColor = '#1C5D99',
    accentFg = '#ffffff',
}: UserMenuProps) {
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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
                <LogIn size={14} />
                <span className="hidden sm:inline">Sign In</span>
            </button>
        );
    }

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-opacity hover:opacity-80"
                style={{ backgroundColor: accentColor, color: accentFg }}
            >
                {getUserInitial()}
            </button>

            {open && (
                <div
                    className={`absolute right-0 w-56 rounded-2xl border border-neutral-200 bg-white shadow-xl z-20 overflow-hidden ${
                        dropdownPosition === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
                    }`}
                >
                    <div className="px-4 py-3 border-b border-neutral-100 flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                            style={{ backgroundColor: accentColor, color: accentFg }}
                        >
                            {getUserInitial()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-neutral-900 truncate">{user?.username}</p>
                            {user?.email && (
                                <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="p-1.5">
                        <button
                            type="button"
                            onClick={() => handleNavigation('/settings')}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                            <Settings size={14} className="text-neutral-400 shrink-0" />
                            Settings
                        </button>

                        <div className="my-1 border-t border-neutral-100" />

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={14} className="shrink-0" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
