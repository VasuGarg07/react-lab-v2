import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider';
import { JobRoles } from '@/apps/Jobscape/helpers/job.types';

const RoleGuard: React.FC<{ guardRole: JobRoles }> = ({ guardRole }) => {
    const { isRegistered, role, loading } = useJobscape();

    if (loading) {
        return <div>Loading...</div>;  // Placeholder for a loader component
    }

    if (!isRegistered || role !== guardRole) {
        return <Navigate to="/jobscape" replace />;
    }

    return <Outlet />;
}

export default RoleGuard;