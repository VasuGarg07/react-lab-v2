import React from 'react';
import { Box, List, ListItem, styled, Typography, Grid } from '@mui/joy';
import { useResumeContext } from '../context/ResumeContext';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

interface TwoColumnResumeProps {
    primaryColor?: string;
    secondaryColor?: string;
}

const Page = styled('div')({
    width: '210mm',
    minHeight: '297mm',
    padding: '20px',
    margin: '20px auto',
    backgroundColor: '#ffffff',
    fontFamily: '"Arial", sans-serif',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontSize: '10pt',
    lineHeight: 1.2,
});

const Header = styled('header')({
    marginBottom: '10px',
    textAlign: 'center',
});

const Name = styled(Typography)({
    fontSize: '28pt',
    fontWeight: 'bold',
    marginBottom: '4px',
});

const Title = styled(Typography)({
    fontSize: '14pt',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '2px',
});


const ContactItem = styled('a')({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '4px',
    color: '#000',
    textDecoration: 'none',
    "&:hover": {
        textDecoration: 'underline'
    }
});


const SectionTitle = styled(Typography)({
    fontSize: '12pt',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '8px',
    borderBottom: '1px solid #000000',
    paddingBottom: '2px',
});

const Content = styled(Typography)({
    fontSize: '10pt',
});

const StyledList = styled(List)({
    paddingLeft: '20px',
    margin: '4px 0',
    listStyleType: 'disc',
});

const StyledListItem = styled(ListItem)({
    padding: '0 0 2px 0',
    fontSize: '10pt',
    display: 'list-item',
});

const JobTitle = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '11pt',
    textTransform: 'uppercase',
});

const JobDetails = styled(Typography)({
    fontSize: '10pt',
    fontStyle: 'italic',
});

const TwoColumnResume: React.FC<TwoColumnResumeProps> = () => {
    const { state } = useResumeContext();
    const resume = state.resume;

    return (
        <Page>
            <Header>
                <Name>{resume.contactInfo.name}</Name>
                <Title>{resume.contactInfo.title}</Title>
            </Header>

            <Grid container spacing={2}>
                <Grid xs={4}>
                    <Box sx={{ mb: 3 }}>
                        <SectionTitle>Contact</SectionTitle>
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
                        {resume.contactInfo.linkedIn && (
                            <ContactItem href={resume.contactInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                                <Linkedin size={16} />
                                {resume.contactInfo.linkedIn.split('/').pop()}
                            </ContactItem>
                        )}
                        {resume.contactInfo.github && (
                            <ContactItem href={resume.contactInfo.github} target="_blank" rel="noopener noreferrer">
                                <Github size={16} />
                                {resume.contactInfo.github.split('/').pop()}
                            </ContactItem>
                        )}
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <SectionTitle>Professional Summary</SectionTitle>
                        <Content>{resume.profile}</Content>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <SectionTitle>Education</SectionTitle>
                        {resume.education.map((edu, index) => (
                            <Box key={index} sx={{ mb: 1 }}>
                                <Content sx={{ fontWeight: 'bold' }}>{edu.degree} in {edu.fieldOfStudy}</Content>
                                <Content>{edu.institution}</Content>
                                <Content>{edu.graduationYear}</Content>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <SectionTitle>Technical Skills</SectionTitle>
                        {resume.technicalSkills.map((skillCategory, index) => (
                            <Box key={index} sx={{ mb: 1 }}>
                                <Content sx={{ fontWeight: 'bold' }}>{skillCategory.category}:</Content>
                                <Content>{skillCategory.skills.join(', ')}</Content>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                <Grid xs={8}>
                    <Box sx={{ mb: 3 }}>
                        <SectionTitle>Professional Experience</SectionTitle>
                        {resume.workExperience.map((job, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <JobTitle>{job.title}</JobTitle>
                                <JobDetails>{job.company}, {job.location} | {job.startDate} - {job.endDate}</JobDetails>
                                <StyledList>
                                    {job.highlights.map((highlight, hIndex) => (
                                        <StyledListItem key={hIndex}>
                                            <Content>{highlight}</Content>
                                        </StyledListItem>
                                    ))}
                                </StyledList>
                            </Box>
                        ))}
                    </Box>

                    {resume.projects && resume.projects.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                            <SectionTitle>Projects</SectionTitle>
                            {resume.projects.map((project, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <Content sx={{ fontWeight: 'bold' }}>{project.name}</Content>
                                    <Content>{project.description}</Content>
                                    <Content>Technologies: {project.technologies.join(', ')}</Content>
                                    {project.link && (
                                        <Content>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">Project Link</a>
                                        </Content>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    )}

                    {resume.achievements && resume.achievements.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                            <SectionTitle>Achievements</SectionTitle>
                            <StyledList>
                                {resume.achievements.map((achievement, index) => (
                                    <StyledListItem key={index}>
                                        <Content>
                                            <strong>{achievement.title}</strong> - {achievement.description} ({achievement.date})
                                        </Content>
                                    </StyledListItem>
                                ))}
                            </StyledList>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Page>
    );
};

export default TwoColumnResume;