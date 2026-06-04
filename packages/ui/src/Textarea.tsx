import { type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    required?: boolean;
}

export function Textarea({
    label,
    error,
    required,
    disabled,
    className = "",
    id,
    name,
    rows = 3,
    ...rest
}: TextareaProps) {
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}

            <textarea
                id={inputId}
                name={name}
                rows={rows}
                disabled={disabled}
                className={`
          w-full px-3 py-2.5 text-sm rounded-lg border resize-none
          bg-white dark:bg-neutral-900
          text-neutral-900 dark:text-neutral-100
          placeholder:text-neutral-400 dark:placeholder:text-neutral-500
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
                        ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                        : "border-neutral-300 dark:border-neutral-700 focus:ring-blue-500/20 focus:border-blue-500"
                    }
          ${className}
        `}
                {...rest}
            />

            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {error}
                </p>
            )}
        </div>
    );
}