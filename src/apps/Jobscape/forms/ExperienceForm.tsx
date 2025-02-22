import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, IconButton, Input, Stack, Typography } from '@mui/joy';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Control, Controller, FieldErrors, useFieldArray } from 'react-hook-form';
import RichTextEditor from '@/components/RichTextEditor';
import { IApplicant, IExperience } from '@/apps/Jobscape/helpers/job.types';


interface ExperienceEntryProps {
    experience: IExperience;
    onEdit: () => void;
    onDelete: () => void;
}

const ExperienceEntry: React.FC<ExperienceEntryProps> = ({ experience, onEdit, onDelete }) => (
    <Box
        sx={{
            p: 2,
            borderRadius: 'md',
            bgcolor: 'background.level1',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
        }}
    >
        <Box sx={{ flex: 1 }}>
            <Typography level="title-md">
                {experience.title + ' @ '}
                <Typography level="body-md">{experience.company}</Typography>
            </Typography>
            <Typography level="body-sm" color="neutral">{experience.duration}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
            <IconButton
                variant="plain"
                color="neutral"
                onClick={onEdit}
            >
                <Pencil size={18} />
            </IconButton>
            <IconButton
                variant="plain"
                color="danger"
                onClick={onDelete}
            >
                <Trash2 size={18} />
            </IconButton>
        </Stack>
    </Box>
);

interface ExperienceFormProps {
    control: Control<IApplicant>;
    errors: FieldErrors<IApplicant>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ control, errors }) => {
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "experience"
    });

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const currentIndex = editIndex ?? fields.length;
    const currentValues = {
        title: control._getWatch(`experience.${currentIndex}.title`),
        company: control._getWatch(`experience.${currentIndex}.company`),
        duration: control._getWatch(`experience.${currentIndex}.duration`),
        description: control._getWatch(`experience.${currentIndex}.description`)
    };

    // const isFormValid = () => {
    //     return !!(
    //         currentValues.title?.trim() &&
    //         currentValues.company?.trim() &&
    //         currentValues.duration?.trim() &&
    //         currentValues.description?.trim()
    //     );
    // };

    const handleSave = () => {
        if (editIndex !== null) {
            update(editIndex, currentValues);
        } else {
            append(currentValues);
        }

        setEditIndex(null);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditIndex(null);
        setIsAdding(false);
    }

    const ExperienceFormFields = () => (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <Controller
                        name={`experience.${editIndex !== null ? editIndex : fields.length}.title`}
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.experience?.[editIndex ?? fields.length]?.title}>
                                <FormLabel>Job Title</FormLabel>
                                <Input {...field} placeholder="e.g. Senior Software Engineer" />
                                <FormHelperText>
                                    {errors.experience?.[editIndex ?? fields.length]?.title?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid xs={12} md={4}>
                    <Controller
                        name={`experience.${editIndex !== null ? editIndex : fields.length}.company`}
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.experience?.[editIndex ?? fields.length]?.company}>
                                <FormLabel>Company Name</FormLabel>
                                <Input {...field} placeholder="e.g. Acme Corp" />
                                <FormHelperText>
                                    {errors.experience?.[editIndex ?? fields.length]?.company?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid xs={12} md={4}>
                    <Controller
                        name={`experience.${editIndex !== null ? editIndex : fields.length}.duration`}
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.experience?.[editIndex ?? fields.length]?.duration}>
                                <FormLabel>Duration</FormLabel>
                                <Input {...field} placeholder="e.g. Jan 2020 - Present" />
                                <FormHelperText>
                                    {errors.experience?.[editIndex ?? fields.length]?.duration?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>

            <Controller
                name={`experience.${editIndex !== null ? editIndex : fields.length}.description`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <FormControl required error={!!errors.experience?.[editIndex ?? fields.length]?.description}>
                        <FormLabel>Description</FormLabel>
                        <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Describe your responsibilities and achievements..."
                        />
                        <FormHelperText>
                            {errors.experience?.[editIndex ?? fields.length]?.description?.message}
                        </FormHelperText>
                    </FormControl>
                )}
            />

            <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                    variant="plain"
                    color="neutral"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    // disabled={!isFormValid()}
                    onClick={handleSave}
                >
                    {editIndex !== null ? 'Save Changes' : 'Add Experience'}
                </Button>
            </Stack>
        </Stack>
    );

    if (isAdding || editIndex !== null) {
        return <ExperienceFormFields />;
    }

    return (
        <Stack spacing={2}>
            {fields.map((field, index) => (
                <ExperienceEntry
                    key={field.id}
                    experience={field}
                    onEdit={() => setEditIndex(index)}
                    onDelete={() => remove(index)}
                />
            ))}

            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Plus size={20} />}
                onClick={() => setIsAdding(true)}
            >
                Add Experience
            </Button>
        </Stack>
    );
};

export default ExperienceForm;