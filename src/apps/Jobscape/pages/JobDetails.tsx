import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { AxiosError } from 'axios';
import { ArrowRight, Bookmark, Briefcase, Calendar, Gauge, MapPin, Power, Users, Wallet } from 'lucide-react';
import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import StyledHtmlContent from '@/components/StyledHtmlContent';
import { useApiClient } from '@/shared/useApiClient';
import { formatString } from '@/shared/utilities';
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider';
import CompactFooter from '@/apps/Jobscape/components/CompactFooter';
import FeaturedChip from '@/apps/Jobscape/components/FeaturedChip';
import InfoStrip from '@/apps/Jobscape/components/InfoBox';
import JobNav from '@/apps/Jobscape/components/JobNav';
import { JobResponse } from '@/apps/Jobscape/helpers/job.types';
import { JobDetailsResponse } from '@/apps/Jobscape/helpers/response.types';
import { toastService } from '@/shared/toastr';

const JobDetails: React.FC = () => {
    const { jobId } = useParams();
    const { role, applicantService } = useJobscape();

    if (!jobId || !applicantService) return;

    const fetchJobDetails = useCallback(() => {
        return applicantService.fetchJobDetails(jobId);
    }, [jobId, applicantService]);

    const { data, loading, error } = useApiClient<JobDetailsResponse, [string]>(
        fetchJobDetails,
        [jobId],
        !!jobId
    );

    if (loading) return <Typography>Loading job details...</Typography>;
    if (error || !data) {
        toastService.error("Failed to load job information");
        return <Typography color="danger">Failed to load job details</Typography>;
    }

    const handleSaveJob = async () => {
        try {
            await applicantService!.saveJob(job.id);
            toastService.success("Job saved")
        } catch (error: any) {
            console.error(error);
            let errorMessage = "Something Went Wrong. Please try again later."
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.error;
            }
            toastService.error(errorMessage);
        }
    }

    const handleApplyJob = async () => {
        try {
            await applicantService!.applyForJob(job.id);
            toastService.success("Applied")
        } catch (error) {
            console.error(error);
            let errorMessage = "Something Went Wrong. Please try again later."
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.error;
            }
            toastService.error(errorMessage);
        }
    }

    const { job, companyName, logoURL } = data;

    return (
        <>
            <JobNav userType={role || 'none'} />
            <Container maxWidth="lg" sx={{ my: 4, minHeight: 'calc(100dvh - 186px)' }}>
                <JobHeader
                    job={job}
                    companyName={companyName}
                    logoURL={logoURL}
                    handleApply={handleApplyJob}
                    handleSave={handleSaveJob}
                />

                <Grid container spacing={4} sx={{ p: 3, mb: 3 }}>
                    {/* Left Column */}
                    <Grid xs={12} md={8}>
                        <Typography level="title-lg" sx={{ mb: 1.5 }}>Tech Stack</Typography>
                        <Typography sx={{ mb: 1.5 }}>{job.skillsRequired.join(', ')}</Typography>
                        <JobDescription
                            description={job.description}
                            requirements={job.requirements}
                            responsibilities={job.responsibilities}
                            benefits={job.benefits}
                        />
                    </Grid>

                    {/* Right Column */}
                    <Grid xs={12} md={4}>
                        <JobMetadata job={job} />
                    </Grid>
                </Grid>

            </Container>
            <CompactFooter />
        </>
    )
}

export default JobDetails;

interface JobHeaderProps {
    job: JobResponse;
    companyName: string;
    logoURL: string;
    handleSave: () => Promise<void>
    handleApply: () => Promise<void>
}

export const JobHeader: React.FC<JobHeaderProps> = ({ job, companyName, logoURL, handleSave, handleApply }) => (
    <Box sx={{
        m: 3, p: 2,
        bgcolor: 'transparent',
        borderRadius: 'md',
        border: '2px solid',
        borderColor: 'primary.100',
        display: 'flex', gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        background: job.isFeatured ? 'linear-gradient(to right, #F6BA001d 0%, rgba(246, 186, 0, 0) 100%)' : 'transparent',

    }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box
                component="img"
                src={logoURL}
                alt={companyName}
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 'md',
                    objectFit: 'cover',
                }}
            />
            <Box>
                <Typography level="h3">
                    {job.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography level="title-md" textColor="neutral.500">
                        {companyName}
                    </Typography>
                    {job.isFeatured && (<FeaturedChip />)}
                </Box>
            </Box>
        </Box>

        <Stack direction='row' alignItems='center' spacing={2}>
            <IconButton
                color='primary'
                variant='soft'
                onClick={handleSave}
            >
                <Bookmark />
            </IconButton>
            <Button
                variant="solid"
                color="primary"
                endDecorator={<ArrowRight size={16} />}
                onClick={handleApply}
            >
                Apply
            </Button>
        </Stack>
    </Box>
);

interface JDProps {
    description?: string;
    responsibilities?: string;
    requirements?: string;
    benefits?: string;
}

const JobDescription: React.FC<JDProps> = ({ description, responsibilities, benefits, requirements }) => (
    <Box>
        {description &&
            (<Box>
                <Typography level="title-lg" sx={{ mb: 1.5 }}>Description</Typography>
                <StyledHtmlContent htmlContent={description} />
            </Box>
            )}

        {responsibilities && (
            <Box sx={{ mt: 4 }}>
                <Typography level="title-lg" sx={{ mb: 1.5 }}>Responsibilities</Typography>
                <StyledHtmlContent htmlContent={responsibilities} />
            </Box>
        )}

        {requirements && (
            <Box sx={{ mt: 4 }}>
                <Typography level="title-lg" sx={{ mb: 1.5 }}>Requirements</Typography>
                <StyledHtmlContent htmlContent={requirements} />
            </Box>
        )}

        {benefits && (
            <Box sx={{ mt: 4 }}>
                <Typography level="title-lg" sx={{ mb: 1.5 }}>Benefits</Typography>
                <StyledHtmlContent htmlContent={benefits} />
            </Box>
        )}
    </Box>
);

interface OverviewProps {
    job: JobResponse
}

const JobMetadata: React.FC<OverviewProps> = ({ job }) => (
    <Box sx={{
        bgcolor: 'transparent',
        borderRadius: 'md',
        border: '2px solid',
        borderColor: 'primary.100',
        mb: 2, p: 2
    }}>
        <Typography level="title-lg" sx={{ mb: 2, fontWeight: 'bold' }}>
            Job Overview
        </Typography>

        <InfoStrip
            title="Posted On"
            value={new Date(job.createdAt).toDateString()}
            icon={Calendar}
        />
        <InfoStrip
            title="Location"
            value={job.location}
            icon={MapPin}
        />
        <InfoStrip
            title="Position"
            value={formatString(job.jobLevel)}
            icon={Gauge}
        />
        <InfoStrip
            title="Job Type"
            value={formatString(job.employmentType)}
            icon={Briefcase}
        />
        <InfoStrip
            title="Shift"
            value={formatString(job.shiftType)}
            icon={Power}
        />
        <InfoStrip
            title="Salary Range"
            value={job.salaryRange}
            icon={Wallet}
        />
        <InfoStrip
            title="Req. Experience"
            value={job.experienceRequired}
            icon={Calendar}
        />
        <InfoStrip
            title="Vacancies"
            value={job.vacancies}
            icon={Users}
            divider={false}
        />
    </Box>
)