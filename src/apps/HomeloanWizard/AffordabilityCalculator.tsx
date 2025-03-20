import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { useLoan } from './LoanContext';
import { formatCurrency } from './loan.utils';
import { cn } from '@/shared/cn';

const AffordabilityCalculator: React.FC = () => {
    const {
        monthlyPayment,
        monthlyIncome,
        monthlyExpenses,
        updateAffordabilityInputs,
        affordabilityMetrics
    } = useLoan();

    // Handle income change
    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= 0) {
            updateAffordabilityInputs(value, monthlyExpenses);
        }
    };

    // Handle expenses change
    const handleExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= monthlyIncome) {
            updateAffordabilityInputs(monthlyIncome, value);
        }
    };

    // Get progress bar color based on DTI ratio
    const getDTIProgressColor = () => {
        if (!affordabilityMetrics) return 'bg-blue-500';

        const { debtToIncomeRatio } = affordabilityMetrics;

        if (debtToIncomeRatio <= 36) return 'bg-green-500';
        if (debtToIncomeRatio <= 43) return 'bg-amber-500';
        return 'bg-red-500';
    };

    // Get alert component based on affordability status
    const getAffordabilityAlert = () => {
        if (!affordabilityMetrics) return null;

        const { affordabilityStatus, debtToIncomeRatio } = affordabilityMetrics;

        switch (affordabilityStatus) {
            case 'good':
                return (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Good affordability</h4>
                            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                                Your debt-to-income ratio is {debtToIncomeRatio}%, which is within the recommended limit of 36%.
                                Lenders typically view this favorably.
                            </p>
                        </div>
                    </div>
                );

            case 'caution':
                return (
                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Proceed with caution</h4>
                            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                                Your debt-to-income ratio is {debtToIncomeRatio}%, which is above the ideal limit of 36% but below
                                the maximum of 43% that most lenders allow.
                            </p>
                        </div>
                    </div>
                );

            case 'warning':
                return (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Affordability concern</h4>
                            <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                                Your debt-to-income ratio is {debtToIncomeRatio}%, which exceeds the 43% limit that most lenders allow.
                                Consider reducing your loan amount or increasing your income.
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-sm dark:shadow-2xl border border-white/20 dark:border-neutral-800/20">
            <div className="px-5 py-4">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">
                    Affordability Calculator
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                            Monthly Income (After Tax)
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500 dark:text-neutral-400">
                                ₹
                            </span>
                            <input
                                type="number"
                                value={monthlyIncome || ''}
                                onChange={handleIncomeChange}
                                placeholder="Enter your monthly income"
                                min={0}
                                step={1000}
                                className={cn(
                                    "w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800",
                                    "text-neutral-900 dark:text-white pl-8 pr-3 py-2.5 text-sm",
                                    "focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500",
                                    "transition-colors"
                                )}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                            Monthly Expenses (Excluding Housing)
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500 dark:text-neutral-400">
                                ₹
                            </span>
                            <input
                                type="number"
                                value={monthlyExpenses || ''}
                                onChange={handleExpensesChange}
                                placeholder="Enter your monthly expenses"
                                min={0}
                                max={monthlyIncome}
                                step={1000}
                                className={cn(
                                    "w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800",
                                    "text-neutral-900 dark:text-white pl-8 pr-3 py-2.5 text-sm",
                                    "focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500",
                                    "transition-colors"
                                )}
                            />
                        </div>
                    </div>
                </div>

                {!monthlyIncome ? (
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-600 dark:text-neutral-400">
                        Enter your monthly income and expenses to see affordability metrics.
                    </div>
                ) : (
                    <div>
                        <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50/80 dark:bg-neutral-800/60 backdrop-blur-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Monthly Payment</h4>
                                    <p className="text-2xl font-semibold text-neutral-900 dark:text-white mt-1">
                                        {formatCurrency(monthlyPayment)}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Available Income (After Expenses)</h4>
                                    <p className="text-2xl font-semibold text-neutral-900 dark:text-white mt-1">
                                        {formatCurrency(monthlyIncome - monthlyExpenses)}
                                    </p>
                                </div>

                                {affordabilityMetrics && (
                                    <>
                                        <div className="col-span-1 md:col-span-2">
                                            <div className="h-px bg-neutral-200 dark:bg-neutral-700 my-2"></div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Maximum Recommended Payment</h4>
                                            <p className="text-2xl font-semibold text-neutral-900 dark:text-white mt-1">
                                                {formatCurrency(affordabilityMetrics.maxRecommendedPayment)}
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">
                                                Based on 28% of monthly income
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Debt-to-Income Ratio</h4>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${getDTIProgressColor()}`}
                                                        style={{ width: `${Math.min(affordabilityMetrics.debtToIncomeRatio, 100)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                    {affordabilityMetrics.debtToIncomeRatio}%
                                                </span>
                                            </div>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1.5">
                                                (Housing + Expenses) ÷ Income
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {getAffordabilityAlert()}

                        <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-4"></div>

                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            General guideline: Your total debt payments (including this loan) should ideally be below 36% of your gross income, and most lenders set a maximum limit of 43%.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AffordabilityCalculator;