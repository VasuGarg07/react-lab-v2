import React, { useState } from 'react';
import { IndianRupee, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Tooltip from '@/ui/Tooltip';
import { checkAffordability, formatCurrency, formatIndianNumber } from './loanUtils';

interface AffordabilityCheckProps {
    monthlyEMI: number;
    className?: string;
}

const AffordabilityCheck: React.FC<AffordabilityCheckProps> = ({
    monthlyEMI,
    className = ''
}) => {
    const [monthlyIncome, setMonthlyIncome] = useState<number>(0);

    // Calculate affordability when income is provided
    const affordabilityResult = monthlyIncome > 0
        ? checkAffordability(monthlyEMI, monthlyIncome)
        : null;

    // Handle income input change
    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        if (value >= 0) {
            setMonthlyIncome(value);
        }
    };

    // Get status styling based on affordability
    const getStatusStyling = () => {
        if (!affordabilityResult) return null;

        switch (affordabilityResult.status) {
            case 'good':
                return {
                    icon: CheckCircle,
                    iconColor: 'text-green-500',
                    bgColor: 'bg-green-50 dark:bg-green-900/20',
                    borderColor: 'border-green-200 dark:border-green-800',
                    textColor: 'text-green-800 dark:text-green-300',
                    progressColor: 'bg-green-500',
                    message: 'Excellent! This EMI is well within your budget.',
                    recommendation: 'You have good financial cushion for this loan.'
                };
            case 'moderate':
                return {
                    icon: AlertTriangle,
                    iconColor: 'text-yellow-500',
                    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
                    borderColor: 'border-yellow-200 dark:border-yellow-800',
                    textColor: 'text-yellow-800 dark:text-yellow-300',
                    progressColor: 'bg-yellow-500',
                    message: 'Manageable, but consider your other expenses carefully.',
                    recommendation: 'Ensure you have emergency funds before proceeding.'
                };
            case 'high':
                return {
                    icon: AlertTriangle,
                    iconColor: 'text-red-500',
                    bgColor: 'bg-red-50 dark:bg-red-900/20',
                    borderColor: 'border-red-200 dark:border-red-800',
                    textColor: 'text-red-800 dark:text-red-300',
                    progressColor: 'bg-red-500',
                    message: 'This EMI might strain your budget significantly.',
                    recommendation: 'Consider reducing loan amount or increasing tenure.'
                };
            default:
                return null;
        }
    };

    const statusStyling = getStatusStyling();
    const StatusIcon = statusStyling?.icon;

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Header */}
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Affordability Check
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check if this EMI fits your budget
                </p>
            </div>

            {/* Income Input Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                    <IndianRupee size={18} className="text-blue-600 dark:text-blue-400" />
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Monthly Income
                    </h4>
                    <Tooltip content="Enter your take-home salary after all deductions (PF, tax, etc.)">
                        <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help" />
                    </Tooltip>
                </div>

                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                        ₹
                    </span>
                    <input
                        type="number"
                        value={monthlyIncome || ''}
                        onChange={handleIncomeChange}
                        placeholder="Enter your monthly take-home salary"
                        min={0}
                        step={5000}
                        className="w-full pl-8 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-lg"
                    />
                </div>

                {monthlyIncome > 0 && (
                    <div className="text-center mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Monthly Income: <span className="font-semibold text-blue-600 dark:text-blue-400">
                                {formatIndianNumber(monthlyIncome)}
                            </span>
                        </span>
                    </div>
                )}
            </div>

            {/* Affordability Results */}
            {affordabilityResult && statusStyling && (
                <div className={`rounded-xl p-4 border ${statusStyling.bgColor} ${statusStyling.borderColor}`}>
                    {/* Status Header */}
                    <div className="flex items-center gap-3 mb-3">
                        {StatusIcon && <StatusIcon size={20} className={statusStyling.iconColor} />}
                        <h4 className={`text-sm font-semibold ${statusStyling.textColor}`}>
                            Affordability Status
                        </h4>
                    </div>

                    {/* EMI to Income Ratio */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                EMI to Income Ratio
                            </span>
                            <span className={`text-sm font-semibold ${statusStyling.textColor}`}>
                                {affordabilityResult.ratio}%
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${statusStyling.progressColor} transition-all duration-300`}
                                style={{ width: `${Math.min(affordabilityResult.ratio, 100)}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>0%</span>
                            <span>30% (Ideal)</span>
                            <span>40% (Max)</span>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                Monthly EMI
                            </div>
                            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {formatCurrency(monthlyEMI)}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                Remaining Income
                            </div>
                            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {formatCurrency(monthlyIncome - monthlyEMI)}
                            </div>
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className={`text-sm ${statusStyling.textColor} mb-2`}>
                        <strong>Analysis:</strong> {statusStyling.message}
                    </div>

                    <div className={`text-sm ${statusStyling.textColor}`}>
                        <strong>Recommendation:</strong> {statusStyling.recommendation}
                    </div>
                </div>
            )}

            {/* Comparison with Recommended EMI */}
            {affordabilityResult && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
                        EMI Comparison
                    </h4>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Your Current EMI:
                            </span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {formatCurrency(monthlyEMI)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Recommended Max EMI (30%):
                            </span>
                            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                {formatCurrency(affordabilityResult.maxRecommended)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Difference:
                            </span>
                            <span className={`text-sm font-semibold ${monthlyEMI <= affordabilityResult.maxRecommended
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                                }`}>
                                {monthlyEMI <= affordabilityResult.maxRecommended ? '+' : ''}{formatCurrency(affordabilityResult.maxRecommended - monthlyEMI)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Guidelines */}
            {!monthlyIncome && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                        <TrendingUp size={18} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                                Affordability Guidelines
                            </h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                                <li>• <strong>Ideal:</strong> EMI should be ≤ 30% of monthly income</li>
                                <li>• <strong>Maximum:</strong> EMI should not exceed 40% of income</li>
                                <li>• <strong>Consider:</strong> Keep emergency funds for unexpected expenses</li>
                                <li>• <strong>Factor in:</strong> Other monthly expenses and future goals</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Emergency Fund Reminder */}
            {affordabilityResult && affordabilityResult.status !== 'high' && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                        <div className="text-lg">💰</div>
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                                Emergency Fund Tip
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Keep 6-12 months of expenses saved before taking a loan.
                                Recommended emergency fund: <strong>{formatCurrency((monthlyIncome - monthlyEMI) * 6)}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AffordabilityCheck;