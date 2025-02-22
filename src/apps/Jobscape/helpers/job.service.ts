import apiClient from '@/shared/apiClient';
import { IApplicant, IApplication, IEmployer, IJob, JobResponse, JobRoles } from '@/apps/Jobscape/helpers/job.types';
import { CompaniesCardListResponse, CompanyDetailsResponse, EmployerAnalytics, JobDetailsResponse, JobsCardListResponse, JobsListResponse, ProfileResponse } from '@/apps/Jobscape/helpers/response.types';

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

    async fetchAllJobs(): Promise<JobsListResponse> {
        const client = this.getClient();
        const response = await client.get('/jobs');
        return response.data;
    }

    async fetchJobDetails(jobId: string): Promise<JobDetailsResponse> {
        const client = this.getClient();
        const response = await client.get(`/jobs/${jobId}`);
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

    async archiveJob(jobId: string, archive: boolean): Promise<void> {
        const client = this.getClient();
        await client.patch(`/jobs/${jobId}/archive`, { archive });
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

    async fetchAllCompanies(page: number = 1, limit: number = 10, name?: string): Promise<CompaniesCardListResponse> {
        const client = this.getClient();
        let query = `?page=${page}&limit=${limit}`;
        if (name) {
            query += `&name=${encodeURIComponent(name)}`;
        }
        const response = await client.get(`/companies${query}`);
        return response.data;
    }

    async fetchCompanyDetails(companyId: string): Promise<CompanyDetailsResponse> {
        const client = this.getClient();
        const response = await client.get(`/companies/${companyId}`);
        return response.data;
    }

    async fetchApplicantJobsList(page: number = 1, limit: number = 10, name?: string): Promise<JobsCardListResponse> {
        const client = this.getClient();
        let query = `?page=${page}&limit=${limit}`;
        if (name) {
            query += `&name=${encodeURIComponent(name)}`;
        }
        const response = await client.get(`/jobs${query}`);
        return response.data;
    }

    async applyForJob(jobId: string, coverLetter?: string): Promise<void> {
        const client = this.getClient();
        await client.post('/jobs/apply', { jobId, coverLetter });
    }

    async saveJob(jobId: string): Promise<void> {
        const client = this.getClient();
        await client.post('/jobs/save', { jobId });
    }

    async fetchSavedJobs(): Promise<JobsListResponse> {
        const client = this.getClient();
        const response = await client.get('/saved-jobs');
        return response.data;
    }

    async deleteSavedJob(jobId: string) {
        const client = this.getClient();
        await client.delete(`/saved-jobs/${jobId}`);
    }

    async fetchRecommendedJobs(): Promise<JobsCardListResponse> {
        const client = this.getClient();
        const response = await client.get('/recommended');
        return response.data;
    }

    async fetchAppliedJobs(): Promise<JobsCardListResponse> {
        const client = this.getClient();
        const response = await client.get('/applications');
        return response.data;
    }
}

export default JobscapeService;
