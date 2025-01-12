import Glass from '/cover/glass.webp';
import Loan from '/cover/loan.webp';
import Memory from '/cover/memory.webp';
import Quiz from '/cover/quiz.webp';
import Byte from '/cover/byte.webp';
import Snap from '/cover/image.webp';
import Leetcode from '/cover/leetcode.webp';
import Sudoku from '/cover/sudoku.webp';
import TicTacToe from '/cover/tictactoe.webp';
import Visualizer from '/cover/visualizer.webp';
import Invoice from '/cover/invoice.png';
import Resume from '/cover/resume.webp';
import BattleSim from '/cover/battle-sim2.webp';
import Budget from '/cover/budget.webp';
import Blogger from '/cover/blogger.webp';
import Jobscape from '/cover/jobscape2.webp';

import { BarChart2, BriefcaseBusiness, Code, Feather, FileText, Glasses, Grid, HandCoins, HelpCircle, LayoutGrid, LucideIcon, MemoryStick, ReceiptText, Search, Swords, UtensilsCrossed, Wallet2 } from 'lucide-react';

export interface AppInfo {
  name: string;
  path: string;
  tag: string;
  image: string;
  visible: boolean;
  description: string;
  techStack: string[];
  icon: LucideIcon;
}

export const Apps: AppInfo[] = [
  {
    name: 'Jobscape',
    path: '/jobscape',
    tag: "Find your ideal job",
    image: Jobscape,
    visible: true,
    description: "A dynamic portal connecting job seekers with top employers through seamless experience.",
    techStack: ['Rich Text Editor', 'Dashboard Analytics', 'Profile Management'],
    icon: BriefcaseBusiness,
  },
  {
    name: 'Blogify',
    path: '/blogify',
    tag: "Express Your Ideas",
    image: Blogger,
    visible: true,
    description: "A beautiful platform to share your thoughts, stories, and inspirations with the world.",
    techStack: ['Rich Text Editor', 'Responsive Design', 'User Management'],
    icon: Feather,
  },
  {
    name: 'BudgetBuddy',
    path: '/budget-buddy',
    tag: 'Manage Your Expenses',
    image: Budget,
    visible: true,
    description: 'An intuitive app to help you track and manage your expenses.',
    techStack: ['Expense Tracking', 'Real-time Updates', 'Data Visualization'],
    icon: Wallet2,
  },
  {
    name: 'Pokeverse',
    path: '/pokeverse',
    tag: "Become the Ultimate Trainer",
    image: BattleSim,
    visible: true,
    description: "Experience dynamic Pokemon battles with strategic gameplay mechanics",
    techStack: ['Game Logic', 'State Management', 'Real-time Updates'],
    icon: Swords
  },
  {
    name: 'Resume Generator',
    path: '/resume',
    tag: "Craft Your Professional Story",
    image: Resume,
    visible: true,
    description: "Create stunning, ATS-friendly resumes tailored to your career goals",
    techStack: ['PDF Generation', 'Form Handling'],
    icon: FileText
  },
  {
    name: 'InvoEase',
    path: '/invoease',
    tag: "Simplify Your Billing",
    image: Invoice,
    visible: true,
    description: "Generate professional invoices with ease and manage your finances effortlessly",
    techStack: ['State Management', 'PDF Export'],
    icon: ReceiptText
  },
  {
    name: 'Sorting Visualizer',
    path: '/sorting-visualizer',
    tag: "Algorithms in Action",
    image: Visualizer,
    visible: true,
    description: "Watch sorting algorithms come to life with interactive visualizations",
    techStack: ['Algorithms', 'Animation'],
    icon: BarChart2
  },
  {
    name: 'Super Tic-Tac-Toe',
    path: '/super-tic-tac-toe',
    tag: "Strategic Mind Bender",
    image: TicTacToe,
    visible: true,
    description: "Experience the classic game with a twist - play on a 3x3 grid of Tic-Tac-Toe boards",
    techStack: ['Game Logic', 'State Management'],
    icon: Grid
  },
  {
    name: 'Sudoku',
    path: '/sudoku',
    tag: "Number Puzzle Challenge",
    image: Sudoku,
    visible: true,
    description: "Solve Sudoku puzzles of varying difficulty with a sleek, interactive interface",
    techStack: ['Puzzle Generation', 'Validation Logic'],
    icon: LayoutGrid
  },
  {
    name: 'Leetcode Rivals',
    path: '/leetcode-rivals',
    tag: "Coding Competition Companion",
    image: Leetcode,
    visible: false,
    description: "Track and compare your LeetCode progress with friends in a friendly competition",
    techStack: ['API Integration', 'Data Visualization'],
    icon: Code
  },
  {
    name: 'SnapFind',
    path: '/snapfind',
    tag: "Visual Search Made Easy",
    image: Snap,
    visible: true,
    description: "Upload an image and find visually similar images across the web",
    techStack: ['Image Processing', 'API Integration'],
    icon: Search
  },
  {
    name: 'Quizzo',
    path: '/quizzo',
    tag: "Test Your Knowledge",
    image: Quiz,
    visible: true,
    description: "Engage in fun, interactive quizzes across various topics and challenge your friends",
    techStack: ['Quiz Engine', 'Multiplayer'],
    icon: HelpCircle
  },
  {
    name: 'Poke-Memory',
    path: '/poke-memory',
    tag: "Catch 'Em All in Your Mind",
    image: Memory,
    visible: true,
    description: "Test your memory with this Pokémon-themed card matching game",
    techStack: ['Game Logic', 'Animation'],
    icon: MemoryStick
  },
  {
    name: 'Recipe Haven',
    path: '/recipe-haven',
    tag: "Your Digital Cookbook",
    image: Byte,
    visible: true,
    description: "Discover, save, and share your favorite recipes in this culinary companion app",
    techStack: ['API Integration', 'State Management'],
    icon: UtensilsCrossed
  },
  {
    name: 'HomeLoan Wizard',
    path: '/homeloan-wizard',
    tag: "Mortgage Mastery",
    image: Loan,
    visible: true,
    description: "Calculate and visualize home loan scenarios to make informed financial decisions",
    techStack: ['Financial Calculations', 'Data Visualization'],
    icon: HandCoins
  },
  {
    name: 'Glassmorphism',
    path: '/glassmorphism',
    tag: "Modern UI Magic",
    image: Glass,
    visible: false,
    description: "Experiment with the trendy glassmorphism effect and generate CSS for your projects",
    techStack: ['CSS Generation', 'Interactive UI'],
    icon: Glasses
  },
];