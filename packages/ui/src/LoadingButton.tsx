import React from "react";

interface LoadingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
    fullWidth?: boolean;
}

export function LoadingButton ({
    children,
    isLoading = false,
    loadingText,
    fullWidth = false,
    disabled,
    className = "",
    ...props
}: LoadingButtonProps) {
    return (
        <button
            disabled={disabled || isLoading}
            className={`
                inline-flex items-center justify-center gap-2 rounded-lg
                bg-blue-600 hover:bg-blue-700 text-white 
                px-4 py-2.5 text-sm font-medium 
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0
                disabled:opacity-50 disabled:cursor-not-allowed
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
            {...props}
        >
            {isLoading && (
                <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {isLoading ? loadingText || children : children}
        </button>
    );
};
