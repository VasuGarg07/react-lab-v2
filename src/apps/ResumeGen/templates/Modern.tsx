import { Box, styled, Typography } from '@mui/joy';
import { Award, Briefcase, FolderGit2, Github, GraduationCap, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { TemplateProps } from '../helpers/interfaces';


const SIDEBAR_BG = '#f0f0f0';  // Light gray background for sidebar
const MAIN_BG = '#ffffff';     // White background for main content
const TEXT_PRIMARY = '#333333';  // Dark gray for primary text
const TEXT_SECONDARY = '#666666';  // Medium gray for secondary text
const ACCENT_COLOR = '#2c78d4';  // Bright blue for accents and highlights

const Page = styled('div')({
    width: '210mm',
    minHeight: '297mm',
    margin: '16px auto',
    backgroundColor: MAIN_BG,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '10pt',
    lineHeight: 1.6,
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
});

const Sidebar = styled('div')({
    backgroundColor: SIDEBAR_BG,
    padding: '32px 24px',
    color: TEXT_PRIMARY,
});

const MainContent = styled('div')({
    padding: '32px 24px',
    backgroundColor: MAIN_BG,
});

const Name = styled(Typography)({
    fontSize: '24pt',
    fontWeight: 'bold',
    color: ACCENT_COLOR,
});

const Title = styled(Typography)({
    fontSize: '14pt',
    marginBottom: '12px',
    color: TEXT_PRIMARY,
});

const ContactItem = styled('a')({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '4px',
    color: TEXT_PRIMARY,
    textDecoration: 'none',
    "&:hover": {
        textDecoration: 'underline'
    }
});

const SectionTitle = styled(Typography)({
    fontSize: '16pt',
    fontWeight: 'bold',
    color: ACCENT_COLOR,
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

const Content = styled(Typography)({
    fontSize: '10pt',
    marginBottom: '8px',
    color: TEXT_PRIMARY,
});

const JobTitle = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '12pt',
    marginBottom: '4px',
    color: TEXT_PRIMARY,
});

const JobDetails = styled(Typography)({
    fontStyle: 'italic',
    fontSize: '10pt',
    marginBottom: '8px',
    color: TEXT_SECONDARY,
});

const SkillCategory = styled(Typography)({
    fontWeight: 'bold',
    marginBottom: '8px',
    color: ACCENT_COLOR,
});

const SkillList = styled('ul')({
    marginTop: 0,
    marginBottom: '16px',
    paddingLeft: '20px',
    color: TEXT_PRIMARY,
});

const ModernResume: React.FC<TemplateProps> = ({ resume }) => {

    return (
        <Page>
            <Sidebar>
                <Name>{resume.contactInfo.name}</Name>
                <Title>{resume.contactInfo.title}</Title>

                <Box sx={{ marginBottom: 4 }}>
                    <ContactItem href={`mailto:${resume.contactInfo.email}`}>
                        <Mail size={16} />
                        {resume.contactInfo.email}
                    </ContactItem>
                    <ContactItem href={`tel:${resume.contactInfo.phone}`}>
                        <Phone size={16} />
                        {resume.contactInfo.phone}
                    </ContactItem>
                    <ContactItem href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resume.contactInfo.location)}`} target="_blank" rel="noopener noreferrer">
                        <MapPin size={16} />
                        {resume.contactInfo.location}
                    </ContactItem>
                    {resume.contactInfo.linkedIn && (<ContactItem href={resume.contactInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                        <Linkedin size={16} />
                        {resume.contactInfo.linkedIn.split('/').pop()}
                    </ContactItem>)}
                    {resume.contactInfo.github && (<ContactItem href={resume.contactInfo.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                        {resume.contactInfo.github.split('/').pop()}
                    </ContactItem>)}
                </Box>

                <SkillCategory>Technical Skills</SkillCategory>
                {resume.technicalSkills.map((skillCategory, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <Typography sx={{ fontWeight: 'bold', color: TEXT_PRIMARY }}>{skillCategory.category}</Typography>
                        <SkillList>
                            {skillCategory.skills.map((skill, skillIndex) => (
                                <li key={skillIndex}>{skill}</li>
                            ))}
                        </SkillList>
                    </Box>
                ))}
            </Sidebar>

            <MainContent>
                <SectionTitle>
                    <Briefcase size={20} />
                    Professional Summary
                </SectionTitle>
                <Content>{resume.profile}</Content>

                <SectionTitle>
                    <Briefcase size={20} />
                    Professional Experience
                </SectionTitle>
                {resume.workExperience.map((job, index) => (
                    <Box key={index} sx={{ marginBottom: 3 }}>
                        <JobTitle>{job.title} - {job.company}</JobTitle>
                        <JobDetails>
                            {job.location} | {job.startDate} - {job.endDate}
                        </JobDetails>
                        <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                            {job.highlights.map((highlight, hIndex) => (
                                <li key={hIndex}>
                                    <Content>{highlight}</Content>
                                </li>
                            ))}
                        </ul>
                    </Box>
                ))}

                <SectionTitle>
                    <GraduationCap size={20} />
                    Education
                </SectionTitle>
                {resume.education.map((edu, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                            {edu.degree} in {edu.fieldOfStudy}
                        </Typography>
                        <Typography>{edu.institution}</Typography>
                        <Typography>Graduated: {edu.graduationYear}</Typography>
                    </Box>
                ))}

                {resume.projects && resume.projects.length > 0 && (
                    <>
                        <SectionTitle>
                            <FolderGit2 size={20} />
                            Notable Projects
                        </SectionTitle>
                        {resume.projects.map((project, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <Typography sx={{ fontWeight: 'bold' }}>{project.name}</Typography>
                                <Content>{project.description}</Content>
                                <Content>
                                    Technologies: {project.technologies.join(', ')}
                                </Content>
                                {project.link && (
                                    <Content>
                                        Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
                                    </Content>
                                )}
                            </Box>
                        ))}
                    </>
                )}

                {resume.achievements && resume.achievements.length > 0 && (
                    <>
                        <SectionTitle>
                            <Award size={20} />
                            Achievements
                        </SectionTitle>
                        {resume.achievements.map((achievement, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <Typography sx={{ fontWeight: 'bold' }}>{achievement.title}</Typography>
                                <Content>{achievement.description}</Content>
                                <Typography level='body-sm' sx={{ fontStyle: 'italic' }}>Date: {achievement.date}</Typography>
                            </Box>
                        ))}
                    </>
                )}
            </MainContent>
        </Page>
    );
};

export default ModernResume;