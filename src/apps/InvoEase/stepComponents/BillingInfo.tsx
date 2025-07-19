import { FC } from 'react';
import { useBillingInfo } from '../invoiceStore';

interface BillingFormProps {
    title: string;
    data: {
        name: string;
        email: string;
        address: string;
    };
    onUpdate: (info: Partial<{ name: string; email: string; address: string }>) => void;
}

const BillingForm: FC<BillingFormProps> = ({ title, data, onUpdate }) => {
    const validateEmail = (email: string) => {
        if (!email) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Invalid email format';
        return true;
    };

    const emailError = typeof validateEmail(data.email) === 'string' ? validateEmail(data.email) : null;
    const nameError = !data.name.trim() ? 'Name is required' : null;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                {title}
            </h3>

            {/* Name Field */}
            <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => onUpdate({ name: e.target.value })}
                    placeholder="Enter full name"
                    className={`w-full border rounded-md p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${nameError ? 'border-red-500 ring-red-500/30' : 'border-gray-300 dark:border-gray-700'
                        }`}
                />
                {nameError && (
                    <p className="text-sm text-red-500 mt-1">{nameError}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Email Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => onUpdate({ email: e.target.value })}
                    placeholder="Enter email address"
                    className={`w-full border rounded-md p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${emailError ? 'border-red-500 ring-red-500/30' : 'border-gray-300 dark:border-gray-700'
                        }`}
                />
                {emailError && (
                    <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}
            </div>

            {/* Address Field */}
            <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Address <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                    value={data.address}
                    onChange={(e) => onUpdate({ address: e.target.value })}
                    placeholder="Enter billing address (optional)"
                    rows={3}
                    className="w-full border rounded-md p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                />
            </div>
        </div>
    );
};

const BillingSection: React.FC = () => {
    const { billTo, billFrom, setBillTo, setBillFrom } = useBillingInfo();

    return (
        <div className="space-y-4">
            {/* Help Text */}
            <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                ⚠️ <strong>Required:</strong> Both "Bill To" and "Bill From" sections need valid names and email addresses.
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Bill To */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50">
                    <BillingForm
                        title="Bill To:"
                        data={billTo}
                        onUpdate={setBillTo}
                    />
                </div>

                {/* Bill From */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50">
                    <BillingForm
                        title="Bill From:"
                        data={billFrom}
                        onUpdate={setBillFrom}
                    />
                </div>
            </div>
        </div>
    );
};

export default BillingSection;