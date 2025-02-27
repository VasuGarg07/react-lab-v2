/**
 * Type definitions for the home loan calculator
 */

export interface LoanParams {
    homeValue: number;
    downPayment: number;
    loanAmount: number;
    interestRate: number;
    loanTenure: number;
    extraPayment?: number;
}

export interface SavedScenario {
    id: string;
    name: string;
    params: LoanParams;
    monthlyPayment: number;
}

export interface AmortizationYear {
    year: number;
    principalPaid: number;
    interestPaid: number;
    totalPaid: number;
    remainingBalance: number;
    principalPercentage: number;
    interestPercentage: number;
}

export interface AffordabilityMetrics {
    affordabilityRatio: number;
    debtToIncomeRatio: number;
    maxRecommendedPayment: number;
    affordabilityStatus: 'good' | 'caution' | 'warning';
}

export interface ExtraPaymentImpact {
    timeShortened: { years: number; months: number };
    interestSaved: number;
    newPayoffDate: Date;
}