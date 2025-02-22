import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Upload } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import RichTextEditor from '@/shared/RichTextEditor';
import { JOB_LEVELS, JOB_TYPES, SHIFT_TYPES } from '@/apps/Jobscape/helpers/job.constants';
import { FormProps, IJob } from '@/apps/Jobscape/helpers/job.types';
import TagsListInput from '@/apps/Jobscape/forms/TagsListInput';
import SalaryRangeSlider from '@/apps/Jobscape/forms/SalaryRange';

const JobForm: React.FC<FormProps<IJob>> = ({ onSubmit, btnLabel }) => {

    const [skillInput, setSkillInput] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const { handleSubmit, control, formState: { errors } } = useFormContext<IJob>();

    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <FormControl required error={!!errors.title}>
                                        <FormLabel>Job Title</FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="Enter the job title"
                                        />
                                        {errors.title && (
                                            <FormHelperText>{errors.title.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid xs={12} sm={8}>
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <FormControl required error={!!errors.location}>
                                        <FormLabel>Location</FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="Enter the job location"
                                        />
                                        {errors.location && (
                                            <FormHelperText>{errors.location.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid xs={12} sm={4}>
                            <Controller
                                name="jobLevel"
                                control={control}
                                render={({ field: { onChange, value, ref, ...field } }) => (
                                    <FormControl required error={!!errors.jobLevel}>
                                        <FormLabel>Job Level</FormLabel>
                                        <Select
                                            {...field}
                                            value={value || ''}
                                            onChange={(_, newValue) => onChange(newValue)}
                                            ref={ref}
                                        >
                                            {JOB_LEVELS.map(type => (
                                                <Option
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.displayName}
                                                </Option>
                                            ))}
                                        </Select>
                                        {errors.jobLevel && (
                                            <FormHelperText>{errors.jobLevel.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid xs={12}>
                            <Controller
                                name="tags"
                                control={control}
                                render={({ field }) => (
                                    <FormControl error={!!errors.tags}>
                                        <FormLabel>Job Tags</FormLabel>
                                        <TagsListInput
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            inputValue={tagsInput}
                                            onInputChange={setTagsInput}
                                            maxTags={5}
                                            placeholder="Type and press Enter to add tags"
                                        />
                                        {errors.tags && (
                                            <FormHelperText>{errors.tags.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid xs={12}>
                            <Controller
                                name="isFeatured"
                                control={control}
                                render={({ field }) => (
                                    <FormControl error={!!errors.isFeatured}>
                                        <FormLabel>Featured</FormLabel>
                                        <RadioGroup defaultValue={false} {...field} sx={{ flexDirection: 'row', gap: 3 }}>
                                            <Radio value={true} label="Yes" variant="outlined" sx={{ m: 0 }} />
                                            <Radio value={false} label="No" variant="outlined" sx={{ m: 0 }} />
                                        </RadioGroup>
                                        {errors.isFeatured && (
                                            <FormHelperText>{errors.isFeatured.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Typography level='body-sm'>Advance Information</Typography>
                    <Grid container spacing={2}>

                        <Grid xs={12}>
                            <SalaryRangeSlider control={control} errors={errors} />
                        </Grid>

                        <Grid xs={12}>
                            <Controller
                                name="skillsRequired"
                                control={control}
                                render={({ field }) => (
                                    <FormControl error={!!errors.skillsRequired}>
                                        <FormLabel>Skills Required</FormLabel>
                                        <TagsListInput
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            inputValue={skillInput}
                                            onInputChange={setSkillInput}
                                            maxTags={10}
                                            placeholder="Type and press Enter to add skills"
                                        />
                                        {errors.skillsRequired && (
                                            <FormHelperText>{errors.skillsRequired.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <Controller
                                name="employmentType"
                                control={control}
                                render={({ field: { onChange, value, ref, ...field } }) => (
                                    <FormControl required error={!!errors.employmentType}>
                                        <FormLabel>Employment Type</FormLabel>
                                        <Select
                                            {...field}
                                            value={value || ''}
                                            onChange={(_, newValue) => onChange(newValue)}
                                            ref={ref}
                                        >
                                            {JOB_TYPES.map(type => (
                                                <Option
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.displayName}
                                                </Option>
                                            ))}
                                        </Select>
                                        {errors.employmentType && (
                                            <FormHelperText>{errors.employmentType.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <Controller
                                name="shiftType"
                                control={control}
                                render={({ field: { onChange, value, ref, ...field } }) => (
                                    <FormControl required error={!!errors.shiftType}>
                                        <FormLabel>Shift Type</FormLabel>
                                        <Select
                                            {...field}
                                            value={value || ''}
                                            onChange={(_, newValue) => onChange(newValue)}
                                            ref={ref}
                                        >
                                            {SHIFT_TYPES.map(type => (
                                                <Option
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.displayName}
                                                </Option>
                                            ))}
                                        </Select>
                                        {errors.shiftType && (
                                            <FormHelperText>{errors.shiftType.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <Controller
                                name="vacancies"
                                control={control}
                                render={({ field }) => (
                                    <FormControl required error={!!errors.vacancies}>
                                        <FormLabel>Vacancies</FormLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            slotProps={{ input: { min: 0, step: 1, max: 100 } }}
                                        />
                                        {errors.vacancies && (
                                            <FormHelperText>{errors.vacancies.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <Controller
                                name="experienceRequired"
                                control={control}
                                render={({ field }) => (
                                    <FormControl required error={!!errors.experienceRequired}>
                                        <FormLabel>Experience</FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="Enter Desired Experience"
                                        />
                                        {errors.experienceRequired && (
                                            <FormHelperText>{errors.experienceRequired.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Typography level='body-sm'>Additional Details</Typography>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.description}>
                                <FormLabel>Description</FormLabel>
                                <RichTextEditor
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    placeholder="Write about job details..."
                                />
                                {errors.description && (
                                    <FormHelperText>{errors.description.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="requirements"
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.requirements}>
                                <FormLabel>Requirements</FormLabel>
                                <RichTextEditor
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    placeholder="What are the requirements for this role?"
                                />
                                {errors.requirements && (
                                    <FormHelperText>{errors.requirements.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="responsibilities"
                        control={control}
                        render={({ field }) => (
                            <FormControl error={!!errors.responsibilities}>
                                <FormLabel>Responsibilities</FormLabel>
                                <RichTextEditor
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    placeholder="What are the key responsibilities?"
                                />
                                {errors.responsibilities && (
                                    <FormHelperText>{errors.responsibilities.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="benefits"
                        control={control}
                        render={({ field }) => (
                            <FormControl required error={!!errors.benefits}>
                                <FormLabel>Benefits</FormLabel>
                                <RichTextEditor
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    placeholder="Any perks or benefits offered?"
                                />
                                {errors.benefits && (
                                    <FormHelperText>{errors.benefits.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Stack>

                <Stack direction='row' spacing={3} justifyContent='flex-end' marginTop={2}>
                    <Button
                        variant="solid"
                        color="primary"
                        type="submit"
                        endDecorator={<Upload size={20} />}
                    >
                        {btnLabel}
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}

export default JobForm