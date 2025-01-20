import { formatString } from "../../../shared/utilities";
import { IApplicant, IEmployer, IJob } from "./job.types";

// Employer Form Empty State
export const defaultEmployer: IEmployer = {
    userId: "",
    companyName: "",
    logoURL: "",
    contactNumber: "",
    email: "",
    address: "",

    industry: "",
    employeeStrength: "",
    yearOfEstablishMent: "",
}

// Applicant Form Empty State
export const defaultApplicant: IApplicant = {
    userId: "",
    fullName: "",
    contactEmail: "",
    phoneNumber: "",
    resumeURL: "",
    skills: [],
    languages: [],
    experience: [],
    education: [],
    preference: {
        expectedSalary: 10000,
        jobType: "full-time",
        shift: 'day',
        locations: []
    },
}

export const defaultJob: IJob = {
    postedBy: "",
    title: "",
    location: "",
    jobLevel: "internship",
    skillsRequired: [],
    experienceRequired: "",
    salaryRange: "",
    employmentType: "full-time",
    shiftType: "day",
    vacancies: 1,
    description: "",
    requirements: ""
}

// Team size options
export const TEAM_SIZE_OPTIONS = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
];

// Industry options for autocomplete
export const INDUSTRY_OPTIONS = [
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
    'Entertainment'
];

export const JOB_LEVELS = [
    "internship", "entry-level", "mid-level", "senior-level", "lead", "manager"
].map(type => {
    return { value: type, displayName: formatString(type) }
});

export const JOB_TYPES = [
    'full-time',
    'part-time',
    'contractual',
    'freelance',
    'internship'
].map(type => {
    return { value: type, displayName: formatString(type) }
});

export const SHIFT_TYPES = [
    'day',
    'night',
    'flexible'
].map(type => {
    return { value: type, displayName: formatString(type) }
});