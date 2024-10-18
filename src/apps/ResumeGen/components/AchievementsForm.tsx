import React, { useEffect, useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Box, FormControl, Input, Stack, IconButton, Card, CardContent, Typography, Button, Divider, Tooltip, Textarea } from '@mui/joy';
import { Trophy, Plus, Trash2, AlertCircle, Calendar } from 'lucide-react';
import { MAX_PROJECTS as MAX_ACHIEVEMENTS, MAX_PROJECT_DESCRIPTION_LENGTH as MAX_ACHIEVEMENT_DESCRIPTION_LENGTH } from '../helpers/constants';
import { Achievement } from '../helpers/interfaces';

interface AchievementsFormProps {
    color: string;
    onValidation: (isValid: boolean) => void;
}

interface ValidationErrors {
    [key: string]: string;
}

const AchievementsForm: React.FC<AchievementsFormProps> = ({ color }) => {
    const { state, dispatch } = useResumeContext();
    const { achievements } = state.resume;
    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        if (!achievements?.length) {
            handleAddAchievement();
        }
    }, []);

    const validateField = (field: keyof Achievement, value: string): string => {
        switch (field) {
            case 'title':
                return value.trim() === '' ? 'Achievement title is required' : '';
            case 'description':
                return value.length > MAX_ACHIEVEMENT_DESCRIPTION_LENGTH ? `Description must be ${MAX_ACHIEVEMENT_DESCRIPTION_LENGTH} characters or less` : '';
            case 'date':
                return value === '' ? 'Date is required' : '';
            default:
                return '';
        }
    };

    const handleChange = (index: number, field: keyof Achievement) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        dispatch({
            type: 'UPDATE_ACHIEVEMENT',
            payload: { index, achievement: { [field]: value } },
        });

        const errorMessage = validateField(field, value);
        setErrors(prev => ({ ...prev, [`${index}-${field}`]: errorMessage }));
    };

    const handleAddAchievement = () => {
        if (!achievements || achievements.length < MAX_ACHIEVEMENTS) {
            dispatch({
                type: 'ADD_ACHIEVEMENT',
                payload: { title: '', description: '', date: '' },
            });
        }
    };

    const handleRemoveAchievement = (index: number) => {
        dispatch({
            type: 'REMOVE_ACHIEVEMENT',
            payload: index,
        });
        if (achievements && achievements.length === 1) {
            handleAddAchievement();
        }
    };

    const renderInput = (index: number, field: keyof Achievement, value: string, icon: React.ReactNode, placeholder: string, inputType: string = 'text') => (
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
                                opacity: 0.8,
                            }
                        }}
                    >
                        {icon}
                    </IconButton>
                </Tooltip>
                {field === 'description' ? (
                    <Textarea
                        value={value}
                        onChange={handleChange(index, field)}
                        placeholder={placeholder}
                        minRows={2}
                        maxRows={4}
                        sx={{ flexGrow: 1, '--Textarea-focusedHighlight': color }}
                        error={!!errors[`${index}-${field}`]}
                    />
                ) : (
                    <Input
                        type={inputType}
                        value={value}
                        onChange={handleChange(index, field)}
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
                {achievements && achievements.map((achievement, index) => (
                    <Card key={index} variant="outlined">
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography level="title-lg" startDecorator={<Trophy size={20} color={color} />}>
                                        Achievement {index + 1}
                                    </Typography>
                                    {achievements.length > 1 && (
                                        <IconButton
                                            onClick={() => handleRemoveAchievement(index)}
                                            size="sm"
                                            variant="soft"
                                            color="danger"
                                        >
                                            <Trash2 size={20} />
                                        </IconButton>
                                    )}
                                </Stack>
                                <Divider />
                                {renderInput(index, 'title', achievement.title, <Trophy size={20} />, 'Achievement Title')}
                                {renderInput(index, 'description', achievement.description, <Trophy size={20} />, 'Brief description of the achievement')}
                                {renderInput(index, 'date', achievement.date, <Calendar size={20} />, 'Date of the achievement', 'date')}
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 2 }}>
                <Button
                    onClick={handleAddAchievement}
                    startDecorator={<Plus size={20} />}
                    disabled={achievements && achievements.length >= MAX_ACHIEVEMENTS}
                    sx={{ bgcolor: color, color: 'white', '&:hover': { bgcolor: color, opacity: 0.8 } }}
                >
                    Add Achievement
                </Button>
                {achievements && achievements.length >= MAX_ACHIEVEMENTS && (
                    <Typography level="body-sm" color="danger" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                        <AlertCircle size={16} style={{ marginRight: '4px' }} />
                        Maximum number of achievements reached
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};

export default AchievementsForm;