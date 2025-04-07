import { useAuth } from '@/auth/AuthProvider';
import LoginPrompt from '@/components/LoginPrompt';
import { Outlet, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import ArchivraNav from './components/ArchivraNav';

const Archivra = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return (
            <LoginPrompt
                title="Welcome to Archivra"
                caption="Jot, journal, and journey your way through notebooks and chapters. Archivra keeps your ideas tidy, so your creativity can run wild."
                image="/notebook-hero.png"
            />
        );
    }

    return (
        <div className="flex flex-col md:flex-row relative">
            <ArchivraNav />
            <main className="flex-grow w-full md:w-[calc(100%-260px)] overflow-auto p-4 pb-16">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default Archivra;
