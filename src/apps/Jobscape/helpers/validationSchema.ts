import { z } from "zod";

export const employerFormSchema = z.object({
    // Company Info
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    logoURL: z.string().url("Please provide a valid logo URL"),
    companyOverview: z.string().optional(),

    // Founding Info
    industry: z.string().min(1, "Please select an industry"),
    employeeStrength: z.string().min(1, "Please select team size"),
    yearOfEstablishMent: z.string().min(1, "Please select establishment year"),
    websiteUrl: z.string().url("Please enter a valid URL").optional(),
    companyVision: z.string().optional(),

    // Social Links
    socialLinks: z.object({
        facebook: z.string().url("Please enter a valid Facebook URL").optional(),
        twitter: z.string().url("Please enter a valid Twitter URL").optional(),
        instagram: z.string().url("Please enter a valid Instagram URL").optional(),
        linkedin: z.string().url("Please enter a valid LinkedIn URL").optional(),
        youtube: z.string().url("Please enter a valid YouTube URL").optional()
    }).optional(),

    // Contact Details
    contactNumber: z.string().min(10, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email address"),
    address: z.string().min(5, "Please enter a valid address")
});

export type EmployerFormData = z.infer<typeof employerFormSchema>;



// Experience Schema
const experienceSchema = z.object({
    title: z.string().min(2, "Job title must be at least 2 characters"),
    company: z.string().min(2, "Company name must be at least 2 characters"),
    duration: z.string().min(1, "Duration is required"),
    description: z.string().min(10, "Description must be at least 10 characters")
});

// Education Schema
const educationSchema = z.object({
    degree: z.string().min(2, "Degree must be at least 2 characters"),
    institution: z.string().min(2, "Institution name must be at least 2 characters"),
    year: z.string().regex(/^\d{4}$/, "Please enter a valid year")
});

// Social Links Schema
const socialLinksSchema = z.object({
    twitter: z.string().url("Please enter a valid Twitter URL"),
    youtube: z.string().url("Please enter a valid YouTube URL"),
    github: z.string().url("Please enter a valid GitHub URL"),
    linkedin: z.string().url("Please enter a valid LinkedIn URL"),
    website: z.string().url("Please enter a valid website URL")
}).partial();

// Preference Schema
const preferenceSchema = z.object({
    expectedSalary: z.number().min(0, "Expected salary cannot be negative"),
    jobType: z.enum(['full-time', 'part-time', 'contractual', 'freelance', 'internship'], {
        errorMap: () => ({ message: "Please select a valid job type" })
    }),
    locations: z.array(z.string()).min(1, "Please select at least one location"),
    shift: z.enum(['day', 'night', 'flexible'], {
        errorMap: () => ({ message: "Please select a valid shift" })
    }).optional(),
    role: z.array(z.string()).optional(),
    industry: z.array(z.string()).optional()
});

// Main Applicant Schema
export const applicantSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    contactEmail: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().regex(
        /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,
        "Please enter a valid phone number"
    ),

    photoUrl: z.string().url("Please enter a valid photo URL").optional(),
    profileSummary: z.string().min(50, "Profile summary must be at least 50 characters").optional(),
    resumeURL: z.string().url("Please provide a valid resume URL"),
    skills: z.array(z.string()).min(1, "Please add at least one skill"),
    languages: z.array(z.string()).min(1, "Please add at least one language"),
    preference: preferenceSchema,

    // These are required arrays (not optional)
    experience: z.array(experienceSchema).min(1, "At least one experience entry is required"),
    education: z.array(educationSchema).min(1, "At least one education entry is required"),
    socialLinks: socialLinksSchema.optional()
});

// Type inference
export type ApplicantFormData = z.infer<typeof applicantSchema>;