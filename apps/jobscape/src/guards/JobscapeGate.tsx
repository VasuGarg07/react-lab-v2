import { Navigate, Outlet, useLocation } from 'react-router';
import { useJobscape } from '../hooks/useJobscape';
import { ROUTES } from '../helpers/job.constants';

export function JobscapeGate() {
    const { ready, loading, isRegistered, error, refetch } = useJobscape();
    const location = useLocation();

    if (loading || !ready) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-canvas">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-spruce" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-canvas px-4 text-center">
                <h1 className="font-display text-xl font-bold text-ink">We couldn't load your profile</h1>
                <p className="max-w-sm text-sm text-neutral-500">Check your connection and try again.</p>
                <button
                    onClick={() => refetch()}
                    className="mt-2 rounded-xl bg-spruce px-5 py-2.5 text-sm font-bold text-canvas shadow-pop transition-colors hover:bg-spruce-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    const onOnboarding = location.pathname.startsWith(ROUTES.onboarding);

    if (!isRegistered && !onOnboarding) return <Navigate to={ROUTES.onboarding} replace />;
    if (isRegistered && onOnboarding) return <Navigate to={ROUTES.home} replace />;

    return <Outlet />;
}
