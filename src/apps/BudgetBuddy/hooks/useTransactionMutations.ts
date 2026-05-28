import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, API_ENDPOINTS, type Transaction } from '../helpers/expense.constants';
import { apiClient, toastService } from '@react-lab/shared';

type CreateTransactionData = Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
type UpdateTransactionData = Partial<CreateTransactionData>;

export const useAddTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateTransactionData) => {
            const response = await apiClient.post<{message: string, transaction: Transaction}>(API_ENDPOINTS.addTransaction, data);
            return response.data;
        },
        onSuccess: (newTransaction) => {
            queryClient.setQueryData<Transaction[]>(QUERY_KEYS.transactions, (old) =>
                old ? [newTransaction.transaction, ...old] : [newTransaction.transaction]
            );
            toastService.success('Transaction added successfully');
        },
        onError: (error: any) => {
            toastService.error(error.response?.data?.error || error.message || 'Failed to add transaction');
        },
    });
};

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateTransactionData }) => {
            const response = await apiClient.put<{message: string, transaction: Transaction}>(API_ENDPOINTS.updateTransaction(id), data);
            return response.data;
        },
        onSuccess: (result) => {
            const updatedTransaction = result.transaction
            queryClient.setQueryData<Transaction[]>(QUERY_KEYS.transactions, (old) =>
                old ? old.map(t => t.id === updatedTransaction.id ? updatedTransaction : t) : [updatedTransaction]
            );
            toastService.success('Transaction updated successfully');
        },
        onError: (error: any) => {
            toastService.error(error.response?.data?.error || error.message || 'Failed to update transaction');
        },
    });
};

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(API_ENDPOINTS.deleteTransaction(id));
            return id;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.transactions });
            const previousTransactions = queryClient.getQueryData<Transaction[]>(QUERY_KEYS.transactions);
            queryClient.setQueryData<Transaction[]>(QUERY_KEYS.transactions, (old) =>
                old ? old.filter(t => t.id !== id) : []
            );
            return { previousTransactions };
        },
        onSuccess: () => {
            toastService.success('Transaction deleted successfully');
        },
        onError: (error: any, _, context) => {
            if (context?.previousTransactions) {
                queryClient.setQueryData(QUERY_KEYS.transactions, context.previousTransactions);
            }
            toastService.error(error.response?.data?.error || error.message || 'Failed to delete transaction');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
        },
    });
};

export const useClearAllTransactions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await apiClient.delete(API_ENDPOINTS.clearAllTransactions);
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.transactions });
            const previousTransactions = queryClient.getQueryData<Transaction[]>(QUERY_KEYS.transactions);
            queryClient.setQueryData<Transaction[]>(QUERY_KEYS.transactions, []);
            return { previousTransactions };
        },
        onSuccess: () => {
            toastService.success('All transactions cleared successfully');
        },
        onError: (error: any, _, context) => {
            if (context?.previousTransactions) {
                queryClient.setQueryData(QUERY_KEYS.transactions, context.previousTransactions);
            }
            toastService.error(error.response?.data?.error || error.message || 'Failed to clear transactions');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
        },
    });
};