// APPLICANT MODEL
export interface IExperience {
    title: string;
    company: string;
    duration: string;
    description: string;
}

export interface IEducation {
    degree: string;
    institution: string;
    year: string;
}

export interface IASocialLinks {
    twitter: string,
    youtube: string
    github: string;
    linkedin: string;
    website: string;
}

export interface IPreference {
    expectedSalary: number;
    jobType: 'full-time' | 'part-time' | 'contractual' | 'freelance' | 'internship';
    locations: string[];
    shift?: 'day' | 'night' | 'flexible';
    role?: string[];
    industry?: string[];
}

export interface IApplicant {
    id: string;
    createdAt: number; // unix in seconds 
    updatedAt: number; // unix in seconds 

    userId: string;
    fullName: string;
    contactEmail: string;
    phoneNumber: string;

    photoUrl?: string;
    profileSummary?: string;
    resumeURL: string;
    skills: string[];
    languages: string[];
    preference: IPreference;

    experience?: IExperience[];
    education?: IEducation[];
    socialLinks?: Partial<IASocialLinks>;
}


// EMPLOYER MODEL
export interface IESocialLinks {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string
}

export interface IEmployer {
    id: string;
    createdAt: number; // unix in seconds 
    updatedAt: number; // unix in seconds 

    userId: string;
    companyName: string;
    logoURL: string;
    contactNumber: string;
    email: string;
    address: string;
    websiteUrl?: string;

    industry: string;
    employeeStrength: string;
    yearOfEstablishMent: string;
    companyOverview?: string;
    companyVision?: string;

    socialLinks?: Partial<IESocialLinks>;
}


// JOB MODEL
export interface IJobDetails {
    tags: string[];
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
}

export interface IJob extends Partial<IJobDetails> {
    id: string;
    createdAt: number; // unix in seconds 
    updatedAt: number; // unix in seconds 

    postedBy: string;
    title: string;
    location: string;
    jobLevel: "internship" | "entry-level" | "mid-level" | "senior-level" | "lead" | "manager";

    skillsRequired: string[];
    experienceRequired: string;
    salaryRange: string;
    employmentType: "full-time" | "part-time" | "contractual" | "freelance" | "internship";
    shiftType: 'day' | 'night' | 'flexible';
    vacancies: number;

    applicationDeadline?: number; // in seconds
    isFeatured?: boolean;
    isArchived?: boolean;
}


// APPLICATION MODEL
export interface IApplication {
    id: string;
    createdAt: number; // unix in seconds 
    updatedAt: number; // unix in seconds 

    jobId: string;
    applicantId: string;
    status: "pending" | "shortlisted" | "rejected" | "contacted" | "hired";
    coverLetter?: string;
    interviewDate?: number; // unix in seconds 
    feedback?: string;
    notes?: string;
}


// SAVED JOBS MODEL
export interface ISavedJob {
    id: string;
    createdAt: number; // unix in seconds 
    updatedAt: number; // unix in seconds 

    applicantId: string;
    jobId: string;
}
