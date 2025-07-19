import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { FC } from 'react';
import LoanChart from './LoanChart';
import { LoanParams, calculateLoanResults, formatCurrency, formatIndianNumber } from './loanUtils';

interface LoanResultsProps {
    loanParams: LoanParams;
    className?: string;
}

const LoanResults: FC<LoanResultsProps> = ({ loanParams, className = '' }) => {
    // Calculate all loan results
    const results = calculateLoanResults(loanParams);
    const { monthlyEMI, totalInterest, totalPayment } = results;

    // Calculate additional metrics
    const interestToLoanRatio = (totalInterest / loanParams.loanAmount) * 100;
    const monthlyInterest = (loanParams.loanAmount * loanParams.interestRate / 100) / 12;
    const totalMonths = loanParams.tenure * 12;

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Header */}
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Your Loan Summary
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Based on your loan parameters
                </p>
            </div>

            {/* Main EMI Display Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <Calculator size={24} />
                    <h4 className="text-lg font-semibold">Monthly EMI</h4>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold mb-1">
                        {formatCurrency(monthlyEMI)}
                    </div>
                    <div className="text-blue-100 text-sm">
                        For {loanParams.tenure} years at {loanParams.interestRate}% interest
                    </div>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Total Interest */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp size={20} className="text-red-500" />
                        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Total Interest
                        </h4>
                    </div>
                    <div className="text-xl font-semibold text-red-600 dark:text-red-400 mb-1">
                        {formatCurrency(totalInterest)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {interestToLoanRatio.toFixed(1)}% of loan amount
                    </div>
                </div>

                {/* Total Payment */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign size={20} className="text-purple-500" />
                        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Total Payment
                        </h4>
                    </div>
                    <div className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-1">
                        {formatCurrency(totalPayment)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Over {totalMonths} months
                    </div>
                </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Principal Amount
                    </div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {formatIndianNumber(loanParams.loanAmount)}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        First Month Interest
                    </div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {formatCurrency(monthlyInterest)}
                    </div>
                </div>
            </div>

            {/* Chart Integration */}
            <LoanChart loanParams={loanParams} />
        </div>
    );
};

export default LoanResults;