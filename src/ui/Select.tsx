import React, { forwardRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Select as BaseSelect } from '@base-ui-components/react/select';
import { cn } from '@/shared/cn';

export interface SelectOption {
    value: any;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: any) => void;
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
            <div className="w-full space-y-2">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
                    >
                        {label} {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <BaseSelect.Root
                    value={value}
                    defaultValue={defaultValue}
                    onValueChange={onValueChange}
                    disabled={disabled}
                    required={required}
                    name={name}
                >
                    <BaseSelect.Trigger
                        ref={ref}
                        id={id}
                        className={cn(
                            // Base minimal styles
                            "relative w-full h-10 rounded-md border transition-colors outline-none",
                            "flex items-center justify-between text-sm",
                            "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",

                            // Background and text
                            "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",

                            // Spacing
                            "px-3 gap-2",

                            // Icon spacing
                            icon ? "pl-9" : "pl-3",

                            // Error state
                            error
                                ? "border-red-300 dark:border-red-600"
                                : "border-slate-300 dark:border-slate-600",

                            // Disabled state
                            disabled
                                ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900"
                                : "cursor-pointer hover:border-slate-400 dark:hover:border-slate-500",

                            // Placeholder state
                            "data-[placeholder]:text-slate-500 dark:data-[placeholder]:text-slate-400",

                            className
                        )}
                    >
                        {icon && (
                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                {icon}
                            </div>
                        )}

                        <BaseSelect.Value className="flex-1 text-left truncate">
                            {value ? options.find(opt => opt.value === value)?.label : placeholder}
                        </BaseSelect.Value>

                        <BaseSelect.Icon className="flex-shrink-0">
                            <ChevronDown
                                size={16}
                                className="text-slate-400 dark:text-slate-500 transition-transform duration-150 data-[state=open]:rotate-180"
                            />
                        </BaseSelect.Icon>
                    </BaseSelect.Trigger>

                    <BaseSelect.Portal>
                        <BaseSelect.Positioner className="z-50">
                            <BaseSelect.Popup
                                className={cn(
                                    // Base styles - minimal design
                                    "min-w-[var(--anchor-width)] rounded-md border bg-white dark:bg-slate-800",
                                    "border-slate-200 dark:border-slate-700 shadow-xs",
                                    "py-1 max-h-60 overflow-hidden",

                                    // Subtle animations
                                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                                    "data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98",
                                    "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1"
                                )}
                            >
                                <div className="overflow-y-auto max-h-56">
                                    {options.map((option) => (
                                        <BaseSelect.Item
                                            key={option.value}
                                            value={option.value}
                                            className={cn(
                                                // Minimal item styles
                                                "relative flex cursor-pointer select-none items-center px-3 py-2 text-sm outline-none",
                                                "text-slate-900 dark:text-slate-100",

                                                // Subtle hover
                                                "hover:bg-slate-50 dark:hover:bg-slate-700",

                                                // Highlighted state
                                                "data-[highlighted]:bg-slate-100 dark:data-[highlighted]:bg-slate-700",

                                                // Selected state - minimal
                                                "data-[selected]:bg-slate-100 dark:data-[selected]:bg-slate-700",
                                                "data-[selected]:font-medium",

                                                // Disabled
                                                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                            )}
                                        >
                                            <BaseSelect.ItemText className="flex-1">
                                                {option.label}
                                            </BaseSelect.ItemText>

                                            <BaseSelect.ItemIndicator className="ml-2">
                                                <Check size={14} className="text-slate-600 dark:text-slate-400" />
                                            </BaseSelect.ItemIndicator>
                                        </BaseSelect.Item>
                                    ))}
                                </div>
                            </BaseSelect.Popup>
                        </BaseSelect.Positioner>
                    </BaseSelect.Portal>
                </BaseSelect.Root>

                {error && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1 px-1 animate-in slide-in-from-top-1 duration-200">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;