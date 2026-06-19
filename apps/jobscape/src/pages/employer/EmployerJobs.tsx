import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Archive, ArchiveRestore, Briefcase, MoreVertical, Pencil, Plus, Trash2, Users } from 'lucide-react';
import { openAlertDialog, useModal } from '@react-lab/ui';
import { useMyJobs } from '../../hooks/useJobscapeQueries';
import { useDeleteJob, useToggleArchiveJob } from '../../hooks/useJobscapeMutations';
import { ROUTES, titleCase } from '../../helpers/job.constants';
import { pluralize } from '../../helpers/job.utils';
import type { EmployerJob } from '../../helpers/job.types';

function JobRow({
    job,
    onArchive,
    onDelete,
}: {
    job: EmployerJob;
    onArchive: (job: EmployerJob) => void;
    onDelete: (job: EmployerJob) => void;
}) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-300">
            <div className="min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="font-display line-clamp-1 font-bold text-ink">{job.title}</h3>
                    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        job.isArchived ? 'bg-neutral-100 text-neutral-500' : 'bg-success-50 text-success'
                    }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${job.isArchived ? 'bg-neutral-400' : 'bg-success'}`} />
                        {job.isArchived ? 'Archived' : 'Active'}
                    </span>
                </div>
                <p className="mt-0.5 text-xs text-neutral-500">
                    {titleCase(job.jobLevel)} · {titleCase(job.employmentType)} · {job.location}
                </p>
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => navigate(ROUTES.applicants(job.id))}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-spruce-50 px-3 py-1.5 text-xs font-bold text-spruce-700 transition-colors hover:bg-spruce-100"
                >
                    <Users className="h-3.5 w-3.5" /> Applicants
                </button>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
                        className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-ink"
                        title="More"
                    >
                        <MoreVertical className="h-4 w-4" />
                    </button>
                    {menuOpen && (
                        <div className="scale-in absolute right-0 top-full z-10 mt-1 w-44 origin-top-right rounded-xl border border-neutral-200 bg-white py-1.5 shadow-lift">
                            <button onClick={() => navigate(ROUTES.editJob(job.id))} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-ink">
                                <Pencil className="h-4 w-4 text-neutral-400" /> Edit
                            </button>
                            <button onClick={() => onArchive(job)} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-ink">
                                {job.isArchived ? <ArchiveRestore className="h-4 w-4 text-neutral-400" /> : <Archive className="h-4 w-4 text-neutral-400" />}
                                {job.isArchived ? 'Reactivate' : 'Archive'}
                            </button>
                            <div className="my-1 border-t border-neutral-100" />
                            <button onClick={() => onDelete(job)} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50">
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function EmployerJobs() {
    const modal = useModal();
    const { data, isLoading, error } = useMyJobs();
    const archive = useToggleArchiveJob();
    const del = useDeleteJob();

    const onArchive = (job: EmployerJob) => archive.mutate(job.id);
    const onDelete = (job: EmployerJob) =>
        openAlertDialog(modal, {
            title: `Delete "${job.title}"?`,
            message: 'This removes the role and pulls it from every candidate\'s saved and applied lists. This cannot be undone.',
            confirmText: 'Delete',
            onConfirm: () => del.mutateAsync(job.id),
        });

    const jobs = data?.jobs ?? [];

    return (
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 fade-up">
            <header className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">Hiring</p>
                    <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink">My jobs</h1>
                    <p className="mt-2 text-neutral-500">
                        {jobs.length > 0 ? pluralize(jobs.length, 'role') + ' posted.' : 'Post your first role to start hiring.'}
                    </p>
                </div>
                <Link
                    to={ROUTES.postJob}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-spruce px-4 py-2.5 text-sm font-bold text-canvas shadow-pop transition-colors hover:bg-spruce-600"
                >
                    <Plus className="h-4 w-4" /> Post a job
                </Link>
            </header>

            {isLoading ? (
                <div className="flex min-h-60 items-center justify-center">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-spruce" />
                </div>
            ) : error ? (
                <p className="py-16 text-center text-neutral-500">Couldn't load your jobs.</p>
            ) : jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-sand">
                        <Briefcase className="h-6 w-6 text-neutral-400" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-ink">No roles yet</h2>
                    <p className="mt-1 mb-6 text-sm text-neutral-500">Your first listing is a few fields away.</p>
                    <Link to={ROUTES.postJob} className="rounded-xl bg-spruce px-5 py-2.5 text-sm font-bold text-canvas shadow-pop transition-colors hover:bg-spruce-600">
                        Post a job
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {jobs.map((job) => (
                        <JobRow key={job.id} job={job} onArchive={onArchive} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
