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
        // Handle variant styles
        const variantStyles = {
            primary: 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white shadow-md hover:shadow-lg',
            secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200',
            outline: 'bg-transparent border border-primary-600 hover:bg-primary-50 text-primary-600 dark:border-primary-500 dark:text-primary-500 dark:hover:bg-primary-900/20',
            ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
        };

        // Handle size styles
        const sizeStyles = {
            xs: 'py-1 px-2 text-xs',
            sm: 'py-1.5 px-3 text-xs',
            md: 'py-2 px-4 text-sm',
            lg: 'py-2.5 px-5 text-base',
        };

        // Loading spinner
        const LoadingSpinner = () => (
            <svg
                className={cn(
                    'animate-spin',
                    size === 'xs' || size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
                    iconPosition === 'left' ? 'mr-2' : 'ml-2'
                )}
                xmlns="http://www.w3.org/2000/svg"
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
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        );

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || isLoading}
                className={cn(
                    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center justify-center',
                    variantStyles[variant],
                    sizeStyles[size],
                    fullWidth ? 'w-full' : '',
                    (disabled || isLoading) && 'opacity-60 cursor-not-allowed',
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