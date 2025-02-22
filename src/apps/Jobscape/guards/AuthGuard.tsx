import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider';

const AuthGaurd: React.FC = () => {
    const { isRegistered } = useJobscape();

    if (isRegistered) {
        return <Navigate to="/jobscape" replace />;
    }

    return <Outlet />;
}

export default AuthGaurd;