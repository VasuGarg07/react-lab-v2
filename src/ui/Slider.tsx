import { useState } from 'react';

interface SliderProps {
    label?: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    className?: string;
}

export default function Slider({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    disabled = false,
    className = '',
}: SliderProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const percentage = ((value - min) / (max - min)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {label}
                    </label>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {value}
                    </span>
                </div>
            )}

            <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {/* Track background */}
                <div className="relative h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full">
                    {/* Filled track */}
                    <div
                        className="absolute h-2 bg-blue-500 dark:bg-blue-600 rounded-full transition-all duration-150"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                {/* Slider input */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    aria-label={label}
                />

                {/* Thumb */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-neutral-100 border-2 border-blue-500 dark:border-blue-600 rounded-full shadow-md pointer-events-none transition-transform duration-150"
                    style={{ left: `calc(${percentage}% - 8px)` }}
                />

                {/* Tooltip */}
                {showTooltip && (
                    <div
                        className="absolute -top-8 px-2 py-1 bg-neutral-900 dark:bg-neutral-700 text-white text-xs font-medium rounded pointer-events-none whitespace-nowrap transform -translate-x-1/2"
                        style={{ left: `${percentage}%` }}
                    >
                        {value}
                    </div>
                )}
            </div>
        </div>
    );
}