import { Edit2, Trash2, Receipt } from 'lucide-react';
import CategoryIcon from './CategoryIcon';
import { openTransactionForm } from './TransactionForm';
import { useDeleteTransaction } from '../hooks/useTransactionMutations';
import type { Transaction } from '../helpers/expense.constants';
import { useModal, openAlertDialog } from '@react-lab/ui';
import { formatCurrency, formatDate } from '@react-lab/shared';

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

    const handleDelete = (transaction: Transaction) => {
        openAlertDialog(modal, {
            title: 'Delete Transaction?',
            message: (
                <div className="space-y-1">
                    <p>Are you sure you want to delete this transaction?</p>
                    <p className="font-semibold text-pitch">
                        {transaction.title || transaction.category} — {formatCurrency(transaction.amount)}
                    </p>
                </div>
            ),
            confirmText: 'Delete',
            onConfirm: () => deleteTransaction(transaction.id),
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-3 py-16">
                <div className="w-8 h-8 border-2 border-pitch-100 border-t-paprika rounded-full animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest text-pitch-400">Loading</p>
            </div>
        );
    }

    if (!transactions || transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-pitch-50 grid place-items-center mb-3">
                    <Receipt className="w-5 h-5 text-pitch-300" strokeWidth={2} />
                </div>
                <p className="text-sm font-medium text-pitch-400 max-w-xs">{emptyMessage}</p>
            </div>
        );
    }

    const amountClass = (type: string) =>
        type === 'income' ? 'text-emerald' : 'text-scarlet';

    return (
        <div className="divide-y divide-pitch-100">
            {transactions.map((transaction) => {
                const primary = transaction.title || transaction.category;
                return (
                    <div
                        key={transaction.id}
                        className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-5 py-3.5 hover:bg-pitch-50/60 transition-colors group"
                    >
                        <CategoryIcon category={transaction.category} />

                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-bold tracking-tight text-pitch truncate">{primary}</span>
                                {transaction.title && (
                                    <span className="text-xs text-pitch-300 truncate hidden sm:block">{transaction.category}</span>
                                )}
                            </div>
                            <p className="text-xs text-pitch-400 mt-0.5 tabular-nums">
                                {formatDate(transaction.date, 'short')}
                                {transaction.description && <span className="hidden sm:inline"> · {transaction.description}</span>}
                            </p>
                        </div>

                        <span className={`text-sm font-black tracking-tight tabular-nums shrink-0 ml-auto ${amountClass(transaction.type)}`}>
                            {transaction.type === 'income' ? '+' : '−'}{formatCurrency(transaction.amount)}
                        </span>

                        {/* Actions: always visible on touch (no hover); reveal-on-hover only on sm+ pointer devices */}
                        <div className="flex items-center gap-0.5 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-opacity">
                            <button
                                onClick={() => openTransactionForm(modal, 'edit', transaction)}
                                disabled={isDeleting}
                                aria-label="Edit transaction"
                                className="p-2 sm:p-1.5 rounded-lg text-pitch-400 hover:text-pitch hover:bg-pitch-100 transition-colors disabled:opacity-50"
                            >
                                <Edit2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                            </button>
                            <button
                                onClick={() => handleDelete(transaction)}
                                disabled={isDeleting}
                                aria-label="Delete transaction"
                                className="p-2 sm:p-1.5 rounded-lg text-pitch-400 hover:text-scarlet hover:bg-scarlet/10 transition-colors disabled:opacity-50"
                            >
                                <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
