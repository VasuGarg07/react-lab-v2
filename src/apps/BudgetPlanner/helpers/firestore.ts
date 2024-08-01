// helpers/firestore.ts
import { db } from '../../../shared/firebase-config';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, query, where, doc, orderBy, limit, writeBatch } from 'firebase/firestore';
import { Transaction } from './types';

const transactionsCollection = (userId: string) => collection(db, 'users', userId, 'transactions');

export namespace TransactionService {
    // Add a new transaction (either income or expense)
    export const addTransaction = async (userId: string, transaction: Transaction) => {
        await addDoc(transactionsCollection(userId), transaction);
    };

    // Get all transactions
    export const getTransactions = async (userId: string): Promise<Transaction[]> => {
        const querySnapshot = await getDocs(transactionsCollection(userId));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
    };

    // Get transactions by type (either 'expense' or 'income')
    export const getTransactionsByType = async (userId: string, type: 'expense' | 'income'): Promise<Transaction[]> => {
        const q = query(transactionsCollection(userId), where('type', '==', type));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
    };

    // Get total amount by type (either 'expense' or 'income')
    export const getTotalAmountByType = async (userId: string, type: 'expense' | 'income'): Promise<number> => {
        const transactions = await getTransactionsByType(userId, type);
        return transactions.reduce((total, transaction) => total + transaction.amount, 0);
    };

    // Get last 10 transactions
    export const getLast10Transactions = async (userId: string): Promise<Transaction[]> => {
        const q = query(transactionsCollection(userId), orderBy('date', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
    };

    // Update an existing transaction
    export const updateTransaction = async (userId: string, transactionId: string, transaction: Partial<Transaction>) => {
        const transactionRef = doc(transactionsCollection(userId), transactionId);
        await updateDoc(transactionRef, transaction);
    };

    // Delete a transaction
    export const deleteTransaction = async (userId: string, transactionId: string) => {
        const transactionRef = doc(transactionsCollection(userId), transactionId);
        await deleteDoc(transactionRef);
    };

    // Delete all transactions for a user
    export const deleteAllTransactions = async (userId: string) => {
        const q = query(transactionsCollection(userId));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);
        querySnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    };

}
