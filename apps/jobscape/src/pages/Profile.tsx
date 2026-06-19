import { ApplicantForm } from '../forms/ApplicantForm';
import { EmployerForm } from '../forms/EmployerForm';
import { useJobscape } from '../hooks/useJobscape';
import { useUpdateProfile } from '../hooks/useJobscapeMutations';
import { cleanApplicant, cleanEmployer } from '../helpers/job.utils';
import type { Applicant, Employer } from '../helpers/job.types';

export default function Profile() {
    const { role, profile, loading } = useJobscape();
    const update = useUpdateProfile();

    if (loading || !profile || !role) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-spruce" />
            </div>
        );
    }

    const isApplicant = role === 'applicant';

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 fade-up">
            <header className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">
                    {isApplicant ? 'Candidate profile' : 'Company profile'}
                </p>
                <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink">
                    {isApplicant ? 'Your profile' : (profile as Employer).companyName}
                </h1>
                <p className="mt-2 text-neutral-500">Keep this current — it's the first thing people see.</p>
            </header>

            {isApplicant ? (
                <ApplicantForm
                    initialValues={profile as Applicant}
                    submitLabel="Save changes"
                    isSubmitting={update.isPending}
                    onSubmit={(values) => update.mutate(cleanApplicant(values))}
                />
            ) : (
                <EmployerForm
                    initialValues={profile as Employer}
                    submitLabel="Save changes"
                    isSubmitting={update.isPending}
                    onSubmit={(values) => update.mutate(cleanEmployer(values))}
                />
            )}
        </div>
    );
}
