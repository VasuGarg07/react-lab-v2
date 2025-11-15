import type { Transaction } from './expense.constants';

/**
 * Format currency in Indian Rupees
 */
export const formatCurrency = (
    amount: number,
    showDecimals: boolean = false
): string => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
    }).format(amount);

    return formatted;
};

/**
 * Format large numbers with K, L, Cr suffixes
 */
export const formatCompactCurrency = (amount: number): string => {
    if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)}Cr`;
    }
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)}L`;
    }
    if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount}`;
};

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export const formatDateForInput = (date: Date | string | number): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Get current month and year as display string
 * @returns Current month and year (e.g., "November 2025")
 */
export const getCurrentMonthYear = (): string => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

/**
 * Get start and end dates of current month
 * @returns Object with start and end dates
 */
export const getCurrentMonthRange = (): { start: Date; end: Date } => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start, end };
};

/**
 * Calculate total income from transactions
 */
export const calculateTotalIncome = (transactions: Transaction[]): number => {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate total expense from transactions
 */
export const calculateTotalExpense = (transactions: Transaction[]): number => {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate balance (income - expense)
 */
export const calculateBalance = (transactions: Transaction[]): number => {
    const income = calculateTotalIncome(transactions);
    const expense = calculateTotalExpense(transactions);
    return income - expense;
};

/**
 * Calculate savings rate percentage
 */
export const calculateSavingsRate = (transactions: Transaction[]): number => {
    const income = calculateTotalIncome(transactions);
    const expense = calculateTotalExpense(transactions);

    if (income === 0) return 0;

    const savings = income - expense;
    return (savings / income) * 100;
};

/**
 * Group transactions by category
 */
export const groupByCategory = (
    transactions: Transaction[]
): Record<string, number> => {
    return transactions.reduce((acc, transaction) => {
        const category = transaction.category;
        acc[category] = (acc[category] || 0) + transaction.amount;
        return acc;
    }, {} as Record<string, number>);
};

/**
 * Get top spending categories
 */
export const getTopSpendingCategories = (
    transactions: Transaction[],
    limit: number = 5
): [string, number][] => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = groupByCategory(expenses);

    return Object.entries(grouped)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);
};

/**
 * Filter transactions by date range
 */
export const filterByDateRange = (
    transactions: Transaction[],
    startDate: Date,
    endDate: Date
): Transaction[] => {
    return transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startDate && transactionDate <= endDate;
    });
};

/**
 * Filter transactions by type
 */
export const filterByType = (
    transactions: Transaction[],
    type: 'income' | 'expense'
): Transaction[] => {
    return transactions.filter(t => t.type === type);
};

/**
 * Filter transactions by category
 */
export const filterByCategory = (
    transactions: Transaction[],
    category: string
): Transaction[] => {
    return transactions.filter(t => t.category === category);
};

/**
 * Sort transactions by date
 */
export const sortByDate = (
    transactions: Transaction[],
    order: 'asc' | 'desc' = 'desc'
): Transaction[] => {
    return [...transactions].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
};

/**
 * Sort transactions by amount
 */
export const sortByAmount = (
    transactions: Transaction[],
    order: 'asc' | 'desc' = 'desc'
): Transaction[] => {
    return [...transactions].sort((a, b) => {
        return order === 'desc' ? b.amount - a.amount : a.amount - b.amount;
    });
};

/**
 * Get transaction statistics
 */
export const getTransactionStats = (transactions: Transaction[]) => {
    const income = calculateTotalIncome(transactions);
    const expense = calculateTotalExpense(transactions);
    const balance = income - expense;
    const savingsRate = calculateSavingsRate(transactions);
    const transactionCount = transactions.length;
    const incomeCount = transactions.filter(t => t.type === 'income').length;
    const expenseCount = transactions.filter(t => t.type === 'expense').length;

    return {
        income,
        expense,
        balance,
        savingsRate,
        transactionCount,
        incomeCount,
        expenseCount,
    };
};

/**
 * Validate transaction data
 */
export const validateTransaction = (
    transaction: Partial<Transaction>
): string | null => {
    if (!transaction.amount || transaction.amount <= 0) {
        return 'Amount must be greater than 0';
    }

    if (!transaction.category || transaction.category.trim() === '') {
        return 'Category is required';
    }

    if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
        return 'Type must be income or expense';
    }

    if (!transaction.date) {
        return 'Date is required';
    }

    return null;
};