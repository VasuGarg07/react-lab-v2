export interface ContactInfo {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    linkedIn: string;
    github: string;
}

export interface TechnicalSkill {
    category: string;
    skills: string[];
}

export interface WorkExperience {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    highlights: string[];
}

export interface Education {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationYear: string;
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
}

export interface Achievement {
    title: string;
    description: string;
    date: string;
}

export interface ResumeModel {
    contactInfo: ContactInfo;
    profile: string;
    technicalSkills: TechnicalSkill[];
    workExperience: WorkExperience[];
    education: Education[];
    projects?: Project[];
    achievements?: Achievement[];
}