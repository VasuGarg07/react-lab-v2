import { Box, Button, Container, Divider, Grid, IconButton, Typography } from '@mui/joy';
import { ArrowRight, Building2, Calendar, Facebook, Globe, Handshake, Instagram, Linkedin, LucideIcon, Mail, Phone, Twitter, Users, Youtube } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StyledHtmlContent from '../../../components/StyledHtmlContent';
import { useJobscape } from '../JobscapeProvider';
import CompactFooter from '../components/CompactFooter';
import JobCard from '../components/JobCard';
import JobNav from '../components/JobNav';
import { EmployerResponse, IESocialLinks } from '../helpers/job.types';
import { CompanyDetailsResponse, JobsCardInfo } from '../helpers/response.types';

const CompanyDetails: React.FC = () => {
    const { companyId } = useParams();
    const { role, applicantService } = useJobscape();
    const navigate = useNavigate();

    const [data, setData] = useState<CompanyDetailsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!companyId || !applicantService) return;

            try {
                const result = await applicantService.fetchCompanyDetails(companyId);
                if (result.success) {
                    setData(result);
                } else {
                    setError('Failed to load company details');
                }
            } catch (err) {
                setError('Failed to load company details');
                console.error('Error fetching company details:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [companyId, applicantService]);

    const handleJobClick = (jobId: string) => {
        navigate(`/jobscape/jobs/${jobId}`);
    };

    if (isLoading) return <Typography>Loading company details...</Typography>;
    if (error) return <Typography color="danger">{error}</Typography>;
    if (!data) return null;

    const { company, jobs, jobCount } = data;

    return (
        <>
            <JobNav userType={role || 'none'} />
            <Container maxWidth="lg" sx={{ my: 4, minHeight: 'calc(100dvh - 186px)' }}>
                <Box sx={{ p: 0, mb: 3 }}>
                    <CompanyHeader company={company} />

                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={4}>
                            {/* Left Column */}
                            <Grid xs={12} md={8}>
                                <CompanyDescription
                                    companyOverview={company.companyOverview}
                                    companyVision={company.companyVision}
                                />
                            </Grid>

                            {/* Right Column */}
                            <Grid xs={12} md={4}>
                                <CompanyMetadata company={company} />

                                <ContactInformation
                                    websiteUrl={company.websiteUrl}
                                    contactNumber={company.contactNumber}
                                    email={company.email}
                                />

                                {company.socialLinks && Object.keys(company.socialLinks).length > 0 && (
                                    <SocialLinks socialLinks={company.socialLinks} />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <OpenPositions
                    jobs={jobs}
                    jobCount={jobCount}
                    onJobClick={handleJobClick}
                />
            </Container>
            <CompactFooter />
        </>
    );
};

export default CompanyDetails;



//  COMPANY DETAILS COMPONENTS

interface CompanyHeaderProps {
    company: EmployerResponse;
}

export const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company }) => (
    <Box sx={{
        m: 3, p: 2,
        bgcolor: 'transparent',
        borderRadius: 'md',
        border: '2px solid',
        borderColor: 'primary.100',
    }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box
                    component="img"
                    src={company.logoURL}
                    alt={company.companyName}
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: 'md',
                        objectFit: 'cover',
                    }}
                />
                <Box>
                    <Typography level="h2">
                        {company.companyName}
                    </Typography>
                    <Typography level="title-lg" textColor="neutral.500">
                        {company.industry}
                    </Typography>
                </Box>
            </Box>

            <Button
                variant="solid"
                color="primary"
                endDecorator={<ArrowRight size={16} />}
                onClick={() => window.open(company.websiteUrl, '_blank')}
            >
                View Open Position
            </Button>
        </Box>
    </Box>
);

interface CompanyDescriptionProps {
    companyOverview?: string;
    companyVision?: string;
}

export const CompanyDescription: React.FC<CompanyDescriptionProps> = ({ companyOverview, companyVision }) => (
    <Box>
        {companyOverview &&
            (<Box>
                <Typography level="title-lg" sx={{ mb: 1.5 }}>Description</Typography>
                {companyOverview && <StyledHtmlContent htmlContent={companyOverview} />}
            </Box>
            )}

        {companyVision && (
            <Box sx={{ mt: 4 }}>
                <Typography level="title-lg" sx={{ mb: 1.5 }}>Company Vision</Typography>
                <StyledHtmlContent htmlContent={companyVision} />
            </Box>
        )}
    </Box>
);

// InfoSection.tsx
interface InfoBoxProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, value, icon }) => (
    <Box sx={{ p: 2 }}>
        {icon}
        <Typography level="body-xs" sx={{ color: 'neutral.400', textTransform: 'uppercase' }}>
            {title}
        </Typography>
        <Typography
            level="body-md"
            sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'none',
                width: '100%'
            }}
        >
            {value}
        </Typography>
    </Box>
);

