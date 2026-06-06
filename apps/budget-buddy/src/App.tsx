import {
    AuthProvider, AuthWrapper,
    ForgotPassword,
    Login,
    OAuthCallback,
    protectedLoader, publicOnlyLoader,
    Register,
} from '@react-lab/auth';
import { queryClient } from '@react-lab/shared';
import { ModalProvider } from '@react-lab/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@react-lab/auth/src/index.css';
import BudgetLayout from './components/BudgetLayout';
import BudgetHome from './pages/BudgetHome';
import Overview from './pages/Overview';
import Statistics from './pages/Statistics';
import { store } from './store/store';

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthWrapper appName="BudgetBuddy" />,
        loader: publicOnlyLoader,
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: '/auth/callback', element: <OAuthCallback /> }
        ],
    },
    {
        path: '/',
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
        element: <Navigate to="/home" replace />,
    },
]);

export default function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ModalProvider>
                    <AuthProvider>
                        <RouterProvider router={router} />
                    </AuthProvider>
                    <ToastContainer stacked limit={5} position="bottom-right" />
                </ModalProvider>
            </QueryClientProvider>
        </Provider>
    );
}
