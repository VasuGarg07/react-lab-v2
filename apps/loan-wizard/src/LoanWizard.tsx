import { useEffect, useState } from 'react';
import AffordabilityCheck from './AffordabilityCheck';
import LoanInputs from './LoanInputs';
import LoanResults from './LoanResults';
import { type LoanParams, calculateLoanResults } from './loan.utilities';
import GithubIcon from '../../../packages/ui/icons/github.svg';
import LinkedinIcon from '../../../packages/ui/icons/linkedin.svg';
import XIcon from '../../../packages/ui/icons/x.svg';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

const DEFAULT_PARAMS: LoanParams = {
    loanAmount: 2500000,
    interestRate: 8.5,
    tenure: 20,
};

export default function LoanWizard() {
    const [loanParams, setLoanParams] = useState<LoanParams>(DEFAULT_PARAMS);
    const { monthlyEMI } = calculateLoanResults(loanParams);

    useEffect(() => {
        document.body.setAttribute('data-theme', 'dark');
    }, []);

    return (
        <div className="min-h-dvh flex flex-col bg-neutral-950">

            {/* Header */}
            <header className="shrink-0 border-b border-neutral-800 bg-neutral-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-neutral-600">React Lab</span>
                    <span className="text-neutral-800">·</span>
                    <h1 className="text-sm font-bold text-neutral-100">Loan Wizard</h1>
                </div>
            </header>

            {/* Original content — untouched */}
            <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-neutral-100">Loan Wizard</h1>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Calculate your loan EMI, understand the total cost, and check affordability.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    <div className="w-full lg:w-1/2">
                        <LoanInputs loanParams={loanParams} onParamsChange={p => setLoanParams(prev => ({ ...prev, ...p }))} />
                        <AffordabilityCheck monthlyEMI={monthlyEMI} className="mt-4" />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <LoanResults loanParams={loanParams} />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="shrink-0 border-t border-neutral-800 bg-neutral-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <p className="text-xs text-neutral-600">© {new Date().getFullYear()} Vasu Garg · React Lab</p>
                    <div className="flex items-center gap-0.5">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="w-7 h-7 rounded-lg flex items-center justify-center opacity-25 hover:opacity-80 hover:bg-neutral-800 transition-all duration-150"
                            >
                                <img src={icon} alt={label} className="w-3.5 h-3.5 invert" />
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

        </div>
    );
}
