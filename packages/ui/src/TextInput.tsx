import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
    showPasswordToggle?: boolean;
    labelClassName?: string;
    inputClassName?: string;
    iconClassName?: string;
    wrapperClassName?: string;
}

export function TextInput({
    label,
    type = "text",
    error,
    icon,
    showPasswordToggle,
    className = "",
    labelClassName = "",
    inputClassName = "",
    iconClassName = "",
    wrapperClassName = "",
    id,
    name,
    disabled,
    required,
    ...rest
}: TextInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className={`space-y-1.5 ${wrapperClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={`block text-sm font-medium text-neutral-700 ${labelClassName}`}
                >
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 pointer-events-none ${iconClassName}`}>
                        {icon}
                    </span>
                )}

                <input
                    id={inputId}
                    name={name}
                    type={inputType}
                    disabled={disabled}
                    required={required}
                    className={`
                        w-full py-2.5 text-sm rounded-lg border
                        bg-white text-neutral-900
                        placeholder:text-neutral-400
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${icon ? "pl-10" : "pl-3"}
                        ${isPassword && showPasswordToggle ? "pr-10" : "pr-3"}
                        ${error
                            ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                            : "border-neutral-300 focus:ring-blue-500/20 focus:border-blue-500"
                        }
                        ${inputClassName}
                        ${className}
                    `}
                    {...rest}
                />

                {isPassword && showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={disabled}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 transition-colors disabled:opacity-50"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {error}
                </p>
            )}
        </div>
    );
};
