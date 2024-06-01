import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { RouterProvider } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import { router } from "./shared/Router";
import "./styles/styles.scss";
import theme from "./styles/theme";
import { AuthProvider } from "./shared/AuthContext";
import Background from "./components/global/Background";
import { AlertProvider } from "./shared/AlertProvider";

function App() {

  return (
    <AuthProvider>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Background>
          <AlertProvider>
            {/* Navbar */}
            <Navbar />
            {/* Main Apps */}
            <RouterProvider router={router} />
          </AlertProvider>
        </Background>
      </CssVarsProvider>
    </AuthProvider>
  );
}

export default App;