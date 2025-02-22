import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { RouterProvider } from "react-router/dom";
import { router } from "@/shared/Router";
import "@/styles/styles.scss";
import theme from "@/styles/theme";
import { AuthProvider } from "@/auth/AuthProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <AuthProvider>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </CssVarsProvider>
      </AuthProvider>
      <ToastContainer stacked limit={5} />
    </>
  );
}

export default App;