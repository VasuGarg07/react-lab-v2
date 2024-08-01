export interface Transaction {
    id: string;
    name: string;
    type: 'expense' | 'income';
    category: string;
    amount: number;
    date: string;
    note?: string;
}
