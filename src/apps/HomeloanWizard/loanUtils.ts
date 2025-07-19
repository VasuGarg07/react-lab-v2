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
    status: 'good' | 'moderate' | 'high'; // Simple 3-level status
    maxRecommended: number; // Max recommended EMI based on income
}

interface ChartDataPoint {
    name: string;
    principal: number;
    interest: number;
    year?: number;
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

    return {
        monthlyEMI,
        totalInterest,
        totalPayment,
    };
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

    // Max recommended EMI (30% of income is ideal)
    const maxRecommended = Math.round(monthlyIncome * 0.3);

    return {
        ratio: Math.round(ratio * 10) / 10,
        status,
        maxRecommended,
    };
};

export const prepareDonutChartData = (params: LoanParams): ChartDataPoint[] => {
    const results = calculateLoanResults(params);

    return [
        {
            name: 'Principal Amount',
            principal: params.loanAmount,
            interest: 0,
        },
        {
            name: 'Total Interest',
            principal: 0,
            interest: results.totalInterest,
        },
    ];
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
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

export const validateLoanParams = (params: LoanParams): string[] => {
    const errors: string[] = [];

    if (params.loanAmount <= 0) {
        errors.push('Loan amount must be greater than 0');
    }

    if (params.interestRate <= 0 || params.interestRate > 50) {
        errors.push('Interest rate must be between 0.1% and 50%');
    }

    if (params.tenure <= 0 || params.tenure > 30) {
        errors.push('Loan tenure must be between 1 and 30 years');
    }

    return errors;
};