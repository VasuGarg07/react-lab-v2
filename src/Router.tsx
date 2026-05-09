import { lazy } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import AuthWrapper from "./auth/AuthWrapper";
import { protectedLoader, publicOnlyLoader } from "./auth/auth.guards";
import Layout from "./components/Layout";

// Auth
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const ForgotPassword = lazy(() => import("./auth/ForgotPassword"));

// Home
const Homepage = lazy(() => import("./apps/Home/Homepage"));

// Mini-apps
const JsonLive = lazy(() => import("./apps/JsonLive/JsonLive"));
const MarkdownLive = lazy(() => import("./apps/Markdown/MarkdownLive"));
const Sudoku = lazy(() => import("./apps/Sudoku/Sudoku"));
const SortingVisualizer = lazy(() => import("./apps/Visualizer/Visualizer"));
const SuperTicTacToe = lazy(() => import("./apps/TicTacToe/SuperTicTacToe"));
const PokeMemory = lazy(() => import("./apps/PokeMemory/Pokememory"));
const LoanWizard = lazy(() => import("./apps/LoanWizard/LoanWizard"));

// Pop Quiz
const QuizWrapper = lazy(() => import("./apps/PopQuiz/QuizWrapper"));
const QuizSetup = lazy(() => import("./apps/PopQuiz/QuizSetup"));
const QuizBoard = lazy(() => import("./apps/PopQuiz/QuizBoard"));
const QuizResult = lazy(() => import("./apps/PopQuiz/QuizResult"));

// Recipe Haven
const RecipeHaven = lazy(() => import("./apps/RecipeHaven/RecipeHaven"));
const MealWrapper = lazy(() => import("./apps/RecipeHaven/MealWrapper"));
const MealGallery = lazy(() => import("./apps/RecipeHaven/MealGallery"));
const MealDetails = lazy(() => import("./apps/RecipeHaven/MealDetails"));

// Pokeverse
const Pokeverse = lazy(() => import("./apps/Pokeverse/Pokeverse"));
const Pokedex = lazy(() => import("./apps/Pokeverse/Pokedex/Pokedex"));
const PokemonDetails = lazy(() => import("./apps/Pokeverse/PokemonDetails/PokemonDetails"));
const BattleSimLayout = lazy(() => import("./apps/Pokeverse/BattleSimLayout/BattleSimLayout"));
const BattleSetup = lazy(() => import("./apps/Pokeverse/BattleSetup/BattleSetup"));
const BattleScreen = lazy(() => import("./apps/Pokeverse/BattleScreen/BattleScreen"));
const TeamSelection = lazy(() => import("./apps/Pokeverse/TeamSelection/TeamSelection"));
const PrepareBattle = lazy(() => import("./apps/Pokeverse/PrepareBattle/PrepareBattle"));

// Blogify
const BlogLayout = lazy(() => import("./apps/Blogify/pages/BlogLayout"));
const BlogHome = lazy(() => import("./apps/Blogify/pages/BlogHome"));
const Discover = lazy(() => import("./apps/Blogify/pages/Discover"));
const MyLibrary = lazy(() => import("./apps/Blogify/pages/MyLibrary"));
const WriteBlog = lazy(() => import("./apps/Blogify/pages/WriteBlog"));
const BlogDetails = lazy(() => import("./apps/Blogify/pages/BlogDetails"));
const BlogList = lazy(() => import("./apps/Blogify/pages/BlogList"));
const NotebookDetail = lazy(() => import("./apps/Blogify/pages/NotebookDetail"));
const NotebookForm = lazy(() => import("./apps/Blogify/pages/NotebookForm"));
const NotebookList = lazy(() => import("./apps/Blogify/pages/NotebookList"));

// BudgetBuddy
const BudgetLayout = lazy(() => import("./apps/BudgetBuddy/components/BudgetLayout"));
const BudgetHome = lazy(() => import("./apps/BudgetBuddy/pages/BudgetHome"));
const Overview = lazy(() => import("./apps/BudgetBuddy/pages/Overview"));
const Statistics = lazy(() => import("./apps/BudgetBuddy/pages/Statistics"));

// Formlyst
const FormDashboard = lazy(() => import("./apps/Formlyst/Dashboard/Dashboard"));
const FormBuilder = lazy(() => import("./apps/Formlyst/Builder/Builder"));
const FormPublic = lazy(() => import("./apps/Formlyst/FormPublic/Public"));
const FormReview = lazy(() => import("./apps/Formlyst/FormReview/Review"));
const Responses = lazy(() => import("./apps/Formlyst/Responses/Responses"));
const ResponseDetail = lazy(() => import("./apps/Formlyst/ResponseDetail/ResponseDetail"));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            // Public mini-apps
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