import Glass from '../assets/cover/glass.webp';
import Loan from '../assets/cover/loan.webp';
import Memory from '../assets/cover/memory.webp';
import Quiz from '../assets/cover/quiz.webp';
import Byte from '../assets/cover/byte.webp';
import Snap from '../assets/cover/image.webp';
import Leetcode from '../assets/cover/leetcode.webp';
import Sudoku from '../assets/cover/sudoku.webp';
import TicTacToe from '../assets/cover/tictactoe.webp';
import Visualizer from '../assets/cover/visualizer.webp';
import Invoice from '../assets/cover/invoice.png';
import Resume from '../assets/cover/resume.webp';

export interface AppInfo {
  name: string;
  path: string;
  tag: string;
  image: string;
  visible: boolean;
  description: string;
  techStack: string[];
}

export const Apps: AppInfo[] = [
  {
    name: 'Resume Generator',
    path: '/resume',
    tag: "Craft Your Professional Story",
    image: Resume,
    visible: true,
    description: "Create stunning, ATS-friendly resumes tailored to your career goals",
    techStack: ['PDF Generation', 'Form Handling']
  },
  {
    name: 'InvoEase',
    path: '/invoease',
    tag: "Simplify Your Billing",
    image: Invoice,
    visible: true,
    description: "Generate professional invoices with ease and manage your finances effortlessly",
    techStack: ['State Management', 'PDF Export']
  },
  {
    name: 'Sorting Visualizer',
    path: '/sorting-visualizer',
    tag: "Algorithms in Action",
    image: Visualizer,
    visible: true,
    description: "Watch sorting algorithms come to life with interactive visualizations",
    techStack: ['Algorithms', 'Animation']
  },
  {
    name: 'Super Tic-Tac-Toe',
    path: '/super-tic-tac-toe',
    tag: "Strategic Mind Bender",
    image: TicTacToe,
    visible: true,
    description: "Experience the classic game with a twist - play on a 3x3 grid of Tic-Tac-Toe boards",
    techStack: ['Game Logic', 'State Management']
  },
  {
    name: 'Sudoku',
    path: '/sudoku',
    tag: "Number Puzzle Challenge",
    image: Sudoku,
    visible: true,
    description: "Solve Sudoku puzzles of varying difficulty with a sleek, interactive interface",
    techStack: ['Puzzle Generation', 'Validation Logic']
  },
  {
    name: 'Leetcode Rivals',
    path: '/leetcode-rivals',
    tag: "Coding Competition Companion",
    image: Leetcode,
    visible: false,
    description: "Track and compare your LeetCode progress with friends in a friendly competition",
    techStack: ['API Integration', 'Data Visualization']
  },
  {
    name: 'SnapFind',
    path: '/snapfind',
    tag: "Visual Search Made Easy",
    image: Snap,
    visible: true,
    description: "Upload an image and find visually similar images across the web",
    techStack: ['Image Processing', 'API Integration']
  },
  {
    name: 'Quizzo',
    path: '/quizzo',
    tag: "Test Your Knowledge",
    image: Quiz,
    visible: true,
    description: "Engage in fun, interactive quizzes across various topics and challenge your friends",
    techStack: ['Quiz Engine', 'Multiplayer']
  },
  {
    name: 'Poke-Memory',
    path: '/poke-memory',
    tag: "Catch 'Em All in Your Mind",
    image: Memory,
    visible: true,
    description: "Test your memory with this Pokémon-themed card matching game",
    techStack: ['Game Logic', 'Animation']
  },
  {
    name: 'Recipe Haven',
    path: '/recipe-haven',
    tag: "Your Digital Cookbook",
    image: Byte,
    visible: true,
    description: "Discover, save, and share your favorite recipes in this culinary companion app",
    techStack: ['API Integration', 'State Management']
  },
  {
    name: 'HomeLoan Wizard',
    path: '/homeloan-wizard',
    tag: "Mortgage Mastery",
    image: Loan,
    visible: true,
    description: "Calculate and visualize home loan scenarios to make informed financial decisions",
    techStack: ['Financial Calculations', 'Data Visualization']
  },
  {
    name: 'Glassmorphism',
    path: '/glassmorphism',
    tag: "Modern UI Magic",
    image: Glass,
    visible: false,
    description: "Experiment with the trendy glassmorphism effect and generate CSS for your projects",
    techStack: ['CSS Generation', 'Interactive UI']
  },
];