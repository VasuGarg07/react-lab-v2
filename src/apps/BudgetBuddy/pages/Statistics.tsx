import React from 'react';
import { PieChart, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useBudget } from '@/apps/BudgetBuddy/BudgetContext';
import AggregateView from '@/apps/BudgetBuddy/components/AggregateView';
import BalanceCard from '@/apps/BudgetBuddy/components/BalanceCard';

const Statistics: React.FC = () => {
    const {
        transactions,
        loading,
        error,
        totalIncome,
        totalExpenses,
        remainingBalance
    } = useBudget();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-54px)] p-3">
                <div className="w-12 h-12 relative">
                    <div className="absolute inset-0 border-4 border-lime-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-lime-500 rounded-full animate-spin border-t-transparent"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-3">
                <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg shadow-sm">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-3">
            {/* Header */}
            <div className="flex items-center gap-1.5 border-b-2 border-lime-500 pb-2">
                <PieChart size={28} className="text-lime-500" />
                <h2 className="text-2xl font-semibold font-['Montserrat',sans-serif] tracking-wide uppercase text-gray-800 dark:text-gray-100">
                    Statistics
                </h2>
            </div>

            {/* Stat Cards */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-3">
                <BalanceCard
                    title="Total Income"
                    amount={totalIncome}
                    icon={<TrendingUp size={20} className="text-white" />}
                    variant="income"
                />
                <BalanceCard
                    title="Total Expenses"
                    amount={totalExpenses}
                    icon={<TrendingDown size={20} className="text-white" />}
                    variant="expense"
                />
                <BalanceCard
                    title="Balance"
                    amount={remainingBalance}
                    icon={<Wallet size={20} className="text-white" />}
                    variant="balance"
                />
            </div>

            {/* Aggregate Views */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-3">
                <AggregateView
                    transactions={transactions}
                    type="income"
                    total={totalIncome}
                    title="Income Details"
                />
                <AggregateView
                    transactions={transactions}
                    type="expense"
                    total={totalExpenses}
                    title="Expense Details"
                />
            </div>
        </div>
    );
};

export default Statistics;