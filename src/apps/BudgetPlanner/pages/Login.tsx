import React from 'react';
import { Typography, Button, AspectRatio } from '@mui/joy';
import { useAuth } from '../../../shared/AuthContext';
import { Navigate } from 'react-router-dom';
import { BgCenteredBox } from '../../../components/BgCenteredBox';
import NoUser from '../../../assets/no-user.png';

const Login: React.FC = () => {
    const { user, signInWithGoogle } = useAuth();

    if (user) {
        return <Navigate to="/budget-planner/dashboard" />;
    }

    const handleLogin = async () => {
        await signInWithGoogle();
    };

    return (
        <BgCenteredBox>
            <AspectRatio ratio={1} objectFit='cover' sx={{
                maxWidth: 200,
                width: 1
            }}>
                <img src={NoUser} alt="User Not Found" />
            </AspectRatio>
            <Typography level="title-lg" fontWeight={400} letterSpacing={1} fontFamily={'Overlock'} textAlign='center'>
                Please log in to access your budget dashboard and manage your expenses.
            </Typography>
            <Button onClick={handleLogin}
                sx={{
                    mt: 2
                }}>
                Login with Google
            </Button>
        </BgCenteredBox>
    );
};

export default Login;
