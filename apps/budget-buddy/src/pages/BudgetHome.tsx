import { ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react';
import TransactionList from '../components/TransactionList';
import CategoryIcon from '../components/CategoryIcon';
import Sparkline from '../components/Sparkline';
import { openTransactionForm } from '../components/TransactionForm';
import { useTransactions } from '../hooks/useTransactionQuery';
import {
    calculateTotalIncome,
    calculateTotalExpense,
    calculateBalance,
    calculateSavingsRate,
    getTopSpendingCategories,
    sortByDate,
    getCurrentMonthYear,
} from '../helpers/expense.utils';
import { useModal } from '@react-lab/ui';
import { formatCurrency } from '@react-lab/shared';

function buildBalanceSeries(transactions: ReturnType<typeof useTransactions>['data']): number[] {
    if (!transactions?.length) return [];
    const getTime = (d: typeof transactions[number]['date']) => (d ? new Date(d).getTime() : 0);
    const sorted = [...transactions].filter((t) => getTime(t.date) > 0).sort((a, b) => getTime(a.date) - getTime(b.date));
    let running = 0;
    const series = sorted.map((t) => (running += t.type === 'income' ? t.amount : -t.amount));
    return series.length === 1 ? [0, series[0]] : series;
}

export default function BudgetHome() {
    const modal = useModal();
    const { data: transactions = [], isLoading } = useTransactions();

    const totalIncome = calculateTotalIncome(transactions);
    const totalExpense = calculateTotalExpense(transactions);
    const balance = calculateBalance(transactions);
    const savingsRate = calculateSavingsRate(transactions);
    const recentTransactions = sortByDate(transactions, 'desc').slice(0, 7);
    const topSpending = getTopSpendingCategories(transactions, 5);
    const series = buildBalanceSeries(transactions);

    const circumference = 2 * Math.PI * 30;
    const clampedRate = Math.max(0, Math.min(savingsRate, 100));
    const savingsDash = (clampedRate / 100) * circumference;

    return (
        <div className="space-y-8 fade-up">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-pitch-400">
                        {getCurrentMonthYear()}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-pitch leading-none mt-2">
                        Dashboard
                    </h1>
                </div>

                <button
                    onClick={() => openTransactionForm(modal, 'add', null, 'expense')}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-pitch text-lavender hover:bg-pitch-700 transition-colors"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Expense</span>
                </button>
            </div>

            <section className="rounded-3xl bg-pitch text-lavender p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-6 lg:gap-8">
                    <div className="flex flex-col justify-between gap-6">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pitch-300">Net Balance</span>
                            <p className={`mt-3 text-4xl sm:text-5xl font-black tracking-tight tabular-nums ${balance < 0 ? 'text-scarlet' : 'text-lavender'}`}>
                                {isLoading ? '—' : formatCurrency(balance)}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-1.5 text-emerald mb-1.5">
                                    <ArrowDownLeft className="w-4 h-4" strokeWidth={2.5} />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Income</span>
                                </div>
                                <p className="text-lg font-black tracking-tight tabular-nums">{formatCurrency(totalIncome)}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5 text-scarlet mb-1.5">
                                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Expenses</span>
                                </div>
                                <p className="text-lg font-black tracking-tight tabular-nums">{formatCurrency(totalExpense)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block bg-white/10" />

                    <div className="flex flex-col justify-between gap-4">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-pitch-300">Balance Trend</span>
                        <Sparkline data={series} color="#63D471" height={110} />
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-pitch-100 rounded-2xl overflow-hidden border border-pitch-100">
                <Stat label="Income" value={formatCurrency(totalIncome)} accent="text-emerald" />
                <Stat label="Expenses" value={formatCurrency(totalExpense)} accent="text-scarlet" />
                <Stat label="Balance" value={formatCurrency(balance)} accent="text-pitch" />
                <Stat label="Savings Rate" value={`${savingsRate.toFixed(1)}%`} accent="text-pitch" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-extrabold text-pitch uppercase tracking-widest">Recent Activity</h2>
                        {transactions.length > 7 && (
                            <a href="/overview" className="text-xs font-bold text-paprika hover:underline underline-offset-4 inline-flex items-center gap-1">
                                View all <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                    <div className="bg-white rounded-2xl border border-pitch-100 overflow-hidden">
                        <TransactionList
                            transactions={recentTransactions}
                            isLoading={isLoading}
                            emptyMessage="No transactions yet — add your first to get started."
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div>
                        <h2 className="text-sm font-extrabold text-pitch uppercase tracking-widest mb-4">Savings</h2>
                        <div className="bg-white rounded-2xl border border-pitch-100 p-5">
                            <div className="flex items-center gap-4">
                                <div className="relative w-20 h-20 shrink-0">
                                    <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90">
                                        <circle cx="38" cy="38" r="30" fill="none" stroke="#EAE7E6" strokeWidth="7" />
                                        <circle
                                            cx="38" cy="38" r="30" fill="none"
                                            stroke="#63D471" strokeWidth="7" strokeLinecap="round"
                                            strokeDasharray={`${savingsDash} ${circumference}`}
                                            style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.22,1,0.36,1)' }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 grid place-items-center">
                                        <span className="text-base font-black tracking-tight text-pitch">{savingsRate.toFixed(0)}%</span>
                                    </div>
                                </div>
                                <div className="text-xs text-pitch-400 leading-relaxed">
                                    Saved <span className="font-bold text-pitch">{formatCurrency(balance)}</span><br />
                                    of <span className="font-bold text-pitch">{formatCurrency(totalIncome)}</span> earned.
                                </div>
                            </div>
                        </div>
                    </div>

                    {topSpending.length > 0 && (
                        <div>
                            <h2 className="text-sm font-extrabold text-pitch uppercase tracking-widest mb-4">Top Spending</h2>
                            <div className="bg-white rounded-2xl border border-pitch-100 p-5 space-y-4">
                                {topSpending.map(([category, amount]) => {
                                    const pct = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
                                    return (
                                        <div key={category}>
                                            <div className="flex items-center gap-2.5 mb-1.5">
                                                <CategoryIcon category={category} size="sm" />
                                                <span className="text-xs font-semibold text-pitch-600 flex-1 truncate">{category}</span>
                                                <span className="text-xs font-black tracking-tight text-pitch tabular-nums shrink-0">{formatCurrency(amount)}</span>
                                            </div>
                                            <div className="h-1.5 bg-pitch-100 rounded-full ml-9 overflow-hidden">
                                                <div className="h-1.5 rounded-full bg-paprika transition-all duration-700" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
    return (
        <div className="bg-white p-4 sm:p-5">
            <p className="text-[11px] font-bold text-pitch-400 uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-xl sm:text-2xl font-black tracking-tight tabular-nums leading-none ${accent}`}>{value}</p>
        </div>
    );
}
