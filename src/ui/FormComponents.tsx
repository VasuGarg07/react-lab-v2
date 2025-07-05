import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import {
    Fieldset,
    Field,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Select,
    Switch,
    Slider
} from '@base-ui-components/react';
import { cn } from '@/shared/cn';

// Base form styles - consistent across all form inputs
const baseInputStyles = cn(
    "w-full px-3 py-2 rounded-lg",
    "border border-gray-300 dark:border-zinc-600",
    "bg-white dark:bg-zinc-700",
    "text-gray-900 dark:text-white",
    "placeholder-gray-400 dark:placeholder-gray-500"
);

const baseLabelStyles = cn(
    "block text-sm font-medium mb-2",
    "text-gray-700 dark:text-gray-300"
);

// FormFieldset Component
interface FormFieldsetProps {
    legend?: string;
    children: ReactNode;
    className?: string;
}

export const FormFieldset: React.FC<FormFieldsetProps> = ({
    legend,
    children,
    className
}) => {
    return (
        <Fieldset.Root className={cn("border-0 p-0 m-0", className)}>
            {legend && (
                <Fieldset.Legend className="sr-only">
                    {legend}
                </Fieldset.Legend>
            )}
            {children}
        </Fieldset.Root>
    );
};

// FormInput Component (Text only)
interface FormInputProps {
    label: string;
    type: 'text' | 'email' | 'password';
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    type,
    value,
    onChange,
    onBlur,
    placeholder,
    className,
    inputClassName,
    required = false,
    disabled = false,
    autoFocus = false,
    maxLength
}) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        onChange(newValue);
    }, [onChange]);

    const handleBlur = useCallback(() => {
        onBlur?.();
    }, [onBlur]);

    return (
        <Field.Root className={className}>
            <Field.Label className={baseLabelStyles}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Field.Label>
            <Field.Control
                render={(props) => (
                    <input
                        {...props}
                        type={type}
                        value={localValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        maxLength={maxLength}
                        className={cn(baseInputStyles, inputClassName)}
                    />
                )}
            />
        </Field.Root>
    );
};

// FormNumberInput Component
interface FormNumberInputProps {
    label: string;
    value: number | string;
    onChange: (value: number) => void;
    onBlur?: () => void;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    min?: number;
    max?: number;
    step?: number;
}

export const FormNumberInput: React.FC<FormNumberInputProps> = ({
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    className,
    inputClassName,
    required = false,
    disabled = false,
    autoFocus = false,
    min,
    max,
    step
}) => {
    const [localValue, setLocalValue] = useState(value.toString());

    useEffect(() => {
        setLocalValue(value.toString());
    }, [value]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        const numValue = parseFloat(newValue);
        if (!isNaN(numValue)) {
            onChange(numValue);
        }
    }, [onChange]);

    const handleBlur = useCallback(() => {
        onBlur?.();
    }, [onBlur]);

    return (
        <Field.Root className={className}>
            <Field.Label className={baseLabelStyles}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Field.Label>
            <Field.Control
                render={(props) => (
                    <input
                        {...props}
                        type="number"
                        value={localValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        min={min}
                        max={max}
                        step={step}
                        className={cn(baseInputStyles, inputClassName)}
                    />
                )}
            />
        </Field.Root>
    );
};

// FormTextarea Component
interface FormTextareaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    className?: string;
    textareaClassName?: string;
    rows?: number;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    className,
    textareaClassName,
    rows = 3,
    required = false,
    disabled = false,
    autoFocus = false,
    maxLength
}) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        onChange(newValue);
    }, [onChange]);

    const handleBlur = useCallback(() => {
        onBlur?.();
    }, [onBlur]);

    return (
        <Field.Root className={className}>
            <Field.Label className={baseLabelStyles}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Field.Label>
            <Field.Control
                render={(props) => (
                    <textarea
                        {...props}
                        value={localValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        rows={rows}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        maxLength={maxLength}
                        className={cn(baseInputStyles, "resize-none", textareaClassName)}
                    />
                )}
            />
        </Field.Root>
    );
};

