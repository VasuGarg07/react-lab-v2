import React from 'react';
import { Box, styled, Typography } from '@mui/joy';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { TemplateProps } from '../helpers/interfaces';

const MAIN_COLOR = '#30566B';
const BACKGROUND_COLOR = '#F1F5F9';
const TEXT_COLOR = '#333333';
const BORDER_COLOR = '#C5D1D9';

const Page = styled('div')({
    width: '210mm',
    minHeight: '297mm',
    margin: '16px auto',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: '"Arial", sans-serif',
    fontSize: '10pt',
    lineHeight: 1.6,
    padding: '40px',
});

const Header = styled('header')({
    marginBottom: '20px',
});

const Name = styled(Typography)({
    fontSize: '24pt',
    fontWeight: 'bold',
    color: MAIN_COLOR,
});

const Title = styled(Typography)({
    fontSize: '16pt',
    color: MAIN_COLOR,
    marginBottom: '10px',
});

const ContactItem = styled('a')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: TEXT_COLOR,
    textDecoration: 'none',
    fontSize: '10pt',
    marginBottom: '5px',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const IconWrapper = styled('span')({
    color: MAIN_COLOR,
    display: 'flex',
    alignItems: 'center',
});

const Divider = styled('hr')({
    border: 'none',
    borderTop: `1px solid ${BORDER_COLOR}`,
    margin: '10px 0',
});

const SectionTitle = styled(Typography)({
    fontSize: '14pt',
    fontWeight: 'bold',
    color: MAIN_COLOR,
    marginBottom: '10px',
    backgroundColor: BACKGROUND_COLOR,
    padding: '5px',
});

const Content = styled(Typography)({
    fontSize: '10pt',
    color: TEXT_COLOR,
    marginBottom: '5px',
});

const JobTitle = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '11pt',
    color: TEXT_COLOR,
    marginBottom: '2px',
});

const JobDetails = styled(Typography)({
    fontStyle: 'italic',
    fontSize: '10pt',
    color: TEXT_COLOR,
    marginBottom: '5px',
});

const Grid = styled('div')({
    display: 'grid',
    gridTemplateColumns: '70% 30%',
    gap: '20px',
});

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

const List = styled('ul')({
    margin: '0 0 10px 0',
    paddingLeft: '20px',
});

const ListItem = styled('li')({
    marginBottom: '5px',
});


const BluePrintResume: React.FC<TemplateProps> = ({ resume }) => {

    return (
        <Page>
            <Header>
                <Name>{resume.contactInfo.name}</Name>
                <Title>{resume.contactInfo.title}</Title>
                <Divider />
            </Header>
            <Grid>
                <Column>
                    <SectionTitle>PROFESSIONAL SUMMARY</SectionTitle>
                    <Content>{resume.profile}</Content>

                    <SectionTitle>WORK HISTORY</SectionTitle>
                    {resume.workExperience.map((job, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <JobTitle>{job.title}, {job.startDate} to {job.endDate}</JobTitle>
                            <JobDetails>{job.company} - {job.location}</JobDetails>
                            <List>
                                {job.highlights.map((highlight, hIndex) => (
                                    <ListItem key={hIndex}>
                                        <Content>{highlight}</Content>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ))}

                    {resume.projects && resume.projects.length > 0 && (
                        <>
                            <SectionTitle>PROJECTS</SectionTitle>
                            {resume.projects.map((project, index) => (
                                <Box key={index} sx={{ marginBottom: 2 }}>
                                    <JobTitle>{project.name}</JobTitle>
                                    <Content>{project.description}</Content>
                                    <Content><strong>Technologies:</strong> {project.technologies.join(', ')}</Content>
                                    {project.link && (
                                        <Content><strong>Link:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></Content>
                                    )}
                                </Box>
                            ))}
                        </>
                    )}

                    {resume.achievements && resume.achievements.length > 0 && (
                        <>
                            <SectionTitle>ACHIEVEMENTS</SectionTitle>
                            {resume.achievements.map((achievement, index) => (
                                <Box key={index} sx={{ marginBottom: 2 }}>
                                    <JobTitle>{achievement.title}</JobTitle>
                                    <Content>{achievement.description}</Content>
                                    <Content><strong>Date:</strong> {achievement.date}</Content>
                                </Box>
                            ))}
                        </>
                    )}
                </Column>
                <Column>
                    <SectionTitle>CONTACT</SectionTitle>
                    <ContactItem href={`mailto:${resume.contactInfo.email}`}>
                        <IconWrapper><Mail size={16} /></IconWrapper>
                        <Typography level="body-sm">{resume.contactInfo.email}</Typography>
                    </ContactItem>
                    <ContactItem href={`tel:${resume.contactInfo.phone}`}>
                        <IconWrapper><Phone size={16} /></IconWrapper>
                        <Typography level="body-sm">{resume.contactInfo.phone}</Typography>
                    </ContactItem>
                    <ContactItem href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resume.contactInfo.location)}`} target="_blank" rel="noopener noreferrer">
                        <IconWrapper><MapPin size={16} /></IconWrapper>
                        <Typography level="body-sm">{resume.contactInfo.location}</Typography>
                    </ContactItem>
                    {resume.contactInfo.linkedIn && (<ContactItem href={resume.contactInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                        <IconWrapper><Linkedin size={16} /></IconWrapper>
                        <Typography level="body-sm">{resume.contactInfo.linkedIn.split('/').pop()}</Typography>
                    </ContactItem>)}
                    {resume.contactInfo.github && (<ContactItem href={resume.contactInfo.github} target="_blank" rel="noopener noreferrer">
                        <IconWrapper><Github size={16} /></IconWrapper>
                        <Typography level="body-sm">{resume.contactInfo.github.split('/').pop()}</Typography>
                    </ContactItem>)}

                    <SectionTitle>SKILLS</SectionTitle>
                    {resume.technicalSkills.map((category, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <Content><strong>{category.category}</strong></Content>
                            <List>
                                {category.skills.map((skill, skillIndex) => (
                                    <ListItem key={skillIndex}>
                                        <Content>{skill}</Content>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ))}

                    <SectionTitle>EDUCATION</SectionTitle>
                    {resume.education.map((edu, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <JobTitle>{edu.degree} in {edu.fieldOfStudy}</JobTitle>
                            <Content>{edu.institution} - {edu.graduationYear}</Content>
                        </Box>
                    ))}
                </Column>
            </Grid>
        </Page>
    );
};

export default BluePrintResume;