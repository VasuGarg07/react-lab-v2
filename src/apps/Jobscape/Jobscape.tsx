import { useColorScheme } from '@mui/joy';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import JobScapeAuth from './pages/JobscapeAuth';

const Jobscape = () => {
    const { mode } = useColorScheme();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <JobScapeAuth mode={mode} />
    }

    return (
        // <JobscapeProvider>
        <Outlet />
        // </JobscapeProvider>
    )
}

export default Jobscape