interface CompanyMetadataProps {
    company: EmployerResponse;
}

export const CompanyMetadata: React.FC<CompanyMetadataProps> = ({ company }) => (
    <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
        bgcolor: 'transparent',
        borderRadius: 'md',
        border: '2px solid',
        borderColor: 'primary.100',
        mb: 2
    }}>
        <InfoBox
            title="Founded in"
            value={company.yearOfEstablishMent}
            icon={<Calendar size={32} color="var(--joy-palette-primary-500)" />}
        />
        <InfoBox
            title="Organization Type"
            value="Private Company"
            icon={<Handshake size={32} color="var(--joy-palette-primary-500)" />}
        />
        <InfoBox
            title="Team Size"
            value={company.employeeStrength}
            icon={<Users size={32} color="var(--joy-palette-primary-500)" />}
        />
        <InfoBox
            title="Industry Types"
            value={company.industry}
            icon={<Building2 size={32} color="var(--joy-palette-primary-500)" />}
        />
    </Box>
);

// ContactInformation.tsx
interface ContactInformationProps {
    websiteUrl?: string;
    contactNumber: string;
    email: string;
}

export const ContactInformation: React.FC<ContactInformationProps> = ({ websiteUrl, contactNumber, email }) => (
    <Box sx={{
        bgcolor: 'transparent',
        borderRadius: 'md',
        border: '2px solid',
        borderColor: 'primary.100',
        mb: 2,
        p: 2
    }}>
        <Typography level="title-lg" sx={{ mb: 2, fontWeight: 'bold' }}>
            Contact Information
        </Typography>

        {websiteUrl && (
            <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Globe color="var(--joy-palette-primary-500)" />
                    <Box>
                        <Typography level="body-xs" sx={{ color: 'neutral.400' }}>WEBSITE</Typography>
                        <Typography
                            component="a"
                            href={websiteUrl}
                            target="_blank"
                            sx={{
                                color: 'neutral.800',
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            {websiteUrl}
                        </Typography>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
            </>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Phone color="var(--joy-palette-primary-500)" />
            <Box>
                <Typography level="body-xs" sx={{ color: 'neutral.400' }}>PHONE</Typography>
                <Typography>{contactNumber}</Typography>
            </Box>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Mail color="var(--joy-palette-primary-500)" />
            <Box>
                <Typography level="body-xs" sx={{ color: 'neutral.400' }}>EMAIL ADDRESS</Typography>
                <Typography>{email}</Typography>
            </Box>
        </Box>
    </Box>
);

interface SocialLinksProps {
    socialLinks: Partial<IESocialLinks>;
}

const SOCIAL_ICONS: Record<keyof IESocialLinks, LucideIcon> = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin
};

const SOCIAL_COLORS: Record<keyof IESocialLinks, string> = {
    facebook: '#1877F2',
    twitter: '#1DA1F2',
    instagram: '#E4405F',
    youtube: '#FF0000',
    linkedin: '#0A66C2'
};

export const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
    const availableSocialLinks = Object.entries(socialLinks).filter(([_, url]) => url) as [keyof IESocialLinks, string][];

    if (availableSocialLinks.length === 0) return null;

    return (
        <Box
            sx={{
                bgcolor: 'transparent',
                borderRadius: 'md',
                border: '2px solid',
                borderColor: 'primary.100',
                mb: 2,
                p: 2
            }}
        >
            <Typography level="title-lg" sx={{ mb: 2, fontWeight: 'bold' }}>
                Follow us on:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
                {availableSocialLinks.map(([platform, url]) => {
                    const Icon = SOCIAL_ICONS[platform];

                    return (
                        <IconButton
                            key={platform}
                            component="a"
                            href={url}
                            target="_blank"
                            variant="soft"
                            sx={{
                                minWidth: 40,
                                minHeight: 40,
                                bgcolor: SOCIAL_COLORS[platform],
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'white',
                                    border: '1px solid',
                                    color: SOCIAL_COLORS[platform]
                                }
                            }}
                        >
                            <Icon />
                        </IconButton>
                    );
                })}
            </Box>
        </Box>
    );
};


interface OpenPositionsProps {
    jobs: JobsCardInfo[];
    jobCount: number;
    onJobClick: (id: string) => void;
}

export const OpenPositions: React.FC<OpenPositionsProps> = ({ jobs, jobCount, onJobClick }) => (
    <Box>
        <Typography level="h3" sx={{ mb: 2, mx: 2 }}>
            Open Positions ({jobCount})
        </Typography>
        <Grid container spacing={2} sx={{ mx: 2 }}>
            {jobs.map(job => (
                <Grid key={job.id} xs={12} sm={6} md={4} sx={{
                    alignItems: 'stretch'
                }}>
                    <JobCard info={job} onClick={onJobClick} />
                </Grid>
            ))}
        </Grid>
    </Box>
);