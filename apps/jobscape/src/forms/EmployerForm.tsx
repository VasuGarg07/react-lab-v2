import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton, Select, Textarea, TextInput } from '@react-lab/ui';
import { FormSection } from './FormSection';
import { EMPTY_EMPLOYER, ESTABLISHMENT_YEARS, INDUSTRIES, TEAM_SIZES } from '../helpers/job.constants';
import { employerSchema, type EmployerFormValues } from '../helpers/job.schemas';
import type { EmployerInput } from '../helpers/job.types';

interface EmployerFormProps {
    initialValues?: EmployerInput;
    submitLabel: string;
    isSubmitting?: boolean;
    onSubmit: (values: EmployerInput) => void;
}

const SOCIALS = ['linkedin', 'twitter', 'facebook', 'instagram', 'youtube'] as const;

export function EmployerForm({ initialValues, submitLabel, isSubmitting, onSubmit }: EmployerFormProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<EmployerFormValues>({
        resolver: zodResolver(employerSchema),
        defaultValues: initialValues ?? EMPTY_EMPLOYER,
    });

    return (
        <form onSubmit={handleSubmit((v) => onSubmit(v as EmployerInput))} className="space-y-5">
            <FormSection title="Company">
                <div className="grid gap-4 sm:grid-cols-2">
                    <TextInput label="Company name" required error={errors.companyName?.message} {...register('companyName')} />
                    <TextInput label="Logo URL" placeholder="https://…" required error={errors.logoURL?.message} {...register('logoURL')} />
                    <Controller control={control} name="industry" render={({ field }) => (
                        <Select label="Industry" required options={INDUSTRIES} value={field.value} onChange={field.onChange} placeholder="Pick an industry" error={errors.industry?.message} />
                    )} />
                    <Controller control={control} name="employeeStrength" render={({ field }) => (
                        <Select label="Team size" required options={TEAM_SIZES} value={field.value} onChange={field.onChange} placeholder="Pick a range" error={errors.employeeStrength?.message} />
                    )} />
                    <Controller control={control} name="yearOfEstablishment" render={({ field }) => (
                        <Select label="Founded" required options={ESTABLISHMENT_YEARS} value={field.value} onChange={field.onChange} placeholder="Pick a year" error={errors.yearOfEstablishment?.message} />
                    )} />
                    <TextInput label="Website" placeholder="https://…" error={errors.websiteUrl?.message} {...register('websiteUrl')} />
                </div>
            </FormSection>

            <FormSection title="How to reach you" hint="Email and phone must be unique across Jobscape.">
                <div className="grid gap-4 sm:grid-cols-2">
                    <TextInput label="Contact email" type="email" required error={errors.contactEmail?.message} {...register('contactEmail')} />
                    <TextInput label="Contact number" required error={errors.contactNumber?.message} {...register('contactNumber')} />
                    <div className="sm:col-span-2">
                        <Textarea label="Address" rows={2} required error={errors.address?.message} {...register('address')} />
                    </div>
                </div>
            </FormSection>

            <FormSection title="Your pitch" hint="Optional, but candidates read these.">
                <div className="space-y-4">
                    <Textarea label="Overview" rows={3} error={errors.companyOverview?.message} {...register('companyOverview')} />
                    <Textarea label="Vision" rows={3} error={errors.companyVision?.message} {...register('companyVision')} />
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
