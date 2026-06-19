import { useAuthSelector } from '@react-lab/auth';
import { useProfile } from './useJobscapeQueries';
import { statusOf } from '../helpers/job.utils';
import type { Applicant, Employer, JobRole } from '../helpers/job.types';

export interface JobscapeState {
    loading: boolean;
    ready: boolean;
    profile: Applicant | Employer | null;
    role: JobRole | null;
    profileId: string | null;
    isRegistered: boolean;
    error: unknown;
    refetch: () => void;
}

export function useJobscape(): JobscapeState {
    const initializing = useAuthSelector((s) => s.auth.initializing);
    const userId = useAuthSelector((s) => s.auth.user?.id) ?? '';

    const { data, isFetched, error, refetch } = useProfile(userId);

    const realError = error && statusOf(error) !== 404 ? error : null;
    const ready = !initializing && !!userId && isFetched;

    return {
        loading: !ready && !realError,
        ready,
        profile: data?.profile ?? null,
        role: data?.role ?? null,
        profileId: data?.profile.id ?? null,
        isRegistered: !!data,
        error: realError,
        refetch,
    };
}
