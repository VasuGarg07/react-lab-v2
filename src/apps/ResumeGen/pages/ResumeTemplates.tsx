import React, { useState, useRef } from 'react';
import { Box, Button, Checkbox, Typography, useTheme } from '@mui/joy';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResumeContext } from '../context/ResumeContext';
import { Templates } from '../helpers/templates';

const TemplateSelection: React.FC = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const navigate = useNavigate();
    const { state, dispatch } = useResumeContext();
    const [selectedTemplate, setSelectedTemplate] = useState<string>(state.selectedTemplate?.id || '');
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const handleTemplateSelect = (templateId: string) => {
        setSelectedTemplate(templateId);
        dispatch({
            type: 'SELECT_TEMPLATE',
            payload: { id: templateId, name: Templates.find(t => t.id === templateId)?.name || '' }
        });
    };

    const handleSubmit = () => {
        if (selectedTemplate) {
            navigate('/resume/preview');
        }
    };

    const scrollToTemplate = (index: number) => {
        setCurrentIndex(index);
        if (carouselRef.current) {
            const scrollWidth = carouselRef.current.scrollWidth;
            const itemWidth = scrollWidth / Templates.length;
            carouselRef.current.scrollTo({
                left: itemWidth * index,
                behavior: 'smooth'
            });
        }
    };

    const nextTemplate = () => {
        scrollToTemplate((currentIndex + 1) % Templates.length);
    };

    const prevTemplate = () => {
        scrollToTemplate((currentIndex - 1 + Templates.length) % Templates.length);
    };

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 52px)',
                display: 'flex',
                flexDirection: 'column',
                background: isDarkMode
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                    : 'linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%);',
                color: isDarkMode ? '#e0e0e0' : '#333333',
                transition: 'background 0.3s, color 0.3s',
                p: { xs: 1, sm: 2 },
            }}
        >
            <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => navigate('/resume/form')}
                startDecorator={<ArrowLeft size={20} />}
                sx={{ alignSelf: 'flex-start', my: 1 }}
            >
                Back to Form
            </Button>

            <Typography
                level="h2"
                sx={{
                    mb: 2,
                    color: '#724CF9',
                    textAlign: 'center',
                    textShadow: isDarkMode
                        ? '0 0 10px rgba(255,255,255,0.1)'
                        : '0 0 10px rgba(0,0,0,0.1)',
                }}
            >
                Choose Your Template
            </Typography>

            <Box sx={{
                position: 'relative',
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: 1200,
                mx: 'auto',
                gap: '1rem'
            }}>
                <Button
                    color="danger"
                    onClick={prevTemplate}
                    sx={{
                        zIndex: 1,
                        minWidth: '40px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        p: 0,
                    }}
                >
                    <ArrowLeft />
                </Button>
                <Box
                    ref={carouselRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'hidden',
                        scrollSnapType: 'x mandatory',
                        '&::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    {Templates.map((template) => (
                        <Box
                            key={template.id}
                            sx={{
                                flex: {
                                    xs: '0 0 100%',
                                    sm: '0 0 calc(50% - 8px)',
                                    md: '0 0 calc(33.333% - 10.667px)'
                                },
                                scrollSnapAlign: 'start',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            onClick={() => handleTemplateSelect(template.id)}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    aspectRatio: '1/1.4142',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        borderRadius: '10px',
                                        padding: '2px',
                                        background: 'linear-gradient(45deg, #724CF9, #A881FD)',
                                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                        maskComposite: 'exclude',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                    },
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'rgba(114, 76, 249, 0)',
                                        transition: 'background 0.3s ease',
                                    },
                                    '&:hover': {
                                        boxShadow: '0 6px 15px rgba(114, 76, 249, 0.2)',
                                        '&::before': {
                                            opacity: 1,
                                        },
                                        '&::after': {
                                            background: 'rgba(114, 76, 249, 0.05)',
                                        },
                                    },
                                    '&:active': {
                                        boxShadow: '0 2px 8px rgba(114, 76, 249, 0.15)',
                                        '&::after': {
                                            background: 'rgba(114, 76, 249, 0.1)',
                                        },
                                    },
                                }}
                                onClick={() => handleTemplateSelect(template.id)}
                            >
                                <img
                                    src={template.image}
                                    alt={`${template.name} preview`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                mt: 2,
                                padding: '8px 12px',
                                borderRadius: '20px',
                                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                            }}>
                                <Typography level="body-md">
                                    {template.name} Template
                                </Typography>
                                <Checkbox
                                    color='success'
                                    checked={selectedTemplate === template.id}
                                    onChange={() => handleTemplateSelect(template.id)}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Button
                    color="danger"
                    onClick={nextTemplate}
                    sx={{
                        zIndex: 1,
                        minWidth: '40px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        p: 0,
                    }}
                >
                    <ArrowRight />
                </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {Templates.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => scrollToTemplate(index)}
                        sx={{
                            width: 20,
                            height: 6,
                            borderRadius: '3px',
                            backgroundColor: currentIndex === index ? '#724CF9' : isDarkMode ? '#4A4A4A' : '#D1D1D1',
                            margin: '0 4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            '&:hover': {
                                backgroundColor: currentIndex === index ? '#724CF9' : isDarkMode ? '#6A6A6A' : '#B1B1B1',
                            },
                        }}
                    />
                ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    size="md"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!selectedTemplate}
                    sx={{
                        px: 4,
                        py: 1,
                        fontSize: '1rem',
                        borderRadius: '20px',
                        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.2s',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                        },
                        '&:disabled': {
                            opacity: 0.6,
                            cursor: 'not-allowed',
                        },
                    }}
                >
                    Generate Resume
                </Button>
            </Box>
        </Box >
    );
};

export default TemplateSelection;