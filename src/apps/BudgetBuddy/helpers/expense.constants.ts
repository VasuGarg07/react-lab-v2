export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;  // Changed from _id to id
    amount: number;
    category: string;
    type: TransactionType;
    date: string | Date | number;  // Added number for timestamp
    description?: string;
    title?: string;  // Added title field
    userId?: string;  // Added userId field
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface TransactionsResponse {
    count: number;
    transactions: Transaction[];
}

export const INCOME_CATEGORIES = [
    'Salary',
    'Freelance',
    'Business',
    'Investments',
    'Rental',
    'Pension',
    'Grants',
    'Other Income',
];

export const EXPENSE_CATEGORIES = [
    'Food',
    'Transport',
    'Shopping',
    'Entertainment',
    'Bills',
    'Healthcare',
    'Education',
    'Rent',
    'Utilities',
    'Insurance',
    'Debt',
    'Travel',
    'Others',
    'Other Expense',
];

export const ALL_CATEGORIES = [
    ...INCOME_CATEGORIES,
    ...EXPENSE_CATEGORIES,
];

export const CATEGORY_COLORS: Record<string, string> = {
    // Income categories - Green shades
    'Salary': '#10b981',
    'Freelance': '#34d399',
    'Business': '#6ee7b7',
    'Investments': '#a7f3d0',
    'Rental': '#5eead4',
    'Pension': '#2dd4bf',
    'Grants': '#14b8a6',
    'Gift': '#d1fae5',
    'Other Income': '#6ee7b7',

    // Expense categories - Red to Orange shades
    'Food': '#ef4444',
    'Transport': '#f97316',
    'Shopping': '#f59e0b',
    'Entertainment': '#eab308',
    'Bills': '#fb923c',
    'Healthcare': '#dc2626',
    'Education': '#fbbf24',
    'Rent': '#f87171',
    'Utilities': '#fb7185',
    'Insurance': '#e11d48',
    'Debt': '#be123c',
    'Travel': '#fdba74',
    'Others': '#fca5a5',
    'Other Expense': '#f87171',
};

export const TYPE_COLORS = {
    income: '#10b981',
    expense: '#ef4444',
} as const;

export const CHART_COLORS = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
];

export const QUERY_KEYS = {
    transactions: ['transactions'] as const,
    transactionById: (id: string) => ['transactions', id] as const,
} as const;

export const API_ENDPOINTS = {
    transactions: '/transactions/list',              // GET - List all
    addTransaction: '/transactions/add',             // POST - Add new
    updateTransaction: (id: string) => `/transactions/update/${id}`,  // PUT - Update
    deleteTransaction: (id: string) => `/transactions/${id}`,         // DELETE - Delete one
    clearAllTransactions: '/transactions/clear',     // DELETE - Clear all
    importTransactions: '/transactions/import',      // POST - Import (for future use)
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