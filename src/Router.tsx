import { createBrowserRouter, Navigate, Outlet } from "react-router";
import AuthWrapper from "./auth/AuthWrapper";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import Homepage from "./apps/Home/Homepage";
import MarkdownLive from "./apps/Markdown/MarkdownLive";
import JsonLive from "./apps/JsonLive/JsonLive";
import QuizWrapper from "./apps/PopQuiz/QuizWrapper";
import QuizSetup from "./apps/PopQuiz/QuizSetup";
import QuizBoard from "./apps/PopQuiz/QuizBoard";
import QuizResult from "./apps/PopQuiz/QuizResult";
import Sudoku from "./apps/Sudoku/Sudoku";
import Layout from "./components/Layout";
import SortingVisualizer from "./apps/Visualizer/Visualizer";
import SuperTicTacToe from "./apps/TicTacToe/SuperTicTacToe";
import PokeMemory from "./apps/PokeMemory/Pokememory";
import LoanWizard from "./apps/LoanWizard/LoanWizard";
import RecipeHaven from "./apps/RecipeHaven/RecipeHaven";
import MealWrapper from "./apps/RecipeHaven/MealWrapper";
import MealGallery from "./apps/RecipeHaven/MealGallery";
import MealDetails from "./apps/RecipeHaven/MealDetails";
import BlogLayout from "./apps/Blogify/components/BlogLayout";
import BlogHome from "./apps/Blogify/pages/BlogHome";
import BlogList from "./apps/Blogify/pages/BlogList";
import MyBlogs from "./apps/Blogify/pages/MyBlogs";
import BlogDetail from "./apps/Blogify/pages/BlogDetail";
import PublishBlog from "./apps/Blogify/pages/PublishBlog";
import BudgetLayout from "./apps/BudgetBuddy/components/BudgetLayout";
import BudgetHome from "./apps/BudgetBuddy/pages/BudgetHome";
import Overview from "./apps/BudgetBuddy/pages/Overview";
import Statistics from "./apps/BudgetBuddy/pages/Statistics";
import Pokeverse from "./apps/Pokeverse/Pokeverse";
import Pokedex from "./apps/Pokeverse/Pokedex/Pokedex";
import PokemonDetails from "./apps/Pokeverse/PokemonDetails/PokemonDetails";
import BattleSetup from "./apps/Pokeverse/BattleSetup/BattleSetup";
import TeamSelection from "./apps/Pokeverse/TeamSelection/TeamSelection";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Homepage /> },
            { path: 'json', element: <JsonLive /> },
            { path: 'markdown', element: <MarkdownLive /> },
            { path: 'sudoku', element: <Sudoku /> },
            { path: 'sorting-visualizer', element: <SortingVisualizer /> },
            { path: 'super-tic-tac-toe', element: <SuperTicTacToe /> },
            { path: 'poke-memory', element: <PokeMemory /> },
            { path: 'loan-wizard', element: <LoanWizard /> },
            {
                path: 'quizzo',
                element: <QuizWrapper />,
                children: [
                    { index: true, element: <QuizSetup /> },
                    { path: 'play', element: <QuizBoard /> },
                    { path: 'result', element: <QuizResult /> },
                    { path: '*', element: <Navigate to='/quizzo' replace /> },
                ]
            },
            {
                path: 'recipe-haven',
                element: <Outlet />,
                children: [
                    { path: '', element: <RecipeHaven /> },
                    { path: 'search/:searchTerm', element: <MealWrapper><MealGallery /></MealWrapper> },
                    { path: 'category/:categoryId', element: <MealWrapper><MealGallery /></MealWrapper> },
                    { path: 'alphabet/:letter', element: <MealWrapper><MealGallery /></MealWrapper> },
                    { path: 'area/:areaId', element: <MealWrapper><MealGallery /></MealWrapper> },
                    { path: 'meal/:mealId', element: <MealWrapper><MealDetails /></MealWrapper> },
                ]
            },
            {
                path: '/blogify',
                element: <BlogLayout />,
                children: [
                    { path: 'home', element: <BlogHome /> },
                    { path: 'list', element: <BlogList /> },
                    { path: 'list/:author', element: <BlogList /> },
                    { path: 'me', element: <MyBlogs /> },
                    { path: 'blog/:blogId', element: <BlogDetail /> },
                    { path: 'publish', element: <PublishBlog /> },
                    { path: 'edit/:blogId', element: <PublishBlog /> },
                    { path: '', element: <Navigate to="home" replace /> },
                ]
            },
            {
                path: '/budgetbuddy',
                element: <BudgetLayout />,
                children: [
                    { path: 'home', element: <BudgetHome /> },
                    { path: 'overview', element: <Overview /> },
                    { path: 'statistics', element: <Statistics /> },
                    { path: '', element: <Navigate to="home" replace /> },
                ]
            },
            {
                path: 'pokeverse',
                element: <Outlet />,
                children: [
                    { index: true, element: <Pokeverse /> },
                    { path: 'pokedex', element: <Pokedex /> },
                    { path: 'pokedex/:id', element: <PokemonDetails /> },
                    {
                        path: 'battle-sim',
                        element: <Outlet />,
                        children: [
                            { index: true, element: <BattleSetup /> },
                            { path: 'team-selection', element: <TeamSelection /> },
                            //   { path: 'battle', element: <BattleScreen /> },
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: 'auth',
        element: <AuthWrapper />,
        children: [
            { index: true, element: <Navigate to='login' replace /> },
            { path: 'register', element: <Register /> },
            { path: 'login', element: <Login /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: '*', element: <Navigate to='/auth/login' replace /> }, // Catch invalid auth paths
        ]
    },
    { path: '*', element: <Navigate to='/' replace /> },
]);

export default router;