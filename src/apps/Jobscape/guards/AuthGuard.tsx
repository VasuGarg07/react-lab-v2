import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useJobscape } from '../JobscapeProvider';

const AuthGaurd: React.FC = () => {
    const { isRegistered } = useJobscape();

    if (isRegistered) {
        return <Navigate to="/jobscape" replace />;
    }

    return <Outlet />;
}

export default AuthGaurd;