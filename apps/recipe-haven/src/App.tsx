import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryClient } from '@react-lab/shared';
import RecipeHaven from './RecipeHaven';
import MealWrapper from './MealWrapper';
import MealGallery from './MealGallery';
import MealDetails from './MealDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RecipeHaven />,
    },
    {
        path: '/',
        element: <MealWrapper />,
        children: [
            { path: 'search/:searchTerm', element: <MealGallery /> },
            { path: 'category/:categoryId', element: <MealGallery /> },
            { path: 'alphabet/:letter', element: <MealGallery /> },
            { path: 'area/:areaId', element: <MealGallery /> },
            { path: 'meal/:mealId', element: <MealDetails /> },
        ],
    },
    {
        path: '*',
        element: <RecipeHaven />,
    },
]);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer stacked limit={5} position="bottom-right" />
        </QueryClientProvider>
    );
}
