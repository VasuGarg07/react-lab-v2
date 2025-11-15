import { Plus, Filter, X, Trash2 } from 'lucide-react';
import TransactionList from '../components/TransactionList';
import { openTransactionForm } from '../components/TransactionForm';
import { useTransactions } from '../hooks/useTransactionQuery';
import { useTransactionFilters } from '../hooks/useTransactionFilters';
import { useClearAllTransactions } from '../hooks/useTransactionMutations';
import { ALL_CATEGORIES, DATE_FILTERS, SORT_OPTIONS } from '../helpers/expense.constants';
import { useModal } from '../../../components/ModalContext';
import { openAlertDialog } from '../../../ui/AlertDialog';
import Select from '../../../ui/Select';

export default function Overview() {
    const modal = useModal();
    const { data: transactions = [], isLoading } = useTransactions();
    const { mutate: clearAll, isPending: isClearing } = useClearAllTransactions();

    // Filters
    const {
        filteredTransactions,
        typeFilter,
        setTypeFilter,
        categoryFilter,
        setCategoryFilter,
        dateFilter,
        setDateFilter,
        sortOption,
        setSortOption,
        resetFilters,
    } = useTransactionFilters(transactions);

    // Check if any filters are active
    const hasActiveFilters =
        typeFilter !== 'all' ||
        categoryFilter !== 'all' ||
        dateFilter !== 'all' ||
        sortOption !== 'date-desc';

    // Handle clear all with confirmation
    const handleClearAll = () => {
        openAlertDialog(modal, {
            title: 'Clear All Transactions?',
            message: (
                <div className="space-y-1">
                    <p>This will permanently delete all {transactions.length} transactions.</p>
                    <p className="font-medium text-red-600 dark:text-red-400">
                        This action cannot be undone.
                    </p>
                </div>
            ),
            confirmText: 'Clear All',
            onConfirm: () => clearAll(),
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        All Transactions
                    </h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {filteredTransactions.length} of {transactions.length} transactions
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {/* Clear All Button */}
                    {transactions.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            disabled={isClearing}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Clear All</span>
                        </button>
                    )}

                    {/* Add Transaction Button */}
                    <button
                        onClick={() => openTransactionForm(modal, 'add')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 font-medium text-sm shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Transaction</span>
                    </button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                            Filters
                        </h2>
                    </div>

                    {/* Reset Filters Button */}
                    {hasActiveFilters && (
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200"
                        >
                            <X className="w-4 h-4" />
                            Reset
                        </button>
                    )}
                </div>

                {/* Filter Controls Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Type Filter */}
                    <Select
                        label="Type"
                        options={[
                            { label: 'All', value: 'all' },
                            { label: 'Income', value: 'income' },
                            { label: 'Expense', value: 'expense' },
                        ]}
                        value={typeFilter}
                        onChange={(value) => setTypeFilter(value as 'all' | 'income' | 'expense')}
                    />

                    {/* Category Filter */}
                    <Select
                        label="Category"
                        options={[
                            { label: 'All Categories', value: 'all' },
                            ...ALL_CATEGORIES.map((cat) => ({ label: cat, value: cat })),
                        ]}
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                    />

                    {/* Date Filter */}
                    <Select
                        label="Date Range"
                        options={DATE_FILTERS.map((filter) => ({
                            label: filter.label,
                            value: filter.value,
                        }))}
                        value={dateFilter}
                        onChange={(value) => setDateFilter(value as any)}
                    />

                    {/* Sort Filter */}
                    <Select
                        label="Sort By"
                        options={SORT_OPTIONS.map((option) => ({
                            label: option.label,
                            value: option.value,
                        }))}
                        value={sortOption}
                        onChange={(value) => setSortOption(value as any)}
                    />
                </div>

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                    <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex flex-wrap gap-2">
                            {typeFilter !== 'all' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                    Type: {typeFilter}
                                    <button
                                        onClick={() => setTypeFilter('all')}
                                        className="hover:text-blue-900 dark:hover:text-blue-300"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}

                            {categoryFilter !== 'all' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                    Category: {categoryFilter}
                                    <button
                                        onClick={() => setCategoryFilter('all')}
                                        className="hover:text-blue-900 dark:hover:text-blue-300"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}

                            {dateFilter !== 'all' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                    Date: {DATE_FILTERS.find((f) => f.value === dateFilter)?.label}
                                    <button
                                        onClick={() => setDateFilter('all')}
                                        className="hover:text-blue-900 dark:hover:text-blue-300"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}

                            {sortOption !== 'date-desc' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                    Sort: {SORT_OPTIONS.find((s) => s.value === sortOption)?.label}
                                    <button
                                        onClick={() => setSortOption('date-desc')}
                                        className="hover:text-blue-900 dark:hover:text-blue-300"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Transactions List */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <TransactionList
                    transactions={filteredTransactions}
                    isLoading={isLoading}
                    emptyMessage={
                        hasActiveFilters
                            ? 'No transactions found matching your filters.'
                            : 'No transactions yet. Add your first transaction!'
                    }
                />
            </div>
        </div>
    );
}