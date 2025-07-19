import React, { useState, useMemo } from 'react';
import { Calculator, RotateCcw, TrendingUp } from 'lucide-react';
import { LoanParams, calculateLoanResults, validateLoanParams } from './loanUtils';
import LoanInputs from './LoanInputs';
import LoanResults from './LoanResults';
import AffordabilityCheck from './AffordabilityCheck';

const LoanCalculator: React.FC = () => {
    // Simple state management - no complex context needed
    const [loanParams, setLoanParams] = useState<LoanParams>({
        loanAmount: 2500000, // 25 Lakhs - common home loan amount
        interestRate: 8.5,   // 8.5% - typical current rate
        tenure: 20           // 20 years - balanced tenure
    });

    // Calculate results - memoized for performance
    const results = useMemo(() => {
        return calculateLoanResults(loanParams);
    }, [loanParams]);

    // Validate parameters
    const validationErrors = useMemo(() => {
        return validateLoanParams(loanParams);
    }, [loanParams]);

    // Handle parameter changes from inputs
    const handleParamsChange = (newParams: Partial<LoanParams>) => {
        setLoanParams(prev => ({ ...prev, ...newParams }));
    };

    // Reset to default values
    const handleReset = () => {
        setLoanParams({
            loanAmount: 2500000,
            interestRate: 8.5,
            tenure: 20
        });
    };

    // Quick preset scenarios
    const handlePreset = (preset: 'starter' | 'premium' | 'luxury') => {
        const presets = {
            starter: {
                loanAmount: 1500000,  // 15 Lakhs
                interestRate: 7.5,
                tenure: 15
            },
            premium: {
                loanAmount: 5000000,  // 50 Lakhs
                interestRate: 8.0,
                tenure: 20
            },
            luxury: {
                loanAmount: 10000000, // 1 Crore
                interestRate: 8.5,
                tenure: 25
            }
        };
        setLoanParams(presets[preset]);
    };

    return (
        <div className="relative max-w-7xl mx-auto p-4">
            {/* Header */}
            <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Calculator size={32} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        Loan Calculator
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Calculate your home loan EMI, understand the total cost, and check affordability.
                </p>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex justify-center gap-2 mb-4">
                <button
                    onClick={() => handlePreset('starter')}
                    className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    🏠 Starter (₹15L)
                </button>
                <button
                    onClick={() => handlePreset('premium')}
                    className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    🏡 Premium (₹50L)
                </button>
                <button
                    onClick={() => handlePreset('luxury')}
                    className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    🏰 Luxury (₹1Cr)
                </button>
                <button
                    onClick={handleReset}
                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                >
                    <RotateCcw size={14} />
                    Reset
                </button>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
                <div className="max-w-2xl mx-auto mb-4">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                            Please fix the following issues:
                        </h4>
                        <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                            {validationErrors.map((error, index) => (
                                <li key={index}>• {error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Main Content - Flex Layout */}
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left Column - Inputs */}
                <div className="flex-1">
                    <LoanInputs
                        loanParams={loanParams}
                        onParamsChange={handleParamsChange}
                    />
                </div>

                {/* Middle Column - Results & Chart */}
                <div className="flex-1">
                    {validationErrors.length === 0 ? (
                        <LoanResults loanParams={loanParams} />
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                            <TrendingUp size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">
                                Fix the validation errors to see your loan calculation results.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Column - Affordability */}
                <div className="flex-1">
                    {validationErrors.length === 0 ? (
                        <AffordabilityCheck monthlyEMI={results.monthlyEMI} />
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                            <Calculator size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">
                                Enter valid loan parameters to check affordability.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Summary Card - Only show when valid */}
            {validationErrors.length === 0 && (
                <div className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <h3 className="text-lg font-semibold mb-1">
                                Your Loan Summary
                            </h3>
                            <p className="text-blue-100 text-sm">
                                ₹{(loanParams.loanAmount / 100000).toFixed(1)}L loan at {loanParams.interestRate}% for {loanParams.tenure} years
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
                            <div>
                                <div className="text-sm text-blue-100">Monthly EMI</div>
                                <div className="text-xl font-bold">
                                    ₹{(results.monthlyEMI / 1000).toFixed(1)}K
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-blue-100">Total Interest</div>
                                <div className="text-xl font-bold">
                                    ₹{(results.totalInterest / 100000).toFixed(1)}L
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-blue-100">Total Cost</div>
                                <div className="text-xl font-bold">
                                    ₹{(results.totalPayment / 100000).toFixed(1)}L
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    💡 Tip: Try different combinations to find the best loan structure for your budget.
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Calculations are estimates. Actual rates may vary by lender and credit profile.
                </p>
            </div>
        </div>
    );
};

export default LoanCalculator;