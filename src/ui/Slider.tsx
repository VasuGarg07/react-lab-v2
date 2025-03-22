import { cn } from '@/shared/cn';
import { Slider as SliderPrimitive } from 'radix-ui';
import { forwardRef } from 'react';

interface SliderProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number) => void;
    name?: string;
    id?: string;
    label?: string;
    valueLabel?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
    ({
        value,
        defaultValue,
        min = 0,
        max = 100,
        step = 1,
        onValueChange,
        name,
        id,
        label,
        valueLabel,
        error,
        disabled = false,
        className = '',
    }, ref) => {

        // Handle value as array for the primitive but expose it as a single number in the API
        const sliderValue = value !== undefined ? [value] : undefined;
        const sliderDefaultValue = defaultValue !== undefined ? [defaultValue] : undefined;

        const handleValueChange = (newValue: number[]) => {
            if (onValueChange) {
                onValueChange(newValue[0]);
            }
        };

        return (
            <div className="space-y-1">
                {(label || valueLabel) && (
                    <div className="flex justify-between mb-2">
                        {label && (
                            <label htmlFor={id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                {label}
                            </label>
                        )}
                        {valueLabel && (
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">{valueLabel}</span>
                        )}
                    </div>
                )}

                <SliderPrimitive.Root
                    ref={ref}
                    name={name}
                    id={id}
                    value={sliderValue}
                    defaultValue={sliderDefaultValue}
                    min={min}
                    max={max}
                    step={step}
                    onValueChange={handleValueChange}
                    disabled={disabled}
                    className={cn(
                        "relative flex items-center w-full h-5",
                        disabled ? "opacity-50 cursor-not-allowed" : "",
                        className
                    )}
                >
                    <SliderPrimitive.Track
                        className="relative h-1 w-full rounded-full bg-neutral-200 dark:bg-neutral-700"
                    >
                        <SliderPrimitive.Range className="absolute h-full rounded-full bg-blue-500" />
                    </SliderPrimitive.Track>
                    <SliderPrimitive.Thumb
                        className={cn(
                            "block w-5 h-5 rounded-full bg-blue-500 dark:bg-white shadow-md focus:outline-none",
                            "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                            "transition-colors"
                        )}
                    />
                </SliderPrimitive.Root>

                {error && (
                    <p className="h-5 text-xs text-red-500 mt-1">{error}</p>
                )}
            </div>
        );
    }
);


export default Slider;