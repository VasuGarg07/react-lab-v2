import { AuthProvider } from "@/auth/AuthProvider";
import { Router } from "@/shared/Router";
import "@/styles/styles.css";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "./styles/ThemeProvider";

function App() {

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={Router} />
        </AuthProvider>
        <ToastContainer stacked limit={5} />
      </ThemeProvider>
    </>
  );
}

export default App;