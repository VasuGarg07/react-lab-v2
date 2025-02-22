import { Outlet } from 'react-router';
import { Box, useColorScheme } from '@mui/joy';
import { motion } from 'framer-motion';

const AuthWrapper = () => {
    const { mode } = useColorScheme();

    return (
        <Box
            component={motion.div}
            sx={{
                minHeight: 'calc(100vh - 52px)',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: mode === 'light'
                    ? `
                        radial-gradient(circle at 30% 20%, rgba(255, 0, 0, 0.4), transparent 70%),
                        radial-gradient(circle at 70% 80%, rgba(0, 0, 255, 0.4), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4), transparent 70%)
                      `
                    : `
                        radial-gradient(circle at 30% 20%, rgba(138, 43, 226, 0.4), transparent 70%),
                        radial-gradient(circle at 70% 80%, rgba(0, 128, 0, 0.4), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), transparent 70%)
                      `,
            }}
        >
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                sx={{
                    maxWidth: 400,
                    width: 'calc(100vw - 64px)',
                    mx: 'auto',
                    padding: 2,
                    backgroundColor: mode === 'light' ? '#ffffff' : '#121212',
                    boxShadow: mode === 'light'
                        ? '0 8px 24px rgba(0, 0, 0, 0.1)'
                        : '0 8px 24px rgba(0, 0, 0, 0.5)',
                    borderRadius: 'lg',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AuthWrapper;
