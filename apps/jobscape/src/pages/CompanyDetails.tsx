import { useNavigate, useParams } from 'react-router';
import { Briefcase, ChevronLeft, Globe, MapPin, Users } from 'lucide-react';
import JobCard from '../components/JobCard';
import { useCompany } from '../hooks/useJobscapeQueries';
import { initials, pluralize } from '../helpers/job.utils';

export default function CompanyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, error } = useCompany(id);

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-spruce" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-24 text-center">
                <h1 className="font-display text-2xl font-bold text-ink">Company not found</h1>
                <button onClick={() => navigate(-1)} className="mt-6 text-sm font-bold text-spruce hover:underline">
                    Go back
                </button>
            </div>
        );
    }

    const { company, jobs, jobCount } = data;

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 fade-up">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-ink"
            >
                <ChevronLeft className="h-4 w-4" /> Back
            </button>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-card sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    {company.logoURL ? (
                        <img src={company.logoURL} alt={company.companyName} className="h-20 w-20 rounded-2xl border border-neutral-100 object-cover" />
                    ) : (
                        <span className="grid h-20 w-20 place-items-center rounded-2xl bg-spruce-50 font-display text-2xl font-bold text-spruce">
                            {initials(company.companyName)}
                        </span>
                    )}
                    <div className="min-w-0 flex-1">
                        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{company.companyName}</h1>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-neutral-500">
                            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-neutral-400" /> {company.address}</span>
                            <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-neutral-400" /> {company.employeeStrength} people</span>
                            <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-semibold text-neutral-600">{company.industry}</span>
                            {company.websiteUrl && (
                                <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-spruce hover:underline">
                                    <Globe className="h-4 w-4" /> Website
                                </a>
                            )}
                        </div>
                        {company.companyOverview && (
                            <p className="mt-4 whitespace-pre-line leading-relaxed text-neutral-600">{company.companyOverview}</p>
                        )}
                    </div>
                </div>
            </div>

            <section className="space-y-4">
                <div className="flex items-baseline gap-2">
                    <Briefcase className="h-5 w-5 text-spruce" />
                    <h2 className="font-display text-xl font-bold text-ink">Open roles</h2>
                    <span className="text-sm text-neutral-400">{pluralize(jobCount, 'position')}</span>
                </div>

                {jobs.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-neutral-200 bg-sand/40 py-12 text-center">
                        <p className="text-sm text-neutral-500">No open roles right now. Check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => <JobCard key={job.id} job={job} />)}
                    </div>
                )}
            </section>
        </div>
    );
}
