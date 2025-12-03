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
import BudgetLayout from "./apps/BudgetBuddy/components/BudgetLayout";
import BudgetHome from "./apps/BudgetBuddy/pages/BudgetHome";
import Overview from "./apps/BudgetBuddy/pages/Overview";
import Statistics from "./apps/BudgetBuddy/pages/Statistics";
import Pokeverse from "./apps/Pokeverse/Pokeverse";
import Pokedex from "./apps/Pokeverse/Pokedex/Pokedex";
import PokemonDetails from "./apps/Pokeverse/PokemonDetails/PokemonDetails";
import BattleSetup from "./apps/Pokeverse/BattleSetup/BattleSetup";
import TeamSelection from "./apps/Pokeverse/TeamSelection/TeamSelection";
import PrepareBattle from "./apps/Pokeverse/PrepareBattle/PrepareBattle";
import BattleScreen from "./apps/Pokeverse/BattleScreen/BattleScreen";
import BattleSimLayout from "./apps/Pokeverse/BattleSimLayout/BattleSimLayout";
import FormDashboard from "./apps/Formlyst/Dashboard/Dashboard";
import FormLayout from "./apps/Formlyst/FormLayout";
import Responses from "./apps/Formlyst/Responses/Responses";
import ResponseDetail from "./apps/Formlyst/ResponseDetail/ResponseDetail";
import FormPublic from "./apps/Formlyst/FormPublic/Public";
import FormReview from "./apps/Formlyst/FormReview/Review";
import FormBuilder from "./apps/Formlyst/Builder/Builder";
import Discover from "./apps/Blogify/pages/Discover";
import BlogLayout from "./apps/Blogify/pages/BlogLayout";
import BlogHome from "./apps/Blogify/pages/BlogHome";
import MyLibrary from "./apps/Blogify/pages/MyLibrary";
import WriteBlog from "./apps/Blogify/pages/WriteBlog";
import NotebookForm from "./apps/Blogify/pages/NotebookForm";
import NotebookList from "./apps/Blogify/pages/NotebookList";
import NotebookDetail from "./apps/Blogify/pages/NotebookDetail";
import BlogList from "./apps/Blogify/pages/BlogList";
import BlogDetails from "./apps/Blogify/pages/BlogDetails";

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
                    { index: true, element: <RecipeHaven /> },
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
                    // Main Nav Tabs
                    { path: 'home', element: <BlogHome /> },
                    { path: 'discover', element: <Discover /> },
                    { path: 'library', element: <MyLibrary /> },
                    { path: 'write', element: <WriteBlog /> },

                    // Notebooks
                    { path: 'notebooks/create', element: <NotebookForm /> },
                    { path: 'notebooks/edit/:notebookId', element: <NotebookForm /> },
                    { path: 'notebooks/author/:author', element: <NotebookList /> },
                    { path: 'notebooks/:notebookId', element: <NotebookDetail /> },

                    // Blogs
                    { path: 'blogs/author/:author', element: <BlogList /> },
                    { path: 'blogs/edit/:blogId', element: <WriteBlog /> },
                    { path: 'blogs/:blogId', element: <BlogDetails /> },

                    { index: true, element: <Navigate to='home' replace /> },
                    { path: '*', element: <Navigate to='home' replace /> }
                ]
            },
            {
                path: '/budgetbuddy',
                element: <BudgetLayout />,
                children: [
                    { path: 'home', element: <BudgetHome /> },
                    { path: 'overview', element: <Overview /> },
                    { path: 'statistics', element: <Statistics /> },
                    { index: true, element: <Navigate to="home" replace /> },
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
                        element: <BattleSimLayout />,
                        children: [
                            { index: true, element: <BattleSetup /> },
                            { path: 'team-selection', element: <TeamSelection /> },
                            { path: 'loading', element: <PrepareBattle /> },
                            { path: 'battle', element: <BattleScreen /> },
                        ]
                    }
                ]
            },
            {
                path: 'formlyst',
                element: <FormLayout />,
                children: [
                    { index: true, element: <FormDashboard /> },
                    { path: 'new', element: <FormBuilder /> },
                    { path: ':id/edit', element: <FormBuilder /> },
                    { path: ':id/responses', element: <Responses /> },
                    { path: ':id/responses/:responseId', element: <ResponseDetail /> },
                ],
            },
            { path: 'formlyst/fill/:shareUrl', element: <FormPublic /> },
            { path: 'formlyst/fill/:shareUrl/review', element: <FormReview /> },
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