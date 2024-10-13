import React from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea, IconButton } from '@mui/joy';
import { Trophy, Plus, Trash2 } from 'lucide-react';
import { Achievement } from '../helpers/interfaces';

const AchievementsForm: React.FC = () => {
    const { state, dispatch } = useResumeContext();
    const { achievements } = state.resume;

    const handleChange = (index: number, field: keyof Achievement) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch({
            type: 'UPDATE_ACHIEVEMENT',
            payload: { index, achievement: { [field]: event.target.value } },
        });
    };

    const handleAddAchievement = () => {
        dispatch({
            type: 'ADD_ACHIEVEMENT',
            payload: { title: '', description: '', date: '' },
        });
    };

    const handleRemoveAchievement = (index: number) => {
        dispatch({
            type: 'REMOVE_ACHIEVEMENT',
            payload: index,
        });
    };

    return (
        <Box>
            <Stack spacing={4}>
                {achievements!.map((achievement, index) => (
                    <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 'md' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                            <FormLabel><Trophy size={18} /> Achievement {index + 1}</FormLabel>
                            <IconButton
                                onClick={() => handleRemoveAchievement(index)}
                                size="sm"
                                variant="plain"
                                color="danger"
                            >
                                <Trash2 size={18} />
                            </IconButton>
                        </Stack>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    value={achievement.title}
                                    onChange={handleChange(index, 'title')}
                                    placeholder="Achievement Title"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    value={achievement.description}
                                    onChange={handleChange(index, 'description')}
                                    placeholder="Brief description of the achievement"
                                    minRows={2}
                                    maxRows={4}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                <Input
                                    type="date"
                                    value={achievement.date}
                                    onChange={handleChange(index, 'date')}
                                    placeholder="Date of the achievement"
                                />
                            </FormControl>
                        </Stack>
                    </Box>
                ))}
            </Stack>
            <Button
                onClick={handleAddAchievement}
                startDecorator={<Plus size={18} />}
                sx={{ mt: 2 }}
            >
                Add Project
            </Button>
        </Box>
    );
};

export default AchievementsForm;