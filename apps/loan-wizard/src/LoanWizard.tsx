import { useState } from 'react';
import AffordabilityCheck from './AffordabilityCheck';
import LoanInputs from './LoanInputs';
import LoanResults from './LoanResults';
import { type LoanParams, calculateLoanResults } from './loan.utilities';
import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';
import { formatCurrency } from '@react-lab/shared';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

const iconFilter = 'brightness(0) saturate(100%) invert(98%) sepia(2%) saturate(200%) hue-rotate(200deg) brightness(120%)';

const DEFAULT_PARAMS: LoanParams = {
    loanAmount: 2500000,
    interestRate: 8.5,
    tenure: 20,
};

export default function LoanWizard() {
    const [loanParams, setLoanParams] = useState<LoanParams>(DEFAULT_PARAMS);
    const { monthlyEMI, totalPayment, totalInterest } = calculateLoanResults(loanParams);

    return (
        <div className="min-h-dvh flex flex-col bg-offwhite">

            {/* Header */}
            <header className="shrink-0 bg-jet">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center">
                    <h1 className="text-sm font-bold tracking-tight text-white">Loan Wizard</h1>
                </div>
            </header>

            {/* Hero EMI strip */}
            <div className="bg-flame">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    {/* EMI — full width on mobile, left-aligned on desktop */}
                    <div className="mb-5 sm:mb-0 sm:flex sm:items-center sm:justify-between sm:gap-8">
                        <div className="mb-5 sm:mb-0">
                            <p className="text-[10px] font-semibold tracking-widest uppercase text-white/70 mb-1">Monthly EMI</p>
                            <div className="text-4xl sm:text-5xl font-bold text-white leading-none">{formatCurrency(monthlyEMI)}</div>
                            <p className="text-white/60 text-xs mt-2">
                                {loanParams.tenure}yr &middot; {loanParams.interestRate}% p.a.
                            </p>
                        </div>

                        {/* Stats — 3-col grid, divider only on desktop */}
                        <div className="grid grid-cols-3 gap-0 sm:gap-0 divide-x divide-white/20 sm:shrink-0">
                            <div className="text-center px-4 sm:px-8 first:pl-0 sm:first:pl-8">
                                <p className="text-[10px] text-white/60 mb-1 uppercase tracking-wide">Principal</p>
                                <p className="text-sm sm:text-base font-semibold text-white">{formatCurrency(loanParams.loanAmount)}</p>
                            </div>
                            <div className="text-center px-4 sm:px-8">
                                <p className="text-[10px] text-white/60 mb-1 uppercase tracking-wide">Interest</p>
                                <p className="text-sm sm:text-base font-semibold text-white">{formatCurrency(totalInterest)}</p>
                            </div>
                            <div className="text-center px-4 sm:px-8 last:pr-0">
                                <p className="text-[10px] text-white/60 mb-1 uppercase tracking-wide">Total</p>
                                <p className="text-sm sm:text-base font-semibold text-white">{formatCurrency(totalPayment)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content — 3-column on desktop */}
            <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                    <LoanInputs
                        loanParams={loanParams}
                        onParamsChange={p => setLoanParams(prev => ({ ...prev, ...p }))}
                    />
                    <LoanResults loanParams={loanParams} />
                    <AffordabilityCheck monthlyEMI={monthlyEMI} />
                </div>
            </main>

            {/* Footer */}
            <footer className="shrink-0 bg-jet">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <p className="text-xs text-white/60">© {new Date().getFullYear()} Vasu Garg</p>
                    <div className="flex items-center gap-0.5">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="w-7 h-7 rounded-md flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/10 transition-all"
                            >
                                <img src={icon} alt={label} className="w-3.5 h-3.5" style={{ filter: iconFilter }} />
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

        </div>
    );
}
