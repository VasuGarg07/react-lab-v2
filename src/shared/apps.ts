import { BarChart2, Code2, Feather, FileJson, Grid, HandCoins, HelpCircle, LayoutGrid, MemoryStick, StickyNote, Swords, UtensilsCrossed, Wallet2, type LucideIcon } from 'lucide-react';
import BattleSim from '/cover/battle-sim2.webp';
import Blogger from '/cover/blogger.webp';
import Budget from '/cover/budget.webp';
import Byte from '/cover/byte.webp';
import Form from '/cover/formlyst.png';
import Json from '/cover/json.png';
import Loan from '/cover/loan.webp';
import Markdown from '/cover/markdown.png';
import Memory from '/cover/memory.webp';
import Quiz from '/cover/quiz.webp';
import Sudoku from '/cover/sudoku.webp';
import TicTacToe from '/cover/tictactoe.webp';
import Visualizer from '/cover/visualizer.webp';

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
    name: 'Formlyst',
    path: '/formlyst',
    tag: "Craft Structured Forms",
    image: Form,
    visible: true,
    description: "Visually build structured, multi-step forms with nested sections, smart fields, and real-time validation — all shareable via a single link.",
    techStack: ['Multi-Step Builder', 'Live Validation', 'Dynamic-Driven UI'],
    icon: StickyNote
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
    path: '/budgetbuddy',
    tag: 'Manage Your Expenses',
    image: Budget,
    visible: true,
    description: 'An intuitive app to help you track and manage your expenses.',
    techStack: ['Expense Tracking', 'Real-time Updates', 'Data Visualization'],
    icon: Wallet2,
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
    name: 'Loan Wizard',
    path: '/loan-wizard',
    tag: "Loan Mastery",
    image: Loan,
    visible: true,
    description: "Calculate and visualize loan scenarios to make informed financial decisions",
    techStack: ['Financial Calculations', 'Data Visualization'],
    icon: HandCoins
  },
  {
    name: 'JSON Visualizer',
    path: '/json',
    tag: "Decode Structured Data",
    image: Json,
    visible: true,
    description: "A powerful utility to parse, visualize, and navigate deeply nested JSON data with ease.",
    techStack: ['Web Worker Parsing', 'Dynamic Tree View', 'Breadcrumb Navigation'],
    icon: FileJson
  },
  {
    name: 'Markdown Live',
    path: '/markdown',
    tag: 'Live Markdown Preview',
    image: Markdown,
    visible: true,
    description: 'Edit and preview Markdown in real-time with syntax highlighting, dark mode, clipboard integration, and styled previews using Tailwind.',
    techStack: ['Live Preview', 'Tailwind Typography', 'Clipboard API'],
    icon: Code2,
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
    name: 'Recipe Haven',
    path: '/recipe-haven',
    tag: "Your Digital Cookbook",
    image: Byte,
    visible: true,
    description: "Discover, save, and share your favorite recipes in this culinary companion app",
    techStack: ['API Integration', 'State Management'],
    icon: UtensilsCrossed
  },
];