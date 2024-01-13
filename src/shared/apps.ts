import Glass from '../assets/cover/glass.png';
import Loan from '../assets/cover/loan.png';
import Memory from '../assets/cover/memory.png';
import Wallet from '../assets/cover/wallet.png';

export interface AppInfo {
  name: string,
  path: string,
  tag: string
  image: string
}

export const Apps: AppInfo[] = [
  {
    name: 'Glassmorphism',
    path: '/glassmorphism',
    tag: 'CSS Tool',
    image: Glass,
  },
  {
    name: 'HomeLoan Wizard',
    path: '/homeloan-wizard',
    tag: 'Loan Calculator',
    image: Loan,
  },
  {
    name: 'Poke-Memory',
    path: 'poke-memory',
    tag: 'Card Match Game',
    image: Memory,
  },
  {
    name: 'WalletWise',
    path: 'wallet-wise',
    tag: 'Expense Tracker',
    image: Wallet,
  }
]