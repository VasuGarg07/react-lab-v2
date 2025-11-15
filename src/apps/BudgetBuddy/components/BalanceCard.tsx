import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

type BalanceCardVariant = 'income' | 'expense' | 'neutral';

interface BalanceCardProps {
    icon: ReactNode;
    label: string;
    amount: number;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: BalanceCardVariant;
    className?: string;
}

export default function BalanceCard({
    icon,
    label,
    amount,
    trend,
    variant = 'neutral',
    className = '',
}: BalanceCardProps) {
    // Simplified color system - just 3 variants
    const getVariantClasses = () => {
        switch (variant) {
            case 'income':
                return {
                    iconBg: 'bg-emerald-100 dark:bg-emerald-950/30',
                    iconText: 'text-emerald-600 dark:text-emerald-400',
                    amountText: 'text-emerald-600 dark:text-emerald-400',
                };
            case 'expense':
                return {
                    iconBg: 'bg-red-100 dark:bg-red-950/30',
                    iconText: 'text-red-600 dark:text-red-400',
                    amountText: 'text-red-600 dark:text-red-400',
                };
            default:
                return {
                    iconBg: 'bg-neutral-100 dark:bg-neutral-800',
                    iconText: 'text-neutral-600 dark:text-neutral-400',
                    amountText: 'text-neutral-900 dark:text-neutral-100',
                };
        }
    };

    const variantClasses = getVariantClasses();

    // Format amount as Indian currency
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Math.abs(amount));

    return (
        <div
            className={`bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
        >
            {/* Header: Icon + Label */}
            <div className="flex items-center gap-3 mb-3">
                <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${variantClasses.iconBg}`}
                >
                    <div className={variantClasses.iconText}>{icon}</div>
                </div>

                <div className="flex-1">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        {label}
                    </p>
                </div>
            </div>

            {/* Amount */}
            <div className="mb-2">
                <p className={`text-2xl sm:text-3xl font-bold ${variantClasses.amountText}`}>
                    {formattedAmount}
                </p>
            </div>

            {/* Trend (optional) */}
            {trend && (
                <div className="flex items-center gap-1">
                    {trend.isPositive ? (
                        <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span
                        className={`text-xs font-medium ${trend.isPositive
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                    >
                        {trend.value > 0 ? '+' : ''}
                        {trend.value.toFixed(1)}%
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">
                        vs last month
                    </span>
                </div>
            )}
        </div>
    );
}
