import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalProvider } from './components/ModalContext';
import router from './Router';
import { queryClient } from './shared/queryClient';
import { initializeAuthThunk } from './store/authSlice';
import { store } from './store/store';
import { useAppDispatch, useAppSelector } from './store/useRedux';
import { ThemeProvider } from './styles/ThemeContext';

// Separate component to access Redux hooks
function AppInitializer() {
  const dispatch = useAppDispatch();
  const initializing = useAppSelector(state => state.auth.initializing);

  useEffect(() => {
    // Initialize auth on app mount
    dispatch(initializeAuthThunk());
  }, [dispatch]);

  // Show loading screen while checking auth state
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-700 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider>
            <ModalProvider>
              <AppInitializer />
            </ModalProvider>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
      <ToastContainer stacked limit={5} position="bottom-right" />
    </>
  );
}

export default App;