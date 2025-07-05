import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/cn';

export interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
    (
        {
            className = '',
            children,
            isLoading = false,
            loadingText,
            variant = 'primary',
            size = 'md',
            icon,
            iconPosition = 'left',
            fullWidth = false,
            disabled,
            type = 'button',
            ...props
        },
        ref
    ) => {
        // Handle variant styles - minimal approach
        const variantStyles = {
            primary: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white',
            secondary: 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100',
            outline: 'bg-transparent border border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800',
            ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
        };

        // Handle size styles - simplified
        const sizeStyles = {
            xs: 'h-7 px-2 text-xs',
            sm: 'h-8 px-3 text-xs',
            md: 'h-9 px-4 text-sm',
            lg: 'h-10 px-5 text-sm',
        };

        // Loading spinner - simplified
        const LoadingSpinner = () => (
            <svg
                className={cn(
                    'animate-spin',
                    size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
                    iconPosition === 'left' ? 'mr-2' : 'ml-2'
                )}
                fill="none"
                viewBox="0 0 24 24"
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
        );

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || isLoading}
                className={cn(
                    // Base styles - minimal
                    'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 flex items-center justify-center',
                    variantStyles[variant],
                    sizeStyles[size],
                    fullWidth ? 'w-full' : '',
                    (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <>
                        {iconPosition === 'left' && <LoadingSpinner />}
                        <span>{loadingText || children}</span>
                        {iconPosition === 'right' && <LoadingSpinner />}
                    </>
                ) : (
                    <>
                        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
                        {children}
                        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
                    </>
                )}
            </button>
        );
    }
);

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;