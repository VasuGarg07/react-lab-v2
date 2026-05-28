import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import CategoryIcon from '../components/CategoryIcon';
import { useTransactions } from '../hooks/useTransactionQuery';
import {
    calculateTotalIncome,
    calculateTotalExpense,
    calculateSavingsRate,
    groupByCategory,
    filterByType,
    getCurrentMonthYear,
} from '../helpers/expense.utils';
import { CATEGORY_COLORS, TYPE_COLORS } from '../helpers/expense.constants';
import { formatCurrency } from '@react-lab/shared';

const Tooltip_ = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const isTimeline = typeof label === 'number';
    return (
        <div className="bg-white dark:bg-neutral-800 px-3 py-2 rounded-sm border border-neutral-200 dark:border-neutral-700 text-xs">
            {isTimeline ? (
                <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                    {new Date(label).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                </p>
            ) : (
                <p className="font-medium text-neutral-900 dark:text-neutral-100">{payload[0].name}</p>
            )}
            {isTimeline ? (
                payload.map((p: any) => (
                    <p key={p.dataKey} className="text-neutral-500 dark:text-neutral-400">
                        <span className="font-medium" style={{ color: p.color }}>{p.dataKey}:</span> {formatCurrency(p.value)}
                    </p>
                ))
            ) : (
                <p className="text-neutral-500 dark:text-neutral-400">{formatCurrency(payload[0].value)}</p>
            )}
        </div>
    );
};

const SectionLabel = ({ title }: { title: string }) => (
    <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">{title}</p>
);

export default function Statistics() {
    const { data: transactions = [], isLoading } = useTransactions();

    const totalIncome = calculateTotalIncome(transactions);
    const totalExpense = calculateTotalExpense(transactions);
    const savingsRate = calculateSavingsRate(transactions);

    // Build cumulative balance timeline, sorted by createdAt (fallback to date)
    const getTime = (tx: typeof transactions[number]) => {
        const t = tx.date;
        return t ? new Date(t).getTime() : 0;
    };

    const sorted = [...transactions]
        .filter((tx) => getTime(tx) > 0)
        .sort((a, b) => getTime(a) - getTime(b));

    let runningBalance = 0;
    const timelineData = sorted.map((tx) => {
        runningBalance += tx.type === 'income' ? tx.amount : -tx.amount;
        return {
            time: getTime(tx),
            Balance: Number(runningBalance.toFixed(2)),
        };
    });

    const incomeCategoryData = Object.entries(groupByCategory(filterByType(transactions, 'income')))
        .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#6b7280' }))
        .sort((a, b) => b.value - a.value);

    const expenseCategoryData = Object.entries(groupByCategory(filterByType(transactions, 'expense')))
        .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#6b7280' }))
        .sort((a, b) => b.value - a.value);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-3 py-24">
                <div className="w-8 h-8 border-2 border-neutral-200 dark:border-neutral-700 border-t-neutral-500 rounded-full animate-spin" />
                <p className="text-xs text-neutral-400 dark:text-neutral-500">Loading...</p>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">Statistics</h1>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 uppercase tracking-widest">{getCurrentMonthYear()}</p>
                </div>
                <div className="flex flex-col items-center justify-center py-24">
                    <p className="text-sm text-neutral-400 dark:text-neutral-500">Add some transactions to see statistics.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">Statistics</h1>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 uppercase tracking-widest">{getCurrentMonthYear()}</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Income',       value: formatCurrency(totalIncome),  cls: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'Expenses',     value: formatCurrency(totalExpense), cls: 'text-red-600 dark:text-red-400' },
                    { label: 'Savings Rate', value: `${savingsRate.toFixed(1)}%`, cls: 'text-neutral-900 dark:text-neutral-100' },
                ].map(({ label, value, cls }) => (
                    <div key={label} className="bg-white dark:bg-neutral-800 rounded-sm p-5 border border-neutral-200 dark:border-neutral-700">
                        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">{label}</p>
                        <p className={`text-2xl font-medium tracking-tight ${cls}`}>{value}</p>
                    </div>
                ))}
            </div>

            {/* Balance over time */}
            {timelineData.length > 0 && (
                <div className="bg-white dark:bg-neutral-800 rounded-sm p-5 border border-neutral-200 dark:border-neutral-700">
                    <SectionLabel title="Balance Over Time" />
                    <div className="w-full">
                        <ResponsiveContainer width="100%" height={240}>
                            <LineChart data={timelineData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-neutral-200 dark:text-neutral-700" vertical={false} />
                                <XAxis
                                    dataKey="time"
                                    type="number"
                                    domain={['dataMin', 'dataMax']}
                                    scale="time"
                                    tick={{ fontSize: 11, fill: 'currentColor' }}
                                    className="text-neutral-400 dark:text-neutral-500"
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(v) =>
                                        new Date(v).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                    }
                                    minTickGap={40}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: 'currentColor' }}
                                    className="text-neutral-400 dark:text-neutral-500"
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(v) => formatCurrency(v)}
                                    width={80}
                                />
                                <Tooltip content={<Tooltip_ />} />
                                <Line
                                    type="monotone"
                                    dataKey="Balance"
                                    stroke={TYPE_COLORS.income}
                                    strokeWidth={2}
                                    dot={timelineData.length < 30 ? { r: 3, fill: TYPE_COLORS.income } : false}
                                    activeDot={{ r: 5 }}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Category breakdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                    { title: 'Income by Category',  data: incomeCategoryData },
                    { title: 'Expense by Category', data: expenseCategoryData },
                ].map(({ title, data }) => data.length > 0 && (
                    <div key={title} className="bg-white dark:bg-neutral-800 rounded-sm p-5 border border-neutral-200 dark:border-neutral-700">
                        <SectionLabel title={title} />
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <div className="w-full sm:w-36 shrink-0 mx-auto sm:mx-0">
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Pie data={data} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={2} dataKey="value">
                                            {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                        </Pie>
                                        <Tooltip content={<Tooltip_ />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex-1 space-y-2.5 w-full">
                                {data.map(item => (
                                    <div key={item.name} className="flex items-center gap-2.5">
                                        <CategoryIcon category={item.name} size="sm" />
                                        <span className="text-xs text-neutral-600 dark:text-neutral-400 flex-1 truncate">{item.name}</span>
                                        <span className="text-xs font-medium tracking-tight text-neutral-900 dark:text-neutral-100 tabular-nums">
                                            {formatCurrency(item.value)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}