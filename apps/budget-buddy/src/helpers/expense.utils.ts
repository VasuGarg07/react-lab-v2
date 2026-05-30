import type { Transaction } from './expense.constants';

export const formatCompactCurrency = (amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
};

export const formatDateForInput = (date: Date | string | number): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getCurrentMonthYear = (): string =>
    new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

export const getCurrentMonthRange = (): { start: Date; end: Date } => {
    const now = new Date();
    return {
        start: new Date(now.getFullYear(), now.getMonth(), 1),
        end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
    };
};

export const calculateTotalIncome = (transactions: Transaction[]): number =>
    transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

export const calculateTotalExpense = (transactions: Transaction[]): number =>
    transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

export const calculateBalance = (transactions: Transaction[]): number =>
    calculateTotalIncome(transactions) - calculateTotalExpense(transactions);

export const calculateSavingsRate = (transactions: Transaction[]): number => {
    const income = calculateTotalIncome(transactions);
    if (income === 0) return 0;
    return ((income - calculateTotalExpense(transactions)) / income) * 100;
};

export const groupByCategory = (transactions: Transaction[]): Record<string, number> =>
    transactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as Record<string, number>);

export const getTopSpendingCategories = (transactions: Transaction[], limit = 5): [string, number][] =>
    Object.entries(groupByCategory(transactions.filter(t => t.type === 'expense')))
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);

export const filterByDateRange = (transactions: Transaction[], startDate: Date, endDate: Date): Transaction[] =>
    transactions.filter(t => {
        const d = new Date(t.date);
        return d >= startDate && d <= endDate;
    });

export const filterByType = (transactions: Transaction[], type: 'income' | 'expense'): Transaction[] =>
    transactions.filter(t => t.type === type);

export const filterByCategory = (transactions: Transaction[], category: string): Transaction[] =>
    transactions.filter(t => t.category === category);

export const sortByDate = (transactions: Transaction[], order: 'asc' | 'desc' = 'desc'): Transaction[] =>
    [...transactions].sort((a, b) => {
        const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
        return order === 'desc' ? -diff : diff;
    });

export const sortByAmount = (transactions: Transaction[], order: 'asc' | 'desc' = 'desc'): Transaction[] =>
    [...transactions].sort((a, b) => order === 'desc' ? b.amount - a.amount : a.amount - b.amount);
