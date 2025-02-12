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
    companyName: string;
    logoURL: string;
}

export interface CompaniesCardListResponse {
    success: boolean;
    count: number;
    limit: number;
    page: number;
    companies: CompanyCardInfo[];
}

export interface CompanyCardInfo {
    id: string;
    companyName: string;
    logoURL: string;
    address: string;
    activeJobsCount: number
}

export interface CompanyDetailsResponse {
    success: boolean;
    company: EmployerResponse;
    jobs: JobsCardInfo[];
    jobCount: number;
}

export interface JobsCardListResponse {
    success: boolean;
    count: number;
    limit: number;
    page: number;
    jobs: JobsCardInfo[];
}

export interface JobsCardInfo {
    id: string;
    title: string;
    location: string;
    employmentType: "full-time" | "part-time" | "contractual" | "freelance" | "internship";
    salaryRange: string;
    isFeatured?: boolean;
    companyName: string;
    logoURL: string;
    totalApplicants?: number;
    status?: "pending" | "shortlisted" | "rejected" | "contacted" | "hired";
}