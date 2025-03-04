import { ResumeModel } from '@/apps/ResumeGen/helpers/interfaces';

export const sampleResume: ResumeModel = {
    contactInfo: {
        name: "Jane Doe",
        title: "Full Stack Developer",
        phone: "+1 (555) 123-4567",
        email: "jane.doe@example.com",
        location: "New York, NY",
        linkedIn: "https://www.linkedin.com/in/janedoe",
        github: "https://www.github.com/janedoe"
    },
    profile: "Passionate and versatile Full Stack Developer with 5 years of experience in building scalable web applications. Proficient in both front-end and back-end technologies, with a strong focus on creating efficient, maintainable, and user-friendly solutions.",
    technicalSkills: [
        {
            category: "Programming Languages",
            skills: [
                "JavaScript",
                "TypeScript",
                "Python",
                "Java"
            ]
        },
        {
            category: "Front-end Technologies",
            skills: [
                "React",
                "Vue.js",
                "HTML5",
                "CSS3",
                "SASS"
            ]
        },
        {
            category: "Back-end Technologies",
            skills: [
                "Node.js",
                "Express",
                "Django",
                "Spring Boot"
            ]
        },
        {
            category: "Databases",
            skills: [
                "MongoDB",
                "PostgreSQL",
                "MySQL"
            ]
        },
        {
            category: "DevOps & Tools",
            skills: [
                "Git",
                "Docker",
                "Jenkins",
                "AWS",
                "Jira"
            ]
        }
    ],
    workExperience: [
        {
            title: "Senior Full Stack Developer",
            company: "TechCorp Solutions",
            location: "San Francisco, CA",
            startDate: "2020-03",
            endDate: "Present",
            highlights: [
                "Led a team of 5 developers in redesigning and implementing a high-traffic e-commerce platform, resulting in a 40% increase in user engagement",
                "Architected and developed a microservices-based backend system, improving scalability and reducing server costs by 30%",
                "Implemented comprehensive unit and integration testing strategies, reducing bug reports by 50%"
            ]
        },
        {
            title: "Full Stack Developer",
            company: "WebWizards Inc.",
            location: "New York, NY",
            startDate: "2017-06",
            endDate: "2020-02",
            highlights: [
                "Developed and maintained multiple client-facing web applications using React and Node.js",
                "Collaborated with UX designers to implement responsive and accessible front-end interfaces",
                "Optimized database queries and implemented caching strategies, improving application performance by 60%"
            ]
        }
    ],
    education: [
        {
            institution: "University of Technology",
            degree: "Bachelor of Science",
            fieldOfStudy: "Computer Science",
            graduationYear: "2017"
        }
    ],
    projects: [
        {
            name: "EcoTrack",
            description: "A mobile app for tracking and reducing personal carbon footprint",
            technologies: [
                "React Native",
                "Node.js",
                "MongoDB",
                "AWS"
            ],
            link: "https://github.com/janedoe/ecotrack"
        },
        {
            name: "AITutor",
            description: "An AI-powered tutoring platform for students",
            technologies: [
                "Python",
                "TensorFlow",
                "Flask",
                "Vue.js"
            ],
            link: "https://github.com/janedoe/aitutor"
        }
    ],
    achievements: [
        {
            title: "Best Innovative Project Award",
            description: "Received award for EcoTrack app at the Global Green Tech Hackathon",
            date: "2022-09-09"
        },
        {
            title: "Speaker at ReactConf 2021",
            description: "Presented on 'Optimizing Performance in Large-Scale React Applications'",
            date: "2021-11-09"
        }
    ]
}