import { cn } from '@/shared/cn';
import {
    Checkbox,
    CheckboxGroup,
    Input,
    Radio,
    RadioGroup,
    Slider,
    Switch
} from '@base-ui-components/react';
import { Check } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { FormField, MultiSelectField, NumberField as NumberFieldType, RangeField, SelectField, TextField } from '../../helpers/fb.types';
import { useResponseFormField } from '../../helpers/useFormRender';

// Apple-style base styles
const labelStyles = "text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 block";
const errorStyles = "text-xs text-red-500 dark:text-red-400 mt-1.5";

// Apple-style input base
const inputBaseStyles = cn(
    "h-9 w-full rounded-lg border text-sm font-medium",
    "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
    "shadow-sm hover:shadow-md",
    "placeholder:text-gray-400 dark:placeholder:text-gray-500"
);

// Apple-style focus ring
const focusRingStyles = "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50";
const errorFocusRingStyles = "focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50";

// Common field props
interface BaseFieldProps {
    field: FormField;
    className?: string;
    disabled?: boolean;
}

// Validation utilities
const validateField = (field: FormField, value: any): string[] => {
    const errors: string[] = [];

    // Required validation
    if (field.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field.label} is required`);
        return errors;
    }

    // Skip validation if value is empty and field is not required
    if (value === undefined || value === null || value === '') {
        return errors;
    }

    // Type-specific validation
    switch (field.type) {
        case 'text':
            const textField = field as TextField;
            const textValue = String(value);

            if (textField.validation?.minLength && textValue.length < textField.validation.minLength) {
                errors.push(`${field.label} must be at least ${textField.validation.minLength} characters`);
            }
            if (textField.validation?.maxLength && textValue.length > textField.validation.maxLength) {
                errors.push(`${field.label} must be at most ${textField.validation.maxLength} characters`);
            }
            if (textField.validation?.regex && !new RegExp(textField.validation.regex).test(textValue)) {
                errors.push(`${field.label} format is invalid`);
            }
            break;

        case 'number':
            const numberField = field as NumberFieldType;
            const numValue = Number(value);

            if (isNaN(numValue)) {
                errors.push(`${field.label} must be a valid number`);
            } else {
                if (numberField.validation?.minValue !== undefined && numValue < numberField.validation.minValue) {
                    errors.push(`${field.label} must be at least ${numberField.validation.minValue}`);
                }
                if (numberField.validation?.maxValue !== undefined && numValue > numberField.validation.maxValue) {
                    errors.push(`${field.label} must be at most ${numberField.validation.maxValue}`);
                }
            }
            break;

        case 'select':
            const selectField = field as SelectField;
            if (!selectField.options.includes(value)) {
                errors.push(`${field.label} has an invalid selection`);
            }
            break;

        case 'multi_select':
            const multiSelectField = field as MultiSelectField;
            if (!Array.isArray(value)) {
                errors.push(`${field.label} must be an array`);
            } else {
                const invalidOptions = value.filter(v => !multiSelectField.options.includes(v));
                if (invalidOptions.length > 0) {
                    errors.push(`${field.label} has invalid selections`);
                }
            }
            break;

        case 'range':
            const rangeField = field as RangeField;
            const rangeValue = Number(value);

            if (isNaN(rangeValue)) {
                errors.push(`${field.label} must be a valid number`);
            } else {
                if (rangeValue < rangeField.min || rangeValue > rangeField.max) {
                    errors.push(`${field.label} must be between ${rangeField.min} and ${rangeField.max}`);
                }
            }
            break;
    }

    return errors;
};

// Error display component
const FieldError: React.FC<{ errors: string[] }> = ({ errors }) => {
    if (!errors || errors.length === 0) return null;

    return (
        <div className="space-y-1">
            {errors.map((error, index) => (
                <p key={index} className={errorStyles}>
                    {error}
                </p>
            ))}
        </div>
    );
};

// Text Field Component
export const FormTextField: React.FC<BaseFieldProps> = ({
    field,
    className,
    disabled = false
}) => {
    const { value, updateValue } = useResponseFormField(field.key);
    const [localValue, setLocalValue] = useState(value || '');
    const [localErrors, setLocalErrors] = useState<string[]>([]);
    const [hasBlurred, setHasBlurred] = useState(false);
    const textField = field as TextField;

    useEffect(() => {
        setLocalValue(value || '');
    }, [value]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        // Clear errors when user starts typing (only if they've blurred before)
        if (hasBlurred && localErrors.length > 0) {
            setLocalErrors([]);
        }
    }, [hasBlurred, localErrors.length]);

    const handleBlur = useCallback(() => {
        setHasBlurred(true);
        const validationErrors = validateField(field, localValue);
        setLocalErrors(validationErrors);

        // Only update store if validation passes
        if (validationErrors.length === 0) {
            updateValue(localValue);
        }
    }, [field, localValue, updateValue]);

    const hasError = localErrors.length > 0;

    return (
        <div className={className}>
            <label className={labelStyles}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Input
                value={localValue}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                maxLength={textField.validation?.maxLength}
                className={cn(
                    inputBaseStyles,
                    "px-4",
                    hasError
                        ? cn("border-red-500/50 dark:border-red-500/50", errorFocusRingStyles)
                        : cn("border-gray-200/50 dark:border-gray-600/50", focusRingStyles),
                    "text-gray-900 dark:text-gray-100"
                )}
            />
            <FieldError errors={localErrors} />
        </div>
    );
};

// Number Field Component 
export const FormNumberField: React.FC<BaseFieldProps> = ({
    field,
    className,
    disabled = false
}) => {
    const { value, updateValue } = useResponseFormField(field.key);
    const [localValue, setLocalValue] = useState(value?.toString() || '');
    const [localErrors, setLocalErrors] = useState<string[]>([]);
    const [hasBlurred, setHasBlurred] = useState(false);
    const numberField = field as NumberFieldType;

    useEffect(() => {
        setLocalValue(value?.toString() || '');
    }, [value]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        // Clear errors when user starts typing (only if they've blurred before)
        if (hasBlurred && localErrors.length > 0) {
            setLocalErrors([]);
        }
    }, [hasBlurred, localErrors.length]);

    const handleBlur = useCallback(() => {
        setHasBlurred(true);
        const numValue = localValue === '' ? null : Number(localValue);
        const validationErrors = validateField(field, numValue);
        setLocalErrors(validationErrors);

        // Only update store if validation passes
        if (validationErrors.length === 0) {
            updateValue(numValue);
        }
    }, [field, localValue, updateValue]);

    const hasError = localErrors.length > 0;

    return (
        <div className={className}>
            <label className={labelStyles}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Input
                type="number"
                value={localValue}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                min={numberField.validation?.minValue}
                max={numberField.validation?.maxValue}
                step="any"
                className={cn(
                    inputBaseStyles,
                    "px-4",
                    hasError
                        ? cn("border-red-500/50 dark:border-red-500/50", errorFocusRingStyles)
                        : cn("border-gray-200/50 dark:border-gray-600/50", focusRingStyles),
                    "text-gray-900 dark:text-gray-100"
                )}
            />
            <FieldError errors={localErrors} />
        </div>
    );
};

// Radio Group Component
export const FormRadioField: React.FC<BaseFieldProps> = ({
    field,
    className,
    disabled = false
}) => {
    const { value, updateValue } = useResponseFormField(field.key);
    const [localValue, setLocalValue] = useState(value || '');
    const [localErrors, setLocalErrors] = useState<string[]>([]);
    const [hasBlurred, setHasBlurred] = useState(false);
    const selectField = field as SelectField;

    useEffect(() => {
        setLocalValue(value || '');
    }, [value]);

    const handleValueChange = useCallback((newValue: any) => {
        setLocalValue(newValue);

        // Clear errors when user makes a selection (only if they've blurred before)
        if (hasBlurred && localErrors.length > 0) {
            setLocalErrors([]);
        }
    }, [hasBlurred, localErrors.length]);

    const handleBlur = useCallback(() => {
        setHasBlurred(true);
        const validationErrors = validateField(field, localValue);
        setLocalErrors(validationErrors);

        // Only update store if validation passes
        if (validationErrors.length === 0) {
            updateValue(localValue);
        }
    }, [field, localValue, updateValue]);

    const hasError = localErrors.length > 0;

    return (
        <div className={className}>
            <RadioGroup
                value={localValue}
                onValueChange={handleValueChange}
                disabled={disabled}
                className="flex flex-col items-start gap-1"
            >
                <div className={cn(labelStyles, "mb-3")}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </div>

                <div className="space-y-3 w-full">
                    {selectField.options.map((option: string) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <Radio.Root
                                value={option}
                                onBlur={handleBlur}
                                className={cn(
                                    "flex size-5 items-center justify-center rounded-full outline-none",
                                    "data-[checked]:bg-blue-600 dark:data-[checked]:bg-blue-500",
                                    "data-[unchecked]:border-2 data-[unchecked]:border-gray-300 dark:data-[unchecked]:border-gray-600",
                                    "data-[unchecked]:bg-white/80 dark:data-[unchecked]:bg-gray-800/80 data-[unchecked]:backdrop-blur-sm",
                                    "group-hover:scale-110 group-hover:shadow-lg",
                                    "focus-visible:ring-2 focus-visible:ring-offset-2",
                                    hasError ? "focus-visible:ring-red-500/50" : "focus-visible:ring-blue-500/50"
                                )}
                            >
                                <Radio.Indicator className="flex before:size-2 before:rounded-full before:bg-white data-[unchecked]:hidden" />
                            </Radio.Root>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 select-none">
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            </RadioGroup>
            <FieldError errors={localErrors} />
        </div>
    );
};

// Checkbox Group Component
export const FormCheckboxField: React.FC<BaseFieldProps> = ({
    field,
    className,
    disabled = false
}) => {
    const { value, updateValue } = useResponseFormField(field.key);
    const [localValue, setLocalValue] = useState<string[]>(value || []);
    const [localErrors, setLocalErrors] = useState<string[]>([]);
    const [hasBlurred, setHasBlurred] = useState(false);
    const multiSelectField = field as MultiSelectField;

    useEffect(() => {
        setLocalValue(value || []);
    }, [value]);

    const handleValueChange = useCallback((newValue: string[]) => {
        setLocalValue(newValue);

        // Clear errors when user makes a selection (only if they've blurred before)
        if (hasBlurred && localErrors.length > 0) {
            setLocalErrors([]);
        }
    }, [hasBlurred, localErrors.length]);

    const handleBlur = useCallback(() => {
        setHasBlurred(true);
        const validationErrors = validateField(field, localValue);
        setLocalErrors(validationErrors);

        // Only update store if validation passes
        if (validationErrors.length === 0) {
            updateValue(localValue);
        }
    }, [field, localValue, updateValue]);

    const hasError = localErrors.length > 0;

    return (
        <div className={className}>
            <CheckboxGroup
                value={localValue}
                onValueChange={handleValueChange}
                disabled={disabled}
                className="flex flex-col items-start gap-1"
            >
                <div className={cn(labelStyles, "mb-3")}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </div>

                <div className="space-y-3 w-full">
                    {multiSelectField.options.map((option: string) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <Checkbox.Root
                                value={option}
                                onBlur={handleBlur}
                                className={cn(
                                    "flex size-5 items-center justify-center rounded-lg outline-none",
                                    "data-[checked]:bg-blue-600 dark:data-[checked]:bg-blue-500",
                                    "data-[unchecked]:border-2 data-[unchecked]:border-gray-300 dark:data-[unchecked]:border-gray-600",
                                    "data-[unchecked]:bg-white/80 dark:data-[unchecked]:bg-gray-800/80 data-[unchecked]:backdrop-blur-sm",
                                    "group-hover:scale-110 group-hover:shadow-lg",
                                    "focus-visible:ring-2 focus-visible:ring-offset-2",
                                    hasError ? "focus-visible:ring-red-500/50" : "focus-visible:ring-blue-500/50"
                                )}
                            >
                                <Checkbox.Indicator className="flex text-white data-[unchecked]:hidden">
                                    <Check className="size-3" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 select-none">
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            </CheckboxGroup>
            <FieldError errors={localErrors} />
        </div>
    );
};

// Switch Component
export const FormSwitchField: React.FC<BaseFieldProps> = ({
    field,
    className,
    disabled = false
}) => {
    const { value, updateValue } = useResponseFormField(field.key);
    const [localValue, setLocalValue] = useState<boolean>(value || false);
    const [localErrors, setLocalErrors] = useState<string[]>([]);
    const [hasBlurred, setHasBlurred] = useState(false);

    useEffect(() => {
        setLocalValue(value || false);
    }, [value]);

    const handleValueChange = useCallback((newValue: boolean) => {
        setLocalValue(newValue);

        // Clear errors when user toggles switch (only if they've blurred before)
        if (hasBlurred && localErrors.length > 0) {
            setLocalErrors([]);
        }
    }, [hasBlurred, localErrors.length]);

    const handleBlur = useCallback(() => {
        setHasBlurred(true);
        const validationErrors = validateField(field, localValue);
        setLocalErrors(validationErrors);

        // Only update store if validation passes
        if (validationErrors.length === 0) {
            updateValue(localValue);
        }
    }, [field, localValue, updateValue]);

    const hasError = localErrors.length > 0;

    return (
        <div className={className}>
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <label className={cn(labelStyles, "mb-0 cursor-pointer")}>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                </div>
                <Switch.Root
                    checked={localValue}
                    onCheckedChange={handleValueChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    className={cn(
                        "relative flex h-7 w-12 rounded-full p-px shadow-inner transition-colors duration-200",
                        "bg-gray-200 dark:bg-gray-600",
                        "data-[checked]:bg-blue-600 dark:data-[checked]:bg-blue-500",
                        "hover:shadow-lg active:scale-95",
                        "focus-visible:ring-2 focus-visible:ring-offset-2",
                        hasError ? "focus-visible:ring-red-500/50" : "focus-visible:ring-blue-500/50",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                >
                    <Switch.Thumb className={cn(
                        "aspect-square h-full rounded-full bg-white shadow-lg transition-transform duration-200",
                        "translate-x-0 data-[checked]:translate-x-5",
                    )} />
                </Switch.Root>
            </div>
            <FieldError errors={localErrors} />
        </div>
    );
};

// Range Component
export const FormRangeField: React.FC<BaseFieldProps> = ({
    field,
    className,
    disabled = false
}) => {
    const { value, updateValue } = useResponseFormField(field.key);
    const rangeField = field as RangeField;
    const [localValue, setLocalValue] = useState<number>(value || rangeField.min);
    const [localErrors, setLocalErrors] = useState<string[]>([]);
    const [hasBlurred, setHasBlurred] = useState(false);

    useEffect(() => {
        setLocalValue(value || rangeField.min);
    }, [value, rangeField.min]);

    const handleValueChange = useCallback((values: number[]) => {
        setLocalValue(values[0]);

        // Clear errors when user moves the slider (only if they've blurred before)
        if (hasBlurred && localErrors.length > 0) {
            setLocalErrors([]);
        }
    }, [hasBlurred, localErrors.length]);

    const handleBlur = useCallback(() => {
        setHasBlurred(true);
        const validationErrors = validateField(field, localValue);
        setLocalErrors(validationErrors);

        // Only update store if validation passes
        if (validationErrors.length === 0) {
            updateValue(localValue);
        }
    }, [field, localValue, updateValue]);

    const hasError = localErrors.length > 0;

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-3">
                <label className={cn(labelStyles, "mb-0")}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <span className={cn(
                    "text-sm font-bold px-3 py-1.5 rounded-full",
                    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
                    "border border-blue-200 dark:border-blue-700/50"
                )}>
                    {localValue}
                </span>
            </div>
            <Slider.Root
                value={[localValue]}
                onValueChange={handleValueChange}
                onBlur={handleBlur}
                min={rangeField.min}
                max={rangeField.max}
                step={1}
                disabled={disabled}
            >
                <Slider.Control className="flex w-full touch-none items-center py-4 select-none">
                    <Slider.Track className={cn(
                        "h-2 w-full rounded-full shadow-inner select-none",
                        hasError
                            ? "bg-red-100 dark:bg-red-900/20 shadow-red-200/50"
                            : "bg-gray-100 dark:bg-gray-700/50 shadow-gray-200/50"
                    )}>
                        <Slider.Indicator className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 select-none" />
                        <Slider.Thumb className={cn(
                            "size-6 rounded-full bg-white shadow-lg select-none",
                            "border-2 border-blue-500 hover:scale-110 active:scale-95",
                            "focus-visible:ring-2 focus-visible:ring-offset-2",
                            hasError ? "focus-visible:ring-red-500/50 border-red-500" : "focus-visible:ring-blue-500/50"
                        )} />
                    </Slider.Track>
                </Slider.Control>
            </Slider.Root>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span className="font-medium">{rangeField.min}</span>
                <span className="font-medium">{rangeField.max}</span>
            </div>
            <FieldError errors={localErrors} />
        </div>
    );
};