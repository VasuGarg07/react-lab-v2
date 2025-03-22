import { cn } from '@/shared/cn';
import Select from '@/ui/Select';
import { BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
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
                    year: `Year ${year.year}`,
                    principal: year.principalPaid,
                    interest: year.interestPaid
                }));
            case 'remaining-balance':
                return amortizationSchedule.map(year => ({
                    year: `Year ${year.year}`,
                    balance: year.remainingBalance
                }));
            case 'cumulative':
                let cumulativePrincipal = 0;
                let cumulativeInterest = 0;

                return amortizationSchedule.map(year => {
                    cumulativePrincipal += year.principalPaid;
                    cumulativeInterest += year.interestPaid;

                    return {
                        year: `Year ${year.year}`,
                        principal: cumulativePrincipal,
                        interest: cumulativeInterest,
                        total: cumulativePrincipal + cumulativeInterest
                    };
                });
            default:
                return amortizationSchedule.map(year => ({
                    year: `Year ${year.year}`,
                    principal: year.principalPaid,
                    interest: year.interestPaid
                }));
        }
    }, [amortizationSchedule, displayOption]);

    // Render the appropriate chart based on the chart type
    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return (
                    <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-neutral-700" />
                        <XAxis dataKey="year" tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" />
                        <RechartsTooltip
                            formatter={(value) => formatCurrency(value as number)}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '6px',
                                border: 'none',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                padding: '8px 12px',
                            }}
                            labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
                        />
                        <Legend />
                        {displayOption !== 'remaining-balance' && (
                            <Bar dataKey="principal" name="Principal" fill={chartColors.principal} radius={[4, 4, 0, 0]} />
                        )}
                        {displayOption !== 'remaining-balance' && (
                            <Bar dataKey="interest" name="Interest" fill={chartColors.interest} radius={[4, 4, 0, 0]} />
                        )}
                        {displayOption === 'remaining-balance' && (
                            <Bar dataKey="balance" name="Remaining Balance" fill={chartColors.balance} radius={[4, 4, 0, 0]} />
                        )}
                        {displayOption === 'cumulative' && (
                            <Bar dataKey="total" name="Total Paid" fill={chartColors.total} radius={[4, 4, 0, 0]} />
                        )}
                    </BarChart>
                );

            case 'line':
                return (
                    <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-neutral-700" />
                        <XAxis dataKey="year" tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" />
                        <RechartsTooltip
                            formatter={(value) => formatCurrency(value as number)}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '6px',
                                border: 'none',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                padding: '8px 12px',
                            }}
                        />
                        <Legend />
                        {displayOption !== 'remaining-balance' && (
                            <Line type="monotone" dataKey="principal" name="Principal" stroke={chartColors.principal} strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 3 }} />
                        )}
                        {displayOption !== 'remaining-balance' && (
                            <Line type="monotone" dataKey="interest" name="Interest" stroke={chartColors.interest} strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 3 }} />
                        )}
                        {displayOption === 'remaining-balance' && (
                            <Line type="monotone" dataKey="balance" name="Remaining Balance" stroke={chartColors.balance} strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 3 }} />
                        )}
                        {displayOption === 'cumulative' && (
                            <Line type="monotone" dataKey="total" name="Total Paid" stroke={chartColors.total} strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 3 }} />
                        )}
                    </LineChart>
                );

            case 'area':
                return (
                    <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-neutral-700" />
                        <XAxis dataKey="year" tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fill: '#9CA3AF' }} className="dark:text-neutral-400" />
                        <RechartsTooltip
                            formatter={(value) => formatCurrency(value as number)}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '6px',
                                border: 'none',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                padding: '8px 12px',
                            }}
                        />
                        <Legend />
                        {displayOption !== 'remaining-balance' && (
                            <Area type="monotone" dataKey="principal" name="Principal" stackId="1" stroke={chartColors.principal} fill={`${chartColors.principal}80`} />
                        )}
                        {displayOption !== 'remaining-balance' && (
                            <Area type="monotone" dataKey="interest" name="Interest" stackId="1" stroke={chartColors.interest} fill={`${chartColors.interest}80`} />
                        )}
                        {displayOption === 'remaining-balance' && (
                            <Area type="monotone" dataKey="balance" name="Remaining Balance" stroke={chartColors.balance} fill={`${chartColors.balance}80`} />
                        )}
                        {displayOption === 'cumulative' && (
                            <Area type="monotone" dataKey="total" name="Total Paid" stroke={chartColors.total} fill={`${chartColors.total}80`} />
                        )}
                    </AreaChart>
                );

            default:
                return <></>;
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-sm dark:shadow-2xl border border-white/20 dark:border-neutral-800/20">
            <div className="px-5 py-4">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                    Amortization Schedule
                </h3>

                <div className="flex justify-between items-center mt-3 mb-4 gap-3 flex-wrap sm:flex-nowrap">
                    {/* Display Options Dropdown using custom Select component */}
                    <div className="w-full sm:w-auto">
                        <Select
                            options={[
                                { value: 'yearly-payment', label: 'Yearly Payments' },
                                { value: 'remaining-balance', label: 'Remaining Balance' },
                                { value: 'cumulative', label: 'Cumulative Payments' }
                            ]}
                            value={displayOption}
                            onValueChange={(value) => setDisplayOption(value as DisplayOption)}
                            placeholder="Select display option"
                            className="w-full sm:w-48 bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200"
                        />
                    </div>

                    {/* Chart Type Selector */}
                    <div className="flex space-x-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
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

                {/* Chart Container */}
                <div className="h-[320px] mb-4 pr-3">
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart()}
                    </ResponsiveContainer>
                </div>

                {/* Divider */}
                <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-4"></div>

                {/* Table Title */}
                <h4 className="text-base font-medium text-neutral-900 dark:text-white mb-3">
                    Year-by-Year Breakdown
                </h4>

                {/* Table Container */}
                <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden mb-2 shadow-sm">
                    <div className="max-h-[280px] overflow-auto">
                        <table className="w-full border-collapse">
                            <thead className="sticky top-0 bg-neutral-50 dark:bg-neutral-800 text-xs uppercase border-b border-neutral-200 dark:border-neutral-700 shadow-sm z-10">
                                <tr>
                                    <th className="px-3 py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0">Year</th>
                                    <th className="px-3 py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0">Principal</th>
                                    <th className="px-3 py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0">Interest</th>
                                    <th className="px-3 py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0">Total Payment</th>
                                    <th className="px-3 py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300">Remaining Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 text-sm">
                                {amortizationSchedule.map((year) => (
                                    <tr
                                        key={year.year}
                                        className="text-center text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                                    >
                                        <td className="px-3 py-2.5 border-r border-b border-neutral-100 dark:border-neutral-800">{year.year}</td>
                                        <td className="px-3 py-2.5 border-r border-b border-neutral-100 dark:border-neutral-800">{formatCurrency(year.principalPaid)}</td>
                                        <td className="px-3 py-2.5 border-r border-b border-neutral-100 dark:border-neutral-800">{formatCurrency(year.interestPaid)}</td>
                                        <td className="px-3 py-2.5 border-r border-b border-neutral-100 dark:border-neutral-800">{formatCurrency(year.totalPaid)}</td>
                                        <td className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800">{formatCurrency(year.remainingBalance)}</td>
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