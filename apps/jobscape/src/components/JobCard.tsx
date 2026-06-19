import { Link } from 'react-router';
import { MapPin, Users } from 'lucide-react';
import { ROUTES, titleCase } from '../helpers/job.constants';
import { initials } from '../helpers/job.utils';
import type { JobCardInfo } from '../helpers/job.types';

function Logo({ src, name }: { src?: string; name: string }) {
    if (!src) {
        return (
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-spruce-50 font-display text-sm font-bold text-spruce">
                {initials(name)}
            </span>
        );
    }
    return (
        <img
            src={src}
            alt={name}
            className="h-12 w-12 shrink-0 rounded-xl border border-neutral-100 object-cover"
            onError={(e) => {
                e.currentTarget.outerHTML = `<span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-spruce-50 font-display text-sm font-bold text-spruce">${initials(name)}</span>`;
            }}
        />
    );
}

export default function JobCard({ job }: { job: JobCardInfo }) {
    return (
        <Link
            to={ROUTES.job(job.id)}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-spruce-200 hover:shadow-lift"
        >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-spruce to-spruce-300 transition-transform duration-300 group-hover:scale-x-100" />

            <div className="flex items-start gap-3">
                <Logo src={job.logoURL} name={job.companyName} />
                <div className="min-w-0 flex-1">
                    <h3 className="font-display line-clamp-1 font-bold text-ink transition-colors group-hover:text-spruce">
                        {job.title}
                    </h3>
                    <p className="line-clamp-1 text-sm text-neutral-500">{job.companyName}</p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-spruce-50 px-2.5 py-1 text-xs font-semibold text-spruce-700">
                    {titleCase(job.employmentType)}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                    <MapPin className="h-3.5 w-3.5" /> {job.location}
                </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                <span className="font-display text-sm font-bold tabular-nums text-ink">{job.salaryRange}</span>
                {typeof job.applicationCount === 'number' && (
                    <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                        <Users className="h-3.5 w-3.5" /> {job.applicationCount}
                    </span>
                )}
            </div>
        </Link>
    );
}
