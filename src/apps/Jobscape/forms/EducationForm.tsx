import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, IconButton, Input, Stack, Typography } from '@mui/joy';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Control, Controller, FieldErrors, useFieldArray } from 'react-hook-form';
import { IApplicant, IEducation } from '@/apps/Jobscape/helpers/job.types';

interface EducationEntryProps {
    education: IEducation;
    onEdit: () => void;
    onDelete: () => void;
}

const EducationEntry: React.FC<EducationEntryProps> = ({ education, onEdit, onDelete }) => (
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
            <Typography level="title-md">{education.degree}</Typography>
            <Typography level="body-sm" color="neutral">{education.institution} ({education.year})</Typography>
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

interface EducationFormProps {
    control: Control<IApplicant>;
    errors: FieldErrors<IApplicant>;
}

const EducationForm: React.FC<EducationFormProps> = ({ control, errors }) => {
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "education"
    });

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const currentIndex = editIndex ?? fields.length;
    const currentValues = {
        degree: control._getWatch(`education.${currentIndex}.degree`),
        institution: control._getWatch(`education.${currentIndex}.institution`),
        year: control._getWatch(`education.${currentIndex}.year`),
    };

    // const isFormValid = () => {
    //     return !!(
    //         currentValues.degree?.trim() &&
    //         currentValues.institution?.trim() &&
    //         currentValues.year?.trim()
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

    const EducationFormFields = () => (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Controller
                        name={`education.${editIndex !== null ? editIndex : fields.length}.institution`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <FormControl error={!!errors.education?.[editIndex ?? fields.length]?.institution}>
                                <FormLabel>Institution</FormLabel>
                                <Input {...field} placeholder="e.g. University of Technology" />
                                <FormHelperText>
                                    {errors.education?.[editIndex ?? fields.length]?.institution?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <Controller
                        name={`education.${editIndex !== null ? editIndex : fields.length}.degree`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <FormControl error={!!errors.education?.[editIndex ?? fields.length]?.degree}>
                                <FormLabel>Degree/Certification</FormLabel>
                                <Input {...field} placeholder="e.g. Bachelor of Science in Computer Science" />
                                <FormHelperText>
                                    {errors.education?.[editIndex ?? fields.length]?.degree?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <Controller
                        name={`education.${editIndex !== null ? editIndex : fields.length}.year`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <FormControl error={!!errors.education?.[editIndex ?? fields.length]?.year}>
                                <FormLabel>Year</FormLabel>
                                <Input {...field} placeholder="e.g. 2020" />
                                <FormHelperText>
                                    {errors.education?.[editIndex ?? fields.length]?.year?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>

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
                    {editIndex !== null ? 'Save Changes' : 'Add Education'}
                </Button>
            </Stack>
        </Stack>
    );

    if (isAdding || editIndex !== null) {
        return <EducationFormFields />;
    }

    return (
        <Stack spacing={2}>
            {fields.map((field, index) => (
                <EducationEntry
                    key={field.id}
                    education={field}
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
                Add Education
            </Button>
        </Stack>
    );
};

export default EducationForm;