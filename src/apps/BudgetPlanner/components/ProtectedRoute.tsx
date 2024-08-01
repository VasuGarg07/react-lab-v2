import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../shared/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/budget-planner/login" />;

};

export default ProtectedRoute;
