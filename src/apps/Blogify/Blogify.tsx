import { Box } from '@mui/joy';
import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router';
import BlogifyNav from '@/apps/Blogify/components/BlogifyNav';
import { useAuth } from '@/auth/AuthProvider';
import { useColorScheme } from '@mui/joy';
import LoginPrompt from '@/components/LoginPrompt';

const Blogify = () => {
    const { mode } = useColorScheme();
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return <LoginPrompt
            title='Welcome to Blogify'
            caption='Unleash your creativity and share your stories with the world. Join our community of passionate writers today.'
            image='/blogify.png' />
    }

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 54px)',
                background: mode === 'light'
                    ? `
                        radial-gradient(circle at 30% 20%, rgba(233, 150, 122, 0.4), transparent 70%),
                        radial-gradient(circle at 70% 80%, rgba(184, 134, 11, 0.4), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(245, 230, 211, 0.4), transparent 70%)
                      `
                    : `
                        radial-gradient(circle at 30% 20%, rgba(255, 182, 163, 0.4), transparent 70%),
                        radial-gradient(circle at 70% 80%, rgba(218, 165, 32, 0.4), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(45, 55, 72, 0.4), transparent 70%)
                      `,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }
            }}
        >
            <BlogifyNav mode={mode} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: 'calc(100% - 280px)' },
                    minHeight: { xs: 'calc(100vh - 116px)', md: 'calc(100vh - 54px)' },
                    height: { xs: 'auto', md: 'calc(100vh - 54px)' },
                    overflow: 'auto',
                    pb: { xs: '64px', md: 0 }  // Account for bottom nav on mobile
                }}
            >
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.div>
            </Box>
        </Box>
    );
};

export default Blogify;