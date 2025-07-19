import { Plus, Trash2 } from 'lucide-react';
import { useInvoiceItems } from '../invoiceStore';

const ItemsSection = () => {
    const { items, currencySymbol, addItem, removeItem, updateItem } = useInvoiceItems();

    const validateItem = (item: typeof items[0]) => {
        const errors: { [key: string]: string } = {};

        if (!item.name.trim()) errors.name = 'Item name is required';
        if (!item.quantity || item.quantity <= 0) errors.quantity = 'Quantity must be greater than 0';
        if (!item.price || item.price <= 0) errors.price = 'Price must be greater than 0';

        return errors;
    };

    return (
        <div className="space-y-4">
            {/* Help Text */}
            <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                📦 <strong>Items:</strong> Add all products or services. Name, quantity, and price are required for each item.
            </div>

            {/* Items List */}
            <div className="space-y-3">
                {items.map((item, index) => {
                    const errors = validateItem(item);
                    const hasErrors = Object.keys(errors).length > 0;

                    return (
                        <div
                            key={index}
                            className={`border rounded-lg p-4 transition-colors ${hasErrors
                                ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20'
                                : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50'
                                }`}
                        >
                            {/* Item Header */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Item #{index + 1}
                                </span>
                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
                                    >
                                        <Trash2 size={12} />
                                        Delete
                                    </button>
                                )}
                            </div>

                            {/* Item Fields Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {/* Item Name */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Item Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                                        placeholder="Enter item name"
                                        className={`w-full border rounded p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                        placeholder="Qty"
                                        min="1"
                                        className={`w-full border rounded p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                    />
                                    {errors.quantity && (
                                        <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-2 text-sm text-gray-500 dark:text-gray-400">
                                            {currencySymbol}
                                        </span>
                                        <input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            className={`w-full pl-6 border rounded p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                }`}
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-3">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description <span className="text-gray-500">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                                    placeholder="Item description (optional)"
                                    className="w-full border rounded p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Item Total Display */}
                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Item Total:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        {currencySymbol}{(item.quantity * item.price).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Item Button */}
            <div className="flex justify-center pt-2">
                <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                >
                    <Plus size={16} />
                    Add Another Item
                </button>
            </div>

            {/* Items Summary */}
            {items.length > 1 && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Items Summary:</strong> {items.length} items • Subtotal: {currencySymbol}
                        {items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemsSection;