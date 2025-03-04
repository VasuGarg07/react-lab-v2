import { Box, Button, CircularProgress, IconButton, Tooltip, Typography, useTheme } from '@mui/joy';
import { CheckCircle, Edit, FileDown, FileJson, GitCompare, LayoutTemplate } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import ATSCheck from '@/apps/ResumeGen/components/AtsCheck';
import JDComparator from '@/apps/ResumeGen/components/JDComparator';
import { useResumeContext } from '@/apps/ResumeGen/context/ResumeContext';
import { Templates } from '@/apps/ResumeGen/helpers/templates';
import { downloadJSON } from '@/apps/ResumeGen/helpers/utilities';
import generateResumePDF from '@/apps/ResumeGen/pdfGenerators/pdfGenerator';
import { TemplateName } from '@/apps/ResumeGen/pdfGenerators/types';
import { toastService } from '@/shared/toastr';

interface ButtonConfig {
    label: string;
    icon: JSX.Element;
    color: string;
    hoverColor: string;
    onClick: () => void;
    hide?: boolean;
    loading?: boolean;
}

const ResumePreview: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { state } = useResumeContext();
    const isDarkMode = theme.palette.mode === 'dark';
    const resumeRef = useRef<HTMLDivElement | null>(null);
    const [showATSCheck, setShowATSCheck] = useState(false);
    const [showJDComparator, setShowJDComparator] = useState(false);
    const [isPdfLoading, setIsPdfLoading] = useState(false);

    const SelectedTemplate = Templates.find(t => t.id === state.selectedTemplate?.id)?.component;

    const handlePdfGeneration = async () => {
        if (!state.selectedTemplate?.id) {
            toastService.error('Please select a template first');
            return;
        }

        setIsPdfLoading(true);
        try {
            await generateResumePDF(state.resume, state.selectedTemplate.id.toLocaleLowerCase() as TemplateName);
            toastService.success('PDF generated successfully');
        } catch (error) {
            console.error('PDF generation failed:', error);
            toastService.error('Failed to generate PDF. Please try again.');
        } finally {
            setIsPdfLoading(false);
        }
    };

    const buttonConfigs: ButtonConfig[] = [
        {
            label: 'Edit Details',
            icon: <Edit />,
            color: 'linear-gradient(135deg, #00B4DB, #0083B0)',
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
            onClick: () => downloadJSON(state.resume),
        },
        {
            label: 'Save as PDF',
            icon: isPdfLoading ?
                <CircularProgress size="sm" variant="soft" /> :
                <FileDown />,
            color: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
            hoverColor: 'linear-gradient(135deg, #FF4B2B, #C02425)',
            onClick: handlePdfGeneration,
            loading: isPdfLoading,
        },
        {
            label: 'ATS Check',
            icon: <CheckCircle />,
            color: 'linear-gradient(135deg, #6a11cb, #2575fc)',
            hoverColor: 'linear-gradient(135deg, #7F2CCB, #2F3061)',
            onClick: () => setShowATSCheck(true),
            hide: true
        },
        {
            label: 'JD Comparator',
            icon: <GitCompare />,
            color: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
            hoverColor: 'linear-gradient(135deg, #2C5364, #0F2027)',
            onClick: () => setShowJDComparator(true),
            hide: true
        },
    ];

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 52px)',
                display: 'flex',
                flexDirection: 'column',
                background: isDarkMode
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                    : 'linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)',
                color: isDarkMode ? '#e0e0e0' : '#333333',
                transition: 'background 0.3s, color 0.3s',
            }}
        >
            <Typography
                level="h2"
                sx={{
                    mt: 2,
                    color: '#724CF9',
                    textAlign: 'center',
                    textShadow: isDarkMode
                        ? '0 0 10px rgba(255,255,255,0.1)'
                        : '0 0 10px rgba(0,0,0,0.1)',
                }}
            >
                Resume Preview
            </Typography>

            {/* Button Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center',
                    p: 2,
                    mb: 2,
                }}
            >
                {buttonConfigs.map((button, index) => !button.hide && (
                    <Tooltip key={index} title={button.label} variant="soft">
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                startDecorator={button.icon}
                                onClick={button.onClick}
                                disabled={button.loading}
                                sx={{
                                    background: button.color,
                                    color: '#fff',
                                    '&:hover': {
                                        background: button.hoverColor,
                                        transition: 'background 0.3s'
                                    },
                                    display: { xs: 'none', sm: 'inline-flex' },
                                }}
                            >
                                {button.label}
                            </Button>
                            <IconButton
                                onClick={button.onClick}
                                disabled={button.loading}
                                sx={{
                                    background: button.color,
                                    color: '#fff',
                                    borderRadius: '50%',
                                    width: '48px',
                                    height: '48px',
                                    '&:hover': {
                                        background: button.hoverColor,
                                        transition: 'background 0.3s'
                                    },
                                    display: { xs: 'inline-flex', sm: 'none' },
                                }}
                            >
                                {button.icon}
                            </IconButton>
                        </Box>
                    </Tooltip>
                ))}
            </Box>

            {/* Resume Preview Section */}
            <Box
                ref={resumeRef}
                sx={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    width: 'calc(100% - 32px)',
                    maxWidth: '800px',
                    mx: 'auto',
                    flex: 1,
                    mb: 2,
                }}
            >
                {SelectedTemplate ? (
                    <SelectedTemplate resume={state.resume} />
                ) : (
                    <Typography level="body-lg" sx={{ p: 2, textAlign: 'center', color: '#333' }}>
                        No template selected. Please choose a template.
                    </Typography>
                )}
            </Box>

            <ATSCheck
                isOpen={showATSCheck}
                resume={state.resume}
                onClose={() => setShowATSCheck(false)}
            />

            <JDComparator
                isOpen={showJDComparator}
                resume={state.resume}
                onClose={() => setShowJDComparator(false)}
            />
        </Box>
    );
};

export default ResumePreview;