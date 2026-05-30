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
import BlogLayout from './pages/BlogLayout';
import BlogHome from './pages/BlogHome';
import Discover from './pages/Discover';
import MyLibrary from './pages/MyLibrary';
import WriteBlog from './pages/WriteBlog';
import BlogDetails from './pages/BlogDetails';
import BlogList from './pages/BlogList';
import NotebookForm from './pages/NotebookForm';
import NotebookDetail from './pages/NotebookDetail';
import NotebookList from './pages/NotebookList';

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
