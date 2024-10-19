import { Box, List, ListItem, styled, Typography } from '@mui/joy';
import { Award, Briefcase, FolderGit2, Github, GraduationCap, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { useResumeContext } from '../context/ResumeContext';

interface ClassicResumeProps {
    accentColor?: string;
}

const Page = styled('div')(({ theme }) => ({
    width: '210mm',
    minHeight: '297mm',
    padding: theme.spacing(4),
    margin: `${theme.spacing(2)} auto`,
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: '"Arial", sans-serif',
    fontSize: '11pt',
    lineHeight: 1.5,
}));

const Header = styled('header')(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const Name = styled(Typography)<{ accentColor: string }>(({ accentColor }) => ({
    fontSize: '24pt',
    fontWeight: 'bold',
    color: accentColor,
    marginBottom: '4px',
}));

const ContactInfo = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    fontSize: '10pt',
}));

const ContactItem = styled('a')({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#555555',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const Section = styled('section')(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)<{ accentColor: string }>(({ accentColor }) => ({
    fontSize: '14pt',
    fontWeight: 'bold',
    color: accentColor,
    borderBottom: `2px solid ${accentColor}`,
    paddingBottom: '4px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
}));

const Content = styled(Typography)({
    fontSize: '11pt',
    color: '#333333',
});

const JobTitle = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '12pt',
    marginBottom: '2px',
});

const JobDetails = styled(Typography)({
    fontStyle: 'italic',
    fontSize: '10pt',
    marginBottom: '4px',
});

const StyledList = styled(List)({
    paddingLeft: '20px',
    margin: '8px 0',
    listStyleType: 'disc', // This adds bullet points
});

const StyledListItem = styled(ListItem)({
    padding: '0 0 4px 0',
    fontSize: '11pt',
    display: 'list-item',
});

const IconWrapper = styled('span')<{ accentColor: string }>(({ accentColor }) => ({
    display: 'inline-flex',
    width: '16px',
    height: '16px',
    color: accentColor,
}));

const ClassicResume: React.FC<ClassicResumeProps> = ({ accentColor = '#1976d2' }) => {
    const { state } = useResumeContext();
    const resume = state.resume;

    return (
        <Page>
            <Header>
                <Name accentColor={accentColor}>{resume.contactInfo.name}</Name>
                <Typography level="h4" sx={{ color: "#27272A", mb: 1 }}>{resume.contactInfo.title}</Typography>
                <ContactInfo>
                    <ContactItem href={`mailto:${resume.contactInfo.email}`}>
                        <IconWrapper accentColor={accentColor}><Mail size={16} /></IconWrapper>
                        {resume.contactInfo.email}
                    </ContactItem>
                    <ContactItem href={`tel:${resume.contactInfo.phone}`}>
                        <IconWrapper accentColor={accentColor}><Phone size={16} /></IconWrapper>
                        {resume.contactInfo.phone}
                    </ContactItem>
                    <ContactItem href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resume.contactInfo.location)}`} target="_blank" rel="noopener noreferrer">
                        <IconWrapper accentColor={accentColor}><MapPin size={16} /></IconWrapper>
                        {resume.contactInfo.location}
                    </ContactItem>
                    {resume.contactInfo.linkedIn && (<ContactItem href={resume.contactInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                        <IconWrapper accentColor={accentColor}><Linkedin size={16} /></IconWrapper>
                        {resume.contactInfo.linkedIn.split('/').pop()}
                    </ContactItem>)}
                    {resume.contactInfo.github && (<ContactItem href={resume.contactInfo.github} target="_blank" rel="noopener noreferrer">
                        <IconWrapper accentColor={accentColor}><Github size={16} /></IconWrapper>
                        {resume.contactInfo.github.split('/').pop()}
                    </ContactItem>)}
                </ContactInfo>
            </Header>

            <Section>
                <SectionTitle accentColor={accentColor}>
                    <IconWrapper accentColor={accentColor}><Briefcase size={16} /></IconWrapper>
                    Professional Summary
                </SectionTitle>
                <Content>{resume.profile}</Content>
            </Section>

            <Section>
                <SectionTitle accentColor={accentColor}>
                    <IconWrapper accentColor={accentColor}><FolderGit2 size={16} /></IconWrapper>
                    Technical Skills
                </SectionTitle>
                {resume.technicalSkills.map((skillCategory, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                        <Content sx={{ fontWeight: 'bold', display: 'inline' }}>
                            {skillCategory.category}:
                        </Content>
                        <Content sx={{ display: 'inline' }}> {skillCategory.skills.join(', ')}</Content>
                    </Box>
                ))}
            </Section>

            <Section>
                <SectionTitle accentColor={accentColor}>
                    <IconWrapper accentColor={accentColor}><Briefcase size={16} /></IconWrapper>
                    Professional Experience
                </SectionTitle>
                {resume.workExperience.map((job, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <JobTitle>{job.title} - {job.company}</JobTitle>
                        <JobDetails>
                            {job.location} | {job.startDate} - {job.endDate}
                        </JobDetails>
                        <StyledList>
                            {job.highlights.map((highlight, hIndex) => (
                                <StyledListItem key={hIndex}>
                                    <Content>{highlight}</Content>
                                </StyledListItem>
                            ))}
                        </StyledList>
                    </Box>
                ))}
            </Section>

            <Section>
                <SectionTitle accentColor={accentColor}>
                    <IconWrapper accentColor={accentColor}><GraduationCap size={16} /></IconWrapper>
                    Education
                </SectionTitle>
                {resume.education.map((edu, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                        <Content sx={{ fontWeight: 'bold' }}>
                            {edu.degree} in {edu.fieldOfStudy}
                        </Content>
                        <Content>
                            {edu.institution}, Graduated: {edu.graduationYear}
                        </Content>
                    </Box>
                ))}
            </Section>

            {resume.projects && resume.projects.length > 0 && (
                <Section>
                    <SectionTitle accentColor={accentColor}>
                        <IconWrapper accentColor={accentColor}><FolderGit2 size={16} /></IconWrapper>
                        Notable Projects
                    </SectionTitle>
                    {resume.projects.map((project, index) => (
                        <Box key={index} sx={{ marginBottom: 1 }}>
                            <Content sx={{ fontWeight: 'bold' }}>{project.name}</Content>
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
                </Section>
            )}

            {resume.achievements && resume.achievements.length > 0 && (
                <Section>
                    <SectionTitle accentColor={accentColor}>
                        <IconWrapper accentColor={accentColor}><Award size={16} /></IconWrapper>
                        Achievements
                    </SectionTitle>
                    {resume.achievements.map((achievement, index) => (
                        <Box key={index} sx={{ marginBottom: 1 }}>
                            <Content sx={{ fontWeight: 'bold' }}>{achievement.title}</Content>
                            <Content>{achievement.description}</Content>
                            <Content sx={{ fontStyle: 'italic' }}>Date: {achievement.date}</Content>
                        </Box>
                    ))}
                </Section>
            )}
        </Page>
    );
};

export default ClassicResume;