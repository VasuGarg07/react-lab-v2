import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { type LoanParams, calculateLoanResults, prepareChartData } from './loan.utilities';
import { formatCurrency } from '@react-lab/shared';

interface LoanResultsProps {
    loanParams: LoanParams;
    className?: string;
}

const COLORS = { principal: '#009DDC', interest: '#F26430' };

const ChartTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];
    return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-jet/10">
            <p className="text-xs font-semibold text-jet/50 uppercase tracking-wide">{name}</p>
            <p className="text-sm font-bold text-jet">{formatCurrency(value)}</p>
        </div>
    );
};

export default function LoanResults({ loanParams, className = '' }: LoanResultsProps) {
    const { totalInterest, totalPayment } = calculateLoanResults(loanParams);
    const chartData = prepareChartData(loanParams);
    const principalPct = ((loanParams.loanAmount / totalPayment) * 100).toFixed(1);
    const interestPct = ((totalInterest / totalPayment) * 100).toFixed(1);

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-jet/40">Breakdown</h3>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-jet/8 flex-1">
                <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={52} outerRadius={78}
                                paddingAngle={3} dataKey="value">
                                <Cell fill={COLORS.principal} />
                                <Cell fill={COLORS.interest} />
                            </Pie>
                            <Tooltip content={<ChartTooltip />} />
                            <Legend verticalAlign="bottom" height={32}
                                formatter={(value) => (
                                    <span className="text-xs text-jet/60">{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-jet/8 mt-2">
                    <div className="rounded-lg bg-bell/8 p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-2 h-2 rounded-full bg-bell" />
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-bell">Principal</span>
                        </div>
                        <p className="text-sm font-bold text-jet">{formatCurrency(loanParams.loanAmount)}</p>
                        <p className="text-xs text-jet/40">{principalPct}%</p>
                    </div>
                    <div className="rounded-lg bg-flame/8 p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-2 h-2 rounded-full bg-flame" />
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-flame">Interest</span>
                        </div>
                        <p className="text-sm font-bold text-jet">{formatCurrency(totalInterest)}</p>
                        <p className="text-xs text-jet/40">{interestPct}%</p>
                    </div>
                </div>
            </div>

            {/* Total */}
            <div className="bg-shamrock rounded-xl p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/70 mb-1">Total Payable</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalPayment)}</p>
                <p className="text-white/60 text-xs mt-1">Over {loanParams.tenure * 12} payments</p>
            </div>
        </div>
    );
}
