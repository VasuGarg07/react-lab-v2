import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DollarSign, Calendar, FileText } from 'lucide-react';
import {
    INCOME_CATEGORIES,
    EXPENSE_CATEGORIES,
    type Transaction,
    type TransactionType,
} from '../helpers/expense.constants';
import { formatDateForInput } from '../helpers/expense.utils';
import { useAddTransaction, useUpdateTransaction } from '../hooks/useTransactionMutations';
import { useModal } from '../../../components/ModalContext';
import TextInput from '../../../ui/TextInput';
import Select from '../../../ui/Select';
import LoadingButton from '../../../ui/LoadingButton';

interface TransactionFormData {
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

    // Mutations
    const { mutate: addTransaction, isPending: isAdding } = useAddTransaction();
    const { mutate: updateTransaction, isPending: isUpdating } = useUpdateTransaction();

    // React Hook Form
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<TransactionFormData>({
        defaultValues: {
            amount: transaction?.amount.toString() || '',
            category: transaction?.category || '',
            type: transaction?.type || defaultType || 'expense',
            date: transaction ? formatDateForInput(transaction.date) : formatDateForInput(new Date()),
            description: transaction?.description || '',
        },
    });

    const transactionType = watch('type');
    const selectedCategory = watch('category');

    // Get categories based on type
    const categories = transactionType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    // Reset category when type changes if current category is invalid
    useEffect(() => {
        if (selectedCategory && !categories.includes(selectedCategory as any)) {
            setValue('category', '');
        }
    }, [transactionType, selectedCategory, categories, setValue]);

    // Handle type toggle
    const handleTypeChange = (type: TransactionType) => {
        setValue('type', type);
    };

    // Handle submit
    const onSubmit = (data: TransactionFormData) => {
        const payload = {
            amount: parseFloat(data.amount),
            category: data.category,
            type: data.type,
            date: data.date,
            description: data.description,
        };

        if (mode === 'edit' && transaction) {
            updateTransaction(
                { id: transaction.id, data: payload },
                {
                    onSuccess: () => {
                        close();
                        reset();
                    },
                }
            );
        } else {
            addTransaction(payload, {
                onSuccess: () => {
                    close();
                    reset();
                },
            });
        }
    };

    const isPending = isAdding || isUpdating;

    return (
        <div>
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {mode === 'edit'
                        ? 'Update transaction details below'
                        : 'Fill in the details to add a new transaction'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Type Toggle */}
                <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => handleTypeChange('income')}
                            disabled={isPending}
                            className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${transactionType === 'income'
                                ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500'
                                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-750'
                                } disabled:opacity-50`}
                        >
                            Income
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTypeChange('expense')}
                            disabled={isPending}
                            className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${transactionType === 'expense'
                                ? 'bg-red-600 dark:bg-red-500 text-white border-red-600 dark:border-red-500'
                                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-750'
                                } disabled:opacity-50`}
                        >
                            Expense
                        </button>
                    </div>
                </div>

                {/* Amount */}
                <Controller
                    name="amount"
                    control={control}
                    rules={{
                        required: 'Amount is required',
                        validate: (value) => {
                            const num = parseFloat(value);
                            if (isNaN(num) || num <= 0) {
                                return 'Amount must be greater than 0';
                            }
                            return true;
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

                {/* Category */}
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Category"
                            options={categories.map((cat) => ({ label: cat, value: cat }))}
                            error={errors.category?.message}
                            placeholder="Select a category"
                            disabled={isPending}
                            required
                        />
                    )}
                />

                {/* Date */}
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

                {/* Description (Optional) */}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                Description <span className="text-neutral-400">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-start pt-3 pl-3 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                                    <FileText className="w-4 h-4" />
                                </span>
                                <textarea
                                    {...field}
                                    placeholder="Add a note..."
                                    rows={3}
                                    disabled={isPending}
                                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border transition-all duration-200 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                />
                            </div>
                        </div>
                    )}
                />

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            close();
                            reset();
                        }}
                        disabled={isPending}
                        className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

/**
 * Helper function to open transaction form in modal
 */
export const openTransactionForm = (
    modal: ReturnType<typeof useModal>,
    mode: 'add' | 'edit',
    transaction?: Transaction | null,
    defaultType?: TransactionType
) => {
    modal.open(
        <TransactionForm
            mode={mode}
            transaction={transaction}
            defaultType={defaultType}
        />
    );
};