import { AuthProvider } from "@/auth/AuthProvider";
import { Router } from "@/shared/Router";
import "@/styles/styles.css";
import { RouterProvider } from "react-router/dom";
import { ToastProvider } from "./shared/ToastProvider";
import { ThemeProvider } from "./styles/ThemeProvider";
import AppBackground from "./components/AppBackground";

function App() {

  return (
    <>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <AppBackground>
              <RouterProvider router={Router} />
            </AppBackground>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;