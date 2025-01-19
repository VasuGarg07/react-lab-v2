import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useJobscape } from '../JobscapeProvider';
import { JobRoles } from '../helpers/job.types';

const RoleGuard: React.FC<{ guardRole: JobRoles }> = ({ guardRole }) => {
    const { isRegistered, role } = useJobscape();

    if (!isRegistered || role !== guardRole) {
        return <Navigate to="/jobscape" replace />;
    }

    return <Outlet />;
}

export default RoleGuard;