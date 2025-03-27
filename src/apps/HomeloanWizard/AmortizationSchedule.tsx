import { cn } from '@/shared/cn';
import Select from '@/ui/Select';
import { BarChart2, ChevronRight, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts';
import { useLoan } from './LoanContext';
import { formatCurrency } from './loan.utils';

type ChartType = 'bar' | 'line' | 'area';
type DisplayOption = 'yearly-payment' | 'remaining-balance' | 'cumulative';

const AmortizationSchedule: React.FC = () => {
    const { amortizationSchedule } = useLoan();
    const [chartType, setChartType] = useState<ChartType>('bar');
    const [displayOption, setDisplayOption] = useState<DisplayOption>('yearly-payment');
    const [showFullTable, setShowFullTable] = useState(false);

    // Chart colors with better palette for Apple-like UI
    const chartColors = {
        principal: '#0A84FF', // iOS blue
        interest: '#FF453A',  // iOS red
        balance: '#30D158',   // iOS green
        total: '#FFD60A'      // iOS yellow
    };

    // Format data for the chart based on the display option
    const chartData = useMemo(() => {
        switch (displayOption) {
            case 'yearly-payment':
                return amortizationSchedule.map(year => ({
                    year: `Y${year.year}`, // Shorter label for mobile
                    yearFull: `Year ${year.year}`, // Full label for tooltip
                    principal: year.principalPaid,
                    interest: year.interestPaid
                }));
            case 'remaining-balance':
                return amortizationSchedule.map(year => ({
                    year: `Y${year.year}`,
                    yearFull: `Year ${year.year}`,
                    balance: year.remainingBalance
                }));
            case 'cumulative':
                let cumulativePrincipal = 0;
                let cumulativeInterest = 0;

                return amortizationSchedule.map(year => {
                    cumulativePrincipal += year.principalPaid;
                    cumulativeInterest += year.interestPaid;

                    return {
                        year: `Y${year.year}`,
                        yearFull: `Year ${year.year}`,
                        principal: cumulativePrincipal,
                        interest: cumulativeInterest,
                        total: cumulativePrincipal + cumulativeInterest
                    };
                });
            default:
                return amortizationSchedule.map(year => ({
                    year: `Y${year.year}`,
                    yearFull: `Year ${year.year}`,
                    principal: year.principalPaid,
                    interest: year.interestPaid
                }));
        }
    }, [amortizationSchedule, displayOption]);

    // Render the appropriate chart based on the chart type with responsive adjustments
    const renderChart = () => {
        // Common responsive settings
        const commonProps = {
            margin: { top: 20, right: 5, left: 0, bottom: 5 },
            data: chartData
        };

        // Common tooltip styles
        const tooltipStyle = {
            contentStyle: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '6px',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                padding: '8px 12px',
            },
            labelFormatter: (label: any) => {
                // Find the corresponding full year label
                const item = chartData.find(item => item.year === label);
                return item?.yearFull || label;
            }
        };

        // Make Y-Axis formatter more mobile-friendly
        const formatYAxis = (value: number) => {
            if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(1)}K`;
            }
            return `$${value}`;
        };

        switch (chartType) {
            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-neutral-700" />
                        <XAxis dataKey="year" tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" />
                        <YAxis tickFormatter={formatYAxis} tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" width={45} />
                        <RechartsTooltip
                            formatter={(value) => formatCurrency(value as number)}
                            {...tooltipStyle}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                        {displayOption !== 'remaining-balance' && (
                            <Bar dataKey="principal" name="Principal" fill={chartColors.principal} radius={[4, 4, 0, 0]} />
                        )}
                        {displayOption !== 'remaining-balance' && (
                            <Bar dataKey="interest" name="Interest" fill={chartColors.interest} radius={[4, 4, 0, 0]} />
                        )}
                        {displayOption === 'remaining-balance' && (
                            <Bar dataKey="balance" name="Balance" fill={chartColors.balance} radius={[4, 4, 0, 0]} />
                        )}
                        {displayOption === 'cumulative' && (
                            <Bar dataKey="total" name="Total" fill={chartColors.total} radius={[4, 4, 0, 0]} />
                        )}
                    </BarChart>
                );

            case 'line':
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-neutral-700" />
                        <XAxis dataKey="year" tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" />
                        <YAxis tickFormatter={formatYAxis} tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" width={45} />
                        <RechartsTooltip
                            formatter={(value) => formatCurrency(value as number)}
                            {...tooltipStyle}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                        {displayOption !== 'remaining-balance' && (
                            <Line type="monotone" dataKey="principal" name="Principal" stroke={chartColors.principal} strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 2 }} />
                        )}
                        {displayOption !== 'remaining-balance' && (
                            <Line type="monotone" dataKey="interest" name="Interest" stroke={chartColors.interest} strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 2 }} />
                        )}
                        {displayOption === 'remaining-balance' && (
                            <Line type="monotone" dataKey="balance" name="Balance" stroke={chartColors.balance} strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 2 }} />
                        )}
                        {displayOption === 'cumulative' && (
                            <Line type="monotone" dataKey="total" name="Total" stroke={chartColors.total} strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 2 }} />
                        )}
                    </LineChart>
                );

            case 'area':
                return (
                    <AreaChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-neutral-700" />
                        <XAxis dataKey="year" tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" />
                        <YAxis tickFormatter={formatYAxis} tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" width={45} />
                        <RechartsTooltip
                            formatter={(value) => formatCurrency(value as number)}
                            {...tooltipStyle}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                        {displayOption !== 'remaining-balance' && (
                            <Area type="monotone" dataKey="principal" name="Principal" stackId="1" stroke={chartColors.principal} fill={`${chartColors.principal}80`} />
                        )}
                        {displayOption !== 'remaining-balance' && (
                            <Area type="monotone" dataKey="interest" name="Interest" stackId="1" stroke={chartColors.interest} fill={`${chartColors.interest}80`} />
                        )}
                        {displayOption === 'remaining-balance' && (
                            <Area type="monotone" dataKey="balance" name="Balance" stroke={chartColors.balance} fill={`${chartColors.balance}80`} />
                        )}
                        {displayOption === 'cumulative' && (
                            <Area type="monotone" dataKey="total" name="Total" stroke={chartColors.total} fill={`${chartColors.total}80`} />
                        )}
                    </AreaChart>
                );

            default:
                return <></>;
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-sm dark:shadow-2xl border border-white/20 dark:border-neutral-800/20">
            <div className="px-3 sm:px-5 py-3 sm:py-4">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                    Amortization Schedule
                </h3>

                {/* Controls - Stack vertically on mobile, horizontal on larger screens */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 mb-4 gap-3">
                    {/* Display Options Dropdown */}
                    <div className="w-full sm:w-auto">
                        <Select
                            options={[
                                { value: 'yearly-payment', label: 'Yearly Payments' },
                                { value: 'remaining-balance', label: 'Remaining Balance' },
                                { value: 'cumulative', label: 'Cumulative Payments' }
                            ]}
                            value={displayOption}
                            onValueChange={(value) => setDisplayOption(value as DisplayOption)}
                            placeholder="Select display"
                            className="w-full sm:w-48 bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200"
                        />
                    </div>

                    {/* Chart Type Selector - Centered on mobile */}
                    <div className="flex self-center sm:self-auto space-x-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
                        <button
                            onClick={() => setChartType('bar')}
                            className={cn(
                                "p-2 rounded-md transition-colors",
                                chartType === 'bar'
                                    ? "bg-blue-500 text-white"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            )}
                            aria-label="Bar chart"
                        >
                            <BarChart2 size={16} />
                        </button>
                        <button
                            onClick={() => setChartType('line')}
                            className={cn(
                                "p-2 rounded-md transition-colors",
                                chartType === 'line'
                                    ? "bg-blue-500 text-white"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            )}
                            aria-label="Line chart"
                        >
                            <LineChartIcon size={16} />
                        </button>
                        <button
                            onClick={() => setChartType('area')}
                            className={cn(
                                "p-2 rounded-md transition-colors",
                                chartType === 'area'
                                    ? "bg-blue-500 text-white"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            )}
                            aria-label="Area chart"
                        >
                            <PieChartIcon size={16} />
                        </button>
                    </div>
                </div>

                {/* Chart Container - Adjust height for better mobile display */}
                <div className="h-64 sm:h-[320px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart()}
                    </ResponsiveContainer>
                </div>

                {/* Divider */}
                <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-3 sm:my-4"></div>

                {/* Table Title with Toggle Button for Mobile */}
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-base font-medium text-neutral-900 dark:text-white">
                        Year-by-Year Breakdown
                    </h4>
                    <button
                        onClick={() => setShowFullTable(!showFullTable)}
                        className="sm:hidden flex items-center text-blue-500 text-sm font-medium"
                    >
                        {showFullTable ? 'Show Less' : 'Show All'}
                        <ChevronRight size={16} className={`ml-1 transition-transform ${showFullTable ? 'rotate-90' : ''}`} />
                    </button>
                </div>

                {/* Responsive Table for Mobile */}
                <div className="relative overflow-x-auto">
                    <div className={cn(
                        "border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden mb-2 shadow-sm",
                        showFullTable ? "" : "sm:max-h-[280px] max-h-[200px]"
                    )}>
                        <table className="w-full border-collapse table-auto">
                            <thead className="sticky top-0 bg-neutral-50 dark:bg-neutral-800 text-xs uppercase border-b border-neutral-200 dark:border-neutral-700 shadow-sm z-10">
                                <tr>
                                    <th className="px-2 sm:px-3 py-2 sm:py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0">Year</th>
                                    <th className="px-2 sm:px-3 py-2 sm:py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0">Principal</th>
                                    <th className="px-2 sm:px-3 py-2 sm:py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0">Interest</th>
                                    <th className="px-2 sm:px-3 py-2 sm:py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0 hidden sm:table-cell">Total</th>
                                    <th className="px-2 sm:px-3 py-2 sm:py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300 hidden sm:table-cell">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 text-xs sm:text-sm">
                                {amortizationSchedule.map((year) => (
                                    <tr
                                        key={year.year}
                                        className="text-center text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                                    >
                                        <td className="px-2 sm:px-3 py-2 border-r border-b border-neutral-100 dark:border-neutral-800">{year.year}</td>
                                        <td className="px-2 sm:px-3 py-2 border-r border-b border-neutral-100 dark:border-neutral-800">{formatCurrency(year.principalPaid)}</td>
                                        <td className="px-2 sm:px-3 py-2 border-r border-b border-neutral-100 dark:border-neutral-800">{formatCurrency(year.interestPaid)}</td>
                                        <td className="px-2 sm:px-3 py-2 border-r border-b border-neutral-100 dark:border-neutral-800 hidden sm:table-cell">{formatCurrency(year.totalPaid)}</td>
                                        <td className="px-2 sm:px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 hidden sm:table-cell">{formatCurrency(year.remainingBalance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmortizationSchedule;