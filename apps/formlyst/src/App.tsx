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
import Dashboard from './Dashboard/Dashboard';
import Builder from './Builder/Builder';
import Responses from './Responses/Responses';
import ResponseDetail from './ResponseDetail/ResponseDetail';
import Public from './FormPublic/Public';
import Review from './FormReview/Review';

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
