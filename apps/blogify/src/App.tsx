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
import BlogDetails from './pages/BlogDetails';
import BlogHome from './pages/BlogHome';
import BlogLayout from './pages/BlogLayout';
import BlogList from './pages/BlogList';
import Discover from './pages/Discover';
import MyLibrary from './pages/MyLibrary';
import NotebookDetail from './pages/NotebookDetail';
import NotebookForm from './pages/NotebookForm';
import NotebookList from './pages/NotebookList';
import WriteBlog from './pages/WriteBlog';
import { store } from './store/store';

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthWrapper appName="Blogify" />,
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
        path: '/blogify',
        element: <BlogLayout />,
        loader: protectedLoader,
        children: [
            { index: true, element: <Navigate to="home" replace /> },
            { path: 'home', element: <BlogHome /> },
            { path: 'discover', element: <Discover /> },
            { path: 'library', element: <MyLibrary /> },
            { path: 'write', element: <WriteBlog /> },

            { path: 'notebooks/create', element: <NotebookForm /> },
            { path: 'notebooks/edit/:notebookId', element: <NotebookForm /> },
            { path: 'notebooks/author/:author', element: <NotebookList /> },
            { path: 'notebooks/:notebookId', element: <NotebookDetail /> },

            { path: 'blogs/author/:author', element: <BlogList /> },
            { path: 'blogs/edit/:blogId', element: <WriteBlog /> },
            { path: 'blogs/:blogId', element: <BlogDetails /> },

            { path: '*', element: <Navigate to="home" replace /> },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/blogify/home" replace />,
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
