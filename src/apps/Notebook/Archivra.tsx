import { useAuth } from '@/auth/AuthProvider';
import LoginPrompt from '@/components/LoginPrompt';
import React from 'react'

const Archivra: React.FC = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <LoginPrompt
            title="Welcome to Archivra"
            caption="Jot, journal, and journey your way through notebooks and chapters. Archivra keeps your ideas tidy, so your creativity can run wild."
            image="/notebook-hero.png"
        />;
    }

    return (
        <div>Archivra</div>
    )
}

export default Archivra;