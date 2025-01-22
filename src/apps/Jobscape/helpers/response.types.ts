import { ApplicantResponse, EmployerResponse, JobResponse, JobRoles } from "./job.types";


// API RESPONSE TYPES
export interface ProfileResponse {
    role: JobRoles;
    message: string;
    profile: ApplicantResponse | EmployerResponse;
}

export interface EmployerAnalytics {
    success: boolean,
    recentJobs: JobResponse[],
    jobSummary: {
        activeJobs: number;
        archivedJobs: number;
        totalJobs: number;
    }
}

export interface JobsListResponse {
    success: boolean;
    count: number;
    jobs: JobResponse[];
}

export interface JobDetailsResponse {
    success: boolean;
    job: JobResponse;
    applicationCount: number;
}