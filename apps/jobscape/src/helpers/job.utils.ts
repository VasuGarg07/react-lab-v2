import type { ApplicantInput, EmployerInput, Job, JobInput, JobPayload } from './job.types';

export function apiError(err: any, fallback = 'Something went wrong. Please try again.'): string {
    const body = err?.response?.data;
    if (body?.details?.length) return body.details.map((d: { message: string }) => d.message).join(', ');
    return body?.error || err?.message || fallback;
}

export const statusOf = (err: any): number | undefined => err?.response?.status;

function prune<T extends object>(obj?: T): T | undefined {
    if (!obj) return undefined;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'string') {
            if (v.trim()) out[k] = v.trim();
        } else if (v != null) {
            out[k] = v;
        }
    }
    return Object.keys(out).length ? (out as T) : undefined;
}

export const cleanApplicant = (input: ApplicantInput): ApplicantInput => ({
    ...input,
    photoUrl: input.photoUrl?.trim() || undefined,
    profileSummary: input.profileSummary?.trim() || undefined,
    experience: input.experience?.length ? input.experience : undefined,
    education: input.education?.length ? input.education : undefined,
    socialLinks: prune(input.socialLinks),
});

export const cleanEmployer = (input: EmployerInput): EmployerInput => ({
    ...input,
    websiteUrl: input.websiteUrl?.trim() || undefined,
    companyOverview: input.companyOverview?.trim() || undefined,
    companyVision: input.companyVision?.trim() || undefined,
    socialLinks: prune(input.socialLinks),
});

export const cleanJob = (input: JobInput): JobInput => ({
    ...input,
    responsibilities: input.responsibilities?.trim() || undefined,
    benefits: input.benefits?.trim() || undefined,
    tags: input.tags?.length ? input.tags : undefined,
});

export const linesToArray = (value?: string): string[] =>
    (value ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

export const arrayToLines = (value?: string[]): string => (value ?? []).join('\n');

export const serializeJob = (input: JobInput): JobPayload => {
    const c = cleanJob(input);
    const responsibilities = linesToArray(c.responsibilities);
    const benefits = linesToArray(c.benefits);
    return {
        ...c,
        requirements: linesToArray(c.requirements),
        responsibilities: responsibilities.length ? responsibilities : undefined,
        benefits: benefits.length ? benefits : undefined,
    };
};

export const jobToInput = (job: Job): JobInput => ({
    title: job.title,
    location: job.location,
    jobLevel: job.jobLevel,
    vacancies: job.vacancies,
    employmentType: job.employmentType,
    shiftType: job.shiftType,
    salaryRange: job.salaryRange,
    experienceRequired: job.experienceRequired,
    description: job.description,
    requirements: arrayToLines(job.requirements),
    responsibilities: arrayToLines(job.responsibilities),
    benefits: arrayToLines(job.benefits),
    skillsRequired: job.skillsRequired,
    tags: job.tags ?? [],
});

export const pluralize = (count: number, singular: string, plural = `${singular}s`): string =>
    `${count} ${count === 1 ? singular : plural}`;

export const openingsLabel = (count: number): string =>
    count === 1 ? '1 opening' : `${count} openings`;

export const initials = (name: string): string =>
    name
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p.charAt(0).toUpperCase())
        .join('');
