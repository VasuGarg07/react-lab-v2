import {
    BarChart2,
    FileText,
    Grid,
    HandCoins,
    HelpCircle,
    LayoutGrid,
    LucideIcon,
    MemoryStick,
    ReceiptText,
    Search,
    UtensilsCrossed
} from 'lucide-react';

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
        name: 'Resume Generator',
        path: '/resume',
        tag: "Craft Your Professional Story",
        image: '/app-logos/resume.webp',
        visible: true,
        description: "Create stunning, ATS-friendly resumes tailored to your career goals",
        techStack: ['PDF Generation', 'Form Handling'],
        icon: FileText
    },
    {
        name: 'InvoEase',
        path: '/invoease',
        tag: "Simplify Your Billing",
        image: '/app-logos/invoice.png',
        visible: true,
        description: "Generate professional invoices with ease and manage your finances effortlessly",
        techStack: ['State Management', 'PDF Export'],
        icon: ReceiptText
    },
    {
        name: 'Sorting Visualizer',
        path: '/sorting-visualizer',
        tag: "Algorithms in Action",
        image: '/app-logos/visualizer.webp',
        visible: true,
        description: "Watch sorting algorithms come to life with interactive visualizations",
        techStack: ['Algorithms', 'Animation'],
        icon: BarChart2
    },
    {
        name: 'Super Tic-Tac-Toe',
        path: '/super-tictactoe',
        tag: "Strategic Mind Bender",
        image: '/app-logos/tictactoe.webp',
        visible: true,
        description: "Experience the classic game with a twist - play on a 3x3 grid of Tic-Tac-Toe boards",
        techStack: ['Game Logic', 'State Management'],
        icon: Grid
    },
    {
        name: 'Sudoku',
        path: '/sudoku',
        tag: "Number Puzzle Challenge",
        image: '/app-logos/sudoku.webp',
        visible: true,
        description: "Solve Sudoku puzzles of varying difficulty with a sleek, interactive interface",
        techStack: ['Puzzle Generation', 'Validation Logic'],
        icon: LayoutGrid
    },
    {
        name: 'SnapFind',
        path: '/snapfind',
        tag: "Visual Search Made Easy",
        image: '/app-logos/image.webp',
        visible: true,
        description: "Upload an image and find visually similar images across the web",
        techStack: ['Image Processing', 'API Integration'],
        icon: Search
    },
    {
        name: 'Quizzo',
        path: '/quizzo',
        tag: "Test Your Knowledge",
        image: '/app-logos/quiz.webp',
        visible: true,
        description: "Engage in fun, interactive quizzes across various topics and challenge your friends",
        techStack: ['Quiz Engine', 'Multiplayer'],
        icon: HelpCircle
    },
    {
        name: 'Poke-Memory',
        path: '/poke-memory',
        tag: "Catch 'Em All in Your Mind",
        image: '/app-logos/memory.webp',
        visible: true,
        description: "Test your memory with this Pokémon-themed card matching game",
        techStack: ['Game Logic', 'Animation'],
        icon: MemoryStick
    },
    {
        name: 'Recipe Haven',
        path: '/recipe-haven',
        tag: "Your Digital Cookbook",
        image: '/app-logos/byte.webp',
        visible: true,
        description: "Discover, save, and share your favorite recipes in this culinary companion app",
        techStack: ['API Integration', 'State Management'],
        icon: UtensilsCrossed
    },
    {
        name: 'HomeLoan Wizard',
        path: '/homeloan-wizard',
        tag: "Mortgage Mastery",
        image: '/app-logos/loan.webp',
        visible: true,
        description: "Calculate and visualize home loan scenarios to make informed financial decisions",
        techStack: ['Financial Calculations', 'Data Visualization'],
        icon: HandCoins
    },
];