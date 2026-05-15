import type { ReactNode } from "react";

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    id?: string;
    name?: string;
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    onValueChange?: (value: string) => void; // Alternative prop name for consistency
    placeholder?: string;
    icon?: ReactNode;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export default function Select({
    label,
    id,
    name,
    options,
    value,
    onChange,
    onValueChange,
    placeholder = "Select an option",
    icon,
    error,
    required,
    disabled,
    className = "",
}: SelectProps) {
    const selectId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

    const handleChange = (val: string) => {
        onChange?.(val);
        onValueChange?.(val);
    };

    return (
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {icon}
                    </div>
                )}

                <select
                    id={selectId}
                    name={name}
                    value={value || ""}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={disabled}
                    className={`
                        w-full ${icon ? 'pl-10' : 'pl-3'} pr-10 py-2 text-sm rounded-lg border transition-all duration-200
                        bg-white dark:bg-neutral-800 
                        text-neutral-900 dark:text-neutral-100
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        appearance-none cursor-pointer
                        ${error
                            ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
                            : "border-neutral-300 dark:border-neutral-700 focus:ring-blue-500/30 focus:border-blue-500"
                        }
                        ${className}
                    `}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500 dark:text-neutral-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {error}
                </p>
            )}
        </div>
    );
}