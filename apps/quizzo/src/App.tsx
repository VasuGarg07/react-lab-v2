import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, Layout } from '@react-lab/ui';
import { queryClient } from '@react-lab/shared';
import { store } from './store/store';
import QuizWrapper from './QuizWrapper';
import QuizSetup from './QuizSetup';
import QuizBoard from './QuizBoard';
import QuizResult from './QuizResult';

const router = createBrowserRouter([
    {
        path: '/quizzo',
        element: <QuizWrapper />,
        children: [
            { index: true, element: <QuizSetup /> },
            { path: 'play', element: <QuizBoard /> },
            { path: 'result', element: <QuizResult /> },
        ],
    },
    {
        path: '*',
        element: <QuizWrapper />,
        children: [{ index: true, element: <QuizSetup /> }],
    },
]);

export default function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Layout>
                        <RouterProvider router={router} />
                    </Layout>
                    <ToastContainer stacked limit={5} position="bottom-right" />
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
}
