import apiClient from '../../../shared/apiClient';
import { IApplicant, IApplication, IEmployer, IJob, JobResponse, JobRoles } from './job.types';
import { EmployerAnalytics, JobsListResponse, ProfileResponse } from './response.types';

type UserRole = JobRoles | 'profile';

class JobscapeService {
    private profileId: string | null;
    private role: UserRole;

    constructor(role: UserRole, profileId: string | null = null) {
        this.role = role;
        this.profileId = profileId;
    }

    /** Helper to generate headers with X-ProfileRole if needed */
    private getHeaders() {
        if (this.role === 'profile') {
            return {}; // Profile APIs don't need special headers
        }
        return {
            headers: {
                'X-ProfileRole': `${this.role}_${this.profileId}`,
            },
        };
    }

    /** Helper to get a customized apiClient instance */
    private getClient() {
        let baseURL = '/jobscape';
        if (this.role === 'employer') {
            baseURL += '/employer';
        } else if (this.role === 'applicant') {
            baseURL += '/applicant';
        }

        return {
            get: (url: string, config = {}) => apiClient.get(`${baseURL}${url}`, { ...this.getHeaders(), ...config }),
            post: (url: string, data: any, config = {}) => apiClient.post(`${baseURL}${url}`, data, { ...this.getHeaders(), ...config }),
            patch: (url: string, data: any, config = {}) => apiClient.patch(`${baseURL}${url}`, data, { ...this.getHeaders(), ...config }),
            delete: (url: string, config = {}) => apiClient.delete(`${baseURL}${url}`, { ...this.getHeaders(), ...config }),
        };
    }

    /** ------------------------- Profile APIs ------------------------- **/

    async fetchUserProfile(): Promise<ProfileResponse> {
        const client = this.getClient();
        const response = await client.get('/profile');
        return response.data;
    }

    async registerAsApplicant(applicantData: IApplicant): Promise<void> {
        const client = this.getClient();
        await client.post('/register/applicant', applicantData);
    }

    async registerAsEmployer(employerData: IEmployer): Promise<void> {
        const client = this.getClient();
        await client.post('/register/employer', employerData);
    }

    async updateUserProfile(profileData: Partial<IApplicant | IEmployer>, role: JobRoles): Promise<ProfileResponse> {
        const client = this.getClient();
        const response = await client.patch('/profile/update', profileData, {
            headers: { "Role": role }
        });
        return response.data;
    }

    async deleteUserAccount(accountId: string, role: JobRoles): Promise<void> {
        const client = this.getClient();
        await client.delete(`/account/${accountId}`, {
            headers: { "Role": role }
        });
    }

    /** ------------------------- Employer APIs ------------------------- **/

    async fetchEmployerDashboard(): Promise<EmployerAnalytics> {
        const client = this.getClient();
        const response = await client.get('/dashboard');
        return response.data;
    }

    async postNewJob(jobData: IJob): Promise<{ job: JobResponse }> {
        const client = this.getClient();
        const response = await client.post('/jobs/new', jobData);
        return response.data;
    }

    async updateJob(jobId: string, jobData: Partial<IJob>): Promise<void> {
        const client = this.getClient();
        await client.patch(`/jobs/${jobId}/update`, jobData);
    }

    async deleteJob(jobId: string): Promise<void> {
        const client = this.getClient();
        await client.delete(`/jobs/${jobId}/delete`);
    }

    async fetchJobApplications(jobId: string): Promise<IApplication[]> {
        const client = this.getClient();
        const response = await client.get(`/applications/${jobId}`);
        return response.data;
    }

    /** ------------------------- Applicant APIs ------------------------- **/

    async fetchAllJobs(): Promise<JobsListResponse> {
        const client = this.getClient();
        const response = await client.get('/jobs');
        return response.data;
    }

    async applyForJob(applicationData: Partial<IApplication>): Promise<void> {
        const client = this.getClient();
        await client.post('/jobs/apply', applicationData);
    }

    async saveJob(jobId: string): Promise<void> {
        const client = this.getClient();
        await client.post('/jobs/save', { jobId });
    }

    async fetchSavedJobs(): Promise<IJob[]> {
        const client = this.getClient();
        const response = await client.get('/saved-jobs');
        return response.data;
    }

    async fetchRecommendedJobs(): Promise<IJob[]> {
        const client = this.getClient();
        const response = await client.get('/recommended');
        return response.data;
    }

    async updateApplicantPreferences(preferences: Partial<IApplicant['preference']>): Promise<void> {
        const client = this.getClient();
        await client.patch('/preferences', preferences);
    }
}

export default JobscapeService;
