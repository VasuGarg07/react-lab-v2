import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton, Select, Textarea, TextInput } from '@react-lab/ui';
import { FormSection } from './FormSection';
import { TagInput } from '../components/TagInput';
import { EMPLOYMENT_TYPES, EMPTY_JOB, JOB_LEVELS, SHIFT_TYPES } from '../helpers/job.constants';
import { jobSchema, type JobFormValues } from '../helpers/job.schemas';
import type { JobInput } from '../helpers/job.types';

interface JobFormProps {
    initialValues?: JobInput;
    submitLabel: string;
    isSubmitting?: boolean;
    onSubmit: (values: JobInput) => void;
}

export function JobForm({ initialValues, submitLabel, isSubmitting, onSubmit }: JobFormProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: initialValues ?? EMPTY_JOB,
    });

    return (
        <form onSubmit={handleSubmit((v) => onSubmit(v as JobInput))} className="space-y-5">
            <FormSection title="The basics">
                <div className="grid gap-4 sm:grid-cols-2">
                    <TextInput label="Job title" required error={errors.title?.message} {...register('title')} />
                    <TextInput label="Location" required error={errors.location?.message} {...register('location')} />
                    <Controller control={control} name="jobLevel" render={({ field }) => (
                        <Select label="Seniority" required options={JOB_LEVELS} value={field.value} onChange={field.onChange} error={errors.jobLevel?.message} />
                    )} />
                    <Controller control={control} name="employmentType" render={({ field }) => (
                        <Select label="Employment type" required options={EMPLOYMENT_TYPES} value={field.value} onChange={field.onChange} error={errors.employmentType?.message} />
                    )} />
                    <Controller control={control} name="shiftType" render={({ field }) => (
                        <Select label="Shift" required options={SHIFT_TYPES} value={field.value} onChange={field.onChange} error={errors.shiftType?.message} />
                    )} />
                    <TextInput label="Vacancies" type="number" min={1} required error={errors.vacancies?.message} {...register('vacancies', { valueAsNumber: true })} />
                    <TextInput label="Salary range" placeholder="e.g. ₹8L – ₹12L / yr" required error={errors.salaryRange?.message} {...register('salaryRange')} />
                    <TextInput label="Experience" placeholder="e.g. 2–4 years" required error={errors.experienceRequired?.message} {...register('experienceRequired')} />
                </div>
            </FormSection>

            <FormSection title="The story" hint="Markdown isn't supported — plain text reads cleanest.">
                <div className="space-y-4">
                    <Textarea label="About the role" rows={4} required error={errors.description?.message} {...register('description')} />
                    <Textarea label="What we're looking for" rows={4} required placeholder="One requirement per line" error={errors.requirements?.message} {...register('requirements')} />
                    <Textarea label="What you'll do" rows={3} placeholder="One responsibility per line" error={errors.responsibilities?.message} {...register('responsibilities')} />
                    <Textarea label="Perks & benefits" rows={3} placeholder="One perk per line" error={errors.benefits?.message} {...register('benefits')} />
                </div>
            </FormSection>

            <FormSection title="Skills & tags">
                <div className="space-y-4">
                    <Controller control={control} name="skillsRequired" render={({ field }) => (
                        <TagInput label="Skills required" value={field.value ?? []} onChange={field.onChange} placeholder="Type a skill, press Enter" error={errors.skillsRequired?.message} required />
                    )} />
                    <Controller control={control} name="tags" render={({ field }) => (
                        <TagInput label="Tags" value={field.value ?? []} onChange={field.onChange} placeholder="Optional — helps search" />
                    )} />
                </div>
            </FormSection>

            <div className="flex justify-end">
                <LoadingButton type="submit" isLoading={isSubmitting} loadingText="Saving…" className="bg-spruce hover:bg-spruce-600">
                    {submitLabel}
                </LoadingButton>
            </div>
        </form>
    );
}
