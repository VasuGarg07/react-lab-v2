import { Box, Divider, List, ListItem, styled, Typography } from '@mui/joy';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { TemplateProps } from '@/apps/ResumeGen/helpers/interfaces';

const PRIMARY_COLOR = '#2F3E46';
const SECONDARY_COLOR = '#4682B4';

const Page = styled('div')(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: '#ffffff',
    fontFamily: '"Calibri", "Arial", sans-serif',
    fontSize: '11pt',
    lineHeight: 1.2,
}));

const Header = styled('header')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    textAlign: 'center',
}));

const Name = styled(Typography)({
    fontSize: '24pt',
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: '4px',
});

const ContactInfo = styled(Typography)({
    fontSize: '10pt',
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap"
});

const ContactItem = styled('a')({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '4px',
    color: '#383B53',
    textDecoration: 'none',
    "&:hover": {
        textDecoration: 'underline'
    }
});


const Section = styled('section')(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)({
    fontSize: '14pt',
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textTransform: 'uppercase',
    marginBottom: '8px',
});

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
    fontSize: '11pt',
    fontStyle: 'italic',
    marginBottom: '4px',
});

const BulletList = styled(List)({
    paddingLeft: '20px',
    margin: '4px 0',
});

const BulletItem = styled(ListItem)({
    fontSize: '11pt',
    padding: '0 0 2px 0',
    display: 'list-item',
});

const StyledDivider = styled(Divider)({
    borderColor: SECONDARY_COLOR,
    margin: '12px 0',
});

const ProfessionalResume: React.FC<TemplateProps> = ({ resume }) => {

    return (
        <Page>
            <Header>
                <Name>{resume.contactInfo.name}</Name>
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
                    {resume.contactInfo.linkedIn && (<ContactItem href={resume.contactInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                        <Linkedin size={16} />
                        {resume.contactInfo.linkedIn.split('/').pop()}
                    </ContactItem>)}
                    {resume.contactInfo.github && (<ContactItem href={resume.contactInfo.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                        {resume.contactInfo.github.split('/').pop()}
                    </ContactItem>)}
                </ContactInfo>
            </Header>
            <StyledDivider />

            <Section>
                <Content>{resume.profile}</Content>
            </Section>

            <StyledDivider />

            <Section>
                <SectionTitle>Professional Experience</SectionTitle>
                {resume.workExperience.map((job, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <JobTitle>{job.title}</JobTitle>
                        <JobDetails>
                            {job.company}, {job.location} | {job.startDate} - {job.endDate}
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
            </Section>

            <StyledDivider />

            <Section>
                <SectionTitle>Education</SectionTitle>
                {resume.education.map((edu, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                        <Content>
                            {edu.degree} in {edu.fieldOfStudy}, {edu.graduationYear}
                        </Content>
                    </Box>
                ))}
            </Section>

            <StyledDivider />

            <Section>
                <SectionTitle>Additional Skills</SectionTitle>
                <BulletList>
                    {resume.technicalSkills.map((skillCategory, index) => (
                        <BulletItem key={index}>
                            <Content>
                                <strong>{skillCategory.category}:</strong> {skillCategory.skills.join(', ')}
                            </Content>
                        </BulletItem>
                    ))}
                </BulletList>
            </Section>

            {resume.projects && resume.projects.length > 0 && (
                <>
                    <StyledDivider />
                    <Section>
                        <SectionTitle>Projects</SectionTitle>
                        {resume.projects.map((project, index) => (
                            <Box key={index} sx={{ marginBottom: 1 }}>
                                <Content sx={{ fontWeight: 'bold' }}>{project.name}</Content>
                                <Content>{project.description}</Content>
                                <Content>Technologies: {project.technologies.join(', ')}</Content>
                                {project.link && (
                                    <Content>
                                        Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
                                    </Content>
                                )}
                            </Box>
                        ))}
                    </Section>
                </>
            )}

            {resume.achievements && resume.achievements.length > 0 && (
                <>
                    <StyledDivider />
                    <Section>
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
                    </Section>
                </>
            )}
        </Page>
    );
};

export default ProfessionalResume;