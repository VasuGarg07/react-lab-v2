import { z } from 'zod';

const optionalUrl = z.string().url('Enter a valid URL').optional().or(z.literal(''));

const experience = z.object({
    title: z.string().min(1, 'Title is required'),
    company: z.string().min(1, 'Company is required'),
    duration: z.string().min(1, 'Duration is required'),
    description: z.string().min(1, 'Description is required'),
});

const education = z.object({
    degree: z.string().min(1, 'Degree is required'),
    institution: z.string().min(1, 'Institution is required'),
    year: z.string().length(4, 'Use a 4-digit year'),
});

const preference = z.object({
    expectedSalary: z.number().positive('Enter a positive amount'),
    jobType: z.enum(['full-time', 'part-time', 'contractual', 'freelance', 'internship']),
    locations: z.array(z.string().min(1)).min(1, 'Add at least one location'),
    shift: z.enum(['day', 'night', 'flexible']).optional(),
    roles: z.array(z.string()).optional(),
    industries: z.array(z.string()).optional(),
});

export const applicantSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    contactEmail: z.string().email('Enter a valid email'),
    phoneNumber: z.string().min(10, 'At least 10 digits').max(15, 'At most 15 digits'),
    photoUrl: optionalUrl,
    profileSummary: z.string().optional(),
    resumeURL: z.string().url('Enter a valid resume URL'),
    skills: z.array(z.string().min(1)).min(1, 'Add at least one skill'),
    languages: z.array(z.string().min(1)).min(1, 'Add at least one language'),
    experience: z.array(experience).optional(),
    education: z.array(education).optional(),
    preference,
    socialLinks: z
        .object({
            twitter: optionalUrl,
            youtube: optionalUrl,
            github: optionalUrl,
            linkedin: optionalUrl,
            website: optionalUrl,
        })
        .partial()
        .optional(),
});

export type ApplicantFormValues = z.infer<typeof applicantSchema>;

export const employerSchema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    logoURL: z.string().url('Enter a valid logo URL'),
    industry: z.string().min(1, 'Pick an industry'),
    address: z.string().min(1, 'Address is required'),
    websiteUrl: optionalUrl,
    employeeStrength: z.string().min(1, 'Pick a team size'),
    yearOfEstablishment: z.string().min(1, 'Pick a year'),
    contactEmail: z.string().email('Enter a valid email'),
    contactNumber: z.string().min(10, 'At least 10 digits').max(15, 'At most 15 digits'),
    companyOverview: z.string().optional(),
    companyVision: z.string().optional(),
    socialLinks: z
        .object({
            facebook: optionalUrl,
            twitter: optionalUrl,
            instagram: optionalUrl,
            linkedin: optionalUrl,
            youtube: optionalUrl,
        })
        .partial()
        .optional(),
});

export type EmployerFormValues = z.infer<typeof employerSchema>;

export const jobSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    location: z.string().min(1, 'Location is required'),
    jobLevel: z.enum(['internship', 'entry-level', 'mid-level', 'senior-level', 'lead', 'manager']),
    vacancies: z.number().int().positive('Must be at least 1'),
    employmentType: z.enum(['full-time', 'part-time', 'contractual', 'freelance', 'internship']),
    shiftType: z.enum(['day', 'night', 'flexible']),
    salaryRange: z.string().min(1, 'Salary range is required'),
    experienceRequired: z.string().min(1, 'Experience requirement is required'),
    description: z.string().min(1, 'Description is required'),
    requirements: z.string().min(1, 'Requirements are required'),
    responsibilities: z.string().optional(),
    benefits: z.string().optional(),
    skillsRequired: z.array(z.string().min(1)).min(1, 'Add at least one skill'),
    tags: z.array(z.string()).optional(),
});

export type JobFormValues = z.infer<typeof jobSchema>;
