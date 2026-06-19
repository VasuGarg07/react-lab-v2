import { Navigate } from 'react-router';
import { useJobscape } from '../hooks/useJobscape';
import { ROUTES } from '../helpers/job.constants';

export default function Home() {
    const { role } = useJobscape();
    return <Navigate to={role === 'employer' ? ROUTES.manage : ROUTES.jobs} replace />;
}
