export interface Transaction {
    title: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: number; // unix timestamp
    description?: string;
    id?: string;
}

export interface TransactionResponse extends Omit<Transaction, "id"> {
    _id: string // MongoDB ID
}

export const INCOME_TYPES = [
    { name: 'Salary', color: '#FF6B6B' },      // Coral Red
    { name: 'Business', color: '#4ECDC4' },    // Turquoise
    { name: 'Freelance', color: '#45B7D1' },   // Sky Blue
    { name: 'Rental', color: '#96CEB4' },      // Sage Green
    { name: 'Investments', color: '#9B59B6' }, // Purple
    { name: 'Dividends', color: '#F1C40F' },   // Yellow
    { name: 'Bonuses', color: '#E67E22' },     // Orange
    { name: 'Pension', color: '#26A69A' },     // Teal
    { name: 'Grants', color: '#5C6BC0' },      // Indigo
    { name: 'Others', color: '#78909C' }       // Blue Grey
];

export const EXPENSE_TYPES = [
    { name: 'Rent', color: '#FF7043' },        // Deep Orange
    { name: 'Utilities', color: '#66BB6A' },   // Green
    { name: 'Groceries', color: '#7E57C2' },   // Deep Purple
    { name: 'Dining', color: '#EC407A' },      // Pink
    { name: 'Transport', color: '#29B6F6' },   // Light Blue
    { name: 'Insurance', color: '#FFA726' },   // Amber
    { name: 'Healthcare', color: '#26C6DA' },  // Cyan
    { name: 'Education', color: '#AB47BC' },   // Medium Purple
    { name: 'Entertainment', color: '#42A5F5' }, // Blue
    { name: 'Shopping', color: '#FF4081' },    // Pink Accent
    { name: 'Subscriptions', color: '#F06292' }, // Light Pink
    { name: 'Savings', color: '#9CCC65' },     // Light Green
    { name: 'Debt', color: '#FF5252' },        // Red Accent
    { name: 'Gifts', color: '#FFB74D' },       // Orange Light
    { name: 'Travel', color: '#4DB6AC' },      // Teal Light
    { name: 'Others', color: '#90A4AE' }       // Blue Grey Light
];

export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};
