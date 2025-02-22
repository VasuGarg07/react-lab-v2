import { Box, Button, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router';

const InvoiceLoginPrompt = ({ mode = 'light' }) => {
    const navigate = useNavigate();

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
                        radial-gradient(circle at 30% 20%, rgba(102, 84, 241, 0.4), transparent 70%),
                        radial-gradient(circle at 70% 80%, rgba(105, 234, 203, 0.4), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4), transparent 70%)
                    `
                    : `
                        radial-gradient(circle at 30% 20%, rgba(0, 147, 130, 0.4), transparent 70%),
                        radial-gradient(circle at 70% 80%, rgba(162, 0, 0, 0.4), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), transparent 70%)
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
                                        ? 'linear-gradient(to right, #6654F1, #69EACB)'
                                        : 'linear-gradient(to right, #009382, #A20000)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Welcome to InvoEase
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
                                    color: mode === 'light' ? 'neutral.500' : 'neutral.300',
                                    mb: 4,
                                }}
                            >
                                Create professional invoices effortlessly. Streamline your billing process
                                with our intuitive invoice generation tools.
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
                                        ? 'linear-gradient(to right, #6654F1, #69EACB)'
                                        : 'linear-gradient(to right, #009382, #A20000)',
                                    '&:hover': {
                                        boxShadow: 'xl',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                Log In to Continue
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
                            src="/invoice-hero.png"
                            alt="Invoice management illustration"
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

export default InvoiceLoginPrompt;