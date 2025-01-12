import { useAuth } from '../../auth/AuthProvider';
import { useColorScheme } from '@mui/joy';
import JobScapeAuth from './pages/JobscapeAuth';

const Jobscape = () => {
    const { mode } = useColorScheme();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <JobScapeAuth mode={mode} />
    }

    return (
        <div>Jobscape</div>
    )
}

export default Jobscape