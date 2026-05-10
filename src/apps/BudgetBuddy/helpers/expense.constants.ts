export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    amount: number;
    category: string;
    type: TransactionType;
    date: string | Date | number;
    description?: string;
    title?: string;
    userId?: string;
}

export interface TransactionsResponse {
    count: number;
    transactions: Transaction[];
}

export const INCOME_CATEGORIES = [
    'Salary', 'Freelance', 'Business', 'Investments',
    'Rental', 'Pension', 'Grants', 'Other Income',
] as const;

export const EXPENSE_CATEGORIES = [
    'Food', 'Transport', 'Shopping', 'Entertainment',
    'Bills', 'Healthcare', 'Education', 'Rent',
    'Utilities', 'Insurance', 'Debt', 'Travel',
    'Others', 'Other Expense',
] as const;

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const CATEGORY_COLORS: Record<string, string> = {
    'Salary': '#10b981',
    'Freelance': '#06b6d4',
    'Business': '#3b82f6',
    'Investments': '#8b5cf6',
    'Rental': '#14b8a6',
    'Pension': '#22c55e',
    'Grants': '#84cc16',
    'Other Income': '#6ee7b7',

    'Food': '#ef4444',
    'Transport': '#f97316',
    'Shopping': '#f59e0b',
    'Entertainment': '#eab308',
    'Bills': '#84cc16',
    'Healthcare': '#ec4899',
    'Education': '#06b6d4',
    'Rent': '#dc2626',
    'Utilities': '#3b82f6',
    'Insurance': '#8b5cf6',
    'Debt': '#991b1b',
    'Travel': '#14b8a6',
    'Others': '#94a3b8',
    'Other Expense': '#f87171',
};

export const TYPE_COLORS = {
    income: '#10b981',
    expense: '#ef4444',
} as const;

export const QUERY_KEYS = {
    transactions: ['transactions'] as const,
    transactionById: (id: string) => ['transactions', id] as const,
} as const;

export const API_ENDPOINTS = {
    transactions: '/transactions/list',
    addTransaction: '/transactions/add',
    updateTransaction: (id: string) => `/transactions/update/${id}`,
    deleteTransaction: (id: string) => `/transactions/${id}`,
    clearAllTransactions: '/transactions/clear',
    importTransactions: '/transactions/import',
} as const;

export const DATE_FILTERS = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Last 3 Months', value: '3months' },
    { label: 'This Year', value: 'year' },
    { label: 'All Time', value: 'all' },
] as const;

export const SORT_OPTIONS = [
    { label: 'Date (Newest)', value: 'date-desc' },
    { label: 'Date (Oldest)', value: 'date-asc' },
    { label: 'Amount (High to Low)', value: 'amount-desc' },
    { label: 'Amount (Low to High)', value: 'amount-asc' },
] as const;