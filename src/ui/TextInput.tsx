import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
    showPasswordToggle?: boolean;
}

const TextInput = ({
    label,
    type = "text",
    error,
    icon,
    showPasswordToggle,
    className = "",
    id,
    name,
    disabled,
    ...rest
}: TextInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="space-y-1.5">
            <label
                htmlFor={inputId}
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                        {icon}
                    </span>
                )}

                <input
                    id={inputId}
                    name={name}
                    type={inputType}
                    disabled={disabled}
                    className={`
                        w-full py-2.5 text-sm rounded-lg border transition-all duration-200
                        bg-white dark:bg-neutral-900
                        text-neutral-900 dark:text-neutral-100
                        placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${icon ? "pl-10" : "pl-3"}
                        ${isPassword && showPasswordToggle ? "pr-10" : "pr-3"}
                        ${error
                            ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                            : "border-neutral-300 dark:border-neutral-700 focus:ring-blue-500/20 focus:border-blue-500"
                        }
                        ${className}
                    `}
                    {...rest}
                />

                {isPassword && showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={disabled}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors disabled:opacity-50"
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

export default TextInput;