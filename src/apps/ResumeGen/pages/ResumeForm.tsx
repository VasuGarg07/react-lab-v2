import React, { useState } from 'react';
import { Box, Typography, IconButton, Sheet, useTheme, Tooltip, Stack, Button } from '@mui/joy';
import { User, Briefcase, GraduationCap, Code, Award, FileText, Feather, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactInfoForm from '../components/ContactInfoForm';
import ProfileForm from '../components/ProfileForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import AchievementsForm from '../components/AchievementsForm';
import EducationForm from '../components/EducationForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/SkillsForm';

const sectionConfig = [
    { icon: User, label: 'Contact Details', component: ContactInfoForm, color: '#4a90e2' },
    { icon: Feather, label: 'Profile Summary', component: ProfileForm, color: '#50c878' },
    { icon: Briefcase, label: 'Work Experience', component: WorkExperienceForm, color: '#f39c12' },
    { icon: GraduationCap, label: 'Education', component: EducationForm, color: '#e74c3c' },
    { icon: Code, label: 'Technical Skills', component: SkillsForm, color: '#9b59b6' },
    { icon: FileText, label: 'Projects', component: ProjectsForm, color: '#3498db' },
    { icon: Award, label: 'Achievements', component: AchievementsForm, color: '#2ecc71' },
];

const ResumeForm: React.FC = () => {
    const [activeSection, setActiveSection] = useState(0);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const navigate = useNavigate();

    const ActiveComponent = sectionConfig[activeSection].component;

    const navigateSection = (direction: 'prev' | 'next') => {
        setActiveSection(prev => {
            if (direction === 'prev') return (prev - 1 + sectionConfig.length) % sectionConfig.length;
            return (prev + 1) % sectionConfig.length;
        });
    };

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 52px)',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: isDarkMode ? '#1a1a2e' : '#E6E6EA',
                color: isDarkMode ? '#e0e0e0' : '#333333',
                transition: 'background-color 0.3s, color 0.3s',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background (unchanged) */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    background: `
                        linear-gradient(45deg, 
                            ${sectionConfig[activeSection].color}33 25%, 
                            transparent 25%, 
                            transparent 50%, 
                            ${sectionConfig[(activeSection + 1) % sectionConfig.length].color}33 50%, 
                            ${sectionConfig[(activeSection + 1) % sectionConfig.length].color}33 75%, 
                            transparent 75%, 
                            transparent)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Content */}
            <Box sx={{ position: 'relative', p: { xs: 1, sm: 2 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Button
                    size="sm"
                    onClick={() => navigate('/resume')}
                    sx={{
                        color: 'text.secondary',
                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        '&:hover': {
                            bgcolor: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                        },
                        mb: 1,
                        width: 'fit-content'
                    }}
                    startDecorator={<ArrowLeft />}
                > Back
                </Button>

                {/* Control Panel */}
                <Sheet
                    variant="outlined"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        mb: 2,
                        borderRadius: 'lg',
                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IconButton size="sm" onClick={() => navigateSection('prev')} disabled={activeSection === 0}>
                                <ChevronLeft />
                            </IconButton>
                            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                {sectionConfig.map(({ icon: Icon, label, color }, index) => (
                                    <Tooltip key={label} title={label} variant="soft">
                                        <IconButton
                                            size="sm"
                                            onClick={() => setActiveSection(index)}
                                            sx={{
                                                color: activeSection === index ? color : 'text.secondary',
                                                bgcolor: activeSection === index ? (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent',
                                                transition: 'background-color 0.3s, color 0.3s',
                                                '&:hover': {
                                                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                                                }
                                            }}
                                        >
                                            <Icon size={20} />
                                        </IconButton>
                                    </Tooltip>
                                ))}
                            </Stack>
                            <Typography
                                level="h4"
                                sx={{
                                    color: sectionConfig[activeSection].color,
                                    textShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.1)' : '0 0 10px rgba(0,0,0,0.1)',
                                    transition: 'color 0.3s',
                                    display: { xs: 'flex', sm: 'none' }
                                }}
                            >
                                {sectionConfig[activeSection].label}
                            </Typography>

                            <IconButton size="sm" onClick={() => navigateSection('next')} disabled={activeSection === sectionConfig.length - 1}>
                                <ChevronRight />
                            </IconButton>
                        </Box>
                    </Stack>
                </Sheet>

                {/* Section Title */}
                <Typography
                    level="h3"
                    sx={{
                        mb: 2,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: sectionConfig[activeSection].color,
                        textShadow: isDarkMode ? '0 0 10px rgba(255,255,255,0.1)' : '0 0 10px rgba(0,0,0,0.1)',
                        transition: 'color 0.3s',
                        display: { xs: 'none', sm: 'block' }
                    }}
                >
                    {sectionConfig[activeSection].label}
                </Typography>

                {/* Form Container */}
                <Sheet
                    variant="outlined"
                    sx={{
                        p: { xs: 1, sm: 2 },
                        borderRadius: 'lg',
                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        flexGrow: 1,
                        overflow: 'auto',
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                >
                    <Box
                        sx={{
                            opacity: 1,
                            transition: 'opacity 0.3s ease-in-out',
                        }}
                        key={activeSection}
                    >
                        <ActiveComponent color={sectionConfig[activeSection].color} />
                    </Box>
                </Sheet>
            </Box>
        </Box>
    );
};

export default ResumeForm;