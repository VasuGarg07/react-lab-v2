import React, { forwardRef, ReactNode } from 'react';
import { Field as BaseField } from '@base-ui-components/react/field';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/cn';

interface FormFieldProps {
    label: string;
    controlName: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    icon?: ReactNode;
    error?: string;
    required?: boolean;
    showPasswordToggle?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
    className?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>>(
    ({
        label,
        controlName,
        type = 'text',
        placeholder,
        icon,
        error,
        required,
        showPasswordToggle,
        showPassword,
        onTogglePassword,
        className,
        ...props
    }, ref) => {
        const inputType = type === 'password' && showPassword ? 'text' : type;

        return (
            <div className={cn("space-y-1", className)}>
                <BaseField.Root name={controlName}>
                    <BaseField.Label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        {label}
                    </BaseField.Label>
                    <div className="relative">
                        {icon && (
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-slate-400">
                                    {icon}
                                </span>
                            </div>
                        )}
                        <BaseField.Control
                            ref={ref}
                            type={inputType}
                            placeholder={placeholder}
                            required={required}
                            className={cn(
                                "w-full py-2.5 text-sm rounded-md border transition-colors",
                                "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
                                "placeholder:text-slate-400",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                                icon ? "pl-10" : "pl-3",
                                showPasswordToggle ? "pr-10" : "pr-3",
                                error
                                    ? "border-red-500 ring-2 ring-red-500/20"
                                    : "border-slate-300 dark:border-slate-600"
                            )}
                            {...props}
                        />
                        {showPasswordToggle && (
                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>
                    {error && (
                        <BaseField.Error className="text-xs text-red-500">
                            {error}
                        </BaseField.Error>
                    )}
                </BaseField.Root>
            </div>
        );
    }
);

FormField.displayName = 'FormField';

export default FormField;