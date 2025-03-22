import React, { useCallback, useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useInvoice } from '@/apps/InvoEase/InvoiceContext';

const InvoiceItems: React.FC<{ onValidStep: (isValid: boolean) => void }> = ({ onValidStep }) => {
    const { items, setItems, currencySymbol } = useInvoice();
    const [errors, setErrors] = useState<string[]>([]);

    const validateItems = useCallback(() => {
        const newErrors = items.map((item) => {
            if (!item.name.trim()) return 'Item name is required';
            if (!item.quantity || isNaN(item.quantity)) return 'Quantity is required';
            if (item.price <= 0 || isNaN(item.price)) return 'Price must be greater than 0';
            return '';
        });
        setErrors(newErrors);
        const isValid = newErrors.every((e) => !e);
        onValidStep(isValid);
        return isValid;
    }, [items, onValidStep]);

    const handleItemChange = useCallback(
        (index: number, field: keyof typeof items[0], value: string | number) => {
            const newItems = [...items];
            newItems[index] = { ...newItems[index], [field]: value };
            setItems(newItems);
        },
        [items, setItems]
    );

    const handleItemAdd = () => {
        setItems([...items, { name: '', description: '', quantity: 1, price: 0 }]);
    };

    const handleItemDelete = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    useEffect(() => {
        validateItems();
    }, [items, validateItems]);

    return (
        <div className="flex flex-col gap-6 mb-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="p-4 rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                                Item Name
                            </label>
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                placeholder="Enter item name"
                                className="w-full p-2 rounded-md border text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="w-full sm:w-1/4">
                            <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                                Quantity
                            </label>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                placeholder="Enter quantity"
                                className="w-full p-2 rounded-md border text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="w-full sm:w-1/4">
                            <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                                Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-sm text-neutral-500 dark:text-neutral-400">
                                    {currencySymbol}
                                </span>
                                <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                                    placeholder="Enter price"
                                    min={0}
                                    step={0.01}
                                    className="w-full pl-8 p-2 rounded-md border text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                placeholder="Item description (optional)"
                                className="w-full p-2 rounded-md border text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {items.length > 1 && (
                            <div className="w-full flex justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={() => handleItemDelete(index)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Item
                                </button>
                            </div>
                        )}
                    </div>

                    {errors[index] && (
                        <p className="text-sm text-red-500 mt-2">{errors[index]}</p>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={handleItemAdd}
                className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
                <Plus className="w-4 h-4" />
                Add Item
            </button>
        </div>
    );
};

export default React.memo(InvoiceItems);
