import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import AffordabilityCheck from './AffordabilityCheck';
import LoanInputs from './LoanInputs';
import LoanResults from './LoanResults';
import { type LoanParams, calculateLoanResults, validateLoanParams } from './loan.utilities';

const LoanWizard = () => {
    const [loanParams, setLoanParams] = useState<LoanParams>({
        loanAmount: 2500000, // 25 Lakhs
        interestRate: 8.5,   // 8.5%
        tenure: 20           // 20 years
    });

    // Calculate results
    const results = calculateLoanResults(loanParams);

    // Validate parameters
    const validationErrors = validateLoanParams(loanParams);

    // Handle parameter changes
    const handleParamsChange = (newParams: Partial<LoanParams>) => {
        setLoanParams(prev => ({ ...prev, ...newParams }));
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-lg">
                        <Sparkles size={28} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        Loan Wizard
                    </h1>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                    Calculate your loan EMI, understand the total cost, and check affordability.
                </p>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-2">
                            Please fix the following issues:
                        </h4>
                        <ul className="text-sm text-red-800 dark:text-red-400 space-y-1">
                            {validationErrors.map((error, index) => (
                                <li key={index}>• {error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Left Column - Inputs */}
                <div className="w-full lg:w-1/3">
                    <LoanInputs
                        loanParams={loanParams}
                        onParamsChange={handleParamsChange}
                    />
                </div>

                {/* Middle Column - Results */}
                <div className="w-full lg:w-1/3">
                    {validationErrors.length === 0 ? (
                        <LoanResults loanParams={loanParams} />
                    ) : (
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 border border-neutral-200 dark:border-neutral-700 text-center shadow-sm">
                            <Sparkles size={48} className="text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Fix validation errors to see results
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Column - Affordability */}
                <div className="w-full lg:w-1/3">
                    {validationErrors.length === 0 ? (
                        <AffordabilityCheck monthlyEMI={results.monthlyEMI} />
                    ) : (
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 border border-neutral-200 dark:border-neutral-700 text-center shadow-sm">
                            <Sparkles size={48} className="text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Enter valid parameters
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Calculations are estimates. Actual rates may vary by lender.
                </p>
            </div>
        </div>
    );
};

export default LoanWizard;