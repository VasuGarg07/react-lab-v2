import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { jobKeys, ROUTES } from '../helpers/job.constants';
import { apiError } from '../helpers/job.utils';
import {
    applyToJob,
    createJob,
    deleteAccount,
    deleteJob,
    registerApplicant,
    registerEmployer,
    toggleArchiveJob,
    toggleSaveJob,
    updateApplicationStatus,
    updateJob,
    updateProfile,
} from '../helpers/job.service';
import type { ApplicantInput, ApplicationStatus, EmployerInput, JobInput } from '../helpers/job.types';

const JOBS_LIST_KEY = ['jobscape', 'jobs'] as const;

const onError = (e: unknown, fallback: string) => toast.error(apiError(e, fallback));

export const useRegisterApplicant = () => {
    const qc = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (input: ApplicantInput) => registerApplicant(input),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: jobKeys.profileRoot });
            toast.success('Profile created — welcome aboard!');
            navigate(ROUTES.jobs, { replace: true });
        },
        onError: (e) => onError(e, 'Could not create your profile'),
    });
};

export const useRegisterEmployer = () => {
    const qc = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (input: EmployerInput) => registerEmployer(input),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: jobKeys.profileRoot });
            toast.success('Company set up — time to post a role!');
            navigate(ROUTES.manage, { replace: true });
        },
        onError: (e) => onError(e, 'Could not create your company'),
    });
};

export const useUpdateProfile = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (input: Partial<ApplicantInput | EmployerInput>) => updateProfile(input),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: jobKeys.profileRoot });
            toast.success('Changes saved');
        },
        onError: (e) => onError(e, 'Could not save your changes'),
    });
};

export const useDeleteAccount = () => {
    const qc = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (profileId: string) => deleteAccount(profileId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: jobKeys.profileRoot });
            toast.success('Profile deleted');
            navigate(ROUTES.onboarding, { replace: true });
        },
        onError: (e) => onError(e, 'Could not delete your profile'),
    });
};

export const useApplyToJob = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ jobId, coverLetter }: { jobId: string; coverLetter?: string }) =>
            applyToJob(jobId, coverLetter),
        onSuccess: (_, { jobId }) => {
            qc.invalidateQueries({ queryKey: jobKeys.applications });
            qc.invalidateQueries({ queryKey: jobKeys.job(jobId) });
            qc.invalidateQueries({ queryKey: JOBS_LIST_KEY });
            toast.success('Application sent — good luck!');
        },
        onError: (e) => onError(e, 'Could not submit your application'),
    });
};

export const useToggleSaveJob = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (jobId: string) => toggleSaveJob(jobId),
        onSuccess: (saved, jobId) => {
            qc.invalidateQueries({ queryKey: jobKeys.savedJobs });
            qc.invalidateQueries({ queryKey: jobKeys.job(jobId) });
            qc.invalidateQueries({ queryKey: JOBS_LIST_KEY });
            toast.success(saved ? 'Saved for later' : 'Removed from saved');
        },
        onError: (e) => onError(e, 'Could not update saved jobs'),
    });
};

export const useCreateJob = () => {
    const qc = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (input: JobInput) => createJob(input),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: jobKeys.myJobs });
            toast.success('Job posted');
            navigate(ROUTES.manage, { replace: true });
        },
        onError: (e) => onError(e, 'Could not post the job'),
    });
};

export const useUpdateJob = (id: string) => {
    const qc = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (input: JobInput) => updateJob(id, input),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: jobKeys.myJobs });
            qc.invalidateQueries({ queryKey: jobKeys.myJob(id) });
            toast.success('Job updated');
            navigate(ROUTES.manage, { replace: true });
        },
        onError: (e) => onError(e, 'Could not update the job'),
    });
};

export const useDeleteJob = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteJob(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: jobKeys.myJobs });
            toast.success('Job deleted');
        },
        onError: (e) => onError(e, 'Could not delete the job'),
    });
};

export const useToggleArchiveJob = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => toggleArchiveJob(id),
        onSuccess: (isArchived, id) => {
            qc.invalidateQueries({ queryKey: jobKeys.myJobs });
            qc.invalidateQueries({ queryKey: jobKeys.myJob(id) });
            toast.success(isArchived ? 'Job archived' : 'Job reactivated');
        },
        onError: (e) => onError(e, 'Could not update the job'),
    });
};

export const useUpdateApplicationStatus = (jobId: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ applicantId, status }: { applicantId: string; status: ApplicationStatus }) =>
            updateApplicationStatus(jobId, applicantId, status),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: jobKeys.myJob(jobId) });
            toast.success('Application status updated');
        },
        onError: (e) => onError(e, 'Could not update application status'),
    });
};
