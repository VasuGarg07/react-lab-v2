import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Building2, Search } from 'lucide-react';
import { Pagination } from '@react-lab/ui';
import CompanyCard from '../components/CompanyCard';
import { useCompanies } from '../hooks/useJobscapeQueries';

const PER_PAGE = 12;

export default function CompaniesList() {
    const [params, setParams] = useSearchParams();
    const page = Number(params.get('page')) || 1;
    const search = params.get('search') ?? '';
    const [draft, setDraft] = useState(search);

    const { data, isLoading, error } = useCompanies({ page, limit: PER_PAGE, search });

    const apply = (next: { page?: number; search?: string }) => {
        const p = new URLSearchParams();
        const s = next.search ?? search;
        const pg = next.page ?? 1;
        if (pg > 1) p.set('page', String(pg));
        if (s) p.set('search', s);
        setParams(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const companies = data?.companies ?? [];

    return (
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 fade-up">
            <header>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">Who's hiring</p>
                <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Browse companies
                </h1>
                <p className="mt-2 text-neutral-500">Explore the teams posting roles on Jobscape.</p>
            </header>

            <form
                onSubmit={(e) => { e.preventDefault(); apply({ search: draft, page: 1 }); }}
                className="flex gap-2"
            >
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Company name…"
                        className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-neutral-400 transition-colors focus:border-spruce focus:outline-none focus:ring-2 focus:ring-spruce/15"
                    />
                </div>
                <button
                    type="submit"
                    className="rounded-xl bg-spruce px-6 py-2.5 text-sm font-bold text-canvas shadow-pop transition-colors hover:bg-spruce-600"
                >
                    Search
                </button>
            </form>

            {isLoading ? (
                <div className="flex min-h-80 items-center justify-center">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-spruce" />
                </div>
            ) : error ? (
                <p className="py-20 text-center text-neutral-500">Couldn't load companies. Please try again.</p>
            ) : companies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-sand">
                        <Building2 className="h-6 w-6 text-neutral-400" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-ink">No companies found</h2>
                    <p className="mt-1 text-sm text-neutral-500">Try a different name.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {companies.map((c) => <CompanyCard key={c.id} company={c} />)}
                    </div>
                    <Pagination
                        currentPage={data!.pagination.page}
                        totalPages={data!.pagination.totalPages}
                        onPageChange={(p) => apply({ page: p })}
                    />
                </>
            )}
        </div>
    );
}
