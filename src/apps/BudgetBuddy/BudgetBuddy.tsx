import React from 'react';
import { Outlet } from 'react-router';
import { useAuth } from '@/auth/AuthProvider';
import BudgetProvider from '@/apps/BudgetBuddy/BudgetContext';
import BudgetNav from '@/apps/BudgetBuddy/components/BudgetNav';
import LoginPrompt from '@/components/LoginPrompt';
import AppBackground from '@/components/AppBackground';

const BudgetBuddy: React.FC = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <LoginPrompt
            title='Welcome to Budget Buddy'
            caption='Take control of your finances with smart expense tracking and budgeting tools. Start your journey to financial freedom today.'
            image='/expenses.png'
        />;
    }

    return (
        <div className="relative h-[calc(100vh-54px)] overflow-hidden">
            <AppBackground />
            <div className="min-h-[calc(100vh-54px)] flex flex-col sm:flex-row relative">
                {/* Navigation */}
                <BudgetNav />

                {/* Main Content */}
                <main className="flex-grow w-full sm:w-[calc(100%-280px)] min-h-[calc(100vh-116px)] md:min-h-[calc(100vh-54px)] h-auto md:h-[calc(100vh-54px)] overflow-auto pb-16 md:pb-0">
                    <BudgetProvider>
                        <Outlet />
                    </BudgetProvider>
                </main>
            </div>
        </div>
    );
};

export default BudgetBuddy;