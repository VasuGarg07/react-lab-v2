import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { LoadingButton, Select, Textarea, TextInput } from '@react-lab/ui';
import { FormSection } from './FormSection';
import { TagInput } from '../components/TagInput';
import { EMPLOYMENT_TYPES, EMPTY_APPLICANT, SHIFT_TYPES } from '../helpers/job.constants';
import { applicantSchema, type ApplicantFormValues } from '../helpers/job.schemas';
import type { ApplicantInput } from '../helpers/job.types';

interface ApplicantFormProps {
    initialValues?: ApplicantInput;
    submitLabel: string;
    isSubmitting?: boolean;
    onSubmit: (values: ApplicantInput) => void;
}

const SOCIALS = ['linkedin', 'github', 'website', 'twitter', 'youtube'] as const;

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-spruce-300 hover:text-spruce"
        >
            <Plus className="h-4 w-4" /> {label}
        </button>
    );
}

export function ApplicantForm({ initialValues, submitLabel, isSubmitting, onSubmit }: ApplicantFormProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ApplicantFormValues>({
        resolver: zodResolver(applicantSchema),
        defaultValues: initialValues ?? EMPTY_APPLICANT,
    });

    const experience = useFieldArray({ control, name: 'experience' });
    const education = useFieldArray({ control, name: 'education' });

    return (
        <form onSubmit={handleSubmit((v) => onSubmit(v as ApplicantInput))} className="space-y-5">
            <FormSection title="About you">
                <div className="grid gap-4 sm:grid-cols-2">
                    <TextInput label="Full name" required error={errors.fullName?.message} {...register('fullName')} />
                    <TextInput label="Contact email" type="email" required error={errors.contactEmail?.message} {...register('contactEmail')} />
                    <TextInput label="Phone number" required error={errors.phoneNumber?.message} {...register('phoneNumber')} />
                    <TextInput label="Photo URL" placeholder="https://…" error={errors.photoUrl?.message} {...register('photoUrl')} />
                    <div className="sm:col-span-2">
                        <Textarea label="Profile summary" rows={3} placeholder="A line or two on what you do best." error={errors.profileSummary?.message} {...register('profileSummary')} />
                    </div>
                </div>
            </FormSection>

            <FormSection title="Skills & resume">
                <div className="space-y-4">
                    <TextInput label="Resume URL" placeholder="https://…" required error={errors.resumeURL?.message} {...register('resumeURL')} />
                    <Controller control={control} name="skills" render={({ field }) => (
                        <TagInput label="Skills" value={field.value ?? []} onChange={field.onChange} placeholder="React, SQL, Figma…" error={errors.skills?.message} required />
                    )} />
                    <Controller control={control} name="languages" render={({ field }) => (
                        <TagInput label="Languages" value={field.value ?? []} onChange={field.onChange} placeholder="English, Hindi…" error={errors.languages?.message} required />
                    )} />
                </div>
            </FormSection>

            <FormSection title="What you're after">
                <div className="grid gap-4 sm:grid-cols-2">
                    <TextInput label="Expected salary" type="number" min={0} required error={errors.preference?.expectedSalary?.message} {...register('preference.expectedSalary', { valueAsNumber: true })} />
                    <Controller control={control} name="preference.jobType" render={({ field }) => (
                        <Select label="Preferred type" required options={EMPLOYMENT_TYPES} value={field.value} onChange={field.onChange} error={errors.preference?.jobType?.message} />
                    )} />
                    <Controller control={control} name="preference.shift" render={({ field }) => (
                        <Select label="Preferred shift" options={SHIFT_TYPES} value={field.value ?? ''} onChange={field.onChange} placeholder="Any" error={errors.preference?.shift?.message} />
                    )} />
                    <div className="sm:col-span-2">
                        <Controller control={control} name="preference.locations" render={({ field }) => (
                            <TagInput label="Preferred locations" value={field.value ?? []} onChange={field.onChange} placeholder="Remote, Bengaluru…" error={errors.preference?.locations?.message} required />
                        )} />
                    </div>
                </div>
            </FormSection>

            <FormSection title="Experience">
                <div className="space-y-4">
                    {experience.fields.map((f, i) => (
                        <div key={f.id} className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-semibold text-neutral-600">Role {i + 1}</span>
                                <button type="button" onClick={() => experience.remove(i)} className="text-neutral-400 transition-colors hover:text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <TextInput label="Title" error={errors.experience?.[i]?.title?.message} {...register(`experience.${i}.title` as const)} />
                                <TextInput label="Company" error={errors.experience?.[i]?.company?.message} {...register(`experience.${i}.company` as const)} />
                                <TextInput label="Duration" placeholder="2021 – 2023" error={errors.experience?.[i]?.duration?.message} {...register(`experience.${i}.duration` as const)} />
                                <div className="sm:col-span-2">
                                    <Textarea label="What you did" rows={2} error={errors.experience?.[i]?.description?.message} {...register(`experience.${i}.description` as const)} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <AddButton onClick={() => experience.append({ title: '', company: '', duration: '', description: '' })} label="Add a role" />
                </div>
            </FormSection>

            <FormSection title="Education">
                <div className="space-y-4">
                    {education.fields.map((f, i) => (
                        <div key={f.id} className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-semibold text-neutral-600">Entry {i + 1}</span>
                                <button type="button" onClick={() => education.remove(i)} className="text-neutral-400 transition-colors hover:text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                                <TextInput label="Degree" error={errors.education?.[i]?.degree?.message} {...register(`education.${i}.degree` as const)} />
                                <TextInput label="Institution" error={errors.education?.[i]?.institution?.message} {...register(`education.${i}.institution` as const)} />
                                <TextInput label="Year" placeholder="2020" error={errors.education?.[i]?.year?.message} {...register(`education.${i}.year` as const)} />
                            </div>
                        </div>
                    ))}
                    <AddButton onClick={() => education.append({ degree: '', institution: '', year: '' })} label="Add education" />
                </div>
            </FormSection>

            <FormSection title="Social links" hint="Leave blank to skip.">
                <div className="grid gap-4 sm:grid-cols-2">
                    {SOCIALS.map((s) => (
                        <TextInput
                            key={s}
                            label={s[0].toUpperCase() + s.slice(1)}
                            placeholder="https://…"
                            error={errors.socialLinks?.[s]?.message}
                            {...register(`socialLinks.${s}` as const)}
                        />
                    ))}
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
