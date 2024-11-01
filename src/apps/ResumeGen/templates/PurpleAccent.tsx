import { Box, styled, Typography } from '@mui/joy';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { TemplateProps } from '../helpers/interfaces';

const PURPLE_ACCENT = '#8E44AD';
const TEXT_COLOR = '#333333';
const BACKGROUND_COLOR = '#FFFFFF';

const Page = styled('div')({
    backgroundColor: BACKGROUND_COLOR,
    fontFamily: '"Arial", sans-serif',
    fontSize: '10pt',
    lineHeight: 1.6,
    padding: '40px',
});

const Header = styled('header')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
});

const NameAndTitle = styled('div')({
    flex: 1,
});

const Name = styled(Typography)({
    fontSize: '28pt',
    fontWeight: 'bold',
    color: TEXT_COLOR,
    lineHeight: 1.2,
});

const Title = styled(Typography)({
    fontSize: '16pt',
    color: PURPLE_ACCENT,
    marginTop: '5px',
});

const ContactInfo = styled('div')({
    textAlign: 'right',
    fontSize: '9pt',
    color: TEXT_COLOR,
});

const ContactItem = styled('a')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '5px',
    marginBottom: '5px',
    color: TEXT_COLOR,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
});

const SectionTitle = styled(Typography)({
    fontSize: '14pt',
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginBottom: '15px',
    marginTop: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

const CircleIcon = styled('span')({
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    backgroundColor: PURPLE_ACCENT,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: BACKGROUND_COLOR,
    fontSize: '14pt',
    fontWeight: 'bold',
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

const DateRange = styled(Typography)({
    fontStyle: 'italic',
    fontSize: '10pt',
    color: TEXT_COLOR,
    marginBottom: '5px',
});

const List = styled('ul')({
    margin: '0 0 15px 0',
    paddingLeft: '20px',
});

const ListItem = styled('li')({
    marginBottom: '5px',
});

const PurpleAccentResume: React.FC<TemplateProps> = ({ resume }) => {

    const [firstName, ...lastNameParts] = resume.contactInfo.name.split(' ');
    const lastName = lastNameParts.join(' ');

    return (
        <Page>
            <Header>
                <NameAndTitle>
                    <Name>
                        {firstName.toUpperCase()}
                        <br />
                        {lastName.toUpperCase()}
                    </Name>
                    <Title>{resume.contactInfo.title}</Title>
                </NameAndTitle>
                <ContactInfo>
                    <ContactItem href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resume.contactInfo.location)}`} target="_blank" rel="noopener noreferrer">
                        <Typography>{resume.contactInfo.location}</Typography>
                        <MapPin size={14} />
                    </ContactItem>
                    <ContactItem href={`tel:${resume.contactInfo.phone}`}>
                        <Typography>{resume.contactInfo.phone}</Typography>
                        <Phone size={14} />
                    </ContactItem>
                    <ContactItem href={`mailto:${resume.contactInfo.email}`}>
                        <Typography>{resume.contactInfo.email}</Typography>
                        <Mail size={14} />
                    </ContactItem>
                    {resume.contactInfo.linkedIn && (<ContactItem href={resume.contactInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                        <Typography>{resume.contactInfo.linkedIn.split('/').pop()}</Typography>
                        <Linkedin size={14} />
                    </ContactItem>)}
                    {resume.contactInfo.github && (<ContactItem href={resume.contactInfo.github} target="_blank" rel="noopener noreferrer">
                        <Typography>{resume.contactInfo.github.split('/').pop()}</Typography>
                        <Github size={14} />
                    </ContactItem>)}
                </ContactInfo>
            </Header>

            <Box>
                <SectionTitle>
                    <CircleIcon>P</CircleIcon>
                    PROFESSIONAL SUMMARY
                </SectionTitle>
                <Content>{resume.profile}</Content>
            </Box>

            <Box>
                <SectionTitle>
                    <CircleIcon>E</CircleIcon>
                    EXPERIENCE
                </SectionTitle>
                {resume.workExperience.map((job, index) => (
                    <Box key={index} sx={{ marginBottom: 3 }}>
                        <JobTitle>{job.title} | {job.company}</JobTitle>
                        <DateRange>{job.startDate} - {job.endDate} | {job.location}</DateRange>
                        <List>
                            {job.highlights.map((highlight, hIndex) => (
                                <ListItem key={hIndex}>
                                    <Content>{highlight}</Content>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))}
            </Box>

            <Box>
                <SectionTitle>
                    <CircleIcon>E</CircleIcon>
                    EDUCATION
                </SectionTitle>
                {resume.education.map((edu, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <JobTitle>{edu.degree} in {edu.fieldOfStudy}</JobTitle>
                        <Content>{edu.institution} | Graduated: {edu.graduationYear}</Content>
                    </Box>
                ))}
            </Box>

            <Box>
                <SectionTitle>
                    <CircleIcon>S</CircleIcon>
                    SKILLS
                </SectionTitle>
                {resume.technicalSkills.map((category, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <Content><strong>{category.category}:</strong> {category.skills.join(', ')}</Content>
                    </Box>
                ))}
            </Box>

            {resume.projects && resume.projects.length > 0 && (
                <Box>
                    <SectionTitle>
                        <CircleIcon>P</CircleIcon>
                        PROJECTS
                    </SectionTitle>
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
                </Box>
            )}

            {resume.achievements && resume.achievements.length > 0 && (
                <Box>
                    <SectionTitle>
                        <CircleIcon>A</CircleIcon>
                        ACHIEVEMENTS
                    </SectionTitle>
                    {resume.achievements.map((achievement, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <JobTitle>{achievement.title}</JobTitle>
                            <Content>{achievement.description}</Content>
                            <DateRange>{achievement.date}</DateRange>
                        </Box>
                    ))}
                </Box>
            )}
        </Page>
    );
};

export default PurpleAccentResume;