// FormSelect Component
interface FormSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    className?: string;
    required?: boolean;
    disabled?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
    label,
    value,
    onChange,
    options,
    className,
    required = false,
    disabled = false
}) => {
    return (
        <Field.Root className={className}>
            <Field.Label className={baseLabelStyles}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Field.Label>
            <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
                <Select.Trigger className={cn(baseInputStyles, "flex items-center justify-between")}>
                    <Select.Value />
                    <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                    <Select.Positioner>
                        <Select.Popup className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg shadow-lg">
                            {options.map((option) => (
                                <Select.Item
                                    key={option.value}
                                    value={option.value}
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                                >
                                    <Select.ItemText>{option.label}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Popup>
                    </Select.Positioner>
                </Select.Portal>
            </Select.Root>
        </Field.Root>
    );
};

// FormRadioGroup Component
interface FormRadioGroupProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; description?: string }[];
    className?: string;
    required?: boolean;
    disabled?: boolean;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
    label,
    value,
    onChange,
    options,
    className,
    required = false,
    disabled = false
}) => {
    return (
        <Field.Root className={className}>
            <Field.Label className={baseLabelStyles}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Field.Label>
            <RadioGroup value={value} onValueChange={(value) => onChange(value as string)} disabled={disabled}>
                <div className="space-y-2">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-start gap-3">
                            <Radio.Root
                                value={option.value}
                                className="mt-1 h-4 w-4 rounded-full border-2 border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700"
                            >
                                <Radio.Indicator className="h-2 w-2 rounded-full bg-blue-600" />
                            </Radio.Root>
                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                                    {option.label}
                                </label>
                                {option.description && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {option.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </RadioGroup>
        </Field.Root>
    );
};

// FormCheckboxGroup Component
interface FormCheckboxGroupProps {
    label: string;
    value: string[];
    onChange: (value: string[]) => void;
    options: { value: string; label: string; description?: string }[];
    className?: string;
    required?: boolean;
    disabled?: boolean;
}

export const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
    label,
    value,
    onChange,
    options,
    className,
    required = false,
    disabled = false
}) => {
    const handleCheckboxChange = useCallback((optionValue: string, checked: boolean) => {
        if (checked) {
            onChange([...value, optionValue]);
        } else {
            onChange(value.filter(v => v !== optionValue));
        }
    }, [value, onChange]);

    return (
        <Field.Root className={className}>
            <Field.Label className={baseLabelStyles}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Field.Label>
            <CheckboxGroup value={value} onValueChange={onChange} disabled={disabled}>
                <div className="space-y-2">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-start gap-3">
                            <Checkbox.Root
                                value={option.value}
                                checked={value.includes(option.value)}
                                onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
                                className="mt-1 h-4 w-4 rounded border-2 border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700"
                            >
                                <Checkbox.Indicator className="h-3 w-3 text-blue-600" />
                            </Checkbox.Root>
                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                                    {option.label}
                                </label>
                                {option.description && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {option.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CheckboxGroup>
        </Field.Root>
    );
};

// FormSwitch Component
interface FormSwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
    disabled?: boolean;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({
    label,
    checked,
    onChange,
    className,
    disabled = false
}) => {
    return (
        <Field.Root className={cn("flex items-center gap-3", className)}>
            <Switch.Root
                checked={checked}
                onCheckedChange={onChange}
                disabled={disabled}
                className={cn(
                    "h-7 w-12 rounded-full shadow-inner",
                    checked
                        ? "bg-blue-600 dark:bg-blue-500"
                        : "bg-gray-200 dark:bg-zinc-700"
                )}
            >
                <Switch.Thumb className={cn(
                    "block h-5 w-5 rounded-full bg-white transition-transform",
                    checked ? "translate-x-6" : "translate-x-1"
                )} />
            </Switch.Root>
            <div className="flex-1">
                <Field.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    {label}
                </Field.Label>
            </div>
        </Field.Root>
    );
};

// FormRange Component
interface FormRangeProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
    disabled?: boolean;
    showValue?: boolean;
}

export const FormRange: React.FC<FormRangeProps> = ({
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    className,
    disabled = false,
    showValue = true
}) => {
    return (
        <Field.Root className={className}>
            <div className="flex items-center justify-between mb-2">
                <Field.Label className={baseLabelStyles}>
                    {label}
                </Field.Label>
                {showValue && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {value}
                    </span>
                )}
            </div>
            <Slider.Root
                value={[value]}
                onValueChange={(values) => onChange(values[0])}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className="relative flex items-center w-full h-6"
            >
                <Slider.Control>
                    <Slider.Track className="relative h-2 w-full bg-gray-200 dark:bg-zinc-700 rounded-full">
                        <Slider.Indicator className="absolute h-full bg-blue-600 rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block h-5 w-5 bg-white border-2 border-blue-600 rounded-full shadow-md hover:bg-gray-50" />
                </Slider.Control>
            </Slider.Root>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </Field.Root>
    );
};