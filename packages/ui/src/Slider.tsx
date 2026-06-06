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
    trackClassName?: string;
    fillClassName?: string;
    thumbClassName?: string;
    labelClassName?: string;
}

export function Slider({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    disabled = false,
    className = '',
    trackClassName = '',
    fillClassName = '',
    thumbClassName = '',
    labelClassName = '',
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
                    <label className={`block text-sm font-medium text-neutral-700 ${labelClassName}`}>
                        {label}
                    </label>
                    <span className={`text-sm text-neutral-600 ${labelClassName}`}>
                        {value}
                    </span>
                </div>
            )}

            <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {/* Track */}
                <div className={`relative h-2 bg-neutral-200 rounded-full ${trackClassName}`}>
                    {/* Fill */}
                    <div
                        className={`absolute h-2 bg-blue-500 rounded-full ${fillClassName}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                {/* Hidden range input */}
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
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-md pointer-events-none transition-transform duration-150 ${thumbClassName}`}
                    style={{ left: `calc(${percentage}% - 8px)` }}
                />

                {/* Tooltip */}
                {showTooltip && (
                    <div
                        className="absolute -top-8 px-2 py-1 bg-neutral-900 text-white text-xs font-medium rounded pointer-events-none whitespace-nowrap transform -translate-x-1/2"
                        style={{ left: `${percentage}%` }}
                    >
                        {value}
                    </div>
                )}
            </div>
        </div>
    );
}
