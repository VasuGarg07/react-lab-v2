import { Box, Button, Card, CardContent, Divider, FormControl, IconButton, Input, Stack, Textarea, Tooltip, Typography } from '@mui/joy';
import { AlertCircle, FolderGit2, Link as LinkIcon, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { MAX_PROJECTS, MAX_PROJECT_DESCRIPTION_LENGTH, MAX_TECHNOLOGIES } from '../helpers/constants';
import { Project } from '../helpers/interfaces';
import { MinimalistSkillChip } from './SkillChips';

interface ProjectsFormProps {
    color: string;
}

interface ValidationErrors {
    [key: string]: string;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ color }) => {
    const { state, dispatch } = useResumeContext();
    const { projects } = state.resume;
    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        if (!projects?.length) {
            handleAddProject();
        }
    }, []);

    const validateField = (field: keyof Project, value: string): string => {
        switch (field) {
            case 'name':
                return value.trim() === '' ? 'Project name is required' : '';
            case 'description':
                return value.length > MAX_PROJECT_DESCRIPTION_LENGTH ? `Description must be ${MAX_PROJECT_DESCRIPTION_LENGTH} characters or less` : '';
            case 'link':
                return value !== '' && !/^https?:\/\/.+/.test(value) ? 'Invalid URL format' : '';
            default:
                return '';
        }
    };

    const handleChange = (index: number, field: keyof Project) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        dispatch({
            type: 'UPDATE_PROJECT',
            payload: { index, project: { [field]: value } },
        });

        const errorMessage = validateField(field, value);
        setErrors(prev => ({ ...prev, [`${index}-${field}`]: errorMessage }));
    };

    const handleAddProject = () => {
        if (!projects || projects.length < MAX_PROJECTS) {
            dispatch({
                type: 'ADD_PROJECT',
                payload: { name: '', description: '', technologies: [], link: '' },
            });
        }
    };

    const handleRemoveProject = (index: number) => {
        dispatch({
            type: 'REMOVE_PROJECT',
            payload: index,
        });
        if (projects && projects.length === 1) {
            handleAddProject();
        }
    };

    const handleAddTechnology = (projectIndex: number, technology: string) => {
        if (technology.trim() === '') return;
        const updatedProject = { ...projects![projectIndex] };
        if (updatedProject.technologies.length < MAX_TECHNOLOGIES) {
            updatedProject.technologies.push(technology.trim());
            dispatch({
                type: 'UPDATE_PROJECT',
                payload: { index: projectIndex, project: updatedProject },
            });
        }
    };

    const handleRemoveTechnology = (projectIndex: number, technologyToRemove: string) => {
        const updatedProject = { ...projects![projectIndex] };
        updatedProject.technologies = updatedProject.technologies.filter(tech => tech !== technologyToRemove);
        dispatch({
            type: 'UPDATE_PROJECT',
            payload: { index: projectIndex, project: updatedProject },
        });
    };

    const renderInput = (index: number, field: keyof Project, icon: React.ReactNode, placeholder: string, value?: string,) => (
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
                {projects && projects.map((project, index) => (
                    <Card key={index} variant="outlined">
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography level="title-lg" startDecorator={<FolderGit2 size={20} color={color} />}>
                                        Project {index + 1}
                                    </Typography>
                                    {projects.length > 1 && (
                                        <IconButton
                                            onClick={() => handleRemoveProject(index)}
                                            size="sm"
                                            variant="soft"
                                            color="danger"
                                        >
                                            <Trash2 size={20} />
                                        </IconButton>
                                    )}
                                </Stack>
                                <Divider />
                                {renderInput(index, 'name', <FolderGit2 size={20} />, 'Project Name', project.name)}
                                {renderInput(index, 'description', <FolderGit2 size={20} />, 'Brief project description', project.description)}
                                {renderInput(index, 'link', <LinkIcon size={20} />, 'https://github.com/username/project', project.link)}
                                <FormControl>
                                    <Typography level="body-sm">Technologies Used</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, mt: 1 }}>
                                        {project.technologies.map((tech) => (
                                            <MinimalistSkillChip
                                                key={tech}
                                                skill={tech}
                                                color={color}
                                                onRemove={() => handleRemoveTechnology(index, tech)}
                                            >
                                            </MinimalistSkillChip>
                                        ))}
                                    </Box>
                                    <Stack direction="row" spacing={1}>
                                        <Input
                                            placeholder="Add technology"
                                            sx={{ '--Input-focusedHighlight': color }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    const input = e.target as HTMLInputElement;
                                                    handleAddTechnology(index, input.value);
                                                    input.value = '';
                                                }
                                            }}
                                        />
                                        <Button
                                            onClick={() => {
                                                const input = document.querySelector(`input[placeholder="Add technology"]`) as HTMLInputElement;
                                                if (input.value) {
                                                    handleAddTechnology(index, input.value);
                                                    input.value = '';
                                                }
                                            }}
                                            startDecorator={<Plus size={18} />}
                                            sx={{ bgcolor: color, color: 'white', '&:hover': { bgcolor: color, opacity: 0.8 } }}
                                        >
                                            Add
                                        </Button>
                                    </Stack>
                                </FormControl>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 2 }}>
                <Button
                    onClick={handleAddProject}
                    startDecorator={<Plus size={20} />}
                    disabled={projects && projects.length >= MAX_PROJECTS}
                    sx={{ bgcolor: color, color: 'white', '&:hover': { bgcolor: color, opacity: 0.8 } }}
                >
                    Add Project
                </Button>
                {projects && projects.length >= MAX_PROJECTS && (
                    <Typography level="body-sm" color="danger" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                        <AlertCircle size={16} style={{ marginRight: '4px' }} />
                        Maximum number of projects reached
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};

export default ProjectsForm;