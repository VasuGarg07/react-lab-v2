import React from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Box, Button, FormControl, FormLabel, Input, Stack, Chip, Select, Option } from '@mui/joy';
import { Code, Plus, X } from 'lucide-react';
import { SKILL_CATEGORIES, MAX_SKILLS } from '../helpers/constants';

const SkillsForm: React.FC = () => {
    const { state, dispatch } = useResumeContext();
    const { technicalSkills } = state.resume;

    const handleAddSkill = (category: string, skill: string) => {
        if (technicalSkills.some(s => s.category === category)) {
            dispatch({
                type: 'UPDATE_SKILL',
                payload: {
                    index: technicalSkills.findIndex(s => s.category === category),
                    skill: { skills: [...technicalSkills.find(s => s.category === category)!.skills, skill] }
                }
            });
        } else {
            dispatch({
                type: 'ADD_SKILL',
                payload: { category, skills: [skill] }
            });
        }
    };

    const handleRemoveSkill = (category: string, skillToRemove: string) => {
        const categoryIndex = technicalSkills.findIndex(s => s.category === category);
        const updatedSkills = technicalSkills[categoryIndex].skills.filter(skill => skill !== skillToRemove);

        if (updatedSkills.length === 0) {
            dispatch({
                type: 'REMOVE_SKILL',
                payload: categoryIndex
            });
        } else {
            dispatch({
                type: 'UPDATE_SKILL',
                payload: { index: categoryIndex, skill: { skills: updatedSkills } }
            });
        }
    };

    return (
        <Box>
            <Stack spacing={4}>
                {SKILL_CATEGORIES.map((category) => (
                    <Box key={category}>
                        <FormLabel><Code size={18} /> {category}</FormLabel>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {technicalSkills
                                .find(s => s.category === category)?.skills
                                .map((skill) => (
                                    <Chip
                                        key={skill}
                                        size="sm"
                                        variant="soft"
                                        endDecorator={<X size={14} onClick={() => handleRemoveSkill(category, skill)} />}
                                    >
                                        {skill}
                                    </Chip>
                                ))}
                        </Box>
                        <Stack direction="row" spacing={2}>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <Input
                                    placeholder={`Add ${category} skill`}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            const input = e.target as HTMLInputElement;
                                            handleAddSkill(category, input.value);
                                            input.value = '';
                                        }
                                    }}
                                />
                            </FormControl>
                            <Button
                                onClick={() => {
                                    const input = document.querySelector(`input[placeholder="Add ${category} skill"]`) as HTMLInputElement;
                                    if (input.value) {
                                        handleAddSkill(category, input.value);
                                        input.value = '';
                                    }
                                }}
                                startDecorator={<Plus size={18} />}
                            >
                                Add
                            </Button>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default SkillsForm;