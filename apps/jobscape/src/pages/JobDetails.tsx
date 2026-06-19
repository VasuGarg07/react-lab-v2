import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Bookmark, Briefcase, Check, ChevronLeft, Clock, MapPin, Send, Sun, Users } from 'lucide-react';
import { LoadingButton, Textarea, useModal } from '@react-lab/ui';
import { useApplications, useJob, useSavedJobs } from '../hooks/useJobscapeQueries';
import { useApplyToJob, useToggleSaveJob } from '../hooks/useJobscapeMutations';
import { STATUS_STYLES, titleCase } from '../helpers/job.constants';
import { initials, openingsLabel } from '../helpers/job.utils';

function ApplyDialog({ jobId, onDone }: { jobId: string; onDone: () => void }) {
    const [coverLetter, setCoverLetter] = useState('');
    const apply = useApplyToJob();

    const submit = () =>
        apply.mutate({ jobId, coverLetter: coverLetter.trim() || undefined }, { onSuccess: onDone });

    return (
        <div className="w-full py-2">
            <h3 className="font-display text-xl font-bold text-ink">Submit your application</h3>
            <p className="mt-1 text-sm text-neutral-500">
                Your profile goes to the employer. Add a note to make it personal.
            </p>
            <div className="mt-5">
                <Textarea
                    label="Cover letter (optional)"
                    rows={6}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="A few lines on why this role is a fit…"
                />
            </div>
            <div className="mt-5 flex justify-end gap-2">
                <button
                    onClick={onDone}
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-500 hover:text-ink"
                >
                    Cancel
                </button>
                <LoadingButton onClick={submit} isLoading={apply.isPending} loadingText="Sending…">
                    <Send className="h-4 w-4" /> Send application
                </LoadingButton>
            </div>
        </div>
    );
}

function Prose({ heading, body }: { heading: string; body?: string }) {
    if (!body) return null;
    return (
        <section>
            <h2 className="font-display text-base font-bold text-ink">{heading}</h2>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-neutral-600">{body}</p>
        </section>
    );
}

function BulletList({ heading, items }: { heading: string; items?: string[] }) {
    if (!items?.length) return null;
    return (
        <section>
            <h2 className="font-display text-base font-bold text-ink">{heading}</h2>
            <ul className="mt-2 space-y-1.5 text-neutral-600">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-spruce" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { open, close } = useModal();
    const { data: job, isLoading, error } = useJob(id);
    const { data: savedJobs } = useSavedJobs();
    const { data: applications } = useApplications();
    const toggleSave = useToggleSaveJob();

    const isSaved = !!savedJobs?.some((j) => j.id === id);
    const myApplication = applications?.find((a) => a.id === id);

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-spruce" />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-24 text-center">
                <h1 className="font-display text-2xl font-bold text-ink">This role isn't available</h1>
                <p className="mt-2 text-neutral-500">It may have been filled or taken down.</p>
                <button onClick={() => navigate(-1)} className="mt-6 text-sm font-bold text-spruce hover:underline">
                    Go back
                </button>
            </div>
        );
    }

    const facts = [
        { icon: MapPin, label: job.location },
        { icon: Briefcase, label: titleCase(job.employmentType) },
        { icon: Clock, label: titleCase(job.jobLevel) },
        { icon: Sun, label: titleCase(job.shiftType) },
    ];

    return (
        <div className="mx-auto max-w-5xl space-y-5 px-4 py-10 sm:px-6 fade-up">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-ink"
            >
                <ChevronLeft className="h-4 w-4" /> Back
            </button>

            <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-canvas sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-spruce/30 blur-3xl" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                        {job.logoURL ? (
                            <img src={job.logoURL} alt={job.companyName} className="h-16 w-16 rounded-2xl object-cover" />
                        ) : (
                            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 font-display text-lg font-bold">
                                {initials(job.companyName)}
                            </span>
                        )}
                        <div>
                            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{job.title}</h1>
                            <p className="mt-1 text-canvas/70">{job.companyName}</p>
                            <p className="font-display mt-3 text-lg font-bold">{job.salaryRange}</p>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            onClick={() => toggleSave.mutate(job.id)}
                            disabled={toggleSave.isPending}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-white/10 disabled:opacity-50"
                        >
                            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                            {isSaved ? 'Saved' : 'Save'}
                        </button>
                        {myApplication ? (
                            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-bold text-canvas">
                                <Check className="h-4 w-4" /> Applied
                                <span className={`rounded-full px-2 py-0.5 text-[11px] ${STATUS_STYLES[myApplication.status]}`}>
                                    {titleCase(myApplication.status)}
                                </span>
                            </span>
                        ) : (
                            <button
                                onClick={() => open(<ApplyDialog jobId={job.id} onDone={close} />)}
                                className="inline-flex items-center gap-2 rounded-xl bg-coral px-5 py-2.5 text-sm font-bold text-white shadow-pop transition-transform hover:scale-[1.02]"
                            >
                                <Send className="h-4 w-4" /> Apply now
                            </button>
                        )}
                    </div>
                </div>

                <div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-sm text-canvas/80">
                    {facts.map(({ icon: Icon, label }) => (
                        <span key={label} className="inline-flex items-center gap-1.5">
                            <Icon className="h-4 w-4 text-canvas/50" /> {label}
                        </span>
                    ))}
                    <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-canvas/50" /> {job.applicationCount} applied
                    </span>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
                <div className="space-y-7 rounded-3xl border border-neutral-200 bg-white p-6 shadow-card sm:p-8">
                    <Prose heading="About the role" body={job.description} />
                    <BulletList heading="What you'll do" items={job.responsibilities} />
                    <BulletList heading="What we're looking for" items={job.requirements} />
                    <BulletList heading="Perks & benefits" items={job.benefits} />
                </div>

                <aside className="space-y-5">
                    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-card">
                        <h3 className="font-display text-sm font-bold text-ink">At a glance</h3>
                        <dl className="mt-3 space-y-2.5 text-sm">
                            <div className="flex justify-between gap-3">
                                <dt className="text-neutral-400">Experience</dt>
                                <dd className="text-right font-medium text-ink">{job.experienceRequired}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-neutral-400">Openings</dt>
                                <dd className="text-right font-medium text-ink">{openingsLabel(job.vacancies)}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-neutral-400">Level</dt>
                                <dd className="text-right font-medium text-ink">{titleCase(job.jobLevel)}</dd>
                            </div>
                        </dl>
                    </div>

                    {job.skillsRequired.length > 0 && (
                        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-card">
                            <h3 className="font-display text-sm font-bold text-ink">Skills</h3>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {job.skillsRequired.map((s) => (
                                    <span key={s} className="rounded-md bg-spruce-50 px-2 py-1 text-xs font-medium text-spruce-700">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
