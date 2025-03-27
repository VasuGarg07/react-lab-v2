import React, { useState, useCallback, memo } from 'react';
import { Slider as RadixSlider } from 'radix-ui';
import { cn } from '@/shared/cn';

// Interface for slider marks
export interface SliderMark {
    value: number;
    label: string;
}

// Interface for slider props
export interface CustomSliderProps {
    id: string;
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    format: (value: number) => string;
    marks: SliderMark[];
    onChange: (value: number) => void;
    primaryColor?: string;
    secondaryColor?: string;
}

const Slider: React.FC<CustomSliderProps> = memo(({
    id,
    label,
    value,
    min,
    max,
    step,
    format,
    marks,
    onChange,
    primaryColor = 'bg-primary-500',
    secondaryColor = 'bg-neutral-200 dark:bg-neutral-700',
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [hoveredMark, setHoveredMark] = useState<string | null>(null);
    const percentage = ((value - min) / (max - min)) * 100;

    // Use useCallback to memoize the handler function
    const handleChange = useCallback((newValue: number[]) => {
        onChange(newValue[0]);
    }, [onChange]);

    // Convert bg-color class to text-color class for the hovered mark
    const getTextColorClass = (bgColor: string) => {
        return bgColor
            .replace('bg-', 'text-')
            .replace('-500', '-600');
    };

    const getDarkTextColorClass = (bgColor: string) => {
        return bgColor
            .replace('bg-', 'text-')
            .replace('-500', '-400');
    };

    return (
        <div className="py-2 px-3 relative">
            {/* Slider component */}
            <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onTouchStart={() => setShowTooltip(true)}
                onTouchEnd={() => setTimeout(() => setShowTooltip(false), 1000)}
            >
                <RadixSlider.Root
                    value={[value]}
                    min={min}
                    max={max}
                    step={step}
                    onValueChange={handleChange}
                    className="relative flex items-center select-none touch-none w-full h-5"
                >
                    <RadixSlider.SliderTrack className={`${secondaryColor} relative grow rounded-full h-[3px]`}>
                        <RadixSlider.SliderRange className={`absolute ${primaryColor} rounded-full h-full`} />
                    </RadixSlider.SliderTrack>
                    <RadixSlider.SliderThumb
                        className="block w-5 h-5 bg-white dark:bg-neutral-100 shadow-md rounded-full border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-transform hover:scale-110 active:scale-105"
                        aria-label={label}
                    />

                    {/* Tooltip */}
                    {showTooltip && (
                        <div
                            className={`absolute bottom-full mb-2 left-0 transform -translate-x-1/2 ${primaryColor} text-white rounded-md px-2 py-1 text-xs font-medium min-w-max pointer-events-none`}
                            style={{ left: `${percentage}%` }}
                        >
                            {format(value)}
                            <div className={`absolute w-2 h-2 ${primaryColor} transform rotate-45 left-1/2 -ml-1 -bottom-1`}></div>
                        </div>
                    )}
                </RadixSlider.Root>
            </div>

            {/* Mark labels */}
            <div className="flex justify-between mt-3 px-2.5">
                {marks.map((mark, index) => (
                    <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredMark(`${id}-${index}`)}
                        onMouseLeave={() => setHoveredMark(null)}
                    >
                        <span
                            className={cn(
                                "text-xs font-medium transition-colors",
                                hoveredMark === `${id}-${index}`
                                    ? `${getTextColorClass(primaryColor)} dark:${getDarkTextColorClass(primaryColor)}`
                                    : "text-neutral-500 dark:text-neutral-400"
                            )}
                        >
                            {mark.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
});

Slider.displayName = 'Slider';

export default Slider;