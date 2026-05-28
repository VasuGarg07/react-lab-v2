import { type InputHTMLAttributes } from "react";
import { Minus, Plus } from "lucide-react";

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    label?: string;
    error?: string;
    required?: boolean;
    value: number | "";
    onChange: (value: number | "") => void;
    min?: number;
    max?: number;
    step?: number;
    showControls?: boolean;
}

export function NumberInput({
    label,
    error,
    required,
    disabled,
    value,
    onChange,
    min,
    max,
    step = 1,
    showControls = false,
    className = "",
    id,
    name,
    ...rest
}: NumberInputProps) {
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "") {
            onChange("");
        } else {
            const num = parseFloat(val);
            if (!isNaN(num)) onChange(num);
        }
    };

    const increment = () => {
        const current = typeof value === "number" ? value : 0;
        const next = current + step;
        if (max === undefined || next <= max) onChange(next);
    };

    const decrement = () => {
        const current = typeof value === "number" ? value : 0;
        const next = current - step;
        if (min === undefined || next >= min) onChange(next);
    };

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

            <div className="relative flex items-center">
                {showControls && (
                    <button
                        type="button"
                        onClick={decrement}
                        disabled={disabled || (min !== undefined && (value === "" || value <= min))}
                        className="absolute left-0 h-full px-3 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                )}

                <input
                    id={inputId}
                    name={name}
                    type="number"
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    className={`
            w-full py-2.5 text-sm rounded-lg border transition-all duration-200
            bg-white dark:bg-neutral-900
            text-neutral-900 dark:text-neutral-100
            placeholder:text-neutral-400 dark:placeholder:text-neutral-500
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:opacity-50 disabled:cursor-not-allowed
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            ${showControls ? "px-10 text-center" : "px-3"}
            ${error
                            ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                            : "border-neutral-300 dark:border-neutral-700 focus:ring-blue-500/20 focus:border-blue-500"
                        }
            ${className}
          `}
                    {...rest}
                />

                {showControls && (
                    <button
                        type="button"
                        onClick={increment}
                        disabled={disabled || (max !== undefined && (value === "" || value >= max))}
                        className="absolute right-0 h-full px-3 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                )}
            </div>

            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {error}
                </p>
            )}
        </div>
    );
}