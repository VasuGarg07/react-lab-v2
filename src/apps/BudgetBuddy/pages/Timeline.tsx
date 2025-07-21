import React, { useMemo } from 'react';
import { BarChart4 } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTransactions } from '@/apps/BudgetBuddy/helpers/expense.service';

const Timeline: React.FC = () => {
    const { data: transactions, isLoading, isError } = useTransactions();

    const timelineData = useMemo(() => {
        if (!transactions.length) return [];

        const sorted = [...transactions].sort((a, b) => a.date - b.date);
        let balance = 0;

        return sorted.map(txn => {
            balance += (txn.type === 'income' ? txn.amount : -txn.amount);
            return {
                date: new Date(txn.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit'
                }),
                balance,
                status: balance >= 0 ? 'positive' : 'negative'
            };
        });
    }, [transactions]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-52px)] p-3">
                <div className="w-12 h-12 relative">
                    <div className="absolute inset-0 border-4 border-lime-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-lime-500 rounded-full animate-spin border-t-transparent"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center gap-2 p-7 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg shadow-sm">
                Failed to load transactions. Please try again.
            </div>
        );
    }

    if (!transactions.length) {
        return (
            <div className="flex items-center gap-2 p-7 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm">
                No transactions found. Add some transactions to see your balance timeline.
            </div>
        );
    }

    return (
        <div className="p-3">
            <div className="flex items-center gap-1.5 border-b-2 border-lime-500 pb-2 mb-3">
                <BarChart4 size={28} className="text-lime-500" />
                <h2 className="text-2xl font-semibold font-['Montserrat',sans-serif] tracking-wide uppercase text-gray-800 dark:text-gray-100">
                    Timeline
                </h2>
            </div>

            <div className="p-2 rounded-lg shadow-md bg-white/80 dark:bg-zinc-800/90 h-[500px] transition-shadow duration-200 hover:shadow-lg">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={timelineData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(156, 163, 175, 0.2)" // gray-400 with low opacity
                            vertical={false}
                        />
                        <XAxis
                            dataKey="date"
                            stroke="rgba(107, 114, 128, 0.7)" // gray-500
                            fontSize={12}
                            tickMargin={8}
                            tick={{ fill: 'rgba(55, 65, 81, 0.8)' }} // gray-700
                            className="dark:text-gray-100"
                        />
                        <YAxis
                            stroke="rgba(107, 114, 128, 0.7)" // gray-500
                            fontSize={12}
                            tickFormatter={(value) => `₹${value.toLocaleString()}`}
                            tick={{ fill: 'rgba(55, 65, 81, 0.8)' }} // gray-700
                            className="dark:text-gray-100"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine
                            y={0}
                            stroke="rgba(107, 114, 128, 0.3)" // gray-500 with low opacity
                            strokeWidth={1}
                            strokeDasharray="3 3"
                        />
                        <Line
                            type="monotone"
                            dataKey="balance"
                            strokeWidth={2}
                            dot={{
                                stroke: '#999',
                                strokeWidth: 2,
                                r: 4,
                            }}
                            stroke="url(#colorGradient)"
                            animationDuration={1000}
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const balance = payload[0].value;
        return (
            <div className="bg-white/95 dark:bg-zinc-800/95 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md p-2.5">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    {label}
                </p>
                <p className={`text-sm font-medium ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ₹{balance.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </p>
            </div>
        );
    }
    return null;
};

export default Timeline;