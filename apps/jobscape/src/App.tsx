import {
    AuthProvider,
    AuthWrapper,
    ForgotPassword,
    Login,
    OAuthCallback,
    protectedLoader,
    publicOnlyLoader,
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

import { store } from './store/store';
import { JobscapeGate } from './guards/JobscapeGate';
import { RoleGuard } from './guards/RoleGuard';

import JobLayout from './pages/JobLayout';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import RegisterApplicant from './pages/RegisterApplicant';
import RegisterEmployer from './pages/RegisterEmployer';
import JobsList from './pages/JobsList';
import JobDetails from './pages/JobDetails';
import CompaniesList from './pages/CompaniesList';
import CompanyDetails from './pages/CompanyDetails';
import MyApplications from './pages/MyApplications';
import SavedJobs from './pages/SavedJobs';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EmployerJobs from './pages/employer/EmployerJobs';
import PostJob from './pages/employer/PostJob';
import EditJob from './pages/employer/EditJob';
import JobApplicants from './pages/employer/JobApplicants';

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthWrapper appName="Jobscape" />,
        loader: publicOnlyLoader,
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: '/auth/callback', element: <OAuthCallback /> },
        ],
    },
    {
        path: '/',
        loader: protectedLoader,
        element: <JobscapeGate />,
        children: [
            { path: 'onboarding', element: <Onboarding /> },
            { path: 'onboarding/applicant', element: <RegisterApplicant /> },
            { path: 'onboarding/employer', element: <RegisterEmployer /> },

            {
                element: <JobLayout />,
                children: [
                    { index: true, element: <Home /> },
                    { path: 'profile', element: <Profile /> },
                    { path: 'settings', element: <Settings /> },

                    {
                        element: <RoleGuard role="applicant" />,
                        children: [
                            { path: 'jobs', element: <JobsList /> },
                            { path: 'jobs/:id', element: <JobDetails /> },
                            { path: 'companies', element: <CompaniesList /> },
                            { path: 'companies/:id', element: <CompanyDetails /> },
                            { path: 'applications', element: <MyApplications /> },
                            { path: 'saved', element: <SavedJobs /> },
                        ],
                    },
                    {
                        path: 'manage',
                        element: <RoleGuard role="employer" />,
                        children: [
                            { index: true, element: <EmployerJobs /> },
                            { path: 'new', element: <PostJob /> },
                            { path: ':id/edit', element: <EditJob /> },
                            { path: ':id/applicants', element: <JobApplicants /> },
                        ],
                    },
                ],
            },
        ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
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
