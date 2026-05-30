import { TrendingUp, Wallet } from 'lucide-react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { type LoanParams, calculateLoanResults, prepareChartData } from './loan.utilities';
import { formatCurrency } from '@react-lab/shared';

interface LoanResultsProps {
    loanParams: LoanParams;
    className?: string;
}

const COLORS = { principal: '#3b82f6', interest: '#ef4444' };

const ChartTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];
    return (
        <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{name}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatCurrency(value)}</p>
        </div>
    );
};

export default function LoanResults({ loanParams, className = '' }: LoanResultsProps) {
    const { monthlyEMI, totalInterest, totalPayment } = calculateLoanResults(loanParams);
    const chartData = prepareChartData(loanParams);
    const principalPct = ((loanParams.loanAmount / totalPayment) * 100).toFixed(1);
    const interestPct = ((totalInterest / totalPayment) * 100).toFixed(1);

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Loan Summary</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Your calculated loan breakdown</p>
            </div>

            <div className="bg-blue-600 dark:bg-blue-700 rounded-lg p-5 text-white shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Wallet size={20} />
                    <h4 className="text-sm font-medium">Monthly EMI</h4>
                </div>
                <div className="text-3xl font-bold mb-1">{formatCurrency(monthlyEMI)}</div>
                <div className="text-blue-100 text-sm">
                    For {loanParams.tenure} years at {loanParams.interestRate}% interest
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">Payment Breakdown</h4>

                <div className="h-64 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                                paddingAngle={2} dataKey="value">
                                <Cell fill={COLORS.principal} />
                                <Cell fill={COLORS.interest} />
                            </Pie>
                            <Tooltip content={<ChartTooltip />} />
                            <Legend verticalAlign="bottom" height={36}
                                formatter={(value) => (
                                    <span className="text-xs text-neutral-700 dark:text-neutral-300">{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">Principal</span>
                        </div>
                        <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                            {formatCurrency(loanParams.loanAmount)}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{principalPct}%</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">Interest</span>
                        </div>
                        <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                            {formatCurrency(totalInterest)}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{interestPct}%</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-neutral-600 dark:text-neutral-400" />
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Total Payment</span>
                    </div>
                    <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        {formatCurrency(totalPayment)}
                    </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    Over {loanParams.tenure * 12} monthly payments
                </p>
            </div>
        </div>
    );
}
