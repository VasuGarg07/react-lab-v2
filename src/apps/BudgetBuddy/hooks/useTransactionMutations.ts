import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, API_ENDPOINTS, type Transaction } from '../helpers/expense.constants';
import { validateTransaction } from '../helpers/expense.utils';
import apiClient from '../../../shared/apiClient';
import { toastService } from '../../../shared/toastr';

/**
 * Create transaction data type (without id)
 */
type CreateTransactionData = Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

/**
 * Update transaction data type (partial fields)
 */
type UpdateTransactionData = Partial<CreateTransactionData>;

/**
 * Hook for adding a new transaction
 * @returns Mutation object with mutate, isPending, etc.
 */
export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionData) => {
      // Validate transaction data
      const validationError = validateTransaction(data);
      if (validationError) {
        throw new Error(validationError);
      }

      const response = await apiClient.post<Transaction>(
        API_ENDPOINTS.addTransaction,
        data
      );
      return response.data;
    },
    onSuccess: (newTransaction) => {
      // Optimistically update cache
      queryClient.setQueryData<Transaction[]>(
        QUERY_KEYS.transactions,
        (old) => {
          if (!old) return [newTransaction];
          return [newTransaction, ...old];
        }
      );

      toastService.success('Transaction added successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || error.message || 'Failed to add transaction';
      toastService.error(message);
    },
  });
};

/**
 * Hook for updating an existing transaction
 * @returns Mutation object with mutate, isPending, etc.
 */
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTransactionData }) => {
      // Validate transaction data
      const validationError = validateTransaction(data);
      if (validationError) {
        throw new Error(validationError);
      }

      const response = await apiClient.put<Transaction>(
        API_ENDPOINTS.updateTransaction(id),
        data
      );
      return response.data;
    },
    onSuccess: (updatedTransaction) => {
      // Update the specific transaction in cache
      queryClient.setQueryData<Transaction[]>(
        QUERY_KEYS.transactions,
        (old) => {
          if (!old) return [updatedTransaction];
          return old.map((t) =>
            t.id === updatedTransaction.id ? updatedTransaction : t
          );
        }
      );

      toastService.success('Transaction updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || error.message || 'Failed to update transaction';
      toastService.error(message);
    },
  });
};

/**
 * Hook for deleting a transaction
 * @returns Mutation object with mutate, isPending, etc.
 */
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(API_ENDPOINTS.deleteTransaction(id));
      return id;
    },
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.transactions });

      // Snapshot the previous value
      const previousTransactions = queryClient.getQueryData<Transaction[]>(
        QUERY_KEYS.transactions
      );

      // Optimistically remove from cache
      queryClient.setQueryData<Transaction[]>(
        QUERY_KEYS.transactions,
        (old) => {
          if (!old) return [];
          return old.filter((t) => t.id !== id);
        }
      );

      // Return context with previous value
      return { previousTransactions };
    },
    onSuccess: () => {
      toastService.success('Transaction deleted successfully');
    },
    onError: (error: any, _, context) => {
      // Rollback on error
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          QUERY_KEYS.transactions,
          context.previousTransactions
        );
      }

      const message = error.response?.data?.error || error.message || 'Failed to delete transaction';
      toastService.error(message);
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
    },
  });
};

/**
 * Hook for clearing all transactions
 * @returns Mutation object with mutate, isPending, etc.
 */
export const useClearAllTransactions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete(API_ENDPOINTS.clearAllTransactions);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.transactions });
      const previousTransactions = queryClient.getQueryData<Transaction[]>(
        QUERY_KEYS.transactions
      );
      queryClient.setQueryData<Transaction[]>(QUERY_KEYS.transactions, []);

      return { previousTransactions };
    },
    onSuccess: () => {
      toastService.success('All transactions cleared successfully');
    },
    onError: (error: any, _, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          QUERY_KEYS.transactions,
          context.previousTransactions
        );
      }

      const message = error.response?.data?.error || error.message || 'Failed to clear transactions';
      toastService.error(message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
    },
  });
};