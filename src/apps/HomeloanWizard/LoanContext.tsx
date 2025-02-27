import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
    LoanParams,
    SavedScenario,
    AmortizationYear,
    AffordabilityMetrics
} from './loan.types';
import {
    calculateMonthlyPayment,
    calculatePaymentSplit,
    generateAmortizationSchedule,
    calculateExtraPaymentImpact,
    calculateAffordability,
    saveLoanScenario
} from './loan.utils';

interface LoanContextType {
    loanParams: LoanParams;
    updateLoanParams: (params: Partial<LoanParams>) => void;
    monthlyPayment: number;
    paymentSplit: { principalPercentage: number; interestPercentage: number };
    amortizationSchedule: AmortizationYear[];
    extraPaymentImpact: {
        timeShortened: { years: number; months: number };
        interestSaved: number;
        newPayoffDate: Date;
    };
    savedScenarios: SavedScenario[];
    saveScenario: (name: string) => void;
    removeScenario: (id: string) => void;
    affordabilityMetrics: AffordabilityMetrics | null;
    updateAffordabilityInputs: (monthlyIncome: number, monthlyExpenses: number) => void;
    monthlyIncome: number;
    monthlyExpenses: number;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

interface LoanProviderProps {
    children: ReactNode;
}

export const LoanProvider: React.FC<LoanProviderProps> = ({ children }) => {
    // Initial loan parameters
    const [loanParams, setLoanParams] = useState<LoanParams>({
        homeValue: 30_00_000,
        downPayment: 6_00_000,
        loanAmount: 24_00_000,
        interestRate: 10,
        loanTenure: 10,
        extraPayment: 0
    });

    // Affordability inputs
    const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
    const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);

    // Saved scenarios for comparison
    const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);

    // Calculate derived values
    const monthlyPayment = calculateMonthlyPayment(loanParams);
    const paymentSplit = calculatePaymentSplit(loanParams);
    const amortizationSchedule = generateAmortizationSchedule(loanParams);
    const extraPaymentImpact = calculateExtraPaymentImpact(loanParams);

    // Calculate affordability metrics if income is provided
    const affordabilityMetrics = monthlyIncome > 0
        ? calculateAffordability(monthlyIncome, monthlyExpenses, monthlyPayment)
        : null;

    // Update loan parameters
    const updateLoanParams = (params: Partial<LoanParams>) => {
        const updatedParams = { ...loanParams, ...params };

        // Make sure loan amount = home value - down payment
        if ('homeValue' in params || 'downPayment' in params) {
            updatedParams.loanAmount = updatedParams.homeValue - updatedParams.downPayment;
        }

        // If loan amount is changed directly, adjust down payment
        if ('loanAmount' in params) {
            updatedParams.downPayment = updatedParams.homeValue - updatedParams.loanAmount;
        }

        setLoanParams(updatedParams);
    };

    // Update affordability inputs
    const updateAffordabilityInputs = (income: number, expenses: number) => {
        setMonthlyIncome(income);
        setMonthlyExpenses(expenses);
    };

    // Save a scenario for comparison
    const saveScenario = (name: string) => {
        const scenario = saveLoanScenario(loanParams, name);
        setSavedScenarios([...savedScenarios, scenario]);
    };

    // Remove a saved scenario
    const removeScenario = (id: string) => {
        setSavedScenarios(savedScenarios.filter(scenario => scenario.id !== id));
    };

    return (
        <LoanContext.Provider
            value={{
                loanParams,
                updateLoanParams,
                monthlyPayment,
                paymentSplit,
                amortizationSchedule,
                extraPaymentImpact,
                savedScenarios,
                saveScenario,
                removeScenario,
                affordabilityMetrics,
                updateAffordabilityInputs,
                monthlyIncome,
                monthlyExpenses
            }}
        >
            {children}
        </LoanContext.Provider>
    );
};

// Custom hook for using the loan context
export const useLoan = () => {
    const context = useContext(LoanContext);
    if (context === undefined) {
        throw new Error('useLoan must be used within a LoanProvider');
    }
    return context;
};