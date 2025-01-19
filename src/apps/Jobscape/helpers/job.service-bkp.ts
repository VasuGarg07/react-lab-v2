import apiClient from '../../../shared/apiClient';
import { IApplicant, IEmployer, IJob, IApplication, JobRoles } from './job.types';

// Helper for role-based headers
const getProfileRoleHeader = (role: JobRoles, profileId: string) => ({
    headers: { 'X-ProfileRole': `${role}_${profileId}` },
});

// Helper for dynamic base URLs
const profileAPI = '/jobscape';
const employerAPI = '/jobscape/employer';
const applicantAPI = '/jobscape/applicant';

/** ------------------------- Profile APIs ------------------------- **/

export const fetchUserProfile = async (): Promise<IApplicant | IEmployer | null> => {
    const response = await apiClient.get(`${profileAPI}/profile`);
    return response.data;
};

export const registerAsApplicant = async (applicantData: Partial<IApplicant>): Promise<void> => {
    await apiClient.post(`${profileAPI}/register/applicant`, applicantData);
};

export const registerAsEmployer = async (employerData: Partial<IEmployer>): Promise<void> => {
    await apiClient.post(`${profileAPI}/register/employer`, employerData);
};

export const updateUserProfile = async (profileData: Partial<IApplicant | IEmployer>): Promise<void> => {
    await apiClient.patch(`${profileAPI}/profile/update`, profileData);
};

export const deleteUserAccount = async (accountId: string): Promise<void> => {
    await apiClient.delete(`${profileAPI}/account/${accountId}`);
};

/** ------------------------- Employer APIs ------------------------- **/

export const fetchEmployerDashboard = async (profileId: string): Promise<any> => {
    const response = await apiClient.get(`${employerAPI}/dashboard`, getProfileRoleHeader('employer', profileId));
    return response.data;
};

export const fetchEmployerJobs = async (profileId: string): Promise<IJob[]> => {
    const response = await apiClient.get(`${employerAPI}/jobs`, getProfileRoleHeader('employer', profileId));
    return response.data;
};

export const postNewJob = async (profileId: string, jobData: Partial<IJob>): Promise<void> => {
    await apiClient.post(`${employerAPI}/jobs/new`, jobData, getProfileRoleHeader('employer', profileId));
};

export const updateJob = async (profileId: string, jobId: string, jobData: Partial<IJob>): Promise<void> => {
    await apiClient.patch(`${employerAPI}/jobs/${jobId}/update`, jobData, getProfileRoleHeader('employer', profileId));
};

export const deleteJob = async (profileId: string, jobId: string): Promise<void> => {
    await apiClient.delete(`${employerAPI}/jobs/${jobId}/delete`, getProfileRoleHeader('employer', profileId));
};

export const archiveJob = async (profileId: string, jobId: string): Promise<void> => {
    await apiClient.patch(`${employerAPI}/jobs/${jobId}/archive`, {}, getProfileRoleHeader('employer', profileId));
};

export const bulkArchiveJobs = async (profileId: string, jobIds: string[]): Promise<void> => {
    await apiClient.post(`${employerAPI}/jobs/archive`, { jobIds }, getProfileRoleHeader('employer', profileId));
};

export const bulkDeleteJobs = async (profileId: string): Promise<void> => {
    await apiClient.delete(`${employerAPI}/jobs/clear`, getProfileRoleHeader('employer', profileId));
};

export const fetchJobApplications = async (profileId: string, jobId: string): Promise<IApplication[]> => {
    const response = await apiClient.get(`${employerAPI}/applications/${jobId}`, getProfileRoleHeader('employer', profileId));
    return response.data;
};

export const updateApplicationStatus = async (profileId: string, statusData: any): Promise<void> => {
    await apiClient.post(`${employerAPI}/applications/status`, statusData, getProfileRoleHeader('employer', profileId));
};

/** ------------------------- Applicant APIs ------------------------- **/

export const fetchAllJobs = async (profileId: string): Promise<IJob[]> => {
    const response = await apiClient.get(`${applicantAPI}/jobs`, getProfileRoleHeader('applicant', profileId));
    return response.data;
};

export const fetchJobDetails = async (profileId: string, jobId: string): Promise<IJob> => {
    const response = await apiClient.get(`${applicantAPI}/jobs/${jobId}`, getProfileRoleHeader('applicant', profileId));
    return response.data;
};

export const applyForJob = async (profileId: string, applicationData: Partial<IApplication>): Promise<void> => {
    await apiClient.post(`${applicantAPI}/jobs/apply`, applicationData, getProfileRoleHeader('applicant', profileId));
};

export const fetchAppliedJobs = async (profileId: string): Promise<IApplication[]> => {
    const response = await apiClient.get(`${applicantAPI}/applications`, getProfileRoleHeader('applicant', profileId));
    return response.data;
};

export const fetchApplicationStatus = async (profileId: string, applicationId: string): Promise<IApplication> => {
    const response = await apiClient.get(`${applicantAPI}/applications/status/${applicationId}`, getProfileRoleHeader('applicant', profileId));
    return response.data;
};

export const saveJob = async (profileId: string, jobId: string): Promise<void> => {
    await apiClient.post(`${applicantAPI}/jobs/save`, { jobId }, getProfileRoleHeader('applicant', profileId));
};

export const fetchSavedJobs = async (profileId: string): Promise<IJob[]> => {
    const response = await apiClient.get(`${applicantAPI}/saved-jobs`, getProfileRoleHeader('applicant', profileId));
    return response.data;
};

export const deleteSavedJob = async (profileId: string, jobId: string): Promise<void> => {
    await apiClient.delete(`${applicantAPI}/saved-jobs/${jobId}`, getProfileRoleHeader('applicant', profileId));
};

export const fetchRecommendedJobs = async (profileId: string): Promise<IJob[]> => {
    const response = await apiClient.get(`${applicantAPI}/recommended`, getProfileRoleHeader('applicant', profileId));
    return response.data;
};

export const updateApplicantPreferences = async (profileId: string, preferences: Partial<IApplicant['preference']>): Promise<void> => {
    await apiClient.patch(`${applicantAPI}/preferences`, preferences, getProfileRoleHeader('applicant', profileId));
};
