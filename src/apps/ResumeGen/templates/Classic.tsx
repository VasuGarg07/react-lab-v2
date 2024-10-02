import React from 'react';
import { styled } from '@mui/system';
import { ResumeModel } from '../helpers/interfaces';

const ResumeContainer = styled('div')({
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#333',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
});

const Header = styled('header')({
    '& h1': {
        color: '#2c3e50',
        borderBottom: '2px solid #2c3e50',
        paddingBottom: '10px',
    },
});

const Section = styled('section')({
    marginTop: '20px',
    '& h2': {
        color: '#2c3e50',
    },
});

const ContactInfo = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& div': {
        marginBottom: '5px',
    },
});

const Job = styled('div')({
    marginBottom: '20px',
});

const JobHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
});

interface TemplateProps {
    resumeData: ResumeModel
}

const ClassicProfessionalResume: React.FC<TemplateProps> = ({ resumeData }) => {
    const {
        contactInfo,
        profile,
        technicalSkills,
        workExperience,
        education,
        projects,
        achievements,
    } = resumeData;

    return (
        <ResumeContainer>
            <Header>
                <h1>{contactInfo.name}</h1>
                <p>{contactInfo.title}</p>
                <ContactInfo>
                    <div>{contactInfo.phone}</div>
                    <div>{contactInfo.email}</div>
                    <div>LinkedIn: {contactInfo.linkedIn}</div>
                    <div>GitHub: {contactInfo.github}</div>
                </ContactInfo>
            </Header>

            <Section>
                <h2>Profile</h2>
                <p>{profile}</p>
            </Section>

            <Section>
                <h2>Technical Skills</h2>
                {technicalSkills.map((skill, index) => (
                    <div key={index}>
                        <strong>{skill.category}:</strong> {skill.skills.join(', ')}
                    </div>
                ))}
            </Section>

            <Section>
                <h2>Work Experience</h2>
                {workExperience.map((job, index) => (
                    <Job key={index}>
                        <JobHeader>
                            <strong>{job.title}</strong>
                            <em>{job.startDate} - {job.endDate}</em>
                        </JobHeader>
                        <div>{job.company}, {job.location}</div>
                        <ul>
                            {job.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                            ))}
                        </ul>
                    </Job>
                ))}
            </Section>

            <Section>
                <h2>Education</h2>
                {education.map((edu, index) => (
                    <div key={index}>
                        <strong>{edu.degree} in {edu.fieldOfStudy}</strong>
                        <div>{edu.institution}, {edu.graduationYear}</div>
                    </div>
                ))}
            </Section>

            {projects && (
                <Section>
                    <h2>Projects</h2>
                    {projects.map((project, index) => (
                        <div key={index}>
                            <strong>{project.name}</strong>
                            <p>{project.description}</p>
                            <p><em>Technologies:</em> {project.technologies.join(', ')}</p>
                            {project.link && <p><a href={project.link} target="_blank" rel="noopener noreferrer">Project Link</a></p>}
                        </div>
                    ))}
                </Section>
            )}

            {achievements && (
                <Section>
                    <h2>Achievements</h2>
                    {achievements.map((achievement, index) => (
                        <div key={index}>
                            <strong>{achievement.title}</strong>
                            <p>{achievement.description}</p>
                            {achievement.date && <em>{achievement.date}</em>}
                        </div>
                    ))}
                </Section>
            )}
        </ResumeContainer>
    );
};

export default ClassicProfessionalResume;