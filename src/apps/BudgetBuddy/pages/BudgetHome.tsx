import { Plus } from 'lucide-react';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import CategoryIcon from '../components/CategoryIcon';
import { openTransactionForm } from '../components/TransactionForm';
import { useTransactions } from '../hooks/useTransactionQuery';
import {
    calculateTotalIncome,
    calculateTotalExpense,
    calculateBalance,
    calculateSavingsRate,
    getTopSpendingCategories,
    sortByDate,
    getCurrentMonthYear,
} from '../helpers/expense.utils';
import { useModal } from '../../../components/ModalContext';
import { formatCurrency } from '../../../shared/utilities';

export default function BudgetHome() {
    const modal = useModal();
    const { data: transactions = [], isLoading } = useTransactions();

    const totalIncome = calculateTotalIncome(transactions);
    const totalExpense = calculateTotalExpense(transactions);
    const balance = calculateBalance(transactions);
    const savingsRate = calculateSavingsRate(transactions);
    const recentTransactions = sortByDate(transactions, 'desc').slice(0, 8);
    const topSpending = getTopSpendingCategories(transactions, 5);

    const circumference = 2 * Math.PI * 26;
    const savingsDash = (savingsRate / 100) * circumference;

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                        Dashboard
                    </h1>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 uppercase tracking-widest">
                        {getCurrentMonthYear()}
                    </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => openTransactionForm(modal, 'add', null, 'income')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" /> Income
                    </button>
                    <button
                        onClick={() => openTransactionForm(modal, 'add', null, 'expense')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" /> Expense
                    </button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <BalanceCard
                    label="Income"
                    amount={totalIncome}
                    variant="income"
                    barPct={100}
                />
                <BalanceCard
                    label="Expenses"
                    amount={totalExpense}
                    variant="expense"
                    barPct={totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0}
                />
                <BalanceCard
                    label="Balance"
                    amount={balance}
                    variant="neutral"
                    barPct={totalIncome > 0 ? (balance / totalIncome) * 100 : 0}
                />
                <BalanceCard
                    label="Savings Rate"
                    amount={savingsRate}
                    variant="neutral"
                    suffix="%"
                    barPct={savingsRate}
                />
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
                {/* Transactions */}
                <div className="bg-white dark:bg-neutral-800 rounded-sm border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-700">
                        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                            Recent
                        </p>
                        {transactions.length > 8 && (
                            <a
                                href="/budgetbuddy/overview"
                                className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                            >
                                View all →
                            </a>
                        )}
                    </div>
                    <TransactionList
                        transactions={recentTransactions}
                        isLoading={isLoading}
                        emptyMessage="No transactions yet. Add your first!"
                    />
                </div>

                {/* Sidebar */}
                <div className="flex flex-col gap-4">
                    {/* Savings Ring */}
                    <div className="bg-white dark:bg-neutral-800 rounded-sm border border-neutral-200 dark:border-neutral-700 p-5">
                        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                            Savings
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 shrink-0">
                                <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
                                    <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" className="text-neutral-100 dark:text-neutral-700" strokeWidth="6" />
                                    <circle
                                        cx="32" cy="32" r="26" fill="none"
                                        stroke="#10b981" strokeWidth="6"
                                        strokeDasharray={`${savingsDash} ${circumference}`}
                                        strokeLinecap="butt"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                                        {savingsRate.toFixed(0)}%
                                    </span>
                                </div>
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                Saved{' '}
                                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                    {formatCurrency(balance)}
                                </span>
                                <br />
                                of{' '}
                                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                    {formatCurrency(totalIncome)}
                                </span>
                                {' '}income
                            </div>
                        </div>
                    </div>

                    {/* Top Spending */}
                    {topSpending.length > 0 && (
                        <div className="bg-white dark:bg-neutral-800 rounded-sm border border-neutral-200 dark:border-neutral-700 p-5">
                            <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                                Top Spending
                            </p>
                            <div className="space-y-3.5">
                                {topSpending.map(([category, amount]) => {
                                    const pct = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
                                    return (
                                        <div key={category}>
                                            <div className="flex items-center gap-2.5 mb-1.5">
                                                <CategoryIcon category={category} size="sm" />
                                                <span className="text-xs text-neutral-600 dark:text-neutral-400 flex-1 truncate">
                                                    {category}
                                                </span>
                                                <span className="text-xs font-medium tracking-tight text-neutral-900 dark:text-neutral-100 tabular-nums shrink-0">
                                                    {formatCurrency(amount)}
                                                </span>
                                            </div>
                                            <div className="h-0.5 bg-neutral-100 dark:bg-neutral-700 ml-9">
                                                <div
                                                    className="h-0.5 bg-red-400 dark:bg-red-500 transition-all duration-500"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}