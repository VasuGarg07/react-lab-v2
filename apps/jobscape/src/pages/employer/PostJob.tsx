import { JobForm } from '../../forms/JobForm';
import { useCreateJob } from '../../hooks/useJobscapeMutations';

export default function PostJob() {
    const create = useCreateJob();

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 fade-up">
            <header className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">New listing</p>
                <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink">Post a job</h1>
                <p className="mt-2 text-neutral-500">The more detail you give, the better the applicants.</p>
            </header>

            <JobForm
                submitLabel="Publish job"
                isSubmitting={create.isPending}
                onSubmit={(values) => create.mutate(values)}
            />
        </div>
    );
}
