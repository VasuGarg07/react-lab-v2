import { Box, Grid, styled, Typography } from '@mui/joy';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { TemplateProps } from '../helpers/interfaces';

const Page = styled('div')({
    padding: '40px',
    backgroundColor: '#ffffff',
    fontSize: '10pt',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    lineHeight: 1.5,
});

const Header = styled(Box)({
    marginBottom: '20px',
});

const Name = styled(Typography)({
    fontSize: '28pt',
    fontWeight: 'bold',
    marginBottom: '4px',
});

const Title = styled(Typography)({
    fontSize: '14pt',
    color: '#666',
    marginBottom: '10px',
});

const ContactInfo = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    fontSize: '9pt',
});

const ContactItem = styled('a')({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '4px',
    color: '#000',
    textDecoration: 'none',
    "&:hover": {
        textDecoration: 'underline'
    }
});

const SectionTitle = styled(Typography)({
    fontSize: '14pt',
    fontWeight: 'bold',
    borderBottom: '1px solid #000',
    paddingBottom: '5px',
    marginBottom: '10px',
    textTransform: 'uppercase',
});

const Content = styled(Typography)({
    fontSize: '10pt',
    marginBottom: '5px',
});

const BulletList = styled('ul')({
    margin: '0 0 10px 20px',
    padding: 0,
});

const BulletItem = styled('li')({
    fontSize: '10pt',
    marginBottom: '3px',
});

const JobTitle = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '11pt',
    marginBottom: '2px',
});

const JobDetails = styled(Typography)({
    fontSize: '10pt',
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'space-between',
});


const RefinedSleekResume: React.FC<TemplateProps> = ({ resume }) => {

    return (
        <Page>
            <Header>
                <Name>{resume.contactInfo.name}</Name>
                <Title>{resume.contactInfo.title}</Title>
                <ContactInfo>
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
                </ContactInfo>
            </Header>

            <Grid container spacing={2}>
                <Grid xs={8}>
                    <Box mb={3}>
                        <SectionTitle>Professional Summary</SectionTitle>
                        <Content>{resume.profile}</Content>
                    </Box>

                    <Box mb={3}>
                        <SectionTitle>Professional Experience</SectionTitle>
                        {resume.workExperience.map((job, index) => (
                            <Box key={index} mb={2}>
                                <JobTitle>{job.title}</JobTitle>
                                <JobDetails>
                                    <span>{job.company}, {job.location}</span>
                                    <span>{job.startDate} - {job.endDate}</span>
                                </JobDetails>
                                <BulletList>
                                    {job.highlights.map((highlight, hIndex) => (
                                        <BulletItem key={hIndex}>{highlight}</BulletItem>
                                    ))}
                                </BulletList>
                            </Box>
                        ))}
                    </Box>

                    {resume.projects && resume.projects.length > 0 && (
                        <Box mb={3}>
                            <SectionTitle>Projects</SectionTitle>
                            {resume.projects.map((project, index) => (
                                <Box key={index} mb={2}>
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
                </Grid>

                <Grid xs={4}>
                    <Box mb={3}>
                        <SectionTitle>Education</SectionTitle>
                        {resume.education.map((edu, index) => (
                            <Box key={index} mb={2}>
                                <Content sx={{ fontWeight: 'bold' }}>{edu.degree} in {edu.fieldOfStudy}</Content>
                                <Content>{edu.institution}</Content>
                                <Content>{edu.graduationYear}</Content>
                            </Box>
                        ))}
                    </Box>

                    <Box mb={3}>
                        <SectionTitle>Technical Skills</SectionTitle>
                        {resume.technicalSkills.map((category, index) => (
                            <Box key={index} mb={2}>
                                <Content sx={{ fontWeight: 'bold' }}>{category.category}</Content>
                                <Content>{category.skills.join(', ')}</Content>
                            </Box>
                        ))}
                    </Box>

                    {resume.achievements && resume.achievements.length > 0 && (
                        <Box mb={3}>
                            <SectionTitle>Achievements</SectionTitle>
                            <BulletList>
                                {resume.achievements.map((achievement, index) => (
                                    <BulletItem key={index}>
                                        <Content>
                                            <strong>{achievement.title}</strong> - {achievement.description} ({achievement.date})
                                        </Content>
                                    </BulletItem>
                                ))}
                            </BulletList>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Page>
    );
};

export default RefinedSleekResume;
