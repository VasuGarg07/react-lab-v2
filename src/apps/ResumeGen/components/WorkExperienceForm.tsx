import React, { useEffect, useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Box, FormControl, Input, Stack, IconButton, Card, CardContent, Typography, Button, Autocomplete, Divider, Tooltip } from '@mui/joy';
import { Briefcase, Plus, Trash2, AlertCircle, Building, MapPin, Calendar, BriefcaseBusiness } from 'lucide-react';
import { MAX_WORK_EXPERIENCES, MAX_HIGHLIGHT_LENGTH, MAX_WORK_HIGHLIGHTS, DEFAULT_JOB_TITLES } from '../helpers/constants';
import { WorkExperience } from '../helpers/interfaces';

interface WorkExperienceFormProps {
    color: string;
    onValidation: (isValid: boolean) => void;
}

interface ValidationErrors {
    [key: string]: string;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ color }) => {
    const { state, dispatch } = useResumeContext();
    const { workExperience } = state.resume;
    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        if (workExperience.length === 0) {
            handleAddExperience();
        }
    }, []);

    const validateField = (field: keyof WorkExperience, value: string): string => {
        switch (field) {
            case 'title':
            case 'company':
            case 'location':
                return value.trim() === '' ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : '';
            case 'startDate':
            case 'endDate':
                return value === '' ? `${field === 'startDate' ? 'Start' : 'End'} date is required` : '';
            default:
                return '';
        }
    };

    const handleChange = (index: number, field: keyof WorkExperience) => (
        event: React.ChangeEvent<HTMLInputElement> | null,
        newValue: string | null
    ) => {
        const value = newValue || event?.target.value || '';
        dispatch({
            type: 'UPDATE_WORK_EXPERIENCE',
            payload: { index, experience: { [field]: value } },
        });

        const errorMessage = validateField(field, value);
        setErrors(prev => ({ ...prev, [`${index}-${field}`]: errorMessage }));
    };

    const handleAddExperience = () => {
        if (workExperience.length < MAX_WORK_EXPERIENCES) {
            dispatch({
                type: 'ADD_WORK_EXPERIENCE',
                payload: { title: '', company: '', location: '', startDate: '', endDate: '', highlights: [''] },
            });
        }
    };

    const handleRemoveExperience = (index: number) => {
        dispatch({
            type: 'REMOVE_WORK_EXPERIENCE',
            payload: index,
        });
        if (workExperience.length === 0) {
            handleAddExperience();
        }
    };

    const handleAddHighlight = (experienceIndex: number) => {
        const updatedExperience = { ...workExperience[experienceIndex] };
        updatedExperience.highlights.push('');
        dispatch({
            type: 'UPDATE_WORK_EXPERIENCE',
            payload: { index: experienceIndex, experience: updatedExperience },
        });
    };

    const handleRemoveHighlight = (experienceIndex: number, highlightIndex: number) => {
        const updatedExperience = { ...workExperience[experienceIndex] };
        updatedExperience.highlights.splice(highlightIndex, 1);
        dispatch({
            type: 'UPDATE_WORK_EXPERIENCE',
            payload: { index: experienceIndex, experience: updatedExperience },
        });
    };

    const renderInput = (index: number, field: keyof WorkExperience, value: string, icon: React.ReactNode, placeholder: string) => (
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
                            }
                        }}
                    >
                        {icon}
                    </IconButton>
                </Tooltip>
                {field === 'title' ? (
                    <Autocomplete
                        value={value}
                        onChange={(_, newValue) => handleChange(index, field)(null, newValue)}
                        options={DEFAULT_JOB_TITLES}
                        freeSolo
                        placeholder={placeholder}
                        sx={{ flexGrow: 1, '--Input-focusedHighlight': color }}
                    />
                ) : field === 'startDate' || field === 'endDate' ? (
                    <Input
                        type="month"
                        value={value}
                        onChange={(e) => handleChange(index, field)(e, null)}
                        placeholder={placeholder}
                        sx={{ flexGrow: 1, '--Input-focusedHighlight': color }}
                        slotProps={{
                            input: {
                                min: "1900-01",
                                max: "2099-12"
                            }
                        }}
                        error={!!errors[`${index}-${field}`]}
                    />
                ) : (
                    <Input
                        value={value}
                        onChange={(e) => handleChange(index, field)(e, null)}
                        placeholder={placeholder}
                        sx={{ flexGrow: 1, '--Input-focusedHighlight': color }}
                        error={!!errors[`${index}-${field}`]}
                    />
                )}
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
                {workExperience.map((experience, index) => (
                    <Card key={index} variant="outlined">
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography level="title-lg" startDecorator={<Briefcase size={20} color={color} />}>
                                        Work Experience {index + 1}
                                    </Typography>
                                    {workExperience.length > 1 && (
                                        <IconButton
                                            onClick={() => handleRemoveExperience(index)}
                                            size="sm"
                                            variant="soft"
                                            color="danger"
                                        >
                                            <Trash2 size={20} />
                                        </IconButton>
                                    )}
                                </Stack>
                                <Divider />
                                <Stack sx={{ flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                                    {renderInput(index, 'title', experience.title, <BriefcaseBusiness size={20} />, 'Your job title')}
                                    {renderInput(index, 'company', experience.company, <Building size={20} />, 'Your company')}
                                    {renderInput(index, 'location', experience.location, <MapPin size={20} />, 'Your location')}
                                </Stack>
                                <Stack sx={{ flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                                    {renderInput(index, 'startDate', experience.startDate, <Calendar size={20} />, 'Start Date')}
                                    {renderInput(index, 'endDate', experience.endDate, <Calendar size={20} />, 'End Date')}
                                </Stack>
                                <Typography level="title-sm" sx={{ mt: 2 }}>Highlights</Typography>
                                <Stack spacing={1}>
                                    {experience.highlights.map((highlight, highlightIndex) => (
                                        <Stack key={highlightIndex} direction="row" spacing={1}>
                                            <Input
                                                value={highlight}
                                                onChange={(e) => {
                                                    const updatedExperience = { ...experience };
                                                    updatedExperience.highlights[highlightIndex] = e.target.value;
                                                    dispatch({
                                                        type: 'UPDATE_WORK_EXPERIENCE',
                                                        payload: { index, experience: updatedExperience },
                                                    });
                                                }}
                                                placeholder={`Highlight ${highlightIndex + 1}`}
                                                sx={{ '--Input-focusedHighlight': color, flexGrow: 1 }}
                                                slotProps={{
                                                    input: {
                                                        maxLength: MAX_HIGHLIGHT_LENGTH,
                                                    },
                                                }}
                                            />
                                            <IconButton
                                                onClick={() => handleRemoveHighlight(index, highlightIndex)}
                                                size="sm"
                                                variant="outlined"
                                                color="danger"
                                            >
                                                <Trash2 size={20} />
                                            </IconButton>
                                        </Stack>
                                    ))}
                                </Stack>
                                {experience.highlights.length < MAX_WORK_HIGHLIGHTS && (
                                    <Button
                                        onClick={() => handleAddHighlight(index)}
                                        startDecorator={<Plus size={20} />}
                                        color='primary' variant='soft'
                                        sx={{ width: 'fit-content' }}
                                    >
                                        Add Highlight
                                    </Button>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 2 }}>
                <Button
                    onClick={handleAddExperience}
                    startDecorator={<Plus size={20} />}
                    disabled={workExperience.length >= MAX_WORK_EXPERIENCES}
                    sx={{ bgcolor: color, color: 'white', '&:hover': { bgcolor: color, opacity: 0.8 } }}
                >
                    Add Work Experience
                </Button>
                {workExperience.length >= MAX_WORK_EXPERIENCES && (
                    <Typography level="body-sm" color="danger" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                        <AlertCircle size={16} style={{ marginRight: '4px' }} />
                        Maximum number of work experiences reached
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};

export default WorkExperienceForm;