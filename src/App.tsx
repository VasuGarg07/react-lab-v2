import { AuthProvider } from "@/auth/AuthProvider";
import { Router } from "@/shared/Router";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from "./styles/ThemeProvider";
import AppBackground from "./components/AppBackground";
import { ToastContainer } from 'react-toastify';
import "@/styles/styles.css";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <AppBackground>
            <RouterProvider router={Router} />
          </AppBackground>
        </AuthProvider>
        <ToastContainer stacked limit={5} position="bottom-right" />
      </ThemeProvider>
    </>
  );
}

export default App;