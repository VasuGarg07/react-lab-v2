import apiClient from "@/shared/apiClient";
import { Transaction } from "@/apps/BudgetBuddy/helpers/expense.constants";


export const addTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const { data } = await apiClient.post<{ transaction: Transaction }>('/transactions/add', transaction);
    return data.transaction;
}

export const updateTransaction = async (transactionId: string, transaction: Transaction): Promise<Transaction> => {
    const { data } = await apiClient.put<{ transaction: Transaction }>(`/transactions/update/${transactionId}`, transaction);
    return data.transaction;
}

export const deleteTransaction = async (transactionId: string) => {
    const { data } = await apiClient.delete(transactionId);
    return data;
}

export const getAllTransactions = async () => {
    const { data } = await apiClient.get<{ transactions: Transaction[] }>('/transactions/list');
    return data.transactions;
}

export const clearAllTransactions = async () => {
    const { data } = await apiClient.delete('/transactions/clear');
    return data;
}