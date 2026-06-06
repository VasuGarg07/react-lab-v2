import { LogIn, LogOut, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthDispatch, useAuthSelector } from './useRedux';
import { logoutThunk } from './authSlice';

interface UserMenuProps {
    dropdownPosition?: 'up' | 'down';
}

export function UserMenu({ dropdownPosition = 'down' }: UserMenuProps) {
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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
                <LogIn size={15} />
                <span className="hidden sm:inline">Sign In</span>
            </button>
        );
    }

    return (
        <div ref={menuRef} className="relative">
            {/* Avatar button */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-sm font-black transition-colors border border-white/30"
            >
                {getUserInitial()}
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className={`absolute right-0 w-64 rounded-2xl border border-silver/40 bg-white shadow-xl z-20 overflow-hidden ${dropdownPosition === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
                >
                    {/* User info header */}
                    <div className="px-4 py-3.5 bg-chalk border-b border-silver/30 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-crimson text-white flex items-center justify-center text-sm font-black shrink-0">
                            {getUserInitial()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-shadow truncate">{user?.username}</p>
                            {user?.email && (
                                <p className="text-xs text-smoke truncate">{user.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                        <button
                            type="button"
                            onClick={() => handleNavigation('/settings')}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-shadow hover:bg-chalk transition-colors"
                        >
                            <Settings size={15} className="text-smoke shrink-0" />
                            Settings
                        </button>

                        <div className="my-1.5 border-t border-silver/30" />

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-crimson hover:bg-crimson/5 transition-colors"
                        >
                            <LogOut size={15} className="shrink-0" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
