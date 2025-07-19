import { useInvoiceDetails } from '../invoiceStore';
import { CurrencyOptions } from '../invoice.utils';

const DetailsSection = () => {
    const {
        currentDate,
        dueDate,
        invoiceNumber,
        currency,
        setDueDate,
        setInvoiceNumber,
        setCurrency,
    } = useInvoiceDetails();

    // Date validation
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDate = today.toISOString().split('T')[0];

    today.setFullYear(today.getFullYear() + 1);
    const maxDateStr = today.toISOString().split('T')[0];

    const validateDueDate = (value: string) => {
        if (!value) return 'Due date is required';
        const selected = new Date(value);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (selected <= now) return 'Due date must be after today';
        if (selected > today) return 'Due date cannot be more than a year from now';
        return true;
    };

    const dueDateError = typeof validateDueDate(dueDate) === 'string' ? validateDueDate(dueDate) : null;

    return (
        <div className="space-y-4">
            {/* Current Info Display */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Current Date:</strong> {currentDate}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Invoice ID:</strong> {invoiceNumber}
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Invoice Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                        Invoice Number
                    </label>
                    <input
                        type="text"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className="w-full border rounded-md p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Invoice number"
                    />
                </div>

                {/* Currency */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                        Currency <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full border rounded-md p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {CurrencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Due Date */}
            <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Due Date <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={minDate}
                    max={maxDateStr}
                    className={`w-full border rounded-md p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${dueDateError ? 'border-red-500 ring-red-500/30' : 'border-gray-300 dark:border-gray-700'
                        }`}
                />
                {dueDateError && (
                    <p className="text-sm text-red-500 mt-1">{dueDateError}</p>
                )}
            </div>

            {/* Help Text */}
            <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                💡 <strong>Tip:</strong> Invoice number is auto-generated but you can customize it. Due date must be between tomorrow and one year from now.
            </div>
        </div>
    );
};

export default DetailsSection;