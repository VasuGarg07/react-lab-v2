import { Plus, SlidersHorizontal, X, Trash2 } from 'lucide-react';
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

    const {
        filteredTransactions,
        typeFilter, setTypeFilter,
        categoryFilter, setCategoryFilter,
        dateFilter, setDateFilter,
        sortOption, setSortOption,
        resetFilters,
    } = useTransactionFilters(transactions);

    const hasActiveFilters = typeFilter !== 'all' || categoryFilter !== 'all' || dateFilter !== 'all' || sortOption !== 'date-desc';

    const handleClearAll = () => {
        if (isClearing) return;
        openAlertDialog(modal, {
            title: 'Clear All Transactions?',
            message: (
                <div className="space-y-1">
                    <p>This will permanently delete all {transactions.length} transactions.</p>
                    <p className="font-medium text-red-600 dark:text-red-400">This action cannot be undone.</p>
                </div>
            ),
            confirmText: 'Clear All',
            onConfirm: () => clearAll(),
        });
    };

    const activeChips = [
        typeFilter !== 'all' && { label: `Type: ${typeFilter}`, onRemove: () => setTypeFilter('all') },
        categoryFilter !== 'all' && { label: `Category: ${categoryFilter}`, onRemove: () => setCategoryFilter('all') },
        dateFilter !== 'all' && { label: `Date: ${DATE_FILTERS.find(f => f.value === dateFilter)?.label}`, onRemove: () => setDateFilter('all') },
        sortOption !== 'date-desc' && { label: `Sort: ${SORT_OPTIONS.find(s => s.value === sortOption)?.label}`, onRemove: () => setSortOption('date-desc') },
    ].filter(Boolean) as { label: string; onRemove: () => void }[];

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                        Transactions
                    </h1>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 uppercase tracking-widest">
                        {filteredTransactions.length} of {transactions.length}
                    </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {transactions.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            disabled={isClearing}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 transition-colors disabled:opacity-50"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Clear All</span>
                        </button>
                    )}
                    <button
                        onClick={() => openTransactionForm(modal, 'add')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add Transaction</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-neutral-800 rounded-sm border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-700">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                            Filters
                        </span>
                    </div>
                    {hasActiveFilters && (
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                        >
                            <X className="w-3.5 h-3.5" /> Reset
                        </button>
                    )}
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
                        <Select
                            label="Category"
                            options={[
                                { label: 'All Categories', value: 'all' },
                                ...ALL_CATEGORIES.map(cat => ({ label: cat, value: cat })),
                            ]}
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                        />
                        <Select
                            label="Date Range"
                            options={DATE_FILTERS.map(f => ({ label: f.label, value: f.value }))}
                            value={dateFilter}
                            onChange={(value) => setDateFilter(value as any)}
                        />
                        <Select
                            label="Sort By"
                            options={SORT_OPTIONS.map(o => ({ label: o.label, value: o.value }))}
                            value={sortOption}
                            onChange={(value) => setSortOption(value as any)}
                        />
                    </div>

                    {activeChips.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                            {activeChips.map(({ label, onRemove }) => (
                                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                                    {label}
                                    <button onClick={onRemove} className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-neutral-800 rounded-sm border border-neutral-200 dark:border-neutral-700">
                <TransactionList
                    transactions={filteredTransactions}
                    isLoading={isLoading}
                    emptyMessage={hasActiveFilters ? 'No transactions match your filters.' : 'No transactions yet.'}
                />
            </div>
        </div>
    );
}