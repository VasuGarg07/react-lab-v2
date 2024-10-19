import React from 'react';
import { Box, Typography, Divider, List, ListItem, styled } from '@mui/joy';
import { useResumeContext } from '../context/ResumeContext';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

interface ProfessionalResumeProps {
    primaryColor?: string;
    secondaryColor?: string;
}

const Page = styled('div')(({ theme }) => ({
    width: '210mm',
    minHeight: '297mm',
    padding: theme.spacing(4),
    margin: `${theme.spacing(2)} auto`,
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: '"Calibri", "Arial", sans-serif',
    fontSize: '11pt',
    lineHeight: 1.2,
}));

const Header = styled('header')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    textAlign: 'center',
}));

const Name = styled(Typography)<{ primaryColor: string }>(({ primaryColor }) => ({
    fontSize: '24pt',
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: '4px',
}));

const ContactInfo = styled(Typography)({
    fontSize: '10pt',
    color: '#333333',
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
    textDecoration: 'none',
    "&:hover": {
        textDecoration: 'underline'
    }
});


const Section = styled('section')(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)<{ primaryColor: string }>(({ primaryColor }) => ({
    fontSize: '14pt',
    fontWeight: 'bold',
    color: primaryColor,
    textTransform: 'uppercase',
    marginBottom: '8px',
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

const StyledDivider = styled(Divider)<{ secondaryColor: string }>(({ secondaryColor }) => ({
    borderColor: secondaryColor,
    margin: '12px 0',
}));

const ProfessionalResume: React.FC<ProfessionalResumeProps> = ({
    primaryColor = '#000080',
    secondaryColor = '#4682B4'
}) => {
    const { state } = useResumeContext();
    const resume = state.resume;

    return (
        <Page>
            <Header>
                <Name primaryColor={primaryColor}>{resume.contactInfo.name}</Name>
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
            <StyledDivider secondaryColor={secondaryColor} />

            <Section>
                <Content>{resume.profile}</Content>
            </Section>

            <StyledDivider secondaryColor={secondaryColor} />

            <Section>
                <SectionTitle primaryColor={primaryColor}>Professional Experience</SectionTitle>
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

            <StyledDivider secondaryColor={secondaryColor} />

            <Section>
                <SectionTitle primaryColor={primaryColor}>Education</SectionTitle>
                {resume.education.map((edu, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                        <Content>
                            {edu.degree} in {edu.fieldOfStudy}, {edu.graduationYear}
                        </Content>
                    </Box>
                ))}
            </Section>

            <StyledDivider secondaryColor={secondaryColor} />

            <Section>
                <SectionTitle primaryColor={primaryColor}>Additional Skills</SectionTitle>
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
                    <StyledDivider secondaryColor={secondaryColor} />
                    <Section>
                        <SectionTitle primaryColor={primaryColor}>Projects</SectionTitle>
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
                    <StyledDivider secondaryColor={secondaryColor} />
                    <Section>
                        <SectionTitle primaryColor={primaryColor}>Achievements</SectionTitle>
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