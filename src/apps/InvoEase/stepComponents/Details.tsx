import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useInvoice } from '@/apps/InvoEase/InvoiceContext';
import Select from '@/ui/Select';
import { CurrencyOptions } from '@/apps/InvoEase/invoice.utils';

interface FormValues {
    dueDate: string;
    currency: string;
}

interface DetailsProps {
    onValidStep: (isValid: boolean) => void;
}

const Details: React.FC<DetailsProps> = ({ onValidStep }) => {
    const { currentDate, dueDate, setDueDate, invoiceNumber, currency, setCurrency } = useInvoice();

    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDate = today.toISOString().split('T')[0];

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    const {
        control,
        formState: { errors, isValid },
        watch,
    } = useForm<FormValues>({
        defaultValues: {
            dueDate,
            currency,
        },
        mode: 'onChange',
    });

    const watchedDueDate = watch('dueDate');
    const watchedCurrency = watch('currency');

    useEffect(() => {
        setDueDate(watchedDueDate);
    }, [watchedDueDate, setDueDate]);

    useEffect(() => {
        setCurrency(watchedCurrency);
    }, [watchedCurrency, setCurrency]);

    useEffect(() => {
        onValidStep(isValid);
    }, [isValid, onValidStep]);

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <strong>Current Date:</strong> {currentDate}
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <strong>Invoice ID:</strong> {invoiceNumber}
                </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                        Due Date <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        control={control}
                        name="dueDate"
                        rules={{
                            required: 'Due date is required',
                            validate: (value) => {
                                const selected = new Date(value);
                                const now = new Date();
                                now.setHours(0, 0, 0, 0);
                                if (selected <= now) return 'Due date must be after today';
                                if (selected > maxDate) return 'Due date cannot be more than a year from now';
                                return true;
                            },
                        }}
                        render={({ field }) => (
                            <input
                                type="date"
                                {...field}
                                min={minDate}
                                max={maxDateStr}
                                className={`w-full border rounded-md p-2 text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dueDate ? 'border-red-500 ring-red-500/30' : 'border-neutral-300 dark:border-neutral-700'
                                    }`}
                            />
                        )}
                    />
                    {errors.dueDate && (
                        <p className="text-sm text-red-500 mt-1">{errors.dueDate.message}</p>
                    )}
                </div>

                <div className="flex-1">
                    <Controller
                        control={control}
                        name="currency"
                        rules={{ required: 'Currency is required' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Currency"
                                options={CurrencyOptions}
                                error={errors.currency?.message}
                                required
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Details;
