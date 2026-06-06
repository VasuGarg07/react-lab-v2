import { Outlet } from 'react-router';
import { useScrollToTop } from '@react-lab/shared';
import BudgetHeader from './BudgetHeader';
import BudgetFooter from './BudgetFooter';

export default function BudgetLayout() {
    useScrollToTop();

    return (
        <div className="min-h-screen flex flex-col bg-lavender">
            <BudgetHeader />
            <main className="flex-1 px-4 pb-20 pt-6 sm:px-8">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
            <BudgetFooter />
        </div>
    );
}
