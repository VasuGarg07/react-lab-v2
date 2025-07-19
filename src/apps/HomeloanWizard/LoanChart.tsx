import { FC } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency, LoanParams, prepareDonutChartData } from './loanUtils';

interface LoanChartProps {
    loanParams: LoanParams;
    className?: string;
}

// Modern color palette
const COLORS = {
    principal: '#3B82F6', // Blue - represents your investment
    interest: '#EF4444',  // Red - represents cost
    principalLight: '#DBEAFE', // Light blue for gradients
    interestLight: '#FEE2E2'   // Light red for gradients
};

// Custom tooltip for donut chart
const DonutTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0]

        return (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatCurrency(value)}
                </p>
            </div>
        );
    }
    return null;
};

const LoanChart: FC<LoanChartProps> = ({ loanParams, className = '' }) => {
    // Prepare chart data using utility functions
    const donutData = prepareDonutChartData(loanParams);

    // Calculate totals for display
    const totalPrincipal = loanParams.loanAmount;
    const totalInterest = donutData[1].interest;
    const totalAmount = totalPrincipal + totalInterest;

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Title and Summary */}
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Loan Breakdown
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    You'll pay <span className="font-medium text-red-600 dark:text-red-400">
                        {formatCurrency(totalInterest)}
                    </span> in interest over {loanParams.tenure} years
                </p>
            </div>

            {/* Donut Chart - Principal vs Interest */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                    Total Payment Breakdown
                </h4>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Principal Amount', value: totalPrincipal, displayValue: totalPrincipal },
                                    { name: 'Total Interest', value: totalInterest, displayValue: totalInterest }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                <Cell fill={COLORS.principal} />
                                <Cell fill={COLORS.interest} />
                            </Pie>
                            <Tooltip content={<DonutTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                formatter={(value, entry) => (
                                    <span style={{ color: entry.color, fontSize: '12px' }}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Summary stats below donut */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Principal</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {formatCurrency(totalPrincipal)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {((totalPrincipal / totalAmount) * 100).toFixed(1)}%
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Interest</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {formatCurrency(totalInterest)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {((totalInterest / totalAmount) * 100).toFixed(1)}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Key Insight */}
            <div className="bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-900/20 dark:to-red-900/20 rounded-lg p-3">
                <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Key Insight
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {((totalInterest / totalPrincipal) * 100).toFixed(1)}% of your loan amount goes to interest.
                            {totalInterest > totalPrincipal * 0.5
                                ? " Consider a shorter tenure or higher down payment to reduce interest costs."
                                : " This is a reasonable interest-to-principal ratio."
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanChart;