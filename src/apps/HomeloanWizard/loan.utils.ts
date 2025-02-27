/**
 * Core loan calculation utilities
 */

export interface LoanParams {
  homeValue: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
  extraPayment?: number;
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

/**
 * Convert annual interest rate to monthly rate (decimal)
 */
export const getMonthlyRate = (annualRate: number): number => {
  return annualRate / 100 / 12;
};

/**
 * Calculate monthly payment amount for a loan
 */
export const calculateMonthlyPayment = (params: LoanParams): number => {
  const { loanAmount, interestRate, loanTenure } = params;

  const monthlyRate = getMonthlyRate(interestRate);

  // Convert years to months
  const totalPayments = loanTenure * 12;

  // Calculate monthly payment using formula: P = (r * PV) / (1 - (1 + r)^-n)
  // Where P = payment, r = monthly interest rate, PV = loan amount, n = number of payments
  if (monthlyRate === 0) {
    return loanAmount / totalPayments;
  }

  const monthlyPayment =
    (monthlyRate * loanAmount) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments));

  return monthlyPayment;
};

/**
 * Calculate total interest paid over loan lifecycle
 */
export const calculateTotalInterest = (params: LoanParams): number => {
  const monthlyPayment = calculateMonthlyPayment(params);
  const totalPayments = params.loanTenure * 12;

  return (monthlyPayment * totalPayments) - params.loanAmount;
};

/**
 * Calculate percentage of payment going to principal and interest
 */
export const calculatePaymentSplit = (params: LoanParams): { principalPercentage: number; interestPercentage: number } => {
  const totalInterest = calculateTotalInterest(params);
  const totalPaid = params.loanAmount + totalInterest;

  const principalPercentage = (params.loanAmount / totalPaid) * 100;
  const interestPercentage = (totalInterest / totalPaid) * 100;

  return {
    principalPercentage: Number(principalPercentage.toFixed(2)),
    interestPercentage: Number(interestPercentage.toFixed(2))
  };
};

/**
 * Process a single month's payment and return the updated values
 */
const processMonthlyPayment = (
  remainingBalance: number,
  monthlyPayment: number,
  monthlyRate: number,
  extraPayment: number = 0
): {
  principalPaid: number;
  interestPaid: number;
  newRemainingBalance: number;
  isFullyPaid: boolean;
} => {
  if (remainingBalance <= 0) {
    return {
      principalPaid: 0,
      interestPaid: 0,
      newRemainingBalance: 0,
      isFullyPaid: true
    };
  }

  // Calculate interest for this month
  const interestPaid = remainingBalance * monthlyRate;

  // Calculate principal for this month
  let principalPaid = monthlyPayment - interestPaid;

  // Add extra payment
  if (extraPayment > 0) {
    principalPaid += extraPayment;
  }

  // Make sure we don't pay more than remaining
  principalPaid = Math.min(principalPaid, remainingBalance);

  // Calculate new remaining balance
  const newRemainingBalance = remainingBalance - principalPaid;

  return {
    principalPaid,
    interestPaid,
    newRemainingBalance,
    isFullyPaid: newRemainingBalance <= 0
  };
};

/**
 * Generate year-by-year amortization schedule
 */
export const generateAmortizationSchedule = (params: LoanParams): AmortizationYear[] => {
  const { loanAmount, interestRate, loanTenure, extraPayment = 0 } = params;
  const monthlyPayment = calculateMonthlyPayment(params);
  const monthlyRate = getMonthlyRate(interestRate);

  const schedule: AmortizationYear[] = [];

  let remainingBalance = loanAmount;

  for (let year = 1; year <= loanTenure; year++) {
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    // Calculate for each month in the year
    for (let i = 0; i < 12; i++) {
      const {
        principalPaid,
        interestPaid,
        newRemainingBalance,
        isFullyPaid
      } = processMonthlyPayment(remainingBalance, monthlyPayment, monthlyRate, extraPayment);

      // Update totals
      yearlyInterest += interestPaid;
      yearlyPrincipal += principalPaid;
      remainingBalance = newRemainingBalance;

      // If loan is paid off, break out
      if (isFullyPaid) {
        break;
      }
    }

    const yearlyTotal = yearlyPrincipal + yearlyInterest;

    // Create year entry with formatted numbers
    schedule.push({
      year,
      principalPaid: Number(yearlyPrincipal.toFixed(2)),
      interestPaid: Number(yearlyInterest.toFixed(2)),
      totalPaid: Number(yearlyTotal.toFixed(2)),
      remainingBalance: Number(remainingBalance.toFixed(2)),
      principalPercentage: Number(((yearlyPrincipal / yearlyTotal) * 100).toFixed(2)),
      interestPercentage: Number(((yearlyInterest / yearlyTotal) * 100).toFixed(2))
    });

    // If loan is paid off, exit loop
    if (remainingBalance <= 0) {
      break;
    }
  }

  return schedule;
};

/**
 * Calculate impact of extra payments
 */
export const calculateExtraPaymentImpact = (
  params: LoanParams
): {
  timeShortened: { years: number; months: number };
  interestSaved: number;
  newPayoffDate: Date;
} => {
  const { loanAmount, interestRate, loanTenure, extraPayment = 0 } = params;

  // If no extra payment, return zeros
  if (extraPayment === 0) {
    const originalEndDate = new Date();
    originalEndDate.setFullYear(originalEndDate.getFullYear() + loanTenure);

    return {
      timeShortened: { years: 0, months: 0 },
      interestSaved: 0,
      newPayoffDate: originalEndDate
    };
  }

  const monthlyPayment = calculateMonthlyPayment(params);
  const monthlyRate = getMonthlyRate(interestRate);

  // Calculate original scenario
  const originalTotalInterest = calculateTotalInterest(params);
  const originalTotalMonths = loanTenure * 12;

  // Calculate with extra payments
  let remainingBalance = loanAmount;
  let actualMonths = 0;
  let totalInterestPaid = 0;

  const MAX_MONTHS = 600; // Limit to 50 years to prevent infinite loops

  while (remainingBalance > 0 && actualMonths < MAX_MONTHS) {
    const {
      interestPaid,
      newRemainingBalance,
      isFullyPaid
    } = processMonthlyPayment(remainingBalance, monthlyPayment, monthlyRate, extraPayment);

    // Update totals
    totalInterestPaid += interestPaid;
    remainingBalance = newRemainingBalance;
    actualMonths++;

    // If loan is paid off, break out
    if (isFullyPaid) {
      break;
    }
  }

  // Calculate time shortened
  const monthsShortened = originalTotalMonths - actualMonths;
  const yearsShortened = Math.floor(monthsShortened / 12);
  const extraMonthsShortened = monthsShortened % 12;

  // Calculate interest saved
  const interestSaved = originalTotalInterest - totalInterestPaid;

  // Calculate new payoff date
  const newPayoffDate = new Date();
  newPayoffDate.setMonth(newPayoffDate.getMonth() + actualMonths);

  return {
    timeShortened: {
      years: yearsShortened,
      months: extraMonthsShortened
    },
    interestSaved: Number(interestSaved.toFixed(2)),
    newPayoffDate
  };
};

/**
 * Calculate affordability metrics based on income and expenses
 */
export const calculateAffordability = (
  monthlyIncome: number,
  monthlyExpenses: number,
  monthlyPayment: number
): {
  affordabilityRatio: number;
  debtToIncomeRatio: number;
  maxRecommendedPayment: number;
  affordabilityStatus: 'good' | 'caution' | 'warning';
} => {
  // Calculate affordability metrics
  const availableIncome = monthlyIncome - monthlyExpenses;
  const affordabilityRatio = (monthlyPayment / availableIncome) * 100;
  const debtToIncomeRatio = ((monthlyExpenses + monthlyPayment) / monthlyIncome) * 100;

  // Max recommended payment (28% of gross income is standard guideline)
  const maxRecommendedPayment = monthlyIncome * 0.28;

  // Determine affordability status
  let affordabilityStatus: 'good' | 'caution' | 'warning';

  if (debtToIncomeRatio <= 36) {
    affordabilityStatus = 'good';
  } else if (debtToIncomeRatio <= 43) {
    affordabilityStatus = 'caution';
  } else {
    affordabilityStatus = 'warning';
  }

  return {
    affordabilityRatio: Number(affordabilityRatio.toFixed(2)),
    debtToIncomeRatio: Number(debtToIncomeRatio.toFixed(2)),
    maxRecommendedPayment: Number(maxRecommendedPayment.toFixed(2)),
    affordabilityStatus
  };
};

/**
 * Format currency (for display purposes)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Save a loan scenario for comparison
 */
export const saveLoanScenario = (
  params: LoanParams,
  name: string
): { id: string; name: string; params: LoanParams; monthlyPayment: number } => {
  const id = `scenario-${Date.now()}`;
  const monthlyPayment = calculateMonthlyPayment(params);

  return {
    id,
    name,
    params,
    monthlyPayment
  };
};