import { Link } from 'react-router';
import { Bookmark } from 'lucide-react';
import JobCard from '../components/JobCard';
import { useSavedJobs } from '../hooks/useJobscapeQueries';
import { ROUTES } from '../helpers/job.constants';

export default function SavedJobs() {
    const { data, isLoading, error } = useSavedJobs();

    return (
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 fade-up">
            <header>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">For later</p>
                <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink">Saved jobs</h1>
                <p className="mt-2 text-neutral-500">Roles you've bookmarked to revisit.</p>
            </header>

            {isLoading ? (
                <div className="flex min-h-60 items-center justify-center">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-spruce" />
                </div>
            ) : error ? (
                <p className="py-16 text-center text-neutral-500">Couldn't load saved jobs.</p>
            ) : !data || data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-sand">
                        <Bookmark className="h-6 w-6 text-neutral-400" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-ink">Nothing saved yet</h2>
                    <p className="mt-1 mb-6 text-sm text-neutral-500">Tap the bookmark on any role to keep it here.</p>
                    <Link
                        to={ROUTES.jobs}
                        className="rounded-xl bg-spruce px-5 py-2.5 text-sm font-bold text-canvas shadow-pop transition-colors hover:bg-spruce-600"
                    >
                        Browse jobs
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
            )}
        </div>
    );
}
