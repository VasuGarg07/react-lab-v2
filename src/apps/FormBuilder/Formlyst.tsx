import { useAuth } from '@/auth/AuthProvider';
import LoginPrompt from '@/components/LoginPrompt';
import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router';

const Formlyst: React.FC = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <LoginPrompt
            title='Welcome to Formlyst'
            caption='Design smarter forms, without the friction.'
            image='/form-hero.png'
        />;
    }

    return (
        <>
            <Outlet />
            <ScrollRestoration />
        </>
    )
}

export default Formlyst;