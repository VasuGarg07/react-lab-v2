import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/joy';
import { UserPlus, Upload, Search, Send } from 'lucide-react';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: <UserPlus size={24} />,
            title: "Create account",
            description: "Set up your profile in minutes and showcase your professional journey."
        },
        {
            icon: <Upload size={24} />,
            title: "Upload CV/Resume",
            description: "Share your experience and skills with our network of employers."
        },
        {
            icon: <Search size={24} />,
            title: "Find suitable job",
            description: "Browse through tailored job matches that fit your expertise and goals."
        },
        {
            icon: <Send size={24} />,
            title: "Apply job",
            description: "Submit applications easily and track your application status."
        }
    ];

    return (
        <Box sx={{ py: 8, bgcolor: 'background.level1' }}>
            <Container maxWidth="xl">
                <Stack spacing={6} alignItems="center">
                    <Typography
                        level="h1"
                        sx={{
                            fontSize: { xs: '1.75rem', md: '2.25rem' },
                            fontWeight: 800,
                            textAlign: 'center'
                        }}
                    >
                        How JobScape work
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={3}
                        useFlexGap
                        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
                        sx={{
                            width: '100%'
                        }}
                    >
                        {steps.map((step, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: { xs: '1 1 40%', md: 1 },
                                    minWidth: { xs: '200px', md: '220px' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: 2,
                                    p: 2,
                                    position: 'relative',
                                    zIndex: 1,
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        '& .step-icon': {
                                            bgcolor: 'primary.solidBg',
                                            color: 'primary.solidColor',
                                            boxShadow: 'md'
                                        }
                                    }
                                }}
                            >
                                <Box
                                    className="step-icon"
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: '50%',
                                        bgcolor: 'background.surface',
                                        color: 'primary.solidBg',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: 'sm',
                                        transition: 'all 0.3s ease-in-out'
                                    }}
                                >
                                    {step.icon}
                                </Box>
                                <Typography
                                    level="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 600,
                                        mb: 1
                                    }}
                                >
                                    {index + 1}. {step.title}
                                </Typography>
                                <Typography
                                    level="body-sm"
                                    sx={{
                                        color: 'text.secondary',
                                        maxWidth: '240px'
                                    }}
                                >
                                    {step.description}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default HowItWorks;