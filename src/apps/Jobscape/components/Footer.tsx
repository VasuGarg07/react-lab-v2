import { Box, Container, Link, Sheet, Stack, Typography } from '@mui/joy';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {

    if (compact) {
        return (
            <Sheet component="footer" sx={{
                p: 2,
                borderTop: '1px solid #DADADA',
            }}>
                <Container maxWidth="lg">
                    <Typography
                        level="body-sm"
                        sx={{
                            color: '#777',
                            textAlign: 'center',
                        }}
                    >
                        © {new Date().getFullYear()} JobScape - Job Portal. All rights Reserved
                    </Typography>
                </Container>
            </Sheet>
        )
    }

    const links = {
        'Quick Link': [
            { label: 'About', path: 'about' },
            { label: 'Contact', path: 'contact' },
        ],
        'Candidate': [
            { label: 'Browse Jobs', path: 'jobs' },
            { label: 'Browse Employers', path: 'employers' },
            { label: 'Candidate Dashboard', path: 'candidate-dashboard' },
            { label: 'Saved Jobs', path: 'saved-jobs' }
        ],
        'Employers': [
            { label: 'Post a Job', path: 'post-job' },
            { label: 'Browse Candidates', path: 'candidates' },
            { label: 'Employers Dashboard', path: 'employer-dashboard' },
            { label: 'Applications', path: 'applications' }
        ],
        'Support': [
            { label: 'FAQs', path: 'faqs' },
            { label: 'Privacy Policy', path: 'privacy' },
            { label: 'Terms & Conditions', path: 'terms' }
        ]
    };

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#1C1C1C',
                color: 'white',
                py: 6
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={6}>
                    {/* Navigation Links */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 4, sm: 2 }}
                        justifyContent="space-around"
                        useFlexGap
                    >
                        {Object.entries(links).map(([category, items]) => (
                            <Stack key={category} spacing={2}>
                                <Typography
                                    level="title-lg"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 600,
                                        mb: 1
                                    }}
                                >
                                    {category}
                                </Typography>
                                {items.map((item) => (
                                    <Link
                                        component={RouterLink}
                                        key={item.path}
                                        to={item.path}
                                        sx={{
                                            textDecoration: 'none',
                                            color: '#A1A1A1',
                                            fontSize: '0.875rem',
                                            transition: 'color 0.2s ease',
                                            "&:hover": {
                                                color: "#C1C1C1",
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </Stack>
                        ))}
                    </Stack>

                    {/* Copyright */}
                    <Typography
                        level="body-sm"
                        sx={{
                            color: '#A1A1A1',
                            textAlign: 'center',
                            borderTop: '1px solid #333',
                            pt: 2
                        }}
                    >
                        © {new Date().getFullYear()} JobScape - Job Portal. All rights Reserved
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;