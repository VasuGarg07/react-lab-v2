import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { EmployerForm } from '../forms/EmployerForm';
import { useRegisterEmployer } from '../hooks/useJobscapeMutations';
import { cleanEmployer } from '../helpers/job.utils';
import { ROUTES } from '../helpers/job.constants';

export default function RegisterEmployer() {
    const register = useRegisterEmployer();

    return (
        <div className="min-h-screen bg-canvas">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 fade-up">
                <Link to={ROUTES.onboarding} className="inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-ink">
                    <ChevronLeft className="h-4 w-4" /> Choose a different path
                </Link>

                <header className="mt-6 mb-8">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-spruce">Company profile</p>
                    <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink">Set up your company</h1>
                    <p className="mt-2 text-neutral-500">Candidates see this on your listings and your company page.</p>
                </header>

                <EmployerForm
                    submitLabel="Create company"
                    isSubmitting={register.isPending}
                    onSubmit={(values) => register.mutate(cleanEmployer(values))}
                />
            </div>
        </div>
    );
}
