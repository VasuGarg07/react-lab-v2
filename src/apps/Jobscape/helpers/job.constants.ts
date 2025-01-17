import { IEmployer } from "./job.types";

// Employer Form Empty State
export const DefaultEmployer: IEmployer = {
    userId: "",
    companyName: "",
    logoURL: "",
    contactNumber: "",
    email: "",
    address: "",
    websiteUrl: "",

    industry: "",
    employeeStrength: "",
    yearOfEstablishMent: "",
    companyOverview: "",
    companyVision: "",

    socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: ""
    }
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