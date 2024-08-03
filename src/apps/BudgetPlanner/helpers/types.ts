// types.ts

import { CountryCurrency } from "./currency";

export interface UserSettings {
    currency: CountryCurrency;
    customCategories: string[];
}

export interface Expense {
    id: string;
    budgetId: string;
    name: string;
    category: string;
    amount: number;
    date: string;
}

export interface Budget {
    id: string;
    title: string;
    description?: string;
    amount: number;
    startDate: string;
    endDate: string;
    expenses: Expense[];
}
