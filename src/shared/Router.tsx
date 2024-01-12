import { createBrowserRouter } from "react-router-dom";
import Home from "../apps/Home/Home";
import NotFound from "../apps/Errors/NotFound";
import Glassmorphism from "../apps/Glassmorphism/Glassmorphism";
import Homeloan from "../apps/HomeloadWizard/Homeloan";
import PokeMemory from "../apps/PokeMemory/PokeMemory";

export const router = createBrowserRouter([
  {
    path: '/',
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
    path: "*",
    element: <NotFound />,
  }
]);