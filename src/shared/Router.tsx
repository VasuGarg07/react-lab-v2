import Blogify from "@/apps/Blogify/Blogify";
import { blogDetailLoader, blogListLoader, homeLoader, myBlogsLoader, publishBlogAction, publishBlogLoader } from "@/apps/Blogify/helpers/blog-router.actions";
import BlogDetail from "@/apps/Blogify/pages/BlogDetail";
import BlogHome from "@/apps/Blogify/pages/BlogHome";
import BlogListPage from "@/apps/Blogify/pages/BlogList";
import MyBlogs from "@/apps/Blogify/pages/MyBlogs";
import PublishBlog from "@/apps/Blogify/pages/PublishBlog";
import BudgetBuddy from "@/apps/BudgetBuddy/BudgetBuddy";
import HomePage from "@/apps/BudgetBuddy/pages/Homepage";
import Overview from "@/apps/BudgetBuddy/pages/Overview";
import Statistics from "@/apps/BudgetBuddy/pages/Statistics";
import Timeline from "@/apps/BudgetBuddy/pages/Timeline";
import FormReview from "@/apps/FormBuilder/pages/FormReview";
import Formlyst from "@/apps/FormBuilder/Formlyst";
import FormBuilder from "@/apps/FormBuilder/pages/FormBuilder";
import FormDashboard from "@/apps/FormBuilder/pages/FormDashboard";
import FormPublic from "@/apps/FormBuilder/pages/FormPublic";
import Home from "@/apps/Home/Home";
import HomeloanWizard from "@/apps/HomeloanWizard/HomeloanWizard";
import { LoanProvider } from "@/apps/HomeloanWizard/LoanContext";
import { InvoiceProvider } from "@/apps/InvoEase/InvoiceContext";
import JsonTreeViewer from "@/apps/JsonViewer/JsonViewer";
import PokeMemory from "@/apps/PokeMemory/PokeMemory";
import { BattleProvider } from "@/apps/Pokeverse/context/BattleSimContext";
import { PokedexProvider } from "@/apps/Pokeverse/context/PokedexContext";
import { BattleScreen } from "@/apps/Pokeverse/pages/BattleScreen";
import { PlayerSetupScreen } from "@/apps/Pokeverse/pages/PlayerSetup";
import Pokedex from "@/apps/Pokeverse/pages/Pokedex";
import PokemonDetails from "@/apps/Pokeverse/pages/PokemonDetails";
import Pokeverse from "@/apps/Pokeverse/pages/Pokeverse";
import { TeamSelectionScreen } from "@/apps/Pokeverse/pages/TeamSelection";
import Details from "@/apps/QuickByte/Details";
import Gallery from "@/apps/QuickByte/Gallery";
import RecipeHaven from "@/apps/QuickByte/RecipeHaven";
import { alphabetMeals, categoryMeals, mealDetails, regionalMeals, searchMeals } from "@/apps/QuickByte/utils/recipe.api";
import Wrapper from "@/apps/QuickByte/Wrapper";
import Quizzo from "@/apps/Quizzo/Quizzo";
import SnapFind from "@/apps/SnapFind/SnapFind";
import Sudoku from "@/apps/Sudoku/Sudoku";
import SuperTicTacToe from "@/apps/SuperTicTacToe/SuperTicTacToe";
import SortingVisualizer from "@/apps/Visualizer/Visualizer";
import AuthWrapper from "@/auth/AuthWrapper";
import ForgotPassword from "@/auth/ForgotPassword";
import Login from "@/auth/Login";
import Register from "@/auth/Register";
import Navbar from "@/components/Navbar";
import { Navigate, Outlet, ScrollRestoration, createBrowserRouter } from "react-router";
import FormResponses from "@/apps/FormBuilder/pages/FormResponses";

const Layout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
    <ScrollRestoration />
  </>
)

