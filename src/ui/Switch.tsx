interface SwitchProps {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export default function Switch({
    label,
    checked,
    onChange,
    disabled = false,
    className = "",
}: SwitchProps) {
    return (
        <label
            className={`
        inline-flex items-center gap-3 select-none
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
        >
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={`
          relative inline-flex h-6 w-11 shrink-0 items-center rounded-full
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0
          disabled:cursor-not-allowed
          ${checked
                        ? "bg-blue-600 dark:bg-blue-500"
                        : "bg-neutral-300 dark:bg-neutral-600"
                    }
        `}
            >
                <span
                    className={`
            inline-block h-4 w-4 rounded-full bg-white shadow-sm
            transition-transform duration-200
            ${checked ? "translate-x-6" : "translate-x-1"}
          `}
                />
            </button>

            {label && (
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {label}
                </span>
            )}
        </label>
    );
}