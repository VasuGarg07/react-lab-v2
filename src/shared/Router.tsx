import { Outlet, ScrollRestoration, createBrowserRouter } from "react-router-dom";
import NotFound from "../apps/Errors/NotFound";
import Glassmorphism from "../apps/Glassmorphism/Glassmorphism";
import Home from "../apps/Home/Home";
import Homeloan from "../apps/HomeloanWizard/Homeloan";
import InvoEase from "../apps/InvoEase/InvoEase";
import LeetcodeRivals from "../apps/LeetcodeRivals/LeetcodeRivals";
import PokeMemory from "../apps/PokeMemory/PokeMemory";
import Details from "../apps/QuickByte/Details";
import Gallery from "../apps/QuickByte/Gallery";
import RecipeHaven from "../apps/QuickByte/RecipeHaven";
import { alphabetMeals, categoryMeals, mealDetails, regionalMeals, searchMeals } from "../apps/QuickByte/utils/api";
import Wrapper from "../apps/QuickByte/Wrapper";
import Quizzo from "../apps/Quizzo/Quizzo";
import { ResumeProvider } from "../apps/ResumeGen/context/ResumeContext";
import ResumeEdge from "../apps/ResumeGen/pages/ResumeEdge";
import ResumeForm from "../apps/ResumeGen/pages/ResumeForm";
import ResumePreview from "../apps/ResumeGen/pages/ResumePreview";
import SleekResume from "../apps/ResumeGen/templates/Sleek";
import SnapFind from "../apps/SnapFind/SnapFind";
import Sudoku from "../apps/Sudoku/Sudoku";
import SuperTicTacToe from "../apps/SuperTicTacToe/SuperTicTacToe";
import SortingVisualizer from "../apps/Visualizer/Visualizer";
import MainLayout from "../components/MainLayout";
import BluePrintResume from "../apps/ResumeGen/templates/BluePrint";
import ClassicResume from "../apps/ResumeGen/templates/Classic";
import MinimalistResume from "../apps/ResumeGen/templates/Minimalist";

export const router = createBrowserRouter([
  {
    path: '',
    element: <>
      <MainLayout />
      <ScrollRestoration />
    </>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'resume',
        element: <ResumeProvider><Outlet /></ResumeProvider>,
        children: [
          {
            path: '',
            element: <ResumeEdge />
          },
          {
            path: 'form',
            element: <ResumeForm />
          },
          {
            path: 'preview',
            element: <ResumePreview />
          },
          {
            path: 'test',
            element: <MinimalistResume />
          }
        ]
      },
      {
        path: 'invoease',
        element: <InvoEase />
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