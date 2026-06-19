import { Link, useNavigate } from 'react-router';
import { FileText, MapPin, Send } from 'lucide-react';
import { formatRelativeTime } from '@react-lab/shared';
import { useModal } from '@react-lab/ui';
import { useApplications } from '../hooks/useJobscapeQueries';
import { ROUTES, STATUS_STYLES, titleCase } from '../helpers/job.constants';
import { initials } from '../helpers/job.utils';
import type { ApplicationCardInfo } from '../helpers/job.types';

function CoverLetterDialog({ application }: { application: ApplicationCardInfo }) {
    return (
        <div className="w-[min(92vw,34rem)] py-2">
            <h3 className="font-display text-lg font-bold text-ink">Your note to {application.companyName}</h3>
            <p className="mt-3 max-h-[60vh] overflow-auto whitespace-pre-line leading-relaxed text-neutral-600">
                {application.coverLetter}
            </p>
        </div>
    );
}

export default function MyApplications() {
    const navigate = useNavigate();
    const { open } = useModal();
    const { data, isLoading, error } = useApplications();

    return (
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 fade-up">
            <header>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">Your pipeline</p>
                <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink">Applications</h1>
                <p className="mt-2 text-neutral-500">Every role you've thrown your hat in for.</p>
            </header>

            {isLoading ? (
                <div className="flex min-h-60 items-center justify-center">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-spruce" />
                </div>
            ) : error ? (
                <p className="py-16 text-center text-neutral-500">Couldn't load your applications.</p>
            ) : !data || data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-sand">
                        <Send className="h-6 w-6 text-neutral-400" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-ink">No applications yet</h2>
                    <p className="mt-1 mb-6 text-sm text-neutral-500">Find a role worth your time and apply.</p>
                    <Link
                        to={ROUTES.jobs}
                        className="rounded-xl bg-spruce px-5 py-2.5 text-sm font-bold text-canvas shadow-pop transition-colors hover:bg-spruce-600"
                    >
                        Browse jobs
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {data.map((app) => (
                        <div
                            key={app.id}
                            className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:border-spruce-200 hover:shadow-card"
                        >
                            <button onClick={() => navigate(ROUTES.job(app.id))} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                                {app.logoURL ? (
                                    <img src={app.logoURL} alt={app.companyName} className="h-12 w-12 rounded-xl border border-neutral-100 object-cover" />
                                ) : (
                                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-spruce-50 font-display text-sm font-bold text-spruce">{initials(app.companyName)}</span>
                                )}
                                <div className="min-w-0">
                                    <p className="font-display line-clamp-1 font-bold text-ink group-hover:text-spruce">{app.title}</p>
                                    <p className="line-clamp-1 text-sm text-neutral-500">{app.companyName}</p>
                                    <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-neutral-400">
                                        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {app.location}</span>
                                        <span>·</span>
                                        <span>{titleCase(app.employmentType)}</span>
                                        <span>·</span>
                                        <span>Applied {formatRelativeTime(app.appliedAt)}</span>
                                    </div>
                                </div>
                            </button>
                            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLES[app.status]}`}>
                                {titleCase(app.status)}
                            </span>
                            {app.coverLetter && (
                                <button
                                    onClick={() => open(<CoverLetterDialog application={app} />)}
                                    className="shrink-0 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-sand hover:text-spruce"
                                    title="View your note"
                                >
                                    <FileText className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
