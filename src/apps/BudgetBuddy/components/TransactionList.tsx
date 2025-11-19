import { Edit2, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import { openTransactionForm } from './TransactionForm';
import { useDeleteTransaction } from '../hooks/useTransactionMutations';
import type { Transaction } from '../helpers/expense.constants';
import { useModal } from '../../../components/ModalContext';
import { openAlertDialog } from '../../../ui/AlertDialog';
import { formatCurrency, formatDate } from '../../../shared/utilities';

interface TransactionListProps {
    transactions: Transaction[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export default function TransactionList({
    transactions,
    isLoading = false,
    emptyMessage = 'No transactions yet',
}: TransactionListProps) {
    const modal = useModal();
    const { mutate: deleteTransaction, isPending: isDeleting } = useDeleteTransaction();

    // Handle delete with confirmation
    const handleDelete = (transaction: Transaction) => {
        openAlertDialog(modal, {
            title: 'Delete Transaction?',
            message: (
                <div className="space-y-1">
                    <p>Are you sure you want to delete this transaction?</p>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {transaction.category} - {formatCurrency(transaction.amount)}
                    </p>
                </div>
            ),
            confirmText: 'Delete',
            onConfirm: () => deleteTransaction(transaction.id),
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-neutral-200 dark:border-neutral-700 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading transactions...</p>
                </div>
            </div>
        );
    }

    // Empty state
    if (!transactions || transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-center">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Desktop: Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-neutral-200 dark:border-neutral-700">
                            <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-150"
                            >
                                {/* Date */}
                                <td className="py-3 px-4 text-sm text-neutral-900 dark:text-neutral-100">
                                    {formatDate(transaction.date, 'short')}
                                </td>

                                {/* Category */}
                                <td className="py-3 px-4">
                                    <CategoryBadge category={transaction.category} />
                                </td>

                                {/* Description */}
                                <td className="py-3 px-4 text-sm text-neutral-600 dark:text-neutral-400">
                                    {transaction.description || '-'}
                                </td>

                                {/* Amount */}
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {transaction.type === 'income' ? (
                                            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                                        )}
                                        <span
                                            className={`text-sm font-semibold ${transaction.type === 'income'
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-red-600 dark:text-red-400'
                                                }`}
                                        >
                                            {transaction.type === 'income' ? '+' : '-'}
                                            {formatCurrency(transaction.amount)}
                                        </span>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => openTransactionForm(modal, 'edit', transaction)}
                                            disabled={isDeleting}
                                            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 disabled:opacity-50"
                                            aria-label="Edit transaction"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(transaction)}
                                            disabled={isDeleting}
                                            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 disabled:opacity-50"
                                            aria-label="Delete transaction"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile: Cards */}
            <div className="md:hidden space-y-3">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                    >
                        {/* Header: Category + Amount */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                                <CategoryBadge category={transaction.category} />
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                                    {formatDate(transaction.date, 'short')}
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="flex items-center justify-end gap-1.5 mb-1">
                                    {transaction.type === 'income' ? (
                                        <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                                    )}
                                </div>
                                <p
                                    className={`text-lg font-bold ${transaction.type === 'income'
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-red-600 dark:text-red-400'
                                        }`}
                                >
                                    {transaction.type === 'income' ? '+' : '-'}
                                    {formatCurrency(transaction.amount)}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        {transaction.description && (
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                {transaction.description}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                            <button
                                onClick={() => openTransactionForm(modal, 'edit', transaction)}
                                disabled={isDeleting}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200 disabled:opacity-50"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(transaction)}
                                disabled={isDeleting}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-950/50 transition-all duration-200 disabled:opacity-50"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}