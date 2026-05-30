import { formatCurrency } from '@react-lab/shared';

export interface LoanParams {
    loanAmount: number;
    interestRate: number; // Annual percentage
    tenure: number;       // In years
}

interface LoanResults {
    monthlyEMI: number;
    totalInterest: number;
    totalPayment: number;
}

export interface AffordabilityResult {
    ratio: number;
    status: 'good' | 'moderate' | 'high';
    maxRecommended: number;
}

interface ChartDataPoint {
    name: string;
    value: number;
    [key: string]: string | number;
}

const calculateEMI = (params: LoanParams): number => {
    const { loanAmount, interestRate, tenure } = params;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = tenure * 12;
    if (monthlyRate === 0) return loanAmount / totalPayments;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(emi);
};

const calculateTotalInterest = (params: LoanParams): number => {
    const monthlyEMI = calculateEMI(params);
    return monthlyEMI * params.tenure * 12 - params.loanAmount;
};

export const calculateLoanResults = (params: LoanParams): LoanResults => {
    const monthlyEMI = calculateEMI(params);
    const totalInterest = calculateTotalInterest(params);
    return { monthlyEMI, totalInterest, totalPayment: params.loanAmount + totalInterest };
};

export const checkAffordability = (monthlyEMI: number, monthlyIncome: number): AffordabilityResult => {
    const ratio = (monthlyEMI / monthlyIncome) * 100;
    const status: 'good' | 'moderate' | 'high' = ratio <= 30 ? 'good' : ratio <= 40 ? 'moderate' : 'high';
    return {
        ratio: Math.round(ratio * 10) / 10,
        status,
        maxRecommended: Math.round(monthlyIncome * 0.3),
    };
};

export const prepareChartData = (params: LoanParams): ChartDataPoint[] => {
    const { totalInterest } = calculateLoanResults(params);
    return [
        { name: 'Principal Amount', value: params.loanAmount },
        { name: 'Total Interest', value: totalInterest },
    ];
};

export const formatIndianNumber = (amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)} K`;
    return formatCurrency(amount);
};
