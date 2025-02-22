import { IApplicant, IEmployer, IJob } from "@/apps/Jobscape/helpers/job.types";

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

export const sampleJobs: IJob[] = [
    {
        postedBy: "tech_recruiter_123",
        title: "Senior Frontend Developer",
        location: "Bangalore, Karnataka",
        jobLevel: "senior-level",
        description: `<div>
        <p>We are seeking an experienced Frontend Developer to join our dynamic team. The ideal candidate will have a strong foundation in React and modern web technologies.</p>
        <p>As a Senior Frontend Developer, you will be responsible for architecting and implementing user interfaces that provide exceptional user experiences.</p>
      </div>`,
        responsibilities: `<div>
        <ul>
          <li>Lead the development of complex frontend applications using React and TypeScript</li>
          <li>Mentor junior developers and conduct code reviews</li>
          <li>Collaborate with UI/UX designers to implement responsive designs</li>
          <li>Optimize application performance and ensure cross-browser compatibility</li>
        </ul>
      </div>`,
        requirements: `<div>
        <ul>
          <li>5+ years of experience in frontend development</li>
          <li>Expert knowledge of React, TypeScript, and modern JavaScript</li>
          <li>Strong understanding of web performance optimization</li>
          <li>Experience with state management solutions (Redux, MobX)</li>
        </ul>
      </div>`,
        benefits: `<div>
        <ul>
          <li>Competitive salary and equity package</li>
          <li>Comprehensive health insurance</li>
          <li>Flexible work hours and remote work options</li>
          <li>Professional development budget</li>
        </ul>
      </div>`,
        skillsRequired: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Redux"],
        experienceRequired: "5+ years",
        salaryRange: "25L - 45L",
        employmentType: "full-time",
        shiftType: "flexible",
        vacancies: 2,
        isFeatured: true,
        isArchived: false,
        tags: ["frontend", "react", "typescript", "senior"]
    },
    {
        postedBy: "hr_manager_456",
        title: "DevOps Engineer",
        location: "Mumbai, Maharashtra",
        jobLevel: "mid-level",
        description: `<div>
        <p>Join our infrastructure team to help build and maintain our cloud-native platform. You'll work with cutting-edge technologies and help scale our systems.</p>
        <p>We're looking for someone who is passionate about automation and infrastructure as code.</p>
      </div>`,
        responsibilities: `<div>
        <ul>
          <li>Design and implement CI/CD pipelines</li>
          <li>Manage and optimize cloud infrastructure on AWS</li>
          <li>Monitor system performance and implement improvements</li>
          <li>Collaborate with development teams to improve deployment processes</li>
        </ul>
      </div>`,
        requirements: `<div>
        <ul>
          <li>3+ years of DevOps experience</li>
          <li>Strong knowledge of AWS services</li>
          <li>Experience with Docker and Kubernetes</li>
          <li>Proficiency in Python or Go</li>
        </ul>
      </div>`,
        benefits: `<div>
        <ul>
          <li>Health and dental coverage</li>
          <li>Annual performance bonus</li>
          <li>Gym membership</li>
          <li>Regular team outings</li>
        </ul>
      </div>`,
        skillsRequired: ["AWS", "Docker", "Kubernetes", "Python", "Jenkins", "Terraform"],
        experienceRequired: "3+ years",
        salaryRange: "15L - 30L",
        employmentType: "full-time",
        shiftType: "day",
        vacancies: 3,
        isFeatured: false,
        isArchived: false,
        tags: ["devops", "aws", "kubernetes", "cloud"]
    },
    {
        postedBy: "startup_founder_789",
        title: "UI/UX Design Intern",
        location: "Pune, Maharashtra",
        jobLevel: "internship",
        description: `<div>
        <p>Exciting opportunity for a UI/UX Design intern to work on real-world projects. You'll be mentored by experienced designers and get hands-on experience with the latest design tools.</p>
      </div>`,
        responsibilities: `<div>
        <ul>
          <li>Create wireframes and prototypes for mobile applications</li>
          <li>Conduct user research and usability testing</li>
          <li>Design user interfaces following our design system</li>
          <li>Participate in design critique sessions</li>
        </ul>
      </div>`,
        requirements: `<div>
        <ul>
          <li>Currently pursuing degree in Design or related field</li>
          <li>Knowledge of Figma and Adobe Creative Suite</li>
          <li>Strong portfolio showcasing UI/UX projects</li>
          <li>Good understanding of design principles</li>
        </ul>
      </div>`,
        benefits: `<div>
        <ul>
          <li>Paid internship</li>
          <li>Learning and development opportunities</li>
          <li>Certificate upon completion</li>
          <li>Possibility of full-time conversion</li>
        </ul>
      </div>`,
        skillsRequired: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        experienceRequired: "0-1 year",
        salaryRange: "3L - 5L",
        employmentType: "internship",
        shiftType: "day",
        vacancies: 5,
        isFeatured: false,
        isArchived: false,
        tags: ["design", "ui-ux", "internship", "figma"]
    },
    {
        postedBy: "tech_lead_101",
        title: "Backend Team Lead",
        location: "Hyderabad, Telangana",
        jobLevel: "lead",
        description: `<div>
        <p>We're looking for a Backend Team Lead to drive the technical direction of our server-side applications and lead a team of talented engineers.</p>
        <p>The ideal candidate will have strong technical skills and leadership experience.</p>
      </div>`,
        responsibilities: `<div>
        <ul>
          <li>Lead and mentor a team of backend developers</li>
          <li>Design and implement scalable microservices</li>
          <li>Make key architectural decisions</li>
          <li>Collaborate with product managers on technical roadmap</li>
        </ul>
      </div>`,
        requirements: `<div>
        <ul>
          <li>7+ years of backend development experience</li>
          <li>2+ years of team leadership experience</li>
          <li>Expert knowledge of Java/Spring Boot</li>
          <li>Strong system design and architecture skills</li>
        </ul>
      </div>`,
        benefits: `<div>
        <ul>
          <li>Leadership bonus and profit sharing</li>
          <li>Premium health insurance for family</li>
          <li>International conference allowance</li>
          <li>Stock options</li>
        </ul>
      </div>`,
        skillsRequired: ["Java", "Spring Boot", "Microservices", "System Design", "Team Leadership", "AWS"],
        experienceRequired: "7+ years",
        salaryRange: "35L - 60L",
        employmentType: "full-time",
        shiftType: "flexible",
        vacancies: 1,
        isFeatured: true,
        isArchived: false,
        tags: ["backend", "java", "leadership", "microservices"]
    },
    {
        postedBy: "agency_recruiter_202",
        title: "Data Analyst",
        location: "Chennai, Tamil Nadu",
        jobLevel: "entry-level",
        description: `<div>
        <p>Looking for a passionate Data Analyst to join our analytics team. This role offers an excellent opportunity for someone starting their career in data analytics.</p>
        <p>You'll work with large datasets and help derive meaningful insights for our business.</p>
      </div>`,
        responsibilities: `<div>
        <ul>
          <li>Create and maintain regular business reports</li>
          <li>Analyze data to identify trends and patterns</li>
          <li>Build and maintain dashboards using Power BI</li>
          <li>Collaborate with stakeholders to understand requirements</li>
        </ul>
      </div>`,
        requirements: `<div>
        <ul>
          <li>Bachelor's degree in Statistics, Mathematics, or related field</li>
          <li>Strong SQL and Excel skills</li>
          <li>Experience with Power BI or Tableau</li>
          <li>Good analytical and problem-solving skills</li>
        </ul>
      </div>`,
        benefits: `<div>
        <ul>
          <li>Health insurance</li>
          <li>Performance bonus</li>
          <li>Learning allowance</li>
          <li>Flexible work hours</li>
        </ul>
      </div>`,
        skillsRequired: ["SQL", "Python", "Power BI", "Excel", "Statistics"],
        experienceRequired: "0-2 years",
        salaryRange: "5L - 8L",
        employmentType: "full-time",
        shiftType: "day",
        vacancies: 4,
        isFeatured: false,
        isArchived: false,
        tags: ["data-analysis", "sql", "power-bi", "analytics"]
    }
];

