import { formatString } from "../../../shared/utilities";
import { IApplicant, IEmployer, IJob } from "./job.types";

// Employer Form Empty State
export const defaultEmployer: IEmployer = {
    userId: "",
    companyName: "",
    logoURL: "",
    contactNumber: "",
    email: "",
    address: "",

    industry: "",
    employeeStrength: "",
    yearOfEstablishMent: "",
}

// Applicant Form Empty State
export const defaultApplicant: IApplicant = {
    userId: "",
    fullName: "",
    contactEmail: "",
    phoneNumber: "",
    resumeURL: "",
    skills: [],
    languages: [],
    experience: [],
    education: [],
    preference: {
        expectedSalary: 10000,
        jobType: "full-time",
        shift: 'day',
        locations: []
    },
}

export const defaultJob: IJob = {
    postedBy: "",
    title: "",
    location: "",
    jobLevel: "internship",
    skillsRequired: [],
    experienceRequired: "",
    salaryRange: "",
    employmentType: "full-time",
    shiftType: "day",
    vacancies: 1,
    description: "",
    requirements: ""
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

export const JOB_LEVELS = [
    "internship", "entry-level", "mid-level", "senior-level", "lead", "manager"
].map(type => {
    return { value: type, displayName: formatString(type) }
});

export const JOB_TYPES = [
    'full-time',
    'part-time',
    'contractual',
    'freelance',
    'internship'
].map(type => {
    return { value: type, displayName: formatString(type) }
});

export const SHIFT_TYPES = [
    'day',
    'night',
    'flexible'
].map(type => {
    return { value: type, displayName: formatString(type) }
});

// TODO: Testing Only
export const sampleApplicant: IApplicant = {
    userId: "user123",
    fullName: "Alex Morgan Thompson",
    photoUrl: "https://i.ibb.co/Ld1m5CL/genshin-impact-xilonen-abilties.jpg",
    contactEmail: "alex.thompson@email.com",
    phoneNumber: "+1234567890",
    profileSummary: "Full-stack developer with 5+ years of experience specializing in React and Node.js. Passionate about building scalable web applications and mentoring junior developers.",
    resumeURL: "https://example.com/resume.pdf",
    skills: [
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "AWS",
        "Docker",
        "GraphQL",
        "Jest",
        "CI/CD",
        "Agile"
    ],
    languages: [
        "English",
        "Spanish",
        "French"
    ],
    experience: [
        {
            title: "Senior Software Engineer",
            company: "TechCorp Solutions",
            duration: "Jan 2021 - Present",
            description: "Led a team of 5 developers in building a microservices-based e-commerce platform. Improved system performance by 40% through optimization and caching strategies."
        },
        {
            title: "Full Stack Developer",
            company: "Digital Innovations Inc",
            duration: "Mar 2019 - Dec 2020",
            description: "Developed and maintained multiple React-based web applications. Implemented automated testing that reduced bug reports by 30%."
        },
        {
            title: "Junior Developer",
            company: "StartUp Tech",
            duration: "Jun 2017 - Feb 2019",
            description: "Worked on front-end development using React and Redux. Collaborated with UX team to implement responsive designs."
        }
    ],
    education: [
        {
            degree: "Master of Computer Science",
            institution: "Tech State University",
            year: "2017"
        },
        {
            degree: "Bachelor of Science in Software Engineering",
            institution: "National University",
            year: "2015"
        }
    ],
    preference: {
        expectedSalary: 120000,
        jobType: "full-time",
        shift: "day",
        locations: ["New York", "San Francisco", "Remote"],
        role: ["Senior Developer", "Tech Lead", "Software Architect"],
        industry: ["Technology", "Finance", "Healthcare"]
    },
    socialLinks: {
        github: "https://github.com/alexthompson",
        linkedin: "https://linkedin.com/in/alexthompson",
        twitter: "https://twitter.com/alexdev",
        website: "https://alexthompson.dev",
        youtube: "https://youtube.com/@alexcodes"
    }
};

export const sampleEmployer: IEmployer = {
    userId: "emp123",
    companyName: "Innovate Solutions Inc.",
    logoURL: "https://i.ibb.co/CBB9c1Y/simon-zhu-4hluho-RJok-I-unsplash.jpg",
    contactNumber: "+1-555-234-5678",
    email: "careers@innovatesolutions.com",
    address: "123 Tech Park Drive, Silicon Valley, CA 94025",
    websiteUrl: "https://innovatesolutions.com",

    industry: "Information Technology",
    employeeStrength: '201-500',
    yearOfEstablishMent: "2010",
    companyOverview: "Innovate Solutions is a leading technology company specializing in enterprise software solutions, cloud computing, and digital transformation. We help businesses modernize their operations through cutting-edge technology and innovative solutions.",
    companyVision: "To revolutionize how businesses operate through technology, making digital transformation accessible to companies of all sizes.",

    socialLinks: {
        facebook: "https://facebook.com/innovatesolutions",
        twitter: "https://twitter.com/innovatetech",
        instagram: "https://instagram.com/innovatesolutions",
        linkedin: "https://linkedin.com/company/innovate-solutions",
        youtube: "https://youtube.com/@innovatesolutions"
    }
};