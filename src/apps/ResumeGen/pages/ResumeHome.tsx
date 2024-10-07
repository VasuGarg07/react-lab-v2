import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import { FileText, Sliders, Flame, CheckCircle, ArrowRight, LucideIcon } from 'lucide-react';
import { Grid, Stack, useTheme } from '@mui/joy';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color }) => (
    <Card
        variant="outlined"
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-5px)',
            },
            bgcolor: (theme) => theme.palette.mode === 'light' ? 'white' : 'grey.900',
        }}
    >
        <Icon size={40} color={color} />
        <Typography
            level="h3"
            fontSize="xl"
            sx={{ mt: 2, mb: 1 }}
            fontFamily={'Noto Sans'}
        >
            {title}
        </Typography>
        <Typography
            level="body-md"
            textAlign="center"
            sx={{
                color: (theme) => theme.palette.mode === 'light' ? 'grey.700' : 'grey.400',
            }}
        >
            {description}
        </Typography>
    </Card>
);

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Stack sx={{
            minHeight: 'calc(100vh - 52px)', // Adjusted for 52px header
            position: 'relative',
            overflow: 'hidden',
            background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #A9B4C2 0%, #7D98A1 100%)'
                : 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle, transparent 20%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.05) 80%, transparent 80%, transparent)',
                backgroundSize: '50px 50px',
            },
            pt: 6, // Added top padding to account for header
        }}>
            <Stack
                sx={{
                    flex: 1,
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 4,
                }}
            >
                <Typography
                    level="h1"
                    fontSize={{ xs: '3rem', md: '4rem' }}
                    fontWeight="bold"
                    mb={2}
                    fontFamily={'Poppins'}
                    sx={{
                        textShadow: (theme) => theme.palette.mode === 'light'
                            ? '2px 2px 4px rgba(0,0,0,0.1)'
                            : '2px 2px 4px rgba(0,0,0,0.5)',
                        color: (theme) => theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light',
                    }}
                >
                    Resume Generator
                </Typography>
                <Typography
                    level="h2"
                    fontSize={{ xs: 'xl', md: 'xl2' }}
                    mb={4}
                    sx={{
                        maxWidth: '800px',
                        textShadow: (theme) => theme.palette.mode === 'light'
                            ? '1px 1px 2px rgba(0,0,0,0.1)'
                            : '1px 1px 2px rgba(0,0,0,0.3)',
                        color: (theme) => theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary',
                    }}
                    fontFamily={'Noto Sans'}
                >
                    Create professional resumes in minutes with our easy-to-use application.
                </Typography>

                <Button
                    endDecorator={<ArrowRight />}
                    size="lg"
                    onClick={() => navigate('/resume/form')}
                    sx={{
                        mb: 6,
                        px: 4,
                        py: 1.5,
                        fontSize: 'lg',
                        fontWeight: 600,
                        borderRadius: 'xl',
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)'
                            : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        border: 'none',
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 10px 20px rgba(58, 123, 213, 0.3)'
                            : '0 10px 20px rgba(79, 172, 254, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 15px 30px rgba(58, 123, 213, 0.4)'
                                : '0 15px 30px rgba(79, 172, 254, 0.4)',
                        },
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                        '& .MuiButton-endDecorator': {
                            ml: 2,
                            transition: 'transform 0.3s ease',
                        },
                        '&:hover .MuiButton-endDecorator': {
                            transform: 'translateX(4px)',
                        },
                    }}
                >
                    Get Started
                </Button>

                <Grid container spacing={3} sx={{ width: 1, maxWidth: '1200px' }}>
                    <Grid xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={Sliders}
                            title="Easy to Use"
                            description="Intuitive interface for quick resume creation"
                            color="#4CAF50"  // Green
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={Flame}
                            title="Professional Templates"
                            description="Choose from a variety of polished designs"
                            color="#FFA000"  // Amber
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={FileText}
                            title="Customizable"
                            description="Tailor your resume to fit your unique style"
                            color="#1E88E5"  // Blue
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FeatureCard
                            icon={CheckCircle}
                            title="ATS-Friendly"
                            description="Optimized for applicant tracking systems"
                            color="#E53935"  // Red
                        />
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};

export default LandingPage;