import axios from "axios";
import { Transaction, TransactionResponse } from "./constants";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({ baseURL: `${API_URL}` });

// Intercept requests to add Authorization header
axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const addTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const { data } = await axiosInstance.post<{ transaction: TransactionResponse }>('/transactions/add', transaction);
    return {
        ...data.transaction,
        date: data.transaction.date * 1000,
        id: data.transaction._id
    }
}

export const updateTransaction = async (transactionId: string, transaction: Transaction): Promise<Transaction> => {
    const { data } = await axiosInstance.put<{ transaction: TransactionResponse }>(`/transactions/update/${transactionId}`, transaction);
    return {
        ...data.transaction,
        date: data.transaction.date * 1000,
        id: data.transaction._id
    }
}

export const deleteTransaction = async (transactionId: string) => {
    const { data } = await axiosInstance.delete(transactionId);
    return data;
}

export const getAllTransactions = async () => {
    const { data } = await axiosInstance.get<{ transactions: TransactionResponse[] }>('/transactions/list');
    const transactions: Transaction[] = data.transactions.map((txn: TransactionResponse) => ({
        ...txn,
        date: txn.date * 1000,
        id: txn._id
    }))
    return transactions;
}

export const clearAllTransactions = async () => {
    const { data } = await axiosInstance.delete('/transactions/clear');
    return data;
}