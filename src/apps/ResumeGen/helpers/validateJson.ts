import { Achievement, ContactInfo, Education, Project, ResumeModel, TechnicalSkill, WorkExperience } from "./interfaces";

function isValidContactInfo(info: any): info is ContactInfo {
    return (
        typeof info === 'object' &&
        typeof info.name === 'string' &&
        typeof info.title === 'string' &&
        typeof info.phone === 'string' &&
        typeof info.email === 'string' &&
        typeof info.linkedIn === 'string' &&
        typeof info.github === 'string'
    );
}

function isValidTechnicalSkill(skill: any): skill is TechnicalSkill {
    return (
        typeof skill === 'object' &&
        typeof skill.category === 'string' &&
        Array.isArray(skill.skills) &&
        skill.skills.every((s: any) => typeof s === 'string')
    );
}

function isValidWorkExperience(exp: any): exp is WorkExperience {
    return (
        typeof exp === 'object' &&
        typeof exp.title === 'string' &&
        typeof exp.company === 'string' &&
        typeof exp.location === 'string' &&
        typeof exp.startDate === 'string' &&
        typeof exp.endDate === 'string' &&
        Array.isArray(exp.highlights) &&
        exp.highlights.every((h: any) => typeof h === 'string')
    );
}

function isValidEducation(edu: any): edu is Education {
    return (
        typeof edu === 'object' &&
        typeof edu.institution === 'string' &&
        typeof edu.degree === 'string' &&
        typeof edu.fieldOfStudy === 'string' &&
        typeof edu.graduationYear === 'string'
    );
}

function isValidProject(project: any): project is Project {
    return (
        typeof project === 'object' &&
        typeof project.name === 'string' &&
        typeof project.description === 'string' &&
        Array.isArray(project.technologies) &&
        project.technologies.every((t: any) => typeof t === 'string') &&
        (project.link === undefined || typeof project.link === 'string')
    );
}

function isValidAchievement(achievement: any): achievement is Achievement {
    return (
        typeof achievement === 'object' &&
        typeof achievement.title === 'string' &&
        typeof achievement.description === 'string' &&
        typeof achievement.date === 'string'
    );
}

export function isValidResumeModel(json: any): json is ResumeModel {
    return (
        json &&
        typeof json === 'object' &&
        isValidContactInfo(json.contactInfo) &&
        typeof json.profile === 'string' &&
        Array.isArray(json.technicalSkills) &&
        json.technicalSkills.every(isValidTechnicalSkill) &&
        Array.isArray(json.workExperience) &&
        json.workExperience.every(isValidWorkExperience) &&
        Array.isArray(json.education) &&
        json.education.every(isValidEducation) &&
        (json.projects === undefined || (Array.isArray(json.projects) && json.projects.every(isValidProject))) &&
        (json.achievements === undefined || (Array.isArray(json.achievements) && json.achievements.every(isValidAchievement)))
    );
}