export const jobSamples: IJob[] = [
    {
        postedBy: "TechCorp Ltd.",
        title: "Software Engineer",
        location: "San Francisco, CA",
        jobLevel: "mid-level",
        skillsRequired: ["JavaScript", "React", "Node.js", "SQL"],
        experienceRequired: "3-5 years",
        salaryRange: "8L - 120L",
        employmentType: "full-time",
        shiftType: "day",
        vacancies: 3,
        isFeatured: true,
        isArchived: false,
        description: "<p>Join our team to develop cutting-edge web applications using modern frameworks.</p>",
        responsibilities: "<ul><li>Develop scalable web applications</li><li>Collaborate with cross-functional teams</li><li>Write clean and efficient code</li></ul>",
        requirements: "<ul><li>Bachelor's degree in Computer Science</li><li>Strong experience in React and Node.js</li><li>Excellent problem-solving skills</li></ul>",
        benefits: "<ul><li>Health insurance</li><li>401(k) matching</li><li>Flexible work hours</li></ul>",
        tags: ["Software", "Engineering", "React", "Node.js"]
    },
    {
        postedBy: "HealthPlus Inc.",
        title: "Data Analyst",
        location: "New York, NY",
        jobLevel: "entry-level",
        skillsRequired: ["Python", "SQL", "Data Visualization", "Excel"],
        experienceRequired: "1-2 years",
        salaryRange: "6L - 8L",
        employmentType: "full-time",
        shiftType: "day",
        vacancies: 2,
        isFeatured: false,
        isArchived: false,
        description: "<p>Analyze healthcare data to derive actionable insights for better decision-making.</p>",
        responsibilities: "<ul><li>Collect and clean data from various sources</li><li>Create insightful reports and dashboards</li><li>Collaborate with stakeholders</li></ul>",
        requirements: "<ul><li>Bachelor's degree in Statistics or related field</li><li>Experience with Python and SQL</li><li>Strong analytical skills</li></ul>",
        benefits: "<ul><li>Remote work options</li><li>Paid time off</li><li>Professional development budget</li></ul>",
        tags: ["Data Analysis", "Python", "Healthcare", "SQL"]
    },
    {
        postedBy: "CreativeStudio",
        title: "Graphic Designer",
        location: "Los Angeles, CA",
        jobLevel: "senior-level",
        skillsRequired: ["Adobe Photoshop", "Illustrator", "UI/UX", "Branding"],
        experienceRequired: "5-7 years",
        salaryRange: "7L - 10L",
        employmentType: "contractual",
        shiftType: "flexible",
        vacancies: 1,
        isFeatured: true,
        isArchived: false,
        description: "<p>Design creative visuals and marketing materials for our clients.</p>",
        responsibilities: "<ul><li>Develop branding guidelines</li><li>Create visual content for digital and print</li><li>Work closely with marketing teams</li></ul>",
        requirements: "<ul><li>Degree in Graphic Design or related field</li><li>Strong portfolio showcasing design skills</li><li>Proficiency in Adobe Suite</li></ul>",
        benefits: "<ul><li>Flexible work schedule</li><li>Competitive contract rates</li><li>Work with top brands</li></ul>",
        tags: ["Graphic Design", "UI/UX", "Branding", "Marketing"]
    },
    {
        postedBy: "FinanceWorks",
        title: "Financial Analyst",
        location: "Chicago, IL",
        jobLevel: "mid-level",
        skillsRequired: ["Excel", "Financial Modeling", "Forecasting", "SQL"],
        experienceRequired: "4-6 years",
        salaryRange: "9L - 11L",
        employmentType: "full-time",
        shiftType: "day",
        vacancies: 2,
        isFeatured: false,
        isArchived: false,
        description: "<p>Analyze financial data to support strategic business decisions.</p>",
        responsibilities: "<ul><li>Prepare financial reports</li><li>Conduct financial analysis and forecasting</li><li>Assist in budgeting and planning</li></ul>",
        requirements: "<ul><li>Bachelor's degree in Finance</li><li>Strong analytical and Excel skills</li><li>Experience in financial modeling</li></ul>",
        benefits: "<ul><li>Stock options</li><li>Health benefits</li><li>Retirement plan</li></ul>",
        tags: ["Finance", "Analysis", "Budgeting", "Forecasting"]
    },
    {
        postedBy: "EduLearn",
        title: "Content Writer",
        location: "Remote",
        jobLevel: "entry-level",
        skillsRequired: ["Content Writing", "SEO", "Editing", "WordPress"],
        experienceRequired: "1-3 years",
        salaryRange: "5L - 7L",
        employmentType: "freelance",
        shiftType: "flexible",
        vacancies: 5,
        isFeatured: true,
        isArchived: false,
        description: "<p>Write engaging educational content for our online platform.</p>",
        responsibilities: "<ul><li>Research and write SEO-friendly articles</li><li>Edit and proofread content</li><li>Collaborate with marketing teams</li></ul>",
        requirements: "<ul><li>Strong writing skills</li><li>Familiarity with SEO techniques</li><li>Experience with WordPress</li></ul>",
        benefits: "<ul><li>Work from anywhere</li><li>Flexible deadlines</li><li>Competitive pay per article</li></ul>",
        tags: ["Content Writing", "SEO", "Education", "Remote Work"]
    }
];
