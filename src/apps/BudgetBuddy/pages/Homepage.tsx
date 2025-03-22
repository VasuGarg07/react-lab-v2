import { useBudget } from '@/apps/BudgetBuddy/BudgetContext';
import { useAuth } from '@/auth/AuthProvider';
import { CSVDownloader } from '@/shared/CSVDownloader';
import {
    ArrowDownCircle,
    ArrowUpCircle,
    Clock,
    Download,
    History,
    PieChart,
    Plus,
    User2
} from 'lucide-react';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const {
        transactions,
        totalIncome,
        totalExpenses,
        remainingBalance,
        handleAddTransaction,
    } = useBudget();

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDownload = () => {
        try {
            const downloader = new CSVDownloader(transactions);
            const fileName = `Expense Report - ${new Date().toDateString()}`;
            downloader.parseData();
            downloader.download(fileName);
        } catch (error) {
            console.error('Failed to download CSV:', error);
            // TODO: You might want to add proper error handling/notification here
        }
    };

    const recentTransactions = transactions.slice(0, 5);

    return (
        <div className="p-3">
            {/* Header Section */}
            <div className="flex items-center gap-1.5 border-b-2 border-lime-500 pb- mb-3">
                <User2 size={28} className="text-lime-500" />
                <h2 className="text-2xl font-semibold font-['Montserrat',sans-serif] tracking-wide uppercase text-gray-800 dark:text-gray-100">
                    Welcome, {user?.username}
                </h2>
            </div>

            {/* Main Grid */}
            <div className="grid gap-3">
                {/* Summary Cards */}
                <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Balance Card */}
                    <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">
                            CURRENT BALANCE
                        </p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            ₹{remainingBalance.toLocaleString()}
                        </h3>
                        <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-1.5"></div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total available funds
                        </p>
                    </div>

                    {/* Income Card */}
                    <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">
                            TOTAL INCOME
                        </p>
                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                            ₹{totalIncome.toLocaleString()}
                        </h3>
                        <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-1.5"></div>
                        <div className="flex items-center gap-0.5 text-green-600 dark:text-green-400">
                            <ArrowUpCircle size={16} />
                            <p className="text-sm">This month's earnings</p>
                        </div>
                    </div>

                    {/* Expenses Card */}
                    <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">
                            TOTAL EXPENSES
                        </p>
                        <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                            ₹{totalExpenses.toLocaleString()}
                        </h3>
                        <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-1.5"></div>
                        <div className="flex items-center gap-0.5 text-red-600 dark:text-red-400">
                            <ArrowDownCircle size={16} />
                            <p className="text-sm">This month's spending</p>
                        </div>
                    </div>

                    {/* Add Transaction Card */}
                    <div
                        className="bg-purple-600 hover:bg-purple-700 rounded-xl p-4 cursor-pointer transition-colors shadow-sm flex flex-col justify-center items-center gap-1 text-white"
                        onClick={handleAddTransaction}
                    >
                        <Plus size={24} />
                        <h3 className="text-xl font-bold">Add Transaction</h3>
                        <p className="text-sm text-center">Record new income or expense</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Recent Transactions (2/3 width) */}
                    <div className="md:col-span-2 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Recent Transactions</h3>
                                <button
                                    className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100"
                                    onClick={() => navigate('/budget-buddy/overview')}
                                >
                                    View All
                                    <History size={16} />
                                </button>
                            </div>
                            <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>
                            <div className="mt-2">
                                {recentTransactions.length > 0 ? (
                                    recentTransactions.map((transaction) => (
                                        <div
                                            key={transaction.id}
                                            className="flex justify-between items-center py-1.5 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                                        >
                                            <div>
                                                <p className="text-gray-800 dark:text-gray-200">{transaction.title}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {transaction.category}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-medium ${transaction.type === 'income'
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString()}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(transaction.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                                        No recent transactions
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Monthly Overview (1/3 width) */}
                    <div className="md:col-span-1 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                                Monthly Overview
                            </h3>
                            <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>
                            <div className="mt-3 mb-2">
                                {/* Income Progress */}
                                <div className="mb-2">
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Income</p>
                                        <p className="text-sm text-green-600 dark:text-green-400">
                                            {((totalIncome / (totalIncome + totalExpenses || 1)) * 100).toFixed(0)}%
                                        </p>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-600 rounded-full"
                                            style={{ width: `${(totalIncome / (totalIncome + totalExpenses || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Expenses Progress */}
                                <div className="mb-2">
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Expenses</p>
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {((totalExpenses / (totalIncome + totalExpenses || 1)) * 100).toFixed(0)}%
                                        </p>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-600 rounded-full"
                                            style={{ width: `${(totalExpenses / (totalIncome + totalExpenses || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Statistics Card */}
                    <div
                        className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                        onClick={() => navigate('/budget-buddy/statistics')}
                    >
                        <div className="flex items-center gap-4">
                            <PieChart size={24} className="text-lime-500" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Statistics</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    View detailed insights
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Card */}
                    <div
                        className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                        onClick={() => navigate('/budget-buddy/timeline')}
                    >
                        <div className="flex items-center gap-4">
                            <Clock size={24} className="text-lime-500" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Timeline</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Track your progress
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Generate Report Card */}
                    <div
                        className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                        onClick={handleDownload}
                    >
                        <div className="flex items-center gap-4">
                            <Download size={24} className="text-lime-500" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Generate Report</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Export transactions as CSV
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;