import { Trash2 } from 'lucide-react';
import React from 'react';
import { useLoan } from './LoanContext';
import { calculateTotalInterest, formatCurrency } from './loan.utils';

const ComparisonTable: React.FC = () => {
    const { savedScenarios, removeScenario, loanParams, monthlyPayment } = useLoan();

    // Add current scenario to comparison
    const allScenarios = [
        {
            id: 'current',
            name: 'Current Scenario',
            params: loanParams,
            monthlyPayment
        },
        ...savedScenarios
    ];

    // Format tenure as years
    const formatTenure = (years: number) => {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
    };

    // Format interest rate as percentage
    const formatInterestRate = (rate: number) => {
        return `${rate.toFixed(2)}%`;
    };

    // Calculate total interest for a scenario
    const getTotalInterest = (scenarioParams: any) => {
        return calculateTotalInterest(scenarioParams);
    };

    // Calculate total amount paid
    const getTotalPaid = (scenarioParams: any) => {
        return scenarioParams.loanAmount + getTotalInterest(scenarioParams);
    };

    // Find the best scenario based on lowest total paid
    const getBestScenario = () => {
        if (allScenarios.length < 2) return null;

        return allScenarios.reduce((best, current) => {
            const bestTotal = getTotalPaid(best.params);
            const currentTotal = getTotalPaid(current.params);

            return currentTotal < bestTotal ? current : best;
        });
    };

    const bestScenario = getBestScenario();

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-sm dark:shadow-2xl border border-white/20 dark:border-neutral-800/20">
            <div className="px-5 py-4">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">
                    Loan Options Comparison
                </h3>

                {savedScenarios.length === 0 ? (
                    <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-600 dark:text-neutral-400">
                        No saved scenarios yet. Create different loan scenarios and save them for comparison.
                    </div>
                ) : (
                    bestScenario && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <h4 className="text-sm font-medium text-green-800 dark:text-green-300">
                                Recommended Option: {bestScenario.name}
                            </h4>
                            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                                This option offers the lowest total cost (₹{(getTotalPaid(bestScenario.params) / 100000).toFixed(2)} Lakh)
                            </p>
                        </div>
                    )
                )}

                <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden mb-4 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-neutral-50 dark:bg-neutral-800 text-xs uppercase border-b border-neutral-200 dark:border-neutral-700 shadow-sm z-10">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700" style={{ minWidth: '150px' }}>Scenario</th>
                                    <th className="px-4 py-3 text-left font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700">Loan Amount</th>
                                    <th className="px-4 py-3 text-left font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700">Interest Rate</th>
                                    <th className="px-4 py-3 text-left font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700">Term</th>
                                    <th className="px-4 py-3 text-left font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700">Monthly Payment</th>
                                    <th className="px-4 py-3 text-left font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700">Total Interest</th>
                                    <th className="px-4 py-3 text-left font-semibold text-neutral-600 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700">Total Cost</th>
                                    <th className="px-4 py-3 text-center font-semibold text-neutral-600 dark:text-neutral-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 text-sm">
                                {allScenarios.map((scenario) => (
                                    <tr
                                        key={scenario.id}
                                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                                    >
                                        <td className="px-4 py-3 border-r border-neutral-100 dark:border-neutral-800">
                                            <div className="flex items-center">
                                                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                                                    {scenario.name}
                                                </span>
                                                {scenario.id === 'current' && (
                                                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                                                        Current
                                                    </span>
                                                )}
                                                {bestScenario && scenario.id === bestScenario.id && scenario.id !== 'current' && (
                                                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                                                        Best
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-neutral-800">
                                            {formatCurrency(scenario.params.loanAmount)}
                                        </td>
                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-neutral-800">
                                            {formatInterestRate(scenario.params.interestRate)}
                                        </td>
                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-neutral-800">
                                            {formatTenure(scenario.params.loanTenure)}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-neutral-800 dark:text-neutral-200 border-r border-neutral-100 dark:border-neutral-800">
                                            {formatCurrency(scenario.monthlyPayment)}
                                        </td>
                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300 border-r border-neutral-100 dark:border-neutral-800">
                                            {formatCurrency(getTotalInterest(scenario.params))}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-neutral-800 dark:text-neutral-200 border-r border-neutral-100 dark:border-neutral-800">
                                            {formatCurrency(getTotalPaid(scenario.params))}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {scenario.id !== 'current' && (
                                                <button
                                                    onClick={() => removeScenario(scenario.id)}
                                                    className="p-1.5 rounded-md text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                                    aria-label="Remove scenario"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-4"></div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Tip: Create different scenarios by adjusting loan parameters and save them for comparison.
                    The "Best" option is calculated based on the lowest total cost of the loan.
                </p>
            </div>
        </div>
    );
};

export default ComparisonTable;