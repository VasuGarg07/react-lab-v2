import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { RouterProvider } from "react-router/dom";
import { Router } from "@/shared/Router";
import { AuthProvider } from "@/auth/AuthProvider";
import { ToastContainer } from 'react-toastify';
import theme from "@/styles/theme";
import "@/styles/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "./styles/ThemeProvider";

function App() {

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <CssVarsProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={Router} />
          </CssVarsProvider>
        </AuthProvider>
        <ToastContainer stacked limit={5} />
      </ThemeProvider>
    </>
  );
}

export default App;