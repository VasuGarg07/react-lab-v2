import { ResumeModel } from './interfaces';

export const INITIAL_RESUME: ResumeModel = {
    contactInfo: {
        name: "",
        title: "",
        phone: "",
        email: "",
        linkedIn: "",
        github: ""
    },
    profile: "",
    technicalSkills: [],
    workExperience: [],
    education: []
    // Note: projects and achievements are not included in the initial state
};


export const SKILL_CATEGORIES = [
    "Languages",
    "Libraries/Frameworks",
    "Databases",
    "Developer Tools",
    "Cloud Platforms",
    "Version Control",
    "Testing",
    "DevOps",
    "Mobile Development",
    "Other"
];

export const DEGREE_TYPES = [
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree",
    "Professional Certification",
    "Diploma",
    "High School Diploma",
    "Other"
];

export const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const YEARS = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

export const SKILL_LEVELS = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert"
];

export const MAX_WORK_EXPERIENCES = 10;
export const MAX_EDUCATION_ENTRIES = 5;
export const MAX_SKILLS = 20;

export const SOCIAL_MEDIA_PLATFORMS = [
    { name: "LinkedIn", baseUrl: "https://www.linkedin.com/in/" },
    { name: "GitHub", baseUrl: "https://github.com/" },
    { name: "Twitter", baseUrl: "https://twitter.com/" },
    { name: "Portfolio", baseUrl: "" }
];

export const RESUME_TEMPLATES = [
    { id: "classic", name: "Classic" },
    { id: "modern", name: "Modern" },
    { id: "minimalist", name: "Minimalist" },
    { id: "professional", name: "Professional" },
    { id: "creative", name: "Creative" }
];

export const MAX_PROFILE_LENGTH = 500;
export const MAX_RESPONSIBILITY_LENGTH = 200;