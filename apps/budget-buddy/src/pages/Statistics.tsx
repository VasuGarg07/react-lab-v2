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

const ChartTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const isTimeline = typeof label === 'number';
    return (
        <div className="bg-pitch text-lavender px-3 py-2 rounded-xl text-xs">
            {isTimeline ? (
                <p className="font-bold mb-1">
                    {new Date(label).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
            ) : (
                <p className="font-bold">{payload[0].name}</p>
            )}
            {isTimeline ? (
                payload.map((p: any) => (
                    <p key={p.dataKey} className="text-pitch-200">
                        <span className="font-bold" style={{ color: p.color }}>{p.dataKey}:</span> {formatCurrency(p.value)}
                    </p>
                ))
            ) : (
                <p className="text-pitch-200">{formatCurrency(payload[0].value)}</p>
            )}
        </div>
    );
};

const SectionLabel = ({ title }: { title: string }) => (
    <h2 className="text-sm font-extrabold text-pitch uppercase tracking-widest mb-4">{title}</h2>
);

export default function Statistics() {
    const { data: transactions = [], isLoading } = useTransactions();

    const totalIncome = calculateTotalIncome(transactions);
    const totalExpense = calculateTotalExpense(transactions);
    const savingsRate = calculateSavingsRate(transactions);

    const getTime = (tx: typeof transactions[number]) => {
        const t = tx.date;
        return t ? new Date(t).getTime() : 0;
    };

    const sorted = [...transactions].filter((tx) => getTime(tx) > 0).sort((a, b) => getTime(a) - getTime(b));

    let runningBalance = 0;
    const timelineData = sorted.map((tx) => {
        runningBalance += tx.type === 'income' ? tx.amount : -tx.amount;
        return { time: getTime(tx), Balance: Number(runningBalance.toFixed(2)) };
    });

    const incomeCategoryData = Object.entries(groupByCategory(filterByType(transactions, 'income')))
        .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#74746B' }))
        .sort((a, b) => b.value - a.value);

    const expenseCategoryData = Object.entries(groupByCategory(filterByType(transactions, 'expense')))
        .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#74746B' }))
        .sort((a, b) => b.value - a.value);

    const Heading = (
        <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pitch-400">{getCurrentMonthYear()}</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-pitch leading-none mt-2">Statistics</h1>
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-3 py-24 fade-up">
                <div className="w-8 h-8 border-2 border-pitch-100 border-t-paprika rounded-full animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest text-pitch-400">Loading</p>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="space-y-8 fade-up">
                {Heading}
                <div className="bg-white rounded-2xl border border-pitch-100 flex flex-col items-center justify-center py-24 px-6 text-center">
                    <p className="text-sm font-semibold text-pitch">Nothing to chart yet.</p>
                    <p className="text-sm text-pitch-400 mt-1">Add a few transactions to see your statistics.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 fade-up">
            {Heading}

            {/* Summary strip */}
            <div className="grid grid-cols-3 gap-px bg-pitch-100 rounded-2xl overflow-hidden border border-pitch-100">
                {[
                    { label: 'Income',       value: formatCurrency(totalIncome),  cls: 'text-emerald' },
                    { label: 'Expenses',     value: formatCurrency(totalExpense), cls: 'text-scarlet' },
                    { label: 'Savings Rate', value: `${savingsRate.toFixed(1)}%`, cls: 'text-pitch' },
                ].map(({ label, value, cls }) => (
                    <div key={label} className="bg-white p-4 sm:p-5">
                        <p className="text-[11px] font-bold text-pitch-400 uppercase tracking-widest mb-2">{label}</p>
                        <p className={`text-lg sm:text-2xl font-black tracking-tight tabular-nums leading-none ${cls}`}>{value}</p>
                    </div>
                ))}
            </div>

            {timelineData.length > 0 && (
                <div>
                    <SectionLabel title="Balance Over Time" />
                    <div className="bg-white rounded-2xl border border-pitch-100 p-5">
                        <ResponsiveContainer width="100%" height={240}>
                            <LineChart data={timelineData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E4DF" vertical={false} />
                                <XAxis
                                    dataKey="time" type="number" domain={['dataMin', 'dataMax']} scale="time"
                                    tick={{ fontSize: 11, fill: '#74746B', fontWeight: 600 }}
                                    axisLine={false} tickLine={false}
                                    tickFormatter={(v) => new Date(v).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    minTickGap={40}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: '#74746B', fontWeight: 600 }}
                                    axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v)} width={80}
                                />
                                <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#C9C8C1' }} />
                                <Line
                                    type="monotone" dataKey="Balance" stroke={TYPE_COLORS.income} strokeWidth={2.5}
                                    dot={timelineData.length < 30 ? { r: 3, fill: TYPE_COLORS.income, strokeWidth: 0 } : false}
                                    activeDot={{ r: 5, strokeWidth: 0 }} isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                    { title: 'Income by Category',  data: incomeCategoryData },
                    { title: 'Expense by Category', data: expenseCategoryData },
                ].map(({ title, data }) => data.length > 0 && (
                    <div key={title}>
                        <SectionLabel title={title} />
                        <div className="bg-white rounded-2xl border border-pitch-100 p-5">
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <div className="w-full sm:w-36 shrink-0 mx-auto sm:mx-0">
                                    <ResponsiveContainer width="100%" height={140}>
                                        <PieChart>
                                            <Pie data={data} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={2} dataKey="value" stroke="none">
                                                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                            </Pie>
                                            <Tooltip content={<ChartTooltip />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 space-y-2.5 w-full">
                                    {data.map(item => (
                                        <div key={item.name} className="flex items-center gap-2.5">
                                            <CategoryIcon category={item.name} size="sm" />
                                            <span className="text-xs font-semibold text-pitch-600 flex-1 truncate">{item.name}</span>
                                            <span className="text-xs font-black tracking-tight text-pitch tabular-nums">
                                                {formatCurrency(item.value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
