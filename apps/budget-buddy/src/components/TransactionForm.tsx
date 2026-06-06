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

// Steer the shared inputs (default neutral + blue focus ring) onto the BudgetBuddy palette.
const INPUT_CLS = 'rounded-xl! border-pitch-200! focus:border-paprika! focus:ring-paprika/20!';
const LABEL_CLS = 'text-xs! font-bold! text-pitch-500! uppercase tracking-widest';

interface TransactionFormData {
    title: string;
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
                <h2 className="text-xl font-black tracking-tight text-pitch leading-none">
                    {mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}
                </h2>
                <p className="text-sm text-pitch-400 mt-1.5">
                    {mode === 'edit' ? 'Update the details below.' : 'Record a new income or expense.'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-pitch-500 uppercase tracking-widest mb-2">
                        Type
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-pitch-50 border border-pitch-100">
                        {(['income', 'expense'] as TransactionType[]).map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setValue('type', type)}
                                disabled={isPending}
                                className={`py-2 px-4 rounded-lg text-sm font-bold transition-all capitalize ${transactionType === type
                                    ? type === 'income'
                                        ? 'bg-white text-emerald shadow-sm'
                                        : 'bg-white text-scarlet shadow-sm'
                                    : 'text-pitch-400 hover:text-pitch'
                                } disabled:opacity-50`}
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
                            labelClassName={LABEL_CLS}
                            inputClassName={INPUT_CLS}
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
                            labelClassName={LABEL_CLS}
                            inputClassName={INPUT_CLS}
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
                            className={INPUT_CLS}
                            labelClassName={LABEL_CLS}
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
                            labelClassName={LABEL_CLS}
                            inputClassName={INPUT_CLS}
                        />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-pitch-500 uppercase tracking-widest">
                                Description <span className="text-pitch-300 normal-case font-medium">(optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute top-3 left-3 text-pitch-300 pointer-events-none">
                                    <FileText className="w-4 h-4" />
                                </span>
                                <textarea
                                    {...field}
                                    placeholder="Add a note..."
                                    rows={3}
                                    disabled={isPending}
                                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border bg-white text-pitch placeholder:text-pitch-300 border-pitch-100 focus:outline-none focus:ring-2 focus:ring-paprika/20 focus:border-paprika/50 disabled:opacity-50 resize-none transition-colors"
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
                        className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl border border-pitch-200 text-pitch-500 hover:bg-pitch-50 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <LoadingButton
                        type="submit"
                        isLoading={isPending}
                        loadingText={mode === 'edit' ? 'Updating...' : 'Adding...'}
                        className="flex-1 rounded-xl! font-bold! bg-pitch! hover:bg-pitch-700! text-lavender! focus:ring-paprika/30!"
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
