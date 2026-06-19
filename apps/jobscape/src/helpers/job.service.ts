import { apiClient } from '@react-lab/shared';
import { JOBSCAPE_API } from './job.constants';
import { serializeJob } from './job.utils';
import type {
    Applicant,
    ApplicantInput,
    ApplicationCardInfo,
    ApplicationStatus,
    CompaniesListResponse,
    CompanyDetailsResponse,
    Employer,
    EmployerInput,
    EmployerJobDetail,
    Job,
    JobCardInfo,
    JobDetail,
    JobInput,
    JobsListResponse,
    MyJobsResponse,
    ProfileResponse,
} from './job.types';

export const getProfile = async (): Promise<ProfileResponse> => {
    const { data } = await apiClient.get<ProfileResponse>(JOBSCAPE_API.profile);
    return data;
};

export const registerApplicant = async (input: ApplicantInput): Promise<Applicant> => {
    const { data } = await apiClient.post(JOBSCAPE_API.registerApplicant, input);
    return data.profile;
};

export const registerEmployer = async (input: EmployerInput): Promise<Employer> => {
    const { data } = await apiClient.post(JOBSCAPE_API.registerEmployer, input);
    return data.profile;
};

export const updateProfile = async (
    input: Partial<ApplicantInput | EmployerInput>,
): Promise<Applicant | Employer> => {
    const { data } = await apiClient.patch(JOBSCAPE_API.profile, input);
    return data.profile;
};

export const deleteAccount = (profileId: string): Promise<void> =>
    apiClient.delete(JOBSCAPE_API.account(profileId)).then(() => undefined);

export interface JobsQuery {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
}

export const getJobs = async (query: JobsQuery): Promise<JobsListResponse> => {
    const { data } = await apiClient.get<JobsListResponse>(JOBSCAPE_API.jobs, { params: query });
    return data;
};

export const getJob = async (id: string): Promise<JobDetail> => {
    const { data } = await apiClient.get<{ job: JobDetail }>(JOBSCAPE_API.job(id));
    return data.job;
};

export const applyToJob = (jobId: string, coverLetter?: string): Promise<void> =>
    apiClient.post(JOBSCAPE_API.apply(jobId), { jobId, coverLetter }).then(() => undefined);

export const toggleSaveJob = async (jobId: string): Promise<boolean> => {
    const { data } = await apiClient.patch<{ saved: boolean }>(JOBSCAPE_API.save(jobId), {});
    return data.saved;
};

export const getApplications = async (): Promise<ApplicationCardInfo[]> => {
    const { data } = await apiClient.get<{ applications: ApplicationCardInfo[] }>(
        JOBSCAPE_API.applications,
    );
    return data.applications;
};

export const getSavedJobs = async (): Promise<JobCardInfo[]> => {
    const { data } = await apiClient.get<{ savedJobs: JobCardInfo[] }>(JOBSCAPE_API.savedJobs);
    return data.savedJobs;
};

export interface CompaniesQuery {
    page?: number;
    limit?: number;
    search?: string;
}

export const getCompanies = async (query: CompaniesQuery): Promise<CompaniesListResponse> => {
    const { data } = await apiClient.get<CompaniesListResponse>(JOBSCAPE_API.companies, {
        params: query,
    });
    return data;
};

export const getCompany = async (id: string): Promise<CompanyDetailsResponse> => {
    const { data } = await apiClient.get<CompanyDetailsResponse>(JOBSCAPE_API.company(id));
    return data;
};

export const getMyJobs = async (): Promise<MyJobsResponse> => {
    const { data } = await apiClient.get<MyJobsResponse>(JOBSCAPE_API.myJobs);
    return data;
};

export const createJob = async (input: JobInput): Promise<Job> => {
    const { data } = await apiClient.post(JOBSCAPE_API.myJobs, serializeJob(input));
    return data.job;
};

export const getMyJob = async (id: string): Promise<EmployerJobDetail> => {
    const { data } = await apiClient.get<{ job: EmployerJobDetail }>(JOBSCAPE_API.myJob(id));
    return data.job;
};

export const updateJob = async (id: string, input: JobInput): Promise<Job> => {
    const { data } = await apiClient.patch(JOBSCAPE_API.myJob(id), serializeJob(input));
    return data.job;
};

export const deleteJob = (id: string): Promise<void> =>
    apiClient.delete(JOBSCAPE_API.myJob(id)).then(() => undefined);

export const toggleArchiveJob = async (id: string): Promise<boolean> => {
    const { data } = await apiClient.patch<{ isArchived: boolean }>(JOBSCAPE_API.archive(id), {});
    return data.isArchived;
};

export const updateApplicationStatus = (jobId: string, applicantId: string, status: ApplicationStatus): Promise<void> =>
    apiClient.patch(JOBSCAPE_API.applicationStatus(jobId), { applicantId, status }).then(() => undefined);
