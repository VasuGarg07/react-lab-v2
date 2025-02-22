import { useColorScheme } from '@mui/joy';
import { Outlet } from 'react-router';
import { useAuth } from '../../auth/AuthProvider';
import JobScapeAuth from './pages/JobscapeAuth';
import { JobscapeProvider } from './JobscapeProvider';

const Jobscape = () => {
    const { mode } = useColorScheme();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <JobScapeAuth mode={mode} />
    }

    return (
        <JobscapeProvider>
            <Outlet />
        </JobscapeProvider>
    )
}

export default Jobscape