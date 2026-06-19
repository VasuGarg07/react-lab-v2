import { Link } from 'react-router';
import { Briefcase, MapPin } from 'lucide-react';
import { ROUTES } from '../helpers/job.constants';
import { initials, openingsLabel } from '../helpers/job.utils';
import type { CompanyCardInfo } from '../helpers/job.types';

export default function CompanyCard({ company }: { company: CompanyCardInfo }) {
    return (
        <Link
            to={ROUTES.company(company.id)}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-spruce-200 hover:shadow-lift"
        >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-spruce to-spruce-300 transition-transform duration-300 group-hover:scale-x-100" />

            <div className="flex items-start gap-3">
                {company.logoURL ? (
                    <img
                        src={company.logoURL}
                        alt={company.companyName}
                        className="h-12 w-12 shrink-0 rounded-xl border border-neutral-100 object-cover"
                    />
                ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-spruce-50 font-display text-sm font-bold text-spruce">
                        {initials(company.companyName)}
                    </span>
                )}
                <div className="min-w-0 flex-1">
                    <h3 className="font-display line-clamp-1 font-bold text-ink transition-colors group-hover:text-spruce">
                        {company.companyName}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 inline-flex items-center gap-1 text-sm text-neutral-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0" /> {company.address}
                    </p>
                </div>
            </div>

            <div className="mt-4 border-t border-neutral-100 pt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-spruce-700">
                    <Briefcase className="h-3.5 w-3.5" /> {openingsLabel(company.activeJobsCount)}
                </span>
            </div>
        </Link>
    );
}
