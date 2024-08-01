import { v4 as uuidv4 } from 'uuid';

export const generateId = () => uuidv4();

export const formatDateString = (dateString?: string): string => {
    if (!dateString) {
        return '--';
    }
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    return date.toLocaleDateString('en-US', options).replace(',', '');
};


export const ExpenseCategories = [
    'Groceries',
    'Rent/Mortgage',
    'Utilities',
    'Transportation',
    'Dining Out',
    'Entertainment',
    'Healthcare',
    'Insurance',
    'Education',
    'Travel',
    'Personal Care',
    'Household Supplies',
    'Clothing',
    'Gifts/Donations',
    'Miscellaneous'
];

export const IncomeCategories = [
    'Salary',
    'Freelance',
    'Business',
    'Investment',
    'Rental Income',
    'Gifts',
    'Side Hustle',
    'Tax Refund',
    'Pension',
    'Royalties',
    'Alimony',
    'Gambling',
    'Other'
];
