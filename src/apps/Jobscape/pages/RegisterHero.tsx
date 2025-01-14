import React from 'react';
import { Box, Button, Typography, Container, Stack } from '@mui/joy';
import { Briefcase, User2 } from 'lucide-react';

const RegisterHero: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                width: '100%'
            }}
        >
            {/* Left Section */}
            <Box
                sx={{
                    width: { xs: '100%', md: '50%' },
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="sm">
                    {/* Logo */}
                    <Stack direction="row" spacing={1} alignItems="center" mb={6}>
                        <Briefcase color='#058bd3' />
                        <Typography level="title-lg">JobScape</Typography>
                    </Stack>

                    {/* Main Content */}
                    <Stack spacing={4}>
                        <Box>
                            <Typography level="h1" mb={1}>
                                Join JobScape
                            </Typography>
                            <Typography level="body-md" color="neutral">
                                Choose how you want to get started
                            </Typography>
                        </Box>

                        {/* Registration Buttons */}
                        <Stack spacing={2}>
                            <Button
                                size="lg"
                                startDecorator={<User2 />}
                                variant="solid"
                                color="primary"
                                fullWidth
                            >
                                Register as Applicant
                            </Button>
                            <Button
                                size="lg"
                                startDecorator={<Briefcase />}
                                variant="outlined"
                                color="primary"
                                fullWidth
                            >
                                Register as Employer
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Right Section - Hidden on mobile */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    width: '50%',
                    color: 'white',
                    alignItems: 'flex-end', // Changed to align content to bottom
                    p: 4,
                    background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%), url(/backgrounds/job-register.jpg) center/cover no-repeat`,
                    position: 'relative' // Added to ensure proper stacking
                }}
            >
                <Container maxWidth="sm" sx={{ mb: 4 }}> {/* Added bottom margin */}
                    <Typography level="h2" mb={2} sx={{ color: 'neutral.200' }}>
                        Find Your Next Opportunity
                    </Typography>
                    <Typography level="body-lg" sx={{ color: 'neutral.400' }}> {/* Adjusted color for better visibility */}
                        Connect with top companies and discover new career possibilities that match your skills and aspirations.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default RegisterHero;