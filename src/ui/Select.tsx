import React, { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/shared/cn';

export interface SelectOption {
    value: string;
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

const Select = forwardRef<HTMLButtonElement, SelectProps>(
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
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}

                    <SelectPrimitive.Root
                        value={value}
                        defaultValue={defaultValue}
                        onValueChange={onValueChange}
                        disabled={disabled}
                        name={name}
                    >
                        <SelectPrimitive.Trigger
                            ref={ref}
                            id={id}
                            className={cn(
                                "w-full rounded-lg border transition-all outline-none text-sm text-neutral-800 dark:text-neutral-100",
                                "focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30",
                                "py-2.5 pr-3",
                                icon ? "pl-10" : "pl-3",
                                error ? "border-red-500 ring-1 ring-red-500/30" : "border-gray-300",
                                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                                className
                            )}
                        >
                            <div className="flex items-center justify-between gap-1">
                                <SelectPrimitive.Value placeholder={placeholder} />
                                <SelectPrimitive.Icon>
                                    <ChevronDown size={16} className="opacity-60" />
                                </SelectPrimitive.Icon>
                            </div>
                        </SelectPrimitive.Trigger>

                        <SelectPrimitive.Portal>
                            <SelectPrimitive.Content
                                className="overflow-hidden bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                                position="popper"
                                sideOffset={5}
                                align="center"
                            >
                                <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-default">
                                    <ChevronUp size={16} />
                                </SelectPrimitive.ScrollUpButton>

                                <SelectPrimitive.Viewport className="p-1">
                                    {options.map((option) => (
                                        <SelectPrimitive.Item
                                            key={option.value}
                                            value={option.value}
                                            className="relative flex items-center h-8 pl-6 pr-8 py-2 rounded text-sm text-gray-700 dark:text-gray-300 data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-700 cursor-pointer focus:outline-none select-none data-[state=checked]:font-medium data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
                                        >
                                            <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                                            <SelectPrimitive.ItemIndicator className="absolute left-1 inline-flex items-center">
                                                <Check size={16} className="text-primary-500" />
                                            </SelectPrimitive.ItemIndicator>
                                        </SelectPrimitive.Item>
                                    ))}
                                </SelectPrimitive.Viewport>

                                <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-default">
                                    <ChevronDown size={16} />
                                </SelectPrimitive.ScrollDownButton>
                            </SelectPrimitive.Content>
                        </SelectPrimitive.Portal>
                    </SelectPrimitive.Root>
                </div>

                {error && (
                    <p className="h-5 text-xs text-red-500 mt-1">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;