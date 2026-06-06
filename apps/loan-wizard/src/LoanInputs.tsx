import { Calculator, Percent, Calendar } from 'lucide-react';
import { formatIndianNumber, type LoanParams } from './loan.utilities';
import { Slider } from '@react-lab/ui';

interface LoanInputsProps {
    loanParams: LoanParams;
    onParamsChange: (params: Partial<LoanParams>) => void;
    className?: string;
}

export default function LoanInputs({ loanParams, onParamsChange, className = '' }: LoanInputsProps) {
    const { loanAmount, interestRate, tenure } = loanParams;

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-jet/40">Parameters</h3>

            {/* Loan Amount */}
            <div className="bg-white rounded-xl p-4 border-l-4 border-bell shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Calculator size={16} className="text-bell" />
                        <span className="text-sm font-medium text-jet">Loan Amount</span>
                    </div>
                    <span className="text-sm font-bold text-bell">{formatIndianNumber(loanAmount)}</span>
                </div>
                <Slider value={loanAmount} min={100000} max={10000000} step={100000}
                    onChange={(value) => onParamsChange({ loanAmount: value })}
                    trackClassName="bg-bell/15" fillClassName="bg-bell" thumbClassName="border-bell" />
                <div className="flex justify-between text-xs text-jet/40">
                    <span>₹1L</span><span>₹1Cr</span>
                </div>
            </div>

            {/* Interest Rate */}
            <div className="bg-white rounded-xl p-4 border-l-4 border-flame shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Percent size={16} className="text-flame" />
                        <span className="text-sm font-medium text-jet">Interest Rate</span>
                    </div>
                    <span className="text-sm font-bold text-flame">{interestRate.toFixed(2)}%</span>
                </div>
                <Slider value={interestRate} min={1} max={20} step={0.25}
                    onChange={(value) => onParamsChange({ interestRate: value })}
                    trackClassName="bg-flame/15" fillClassName="bg-flame" thumbClassName="border-flame" />
                <div className="flex justify-between text-xs text-jet/40">
                    <span>1%</span><span>20%</span>
                </div>
            </div>

            {/* Tenure */}
            <div className="bg-white rounded-xl p-4 border-l-4 border-grape shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-grape" />
                        <span className="text-sm font-medium text-jet">Loan Tenure</span>
                    </div>
                    <span className="text-sm font-bold text-grape">{tenure} {tenure === 1 ? 'yr' : 'yrs'}</span>
                </div>
                <Slider value={tenure} min={1} max={30} step={1}
                    onChange={(value) => onParamsChange({ tenure: value })}
                    trackClassName="bg-grape/15" fillClassName="bg-grape" thumbClassName="border-grape" />
                <div className="flex justify-between text-xs text-jet/40">
                    <span>1Y</span><span>30Y</span>
                </div>
            </div>
        </div>
    );
}
