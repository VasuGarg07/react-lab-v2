import React from 'react';
import { LogIn, User, LogOut, Settings, ChevronRight } from 'lucide-react';
import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import { Avatar as BaseAvatar } from '@base-ui-components/react/avatar';
import { navigate } from '@/shared/Router';
import { useAuth } from '@/auth/AuthProvider';
import { cn } from '@/shared/cn';

const UserMenu: React.FC = () => {
    const { isLoggedIn, user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const getUserInitial = () => {
        if (!user?.username) return '?';
        return user.username.charAt(0).toUpperCase();
    };

    // Sign in button for unauthenticated users
    if (!isLoggedIn) {
        return (
            <button
                className={cn(
                    "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    "text-slate-700 dark:text-slate-300",
                    "hover:bg-slate-100 dark:hover:bg-slate-800",
                    "border border-slate-300 dark:border-slate-600",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                )}
                onClick={() => navigate('/auth/login')}
            >
                <LogIn size={16} />
                <span className="hidden sm:inline">Sign In</span>
            </button>
        );
    }

    return (
        <BaseMenu.Root>
            <BaseMenu.Trigger
                className={cn(
                    "inline-flex items-center justify-center rounded-full transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                )}
            >
                <BaseAvatar.Root className="w-9 h-9">
                    <BaseAvatar.Fallback
                        className={cn(
                            "w-full h-full flex items-center justify-center rounded-full",
                            "bg-blue-500 text-white text-sm font-semibold",
                            "hover:bg-blue-600 transition-colors"
                        )}
                    >
                        {getUserInitial()}
                    </BaseAvatar.Fallback>
                </BaseAvatar.Root>
            </BaseMenu.Trigger>

            <BaseMenu.Portal>
                <BaseMenu.Positioner side="bottom" align="end" sideOffset={8}>
                    <BaseMenu.Popup
                        className={cn(
                            "w-72 rounded-lg border bg-white dark:bg-slate-800 shadow-sm",
                            "border-slate-200 dark:border-slate-700",
                            "data-[state=open]:animate-in data-[state=closed]:animate-out",
                            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                            "data-[side=bottom]:slide-in-from-top-2"
                        )}
                    >
                        <BaseMenu.Arrow className="fill-white dark:fill-slate-800" />

                        {/* User Info Header */}
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <BaseAvatar.Root className="w-9 h-9">
                                    <BaseAvatar.Fallback
                                        className={cn(
                                            "w-full h-full flex items-center justify-center rounded-full",
                                            "bg-blue-500 text-white text-sm font-semibold",
                                            "hover:bg-blue-600 transition-colors"
                                        )}
                                    >
                                        {getUserInitial()}
                                    </BaseAvatar.Fallback>
                                </BaseAvatar.Root>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                                        {user?.username}
                                    </h3>
                                    {user?.email && (
                                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                            {user.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            <BaseMenu.Item
                                onClick={() => handleNavigation('/profile')}
                                className={cn(
                                    "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors",
                                    "text-slate-700 dark:text-slate-300",
                                    "hover:bg-slate-100 dark:hover:bg-slate-700",
                                    "focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-700",
                                    "cursor-pointer"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <User size={16} className="text-slate-500 dark:text-slate-400" />
                                    <span className="font-medium">Profile</span>
                                </div>
                                <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
                            </BaseMenu.Item>

                            <BaseMenu.Item
                                onClick={() => handleNavigation('/settings')}
                                className={cn(
                                    "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors",
                                    "text-slate-700 dark:text-slate-300",
                                    "hover:bg-slate-100 dark:hover:bg-slate-700",
                                    "focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-700",
                                    "cursor-pointer"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Settings size={16} className="text-slate-500 dark:text-slate-400" />
                                    <span className="font-medium">Settings</span>
                                </div>
                                <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
                            </BaseMenu.Item>

                            {/* Divider */}
                            <BaseMenu.Separator className="my-2 border-t border-slate-200 dark:border-slate-700" />

                            {/* Logout Button */}
                            <BaseMenu.Item
                                onClick={handleLogout}
                                className={cn(
                                    "flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors",
                                    "text-red-600 dark:text-red-400",
                                    "hover:bg-red-50 dark:hover:bg-red-900/20",
                                    "focus:outline-none focus:bg-red-50 dark:focus:bg-red-900/20",
                                    "cursor-pointer"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut size={16} />
                                    <span className="font-medium">Sign Out</span>
                                </div>
                            </BaseMenu.Item>
                        </div>
                    </BaseMenu.Popup>
                </BaseMenu.Positioner>
            </BaseMenu.Portal>
        </BaseMenu.Root>
    );
};

export default UserMenu;