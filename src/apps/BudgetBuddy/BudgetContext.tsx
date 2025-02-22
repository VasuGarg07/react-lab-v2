import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Modal, ModalDialog } from '@mui/joy';
import {
    addTransaction as addTransactionAPI,
    deleteTransaction as deleteTransactionAPI,
    getAllTransactions as getAllTransactionsAPI,
    updateTransaction as updateTransactionAPI,
    clearAllTransactions as clearAllTransactionsAPI,
} from '@/apps/BudgetBuddy/helpers/expense.service';
import { Transaction } from '@/apps/BudgetBuddy/helpers/expense.constants';
import { budgetReducer, BudgetState, initialState } from '@/apps/BudgetBuddy/helpers/expense.reducer';
import TransactionForm from '@/apps/BudgetBuddy/components/TransactionForm';

interface ModalState {
    isOpen: boolean;
    mode: 'add' | 'edit';
    transaction?: Transaction;
}

interface BudgetContextType extends BudgetState {
    fetchTransactions: () => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    clearAllTransactions: () => Promise<void>;
    handleAddTransaction: () => void;
    handleEditTransaction: (transaction: Transaction) => void;

    // derived states
    totalIncome: number;
    totalExpenses: number;
    remainingBalance: number;
}

const BudgetContext = createContext<BudgetContextType | null>(null);

const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        mode: 'add'
    });

    const fetchTransactions = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const data = await getAllTransactionsAPI();
            dispatch({ type: 'FETCH_TRANSACTIONS', payload: data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch transactions' });
        }
    }, []);

    const addTransaction = useCallback(async (transaction: Transaction) => {
        try {
            const newTransaction = await addTransactionAPI(transaction);
            dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
            return true;
        } catch (error) {
            console.error('Failed to add transaction:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to add transaction' });
            return false;
        }
    }, []);

    const updateTransaction = useCallback(async (id: string, transaction: Transaction) => {
        try {
            const updatedTransaction = await updateTransactionAPI(id, transaction);
            dispatch({ type: 'UPDATE_TRANSACTION', payload: updatedTransaction });
            return true;
        } catch (error) {
            console.error('Failed to update transaction:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to update transaction' });
            return false;
        }
    }, []);

    const deleteTransaction = useCallback(async (id: string) => {
        try {
            await deleteTransactionAPI(id);
            dispatch({ type: 'DELETE_TRANSACTION', payload: id });
        } catch (error) {
            console.error('Failed to delete transaction:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to delete transaction' });
        }
    }, []);

    const clearAllTransactions = useCallback(async () => {
        try {
            await clearAllTransactionsAPI();
            dispatch({ type: 'CLEAR_ALL_TRANSACTIONS' });
        } catch (error) {
            console.error('Failed to clear transactions:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to clear transactions' });
        }
    }, []);

    // Modal handlers
    const handleAddTransaction = useCallback(() => {
        setModalState({
            isOpen: true,
            mode: 'add'
        });
    }, []);

    const handleEditTransaction = useCallback((transaction: Transaction) => {
        setModalState({
            isOpen: true,
            mode: 'edit',
            transaction
        });
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalState(prev => ({
            ...prev,
            isOpen: false
        }));
    }, []);

    // Derived states
    const totalIncome = useMemo(() => {
        return state.transactions
            .filter(txn => txn.type === 'income')
            .reduce((sum, txn) => sum + txn.amount, 0);
    }, [state.transactions]);

    const totalExpenses = useMemo(() => {
        return state.transactions
            .filter(txn => txn.type === 'expense')
            .reduce((sum, txn) => sum + txn.amount, 0);
    }, [state.transactions]);

    const remainingBalance = useMemo(() => totalIncome - totalExpenses, [totalExpenses, totalIncome]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return (
        <BudgetContext.Provider
            value={{
                ...state,
                deleteTransaction,
                fetchTransactions,
                clearAllTransactions,
                handleAddTransaction,
                handleEditTransaction,
                totalIncome,
                totalExpenses,
                remainingBalance,
            }}>
            {children}
            <Modal
                open={modalState.isOpen}
                onClose={handleCloseModal}
            >
                <ModalDialog
                    layout="center"
                    sx={{
                        minWidth: 400,
                        maxWidth: 500,
                    }}
                >
                    <TransactionForm
                        mode={modalState.mode}
                        transaction={modalState.transaction}
                        onClose={handleCloseModal}
                        onAdd={addTransaction}
                        onEdit={updateTransaction}
                    />
                </ModalDialog>
            </Modal>
        </BudgetContext.Provider>
    );
};

export default BudgetProvider;

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error("useBudget must be used with BudgetProvider");
    }
    return context;
};