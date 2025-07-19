import { useInvoiceSummary, useInvoiceCalculations } from '../invoiceStore';

const SummarySection = () => {
    const { taxRate, discountRate, notes, setTaxRate, setDiscountRate, setNotes } = useInvoiceSummary();
    const { subtotal, taxAmount, discountAmount, total, formatCurrency } = useInvoiceCalculations();

    return (
        <div className="space-y-4">
            {/* Help Text */}
            <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                🧮 <strong>Summary:</strong> Adjust tax and discount rates as needed. All calculations are done automatically.
            </div>

            {/* Tax & Discount Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tax Rate */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                        Tax Rate (%)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                            min="0"
                            max="100"
                            step="0.1"
                            className="w-full pr-8 border rounded p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-2 top-2 text-sm text-gray-500 dark:text-gray-400">%</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Tax amount: {formatCurrency(taxAmount)}
                    </p>
                </div>

                {/* Discount Rate */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                        Discount Rate (%)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={discountRate}
                            onChange={(e) => setDiscountRate(parseFloat(e.target.value) || 0)}
                            min="0"
                            max="100"
                            step="0.1"
                            className="w-full pr-8 border rounded p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-2 top-2 text-sm text-gray-500 dark:text-gray-400">%</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Discount amount: -{formatCurrency(discountAmount)}
                    </p>
                </div>
            </div>

            {/* Calculation Breakdown */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Invoice Totals
                </h3>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                        <span className="text-gray-800 dark:text-gray-200">{formatCurrency(subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                            Tax ({taxRate}%):
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">+{formatCurrency(taxAmount)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                            Discount ({discountRate}%):
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">-{formatCurrency(discountAmount)}</span>
                    </div>

                    <hr className="border-gray-300 dark:border-gray-600 my-2" />

                    <div className="flex justify-between font-semibold text-base">
                        <span className="text-gray-800 dark:text-gray-200">Total:</span>
                        <span className="text-blue-600 dark:text-blue-400">{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            {/* Notes Section */}
            <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Notes <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Thank you for your business! Payment is due within 30 days..."
                    rows={4}
                    className="w-full border rounded p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Add any additional information, payment terms, or thank you message.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setTaxRate(0)}
                    className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    No Tax
                </button>
                <button
                    type="button"
                    onClick={() => setDiscountRate(0)}
                    className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    No Discount
                </button>
                <button
                    type="button"
                    onClick={() => setNotes('Thank you for your business! Payment is due within 30 days.')}
                    className="px-3 py-1 text-xs text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500 rounded hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                >
                    Default Note
                </button>
            </div>
        </div>
    );
};

export default SummarySection;