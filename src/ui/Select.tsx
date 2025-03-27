import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/cn';

export interface SelectOption {
    value: any;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    name?: string;
    id?: string;
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({
        options,
        value,
        defaultValue,
        onValueChange,
        placeholder = 'Select an option',
        name,
        id,
        label,
        error,
        icon,
        disabled = false,
        required = false,
        className = '',
    }, ref) => {
        return (
            <div className="space-y-1">
                {label && (
                    <label htmlFor={id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}

                    {/* Custom chevron icon that will overlay the native select */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown size={16} className="opacity-60" />
                    </div>

                    <select
                        ref={ref}
                        id={id}
                        name={name}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={(e) => onValueChange?.(e.target.value)}
                        disabled={disabled}
                        required={required}
                        className={cn(
                            "w-full rounded-lg border transition-all outline-none text-sm text-neutral-800 dark:text-neutral-100",
                            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
                            "py-2.5 pr-8", // Added extra padding for the custom chevron
                            icon ? "pl-10" : "pl-3",
                            error ? "border-red-500 ring-1 ring-red-500/30" : "border-neutral-300 dark:border-neutral-700",
                            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                            "bg-white dark:bg-neutral-900",
                            "appearance-none", // Remove default select styling
                            className
                        )}
                    >
                        <option value="" disabled={required} hidden={!placeholder}>
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {error && (
                    <p className="h-5 text-xs text-red-500 mt-1">{error}</p>
                )}
            </div>
        );
    }
);

export default Select;