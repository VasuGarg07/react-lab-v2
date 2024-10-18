import { Autocomplete, Box, Button, Card, CardContent, Divider, FormControl, IconButton, Input, Stack, Tooltip, Typography } from '@mui/joy';
import { Briefcase, CheckCircle, Github, Linkedin, Mail, Phone, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { DEFAULT_JOB_TITLES } from '../helpers/constants';
import { ContactInfo } from '../helpers/interfaces';

interface ContactInfoFormProps {
    color: string;
    onValidation: (isValid: boolean) => void;
}

interface ValidationErrors {
    [key: string]: string;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ color }) => {
    const { state, dispatch } = useResumeContext();
    const { contactInfo } = state.resume;
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [optionalFields, setOptionalFields] = useState<Set<'linkedIn' | 'github'>>(new Set(['linkedIn', 'github']));

    useEffect(() => {
        const isValid = Object.entries(contactInfo).every(([key, value]) => {
            if (optionalFields.has(key as 'linkedIn' | 'github')) {
                return true;
            }
            return value.trim() !== '' && !errors[key];
        });
        setIsFormValid(isValid);
    }, [contactInfo, errors, optionalFields]);

    const validateField = (field: keyof ContactInfo, value: string): string => {
        if (!optionalFields.has(field as 'linkedIn' | 'github') && !value.trim()) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
        switch (field) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
            case 'phone':
                return /^\+?[0-9\s()-]{10,}$/.test(value) ? '' : 'Please enter a valid phone number';
            case 'linkedIn':
                return /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]{5,30}[a-zA-Z0-9]$/.test(value) ? '' : 'Please enter a valid LinkedIn profile URL';
            case 'github':
                return /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(value) ? '' : 'Please enter a valid GitHub profile URL';
            default:
                return '';
        }
    };

    const handleChange = (field: keyof ContactInfo) => (
        event: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event> | null,
        newValue: string | null
    ) => {
        if (optionalFields.has(field as 'linkedIn' | 'github')) {
            return;
        }

        let value = newValue || (event?.target as HTMLInputElement)?.value || '';

        // For LinkedIn and GitHub, ensure the URL starts with https:// if not already present
        if ((field === 'linkedIn' || field === 'github') && value && !value.startsWith('https://')) {
            value = 'https://' + value;
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
                const error = validateField(field, contactInfo[field]);
                setErrors(prev => ({ ...prev, [field]: error }));
            } else {
                newSet.add(field);
                dispatch({
                    type: 'UPDATE_CONTACT_INFO',
                    payload: { [field]: '' },
                });
                setErrors(prev => ({ ...prev, [field]: '' }));
            }
            return newSet;
        });
    };

    const renderInput = (field: keyof ContactInfo, value: string, icon: React.ReactNode, label: string) => {
        const isOptional = field === 'linkedIn' || field === 'github';
        const isMarkedOptional = optionalFields.has(field as 'linkedIn' | 'github');

        return (
            <FormControl sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Tooltip title={label}>
                        <IconButton
                            size="sm"
                            sx={{
                                bgcolor: color,
                                color: 'white',
                                '&:hover': {
                                    bgcolor: color,
                                    color: 'white',
                                },
                            }}
                        >
                            {icon}
                        </IconButton>
                    </Tooltip>
                    {field === 'title' ? (
                        <Autocomplete
                            value={value}
                            onChange={(_, newValue) => handleChange(field)(null, newValue)}
                            options={DEFAULT_JOB_TITLES}
                            freeSolo
                            placeholder={`Your ${field}`}
                            sx={{ flexGrow: 1, '--Input-focusedHighlight': color }}
                        />
                    ) : (
                        <Input
                            value={value}
                            onChange={(e) => handleChange(field)(e, null)}
                            placeholder={`Your ${field}`}
                            error={!isMarkedOptional && !!errors[field]}
                            disabled={isMarkedOptional}
                            sx={{
                                flexGrow: 1,
                                '--Input-focusedHighlight': color,
                            }}
                        />
                    )}
                    {isOptional && (
                        <Button
                            size="sm"
                            variant="plain"
                            color={isMarkedOptional ? "neutral" : "primary"}
                            onClick={() => toggleOptional(field as 'linkedIn' | 'github')}
                        >
                            {isMarkedOptional ? "Add" : "Skip"}
                        </Button>
                    )}
                </Stack>
                {errors[field] && !isMarkedOptional && (
                    <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
                        {errors[field]}
                    </Typography>
                )}
            </FormControl>
        );
    };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Stack spacing={2}>
                        <Typography level="title-lg" startDecorator={<User size={20} color={color} />}>
                            Contact Information
                        </Typography>
                        <Divider />
                        <Stack sx={{ flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                            {renderInput('name', contactInfo.name, <User size={18} />, 'Name')}
                            {renderInput('title', contactInfo.title, <Briefcase size={18} />, 'Job Title')}
                        </Stack>
                        <Stack sx={{ flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                            {renderInput('email', contactInfo.email, <Mail size={18} />, 'Email')}
                            {renderInput('phone', contactInfo.phone, <Phone size={18} />, 'Phone')}
                        </Stack>
                        <Stack sx={{ flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                            {renderInput('linkedIn', contactInfo.linkedIn, <Linkedin size={18} />, 'LinkedIn')}
                            {renderInput('github', contactInfo.github, <Github size={18} />, 'GitHub')}
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
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