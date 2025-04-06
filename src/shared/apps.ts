import { BarChart2, BookOpen, Feather, Grid, HandCoins, HelpCircle, LayoutGrid, LucideIcon, MemoryStick, ReceiptText, Search, Swords, UtensilsCrossed, Wallet2 } from 'lucide-react';
import BattleSim from '/cover/battle-sim2.webp';
import Blogger from '/cover/blogger.webp';
import Budget from '/cover/budget.webp';
import Byte from '/cover/byte.webp';
import Snap from '/cover/image.webp';
import Invoice from '/cover/invoice.png';
import Loan from '/cover/loan.webp';
import Memory from '/cover/memory.webp';
import Archivra from '/cover/notebook.png';
import Quiz from '/cover/quiz.webp';
import Sudoku from '/cover/sudoku.webp';
import TicTacToe from '/cover/tictactoe.webp';
import Visualizer from '/cover/visualizer.webp';

export interface AppInfo {
  name: string;
  path: string;
  caption: string;
  image: string;
  visible: boolean;
  description: string;
  tags: string[];
  icon: LucideIcon;
}

export const Apps: AppInfo[] = [
  {
    name: 'Blogify',
    path: '/blogify',
    caption: "Express Your Ideas",
    image: Blogger,
    visible: true,
    description: "A beautiful platform to share your thoughts, stories, and inspirations with the world.",
    tags: ['Rich Text Editor', 'Responsive Design', 'User Management'],
    icon: Feather,
  },
  {
    name: "Archivra",
    path: "/archivra",
    caption: "Structure Your Thoughts",
    image: Archivra,
    visible: false,
    description: "Turn scattered notes into organized notebooks and structured chapters. Archivra helps you think clearly, write freely, and never lose a good idea again.",
    tags: ["Multi-Notebook System", "Chapter Organization", "Private & Public Sharing"],
    icon: BookOpen,
  },
  {
    name: 'BudgetBuddy',
    path: '/budget-buddy',
    caption: 'Manage Your Expenses',
    image: Budget,
    visible: true,
    description: 'An intuitive app to help you track and manage your expenses.',
    tags: ['Expense Tracking', 'Real-time Updates', 'Data Visualization'],
    icon: Wallet2,
  },
  {
    name: 'Pokeverse',
    path: '/pokeverse',
    caption: "Become the Ultimate Trainer",
    image: BattleSim,
    visible: true,
    description: "Experience dynamic Pokemon battles with strategic gameplay mechanics",
    tags: ['Game Logic', 'State Management', 'Real-time Updates'],
    icon: Swords
  },
  {
    name: 'InvoEase',
    path: '/invoease',
    caption: "Simplify Your Billing",
    image: Invoice,
    visible: true,
    description: "Generate professional invoices with ease and manage your finances effortlessly",
    tags: ['State Management', 'PDF Export'],
    icon: ReceiptText
  },
  {
    name: 'Sorting Visualizer',
    path: '/sorting-visualizer',
    caption: "Algorithms in Action",
    image: Visualizer,
    visible: true,
    description: "Watch sorting algorithms come to life with interactive visualizations",
    tags: ['Algorithms', 'Animation'],
    icon: BarChart2
  },
  {
    name: 'Super Tic-Tac-Toe',
    path: '/super-tic-tac-toe',
    caption: "Strategic Mind Bender",
    image: TicTacToe,
    visible: true,
    description: "Experience the classic game with a twist - play on a 3x3 grid of Tic-Tac-Toe boards",
    tags: ['Game Logic', 'State Management'],
    icon: Grid
  },
  {
    name: 'Sudoku',
    path: '/sudoku',
    caption: "Number Puzzle Challenge",
    image: Sudoku,
    visible: true,
    description: "Solve Sudoku puzzles of varying difficulty with a sleek, interactive interface",
    tags: ['Puzzle Generation', 'Validation Logic'],
    icon: LayoutGrid
  },
  {
    name: 'SnapFind',
    path: '/snapfind',
    caption: "Visual Search Made Easy",
    image: Snap,
    visible: true,
    description: "Upload an image and find visually similar images across the web",
    tags: ['Image Processing', 'API Integration'],
    icon: Search
  },
  {
    name: 'Quizzo',
    path: '/quizzo',
    caption: "Test Your Knowledge",
    image: Quiz,
    visible: true,
    description: "Engage in fun, interactive quizzes across various topics and challenge your friends",
    tags: ['Quiz Engine', 'Multiplayer'],
    icon: HelpCircle
  },
  {
    name: 'Poke-Memory',
    path: '/poke-memory',
    caption: "Catch 'Em All in Your Mind",
    image: Memory,
    visible: true,
    description: "Test your memory with this Pokémon-themed card matching game",
    tags: ['Game Logic', 'Animation'],
    icon: MemoryStick
  },
  {
    name: 'Recipe Haven',
    path: '/recipe-haven',
    caption: "Your Digital Cookbook",
    image: Byte,
    visible: true,
    description: "Discover, save, and share your favorite recipes in this culinary companion app",
    tags: ['API Integration', 'State Management'],
    icon: UtensilsCrossed
  },
  {
    name: 'HomeLoan Wizard',
    path: '/homeloan-wizard',
    caption: "Mortgage Mastery",
    image: Loan,
    visible: true,
    description: "Calculate and visualize home loan scenarios to make informed financial decisions",
    tags: ['Financial Calculations', 'Data Visualization'],
    icon: HandCoins
  },
];