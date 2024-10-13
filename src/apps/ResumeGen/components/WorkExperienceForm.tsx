import React from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea, IconButton } from '@mui/joy';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { MAX_WORK_EXPERIENCES, MAX_RESPONSIBILITY_LENGTH } from '../helpers/constants';

const WorkExperienceForm: React.FC = () => {
    const { state, dispatch } = useResumeContext();
    const { workExperience } = state.resume;

    const handleChange = (index: number, field: keyof typeof workExperience[0]) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch({
            type: 'UPDATE_WORK_EXPERIENCE',
            payload: { index, experience: { [field]: event.target.value } },
        });
    };

    const handleAddExperience = () => {
        if (workExperience.length < MAX_WORK_EXPERIENCES) {
            dispatch({
                type: 'ADD_WORK_EXPERIENCE',
                payload: { title: '', company: '', location: '', startDate: '', endDate: '', responsibilities: [''] },
            });
        }
    };

    const handleRemoveExperience = (index: number) => {
        dispatch({
            type: 'REMOVE_WORK_EXPERIENCE',
            payload: index,
        });
    };

    const handleAddResponsibility = (experienceIndex: number) => {
        const updatedExperience = { ...workExperience[experienceIndex] };
        updatedExperience.responsibilities.push('');
        dispatch({
            type: 'UPDATE_WORK_EXPERIENCE',
            payload: { index: experienceIndex, experience: updatedExperience },
        });
    };

    const handleRemoveResponsibility = (experienceIndex: number, responsibilityIndex: number) => {
        const updatedExperience = { ...workExperience[experienceIndex] };
        updatedExperience.responsibilities.splice(responsibilityIndex, 1);
        dispatch({
            type: 'UPDATE_WORK_EXPERIENCE',
            payload: { index: experienceIndex, experience: updatedExperience },
        });
    };

    return (
        <Box>
            <Stack spacing={4}>
                {workExperience.map((experience, index) => (
                    <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 'md' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                            <FormLabel><Briefcase size={18} /> Work Experience {index + 1}</FormLabel>
                            <IconButton
                                onClick={() => handleRemoveExperience(index)}
                                size="sm"
                                variant="plain"
                                color="danger"
                            >
                                <Trash2 size={18} />
                            </IconButton>
                        </Stack>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Job Title</FormLabel>
                                <Input
                                    value={experience.title}
                                    onChange={handleChange(index, 'title')}
                                    placeholder="Software Engineer"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Company</FormLabel>
                                <Input
                                    value={experience.company}
                                    onChange={handleChange(index, 'company')}
                                    placeholder="Tech Company Inc."
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Location</FormLabel>
                                <Input
                                    value={experience.location}
                                    onChange={handleChange(index, 'location')}
                                    placeholder="City, Country"
                                />
                            </FormControl>
                            <Stack direction="row" spacing={2}>
                                <FormControl>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input
                                        type="month"
                                        value={experience.startDate}
                                        onChange={handleChange(index, 'startDate')}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>End Date</FormLabel>
                                    <Input
                                        type="month"
                                        value={experience.endDate}
                                        onChange={handleChange(index, 'endDate')}
                                    />
                                </FormControl>
                            </Stack>
                            <FormControl>
                                <FormLabel>Responsibilities</FormLabel>
                                {experience.responsibilities.map((responsibility, respIndex) => (
                                    <Stack key={respIndex} direction="row" spacing={1} mb={1}>
                                        <Textarea
                                            value={responsibility}
                                            onChange={(e) => {
                                                const updatedExperience = { ...experience };
                                                updatedExperience.responsibilities[respIndex] = e.target.value;
                                                dispatch({
                                                    type: 'UPDATE_WORK_EXPERIENCE',
                                                    payload: { index, experience: updatedExperience },
                                                });
                                            }}
                                            placeholder={`Responsibility ${respIndex + 1}`}
                                            minRows={2}
                                            maxRows={4}
                                            slotProps={{
                                                textarea: {
                                                    maxLength: MAX_RESPONSIBILITY_LENGTH,
                                                },
                                            }}
                                        />
                                        <IconButton
                                            onClick={() => handleRemoveResponsibility(index, respIndex)}
                                            size="sm"
                                            variant="plain"
                                            color="danger"
                                        >
                                            <Trash2 size={18} />
                                        </IconButton>
                                    </Stack>
                                ))}
                                <Button
                                    onClick={() => handleAddResponsibility(index)}
                                    startDecorator={<Plus size={18} />}
                                    size="sm"
                                >
                                    Add Responsibility
                                </Button>
                            </FormControl>
                        </Stack>
                    </Box>
                ))}
            </Stack>
            <Button
                onClick={handleAddExperience}
                startDecorator={<Plus size={18} />}
                disabled={workExperience.length >= MAX_WORK_EXPERIENCES}
                sx={{ mt: 2 }}
            >
                Add Work Experience
            </Button>
        </Box>
    );
};

export default WorkExperienceForm;