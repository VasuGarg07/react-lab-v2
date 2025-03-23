import { AuthProvider } from "@/auth/AuthProvider";
import { Router } from "@/shared/Router";
import "@/styles/styles.css";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "./styles/ThemeProvider";
import AppBackground from "./components/AppBackground";

function App() {

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <AppBackground>
            <RouterProvider router={Router} />
          </AppBackground>
        </AuthProvider>
        <ToastContainer stacked limit={5} />
      </ThemeProvider>
    </>
  );
}

export default App;