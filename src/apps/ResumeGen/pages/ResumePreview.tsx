import { Box, Button, Typography, useTheme } from '@mui/joy';
import { Check, Edit, FileDown, FileJson, LayoutTemplate } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeContext } from '../context/ResumeContext';
import { Templates } from '../helpers/templates';

const ResumePreview: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { state } = useResumeContext();
    const isDarkMode = theme.palette.mode === 'dark';

    const SelectedTemplate = Templates.find(t => t.id === state.selectedTemplate?.id)?.component;

    // Button configurations array
    const buttonConfigs = [
        {
            label: 'Edit Details',
            icon: <Edit />,
            color: 'linear-gradient(135deg, #00B4DB, #0083B0)', // Gradient for more visual appeal
            hoverColor: 'linear-gradient(135deg, #0083B0, #005F73)',
            onClick: () => navigate('/resume/form'),
        },
        {
            label: 'Reselect Template',
            icon: <LayoutTemplate />,
            color: 'linear-gradient(135deg, #43E97B, #38F9D7)',
            hoverColor: 'linear-gradient(135deg, #38F9D7, #3DB396)',
            onClick: () => navigate('/resume/select-template'),
        },
        {
            label: 'Export as JSON',
            icon: <FileJson />,
            color: 'linear-gradient(135deg, #FDC830, #F37335)',
            hoverColor: 'linear-gradient(135deg, #F37335, #C02425)',
            onClick: () => console.log('Export JSON functionality to be implemented'),
        },
        {
            label: 'Save as PDF',
            icon: <FileDown />,
            color: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
            hoverColor: 'linear-gradient(135deg, #FF4B2B, #C02425)',
            onClick: () => console.log('Save as PDF functionality to be implemented'),
        },
        {
            label: 'ATS Check',
            icon: <Check />,
            color: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
            hoverColor: 'linear-gradient(135deg, #2C5364, #0F2027)',
            onClick: () => console.log('ATS Check functionality to be implemented'),
        },
    ];

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 52px)',
                display: 'flex',
                flexDirection: { xs: 'column-reverse', lg: 'row' },
                background: isDarkMode
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                    : 'linear-gradient(135deg, #f6f9fc 0%, #f0f4f8 50%, #edf2f7 100%)',
                color: isDarkMode ? '#e0e0e0' : '#333333',
                transition: 'background 0.3s, color 0.3s',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '800px',
                    m: { xs: 2, sm: 4 },
                    flex: 3
                }}
            >
                {SelectedTemplate ? (
                    <SelectedTemplate resume={state.resume} />
                ) : (
                    <Typography level="body-lg" sx={{ p: 2, textAlign: 'center' }}>
                        No template selected. Please choose a template.
                    </Typography>
                )}
            </Box>

            {/* Button Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: { xs: 'row', lg: 'column' },
                    gap: 2,
                    width: { xs: '100%', lg: '200px' },
                    justifyContent: { xs: 'space-around', lg: 'center' }, // Space evenly on mobile
                    alignItems: 'center',
                    p: { xs: 2, sm: 4 },
                    mt: { xs: 2, lg: 0 }, // Add top margin on mobile view
                    flex: 1
                }}
            >
                {buttonConfigs.map((button, index) => (
                    <Button
                        key={index}
                        startDecorator={button.icon}
                        onClick={button.onClick}
                        sx={{
                            background: button.color,
                            color: '#fff',
                            width: '100%',
                            borderRadius: '12px', // More rounded for modern feel
                            py: 1,
                            px: 3,
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)', // Enhanced shadow for depth
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: button.hoverColor,
                                transform: 'scale(1.05)', // Subtle scaling for hover
                            },
                            '&:active': {
                                transform: 'scale(0.98)', // Press effect
                            },
                        }}
                    >
                        {button.label}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default ResumePreview;
