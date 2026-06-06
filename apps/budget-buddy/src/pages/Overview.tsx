import { Plus, X, Trash2 } from 'lucide-react';
import TransactionList from '../components/TransactionList';
import { openTransactionForm } from '../components/TransactionForm';
import { useTransactions } from '../hooks/useTransactionQuery';
import { useTransactionFilters } from '../hooks/useTransactionFilters';
import { useClearAllTransactions } from '../hooks/useTransactionMutations';
import { ALL_CATEGORIES, DATE_FILTERS, SORT_OPTIONS } from '../helpers/expense.constants';
import { useModal, openAlertDialog, Select } from '@react-lab/ui';

// Match the BudgetBuddy palette on the shared Select (default neutral label + blue focus).
const SELECT_CLS = 'rounded-xl! border-pitch-200! focus:border-paprika! focus:ring-paprika/20!';
const LABEL_CLS = 'text-xs! font-bold! text-pitch-500! uppercase tracking-widest';

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
                    <p className="font-semibold text-scarlet">This action cannot be undone.</p>
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
        <div className="space-y-6 fade-up">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-pitch-400">
                        {filteredTransactions.length} of {transactions.length}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-pitch leading-none mt-2">
                        Transactions
                    </h1>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {transactions.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            disabled={isClearing}
                            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-pitch-400 border border-pitch-200 bg-white hover:text-scarlet hover:border-scarlet/50 transition-colors disabled:opacity-50"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Clear</span>
                        </button>
                    )}
                    <button
                        onClick={() => openTransactionForm(modal, 'add')}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-pitch text-lavender hover:bg-pitch-700 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add Transaction</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-pitch-100 p-5">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-pitch-400 uppercase tracking-widest">Filters</span>
                    {hasActiveFilters && (
                        <button onClick={resetFilters} className="flex items-center gap-1 text-xs font-bold text-pitch-400 hover:text-scarlet transition-colors">
                            <X className="w-3.5 h-3.5" /> Reset
                        </button>
                    )}
                </div>

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
                        className={SELECT_CLS}
                        labelClassName={LABEL_CLS}
                    />
                    <Select
                        label="Category"
                        options={[
                            { label: 'All Categories', value: 'all' },
                            ...ALL_CATEGORIES.map(cat => ({ label: cat, value: cat })),
                        ]}
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        className={SELECT_CLS}
                        labelClassName={LABEL_CLS}
                    />
                    <Select
                        label="Date Range"
                        options={DATE_FILTERS.map(f => ({ label: f.label, value: f.value }))}
                        value={dateFilter}
                        onChange={(value) => setDateFilter(value as any)}
                        className={SELECT_CLS}
                        labelClassName={LABEL_CLS}
                    />
                    <Select
                        label="Sort By"
                        options={SORT_OPTIONS.map(o => ({ label: o.label, value: o.value }))}
                        value={sortOption}
                        onChange={(value) => setSortOption(value as any)}
                        className={SELECT_CLS}
                        labelClassName={LABEL_CLS}
                    />
                </div>

                {activeChips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-pitch-100">
                        {activeChips.map(({ label, onRemove }) => (
                            <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pitch-50 text-pitch-600 border border-pitch-100">
                                {label}
                                <button onClick={onRemove} className="hover:text-scarlet transition-colors">
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl border border-pitch-100 overflow-hidden">
                <TransactionList
                    transactions={filteredTransactions}
                    isLoading={isLoading}
                    emptyMessage={hasActiveFilters ? 'No transactions match your filters.' : 'No transactions yet.'}
                />
            </div>
        </div>
    );
}
