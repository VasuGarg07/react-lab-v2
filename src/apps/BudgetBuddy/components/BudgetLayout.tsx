import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Wallet, Home, LayoutList, PieChart } from 'lucide-react';
import { useAppSelector } from '../../../store/useRedux';
import FloatingNav from '../../../ui/FloatingNav';

export default function BudgetLayout() {
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

    const navItems = [
        {
            to: '/budgetbuddy/home',
            icon: <Home className="w-4 h-4" />,
            label: 'Dashboard',
        },
        {
            to: '/budgetbuddy/overview',
            icon: <LayoutList className="w-4 h-4" />,
            label: 'Transactions',
        },
        {
            to: '/budgetbuddy/statistics',
            icon: <PieChart className="w-4 h-4" />,
            label: 'Statistics',
        },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
            {/* Floating Navigation */}
            <FloatingNav
                appName="BudgetBuddy"
                appIcon={<Wallet className="w-5 h-5" />}
                navItems={navItems}
            />

            {/* Main Content Area */}
            <main className="p-4 sm:p-8">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}