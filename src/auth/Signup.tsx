import React, { useState } from 'react';
import { LogIn, User, LogOut, Settings, ChevronRight } from 'lucide-react';
import { navigate } from '@/shared/Router';
import { useAuth } from '@/auth/AuthProvider';
import Dialog from '@/ui/Dialog';

const Signup: React.FC = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!isLoggedIn) {
        return (
            <button
                className="p-1.5 rounded-full text-neutral-700 hover:bg-neutral-100/80 dark:text-neutral-200 dark:hover:bg-neutral-800/80 transition-all duration-200"
                onClick={() => navigate('/auth/login')}
                aria-label="Sign in"
            >
                <LogIn size={20} className="stroke-[1.5px]" />
            </button>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const getInitial = () => {
        return user?.username ? user.username.charAt(0).toUpperCase() : '?';
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex w-9 h-9 justify-center items-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-500 text-white shadow-sm hover:shadow transition-all duration-200 focus:outline-none"
                aria-label="User menu"
            >
                <span className="text-sm font-medium">{getInitial()}</span>
            </button>

            <Dialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                position="top-right"
                size="sm"
                showCloseButton={false}
                contentClassName="w-80"
            >
                <div className="p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 text-white font-medium shadow-sm">
                                <span className="text-lg">{getInitial()}</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                                {user?.username}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-b-2xl overflow-hidden">
                    <div className="px-2 py-2 space-y-1">
                        <button
                            onClick={() => {
                                navigate('/profile');
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-colors"
                        >
                            <div className="flex items-center">
                                <User size={18} className="mr-3 text-neutral-500 dark:text-neutral-400" />
                                <span className="font-medium">Profile</span>
                            </div>
                            <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500" />
                        </button>

                        <button
                            onClick={() => {
                                navigate('/settings');
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-colors"
                        >
                            <div className="flex items-center">
                                <Settings size={18} className="mr-3 text-neutral-500 dark:text-neutral-400" />
                                <span className="font-medium">Settings</span>
                            </div>
                            <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500" />
                        </button>
                    </div>

                    <div className="px-2 py-2 border-t border-neutral-200 dark:border-neutral-700/50 mt-1">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <LogOut size={18} className="mr-3" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default Signup;