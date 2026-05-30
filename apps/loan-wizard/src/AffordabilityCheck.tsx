import { useState } from 'react';
import { IndianRupee, CheckCircle, AlertTriangle } from 'lucide-react';
import { checkAffordability } from './loan.utilities';
import { TextInput } from '@react-lab/ui';
import { formatCurrency } from '@react-lab/shared';

interface AffordabilityCheckProps {
    monthlyEMI: number;
    className?: string;
}

const STATUS_CONFIG = {
    good: {
        icon: CheckCircle,
        iconColor: 'text-green-500',
        bgColor: 'bg-green-50 dark:bg-green-950/30',
        borderColor: 'border-green-300 dark:border-green-800',
        textColor: 'text-green-700 dark:text-green-400',
        progressColor: 'bg-green-500',
        label: 'Good',
        message: 'This EMI is well within your budget.',
    },
    moderate: {
        icon: AlertTriangle,
        iconColor: 'text-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
        borderColor: 'border-yellow-300 dark:border-yellow-800',
        textColor: 'text-yellow-700 dark:text-yellow-400',
        progressColor: 'bg-yellow-500',
        label: 'Moderate',
        message: 'Manageable, but consider your other expenses.',
    },
    high: {
        icon: AlertTriangle,
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-950/30',
        borderColor: 'border-red-300 dark:border-red-800',
        textColor: 'text-red-700 dark:text-red-400',
        progressColor: 'bg-red-500',
        label: 'High Risk',
        message: 'This EMI may strain your budget significantly.',
    },
} as const;

export default function AffordabilityCheck({ monthlyEMI, className = '' }: AffordabilityCheckProps) {
    const [monthlyIncome, setMonthlyIncome] = useState('');

    const incomeValue = parseFloat(monthlyIncome) || 0;
    const result = incomeValue > 0 ? checkAffordability(monthlyEMI, incomeValue) : null;
    const config = result ? STATUS_CONFIG[result.status] : null;
    const StatusIcon = config?.icon;

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Affordability Check</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Check if this EMI fits your budget</p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <TextInput
                    label="Monthly Take-Home Income"
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    placeholder="Enter your monthly income"
                    icon={<IndianRupee size={18} />}
                />
            </div>

            {result && config && StatusIcon && (
                <>
                    <div className={`rounded-lg p-4 border ${config.bgColor} ${config.borderColor}`}>
                        <div className="flex items-center gap-3 mb-3">
                            <StatusIcon size={20} className={config.iconColor} />
                            <h4 className={`text-sm font-semibold ${config.textColor}`}>{config.label}</h4>
                        </div>

                        <div className="mb-3">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">EMI to Income Ratio</span>
                                <span className={`text-sm font-semibold ${config.textColor}`}>{result.ratio}%</span>
                            </div>
                            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${config.progressColor} transition-all duration-300`}
                                    style={{ width: `${Math.min(result.ratio, 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                <span>0%</span>
                                <span>30% (Ideal)</span>
                                <span>40% (Max)</span>
                            </div>
                        </div>

                        <p className={`text-sm ${config.textColor}`}>{config.message}</p>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Monthly EMI</div>
                                <div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                    {formatCurrency(monthlyEMI)}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Remaining Income</div>
                                <div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                    {formatCurrency(incomeValue - monthlyEMI)}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
