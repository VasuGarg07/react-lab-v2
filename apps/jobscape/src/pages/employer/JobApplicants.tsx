import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, FileText, Globe, Mail, Phone, Users } from 'lucide-react';
import { formatRelativeTime } from '@react-lab/shared';
import { GithubIcon, LinkedinIcon, Select, useModal } from '@react-lab/ui';
import { useMyJob } from '../../hooks/useJobscapeQueries';
import { useUpdateApplicationStatus } from '../../hooks/useJobscapeMutations';
import { initials, pluralize } from '../../helpers/job.utils';
import { APPLICATION_STATUSES, ROUTES, STATUS_STYLES, titleCase } from '../../helpers/job.constants';
import type { ApplicationStatus, JobApplication, PopulatedApplicant } from '../../helpers/job.types';

const isPopulated = (a: JobApplication['applicantId']): a is PopulatedApplicant =>
    typeof a === 'object' && a !== null;

function CoverLetterDialog({ name, text }: { name: string; text: string }) {
    return (
        <div className="w-[min(92vw,36rem)] py-2">
            <h3 className="font-display text-lg font-bold text-ink">{name}'s cover letter</h3>
            <p className="mt-3 max-h-[60vh] overflow-auto whitespace-pre-line leading-relaxed text-neutral-600">{text}</p>
        </div>
    );
}

function ApplicantRow({ application, jobId }: { application: JobApplication; jobId: string }) {
    const { open } = useModal();
    const statusMut = useUpdateApplicationStatus(jobId);
    const a = application.applicantId;
    if (!isPopulated(a)) return null;

    const socials = [
        { href: a.socialLinks?.linkedin, img: LinkedinIcon, label: 'LinkedIn' },
        { href: a.socialLinks?.github, img: GithubIcon, label: 'GitHub' },
        { href: a.socialLinks?.website, icon: Globe, label: 'Website' },
    ].filter((s) => s.href);

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-300">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    {a.photoUrl ? (
                        <img src={a.photoUrl} alt={a.fullName} className="h-11 w-11 rounded-full object-cover" />
                    ) : (
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-spruce-50 font-display text-sm font-bold text-spruce">
                            {initials(a.fullName)}
                        </span>
                    )}
                    <div className="min-w-0">
                        <p className="font-display font-bold text-ink">{a.fullName}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                            <a href={`mailto:${a.contactEmail}`} className="inline-flex items-center gap-1 hover:text-spruce">
                                <Mail className="h-3.5 w-3.5" /> {a.contactEmail}
                            </a>
                            <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {a.phoneNumber}</span>
                            <span>Applied {formatRelativeTime(application.appliedAt)}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_STYLES[application.status]}`}>
                                {titleCase(application.status)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    {socials.map(({ href, img, icon: Icon, label }, i) => (
                        <a key={i} href={href} target="_blank" rel="noreferrer" title={label} className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-sand hover:text-spruce">
                            {img ? <img src={img} alt={label} className="h-4 w-4 opacity-60" /> : Icon ? <Icon className="h-4 w-4" /> : null}
                        </a>
                    ))}
                    {application.coverLetter && (
                        <button
                            onClick={() => open(<CoverLetterDialog name={a.fullName} text={application.coverLetter!} />)}
                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-sand hover:text-spruce"
                            title="Cover letter"
                        >
                            <FileText className="h-4 w-4" />
                        </button>
                    )}
                    <a href={a.resumeURL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-spruce px-3 py-1.5 text-xs font-bold text-canvas transition-colors hover:bg-spruce-600">
                        Resume
                    </a>
                </div>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-neutral-100 pt-3">
                <span className="text-xs font-semibold text-neutral-500">Status</span>
                <div className="w-44">
                    <Select
                        options={APPLICATION_STATUSES}
                        value={application.status}
                        onChange={(value) =>
                            statusMut.mutate({ applicantId: a.id, status: value as ApplicationStatus })
                        }
                        disabled={statusMut.isPending}
                    />
                </div>
            </div>
        </div>
    );
}

export default function JobApplicants() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: job, isLoading, error } = useMyJob(id);

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
                <button onClick={() => navigate(ROUTES.manage)} className="mt-6 text-sm font-bold text-spruce hover:underline">Back to my jobs</button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 fade-up">
            <button onClick={() => navigate(ROUTES.manage)} className="inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-ink">
                <ChevronLeft className="h-4 w-4" /> My jobs
            </button>

            <header>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">Applicants</p>
                <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink">{job.title}</h1>
                <p className="mt-2 text-neutral-500">{pluralize(job.applications.length, 'candidate')} so far.</p>
            </header>

            {job.applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-sand">
                        <Users className="h-6 w-6 text-neutral-400" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-ink">No applicants yet</h2>
                    <p className="mt-1 text-sm text-neutral-500">They'll show up here the moment someone applies.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {job.applications.map((app, i) => (
                        <ApplicantRow key={i} application={app} jobId={id!} />
                    ))}
                </div>
            )}
        </div>
    );
}
