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
import { useAppDispatch } from './store/useRedux';
import { ThemeProvider } from './styles/ThemeContext';

function AppInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuthThunk());
  }, [dispatch]);

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