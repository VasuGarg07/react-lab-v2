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

export const MAX_PROFILE_LENGTH = 800;
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

export const SAMPLE_PROFILES = [
    "A seasoned software engineer specializing in full-stack development with expertise in creating scalable, high-performance web applications. Proficient in modern frontend and backend technologies, with a strong focus on clean code, responsive design, and continuous integration.",
    "Highly organized project manager with a proven track record of successfully leading complex projects from inception to completion. Skilled in agile methodologies, risk management, and cross-functional team collaboration to deliver projects on time and within scope.",
    "Results-oriented marketing professional with a passion for developing and executing digital marketing strategies that drive engagement and growth. Expertise in social media campaigns, SEO/SEM, content marketing, and performance analytics to enhance brand presence.",
    "Data scientist with a strong background in machine learning, statistical modeling, and data analysis. Experienced in using advanced algorithms and predictive modeling techniques to extract insights, optimize processes, and inform business decisions.",
    "Dynamic sales representative with a history of consistently exceeding sales targets by developing strong client relationships and delivering exceptional customer service. Skilled in consultative selling, negotiation, and leveraging market trends to drive revenue growth.",
    "Passionate UX/UI designer focused on creating intuitive, user-centered designs that enhance the user experience. Adept at wireframing, prototyping, and usability testing, with a strong eye for detail and a commitment to delivering visually appealing and functional interfaces.",
    "Analytical financial analyst with expertise in forecasting, budgeting, and financial reporting. Proven ability to analyze complex financial data, identify trends, and provide actionable recommendations to improve business performance and profitability.",
    "DevOps engineer with extensive experience in automating and streamlining operations using CI/CD pipelines, cloud platforms, and containerization technologies. Proficient in optimizing workflows to ensure faster, more reliable deployments and maintaining high system uptime.",
    "Insightful business analyst with expertise in process improvement, data-driven decision-making, and stakeholder management. Skilled in translating business requirements into technical solutions, improving efficiency, and driving business value.",
    "Security-focused IT professional with extensive experience in network security, vulnerability assessment, and risk management. Committed to safeguarding systems and data through proactive threat detection, response, and remediation strategies."
];

export const PROMPT_STARTERS = [
    "Experienced software engineer specializing in full-stack development...",
    "Detail-oriented project manager with a track record of delivering complex projects...",
    "Creative marketing professional skilled in digital campaign strategy...",
    "Data scientist with expertise in machine learning and predictive modeling...",
    "Customer-focused sales representative with a history of exceeding targets...",
    "Innovative UX/UI designer passionate about creating intuitive user experiences...",
    "Results-driven financial analyst with strong analytical and forecasting skills..."
];