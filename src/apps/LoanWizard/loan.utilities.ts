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
    ratio: number; // Percentage of income
    status: 'good' | 'moderate' | 'high';
    maxRecommended: number; // Max recommended EMI based on income
}

interface ChartDataPoint {
    name: string;
    value: number;
    [key: string]: string | number; // Index signature for Recharts compatibility
}


// Calculate monthly EMI using the standard loan formula
const calculateEMI = (params: LoanParams): number => {
    const { loanAmount, interestRate, tenure } = params;

    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = tenure * 12;

    // Handle zero interest rate edge case
    if (monthlyRate === 0) {
        return loanAmount / totalPayments;
    }

    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

    return Math.round(emi);
};

// Calculate total interest paid over loan tenure
const calculateTotalInterest = (params: LoanParams): number => {
    const monthlyEMI = calculateEMI(params);
    const totalPayments = params.tenure * 12;
    const totalPayment = monthlyEMI * totalPayments;

    return totalPayment - params.loanAmount;
};

// Main calculation function
export const calculateLoanResults = (params: LoanParams): LoanResults => {
    const monthlyEMI = calculateEMI(params);
    const totalInterest = calculateTotalInterest(params);
    const totalPayment = params.loanAmount + totalInterest;

    return {
        monthlyEMI,
        totalInterest,
        totalPayment,
    };
};

// Check affordability based on income
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

    // Max recommended EMI (30% of income is ideal)
    const maxRecommended = Math.round(monthlyIncome * 0.3);

    return {
        ratio: Math.round(ratio * 10) / 10,
        status,
        maxRecommended,
    };
};

// Prepare data for donut chart
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

// Format in Indian numbering system (Lakhs/Crores)
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

// Validate loan parameters
export const validateLoanParams = (params: LoanParams): string[] => {
    const errors: string[] = [];

    if (params.loanAmount <= 0) {
        errors.push('Loan amount must be greater than 0');
    }

    if (params.loanAmount > 100000000) { // 10 Crore max
        errors.push('Loan amount cannot exceed ₹10 Crore');
    }

    if (params.interestRate <= 0 || params.interestRate > 50) {
        errors.push('Interest rate must be between 0.1% and 50%');
    }

    if (params.tenure <= 0 || params.tenure > 30) {
        errors.push('Loan tenure must be between 1 and 30 years');
    }

    return errors;
};