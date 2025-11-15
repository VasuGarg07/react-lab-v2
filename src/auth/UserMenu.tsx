import { LogIn, LogOut, Settings } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/useRedux";

const UserMenu: React.FC = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isLoggedIn, user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
        setOpen(false);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setOpen(false);
    };

    const getUserInitial = () => {
        if (!user?.username) return "?";
        return user.username.charAt(0).toUpperCase();
    };

    // Close on outside click
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    // ---------------- Unauthenticated: simple "Sign In" button ----------------
    if (!isLoggedIn) {
        return (
            <button
                onClick={() => navigate("/auth/login")}
                className={
                    "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium " +
                    "border border-slate-300 dark:border-slate-600 " +
                    "text-slate-700 dark:text-slate-300 " +
                    "hover:bg-slate-100 dark:hover:bg-slate-800 " +
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                }
            >
                <LogIn size={16} />
                <span className="hidden sm:inline">Sign In</span>
            </button>
        );
    }

    // ---------------- Authenticated: avatar + dropdown menu ----------------
    return (
        <div ref={menuRef} className="relative">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={
                    "inline-flex items-center justify-center rounded-full " +
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                }
            >
                <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                    {getUserInitial()}
                </div>
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className={
                        "absolute right-0 mt-2 w-72 rounded-lg border bg-white dark:bg-slate-800 " +
                        "border-slate-200 dark:border-slate-700 shadow-lg z-20"
                    }
                >
                    {/* User info header */}
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                                {getUserInitial()}
                            </div>
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

                    {/* Menu items */}
                    <div className="p-2">
                        <button
                            type="button"
                            onClick={() => handleNavigation("/settings")}
                            className={
                                "mt-1 flex items-center justify-between w-full px-3 py-2 rounded-md text-sm " +
                                "text-slate-700 dark:text-slate-300 " +
                                "hover:bg-slate-100 dark:hover:bg-slate-700 " +
                                "focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-700"
                            }
                        >
                            <span className="flex items-center gap-3">
                                <Settings size={16} className="text-slate-500 dark:text-slate-400" />
                                <span className="font-medium">Settings</span>
                            </span>
                        </button>

                        {/* Divider */}
                        <div className="my-2 border-t border-slate-200 dark:border-slate-700" />

                        {/* Logout */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={
                                "flex items-center w-full px-3 py-2 rounded-md text-sm " +
                                "text-red-600 dark:text-red-400 " +
                                "hover:bg-red-50 dark:hover:bg-red-900/20 " +
                                "focus:outline-none focus:bg-red-50 dark:focus:bg-red-900/20"
                            }
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
};

export default UserMenu;
