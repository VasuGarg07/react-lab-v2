import type {
    ApplicantInput,
    ApplicationStatus,
    EmployerInput,
    EmploymentType,
    JobInput,
    JobLevel,
    ShiftType,
} from './job.types';

const API = '/jobscape';

export const JOBSCAPE_API = {
    profile: `${API}/profile`,
    registerApplicant: `${API}/applicant/register`,
    registerEmployer: `${API}/employer/register`,
    account: (id: string) => `${API}/account/${id}`,

    jobs: `${API}/applicant/jobs`,
    job: (id: string) => `${API}/applicant/jobs/${id}`,
    apply: (id: string) => `${API}/applicant/jobs/${id}/apply`,
    save: (id: string) => `${API}/applicant/jobs/${id}/save`,
    applications: `${API}/applicant/applications`,
    savedJobs: `${API}/applicant/saved-jobs`,
    companies: `${API}/applicant/companies`,
    company: (id: string) => `${API}/applicant/companies/${id}`,

    myJobs: `${API}/employer/jobs`,
    myJob: (id: string) => `${API}/employer/jobs/${id}`,
    archive: (id: string) => `${API}/employer/jobs/${id}/archive`,
    applicationStatus: (id: string) => `${API}/employer/jobs/${id}/applications/status`,
} as const;

export const ROUTES = {
    home: '/',
    onboarding: '/onboarding',
    onboardApplicant: '/onboarding/applicant',
    onboardEmployer: '/onboarding/employer',

    jobs: '/jobs',
    job: (id: string) => `/jobs/${id}`,
    companies: '/companies',
    company: (id: string) => `/companies/${id}`,
    applications: '/applications',
    saved: '/saved',

    manage: '/manage',
    postJob: '/manage/new',
    editJob: (id: string) => `/manage/${id}/edit`,
    applicants: (id: string) => `/manage/${id}/applicants`,

    profile: '/profile',
    settings: '/settings',
} as const;

const toOptions = <T extends string>(values: readonly T[]) =>
    values.map((value) => ({ value, label: titleCase(value) }));

export function titleCase(value: string): string {
    return value
        .split(/[-_\s]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

export const JOB_LEVELS = toOptions<JobLevel>([
    'internship',
    'entry-level',
    'mid-level',
    'senior-level',
    'lead',
    'manager',
]);

export const EMPLOYMENT_TYPES = toOptions<EmploymentType>([
    'full-time',
    'part-time',
    'contractual',
    'freelance',
    'internship',
]);

export const SHIFT_TYPES = toOptions<ShiftType>(['day', 'night', 'flexible']);

export const APPLICATION_STATUSES = toOptions<ApplicationStatus>([
    'pending',
    'shortlisted',
    'contacted',
    'hired',
    'rejected',
]);

export const STATUS_STYLES: Record<ApplicationStatus, string> = {
    pending: 'bg-neutral-100 text-neutral-600',
    shortlisted: 'bg-spruce-50 text-spruce-700',
    contacted: 'bg-amber-50 text-amber-700',
    hired: 'bg-emerald-50 text-emerald-700',
    rejected: 'bg-red-50 text-red-600',
};

export const TEAM_SIZES = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'].map(
    (value) => ({ value, label: value }),
);

export const INDUSTRIES = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Manufacturing',
    'Consulting',
    'Media',
    'Real Estate',
    'Transportation',
    'Energy',
    'Agriculture',
    'Entertainment',
].map((value) => ({ value, label: value }));

const THIS_YEAR = new Date().getFullYear();
export const ESTABLISHMENT_YEARS = Array.from({ length: THIS_YEAR - 1900 + 1 }, (_, i) =>
    String(THIS_YEAR - i),
).map((value) => ({ value, label: value }));

export const EMPTY_APPLICANT: ApplicantInput = {
    fullName: '',
    contactEmail: '',
    phoneNumber: '',
    photoUrl: '',
    profileSummary: '',
    resumeURL: '',
    skills: [],
    languages: [],
    experience: [],
    education: [],
    preference: {
        expectedSalary: 60000,
        jobType: 'full-time',
        shift: 'day',
        locations: [],
        roles: [],
        industries: [],
    },
    socialLinks: {},
};

export const EMPTY_EMPLOYER: EmployerInput = {
    companyName: '',
    logoURL: '',
    industry: '',
    address: '',
    websiteUrl: '',
    employeeStrength: '',
    yearOfEstablishment: String(THIS_YEAR),
    contactEmail: '',
    contactNumber: '',
    companyOverview: '',
    companyVision: '',
    socialLinks: {},
};

export const EMPTY_JOB: JobInput = {
    title: '',
    location: '',
    jobLevel: 'entry-level',
    vacancies: 1,
    employmentType: 'full-time',
    shiftType: 'day',
    salaryRange: '',
    experienceRequired: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    skillsRequired: [],
    tags: [],
};

export const jobKeys = {
    profileRoot: ['jobscape', 'profile'] as const,
    profile: (userId: string) => ['jobscape', 'profile', userId] as const,
    jobs: (params: object) => ['jobscape', 'jobs', params] as const,
    job: (id: string) => ['jobscape', 'job', id] as const,
    applications: ['jobscape', 'applications'] as const,
    savedJobs: ['jobscape', 'saved-jobs'] as const,
    companies: (params: object) => ['jobscape', 'companies', params] as const,
    company: (id: string) => ['jobscape', 'company', id] as const,
    myJobs: ['jobscape', 'my-jobs'] as const,
    myJob: (id: string) => ['jobscape', 'my-job', id] as const,
};
