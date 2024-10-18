import { Box, Button, Card, CardContent, Chip, Divider, FormControl, LinearProgress, Stack, Textarea, Typography } from '@mui/joy';
import { AlertCircle, CheckCircle, Eraser, FileText, Lightbulb } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { MAX_PROFILE_LENGTH, SAMPLE_PROFILES } from '../helpers/constants';

interface ProfileFormProps {
    color: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ color }) => {
    const { state, dispatch } = useResumeContext();
    const { profile } = state.resume;
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isProfileValid, setIsProfileValid] = useState(false);
    const [isFieldTouched, setIsFieldTouched] = useState(false);

    const handleProfileChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newProfileText = event.target.value;
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: newProfileText,
        });
        validateProfileText(newProfileText);
    };

    const validateProfileText = (text: string) => {
        if (text.trim() === '' && isFieldTouched) {
            setErrorMessage('Please provide a professional profile');
            setIsProfileValid(false);
        } else if (text.length > MAX_PROFILE_LENGTH) {
            setErrorMessage(`Your profile cannot exceed ${MAX_PROFILE_LENGTH} characters`);
            setIsProfileValid(false);
        } else {
            setErrorMessage('');
            setIsProfileValid(text.trim() !== '');
        }
    };

    const handleFieldBlur = () => {
        setIsFieldTouched(true);
        validateProfileText(profile);
    };

    const clearProfileText = () => {
        dispatch({ type: 'UPDATE_PROFILE', payload: '' });
        setIsFieldTouched(false);
        setErrorMessage('');
        setIsProfileValid(false);
    };

    useEffect(() => {
        validateProfileText(profile);
    }, [profile, isFieldTouched]);

    const wordCount = profile.trim().split(/\s+/).filter(Boolean).length;

    return (
        <Card variant="outlined"
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
                <FormControl error={!!errorMessage}>
                    <Typography level="title-lg" startDecorator={<FileText size={20} color={color} />} >
                        Professional Profile
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Textarea
                        value={profile}
                        onChange={handleProfileChange}
                        onBlur={handleFieldBlur}
                        minRows={5}
                        maxRows={10}
                        placeholder="Write a brief professional summary highlighting your key skills and experiences..."
                        sx={{
                            '--Textarea-focusedHighlight': color,
                            '--Textarea-focusedThickness': '2px',
                        }}
                    />
                    <LinearProgress
                        determinate
                        value={(profile.length / MAX_PROFILE_LENGTH) * 100}
                        sx={{ mt: 1, bgcolor: 'background.level2' }}
                    />
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography level="body-sm" color={errorMessage ? "danger" : "neutral"}>
                                {errorMessage ? (
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <AlertCircle size={16} style={{ marginRight: '4px' }} />
                                        {errorMessage}
                                    </span>
                                ) : (
                                    `${profile.length}/${MAX_PROFILE_LENGTH} characters | ${wordCount} words`
                                )}
                            </Typography>
                            <Button
                                onClick={clearProfileText}
                                size="sm"
                                color="danger"
                                startDecorator={<Eraser size={16} />}
                                variant="soft"
                            >
                                Clear
                            </Button>
                        </Stack>
                        {isProfileValid && profile.trim() !== '' && (
                            <Typography level="body-sm" color="success" sx={{ display: 'flex', alignItems: 'center' }}>
                                <CheckCircle size={16} style={{ marginRight: '4px' }} />
                                Profile looks good!
                            </Typography>
                        )}
                    </Box>
                </FormControl>

                <Card variant="outlined">
                    <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <Lightbulb size={20} color={color} />
                            <Typography level="title-md" sx={{ color }}>
                                Need inspiration? Try these profile starters
                            </Typography>
                        </Stack>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {SAMPLE_PROFILES.map((prompt, index) => (
                                <Chip
                                    key={index}
                                    onClick={() => dispatch({ type: 'UPDATE_PROFILE', payload: prompt })}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: `${color}22`,
                                            borderColor: color,
                                        },
                                        transition: 'all 0.3s',
                                    }}
                                >
                                    {prompt.substring(0, 30)}...
                                </Chip>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Stack>
        </Card>
    );
};

export default ProfileForm;