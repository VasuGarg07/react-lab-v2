import { useState, useMemo } from 'react';
import type { Transaction } from '../helpers/expense.constants';
import { filterByType, filterByCategory, filterByDateRange, sortByDate, sortByAmount, getCurrentMonthRange } from '../helpers/expense.utils';

type DateFilterOption = 'today' | 'week' | 'month' | '3months' | 'year' | 'all';
type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

const getDateRange = (option: DateFilterOption): { start: Date; end: Date } => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (option) {
        case 'today': return { start: today, end: now };
        case 'week': {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 7);
            return { start: weekStart, end: now };
        }
        case 'month': return getCurrentMonthRange();
        case '3months': {
            const threeMonthsAgo = new Date(today);
            threeMonthsAgo.setMonth(today.getMonth() - 3);
            return { start: threeMonthsAgo, end: now };
        }
        case 'year': return { start: new Date(now.getFullYear(), 0, 1), end: now };
        default: return { start: new Date(0), end: new Date(2100, 0, 1) };
    }
};

export const useTransactionFilters = (transactions: Transaction[] = []) => {
    const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [dateFilter, setDateFilter] = useState<DateFilterOption>('all');
    const [sortOption, setSortOption] = useState<SortOption>('date-desc');

    const filteredTransactions = useMemo(() => {
        let result = [...transactions];

        if (typeFilter !== 'all') result = filterByType(result, typeFilter);
        if (categoryFilter !== 'all') result = filterByCategory(result, categoryFilter);
        if (dateFilter !== 'all') {
            const { start, end } = getDateRange(dateFilter);
            result = filterByDateRange(result, start, end);
        }

        switch (sortOption) {
            case 'date-desc': return sortByDate(result, 'desc');
            case 'date-asc': return sortByDate(result, 'asc');
            case 'amount-desc': return sortByAmount(result, 'desc');
            case 'amount-asc': return sortByAmount(result, 'asc');
        }
    }, [transactions, typeFilter, categoryFilter, dateFilter, sortOption]);

    const resetFilters = () => {
        setTypeFilter('all');
        setCategoryFilter('all');
        setDateFilter('all');
        setSortOption('date-desc');
    };

    return {
        filteredTransactions,
        typeFilter, setTypeFilter,
        categoryFilter, setCategoryFilter,
        dateFilter, setDateFilter,
        sortOption, setSortOption,
        resetFilters,
    };
};