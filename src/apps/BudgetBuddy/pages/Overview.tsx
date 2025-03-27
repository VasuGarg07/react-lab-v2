import React, { useState } from 'react';
import { AlertTriangle, Download, History, Plus, Trash2 } from 'lucide-react';
import { CSVDownloader } from '@/shared/CSVDownloader';
import { useBudget } from '@/apps/BudgetBuddy/BudgetContext';
import TransactionTable from '@/apps/BudgetBuddy/components/TransactionTable';

const Overview: React.FC = () => {
    const { transactions, loading, error, handleAddTransaction, clearAllTransactions } = useBudget();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleClearAll = async () => {
        await clearAllTransactions();
        setShowConfirmDialog(false);
    };

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

    if (error && !transactions.length) {
        return (
            <div className="p-3">
                <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg shadow-sm">
                    {error}
                </div>
            </div>
        );
    }

    if (!transactions.length) {
        return (
            <div className="p-3">
                <div className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm">
                    No transactions found. Add some transactions to see your balance timeline.
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="p-3">
                {/* Header */}
                <div className="flex items-center gap-1.5 border-b-2 border-lime-500 pb-2 mb-3">
                    <History size={28} className="text-lime-500" />
                    <h2 className="text-2xl font-semibold font-['Montserrat',sans-serif] tracking-wide uppercase text-gray-800 dark:text-gray-100">
                        Overview
                    </h2>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 mb-3">
                    <button
                        onClick={handleDownload}
                        className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 backdrop-blur border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 transition-all shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 text-sm sm:text-base w-full sm:w-auto"
                    >
                        <Download size={16} />
                        <span>Download</span>
                    </button>

                    <button
                        onClick={handleAddTransaction}
                        className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 text-sm sm:text-base w-full sm:w-auto order-first sm:order-none mb-2 sm:mb-0"
                    >
                        <Plus size={16} />
                        <span>Add Transaction</span>
                    </button>

                    <button
                        onClick={() => setShowConfirmDialog(true)}
                        className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 backdrop-blur border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 text-sm sm:text-base w-full sm:w-auto"
                    >
                        <Trash2 size={16} />
                        <span>Clear All</span>
                    </button>
                </div>

                {/* Transaction Table */}
                <TransactionTable transactions={transactions} />
            </div>

            {/* Confirmation Modal */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-w-md w-full overflow-hidden animate-fade-in">
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="text-red-600 dark:text-red-400" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Warning!</h3>
                            </div>
                            <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-2"></div>
                            <p className="text-gray-600 dark:text-gray-300 my-3">
                                Are you sure you want to clear all transactions? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowConfirmDialog(false)}
                                    className="px-3 py-1.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleClearAll}
                                    className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Overview;