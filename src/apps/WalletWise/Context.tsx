import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Action, ReducerActions, Transaction } from './helper';
import { useImmerReducer } from 'use-immer';

const WalletContext = createContext<any>(null);

function fetchFromLocal() {
  const txns = localStorage.getItem('transactions');
  return txns ? JSON.parse(txns) : []
}

const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, dispatch] = useImmerReducer<Transaction[], Action>(transactionsReducer, fetchFromLocal());
  const [open, setOpen] = useState(false);
  // const [editTxn, setEditTxn] = useState<Transaction | null>(null);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const addTransaction = (transaction: Transaction) =>
    dispatch({ type: ReducerActions.ADD, item: transaction });

  const changeTransaction = (transaction: Transaction) =>
    dispatch({ type: ReducerActions.CHANGE, item: transaction });

  const deleteTransaction = (transaction: Transaction) =>
    dispatch({ type: ReducerActions.DELETE, item: transaction });

  // const importTransactions = (transactions: Transaction[]) =>
  //   dispatch({ type: ReducerActions.ADD_MULTIPLE, items: transactions });

  useEffect(() => {
    localStorage.setItem('transactions',
      JSON.stringify(transactions && transactions.length ? transactions : []))
  }, [transactions]);

  const contextValue = {
    open, openDialog, closeDialog, transactions, addTransaction, changeTransaction, deleteTransaction,
    // importTransactions,editTxn, setEditTxn,
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider

export const useWalletContext = () => useContext(WalletContext);


// USE IMMER REDUCER
function transactionsReducer(tasks: Transaction[], action: Action) {
  switch (action.type) {

    case ReducerActions.ADD:
      tasks.push(action.item);
      break;

    case ReducerActions.CHANGE:
      const index = tasks.findIndex((t) => t.id === action.item.id);
      index !== -1 && (tasks[index] = action.item);
      break;

    case ReducerActions.DELETE:
      return tasks.filter(t => t.id !== action.item.id);

    case ReducerActions.ADD_MULTIPLE:
      tasks.push(...action.items)
      break;

    default:
      throw Error('Unknown action: ' + action);
  }
}