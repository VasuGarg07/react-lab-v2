import { BarChart2, Code2, Feather, FileJson, Grid, HandCoins, HelpCircle, LayoutGrid, MemoryStick, StickyNote, Swords, UtensilsCrossed, Wallet2, type LucideIcon } from 'lucide-react';
import BattleSim from '/cover/battle-sim2.webp';
import Blogger from '/cover/blogger.webp';
import Budget from '/cover/budget.webp';
import Byte from '/cover/byte.webp';
import Form from '/cover/formlyst.webp';
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
    tag: 'Drag-and-drop form builder',
    image: Form,
    visible: true,
    description: 'Build multi-step forms with nested sections, drag fields into place, and publish a shareable link. Responses come back to a per-form dashboard.',
    techStack: ['dnd-kit', 'React Hook Form', 'Yup', 'TanStack Query'],
    icon: StickyNote,
  },
  {
    name: 'Pokeverse',
    path: '/pokeverse',
    tag: 'Pokédex meets battle simulator',
    image: BattleSim,
    visible: true,
    description: 'A virtualized Pokédex on top of PokéAPI, plus a turn-based battle flow — pick a team, queue moves, watch the simulator play it out.',
    techStack: ['PokéAPI', 'TanStack Query', 'Redux Toolkit', 'Recharts'],
    icon: Swords,
  },
  {
    name: 'Super Tic-Tac-Toe',
    path: '/super-tic-tac-toe',
    tag: 'Tic-tac-toe with a twist',
    image: TicTacToe,
    visible: true,
    description: 'A 3×3 grid of tic-tac-toe boards where your move forces the board your opponent plays on next. Local two-player.',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS'],
    icon: Grid,
  },
  {
    name: 'Blogify',
    path: '/blogify',
    tag: 'Blogs and curated notebooks',
    image: Blogger,
    visible: true,
    description: 'Write rich-text posts with Tiptap, group them into shareable notebooks, and browse an author-discovery feed. Image uploads go through ImgBB.',
    techStack: ['Tiptap', 'TanStack Query', 'JWT Auth', 'ImgBB'],
    icon: Feather,
  },
  {
    name: 'BudgetBuddy',
    path: '/budgetbuddy',
    tag: 'Track spending, see the trends',
    image: Budget,
    visible: true,
    description: 'Log expenses across categories, scan a running ledger, and break down spending by month, category, or tag with interactive charts.',
    techStack: ['Recharts', 'TanStack Query', 'React Hook Form'],
    icon: Wallet2,
  },
  {
    name: 'Sorting Visualizer',
    path: '/sorting-visualizer',
    tag: 'Algorithms, frame by frame',
    image: Visualizer,
    visible: true,
    description: 'Step through six classic sorting algorithms with adjustable speed and a live counter for comparisons and swaps. Companion panel covers complexity and behavior.',
    techStack: ['Algorithm Visualization', 'requestAnimationFrame', 'TypeScript'],
    icon: BarChart2,
  },
  {
    name: 'Poke-Memory',
    path: '/poke-memory',
    tag: "Match the pairs, catch 'em all",
    image: Memory,
    visible: true,
    description: 'A Pokémon-themed memory matching game — pick a difficulty, flip cards, find pairs, and chase your best time.',
    techStack: ['PokéAPI', 'Redux Toolkit', 'CSS Animations'],
    icon: MemoryStick,
  },
  {
    name: 'Loan Wizard',
    path: '/loan-wizard',
    tag: 'EMI calculator + affordability check',
    image: Loan,
    visible: true,
    description: 'Compute EMIs with a full amortization breakdown, or flip into reverse mode to see what loan your income can actually carry.',
    techStack: ['Recharts', 'Financial Math', 'TypeScript'],
    icon: HandCoins,
  },
  {
    name: 'JSON Visualizer',
    path: '/json',
    tag: 'Explore deeply nested JSON',
    image: Json,
    visible: true,
    description: 'Paste, upload, or fetch JSON and walk through it as a collapsible tree, with breadcrumbs that track exactly where you are in the structure.',
    techStack: ['Recursive Tree View', 'Breadcrumb Routing', 'TypeScript'],
    icon: FileJson,
  },
  {
    name: 'Markdown Live',
    path: '/markdown',
    tag: 'Two-pane Markdown editor',
    image: Markdown,
    visible: true,
    description: 'Write GitHub-flavored Markdown on the left, see it rendered on the right. Dark mode, syntax highlighting, and one-click clipboard export.',
    techStack: ['marked', 'GFM', 'Tailwind Typography'],
    icon: Code2,
  },
  {
    name: 'Sudoku',
    path: '/sudoku',
    tag: 'Generated puzzles with animated solver',
    image: Sudoku,
    visible: true,
    description: 'Solve a fresh puzzle with conflict highlighting, peer-cell guides, and keyboard navigation — or hit Solve to watch a backtracking algorithm work through it step by step.',
    techStack: ['Backtracking', 'Generators', 'Custom Hooks'],
    icon: LayoutGrid
  },
  {
    name: 'Quizzo',
    path: '/quizzo',
    tag: 'Timed trivia, scored results',
    image: Quiz,
    visible: true,
    description: 'Pick a topic and length, answer timed questions from the Open Trivia DB, and get a scored breakdown at the end.',
    techStack: ['Open Trivia DB', 'Redux Toolkit', 'Timer Logic'],
    icon: HelpCircle,
  },
  {
    name: 'Recipe Haven',
    path: '/recipe-haven',
    tag: 'Browse and search recipes',
    image: Byte,
    visible: true,
    description: 'A recipe browser on top of TheMealDB — search by name, filter by category, area, or alphabet, then drill into full ingredients and steps.',
    techStack: ['TheMealDB', 'TanStack Query', 'Dynamic Routing'],
    icon: UtensilsCrossed,
  },
];