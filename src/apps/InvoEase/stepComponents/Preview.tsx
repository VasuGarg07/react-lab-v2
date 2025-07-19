import useInvoiceStore, { useInvoiceCalculations } from '../invoiceStore';

const PreviewSection = () => {
    // Use individual selectors to avoid creating new objects on every render
    const currentDate = useInvoiceStore((state) => state.currentDate);
    const dueDate = useInvoiceStore((state) => state.dueDate);
    const invoiceNumber = useInvoiceStore((state) => state.invoiceNumber);
    const currency = useInvoiceStore((state) => state.currency);
    const billTo = useInvoiceStore((state) => state.billTo);
    const billFrom = useInvoiceStore((state) => state.billFrom);
    const items = useInvoiceStore((state) => state.items);
    const taxRate = useInvoiceStore((state) => state.taxRate);
    const discountRate = useInvoiceStore((state) => state.discountRate);
    const notes = useInvoiceStore((state) => state.notes);

    const { subtotal, taxAmount, discountAmount, total, formatCurrency } = useInvoiceCalculations();

    return (
        <div className="space-y-4">
            {/* Help Text */}
            <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded border border-indigo-200 dark:border-indigo-800">
                👀 <strong>Preview:</strong> This is how your invoice will look. All changes update in real-time.
            </div>

            {/* Invoice Preview */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {/* Preview Header */}
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Invoice Preview
                    </h3>
                </div>

                {/* Invoice Content */}
                <div className="p-4 bg-white dark:bg-gray-800">
                    <div className="max-w-2xl mx-auto">
                        {/* Invoice Header */}
                        <div className="text-center mb-4">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">INVOICE</h1>
                        </div>

                        {/* Invoice Details */}
                        <div className="flex justify-between mb-4 text-sm">
                            <div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    <strong>Date:</strong> {currentDate}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    <strong>Due:</strong> {dueDate || 'Not set'}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-gray-600 dark:text-gray-400">
                                    <strong>Invoice #:</strong> {invoiceNumber}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    <strong>Currency:</strong> {currency}
                                </div>
                            </div>
                        </div>

                        {/* Billing Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Bill To:</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <div>{billTo.name || 'Name not provided'}</div>
                                    <div>{billTo.email || 'Email not provided'}</div>
                                    {billTo.address && (
                                        <div className="whitespace-pre-line">{billTo.address}</div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Bill From:</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <div>{billFrom.name || 'Name not provided'}</div>
                                    <div>{billFrom.email || 'Email not provided'}</div>
                                    {billFrom.address && (
                                        <div className="whitespace-pre-line">{billFrom.address}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-4">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-700">
                                            <th className="text-left p-2 border border-gray-300 dark:border-gray-600 font-semibold">Item</th>
                                            <th className="text-left p-2 border border-gray-300 dark:border-gray-600 font-semibold">Description</th>
                                            <th className="text-center p-2 border border-gray-300 dark:border-gray-600 font-semibold">Qty</th>
                                            <th className="text-right p-2 border border-gray-300 dark:border-gray-600 font-semibold">Price</th>
                                            <th className="text-right p-2 border border-gray-300 dark:border-gray-600 font-semibold">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, idx) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}>
                                                <td className="p-2 border border-gray-300 dark:border-gray-600">
                                                    {item.name || 'Unnamed item'}
                                                </td>
                                                <td className="p-2 border border-gray-300 dark:border-gray-600">
                                                    {item.description || '-'}
                                                </td>
                                                <td className="p-2 border border-gray-300 dark:border-gray-600 text-center">
                                                    {item.quantity}
                                                </td>
                                                <td className="p-2 border border-gray-300 dark:border-gray-600 text-right">
                                                    {formatCurrency(item.price)}
                                                </td>
                                                <td className="p-2 border border-gray-300 dark:border-gray-600 text-right font-medium">
                                                    {formatCurrency(item.quantity * item.price)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end mb-4">
                            <div className="w-64">
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                        <span>{formatCurrency(subtotal)}</span>
                                    </div>
                                    {taxRate > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Tax ({taxRate}%):</span>
                                            <span>{formatCurrency(taxAmount)}</span>
                                        </div>
                                    )}
                                    {discountRate > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Discount ({discountRate}%):</span>
                                            <span>-{formatCurrency(discountAmount)}</span>
                                        </div>
                                    )}
                                    <hr className="border-gray-300 dark:border-gray-600 my-1" />
                                    <div className="flex justify-between font-bold text-base">
                                        <span>Total:</span>
                                        <span className="text-blue-600 dark:text-blue-400">{formatCurrency(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Notes:</h3>
                            <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                {notes || 'Thank you for your business!'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Actions */}
            <div className="flex gap-2 text-xs">
                <div className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800">
                    💡 This preview updates automatically as you make changes above
                </div>
            </div>
        </div>
    );
};

export default PreviewSection;