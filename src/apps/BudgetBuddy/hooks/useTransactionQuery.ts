import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../shared/apiClient';
import { API_ENDPOINTS, QUERY_KEYS, type TransactionsResponse } from '../helpers/expense.constants';

export const useTransactions = () =>
    useQuery({
        queryKey: QUERY_KEYS.transactions,
        queryFn: async () => {
            const response = await apiClient.get<TransactionsResponse>(API_ENDPOINTS.transactions);
            return response.data.transactions;
        },
        staleTime: 1000 * 60 * 5,
    });