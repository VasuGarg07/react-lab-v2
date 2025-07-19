import { Home, Percent, Calendar, Info } from 'lucide-react';
import Slider from '@/ui/Slider';
import Tooltip from '@/ui/Tooltip';
import { LoanParams, formatIndianNumber } from './loanUtils';
import { FC } from 'react';

interface LoanInputsProps {
    loanParams: LoanParams;
    onParamsChange: (params: Partial<LoanParams>) => void;
    className?: string;
}

const LoanInputs: FC<LoanInputsProps> = ({
    loanParams,
    onParamsChange,
    className = ''
}) => {
    const { loanAmount, interestRate, tenure } = loanParams;

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Header */}
            <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Loan Details
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Adjust parameters to see EMI changes
                </p>
            </div>

            {/* Loan Amount */}
            <div className='bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col gap-2'>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Home size={16} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Loan Amount</span>
                        <Tooltip content="Total amount to borrow">
                            <Info size={12} className="text-gray-400 hover:text-gray-600 cursor-help" />
                        </Tooltip>
                    </div>
                    <span className="text-md font-semibold text-blue-600 dark:text-blue-400">
                        {formatIndianNumber(loanAmount)}
                    </span>
                </div>
                <Slider
                    id="loanAmount"
                    label="Loan Amount"
                    value={loanAmount}
                    min={500000}
                    max={50000000}
                    step={100000}
                    format={formatIndianNumber}
                    marks={[
                        { value: 500000, label: '₹5L' },
                        { value: 50000000, label: '₹5Cr' }
                    ]}
                    onChange={(value) => onParamsChange({ loanAmount: value })}
                    primaryColor="bg-blue-500"
                />

                {/* Interest Rate */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <Percent size={16} className="text-red-600 dark:text-red-400" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Interest Rate</span>
                        <Tooltip content="Annual interest rate charged by the bank">
                            <Info size={12} className="text-gray-400 hover:text-gray-600 cursor-help" />
                        </Tooltip>
                    </div>
                    <span className="text-md font-semibold text-red-600 dark:text-red-400">
                        {interestRate.toFixed(2)}%
                    </span>
                </div>
                <Slider
                    id="interestRate"
                    label="Interest Rate"
                    value={interestRate}
                    min={3}
                    max={18}
                    step={0.25}
                    format={(value) => `${value.toFixed(2)}%`}
                    marks={[
                        { value: 3, label: '3%' },
                        { value: 18, label: '18%' }
                    ]}
                    onChange={(value) => onParamsChange({ interestRate: value })}
                    primaryColor="bg-red-500"
                />

                {/* Loan Tenure */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Loan Tenure</span>
                        <Tooltip content="Loan repayment duration">
                            <Info size={12} className="text-gray-400 hover:text-gray-600 cursor-help" />
                        </Tooltip>
                    </div>
                    <span className="text-md font-semibold text-green-600 dark:text-green-400">
                        {tenure} {tenure === 1 ? 'Year' : 'Years'}
                    </span>
                </div>
                <Slider
                    id="tenure"
                    label="Tenure"
                    value={tenure}
                    min={1}
                    max={30}
                    step={1}
                    format={(value) => `${value} ${value === 1 ? 'Year' : 'Years'}`}
                    marks={[
                        { value: 1, label: '1Y' },
                        { value: 30, label: '30Y' }
                    ]}
                    onChange={(value) => onParamsChange({ tenure: value })}
                    primaryColor="bg-green-500"
                />
            </div>
        </div>
    );
};

export default LoanInputs;