import Glass from '../assets/cover/glass.webp';
import Loan from '../assets/cover/loan.webp';
import Memory from '../assets/cover/memory.webp';
import Quiz from '../assets/cover/quiz.webp';
import Byte from '../assets/cover/byte.webp';
import Snap from '../assets/cover/image.webp';
import Leetcode from '../assets/cover/leetcode.webp';
import Sudoku from '../assets/cover/sudoku.webp';
import TicTacToe from '../assets/cover/tictactoe.webp';

export interface AppInfo {
  name: string,
  path: string,
  tag: string
  image: string
}

export const Apps: AppInfo[] = [
  // {
  //   name: 'Postman Markdown',
  //   path: '/postman-markdown',
  //   tag: 'Convert JSON to Markdown',
  //   image: Leetcode
  // },
  {
    name: 'Super Tic-Tac-Toe',
    path: '/super-tic-tac-toe',
    tag: 'Challenging Game',
    image: TicTacToe
  },
  {
    name: 'Sudoku',
    path: '/sudoku',
    tag: 'Problem Solving',
    image: Sudoku
  },
  {
    name: 'Leetcode Rivals',
    path: '/leetcode-rivals',
    tag: 'Competitive Programming',
    image: Leetcode
  },
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
    name: 'Poke-Memory',
    path: '/poke-memory',
    tag: 'Card Match Game',
    image: Memory,
  },
  {
    name: 'Quick Byte',
    path: '/quick-byte',
    tag: 'Pocket Cookbook',
    image: Byte,
  },
  {
    name: 'HomeLoan Wizard',
    path: '/homeloan-wizard',
    tag: 'Loan Calculator',
    image: Loan,
  },
  {
    name: 'Glassmorphism',
    path: '/glassmorphism',
    tag: 'CSS Tool',
    image: Glass,
  },
]