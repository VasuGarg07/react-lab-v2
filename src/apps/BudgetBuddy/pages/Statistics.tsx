import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactionQuery';
import {
    calculateTotalIncome,
    calculateTotalExpense,
    calculateSavingsRate,
    groupByCategory,
    getTopSpendingCategories,
    filterByType,
    getCurrentMonthYear,
} from '../helpers/expense.utils';
import { CATEGORY_COLORS, TYPE_COLORS } from '../helpers/expense.constants';
import { formatCurrency } from '../../../shared/utilities';

export default function Statistics() {
    const { data: transactions = [], isLoading } = useTransactions();

    const totalIncome = calculateTotalIncome(transactions);
    const totalExpense = calculateTotalExpense(transactions);
    const savingsRate = calculateSavingsRate(transactions);

    const incomeExpenseData = [
        { name: 'Income', value: totalIncome, color: TYPE_COLORS.income },
        { name: 'Expense', value: totalExpense, color: TYPE_COLORS.expense },
    ];

    const incomeTransactions = filterByType(transactions, 'income');
    const incomeByCategory = groupByCategory(incomeTransactions);
    const incomeCategoryData = Object.entries(incomeByCategory).map(([category, amount]) => ({
        name: category,
        value: amount,
        color: CATEGORY_COLORS[category] || '#6b7280',
    }));

    const expenseTransactions = filterByType(transactions, 'expense');
    const expenseByCategory = groupByCategory(expenseTransactions);
    const expenseCategoryData = Object.entries(expenseByCategory).map(([category, amount]) => ({
        name: category,
        value: amount,
        color: CATEGORY_COLORS[category] || '#6b7280',
    }));

    const topSpending = getTopSpendingCategories(transactions, 5);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-white dark:bg-neutral-800 px-3 py-2 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {data.name}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {formatCurrency(data.value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-neutral-200 dark:border-neutral-700 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading statistics...</p>
                </div>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        Statistics
                    </h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {getCurrentMonthYear()}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                        <TrendingUp className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-center">
                        No data to display yet. Add some transactions to see statistics!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    Statistics
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {getCurrentMonthYear()}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            Total Income
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(totalIncome)}
                    </p>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            Total Expense
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {formatCurrency(totalExpense)}
                    </p>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            Savings Rate
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {savingsRate.toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* Income vs Expense Pie Chart */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Income vs Expense
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={incomeExpenseData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {incomeExpenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value, entry: any) => (
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                    {value}: {formatCurrency(entry.payload.value)}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Income %</p>
                            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                {totalIncome + totalExpense > 0
                                    ? ((totalIncome / (totalIncome + totalExpense)) * 100).toFixed(1)
                                    : 0}
                                %
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Expense %</p>
                            <p className="text-lg font-bold text-red-600 dark:text-red-400">
                                {totalIncome + totalExpense > 0
                                    ? ((totalExpense / (totalIncome + totalExpense)) * 100).toFixed(1)
                                    : 0}
                                %
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Breakdown - Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Income by Category */}
                {incomeCategoryData.length > 0 && (
                    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Income by Category
                        </h2>

                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={incomeCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {incomeCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="mt-4 space-y-2">
                            {incomeCategoryData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-neutral-700 dark:text-neutral-300">{item.name}</span>
                                    </div>
                                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                        {formatCurrency(item.value)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Expense by Category */}
                {expenseCategoryData.length > 0 && (
                    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Expense by Category
                        </h2>

                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={expenseCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {expenseCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="mt-4 space-y-2">
                            {expenseCategoryData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-neutral-700 dark:text-neutral-300">{item.name}</span>
                                    </div>
                                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                        {formatCurrency(item.value)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Top Spending Categories */}
            {topSpending.length > 0 && (
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        Top Spending Categories
                    </h2>

                    <div className="space-y-3">
                        {topSpending.map(([category, amount], index) => {
                            const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
                            return (
                                <div key={category}>
                                    <div className="flex items-center justify-between text-sm mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                                {index + 1}. {category}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                {percentage.toFixed(1)}%
                                            </span>
                                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                                {formatCurrency(amount)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                        <div
                                            className="bg-red-600 dark:bg-red-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}