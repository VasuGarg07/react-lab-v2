import { ResumeModel } from './interfaces';

export const sampleResume: ResumeModel = {
    contactInfo: {
        name: "Vasu Garg",
        title: "Senior Software Engineer",
        phone: "+91-9878207089",
        email: "vasugarg6656@gmail.com",
        linkedIn: "vasu-garg-07",
        github: "VasuGarg07"
    },
    profile: "Experienced Full Stack Developer with a proven track record of two years. Proficient in designing and developing robust, scalable and seamlessly responsive solutions.",
    technicalSkills: [
        { category: "Languages", skills: ["Javascript", "Typescript", "Python", "C/C++", "HTML/CSS"] },
        { category: "Libraries/Frameworks", skills: ["React", "Angular", "Firebase"] },
        { category: "Databases", skills: ["MongoDB", "Firebase", "MySQL"] },
        { category: "Developer Tools", skills: ["Git", "Linux"] }
    ],
    workExperience: [
        {
            title: "Senior Software Engineer",
            company: "uTrade Solutions",
            location: "Punjab, India",
            startDate: "05/2024",
            endDate: "present",
            highlights: [
                "Developed an Artificial Intelligence assistant for developing trading strategies and portfolios using OpenAI, WebSockets, Angular, and Go.",
                "Designed uAlgoScript - a YAML based configuration language tailored specially for defining complex options trading strategies.",
                "Developed an extensive and feature rich portfolio editor for the AI assistant, enabling collaborative work between users and AI.",
                "Built an AI powered chatbot named uTrade Advisor, offering comprehensive user support and guidance.",
                "Developed a API management dashboard for uTrade's Open Trading and Market data APIs using Next.JS, Redux and NodeJS"
            ]
        },
        {
            title: "Software Engineer",
            company: "uTrade Solutions",
            location: "Punjab, India",
            startDate: "07/2022",
            endDate: "04/2024",
            highlights: [
                "Developed 25+ features and fixed 200+ bugs, including secure anonymous file sharing, client-side tokenized document searching, and microservices to improve COVE-DRIVE platform scalability and efficiency.",
                "Integrated Google Analytics in CoveDrive, tracking user interactions and most popular features, in turn contributing to a 25% improvement in user retention over 6 months by optimizing user experience based on data insights.",
                "Revamped the application UI and modular architecture, reducing template size by 45% and improving site loading performance by 16%.",
                "Developed a dynamic e-KYC portal, using Angular, PostGreSQL and Django to create a more user-friendly and adaptable interface which reduced dev efforts by 60% for onboarding of new client.",
                "Designed migration scripts and cloud functions for Firestore and Storage Bucket to update and synchronize user data across multiple Firebase applications.",
                "Contributed in development an affiliate dashboard to manage trading activity records of clients, refactoring the existing client reports and funds reports to upscale the record management efficiency by 20%"
            ]
        },
        {
            title: "Software Engineer Intern",
            company: "uTrade Solutions",
            location: "Punjab, India",
            startDate: "01/2022",
            endDate: "06/2022",
            highlights: [
                "Developed an SEO-optimized website for uTrade's trading and market data REST APIs using Next.js and MkDocs.",
                "Contributed to the development of features and bug fixes the Crypto Exchange web portal",
                "Implemented the Cove Drop web extension that facilitates real-time data transfer between the Cove App and the web extension using React."
            ]
        }
    ],
    education: [
        {
            institution: "Chandigarh College of Engineering and Technology",
            degree: "Bachelor of Engineering",
            fieldOfStudy: "Computer Science and Technology",
            graduationYear: "2022"
        }
    ],
    projects: [
        {
            name: "React Lab",
            description: "Developed a comprehensive showcase application demonstrating various React concepts and best practices. This project serves as a learning platform and reference for React developers, featuring multiple sub-projects that highlight different aspects of React development. Key features include state management demonstrations, custom hook implementations, responsive design patterns, and integration with modern UI libraries.",
            technologies: ["React", "TypeScript", "Joy UI", "React Router", "Context API", "Custom Hooks"],
            link: "https://react-lab-v2.web.app"
        }
    ]
};