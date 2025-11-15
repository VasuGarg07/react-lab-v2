import { useState, useMemo } from 'react';
import type { Transaction } from '../helpers/expense.constants';
import {
    filterByType,
    filterByCategory,
    filterByDateRange,
    sortByDate,
    sortByAmount,
    getCurrentMonthRange,
} from '../helpers/expense.utils';

type DateFilterOption = 'today' | 'week' | 'month' | '3months' | 'year' | 'all';

type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

/**
 * Hook for filtering and sorting transactions
 * @param transactions - All transactions
 * @returns Filtered transactions and filter controls
 */
export const useTransactionFilters = (transactions: Transaction[] = []) => {
    const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [dateFilter, setDateFilter] = useState<DateFilterOption>('all');
    const [sortOption, setSortOption] = useState<SortOption>('date-desc');

    /**
     * Get date range based on filter option
     */
    const getDateRange = (option: DateFilterOption): { start: Date; end: Date } => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        switch (option) {
            case 'today':
                return { start: today, end: now };
            case 'week': {
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 7);
                return { start: weekStart, end: now };
            }
            case 'month':
                return getCurrentMonthRange();
            case '3months': {
                const threeMonthsAgo = new Date(today);
                threeMonthsAgo.setMonth(today.getMonth() - 3);
                return { start: threeMonthsAgo, end: now };
            }
            case 'year': {
                const yearStart = new Date(now.getFullYear(), 0, 1);
                return { start: yearStart, end: now };
            }
            case 'all':
            default:
                return {
                    start: new Date(0), // Beginning of time
                    end: new Date(2100, 0, 1), // Far future
                };
        }
    };

    const filteredTransactions = useMemo(() => {
        let result = [...transactions];

        // Filter by type
        if (typeFilter !== 'all') {
            result = filterByType(result, typeFilter);
        }

        // Filter by category
        if (categoryFilter !== 'all') {
            result = filterByCategory(result, categoryFilter);
        }

        // Filter by date range (only if not 'all')
        if (dateFilter !== 'all') {
            const { start, end } = getDateRange(dateFilter);
            result = filterByDateRange(result, start, end);
        }

        // Sort
        switch (sortOption) {
            case 'date-desc':
                result = sortByDate(result, 'desc');
                break;
            case 'date-asc':
                result = sortByDate(result, 'asc');
                break;
            case 'amount-desc':
                result = sortByAmount(result, 'desc');
                break;
            case 'amount-asc':
                result = sortByAmount(result, 'asc');
                break;
        }

        return result;
    }, [transactions, typeFilter, categoryFilter, dateFilter, sortOption]);

    const resetFilters = () => {
        setTypeFilter('all');
        setCategoryFilter('all');
        setDateFilter('all');
        setSortOption('date-desc');
    };

    return {
        // Filtered data
        filteredTransactions,

        // Filter states
        typeFilter,
        categoryFilter,
        dateFilter,
        sortOption,

        // Filter setters
        setTypeFilter,
        setCategoryFilter,
        setDateFilter,
        setSortOption,

        // Utility
        resetFilters,
    };
};
