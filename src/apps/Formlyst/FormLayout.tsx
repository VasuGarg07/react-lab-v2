import { Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../../store/useRedux";
import { useEffect } from "react";

export default function FormLayout() {
    const navigate = useNavigate();
    const { isLoggedIn, initializing } = useAppSelector(state => state.auth);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!initializing && !isLoggedIn) {
            navigate('/auth/login');
        }
    }, [isLoggedIn, initializing, navigate]);

    // Show loading while checking auth
    if (initializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-700 border-t-emerald-600 rounded-full animate-spin" />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    // Don't render if not logged in
    if (!isLoggedIn) {
        return null;
    }

    return <Outlet />
}