import Glass from '../assets/cover/glass.webp';
import Loan from '../assets/cover/loan.webp';
import Memory from '../assets/cover/memory.webp';
// import Wallet from '../assets/cover/wallet.webp';
import Quiz from '../assets/cover/quiz.webp';
import Byte from '../assets/cover/byte.webp';
import Snap from '../assets/cover/image.webp';

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
    path: '/poke-memory',
    tag: 'Card Match Game',
    image: Memory,
  },
  // {
  //   name: 'WalletWise',
  //   path: '/wallet-wise',
  //   tag: 'Expense Tracker',
  //   image: Wallet,
  // },
  {
    name: 'SnapFind',
    path: '/snapfind',
    tag: 'Image Search',
    image: Snap,
  },
  {
    name: 'Quizzo',
    path: '/quizzo',
    tag: 'Trivia Game',
    image: Quiz,
  },
  {
    name: 'Quick Byte',
    path: '/quick-byte',
    tag: 'Pocket Cookbook',
    image: Byte,
  }
]