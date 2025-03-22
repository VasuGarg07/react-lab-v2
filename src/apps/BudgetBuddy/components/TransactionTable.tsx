import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Edit2, Trash2 } from 'lucide-react';
import { useBudget } from '@/apps/BudgetBuddy/BudgetContext';
import { formatDate, Transaction } from '@/apps/BudgetBuddy/helpers/expense.constants';
import { cn } from '@/shared/cn';

interface TransactionTableProps {
    transactions: Transaction[];
}

const columnConfig = {
    title: { width: '20%', align: 'left' as const },
    amount: { width: '11%', align: 'right' as const },
    type: { width: '6%', align: 'center' as const },
    category: { width: '16%', align: 'left' as const },
    date: { width: '12%', align: 'center' as const },
    description: { width: '24%', align: 'left' as const },
    actions: { width: '11%', align: 'center' as const },
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    const { deleteTransaction, handleEditTransaction } = useBudget();

    const onDelete = (id?: string) => {
        if (!id) return;
        try {
            deleteTransaction(id);
        } catch (error) {
            // Error handling
        }
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto bg-white dark:bg-zinc-900 shadow-sm">
            <table className="w-full min-w-[900px] table-fixed">
                <thead className="sticky top-0 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th style={{ width: columnConfig.title.width }} className={`p-3 font-semibold text-left text-sm`}>Title</th>
                        <th style={{ width: columnConfig.amount.width }} className={`p-3 font-semibold text-right text-sm`}>Amount</th>
                        <th style={{ width: columnConfig.type.width }} className={`p-3 font-semibold text-center text-sm`}>Type</th>
                        <th style={{ width: columnConfig.category.width }} className={`p-3 font-semibold text-left text-sm`}>Category</th>
                        <th style={{ width: columnConfig.date.width }} className={`p-3 font-semibold text-center text-sm`}>Date</th>
                        <th style={{ width: columnConfig.description.width }} className={`p-3 font-semibold text-left text-sm`}>Description</th>
                        <th style={{ width: columnConfig.actions.width }} className={`p-3 font-semibold text-center text-sm`}>Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.map((transaction) => (
                        <tr
                            key={transaction.id}
                            className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-150"
                        >
                            <td className="p-3 text-sm text-gray-800 dark:text-gray-200 truncate">
                                {transaction.title}
                            </td>
                            <td className={cn(
                                "p-3 text-sm text-right whitespace-nowrap font-medium",
                                transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            )}>
                                ₹ {Math.abs(transaction.amount).toFixed(2)}
                            </td>
                            <td className="p-3 text-center">
                                {transaction.type === 'income' ? (
                                    <ArrowUpCircle size={20} className="text-green-600 dark:text-green-400 inline" />
                                ) : (
                                    <ArrowDownCircle size={20} className="text-red-600 dark:text-red-400 inline" />
                                )}
                            </td>
                            <td className="p-3 text-sm text-gray-800 dark:text-gray-200 truncate">
                                {transaction.category}
                            </td>
                            <td className="p-3 text-sm text-center text-gray-800 dark:text-gray-200">
                                {formatDate(transaction.date)}
                            </td>
                            <td className="p-3 text-sm text-gray-800 dark:text-gray-200 truncate">
                                {transaction.description || '- NA -'}
                            </td>
                            <td className="p-3 text-center">
                                <button
                                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-300 transition-colors inline-flex items-center justify-center mr-1"
                                    onClick={() => handleEditTransaction(transaction)}
                                    aria-label="Edit transaction"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors inline-flex items-center justify-center"
                                    onClick={() => onDelete(transaction.id)}
                                    aria-label="Delete transaction"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {transactions.length === 0 && (
                        <tr>
                            <td colSpan={7} className="p-4 text-center text-gray-500 dark:text-gray-400">
                                No transactions found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;