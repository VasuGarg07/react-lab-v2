import { Navigate, Outlet } from 'react-router';
import { useJobscape } from '../hooks/useJobscape';
import { ROUTES } from '../helpers/job.constants';
import type { JobRole } from '../helpers/job.types';

export function RoleGuard({ role }: { role: JobRole }) {
    const { role: currentRole } = useJobscape();
    if (currentRole === null) return <Navigate to={ROUTES.onboarding} replace />;
    if (currentRole !== role) return <Navigate to={ROUTES.home} replace />;
    return <Outlet />;
}
