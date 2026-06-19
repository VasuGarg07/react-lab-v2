import { useQuery } from '@tanstack/react-query';
import { jobKeys } from '../helpers/job.constants';
import {
    getApplications,
    getCompanies,
    getCompany,
    getJob,
    getJobs,
    getMyJob,
    getMyJobs,
    getProfile,
    getSavedJobs,
    type CompaniesQuery,
    type JobsQuery,
} from '../helpers/job.service';

const STALE = 5 * 60 * 1000;

export const useProfile = (userId: string) => useQuery({
    queryKey: jobKeys.profile(userId),
    queryFn: getProfile,
    enabled: !!userId,
    retry: false,
    staleTime: STALE,
});

export const useJobs = (query: JobsQuery) => useQuery({
    queryKey: jobKeys.jobs(query),
    queryFn: () => getJobs(query),
});

export const useJob = (id?: string) => useQuery({
    queryKey: jobKeys.job(id!),
    queryFn: () => getJob(id!),
    enabled: !!id,
});

export const useApplications = () => useQuery({
    queryKey: jobKeys.applications,
    queryFn: getApplications,
});

export const useSavedJobs = () => useQuery({
    queryKey: jobKeys.savedJobs,
    queryFn: getSavedJobs,
});

export const useCompanies = (query: CompaniesQuery) => useQuery({
    queryKey: jobKeys.companies(query),
    queryFn: () => getCompanies(query),
});

export const useCompany = (id?: string) => useQuery({
    queryKey: jobKeys.company(id!),
    queryFn: () => getCompany(id!),
    enabled: !!id,
});

export const useMyJobs = () => useQuery({
    queryKey: jobKeys.myJobs,
    queryFn: getMyJobs,
});

export const useMyJob = (id?: string) => useQuery({
    queryKey: jobKeys.myJob(id!),
    queryFn: () => getMyJob(id!),
    enabled: !!id,
});
