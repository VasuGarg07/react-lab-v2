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