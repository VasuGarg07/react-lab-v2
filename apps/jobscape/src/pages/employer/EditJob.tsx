import { useNavigate, useParams } from 'react-router';
import { JobForm } from '../../forms/JobForm';
import { useMyJob } from '../../hooks/useJobscapeQueries';
import { useUpdateJob } from '../../hooks/useJobscapeMutations';
import { jobToInput } from '../../helpers/job.utils';

export default function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: job, isLoading, error } = useMyJob(id);
    const update = useUpdateJob(id!);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-spruce" />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-24 text-center">
                <h1 className="font-display text-2xl font-bold text-ink">Job not found</h1>
                <button onClick={() => navigate(-1)} className="mt-6 text-sm font-bold text-spruce hover:underline">Go back</button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 fade-up">
            <header className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">Editing</p>
                <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink">{job.title}</h1>
                <p className="mt-2 text-neutral-500">Update the details and save.</p>
            </header>

            <JobForm
                initialValues={jobToInput(job)}
                submitLabel="Save changes"
                isSubmitting={update.isPending}
                onSubmit={(values) => update.mutate(values)}
            />
        </div>
    );
}
