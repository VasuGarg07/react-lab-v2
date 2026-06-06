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
        iconColor: 'text-shamrock',
        bgColor: 'bg-shamrock/8',
        borderColor: 'border-shamrock/30',
        textColor: 'text-shamrock',
        progressColor: 'bg-shamrock',
        label: 'Affordable',
        message: 'This EMI is well within your budget.',
    },
    moderate: {
        icon: AlertTriangle,
        iconColor: 'text-flame',
        bgColor: 'bg-flame/8',
        borderColor: 'border-flame/30',
        textColor: 'text-flame',
        progressColor: 'bg-flame',
        label: 'Moderate',
        message: 'Manageable, but consider your other expenses.',
    },
    high: {
        icon: AlertTriangle,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-600',
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
        <div className={`flex flex-col gap-4 ${className}`}>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-jet/40">Affordability</h3>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-jet/8">
                <TextInput
                    label="Monthly Take-Home Income"
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    placeholder="e.g. 80000"
                    icon={<IndianRupee size={16} />}
                    labelClassName="text-jet/70 font-medium"
                    iconClassName="text-jet/30"
                    inputClassName="border-jet/15 text-jet placeholder:text-jet/25 focus:ring-bell/20 focus:border-bell"
                />
            </div>

            {result && config && StatusIcon ? (
                <>
                    <div className={`rounded-xl p-4 border ${config.bgColor} ${config.borderColor}`}>
                        <div className="flex items-center gap-2 mb-3">
                            <StatusIcon size={18} className={config.iconColor} />
                            <span className={`text-sm font-semibold ${config.textColor}`}>{config.label}</span>
                            <span className={`ml-auto text-sm font-bold ${config.textColor}`}>{result.ratio}%</span>
                        </div>
                        <div className="w-full bg-jet/10 rounded-full h-1.5 mb-1">
                            <div
                                className={`h-1.5 rounded-full ${config.progressColor} transition-all duration-500`}
                                style={{ width: `${Math.min(result.ratio, 100)}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-jet/35 mt-1 mb-3">
                            <span>0%</span><span>30% ideal</span><span>40% max</span>
                        </div>
                        <p className={`text-xs ${config.textColor}`}>{config.message}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-jet/8 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-jet/40 mb-1">EMI</p>
                            <p className="text-base font-bold text-jet">{formatCurrency(monthlyEMI)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-jet/40 mb-1">Remaining</p>
                            <p className="text-base font-bold text-jet">{formatCurrency(incomeValue - monthlyEMI)}</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-jet/8 text-center">
                    <p className="text-sm text-jet/35">Enter your income to check affordability</p>
                </div>
            )}
        </div>
    );
}
