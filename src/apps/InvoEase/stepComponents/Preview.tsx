import React, { useMemo } from 'react';
import { useInvoice } from '@/apps/InvoEase/InvoiceContext';

const Preview: React.FC = () => {
    const {
        currentDate,
        dueDate,
        invoiceNumber,
        currency,
        billTo,
        billFrom,
        items,
        taxRate,
        discountRate,
        notes,
        currencySymbol,
    } = useInvoice();

    const { subtotal, taxAmount, discountAmount, total } = useMemo(() => {
        const subtotal = items.reduce((sum, item) => sum + Number(item.quantity) * item.price, 0);
        const taxAmount = subtotal * (taxRate / 100);
        const discountAmount = subtotal * (discountRate / 100);
        const total = subtotal + taxAmount - discountAmount;
        return { subtotal, taxAmount, discountAmount, total };
    }, [items, taxRate, discountRate]);

    const formatCurrency = (amount: number) => `${currencySymbol}${amount.toFixed(2)}`;

    return (
        <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-md border border-neutral-200 dark:border-neutral-700 shadow-md p-4 sm:p-6 text-sm">
            <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">Invoice</h2>

            {/* Invoice Header - Stack on mobile, side by side on larger screens */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="mb-4 sm:mb-0">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Date: {currentDate}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Due: {dueDate}</p>
                </div>
                <div className="sm:text-right">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Invoice #: {invoiceNumber}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Currency: {currency}</p>
                </div>
            </div>

            {/* Bill To/From - Stack on mobile, side by side on larger screens */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 mb-6">
                <div className="mb-4 sm:mb-0">
                    <p className="font-semibold mb-1">Bill To:</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{billTo.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{billTo.email}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{billTo.address}</p>
                </div>
                <div className="sm:text-right">
                    <p className="font-semibold mb-1">Bill From:</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{billFrom.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{billFrom.email}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{billFrom.address}</p>
                </div>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-neutral-200 dark:border-neutral-700 min-w-[640px]">
                    <thead>
                        <tr className="bg-neutral-100 dark:bg-neutral-800 text-left">
                            <th className="p-2 font-semibold border border-neutral-200 dark:border-neutral-700">Item</th>
                            <th className="p-2 font-semibold border border-neutral-200 dark:border-neutral-700">Description</th>
                            <th className="p-2 font-semibold border border-neutral-200 dark:border-neutral-700 w-16">Qty</th>
                            <th className="p-2 font-semibold border border-neutral-200 dark:border-neutral-700 w-24">Price</th>
                            <th className="p-2 font-semibold border border-neutral-200 dark:border-neutral-700 w-24">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800'}>
                                <td className="p-2 border border-neutral-200 dark:border-neutral-700">{item.name}</td>
                                <td className="p-2 border border-neutral-200 dark:border-neutral-700">{item.description}</td>
                                <td className="p-2 border border-neutral-200 dark:border-neutral-700 text-center">{item.quantity}</td>
                                <td className="p-2 border border-neutral-200 dark:border-neutral-700 text-right">{formatCurrency(item.price)}</td>
                                <td className="p-2 border border-neutral-200 dark:border-neutral-700 text-right">
                                    {formatCurrency(Number(item.quantity) * item.price)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile-friendly Card View for Items (Visible on small screens only) */}
            <div className="sm:hidden space-y-4 mb-6">
                {items.map((item, idx) => (
                    <div key={idx} className="border border-neutral-200 dark:border-neutral-700 rounded-md p-3 bg-neutral-50 dark:bg-neutral-800">
                        <div className="flex justify-between font-semibold mb-2">
                            <span>{item.name}</span>
                            <span>{formatCurrency(Number(item.quantity) * item.price)}</span>
                        </div>
                        <div className="text-neutral-600 dark:text-neutral-400 mb-2">{item.description}</div>
                        <div className="flex justify-between text-sm">
                            <span>Qty: {item.quantity}</span>
                            <span>Price: {formatCurrency(item.price)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Totals Section */}
            <div className="flex justify-end mb-6">
                <div className="w-full sm:w-auto sm:min-w-[200px]">
                    <div className="grid grid-cols-2 gap-x-4 text-right text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">Subtotal:</span>
                        <span>{formatCurrency(subtotal)}</span>
                        <span className="text-neutral-600 dark:text-neutral-400">Tax ({taxRate}%):</span>
                        <span>{formatCurrency(taxAmount)}</span>
                        <span className="text-neutral-600 dark:text-neutral-400">Discount ({discountRate}%):</span>
                        <span>{formatCurrency(discountAmount)}</span>
                        <hr className="col-span-2 border-t border-neutral-300 dark:border-neutral-700 my-1" />
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            {/* Notes Section */}
            <div>
                <p className="font-semibold mb-1">Notes:</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">{notes || 'Thank you for your business!'}</p>
            </div>
        </div>
    );
};

export default Preview;