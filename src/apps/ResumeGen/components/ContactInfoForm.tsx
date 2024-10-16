import { Autocomplete, Box, Button, FormControl, Input, Stack, Typography } from '@mui/joy';
import { Briefcase, CheckCircle, Github, Linkedin, Mail, Phone, User, UserSquare2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { DEFAULT_JOB_TITLES } from '../helpers/constants';

interface ContactInfoFormProps {
    color: string;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ color }) => {
    const { state, dispatch } = useResumeContext();
    const { contactInfo } = state.resume;
    const [errors, setErrors] = useState<Partial<Record<keyof typeof contactInfo, string>>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [optionalFields, setOptionalFields] = useState<Set<'linkedIn' | 'github'>>(new Set(['linkedIn', 'github']));

    const validateField = (field: keyof typeof contactInfo, value: string) => {
        if (!optionalFields.has(field as 'linkedIn' | 'github') && !value.trim()) {
            return 'Please fill out this field';
        }
        switch (field) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
            case 'phone':
                return /^\+?[0-9\s()-]{10,}$/.test(value) ? '' : 'Please enter a valid phone number';
            default:
                return '';
        }
    };

    const handleChange = (field: keyof typeof contactInfo) => (
        event: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event> | null,
        newValue: string | null
    ) => {
        if (optionalFields.has(field as 'linkedIn' | 'github')) {
            return; // Prevent changes to optional fields
        }

        let value: string;
        if (event) {
            value = (event.target as HTMLInputElement).value;
        } else {
            value = newValue || '';
        }

        if (field === 'linkedIn' || field === 'github') {
            value = value.replace(/^(https?:\/\/)?(www\.)?(linkedin\.com\/in\/|github\.com\/)?/, '');
        }

        const error = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
        dispatch({
            type: 'UPDATE_CONTACT_INFO',
            payload: { [field]: value },
        });
    };

    const toggleOptional = (field: 'linkedIn' | 'github') => {
        setOptionalFields(prev => {
            const newSet = new Set(prev);
            if (newSet.has(field)) {
                newSet.delete(field);
                // Field is now required, validate it
                const error = validateField(field, contactInfo[field]);
                setErrors(prev => ({ ...prev, [field]: error }));
            } else {
                newSet.add(field);
                // Field is now optional, clear its value and error
                dispatch({
                    type: 'UPDATE_CONTACT_INFO',
                    payload: { [field]: '' },
                });
                setErrors(prev => ({ ...prev, [field]: '' }));
            }
            return newSet;
        });
    };

    useEffect(() => {
        const isValid = Object.entries(contactInfo).every(([key, value]) => {
            if (optionalFields.has(key as 'linkedIn' | 'github')) {
                return true; // Optional fields are always considered valid
            }
            return value.trim() !== '' && !errors[key as keyof typeof contactInfo];
        });
        setIsFormValid(isValid);
    }, [contactInfo, errors, optionalFields]);

    const renderLabelButton = (icon: React.ReactNode, label: string) => (
        <Button
            startDecorator={icon}
            sx={{
                color,
                minWidth: '120px',
                border: '1px solid'
            }}
            variant='soft'
            color='neutral'
        >
            {label}
        </Button>
    );

    const renderInput = (field: keyof typeof contactInfo, value: string, icon: React.ReactNode, label: string) => {
        const isOptional = field === 'linkedIn' || field === 'github';
        const isMarkedOptional = optionalFields.has(field as 'linkedIn' | 'github');

        return (
            <FormControl key={field} error={!!errors[field]}>
                <Stack direction="row" spacing={1} alignItems="center">
                    {renderLabelButton(icon, label)}
                    <Box sx={{ position: 'relative', flexGrow: 1 }}>
                        <Input
                            value={value}
                            onChange={(e) => handleChange(field)(e, null)}
                            placeholder={`Your ${field}`}
                            startDecorator={isOptional ? (field === 'linkedIn' ? 'linkedin.com/in/' : 'github.com/') : null}
                            error={!isMarkedOptional && !!errors[field]}
                            disabled={isMarkedOptional}
                            sx={{
                                flexGrow: 1,
                                '--Input-focusedHighlight': color,
                                '--Input-focusedThickness': '2px',
                                paddingRight: isOptional ? '100px' : '8px',  // Make room for the button
                            }}
                        />
                        {isOptional && (
                            <Button
                                size="sm"
                                variant="plain"
                                color={isMarkedOptional ? "neutral" : "primary"}
                                onClick={() => toggleOptional(field as 'linkedIn' | 'github')}
                                sx={{
                                    position: 'absolute',
                                    right: '2px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 2,
                                    borderRadius: '4px'
                                }}
                            >
                                {isMarkedOptional ? "Add Handle" : "Skip"}
                            </Button>
                        )}
                    </Box>
                </Stack>
                {errors[field] && !isMarkedOptional && (
                    <Typography level="body-sm" color="danger" sx={{ mt: 0.5, ml: '130px' }}>
                        {errors[field]}
                    </Typography>
                )}
            </FormControl>
        );
    };

    return (
        <Box
            sx={{
                borderRadius: 'md',
                p: 3,
                bgcolor: 'background.surface',
                position: 'relative',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Button
                    startDecorator={<UserSquare2 size={18} />}
                    sx={{
                        bgcolor: color,
                        color: 'white',
                        width: 'fit-content',
                        '&:hover': { bgcolor: color },
                    }}
                >
                    Contact Information
                </Button>
                {renderInput('name', contactInfo.name, <User size={18} />, 'Name')}
                <FormControl error={!!errors.title}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {renderLabelButton(<Briefcase size={18} />, 'Job Title')}
                        <Autocomplete
                            value={contactInfo.title}
                            onChange={(_, newValue) => handleChange('title')(null, newValue)}
                            options={DEFAULT_JOB_TITLES}
                            freeSolo
                            placeholder="Your job title"
                            sx={{
                                flexGrow: 1,
                                '--Input-focusedHighlight': color,
                                '--Input-focusedThickness': '2px',
                            }}
                        />
                    </Stack>
                    {errors.title && (
                        <Typography level="body-sm" color="danger" sx={{ mt: 0.5, ml: '130px' }}>
                            {errors.title}
                        </Typography>
                    )}
                </FormControl>
                {renderInput('email', contactInfo.email, <Mail size={18} />, 'Email')}
                {renderInput('phone', contactInfo.phone, <Phone size={18} />, 'Phone')}
                {renderInput('linkedIn', contactInfo.linkedIn, <Linkedin size={18} />, 'LinkedIn')}
                {renderInput('github', contactInfo.github, <Github size={18} />, 'GitHub')}
            </Stack>
            {isFormValid && (
                <Box
                    sx={{
                        mt: 2,
                        py: 1,
                        px: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'success.softBg',
                        color: 'success.softColor',
                        borderRadius: 'sm',
                    }}
                >
                    <CheckCircle size={18} />
                    <Typography level="body-md" sx={{ ml: 1 }}>All set! Your contact information is complete.</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ContactInfoForm;