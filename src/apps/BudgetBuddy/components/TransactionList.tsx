import { Edit2, Trash2 } from 'lucide-react';
import CategoryIcon from './CategoryIcon';
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

    const handleDelete = (transaction: Transaction) => {
        openAlertDialog(modal, {
            title: 'Delete Transaction?',
            message: (
                <div className="space-y-1">
                    <p>Are you sure you want to delete this transaction?</p>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {transaction.category} — {formatCurrency(transaction.amount)}
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
                <div className="w-8 h-8 border-2 border-neutral-200 dark:border-neutral-700 border-t-neutral-500 rounded-full animate-spin" />
                <p className="text-xs text-neutral-400 dark:text-neutral-500">Loading...</p>
            </div>
        );
    }

    if (!transactions || transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <p className="text-sm text-neutral-400 dark:text-neutral-500 text-center">{emptyMessage}</p>
            </div>
        );
    }

    const amountClass = (type: string) =>
        type === 'income'
            ? 'text-emerald-600 dark:text-emerald-400 font-medium tracking-tight tabular-nums'
            : 'text-red-600 dark:text-red-400 font-medium tracking-tight tabular-nums';

    return (
        <div className="divide-y divide-neutral-100 dark:divide-neutral-700/60">
            {transactions.map((transaction) => (
                <div
                    key={transaction.id}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-700/20 transition-colors group"
                >
                    <CategoryIcon category={transaction.category} />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                                {transaction.category}
                            </span>
                            {transaction.description && (
                                <span className="text-xs text-neutral-400 dark:text-neutral-500 truncate hidden sm:block">
                                    {transaction.description}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 tabular-nums">
                            {formatDate(transaction.date, 'short')}
                        </p>
                    </div>

                    <span className={`text-sm shrink-0 ${amountClass(transaction.type)}`}>
                        {transaction.type === 'income' ? '+' : '−'}{formatCurrency(transaction.amount)}
                    </span>

                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <button
                            onClick={() => openTransactionForm(modal, 'edit', transaction)}
                            disabled={isDeleting}
                            className="p-1.5 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50"
                        >
                            <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => handleDelete(transaction)}
                            disabled={isDeleting}
                            className="p-1.5 rounded text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}