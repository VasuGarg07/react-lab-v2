import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { RouterProvider } from "react-router-dom";
import { router } from "./shared/Router";
import "./styles/styles.scss";
import theme from "./styles/theme";
import Background from "./components/Background";
import { AlertProvider } from "./shared/AlertProvider";
import { AuthProvider } from "./auth/AuthProvider";

function App() {

  return (
    <AlertProvider>
      <AuthProvider>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <Background>
            <RouterProvider router={router} />
          </Background>
        </CssVarsProvider>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;