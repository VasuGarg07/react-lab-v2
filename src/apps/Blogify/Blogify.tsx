import BlogifyNav from '@/apps/Blogify/components/BlogifyNav';
import { useAuth } from '@/auth/AuthProvider';
import LoginPrompt from '@/components/LoginPrompt';
import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router';

const Blogify = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return <LoginPrompt
            title='Welcome to Blogify'
            caption='Unleash your creativity and share your stories with the world. Join our community of passionate writers today.'
            image='/blogify.png' />
    }

    return (
        <div className="flex flex-col sm:flex-row relative">
            {/* Navigation */}
            <BlogifyNav />

            {/* Main Content */}
            <main className="flex-grow w-full sm:w-[calc(100%-280px)] min-h-[calc(100vh-116px)] md:min-h-[calc(100vh-54px)] h-auto md:h-[calc(100vh-54px)] overflow-auto pb-16 md:pb-0">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default Blogify;