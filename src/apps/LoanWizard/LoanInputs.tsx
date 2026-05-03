import { Calculator, Percent, Calendar } from 'lucide-react';
import { formatIndianNumber, type LoanParams } from './loan.utilities';
import Slider from '../../ui/Slider';

interface LoanInputsProps {
    loanParams: LoanParams;
    onParamsChange: (params: Partial<LoanParams>) => void;
    className?: string;
}

const LoanInputs = ({
    loanParams,
    onParamsChange,
    className = ''
}: LoanInputsProps) => {
    const { loanAmount, interestRate, tenure } = loanParams;

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Loan Details
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Adjust parameters to calculate EMI
                </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-6">

                {/* Loan Amount */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calculator size={18} className="text-blue-500" />
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                Loan Amount
                            </span>
                        </div>
                        <span className="text-base font-semibold text-blue-600 dark:text-blue-400">
                            {formatIndianNumber(loanAmount)}
                        </span>
                    </div>
                    <Slider
                        value={loanAmount}
                        min={100000}
                        max={10000000}
                        step={100000}
                        onChange={(value) => onParamsChange({ loanAmount: value })}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                        <span>₹1L</span>
                        <span>₹10Cr</span>
                    </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Percent size={18} className="text-red-500" />
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                Interest Rate
                            </span>
                        </div>
                        <span className="text-base font-semibold text-red-600 dark:text-red-400">
                            {interestRate.toFixed(2)}%
                        </span>
                    </div>
                    <Slider
                        value={interestRate}
                        min={1}
                        max={20}
                        step={0.25}
                        onChange={(value) => onParamsChange({ interestRate: value })}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                        <span>1%</span>
                        <span>20%</span>
                    </div>
                </div>

                {/* Loan Tenure */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-green-500" />
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                Loan Tenure
                            </span>
                        </div>
                        <span className="text-base font-semibold text-green-600 dark:text-green-400">
                            {tenure} {tenure === 1 ? 'Year' : 'Years'}
                        </span>
                    </div>
                    <Slider
                        value={tenure}
                        min={1}
                        max={30}
                        step={1}
                        onChange={(value) => onParamsChange({ tenure: value })}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                        <span>1Y</span>
                        <span>30Y</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanInputs;