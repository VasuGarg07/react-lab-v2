import React from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Box, Button, FormControl, FormLabel, Input, Stack, IconButton } from '@mui/joy';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { MAX_EDUCATION_ENTRIES } from '../helpers/constants';

const EducationForm: React.FC = () => {
    const { state, dispatch } = useResumeContext();
    const { education } = state.resume;

    const handleChange = (index: number, field: keyof typeof education[0]) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch({
            type: 'UPDATE_EDUCATION',
            payload: { index, education: { [field]: event.target.value } },
        });
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
    };

    return (
        <Box>
            <Stack spacing={4}>
                {education.map((edu, index) => (
                    <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 'md' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                            <FormLabel><GraduationCap size={18} /> Education {index + 1}</FormLabel>
                            <IconButton
                                onClick={() => handleRemoveEducation(index)}
                                size="sm"
                                variant="plain"
                                color="danger"
                            >
                                <Trash2 size={18} />
                            </IconButton>
                        </Stack>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Institution</FormLabel>
                                <Input
                                    value={edu.institution}
                                    onChange={handleChange(index, 'institution')}
                                    placeholder="University Name"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Degree</FormLabel>
                                <Input
                                    value={edu.degree}
                                    onChange={handleChange(index, 'degree')}
                                    placeholder="Bachelor of Science"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Field of Study</FormLabel>
                                <Input
                                    value={edu.fieldOfStudy}
                                    onChange={handleChange(index, 'fieldOfStudy')}
                                    placeholder="Computer Science"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Graduation Year</FormLabel>
                                <Input
                                    type="number"
                                    value={edu.graduationYear}
                                    onChange={handleChange(index, 'graduationYear')}
                                    placeholder="2023"
                                />
                            </FormControl>
                        </Stack>
                    </Box>
                ))}
            </Stack>
            <Button
                onClick={handleAddEducation}
                startDecorator={<Plus size={18} />}
                disabled={education.length >= MAX_EDUCATION_ENTRIES}
                sx={{ mt: 2 }}
            >
                Add Education
            </Button>
        </Box>
    );
};

export default EducationForm;