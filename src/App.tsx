import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { router } from "./shared/Router";
import "./styles/styles.scss";
import theme from "./styles/theme";

function App() {

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {/* Navbar */}
      <Navbar />
      {/* Main Apps */}
      <RouterProvider router={router}></RouterProvider>
    </CssVarsProvider>
  );
}

export default App;