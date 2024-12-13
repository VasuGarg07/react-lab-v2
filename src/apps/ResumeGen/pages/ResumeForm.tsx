import { Box, Button, Divider, IconButton, Sheet, Stack, Typography, useTheme } from '@mui/joy';
import { Award, Briefcase, ChevronLeft, ChevronRight, ChevronsLeft, Code, Feather, FileText, GraduationCap, Menu, SendHorizonal, Upload, User } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spacer } from '../../../components/Spacer';
import { useAlert } from '../../../shared/AlertProvider';
import AchievementsForm from '../components/AchievementsForm';
import ContactInfoForm from '../components/ContactInfoForm';
import EducationForm from '../components/EducationForm';
import ProfileForm from '../components/ProfileForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/SkillsForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import { useResumeContext } from '../context/ResumeContext';
import { importJSON } from '../helpers/utilities';

const sectionConfig = [
    { icon: User, label: 'Contact Details', component: ContactInfoForm, color: '#724CF9' },
    { icon: Feather, label: 'Profile Summary', component: ProfileForm, color: '#009FB7' },
    { icon: Briefcase, label: 'Work Experience', component: WorkExperienceForm, color: '#F78154' },
    { icon: GraduationCap, label: 'Education', component: EducationForm, color: '#DF3B57' },
    { icon: Code, label: 'Technical Skills', component: SkillsForm, color: '#9b59b6' },
    { icon: FileText, label: 'Projects', component: ProjectsForm, color: '#36C9C6' },
    { icon: Award, label: 'Achievements', component: AchievementsForm, color: '#F2C14E' },
];

const ResumeForm: React.FC = () => {
    const [activeSection, setActiveSection] = useState(0);
    // const [_, setSectionValidation] = useState<boolean[]>(new Array(sectionConfig.length).fill(false));
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const navigate = useNavigate();
    const { dispatch } = useResumeContext();
    const { showAlert } = useAlert();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const ActiveComponent = sectionConfig[activeSection].component;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navigateSection = (direction: 'prev' | 'next') => {
        setActiveSection(prev => {
            if (direction === 'prev') return (prev - 1 + sectionConfig.length) % sectionConfig.length;
            return (prev + 1) % sectionConfig.length;
        });
    };

    // const handleSectionValidation = useCallback((sectionIndex: number, isValid: boolean) => {
    //     setSectionValidation(prev => {
    //         const newValidation = [...prev];
    //         newValidation[sectionIndex] = isValid;
    //         return newValidation;
    //     });
    // }, []);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const resumeData = await importJSON(file);
            dispatch({ type: 'SET_RESUME', payload: resumeData });
            showAlert('Resume data imported successfully!');
        } catch (error) {
            showAlert((error as Error).message, 'danger');
        }
    };


    const handleSubmit = () => {
        navigate('/resume/select-template');
    };


    const Sidebar = () => (
        <Sheet
            sx={{
                zIndex: 2,
                minWidth: 250,
                p: 2, mt: '1px',
                borderRight: '1px solid',
                borderColor: 'divider',
                display: { xs: isMobileMenuOpen ? 'block' : 'none', md: 'block' },
                position: { xs: 'fixed', md: 'static' },
                top: { xs: '54px', md: 0 },
                left: 0,
                bottom: 0,
                bgcolor: isDarkMode ? 'rgba(15, 15, 30, 0.95)' : 'rgba(245, 247, 250, 0.95)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Typography level="h4" sx={{ mb: 2 }}>Resume Sections</Typography>
            <Stack spacing={2}>
                {sectionConfig.map(({ icon: Icon, label, color }, index) => (
                    <Button
                        key={label}
                        startDecorator={<Icon size={18} />}
                        onClick={() => {
                            setActiveSection(index);
                            setIsMobileMenuOpen(false);
                        }}
                        variant={activeSection === index ? 'soft' : 'plain'}
                        color={activeSection === index ? 'primary' : 'neutral'}
                        sx={{
                            justifyContent: 'flex-start',
                            color: activeSection === index ? color : 'inherit',
                            bgcolor: activeSection === index
                                ? isDarkMode
                                    ? `${color}33` // 20% opacity for dark mode
                                    : `${color}1A` // 10% opacity for light mode
                                : 'transparent',
                            '&:hover': {
                                bgcolor: activeSection === index
                                    ? isDarkMode
                                        ? `${color}4D` // 30% opacity for dark mode
                                        : `${color}33` // 20% opacity for light mode
                                    : 'rgba(0, 0, 0, 0.04)',
                            },
                        }}
                    >
                        {label}
                    </Button>
                ))}
                <Divider />
                <Button
                    variant="soft"
                    color="warning"
                    component="label"
                    startDecorator={<Upload size={18} />}
                    sx={{ justifyContent: 'flex-start' }}
                >
                    Upload JSON
                    <input
                        type="file"
                        accept=".json"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                </Button>
                <Button
                    variant='soft'
                    color="success"
                    onClick={handleSubmit}
                    startDecorator={<SendHorizonal size={18} />}
                    sx={{ justifyContent: 'flex-start' }}
                >
                    Submit
                </Button>
            </Stack>
        </Sheet>
    );

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 52px)',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                background: isDarkMode
                    ? 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3a 50%, #252550 100%)'
                    : 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
                color: isDarkMode ? '#e0e0e0' : '#333333',
                transition: 'background 0.3s, color 0.3s',
            }}
        >
            <Sidebar />

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <IconButton
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        onClick={toggleMobileMenu}
                        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        onClick={() => navigate('/resume')}
                        startDecorator={<ChevronsLeft size={20} />}
                    >
                        Home
                    </Button>
                    <Spacer />
                    <Button
                        size="sm"
                        variant="soft"
                        onClick={() => navigateSection('prev')}
                        startDecorator={<ChevronLeft size={20} />}
                    >
                        Back
                    </Button><Button
                        size="sm"
                        variant="soft"
                        onClick={() => navigateSection('next')}
                        startDecorator={<ChevronRight size={20} />}
                    >
                        Next
                    </Button>
                </Stack>

                <Typography
                    level="h2"
                    sx={{
                        mb: 3,
                        color: sectionConfig[activeSection].color,
                        textShadow: isDarkMode
                            ? '0 0 10px rgba(255,255,255,0.1)'
                            : '0 0 10px rgba(0,0,0,0.1)',
                    }}
                >
                    {sectionConfig[activeSection].label}
                </Typography>

                <Sheet
                    variant="outlined"
                    sx={{
                        p: { xs: 2, sm: 3 },
                        borderRadius: 'lg',
                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <ActiveComponent
                        color={sectionConfig[activeSection].color}
                        onValidation={() => { }} // Implement as needed
                    />
                </Sheet>

                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 3 }}>

                </Stack>
            </Box>
        </Box>
    );
};

export default ResumeForm;