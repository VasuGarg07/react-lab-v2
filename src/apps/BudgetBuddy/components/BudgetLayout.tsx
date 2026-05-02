import { Home, LayoutList, PieChart, Wallet } from 'lucide-react';
import { Outlet } from 'react-router';
import FloatingNav from '../../../ui/FloatingNav';

export default function BudgetLayout() {
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
            <FloatingNav
                appName="BudgetBuddy"
                appIcon={<Wallet className="w-5 h-5" />}
                navItems={navItems}
            />

            <main className="p-4 sm:p-8">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}