const routes = [
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'formlyst',
        element: <Formlyst />,
        children: [
          { index: true, element: <FormDashboard /> },
          { path: 'builder', element: <FormBuilder /> },
          { path: 'builder/:formId', element: <FormBuilder /> },
          { path: ':formId/responses', element: <FormResponses /> }
        ]
      },
      { path: 'formlyst-public/:shareUrl', element: <FormPublic /> },
      { path: 'formlyst-public/:shareUrl/review', element: <FormReview /> },
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
      {
        path: 'blogify',
        element: <Blogify />,
        children: [
          { path: 'home', element: <BlogHome />, loader: homeLoader },
          { path: 'publish', element: <PublishBlog />, loader: publishBlogLoader, action: publishBlogAction },
          { path: 'edit/:blogId', element: <PublishBlog />, loader: publishBlogLoader, action: publishBlogAction },
          { path: 'list', element: <BlogListPage />, loader: blogListLoader },
          { path: 'list/:author', element: <BlogListPage />, loader: blogListLoader },
          { path: 'me', element: <MyBlogs />, loader: myBlogsLoader },
          { path: 'blog/:blogId', element: <BlogDetail />, loader: blogDetailLoader },
          { path: '', element: <Navigate to='home' replace /> },
          { path: '*', element: <Navigate to='home' replace /> },
        ]
      },
      {
        path: 'budget-buddy',
        element: <BudgetBuddy />,
        children: [
          { path: 'home', element: <HomePage /> },
          { path: 'overview', element: <Overview /> },
          { path: 'statistics', element: <Statistics /> },
          { path: 'timeline', element: <Timeline /> },
          { path: '', element: <Navigate to='home' replace /> },
          { path: '*', element: <Navigate to='home' replace /> },
        ]
      },
      {
        path: 'pokeverse',
        element: <PokedexProvider />,
        children: [
          { index: true, element: <Pokeverse /> },
          { path: 'pokedex', element: <Pokedex /> },
          { path: 'pokedex/:id', element: <PokemonDetails /> },
          {
            path: 'battle-sim',
            element: <BattleProvider />,
            children: [
              { index: true, element: <PlayerSetupScreen /> },
              { path: 'team-selection', element: <TeamSelectionScreen /> },
              { path: 'battle', element: <BattleScreen /> },
            ]
          }
        ]
      },
      {
        path: 'recipe-haven',
        element: <><Outlet /><ScrollRestoration /></>, // Handles Outlet + ScrollRestoration
        children: [
          { path: '', element: <RecipeHaven /> },
          { path: 'search/:searchTerm', element: <Wrapper children={<Gallery />} />, loader: searchMeals },
          { path: 'category/:categoryId', element: <Wrapper children={<Gallery />} />, loader: categoryMeals },
          { path: 'region/:areaId', element: <Wrapper children={<Gallery />} />, loader: regionalMeals },
          { path: 'alphabet/:letter', element: <Wrapper children={<Gallery />} />, loader: alphabetMeals },
          { path: 'area/:areaId', element: <Wrapper children={<Gallery />} />, loader: regionalMeals },
          { path: 'meal/:mealId', element: <Wrapper children={<Details />} />, loader: mealDetails },
        ]
      },
      { path: 'homeloan-wizard', element: <LoanProvider><HomeloanWizard /></LoanProvider> },
      { path: 'invoease', element: <InvoiceProvider /> },
      { path: 'sorting-visualizer', element: <SortingVisualizer /> },
      { path: 'super-tic-tac-toe', element: <SuperTicTacToe /> },
      { path: 'sudoku', element: <Sudoku /> },
      { path: 'poke-memory', element: <PokeMemory /> },
      { path: 'snapfind', element: <SnapFind /> },
      { path: 'quizzo', element: <Quizzo /> },
      { path: 'json', element: <JsonTreeViewer /> },
      { path: '*', redirect: '' },
    ]
  }
];


export const Router = createBrowserRouter(routes);
export const navigate = Router.navigate; 