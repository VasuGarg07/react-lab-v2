import { collection, doc, addDoc, getDoc, setDoc, updateDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../../shared/firebase-config';
import { Expense, Budget } from '../helpers/types';

const getUserDocRef = (userId: string) => doc(db, 'users', userId);

export const addExpense = async (userId: string, expense: Expense) => {
    const expensesCollection = collection(getUserDocRef(userId), 'expenses');
    await addDoc(expensesCollection, expense);
};

export const getExpenses = async (userId: string) => {
    const expensesCollection = collection(getUserDocRef(userId), 'expenses');
    const querySnapshot = await getDocs(expensesCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Expense));
};

export const updateExpense = async (userId: string, expenseId: string, updatedExpense: Partial<Expense>) => {
    const expenseDoc = doc(getUserDocRef(userId), 'expenses', expenseId);
    await updateDoc(expenseDoc, updatedExpense);
};

export const deleteExpense = async (userId: string, expenseId: string) => {
    const expenseDoc = doc(getUserDocRef(userId), 'expenses', expenseId);
    await deleteDoc(expenseDoc);
};

export const setBudget = async (userId: string, budget: Budget) => {
    const budgetDoc = doc(getUserDocRef(userId), 'budget');
    await setDoc(budgetDoc, budget);
};

export const getBudget = async (userId: string) => {
    const budgetDoc = doc(getUserDocRef(userId), 'budget');
    const budgetSnapshot = await getDoc(budgetDoc);
    return budgetSnapshot.exists() ? (budgetSnapshot.data() as Budget) : null;
};
