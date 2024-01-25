import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../apps/Home/Home";
import NotFound from "../apps/Errors/NotFound";
import Glassmorphism from "../apps/Glassmorphism/Glassmorphism";
import Homeloan from "../apps/HomeloadWizard/Homeloan";
import PokeMemory from "../apps/PokeMemory/PokeMemory";
import WalletWise from "../apps/WalletWise/WalletWise";
import Quizzo from "../apps/Quizzo/Quizzo";
import QuickByte from "../apps/QuickByte/QuickByte";
import MealDetails from "../apps/QuickByte/Details";
import { mealDetails } from "../apps/QuickByte/utils/api";
import Wrapper from "../apps/QuickByte/Wrapper";

export const router = createBrowserRouter([
  {
    path: '',
    element: <Home />,
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
    path: 'wallet-wise',
    element: <WalletWise />
  },
  {
    path: 'quizzo',
    element: <Quizzo />
  },
  {
    path: 'quick-byte',
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <QuickByte />
      },
      {
        path: 'random',
        element: <Wrapper children={<MealDetails />} />,
        loader: mealDetails
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export const navigate = router.navigate; 