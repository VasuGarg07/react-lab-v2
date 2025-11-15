import { TrendingUp, TrendingDown, Wallet, PiggyBank, Plus } from 'lucide-react';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import { openTransactionForm } from '../components/TransactionForm';
import { useTransactions } from '../hooks/useTransactionQuery';
import {
    calculateTotalIncome,
    calculateTotalExpense,
    calculateBalance,
    calculateSavingsRate,
    sortByDate,
    getCurrentMonthYear,
} from '../helpers/expense.utils';
import { useModal } from '../../../components/ModalContext';

export default function BudgetHome() {
    const modal = useModal();
    const { data: transactions = [], isLoading } = useTransactions();

    // Calculate statistics
    const totalIncome = calculateTotalIncome(transactions);
    const totalExpense = calculateTotalExpense(transactions);
    const balance = calculateBalance(transactions);
    const savingsRate = calculateSavingsRate(transactions);

    // Get recent transactions (last 5)
    const recentTransactions = sortByDate(transactions, 'desc').slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    Dashboard
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {getCurrentMonthYear()}
                </p>
            </div>

            {/* Balance Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BalanceCard
                    icon={<TrendingUp className="w-5 h-5" />}
                    label="Total Income"
                    amount={totalIncome}
                    variant="income"
                />

                <BalanceCard
                    icon={<TrendingDown className="w-5 h-5" />}
                    label="Total Expense"
                    amount={totalExpense}
                    variant="expense"
                />

                <BalanceCard
                    icon={<Wallet className="w-5 h-5" />}
                    label="Balance"
                    amount={balance}
                    variant="neutral"
                />

                <BalanceCard
                    icon={<PiggyBank className="w-5 h-5" />}
                    label="Savings Rate"
                    amount={savingsRate}
                    variant="neutral"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Add Income Button */}
                    <button
                        onClick={() => openTransactionForm(modal, 'add', null, 'income')}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-200 font-medium text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Income
                    </button>

                    {/* Add Expense Button */}
                    <button
                        onClick={() => openTransactionForm(modal, 'add', null, 'expense')}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 transition-all duration-200 font-medium text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Expense
                    </button>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                        Recent Transactions
                    </h2>
                    {transactions.length > 5 && (
                        <a
                            href="/budgetbuddy/overview"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                            View All
                        </a>
                    )}
                </div>

                <TransactionList
                    transactions={recentTransactions}
                    isLoading={isLoading}
                    emptyMessage="No transactions yet. Add your first transaction!"
                />
            </div>
        </div>
    );
}