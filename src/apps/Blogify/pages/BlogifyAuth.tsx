import { Box, Button, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router';

const BlogifyAuth = ({ mode = 'light' }) => {
    const navigate = useNavigate();

    // Theme colors based on the illustration
    const colors = {
        light: {
            primary: '#E9967A', // Coral pink
            secondary: '#B8860B', // Golden brown
            background: '#F5E6D3', // Cream
            text: '#2D3748', // Dark gray
        },
        dark: {
            primary: '#FFB6A3', // Lighter coral
            secondary: '#DAA520', // Golden
            background: '#2D3748', // Dark blue-gray
            text: '#F5E6D3', // Cream
        }
    };

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 52px)',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
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
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '1000px',
                    width: '100%',
                    px: { xs: 2, sm: 4 },
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    gap: { xs: 4, md: 8 },
                    width: '100%',
                }}>
                    {/* Left side - Content */}
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        textAlign: { xs: 'center', md: 'left' },
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography
                                level="h1"
                                sx={{
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                    fontWeight: 800,
                                    letterSpacing: '-0.02em',
                                    mb: 2,
                                    background: mode === 'light'
                                        ? `linear-gradient(to right, ${colors.light.primary}, ${colors.light.secondary})`
                                        : `linear-gradient(to right, ${colors.dark.primary}, ${colors.dark.secondary})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Welcome to Blogify
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Typography
                                level="body-lg"
                                sx={{
                                    fontSize: { xs: '1rem', sm: '1.125rem' },
                                    maxWidth: '440px',
                                    color: mode === 'light' ? colors.light.text : colors.dark.text,
                                    mb: 4,
                                }}
                            >
                                Unleash your creativity and share your stories with the world.
                                Join our community of passionate writers today.
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Button
                                size="lg"
                                onClick={() => navigate('/auth/login')}
                                startDecorator={<LogIn />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: 'xl',
                                    boxShadow: 'lg',
                                    background: mode === 'light'
                                        ? `linear-gradient(to right, ${colors.light.primary}, ${colors.light.secondary})`
                                        : `linear-gradient(to right, ${colors.dark.primary}, ${colors.dark.secondary})`,
                                    '&:hover': {
                                        boxShadow: 'xl',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                Start Writing
                            </Button>
                        </motion.div>
                    </Box>

                    {/* Right side - Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{ flex: 1 }}
                    >
                        <Box
                            component="img"
                            src="/blogify.png"
                            alt="Creative writing illustration"
                            sx={{
                                width: '100%',
                                maxWidth: '500px',
                                height: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
};

export default BlogifyAuth;