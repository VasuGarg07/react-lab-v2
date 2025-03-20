import React, { useCallback, useMemo } from 'react';
import { Info } from 'lucide-react';
import { useLoan } from './LoanContext';
import { formatCurrency } from './loan.utils';
import Tooltip from '@/ui/Tooltip';
import { cn } from '@/shared/cn';
import CustomSlider from '@/apps/HomeloanWizard/CustomSlider';

// Define color schemes for different sliders
const sliderColors = {
    homeValue: 'bg-blue-500',
    downPayment: 'bg-green-500',
    loanAmount: 'bg-purple-500',
    interestRate: 'bg-red-500',
    loanTenure: 'bg-amber-500',
    extraPayment: 'bg-teal-500'
};

const LoanInputs: React.FC = () => {
    const { loanParams, updateLoanParams } = useLoan();
    const { homeValue, downPayment, loanAmount, interestRate, loanTenure, extraPayment = 0 } = loanParams;

    // Generic handler for slider changes - use useCallback for memoization
    const handleSliderChange = useCallback((paramName: keyof typeof loanParams) => (newValue: number) => {
        updateLoanParams({ [paramName]: newValue });
    }, [updateLoanParams]);

    // Handler for number input changes - use useCallback for memoization
    const handleInputChange = useCallback((paramName: keyof typeof loanParams) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (!isNaN(value) && value >= 0) {
            updateLoanParams({ [paramName]: value });
        }
    }, [updateLoanParams]);

    // Define input field configurations - use useMemo to prevent recreating on every render
    const inputFields = useMemo(() => [
        {
            id: 'homeValue',
            label: 'Home Value',
            value: homeValue,
            min: 10_00_000,
            max: 100_00_000,
            step: 50_000,
            format: formatCurrency,
            marks: [
                { value: 10_00_000, label: '₹10M' },
                { value: 100_00_000, label: '₹100M' }
            ],
            color: sliderColors.homeValue
        },
        {
            id: 'downPayment',
            label: 'Down Payment',
            value: downPayment,
            min: 0,
            max: homeValue,
            step: 50_000,
            format: formatCurrency,
            marks: [
                { value: 0, label: '₹0M' },
                { value: homeValue, label: '₹' + (homeValue / 100000).toFixed(1) + 'M' }
            ],
            color: sliderColors.downPayment
        },
        {
            id: 'loanAmount',
            label: 'Loan Amount',
            value: loanAmount,
            min: 0,
            max: homeValue,
            step: 50_000,
            format: formatCurrency,
            marks: [
                { value: 0, label: '₹0M' },
                { value: homeValue, label: '₹' + (homeValue / 100000).toFixed(1) + 'M' }
            ],
            color: sliderColors.loanAmount
        },
        {
            id: 'interestRate',
            label: 'Interest Rate',
            value: interestRate,
            min: 2,
            max: 18,
            step: 0.1,
            format: (value: number) => `${value}%`,
            marks: [
                { value: 2, label: '2%' },
                { value: 18, label: '18%' }
            ],
            color: sliderColors.interestRate
        },
        {
            id: 'loanTenure',
            label: 'Loan Tenure',
            value: loanTenure,
            min: 5,
            max: 25,
            step: 1,
            format: (value: number) => `${value} Years`,
            marks: [
                { value: 5, label: '5 Years' },
                { value: 25, label: '25 Years' }
            ],
            color: sliderColors.loanTenure
        }
    ], [homeValue, downPayment, loanAmount, interestRate, loanTenure]);

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm dark:shadow-2xl border border-white/50 dark:border-neutral-800/50">
            <div className="p-6">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-6">
                    Loan Parameters
                </h3>

                <div className="space-y-6">
                    {/* Map through the input fields array to render sliders */}
                    {inputFields.map((field) => (
                        <div key={field.id} className="space-y-1">
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor={field.id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    {field.label}
                                </label>
                                <div className="text-sm font-medium text-neutral-900 dark:text-white">
                                    {field.format(field.value)}
                                </div>
                            </div>
                            <CustomSlider
                                id={field.id}
                                label={field.label}
                                value={field.value}
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                format={field.format}
                                marks={field.marks}
                                onChange={handleSliderChange(field.id as keyof typeof loanParams)}
                                primaryColor={field.color}
                            />
                        </div>
                    ))}

                    {/* Extra Monthly Payment */}
                    <div className="space-y-1 pt-2">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-1.5">
                                <label htmlFor="extraPayment" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Extra Monthly Payment
                                </label>
                                <Tooltip
                                    content="Making additional monthly payments will reduce your loan term and save on total interest."
                                >
                                    <button className="inline-flex text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                                        <Info size={14} />
                                    </button>
                                </Tooltip>
                            </div>
                            <div className="text-sm font-medium text-neutral-900 dark:text-white">
                                {formatCurrency(extraPayment)}
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <span className="flex items-center justify-center h-10 w-10 bg-neutral-100 dark:bg-neutral-800 border-y border-l border-neutral-300 dark:border-neutral-600 rounded-l-lg text-neutral-500 dark:text-neutral-400">
                                ₹
                            </span>
                            <input
                                id="extraPayment"
                                type="number"
                                value={extraPayment}
                                onChange={handleInputChange('extraPayment')}
                                min={0}
                                step={1000}
                                className={cn(
                                    "w-full h-10 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-r-lg",
                                    "bg-white dark:bg-neutral-800",
                                    "text-neutral-900 dark:text-white",
                                    "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
                                    "dark:focus:ring-primary-400/20 dark:focus:border-primary-400"
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanInputs;