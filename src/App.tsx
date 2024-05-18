import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { RouterProvider } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import { router } from "./shared/Router";
import "./styles/styles.scss";
import theme from "./styles/theme";
import { AuthProvider } from "./shared/AuthContext";

function App() {

  return (
    <AuthProvider>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {/* Navbar */}
        <Navbar />
        {/* Main Apps */}
        <RouterProvider router={router} />
      </CssVarsProvider>
    </AuthProvider>
  );
}

export default App;