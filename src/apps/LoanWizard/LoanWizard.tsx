import { useState } from 'react';
import AffordabilityCheck from './AffordabilityCheck';
import LoanInputs from './LoanInputs';
import LoanResults from './LoanResults';
import { type LoanParams, calculateLoanResults } from './loan.utilities';

const LoanWizard = () => {
    const [loanParams, setLoanParams] = useState<LoanParams>({
        loanAmount: 2500000, // 25 Lakhs
        interestRate: 8.5,   // 8.5%
        tenure: 20           // 20 years
    });

    // Calculate results
    const results = calculateLoanResults(loanParams);

    // Handle parameter changes
    const handleParamsChange = (newParams: Partial<LoanParams>) => {
        setLoanParams(prev => ({ ...prev, ...newParams }));
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    Loan Wizard
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                    Calculate your loan EMI, understand the total cost, and check affordability.
                </p>
            </div>


            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <div className="w-full lg:w-1/2">
                    <LoanInputs
                        loanParams={loanParams}
                        onParamsChange={handleParamsChange}
                    />
                    <AffordabilityCheck monthlyEMI={results.monthlyEMI} className='mt-4' />
                </div>

                <div className="w-full lg:w-1/2">
                    <LoanResults loanParams={loanParams} />
                </div>
            </div>
        </div>
    );
};

export default LoanWizard;