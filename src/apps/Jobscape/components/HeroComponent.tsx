import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/joy';
import { Briefcase, Building2, Users2, LineChart } from 'lucide-react';

const HeroSection: React.FC = () => {
    const stats = [
        {
            icon: <Briefcase size={20} />,
            value: "175,324",
            label: "Live Jobs",
        },
        {
            icon: <Building2 size={20} />,
            value: "97,354",
            label: "Companies",
        },
        {
            icon: <Users2 size={20} />,
            value: "38,47,154",
            label: "Candidates",
        },
        {
            icon: <LineChart size={20} />,
            value: "7,532",
            label: "New Jobs",
        }
    ];

    return (
        <Box
            sx={{
                py: { xs: 2, md: 4 },
            }}
        >
            <Container maxWidth="xl">
                <Stack spacing={3} sx={{ maxWidth: 'lg', mx: 'auto' }}>
                    {/* Hero Content */}
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={4}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack spacing={2} sx={{ maxWidth: '600px' }}>
                            <Typography
                                level="h1"
                                sx={{
                                    fontSize: { xs: '2rem', md: '2.75rem' },
                                    fontWeight: 800,
                                    color: 'text.primary',
                                    lineHeight: 1.2
                                }}
                            >
                                Find a job that suits
                                your interest & skills.
                            </Typography>
                            <Typography
                                level="body-lg"
                                sx={{
                                    color: 'text.secondary',
                                    maxWidth: '520px'
                                }}
                            >
                                Discover countless opportunities across industries and find your ideal position.
                                Join leading companies seeking talent just like you.
                            </Typography>
                        </Stack>

                        <Box
                            component="img"
                            src="/jobscape-2.png"
                            alt="Job Search Illustration"
                            sx={{
                                width: { xs: '100%', md: '40%' },
                                maxWidth: '480px',
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </Stack>

                    {/* Stats */}
                    <Stack
                        direction="row"
                        spacing={2}
                        useFlexGap
                        flexWrap="wrap"
                        sx={{ mt: 6 }}
                    >
                        {stats.map((stat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: { xs: '1 1 40%', md: 1 },
                                    minWidth: { xs: '160px', md: '200px' },
                                    p: 2.5,
                                    borderRadius: 'lg',
                                    bgcolor: 'background.surface',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    boxShadow: 'sm',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        bgcolor: 'primary.solidBg',
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'md',
                                        '& .stat-icon': {
                                            bgcolor: 'background.surface',
                                            color: 'primary.solidBg',
                                        },
                                        '& .stat-text': {
                                            color: 'primary.solidColor'
                                        }
                                    }
                                }}
                            >
                                <Box
                                    className="stat-icon"
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: 'md',
                                        bgcolor: 'primary.softBg',
                                        color: 'primary.solidBg',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                                <Stack spacing={0.5}>
                                    <Typography
                                        level="h3"
                                        className="stat-text"
                                        sx={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: 'text.primary',
                                            transition: 'all 0.2s ease-in-out'
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography
                                        level="body-sm"
                                        className="stat-text"
                                        sx={{
                                            color: 'text.secondary',
                                            transition: 'all 0.2s ease-in-out'
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default HeroSection;