export type JobRole = 'applicant' | 'employer';

export type JobLevel =
    | 'internship'
    | 'entry-level'
    | 'mid-level'
    | 'senior-level'
    | 'lead'
    | 'manager';

export type EmploymentType =
    | 'full-time'
    | 'part-time'
    | 'contractual'
    | 'freelance'
    | 'internship';

export type ShiftType = 'day' | 'night' | 'flexible';

export type ApplicationStatus =
    | 'pending'
    | 'shortlisted'
    | 'contacted'
    | 'hired'
    | 'rejected';

interface MongoDoc {
    id: string;
    createdAt: number;
    updatedAt: number;
}

export interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string;
}

export interface Education {
    degree: string;
    institution: string;
    year: string;
}

export interface ApplicantSocialLinks {
    twitter?: string;
    youtube?: string;
    github?: string;
    linkedin?: string;
    website?: string;
}

export interface Preference {
    expectedSalary: number;
    jobType: EmploymentType;
    locations: string[];
    shift?: ShiftType;
    roles?: string[];
    industries?: string[];
}

export interface ApplicantInput {
    fullName: string;
    contactEmail: string;
    phoneNumber: string;
    photoUrl?: string;
    profileSummary?: string;
    resumeURL: string;
    skills: string[];
    languages: string[];
    experience?: Experience[];
    education?: Education[];
    preference: Preference;
    socialLinks?: ApplicantSocialLinks;
}

export type Applicant = MongoDoc & ApplicantInput & { userId: string };

export interface EmployerSocialLinks {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
}

export interface EmployerInput {
    companyName: string;
    logoURL: string;
    industry: string;
    address: string;
    websiteUrl?: string;
    employeeStrength: string;
    yearOfEstablishment: string;
    contactEmail: string;
    contactNumber: string;
    companyOverview?: string;
    companyVision?: string;
    socialLinks?: EmployerSocialLinks;
}

export type Employer = MongoDoc & EmployerInput & { userId: string };

export interface JobInput {
    title: string;
    location: string;
    jobLevel: JobLevel;
    vacancies: number;
    employmentType: EmploymentType;
    shiftType: ShiftType;
    salaryRange: string;
    experienceRequired: string;
    description: string;
    requirements: string;
    responsibilities?: string;
    benefits?: string;
    skillsRequired: string[];
    tags?: string[];
}

export type JobPayload = Omit<JobInput, 'requirements' | 'responsibilities' | 'benefits'> & {
    requirements: string[];
    responsibilities?: string[];
    benefits?: string[];
};

export type Job = MongoDoc & JobPayload & {
    postedBy: string;
    isArchived: boolean;
};

export interface ProfileResponse {
    role: JobRole;
    profile: Applicant | Employer;
}

export interface JobCardInfo {
    id: string;
    title: string;
    location: string;
    employmentType: EmploymentType;
    salaryRange: string;
    applicationCount?: number;
    companyName: string;
    logoURL: string;
    createdAt?: number;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface JobsListResponse {
    jobs: JobCardInfo[];
    pagination: Pagination;
}

export type JobDetail = Job & {
    applicationCount: number;
    companyName: string;
    logoURL: string;
};

export interface ApplicationCardInfo {
    id: string;
    title: string;
    location: string;
    employmentType: EmploymentType;
    salaryRange: string;
    companyName: string;
    logoURL: string;
    appliedAt: number;
    coverLetter?: string;
    status: ApplicationStatus;
}

export interface CompanyCardInfo {
    id: string;
    companyName: string;
    logoURL: string;
    address: string;
    activeJobsCount: number;
}

export interface CompaniesListResponse {
    companies: CompanyCardInfo[];
    pagination: Pagination;
}

export interface CompanyDetailsResponse {
    company: Employer;
    jobs: JobCardInfo[];
    jobCount: number;
}

export type EmployerJob = Job;

export interface MyJobsResponse {
    jobs: EmployerJob[];
    count: number;
}

export interface PopulatedApplicant {
    id: string;
    fullName: string;
    contactEmail: string;
    phoneNumber: string;
    photoUrl?: string;
    resumeURL: string;
    socialLinks?: ApplicantSocialLinks;
}

export interface JobApplication {
    applicantId: PopulatedApplicant | string;
    coverLetter?: string;
    appliedAt: number;
    status: ApplicationStatus;
}

export type EmployerJobDetail = Job & {
    applications: JobApplication[];
};
