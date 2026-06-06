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
import Builder from './Builder/Builder';
import Dashboard from './Dashboard/Dashboard';
import Public from './FormPublic/Public';
import Review from './FormReview/Review';
import ResponseDetail from './ResponseDetail/ResponseDetail';
import Responses from './Responses/Responses';
import { store } from './store/store';

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthWrapper appName="Formlyst" />,
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
        path: '/formlyst',
        loader: protectedLoader,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'new', element: <Builder /> },
            { path: ':id/edit', element: <Builder /> },
            { path: ':id/responses', element: <Responses /> },
            { path: ':id/responses/:responseId', element: <ResponseDetail /> },
        ],
    },
    // Public routes — no auth required
    { path: '/formlyst/fill/:shareUrl', element: <Public /> },
    { path: '/formlyst/fill/:shareUrl/review', element: <Review /> },
    {
        path: '*',
        element: <Navigate to="/formlyst" replace />,
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
