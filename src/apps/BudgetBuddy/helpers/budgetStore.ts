// @/apps/BudgetBuddy/store/budgetStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Transaction } from '@/apps/BudgetBuddy/helpers/expense.constants';

interface ModalState {
    isOpen: boolean;
    mode: 'add' | 'edit';
    transaction?: Transaction;
}

interface BudgetState {
    modalState: ModalState;
}

interface BudgetActions {
    // Modal actions
    openAddModal: () => void;
    openEditModal: (transaction: Transaction) => void;
    closeModal: () => void;
}

type BudgetStore = BudgetState & BudgetActions;

// Initial state
const initialState: BudgetState = {
    modalState: {
        isOpen: false,
        mode: 'add'
    }
};

export const useBudgetStore = create<BudgetStore>()(
    devtools(
        (set) => ({
            ...initialState,

            // Modal actions
            openAddModal: () => set(
                { modalState: { isOpen: true, mode: 'add' } },
                false,
                'openAddModal'
            ),

            openEditModal: (transaction: Transaction) => set(
                { modalState: { isOpen: true, mode: 'edit', transaction } },
                false,
                'openEditModal'
            ),

            closeModal: () => set(
                (state) => ({ modalState: { ...state.modalState, isOpen: false } }),
                false,
                'closeModal'
            ),
        }),
        { name: 'budget-store' }
    )
);

export const useBudgetCalculations = (transactions: Transaction[]) => {
    // Use Zustand's built-in selector optimization
    const totalIncome = useBudgetStore(() =>
        transactions
            .filter(txn => txn.type === 'income')
            .reduce((sum, txn) => sum + txn.amount, 0)
    );

    const totalExpenses = useBudgetStore(() =>
        transactions
            .filter(txn => txn.type === 'expense')
            .reduce((sum, txn) => sum + txn.amount, 0)
    );

    const remainingBalance = totalIncome - totalExpenses;

    return {
        totalIncome,
        totalExpenses,
        remainingBalance,
    };
};

// Modal controls hook
export const useModalControls = () => {
    const modalState = useBudgetStore((state) => state.modalState);
    const openAddModal = useBudgetStore((state) => state.openAddModal);
    const openEditModal = useBudgetStore((state) => state.openEditModal);
    const closeModal = useBudgetStore((state) => state.closeModal);

    return {
        modalState,
        openAddModal,
        openEditModal,
        closeModal,
    };
};