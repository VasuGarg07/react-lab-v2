import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DollarSign, Calendar, FileText } from 'lucide-react';
import {
    INCOME_CATEGORIES, EXPENSE_CATEGORIES,
    type Transaction, type TransactionType,
} from '../helpers/expense.constants';
import { formatDateForInput } from '../helpers/expense.utils';
import { useAddTransaction, useUpdateTransaction } from '../hooks/useTransactionMutations';
import { useModal, TextInput, Select, LoadingButton } from '@react-lab/ui';

interface TransactionFormData {
    title: string
    amount: string;
    category: string;
    type: TransactionType;
    date: string;
    description: string;
}

interface TransactionFormProps {
    transaction?: Transaction | null;
    mode: 'add' | 'edit';
    defaultType?: TransactionType;
}

export default function TransactionForm({ transaction, mode, defaultType }: TransactionFormProps) {
    const { close } = useModal();
    const { mutate: addTransaction, isPending: isAdding } = useAddTransaction();
    const { mutate: updateTransaction, isPending: isUpdating } = useUpdateTransaction();

    const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<TransactionFormData>({
        defaultValues: {
            title: transaction?.title || '',
            amount: transaction?.amount.toString() || '',
            category: transaction?.category || '',
            type: transaction?.type || defaultType || 'expense',
            date: transaction ? formatDateForInput(transaction.date) : formatDateForInput(new Date()),
            description: transaction?.description || '',
        },
    });

    const transactionType = watch('type');
    const selectedCategory = watch('category');
    const categories = transactionType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    const isPending = isAdding || isUpdating;

    useEffect(() => {
        if (selectedCategory && !(categories as readonly string[]).includes(selectedCategory)) {
            setValue('category', '');
        }
    }, [transactionType, selectedCategory, categories, setValue]);

    const onSubmit = (data: TransactionFormData) => {
        const payload = {
            title: data.title,
            amount: parseFloat(data.amount),
            category: data.category,
            type: data.type,
            date: Math.floor(new Date(data.date).getTime() / 1000),
            description: data.description,
        };

        const onSuccess = () => { close(); reset(); };

        if (mode === 'edit' && transaction) {
            updateTransaction({ id: transaction.id, data: payload }, { onSuccess });
        } else {
            addTransaction(payload, { onSuccess });
        }
    };

    return (
        <div>
            <div className="mb-5">
                <h2 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                    {mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}
                </h2>
                <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-0.5">
                    {mode === 'edit' ? 'Update the details below' : 'Fill in the details to record a transaction'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
                        Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {(['income', 'expense'] as TransactionType[]).map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setValue('type', type)}
                                disabled={isPending}
                                className={`py-2.5 px-4 rounded-full text-sm font-medium transition-all border ${transactionType === type
                                        ? type === 'income'
                                            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700'
                                            : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
                                        : 'bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                                    } disabled:opacity-50 capitalize`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Title is required' }}
                    render={({ field }) => (
                        <TextInput
                            {...field}
                            label="Title"
                            placeholder="Enter a title"
                            error={errors.title?.message}
                            disabled={isPending}
                        />
                    )}
                />

                <Controller
                    name="amount"
                    control={control}
                    rules={{
                        required: 'Amount is required',
                        validate: value => {
                            const num = parseFloat(value);
                            return (!isNaN(num) && num > 0) || 'Amount must be greater than 0';
                        },
                    }}
                    render={({ field }) => (
                        <TextInput
                            {...field}
                            label="Amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            error={errors.amount?.message}
                            icon={<DollarSign className="w-4 h-4" />}
                            disabled={isPending}
                        />
                    )}
                />

                <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Category"
                            options={categories.map(cat => ({ label: cat, value: cat }))}
                            error={errors.category?.message}
                            placeholder="Select a category"
                            disabled={isPending}
                            required
                        />
                    )}
                />

                <Controller
                    name="date"
                    control={control}
                    rules={{ required: 'Date is required' }}
                    render={({ field }) => (
                        <TextInput
                            {...field}
                            label="Date"
                            type="date"
                            error={errors.date?.message}
                            icon={<Calendar className="w-4 h-4" />}
                            disabled={isPending}
                        />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                                Description <span className="text-neutral-300 dark:text-neutral-600 normal-case">(optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute top-3 left-3 text-neutral-300 dark:text-neutral-600 pointer-events-none">
                                    <FileText className="w-4 h-4" />
                                </span>
                                <textarea
                                    {...field}
                                    placeholder="Add a note..."
                                    rows={3}
                                    disabled={isPending}
                                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-sm border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-300 dark:placeholder:text-neutral-600 border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10 focus:border-neutral-400 dark:focus:border-neutral-500 disabled:opacity-50 resize-none transition-colors"
                                />
                            </div>
                        </div>
                    )}
                />

                <div className="flex gap-3 pt-1">
                    <button
                        type="button"
                        onClick={() => { close(); reset(); }}
                        disabled={isPending}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <LoadingButton
                        type="submit"
                        isLoading={isPending}
                        loadingText={mode === 'edit' ? 'Updating...' : 'Adding...'}
                        className="flex-1"
                        disabled={isPending}
                    >
                        {mode === 'edit' ? 'Update' : 'Add'} Transaction
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
}

export const openTransactionForm = (
    modal: ReturnType<typeof useModal>,
    mode: 'add' | 'edit',
    transaction?: Transaction | null,
    defaultType?: TransactionType
) => {
    modal.open(<TransactionForm mode={mode} transaction={transaction} defaultType={defaultType} />);
};