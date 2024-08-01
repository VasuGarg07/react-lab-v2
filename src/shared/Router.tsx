import { Navigate, Outlet, ScrollRestoration, createBrowserRouter } from "react-router-dom";
import Home from "../apps/Home/Home";
import NotFound from "../apps/Errors/NotFound";
import Glassmorphism from "../apps/Glassmorphism/Glassmorphism";
import Homeloan from "../apps/HomeloanWizard/Homeloan";
import PokeMemory from "../apps/PokeMemory/PokeMemory";
import Quizzo from "../apps/Quizzo/Quizzo";
import RecipeHaven from "../apps/QuickByte/RecipeHaven";
import { alphabetMeals, categoryMeals, mealDetails, regionalMeals, searchMeals } from "../apps/QuickByte/utils/api";
import Wrapper from "../apps/QuickByte/Wrapper";
import Gallery from "../apps/QuickByte/Gallery";
import Details from "../apps/QuickByte/Details";
import SnapFind from "../apps/SnapFind/SnapFind";
import LeetcodeRivals from "../apps/LeetcodeRivals/LeetcodeRivals";
import Sudoku from "../apps/Sudoku/Sudoku";
import SuperTicTacToe from "../apps/SuperTicTacToe/SuperTicTacToe";
import MainLayout from "../components/MainLayout";
import SortingVisualizer from "../apps/Visualizer/Visualizer";
import BudgetPlanner from "../apps/BudgetPlanner/BudgetPlanner";
import Incomes from "../apps/BudgetPlanner/pages/Budgets";
import Settings from "../apps/BudgetPlanner/pages/Settings";
import Dashboard from "../apps/BudgetPlanner/pages/Dashboard";
import ProtectedRoute from "../apps/BudgetPlanner/components/ProtectedRoute";
import Login from "../apps/BudgetPlanner/pages/Login";
import Expenses from "../apps/BudgetPlanner/pages/Expenses";
import Investments from "../apps/BudgetPlanner/pages/Investments";

export const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'budget-planner',
        element: <BudgetPlanner />,
        children: [
          {
            path: '',
            element: <ProtectedRoute />,
            children: [
              { path: '', element: <Navigate to="dashboard" /> },
              { path: 'dashboard', element: <Dashboard /> },
              { path: 'incomes', element: <Incomes /> },
              { path: 'expenses', element: <Expenses /> },
              { path: 'investments', element: <Investments /> },
              { path: 'settings', element: <Settings /> },
            ],
          },
          { path: 'login', element: <Login /> },
        ],

      },
      {
        path: 'sorting-visualizer',
        element: <SortingVisualizer />
      },
      {
        path: 'super-tic-tac-toe',
        element: <SuperTicTacToe />
      },
      {
        path: 'sudoku',
        element: <Sudoku />
      },
      {
        path: 'leetcode-rivals',
        element: <LeetcodeRivals />
      },
      {
        path: 'glassmorphism',
        element: <Glassmorphism />,
      },
      {
        path: 'homeloan-wizard',
        element: <Homeloan />
      },
      {
        path: 'poke-memory',
        element: <PokeMemory />
      },
      {
        path: 'snapfind',
        element: <SnapFind />
      },
      {
        path: 'quizzo',
        element: <Quizzo />
      },
      {
        path: 'recipe-haven',
        element: <>
          <Outlet />
          <ScrollRestoration />
        </>,
        children: [
          {
            path: '',
            element: <RecipeHaven />
          },
          {
            path: 'search/:searchTerm',
            element: <Wrapper children={<Gallery />} />,
            loader: searchMeals
          },
          {
            path: 'category/:categoryId',
            element: <Wrapper children={<Gallery />} />,
            loader: categoryMeals
          },
          {
            path: 'region/:areaId',
            element: <Wrapper children={<Gallery />} />,
            loader: regionalMeals
          },
          {
            path: 'alphabet/:letter',
            element: <Wrapper children={<Gallery />} />,
            loader: alphabetMeals
          },
          {
            path: 'area/:areaId',
            element: <Wrapper children={<Gallery />} />,
            loader: regionalMeals
          },
          {
            path: 'meal/:mealId',
            element: <Wrapper children={<Details />} />,
            loader: mealDetails
          },
        ]
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
]);

export const navigate = router.navigate; 