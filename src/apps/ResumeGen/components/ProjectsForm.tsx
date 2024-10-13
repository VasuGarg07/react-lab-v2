import React from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea, IconButton, Chip } from '@mui/joy';
import { FolderGit2, Plus, Trash2, X } from 'lucide-react';
import { Project } from '../helpers/interfaces';

const ProjectsForm: React.FC = () => {
    const { state, dispatch } = useResumeContext();
    const { projects } = state.resume;

    const handleChange = (index: number, field: keyof Project) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch({
            type: 'UPDATE_PROJECT',
            payload: { index, project: { [field]: event.target.value } },
        });
    };

    const handleAddProject = () => {
        dispatch({
            type: 'ADD_PROJECT',
            payload: { name: '', description: '', technologies: [], link: '' },
        });
    };

    const handleRemoveProject = (index: number) => {
        dispatch({
            type: 'REMOVE_PROJECT',
            payload: index,
        });
    };

    const handleAddTechnology = (projectIndex: number, technology: string) => {
        const updatedProject = { ...projects![projectIndex] };
        updatedProject.technologies.push(technology);
        dispatch({
            type: 'UPDATE_PROJECT',
            payload: { index: projectIndex, project: updatedProject },
        });
    };

    const handleRemoveTechnology = (projectIndex: number, technologyToRemove: string) => {
        const updatedProject = { ...projects![projectIndex] };
        updatedProject.technologies = updatedProject.technologies.filter(tech => tech !== technologyToRemove);
        dispatch({
            type: 'UPDATE_PROJECT',
            payload: { index: projectIndex, project: updatedProject },
        });
    };

    return (
        <Box>
            <Stack spacing={4}>
                {projects!.map((project, index) => (
                    <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 'md' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                            <FormLabel><FolderGit2 size={18} /> Project {index + 1}</FormLabel>
                            <IconButton
                                onClick={() => handleRemoveProject(index)}
                                size="sm"
                                variant="plain"
                                color="danger"
                            >
                                <Trash2 size={18} />
                            </IconButton>
                        </Stack>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Project Name</FormLabel>
                                <Input
                                    value={project.name}
                                    onChange={handleChange(index, 'name')}
                                    placeholder="Project Name"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    value={project.description}
                                    onChange={handleChange(index, 'description')}
                                    placeholder="Brief project description"
                                    minRows={2}
                                    maxRows={4}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Technologies Used</FormLabel>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {project.technologies.map((tech) => (
                                        <Chip
                                            key={tech}
                                            size="sm"
                                            variant="soft"
                                            endDecorator={<X size={14} onClick={() => handleRemoveTechnology(index, tech)} />}
                                        >
                                            {tech}
                                        </Chip>
                                    ))}
                                </Box>
                                <Stack direction="row" spacing={2}>
                                    <Input
                                        placeholder="Add technology"
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
                                    >
                                        Add
                                    </Button>
                                </Stack>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Project Link</FormLabel>
                                <Input
                                    value={project.link}
                                    onChange={handleChange(index, 'link')}
                                    placeholder="https://github.com/username/project"
                                />
                            </FormControl>
                        </Stack>
                    </Box>
                ))}
            </Stack>
            <Button
                onClick={handleAddProject}
                startDecorator={<Plus size={18} />}
                sx={{ mt: 2 }}
            >
                Add Project
            </Button>
        </Box>
    );
};

export default ProjectsForm;