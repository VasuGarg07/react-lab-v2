import { useAuth } from '../../auth/AuthProvider';
import { Box, useColorScheme } from '@mui/joy';
import JobScapeAuth from './pages/JobscapeAuth';
import { Outlet } from 'react-router-dom';
import JobNav from './components/JobNav';

const Jobscape = () => {
    const { mode } = useColorScheme();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <JobScapeAuth mode={mode} />
    }

    return (
        <Box>
            <JobNav userType={'none'} />
            <Outlet />
        </Box>
    )
}

export default Jobscape