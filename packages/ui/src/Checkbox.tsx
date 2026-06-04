import { Check } from "lucide-react";

interface CheckboxProps {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    error?: string;
    className?: string;
}

export function Checkbox({
    label,
    checked,
    onChange,
    disabled = false,
    error,
    className = "",
}: CheckboxProps) {
    return (
        <div className={className}>
            <label
                className={`
          inline-flex items-center gap-2.5 select-none
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
            >
                <span className="relative flex items-center justify-center w-5 h-5">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        disabled={disabled}
                        className="peer sr-only"
                    />
                    <span
                        aria-hidden="true"
                        className={`
                flex items-center justify-center w-5 h-5 rounded border
                peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/20 peer-focus-visible:ring-offset-0
                ${checked
                                ? "bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                                : error
                                    ? "border-red-500 bg-white dark:bg-neutral-900"
                                    : "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
                            }
              `}
                    >
                        {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </span>
                </span>

                {label && (
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        {label}
                    </span>
                )}
            </label>

            {error && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {error}
                </p>
            )}
        </div>
    );
}