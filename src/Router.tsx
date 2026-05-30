import { createBrowserRouter, Navigate, Outlet } from "react-router";
import AuthWrapper from "./auth/AuthWrapper";
import { protectedLoader, publicOnlyLoader } from "./auth/auth.guards";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Discover from "./apps/Blogify/pages/Discover";
import BlogDetails from "./apps/Blogify/pages/BlogDetails";
import BlogHome from "./apps/Blogify/pages/BlogHome";
import BlogLayout from "./apps/Blogify/pages/BlogLayout";
import BlogList from "./apps/Blogify/pages/BlogList";
import MyLibrary from "./apps/Blogify/pages/MyLibrary";
import NotebookDetail from "./apps/Blogify/pages/NotebookDetail";
import NotebookForm from "./apps/Blogify/pages/NotebookForm";
import NotebookList from "./apps/Blogify/pages/NotebookList";
import WriteBlog from "./apps/Blogify/pages/WriteBlog";
import BudgetLayout from "./apps/BudgetBuddy/components/BudgetLayout";
import BudgetHome from "./apps/BudgetBuddy/pages/BudgetHome";
import Overview from "./apps/BudgetBuddy/pages/Overview";
import Statistics from "./apps/BudgetBuddy/pages/Statistics";
import FormBuilder from "./apps/Formlyst/Builder/Builder";
import FormDashboard from "./apps/Formlyst/Dashboard/Dashboard";
import FormPublic from "./apps/Formlyst/FormPublic/Public";
import FormReview from "./apps/Formlyst/FormReview/Review";
import ResponseDetail from "./apps/Formlyst/ResponseDetail/ResponseDetail";
import Responses from "./apps/Formlyst/Responses/Responses";
import Homepage from "./apps/Home/Homepage";
import JsonLive from "./apps/JsonLive/JsonLive";
import LoanWizard from "./apps/LoanWizard/LoanWizard";
import MarkdownLive from "./apps/Markdown/MarkdownLive";
import PokeMemory from "./apps/PokeMemory/Pokememory";
import BattleScreen from "./apps/Pokeverse/BattleScreen/BattleScreen";
import BattleSetup from "./apps/Pokeverse/BattleSetup/BattleSetup";
import BattleSimLayout from "./apps/Pokeverse/BattleSimLayout/BattleSimLayout";
import Pokedex from "./apps/Pokeverse/Pokedex/Pokedex";
import PokemonDetails from "./apps/Pokeverse/PokemonDetails/PokemonDetails";
import Pokeverse from "./apps/Pokeverse/Pokeverse";
import PrepareBattle from "./apps/Pokeverse/PrepareBattle/PrepareBattle";
import TeamSelection from "./apps/Pokeverse/TeamSelection/TeamSelection";
import QuizBoard from "./apps/PopQuiz/QuizBoard";
import QuizResult from "./apps/PopQuiz/QuizResult";
import QuizSetup from "./apps/PopQuiz/QuizSetup";
import QuizWrapper from "./apps/PopQuiz/QuizWrapper";
import MealDetails from "./apps/RecipeHaven/MealDetails";
import MealGallery from "./apps/RecipeHaven/MealGallery";
import MealWrapper from "./apps/RecipeHaven/MealWrapper";
import RecipeHaven from "./apps/RecipeHaven/RecipeHaven";
import Layout from "./components/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            // Public mini-apps
            { index: true, element: <Homepage /> },
            { path: 'json', element: <JsonLive /> },
            { path: 'markdown', element: <MarkdownLive /> },
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

            // Protected: Blogify
            {
                path: '/blogify',
                element: <BlogLayout />,
                loader: protectedLoader,
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

            // Protected: BudgetBuddy
            {
                path: '/budgetbuddy',
                element: <BudgetLayout />,
                loader: protectedLoader,
                children: [
                    { path: 'home', element: <BudgetHome /> },
                    { path: 'overview', element: <Overview /> },
                    { path: 'statistics', element: <Statistics /> },
                    { index: true, element: <Navigate to="home" replace /> },
                ]
            },

            // Protected: Formlyst (dashboard + builder + responses)
            {
                path: 'formlyst',
                element: <Outlet />,
                loader: protectedLoader,
                children: [
                    { index: true, element: <FormDashboard /> },
                    { path: 'new', element: <FormBuilder /> },
                    { path: ':id/edit', element: <FormBuilder /> },
                    { path: ':id/responses', element: <Responses /> },
                    { path: ':id/responses/:responseId', element: <ResponseDetail /> },
                ],
            },

            // Public: Formlyst form-fill (anyone with the share link)
            { path: 'formlyst/fill/:shareUrl', element: <FormPublic /> },
            { path: 'formlyst/fill/:shareUrl/review', element: <FormReview /> },
        ]
    },
    {
        path: 'auth',
        element: <AuthWrapper />,
        loader: publicOnlyLoader, // Logged-in users get bounced to /
        children: [
            { index: true, element: <Navigate to='login' replace /> },
            { path: 'register', element: <Register /> },
            { path: 'login', element: <Login /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: '*', element: <Navigate to='/auth/login' replace /> },
        ]
    },
    { path: '*', element: <Navigate to='/' replace /> },
]);

export default router;