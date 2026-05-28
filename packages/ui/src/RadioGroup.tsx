interface RadioOption {
    label: string;
    value: string;
}

interface RadioGroupProps {
    label?: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    error?: string;
    required?: boolean;
    direction?: "horizontal" | "vertical";
    className?: string;
}

export function RadioGroup({
    label,
    options,
    value,
    onChange,
    disabled = false,
    error,
    required,
    direction = "vertical",
    className = "",
}: RadioGroupProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </span>
            )}

            <div
                role="radiogroup"
                className={`
          flex
          ${direction === "vertical" ? "flex-col gap-2" : "flex-wrap gap-4"}
        `}
            >
                {options.map((option) => {
                    const isSelected = value === option.value;

                    return (
                        <label
                            key={option.value}
                            className={`
                inline-flex items-center gap-2.5 select-none
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
                        >
                            <span className="relative flex items-center justify-center w-5 h-5">
                                <input
                                    type="radio"
                                    checked={isSelected}
                                    onChange={() => onChange(option.value)}
                                    disabled={disabled}
                                    className="peer sr-only"
                                />
                                <span
                                    aria-hidden="true"
                                    className={`
                      flex items-center justify-center w-5 h-5 rounded-full border
                      transition-all duration-200
                      peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/20 peer-focus-visible:ring-offset-0
                      bg-white dark:bg-neutral-900
                      ${isSelected
                                            ? "border-blue-600 dark:border-blue-500"
                                            : error
                                                ? "border-red-500"
                                                : "border-neutral-300 dark:border-neutral-600"
                                        }
                    `}
                                >
                                    {isSelected && (
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500" />
                                    )}
                                </span>
                            </span>

                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                {option.label}
                            </span>
                        </label>
                    );
                })}
            </div>

            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {error}
                </p>
            )}
        </div>
    );
}