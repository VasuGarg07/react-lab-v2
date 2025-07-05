import { cn } from '@/shared/cn';
import Dialog from '@/ui/Dialog';
import { Calendar, Save, TrendingDown } from 'lucide-react';
import React, { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useLoan } from './LoanContext';
import { formatCurrency } from './loan.utils';

const LoanSummary: React.FC = () => {
    const {
        loanParams,
        monthlyPayment,
        paymentSplit,
        extraPaymentImpact,
        saveScenario
    } = useLoan();

    const [open, setOpen] = useState(false);
    const [scenarioName, setScenarioName] = useState('');
    const [showExtraPaymentInfo, setShowExtraPaymentInfo] = useState(false);

    const { extraPayment = 0 } = loanParams;
    const { principalPercentage, interestPercentage } = paymentSplit;

    // Data for the pie chart
    const data = [
        { name: 'Principal', value: principalPercentage },
        { name: 'Interest', value: interestPercentage }
    ];

    // Colors for the pie chart
    const COLORS = ['#36A2EB', '#FF6384'];

    // Save scenario handler
    const handleSaveScenario = () => {
        if (scenarioName.trim()) {
            saveScenario(scenarioName);
            setScenarioName('');
            setOpen(false);
        }
    };

    return (
        <>
            <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm dark:shadow-2xl border border-white/50 dark:border-neutral-800/50">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                        Loan Summary
                    </h3>

                    <div className="text-center mb-6">
                        <div className="text-3xl font-semibold text-neutral-900 dark:text-white">
                            {formatCurrency(monthlyPayment)}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                            Monthly Payment
                        </div>
                    </div>

                    <div className="h-60 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => [`${value.toFixed(2)}%`, 'Percentage']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <hr className="border-neutral-200 dark:border-neutral-700 my-6" />

                    {extraPayment > 0 && (
                        <div className="mb-6">
                            <button
                                className="flex w-full items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 py-2 px-4 text-sm font-medium transition-colors hover:bg-primary-100 dark:hover:bg-primary-900/50"
                                onClick={() => setShowExtraPaymentInfo(!showExtraPaymentInfo)}
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                View Extra Payment Impact
                            </button>

                            {showExtraPaymentInfo && (
                                <div className="mt-4 rounded-xl bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-300 p-4">
                                    <div className="flex items-start">
                                        <TrendingDown className="h-5 w-5 mr-3 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="mb-3">
                                                <h4 className="text-sm font-medium">
                                                    Loan Term Reduction
                                                </h4>
                                                <p className="text-sm">
                                                    {extraPaymentImpact.timeShortened.years} years, {extraPaymentImpact.timeShortened.months} months
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <h4 className="text-sm font-medium">
                                                    Interest Savings
                                                </h4>
                                                <p className="text-sm">
                                                    {formatCurrency(extraPaymentImpact.interestSaved)}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">
                                                    New Payoff Date
                                                </h4>
                                                <p className="text-sm">
                                                    {extraPaymentImpact.newPayoffDate.toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        className="flex mx-auto items-center justify-center rounded-xl bg-secondary-500 dark:bg-secondary-700 text-white py-2.5 px-4 text-sm font-medium transition-colors hover:bg-primary-600 dark:hover:bg-primary-400"
                        onClick={() => setOpen(true)}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Save Scenario for Comparison
                    </button>
                </div>
            </div>

            {/* Save Scenario Modal */}
            <Dialog
                open={open}
                onClose={(open) => !open && setOpen(false)}
                title="Save Current Scenario"
                size="sm"
            >
                <div className="p-6 pt-0">
                    <div className="mb-4">
                        <label
                            htmlFor="scenario-name"
                            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
                        >
                            Scenario Name
                        </label>
                        <input
                            id="scenario-name"
                            type="text"
                            value={scenarioName}
                            onChange={(e) => setScenarioName(e.target.value)}
                            placeholder="e.g., 10-year loan with 10% rate"
                            className={cn(
                                "w-full rounded-lg border border-neutral-300 dark:border-neutral-700",
                                "bg-white dark:bg-neutral-800 px-3 py-2",
                                "text-neutral-900 dark:text-white",
                                "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                                "focus:border-primary-500 dark:focus:border-primary-400",
                                "focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20"
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveScenario}
                            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 dark:hover:bg-primary-400"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default LoanSummary;