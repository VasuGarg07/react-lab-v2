import React, { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useInvoice } from '@/apps/InvoEase/InvoiceContext';

interface BillingData {
    name: string;
    email: string;
    address: string;
}

interface BillingSectionProps {
    title: string;
    control: any;
    errors: any;
    fieldPrefix: 'billTo' | 'billFrom';
}

const BillingSection: React.FC<BillingSectionProps> = ({ title, control, errors, fieldPrefix }) => (
    <div className="w-full space-y-4 dark:text-neutral-50">
        <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2>

        <div>
            <label className="block text-sm font-medium mb-1 text-neutral-800">Full Name</label>
            <Controller
                name={`${fieldPrefix}.name`}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-neutral-800 dark:text-neutral-50 bg-white dark:bg-neutral-700"
                        placeholder="Enter full name"
                    />
                )}
            />
            {errors?.[fieldPrefix]?.name && (
                <p className="text-sm text-red-500 mt-1">{errors[fieldPrefix].name.message}</p>
            )}
        </div>

        <div>
            <label className="block text-sm font-medium mb-1 text-neutral-800">Email Address</label>
            <Controller
                name={`${fieldPrefix}.email`}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-neutral-800 dark:text-neutral-50 bg-white dark:bg-neutral-700"
                        placeholder="Enter email address"
                    />
                )}
            />
            {errors?.[fieldPrefix]?.email && (
                <p className="text-sm text-red-500 mt-1">{errors[fieldPrefix].email.message}</p>
            )}
        </div>

        <div>
            <label className="block text-sm font-medium mb-1 text-neutral-800">Billing Address (Optional)</label>
            <Controller
                name={`${fieldPrefix}.address`}
                control={control}
                render={({ field }) => (
                    <textarea
                        {...field}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-neutral-800 dark:text-neutral-50 bg-white dark:bg-neutral-700"
                        placeholder="Enter billing address (optional)"
                        rows={3}
                    />
                )}
            />
        </div>
    </div>
);

const BillingInfo: React.FC<{ onValidStep: (isValid: boolean) => void }> = ({ onValidStep }) => {
    const { billTo, setBillTo, billFrom, setBillFrom } = useInvoice();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<{ billTo: BillingData; billFrom: BillingData }>({
        defaultValues: { billTo, billFrom },
        mode: 'onChange',
    });

    // Watch for live changes to push updates
    const watchedBillTo = useWatch({ control, name: 'billTo' });
    const watchedBillFrom = useWatch({ control, name: 'billFrom' });

    useEffect(() => {
        setBillTo(watchedBillTo);
        setBillFrom(watchedBillFrom);
    }, [watchedBillTo, watchedBillFrom, setBillTo, setBillFrom]);

    useEffect(() => {
        onValidStep(isValid);
    }, [isValid, onValidStep]);

    return (
        <form
            onSubmit={handleSubmit(() => { })}
            className="w-full flex flex-col md:flex-row gap-6 justify-between"
        >
            <div className="w-full md:w-1/2">
                <BillingSection title="Bill to:" control={control} errors={errors} fieldPrefix="billTo" />
            </div>
            <div className="w-full md:w-1/2">
                <BillingSection title="Bill from:" control={control} errors={errors} fieldPrefix="billFrom" />
            </div>
        </form>
    );
};

export default BillingInfo;