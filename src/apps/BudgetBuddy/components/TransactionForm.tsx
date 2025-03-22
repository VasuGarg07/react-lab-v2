import React, { useEffect, useState } from 'react';
import { ReceiptText } from 'lucide-react';
import { EXPENSE_TYPES, INCOME_TYPES, Transaction } from '@/apps/BudgetBuddy/helpers/expense.constants';
import { cn } from '@/shared/cn';

interface TransactionFormProps {
    mode: 'add' | 'edit';
    onClose: () => void;
    transaction?: Transaction;
    onAdd: ((transaction: Transaction) => Promise<boolean>);
    onEdit: ((id: string, transaction: Transaction) => Promise<boolean>);
}

const TransactionForm: React.FC<TransactionFormProps> = ({
    mode,
    transaction,
    onClose,
    onAdd,
    onEdit
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense' as 'income' | 'expense',
        category: '',
        date: new Date().getTime(),
        description: ''
    });

    useEffect(() => {
        if (mode === 'edit' && transaction) {
            setFormData({
                title: transaction.title,
                amount: transaction.amount.toString(),
                type: transaction.type,
                category: transaction.category,
                date: transaction.date,
                description: transaction.description || ''
            });
        }
    }, [mode, transaction]);

    const handleChange = (field: keyof typeof formData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleDateChange = (value: string) => {
        if (value) {
            setFormData(prev => ({
                ...prev,
                date: new Date(value).getTime()
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const transactionData = {
                ...formData,
                amount: parseFloat(formData.amount),
                date: formData.date / 1000
            };

            const success = mode === 'add'
                ? await onAdd(transactionData)
                : await onEdit(transaction!.id!, transactionData);

            if (success) {
                onClose();
            }
        } catch (error) {
            console.error('Failed to submit transaction:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyles = "w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 transition duration-200";

    return (
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <ReceiptText size={24} className="text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {mode === 'add' ? 'Add Transaction' : 'Edit Transaction'}
                </h2>
            </div>

            <div className="h-px w-full bg-gray-200 dark:bg-gray-700 mb-4"></div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className={inputStyles}
                        value={formData.title}
                        onChange={handleChange('title')}
                        placeholder="Enter title"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Amount <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            className={inputStyles}
                            value={formData.amount}
                            onChange={handleChange('amount')}
                            placeholder="Enter amount"
                            step="0.01"
                            min="0"
                            max="999999999"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            className={inputStyles}
                            value={new Date(formData.date).toISOString().split('T')[0]}
                            onChange={(e) => handleDateChange(e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="radio"
                                className="form-radio h-5 w-5 text-emerald-600 dark:text-emerald-500 border-gray-300 dark:border-gray-600 focus:ring-emerald-500"
                                name="type"
                                value="expense"
                                checked={formData.type === 'expense'}
                                onChange={() => setFormData(prev => ({ ...prev, type: 'expense', category: '' }))}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Expense</span>
                        </label>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="radio"
                                className="form-radio h-5 w-5 text-emerald-600 dark:text-emerald-500 border-gray-300 dark:border-gray-600 focus:ring-emerald-500"
                                name="type"
                                value="income"
                                checked={formData.type === 'income'}
                                onChange={() => setFormData(prev => ({ ...prev, type: 'income', category: '' }))}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Income</span>
                        </label>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        className={inputStyles}
                        value={formData.category}
                        onChange={handleChange('category')}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        {(formData.type === 'expense' ? EXPENSE_TYPES : INCOME_TYPES).map(category => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <input
                        type="text"
                        className={inputStyles}
                        value={formData.description}
                        onChange={handleChange('description')}
                        placeholder="Enter description (optional)"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 transition duration-200 w-24"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 transition duration-200 w-24",
                            isLoading && "relative"
                        )}
                    >
                        {isLoading ? (
                            <span className="absolute inset-0 flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </span>
                        ) : (
                            mode === 'add' ? 'Add' : 'Update'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TransactionForm;