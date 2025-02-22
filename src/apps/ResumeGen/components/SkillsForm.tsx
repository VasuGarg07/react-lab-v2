import { Box, Button, Card, CardContent, CircularProgress, Divider, FormControl, Grid, IconButton, Input, Option, Select, Stack, Tooltip, Typography } from '@mui/joy';
import { Award, Code, Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Spacer } from '@/components/Spacer';
import { useResumeContext } from '@/apps/ResumeGen/context/ResumeContext';
import { MAX_SKILLS, SKILL_CATEGORIES } from '@/apps/ResumeGen/helpers/constants';
import { OutlinedSkillChip } from '@/apps/ResumeGen/components/SkillChips';

interface SkillsFormProps {
    color: string;
    onValidation: (isValid: boolean) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ color }) => {
    const { state, dispatch } = useResumeContext();
    const { technicalSkills } = state.resume;
    const [selectedCategory, setSelectedCategory] = useState(SKILL_CATEGORIES[0]);
    const [newSkill, setNewSkill] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const totalSkills = technicalSkills.reduce((sum, category) => sum + category.skills.length, 0);
    const skillProgress = (totalSkills / MAX_SKILLS) * 100;

    const handleAddSkill = () => {
        if (newSkill.trim() && totalSkills < MAX_SKILLS) {
            if (technicalSkills.some(s => s.category === selectedCategory)) {
                dispatch({
                    type: 'UPDATE_SKILL',
                    payload: {
                        index: technicalSkills.findIndex(s => s.category === selectedCategory),
                        skill: { skills: [...technicalSkills.find(s => s.category === selectedCategory)!.skills, newSkill.trim()] }
                    }
                });
            } else {
                dispatch({
                    type: 'ADD_SKILL',
                    payload: { category: selectedCategory, skills: [newSkill.trim()] }
                });
            }
            setNewSkill('');
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

    const filteredSkills = technicalSkills.map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.skills.length > 0);

    return (
        <Box>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography level="h4" sx={{ flexGrow: 1 }} startDecorator={<Code size={20} color={color} />}> Skills</Typography>
                        <Tooltip title="Skill Master">
                            <IconButton
                                variant="soft"
                                color="primary"
                                sx={{ visibility: totalSkills >= MAX_SKILLS ? 'visible' : 'hidden' }}
                            >
                                <Award />
                            </IconButton>
                        </Tooltip>
                        <Spacer />
                        <CircularProgress
                            size="lg"
                            determinate
                            value={skillProgress}
                            sx={{ color }}
                        >
                            <Typography level="body-xs">{totalSkills}/{MAX_SKILLS}</Typography>
                        </CircularProgress>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Select
                            value={selectedCategory}
                            onChange={(_, value) => setSelectedCategory(value as string)}
                            sx={{ minWidth: 150 }}
                        >
                            {SKILL_CATEGORIES.map((category) => (
                                <Option key={category} value={category}>{category}</Option>
                            ))}
                        </Select>
                        <Input
                            placeholder="Add a skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                            sx={{ flexGrow: 1 }}
                        />
                        <Button
                            onClick={handleAddSkill}
                            startDecorator={<Plus size={18} />}
                            disabled={totalSkills >= MAX_SKILLS}
                            sx={{ bgcolor: color, color: 'white', '&:hover': { bgcolor: color, opacity: 0.8 } }}
                        >
                            Add Skill
                        </Button>
                    </Stack>
                    <FormControl>
                        <Input
                            startDecorator={<Search size={18} />}
                            placeholder="Search skills"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </FormControl>
                </CardContent>
            </Card>

            <Grid container spacing={2}>
                {filteredSkills.map((category) => (
                    <Grid key={category.category} xs={12} sm={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography level="title-md" sx={{ mb: 1 }}>{category.category}</Typography>
                                <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
                                    {category.skills.map((skill) => (
                                        <OutlinedSkillChip
                                            key={skill}
                                            skill={skill}
                                            color={color}
                                            onRemove={() => handleRemoveSkill(category.category, skill)}
                                        />
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SkillsForm;