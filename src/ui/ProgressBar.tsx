interface ProgressBarProps {
    value: number; // 0-100
    label?: string;
    showValue?: boolean;
    size?: "sm" | "md";
    className?: string;
}

export default function ProgressBar({
    value,
    label,
    showValue = false,
    size = "md",
    className = "",
}: ProgressBarProps) {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
        <div className={`space-y-1.5 ${className}`}>
            {(label || showValue) && (
                <div className="flex items-center justify-between">
                    {label && (
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {label}
                        </span>
                    )}
                    {showValue && (
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {Math.round(clampedValue)}%
                        </span>
                    )}
                </div>
            )}

            <div
                className={`
          w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden
          ${size === "sm" ? "h-1.5" : "h-2.5"}
        `}
            >
                <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${clampedValue}%` }}
                />
            </div>
        </div>
    );
}