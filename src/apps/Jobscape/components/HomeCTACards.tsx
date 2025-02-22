import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/joy';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const HomeCTACards: React.FC = () => {
    // TODO: improve with Role specific cards
    const navigate = useNavigate();

    const authCards = [
        {
            title: "Become a Candidate",
            description: "Start your job search journey and connect with top employers. Create your professional profile and access exclusive opportunities.",
            buttonText: "Register Now",
            handleClick: () => navigate('/jobscape/register/applicant')
        },
        {
            title: "Become an Employer",
            description: "Find the perfect talent for your organization. Post jobs, review applications, and build your dream team efficiently.",
            buttonText: "Register Now",
            handleClick: () => navigate('/jobscape/register/employer')
        }
    ];

    return (
        <Box sx={{ py: 8, bgcolor: 'background.surface' }}>
            <Container maxWidth="xl">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={3}
                    alignItems="stretch"
                    justifyContent="center"
                    sx={{ maxWidth: '1000px', mx: 'auto' }}
                >
                    {authCards.map((card, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: 1,
                                p: 4,
                                borderRadius: 'lg',
                                bgcolor: 'background.level1',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                transition: 'all 0.2s ease-in-out',
                                boxShadow: 'sm',
                                minWidth: { xs: '100%', md: '320px' },
                                maxWidth: { xs: '100%', md: '460px' },
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 'md',
                                    bgcolor: 'primary.solidBg',
                                    '& .card-title, & .card-description': {
                                        color: 'primary.solidColor'
                                    },
                                    '& .register-button': {
                                        bgcolor: 'primary.solidColor',
                                        color: 'primary.solidBg',
                                        '&:hover': {
                                            bgcolor: 'primary.solidColor',
                                            color: 'primary.solidBg',
                                        }
                                    }
                                }
                            }}
                        >
                            <Typography
                                className="card-title"
                                level="h2"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    mb: 1,
                                    color: 'text.primary',
                                    transition: 'color 0.2s ease-in-out'
                                }}
                            >
                                {card.title}
                            </Typography>
                            <Typography
                                className="card-description"
                                level="body-md"
                                sx={{
                                    color: 'text.secondary',
                                    mb: 2,
                                    flex: 1,
                                    transition: 'color 0.2s ease-in-out'
                                }}
                            >
                                {card.description}
                            </Typography>
                            <Button
                                className="register-button"
                                variant="solid"
                                color="primary"
                                endDecorator={<ArrowRight size={16} />}
                                onClick={card.handleClick}
                                sx={{
                                    width: 'fit-content',
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateX(4px)'
                                    }
                                }}
                            >
                                {card.buttonText}
                            </Button>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default HomeCTACards;