import { formatCurrency } from "../../shared/utilities";

export interface LoanParams {
    loanAmount: number;
    interestRate: number; // Annual percentage
    tenure: number; // In years
}

interface LoanResults {
    monthlyEMI: number;
    totalInterest: number;
    totalPayment: number;
}

interface AffordabilityResult {
    ratio: number;
    status: 'good' | 'moderate' | 'high';
    maxRecommended: number;
}

interface ChartDataPoint {
    name: string;
    value: number;
    [key: string]: string | number; // Index signature for Recharts compatibility
}


const calculateEMI = (params: LoanParams): number => {
    const { loanAmount, interestRate, tenure } = params;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = tenure * 12;
    if (monthlyRate === 0) {
        return loanAmount / totalPayments;
    }

    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(emi);
};

const calculateTotalInterest = (params: LoanParams): number => {
    const monthlyEMI = calculateEMI(params);
    const totalPayments = params.tenure * 12;
    const totalPayment = monthlyEMI * totalPayments;
    return totalPayment - params.loanAmount;
};

export const calculateLoanResults = (params: LoanParams): LoanResults => {
    const monthlyEMI = calculateEMI(params);
    const totalInterest = calculateTotalInterest(params);
    const totalPayment = params.loanAmount + totalInterest;
    return {        monthlyEMI,        totalInterest,        totalPayment    };
};

export const checkAffordability = (monthlyEMI: number, monthlyIncome: number): AffordabilityResult => {
    const ratio = (monthlyEMI / monthlyIncome) * 100;
    let status: 'good' | 'moderate' | 'high';
    if (ratio <= 30) {
        status = 'good';
    } else if (ratio <= 40) {
        status = 'moderate';
    } else {
        status = 'high';
    }

    const maxRecommended = Math.round(monthlyIncome * 0.3);
    return {
        ratio: Math.round(ratio * 10) / 10,
        status,
        maxRecommended,
    };
};

export const prepareChartData = (params: LoanParams): ChartDataPoint[] => {
    const results = calculateLoanResults(params);
    return [
        {
            name: 'Principal Amount',
            value: params.loanAmount,
        },
        {
            name: 'Total Interest',
            value: results.totalInterest,
        },
    ];
};

export const formatIndianNumber = (amount: number): string => {
    if (amount >= 10000000) { // 1 Crore
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) { // 1 Lakh
        return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) { // 1 Thousand
        return `₹${(amount / 1000).toFixed(1)} K`;
    }
    return formatCurrency(amount);
};