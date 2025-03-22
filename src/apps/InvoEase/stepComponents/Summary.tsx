import React, { useMemo, useCallback, useEffect } from 'react';
import { useInvoice } from '@/apps/InvoEase/InvoiceContext';

const InvoiceSummary: React.FC<{ onValidStep: (isValid: boolean) => void }> = ({ onValidStep }) => {
    const {
        items,
        taxRate,
        setTaxRate,
        discountRate,
        setDiscountRate,
        notes,
        setNotes,
        currencySymbol
    } = useInvoice();

    const { subtotal, taxAmount, discountAmount, total } = useMemo(() => {
        const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const taxAmount = subtotal * (taxRate / 100);
        const discountAmount = subtotal * (discountRate / 100);
        const total = subtotal + taxAmount - discountAmount;

        return { subtotal, taxAmount, discountAmount, total };
    }, [items, taxRate, discountRate]);

    const handleTaxRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newTaxRate = Number(e.target.value);
        setTaxRate(newTaxRate);
    }, [setTaxRate]);

    const handleDiscountRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newDiscountRate = Number(e.target.value);
        setDiscountRate(newDiscountRate);
    }, [setDiscountRate]);

    const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    }, [setNotes]);

    useEffect(() => {
        onValidStep(true); // always valid
    }, [onValidStep]);

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Tax & Discount */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                        Tax Rate (%)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={taxRate}
                            onChange={handleTaxRateChange}
                            min={0}
                            max={100}
                            step={0.1}
                            className="w-full p-2 pr-10 rounded-md border text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-2.5 text-sm text-neutral-500 dark:text-neutral-400">%</span>
                    </div>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                        Discount Rate (%)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={discountRate}
                            onChange={handleDiscountRateChange}
                            min={0}
                            max={100}
                            step={0.1}
                            className="w-full p-2 pr-10 rounded-md border text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-2.5 text-sm text-neutral-500 dark:text-neutral-400">%</span>
                    </div>
                </div>
            </div>

            <hr className="border-t border-neutral-300 dark:border-neutral-700" />

            {/* Totals */}
            <div className="space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax Amount:</span>
                    <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Discount Amount:</span>
                    <span>{currencySymbol}{discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-base mt-2">
                    <span>Total:</span>
                    <span>{currencySymbol}{total.toFixed(2)}</span>
                </div>
            </div>

            <hr className="border-t border-neutral-300 dark:border-neutral-700" />

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                    Notes
                </label>
                <textarea
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Thanks for your business!"
                    rows={3}
                    className="w-full p-2 rounded-md border text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

export default React.memo(InvoiceSummary);