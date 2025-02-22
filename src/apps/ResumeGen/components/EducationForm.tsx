import React, { useEffect, useState } from 'react';
import { useResumeContext } from '@/apps/ResumeGen/context/ResumeContext';
import { Box, FormControl, Input, Stack, IconButton, Card, CardContent, Typography, Button, Divider, Tooltip } from '@mui/joy';
import { GraduationCap, Plus, Trash2, AlertCircle, Building, Book, Calendar } from 'lucide-react';
import { MAX_EDUCATION_ENTRIES } from '@/apps/ResumeGen/helpers/constants';
import { Education } from '@/apps/ResumeGen/helpers/interfaces';

interface EducationFormProps {
    color: string;
    onValidation: (isValid: boolean) => void;
}

interface ValidationErrors {
    [key: string]: string;
}

const EducationForm: React.FC<EducationFormProps> = ({ color }) => {
    const { state, dispatch } = useResumeContext();
    const { education } = state.resume;
    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        if (education.length === 0) {
            handleAddEducation();
        }
    }, []);

    const validateField = (field: keyof Education, value: string): string => {
        switch (field) {
            case 'institution':
            case 'degree':
            case 'fieldOfStudy':
                return value.trim() === '' ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : '';
            case 'graduationYear':
                return value === '' ? 'Graduation year is required' :
                    !/^\d{4}$/.test(value) ? 'Invalid year format' : '';
            default:
                return '';
        }
    };

    const handleChange = (index: number, field: keyof Education) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        dispatch({
            type: 'UPDATE_EDUCATION',
            payload: { index, education: { [field]: value } },
        });

        const errorMessage = validateField(field, value);
        setErrors(prev => ({ ...prev, [`${index}-${field}`]: errorMessage }));
    };

    const handleAddEducation = () => {
        if (education.length < MAX_EDUCATION_ENTRIES) {
            dispatch({
                type: 'ADD_EDUCATION',
                payload: { institution: '', degree: '', fieldOfStudy: '', graduationYear: '' },
            });
        }
    };

    const handleRemoveEducation = (index: number) => {
        dispatch({
            type: 'REMOVE_EDUCATION',
            payload: index,
        });
        if (education.length === 1) {
            handleAddEducation();
        }
    };

    const renderInput = (index: number, field: keyof Education, value: string, icon: React.ReactNode, placeholder: string) => (
        <FormControl sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={field.charAt(0).toUpperCase() + field.slice(1)}>
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
                <Input
                    value={value}
                    onChange={handleChange(index, field)}
                    placeholder={placeholder}
                    sx={{ flexGrow: 1, '--Input-focusedHighlight': color }}
                    error={!!errors[`${index}-${field}`]}
                    type={field === 'graduationYear' ? 'number' : 'text'}
                />
            </Stack>
            {errors[`${index}-${field}`] && (
                <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
                    {errors[`${index}-${field}`]}
                </Typography>
            )}
        </FormControl>
    );

    return (
        <Box>
            <Stack spacing={3}>
                {education.map((edu, index) => (
                    <Card key={index} variant="outlined">
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography level="title-lg" startDecorator={<GraduationCap size={20} color={color} />}>
                                        Education {index + 1}
                                    </Typography>
                                    {education.length > 1 && (
                                        <IconButton
                                            onClick={() => handleRemoveEducation(index)}
                                            size="sm"
                                            variant="soft"
                                            color="primary"
                                        >
                                            <Trash2 size={20} />
                                        </IconButton>
                                    )}
                                </Stack>
                                <Divider />
                                <Stack sx={{ flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                                    {renderInput(index, 'institution', edu.institution, <Building size={20} />, 'University Name')}
                                    {renderInput(index, 'degree', edu.degree, <GraduationCap size={20} />, 'Bachelor of Science')}
                                </Stack>
                                <Stack sx={{ flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                                    {renderInput(index, 'fieldOfStudy', edu.fieldOfStudy, <Book size={20} />, 'Computer Science')}
                                    {renderInput(index, 'graduationYear', edu.graduationYear, <Calendar size={20} />, 'Graduation Year')}
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 2 }}>
                <Button
                    onClick={handleAddEducation}
                    startDecorator={<Plus size={20} />}
                    disabled={education.length >= MAX_EDUCATION_ENTRIES}
                    color='success' variant='soft'
                >
                    Add Education
                </Button>
                {education.length >= MAX_EDUCATION_ENTRIES && (
                    <Typography level="body-sm" color="danger" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                        <AlertCircle size={16} style={{ marginRight: '4px' }} />
                        Maximum number of education entries reached
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};

export default EducationForm;