import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from "@/shared/apiClient";
import { Transaction } from "@/apps/BudgetBuddy/helpers/expense.constants";
import { toastService } from "@/shared/toastr";

// Query keys
const transactionKeys = {
    all: ['transactions'] as const,
    list: () => [...transactionKeys.all, 'list'] as const,
};

// Get all transactions
export const useTransactions = () => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: transactionKeys.list(),
        queryFn: async (): Promise<Transaction[]> => {
            const { data } = await apiClient.get('/transactions/list');
            return data.transactions;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        data: data || [],
        isLoading,
        error,
        isError,
    };
};

// Add transaction
export const useAddTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
            const { data } = await apiClient.post('/transactions/add', transaction);
            return data.transaction;
        },
        onSuccess: (newTransaction) => {
            queryClient.setQueryData(transactionKeys.list(), (old: Transaction[] = []) =>
                [newTransaction, ...old]
            );
            toastService.success('Transaction added successfully!');
        },
        onError: (error) => {
            console.error('Failed to add transaction:', error);
            toastService.error('Failed to add transaction. Please try again.');
        },
    });
};

// Update transaction
export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, transaction }: { id: string; transaction: Omit<Transaction, 'id'> }) => {
            const { data } = await apiClient.put(`/transactions/update/${id}`, transaction);
            return data.transaction;
        },
        onSuccess: (updatedTransaction) => {
            queryClient.setQueryData(transactionKeys.list(), (old: Transaction[] = []) =>
                old.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
            );
            toastService.success('Transaction updated successfully!');
        },
        onError: (error) => {
            console.error('Failed to update transaction:', error);
            toastService.error('Failed to update transaction. Please try again.');
        },
    });
};

// Delete transaction
export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/transactions/${id}`);
        },
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(transactionKeys.list(), (old: Transaction[] = []) =>
                old.filter(t => t.id !== deletedId)
            );
            toastService.success('Transaction deleted successfully!');
        },
        onError: (error) => {
            console.error('Failed to delete transaction:', error);
            toastService.error('Failed to delete transaction. Please try again.');
        },
    });
};

// Clear all transactions
export const useClearAllTransactions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await apiClient.delete('/transactions/clear');
        },
        onSuccess: () => {
            queryClient.setQueryData(transactionKeys.list(), []);
            toastService.success('All transactions cleared successfully!');
        },
        onError: (error) => {
            console.error('Failed to clear transactions:', error);
            toastService.error('Failed to clear transactions. Please try again.');
        },
    });
};