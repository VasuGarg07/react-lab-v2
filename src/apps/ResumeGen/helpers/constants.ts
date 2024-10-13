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
    education: [],
    projects: [],
    achievements: []
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

export const DEFAULT_JOB_TITLES = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "DevOps Engineer",
    "Mobile App Developer",
    "Machine Learning Engineer",
    "Cloud Architect",
    "Cybersecurity Analyst",
    "Business Analyst",
    "Project Manager",
    "QA Engineer"
];