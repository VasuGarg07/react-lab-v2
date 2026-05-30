import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, ModalProvider, Layout } from '@react-lab/ui';
import { queryClient } from '@react-lab/shared';
import {
    AuthProvider, AuthWrapper,
    Login, Register, ForgotPassword,
    protectedLoader, publicOnlyLoader,
} from '@react-lab/auth';
import { store } from './store/store';
import BudgetLayout from './components/BudgetLayout';
import BudgetHome from './pages/BudgetHome';
import Overview from './pages/Overview';
import Statistics from './pages/Statistics';

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthWrapper />,
        loader: publicOnlyLoader,
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
        ],
    },
    {
        path: '/budgetbuddy',
        element: <BudgetLayout />,
        loader: protectedLoader,
        children: [
            { index: true, element: <Navigate to="home" replace /> },
            { path: 'home', element: <BudgetHome /> },
            { path: 'overview', element: <Overview /> },
            { path: 'statistics', element: <Statistics /> },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/budgetbuddy/home" replace />,
    },
]);

export default function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <ModalProvider>
                        <Layout>
                            <AuthProvider>
                                <RouterProvider router={router} />
                            </AuthProvider>
                        </Layout>
                        <ToastContainer stacked limit={5} position="bottom-right" />
                    </ModalProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
}
