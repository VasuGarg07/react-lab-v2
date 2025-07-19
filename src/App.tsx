import { AuthProvider } from "@/auth/AuthProvider";
import { Router } from "@/shared/Router";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from "./styles/ThemeProvider";
import AppBackground from "./components/AppBackground";
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "@/styles/styles.css";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

export default function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AppBackground>
              <RouterProvider router={Router} />
            </AppBackground>
          </AuthProvider>
          <ToastContainer stacked limit={5} position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}