import React from 'react';
import { Box, Divider, Typography, styled } from '@mui/joy';
import { Phone, Mail, Linkedin, Github, Briefcase, GraduationCap, MapPin, FolderGit2, Award } from 'lucide-react';
import { useResumeContext } from '../context/ResumeContext';

interface ModernResumeProps {
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
    fontSize: '10pt',
    lineHeight: 1.5,
}));

const Header = styled('header')(({ theme }) => ({
    marginBottom: theme.spacing(2),
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
    fontSize: '9pt',
}));

const ContactItem = styled('a')({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#333333',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const Section = styled('section')(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)<{ accentColor: string }>(({ accentColor }) => ({
    fontSize: '12pt',
    fontWeight: 'bold',
    color: accentColor,
    textTransform: 'uppercase',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
}));

const Content = styled(Typography)({
    fontSize: '10pt',
    color: '#333333',
});

const JobTitle = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '11pt',
    marginBottom: '2px',
});

const JobDetails = styled(Typography)({
    fontSize: '10pt',
    marginBottom: '4px',
});

const BulletList = styled('ul')({
    paddingLeft: '20px',
    margin: '4px 0',
});

const BulletItem = styled('li')({
    fontSize: '10pt',
    marginBottom: '2px',
});

const IconWrapper = styled('span')<{ accentColor: string }>(({ accentColor }) => ({
    display: 'inline-flex',
    width: '14px',
    height: '14px',
    color: accentColor,
}));

const MinimalistResume: React.FC<ModernResumeProps> = ({ accentColor = '#333333' }) => {
    const { state } = useResumeContext();
    const resume = state.resume;

    return (
        <Page>
            <Header>
                <Name accentColor={accentColor}>{resume.contactInfo.name}</Name>
                <Typography level="h4" mb={1}>{resume.contactInfo.title}</Typography>
                <ContactInfo>
                    <ContactItem href={`tel:${resume.contactInfo.phone}`}>
                        <IconWrapper accentColor={accentColor}><Phone size={14} /></IconWrapper>
                        {resume.contactInfo.phone}
                    </ContactItem>
                    <ContactItem href={`mailto:${resume.contactInfo.email}`}>
                        <IconWrapper accentColor={accentColor}><Mail size={14} /></IconWrapper>
                        {resume.contactInfo.email}
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
                <Divider sx={{ mt: 2 }} />
            </Header>

            <Section>
                <SectionTitle accentColor={accentColor}>Profile</SectionTitle>
                <Content>{resume.profile}</Content>
                <Divider sx={{ mt: 2 }} />
            </Section>

            <Section>
                <SectionTitle accentColor={accentColor}>Technical Skills</SectionTitle>
                {resume.technicalSkills.map((skillCategory, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                        <Content sx={{ fontWeight: 'bold', display: 'inline' }}>
                            {skillCategory.category}:
                        </Content>
                        <Content sx={{ display: 'inline' }}> {skillCategory.skills.join(', ')}</Content>
                    </Box>
                ))}
                <Divider sx={{ mt: 2 }} />
            </Section>

            <Section>
                <SectionTitle accentColor={accentColor}>
                    <IconWrapper accentColor={accentColor}><Briefcase size={14} /></IconWrapper>
                    Experience
                </SectionTitle>
                {resume.workExperience.map((job, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <JobTitle>{job.title}, {job.company}</JobTitle>
                        <JobDetails>
                            {job.location} | {job.startDate} - {job.endDate}
                        </JobDetails>
                        <BulletList>
                            {job.highlights.map((highlight, hIndex) => (
                                <BulletItem key={hIndex}>
                                    <Content>{highlight}</Content>
                                </BulletItem>
                            ))}
                        </BulletList>
                    </Box>
                ))}
                <Divider sx={{ mt: 2 }} />
            </Section>

            <Section>
                <SectionTitle accentColor={accentColor}>
                    <IconWrapper accentColor={accentColor}><GraduationCap size={14} /></IconWrapper>
                    Education
                </SectionTitle>
                {resume.education.map((edu, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                        <Content sx={{ fontWeight: 'bold' }}>
                            {edu.degree} in {edu.fieldOfStudy}
                        </Content>
                        <Content>
                            {edu.institution}, {edu.graduationYear}
                        </Content>
                    </Box>
                ))}
                <Divider sx={{ mt: 2 }} />
            </Section>

            {resume.projects && resume.projects.length > 0 && (
                <Section>
                    <SectionTitle accentColor={accentColor}>
                        <IconWrapper accentColor={accentColor}><FolderGit2 size={14} /></IconWrapper>
                        Projects
                    </SectionTitle>
                    {resume.projects.map((project, index) => (
                        <Box key={index} sx={{ marginBottom: 1 }}>
                            <Content sx={{ fontWeight: 'bold' }}>{project.name}</Content>
                            <Content sx={{ mb: 0.5 }}>{project.description}</Content>
                            <Content sx={{ fontStyle: "italic" }}>
                                Technologies: {project.technologies.join(', ')}
                            </Content>
                            {project.link && (
                                <Content sx={{ fontWeight: 'bold' }}>
                                    Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
                                </Content>
                            )}
                        </Box>
                    ))}
                    <Divider sx={{ mt: 2 }} />
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
                    <Divider sx={{ mt: 2 }} />
                </Section>
            )}
        </Page>
    );
};

export default MinimalistResume;