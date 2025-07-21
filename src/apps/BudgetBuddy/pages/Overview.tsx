import TransactionForm from '@/apps/BudgetBuddy/components/TransactionForm';
import TransactionTable from '@/apps/BudgetBuddy/components/TransactionTable';
import { useAddTransaction, useClearAllTransactions, useTransactions } from '@/apps/BudgetBuddy/helpers/expense.service';
import { CSVDownloader } from '@/shared/CSVDownloader';
import AlertDialog from '@/ui/AlertDialog';
import Dialog from '@/ui/Dialog';
import { Download, History, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

const Overview: React.FC = () => {
    const { data: transactions, isLoading, isError } = useTransactions();
    const addMutation = useAddTransaction();
    const clearMutation = useClearAllTransactions();

    const [showAddDialog, setShowAddDialog] = useState(false);

    const handleClearAll = () => {
        clearMutation.mutate();
    };

    const handleDownload = () => {
        try {
            const downloader = new CSVDownloader(transactions);
            const fileName = `Expense Report - ${new Date().toDateString()}`;
            downloader.parseData();
            downloader.download(fileName);
        } catch (error) {
            console.error('Failed to download CSV:', error);
        }
    };

    const handleAddTransaction = async (transaction: any) => {
        try {
            await addMutation.mutateAsync(transaction);
            setShowAddDialog(false);
            return true;
        } catch (error) {
            return false;
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-54px)] p-3">
                <div className="w-12 h-12 relative">
                    <div className="absolute inset-0 border-4 border-lime-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-lime-500 rounded-full animate-spin border-t-transparent"></div>
                </div>
            </div>
        );
    }

    if (isError && !transactions.length) {
        return (
            <div className="p-3">
                <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg shadow-sm">
                    Failed to load transactions. Please try again.
                </div>
            </div>
        );
    }

    if (!transactions.length) {
        return (
            <div className="p-3">
                <div className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm">
                    No transactions found. Add some transactions to see your overview.
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
                        onClick={() => setShowAddDialog(true)}
                        className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 text-sm sm:text-base w-full sm:w-auto order-first sm:order-none mb-2 sm:mb-0"
                    >
                        <Plus size={16} />
                        <span>Add Transaction</span>
                    </button>

                    <AlertDialog
                        trigger={
                            <button
                                className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 backdrop-blur border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 text-sm sm:text-base w-full sm:w-auto"
                                disabled={clearMutation.isPending}
                            >
                                <Trash2 size={16} />
                                <span>{clearMutation.isPending ? 'Clearing...' : 'Clear All'}</span>
                            </button>
                        }
                        title="Clear All Transactions"
                        message="Are you sure you want to clear all transactions? This action cannot be undone."
                        onConfirm={handleClearAll}
                        confirmLabel="Clear All"
                        cancelLabel="Cancel"
                    />
                </div>

                {/* Transaction Table */}
                <TransactionTable transactions={transactions} />
            </div>

            {/* Add Transaction Dialog */}
            <Dialog
                open={showAddDialog}
                onClose={(open) => !open && setShowAddDialog(false)}
                size="md"
                title="Add Transaction"
            >
                <TransactionForm
                    mode="add"
                    onClose={() => setShowAddDialog(false)}
                    onAdd={handleAddTransaction}
                    onEdit={async () => false} // Not used in add mode
                />
            </Dialog>
        </>
    );
};

export default Overview;