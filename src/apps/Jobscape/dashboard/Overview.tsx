import { Box, Button, Card, CardProps, Stack, Typography } from '@mui/joy';
import { Briefcase, MoveRight } from 'lucide-react';
import React, { useCallback } from 'react';
import { NavLink } from 'react-router';
import { useApiClient } from '../../../shared/useApiClient';
import { EmployerResponse } from '../helpers/job.types';
import { useJobscape } from '../JobscapeProvider';
import JobsOverview from './JobsOverview';

const Overview: React.FC = () => {

    const { profile, employerService, role } = useJobscape();
    const employer = profile as EmployerResponse;

    const fetchDashboard = useCallback(() => {
        return employerService!.fetchEmployerDashboard();
    }, [employerService]);


    const { data, loading, error } = useApiClient(fetchDashboard, [], true);

    // Handle loading and error states
    if (loading) return <Typography>Loading job details...</Typography>;
    if (error) return <Typography color="danger">Failed to load job details.</Typography>;

    return (
        <>
            <Typography level='title-md'>
                Hello, {employer.companyName}
            </Typography>
            <Typography level='body-sm' textColor='neutral.500' gutterBottom>
                Here are your analytics and recent postings.
            </Typography>

            <Stack spacing={2} direction='row' sx={{ my: 3 }}>
                <StatCard
                    count={data?.jobSummary.totalJobs}
                    caption='Total Jobs'
                    color="primary"
                />
                <StatCard
                    count={data?.jobSummary.activeJobs}
                    caption='Active Jobs'
                    color="warning"
                />
                <StatCard
                    count={data?.jobSummary.archivedJobs}
                    caption='Archive Jobs'
                    color="neutral"
                />
            </Stack>

            <Stack justifyContent='space-between' direction='row' sx={{ mb: 2 }}>
                <Typography level='body-sm'>Recently Posted Jobs</Typography>
                <Button
                    component={NavLink}
                    size='sm'
                    color='neutral'
                    variant='plain'
                    endDecorator={<MoveRight size={16} />}
                    sx={{ color: "neutral.500" }}
                    to="/jobscape/employer/jobs"
                >
                    View All
                </Button>
            </Stack>

            <JobsOverview jobs={data?.recentJobs || []} role={role} />
        </>
    )
}

export default Overview;


interface StatCardProps {
    color: CardProps['color'],
    count?: number,
    caption: string;
    icon?: JSX.Element;
}

const StatCard: React.FC<StatCardProps> = ({ color, count = 0, caption, icon }) => (
    <Card variant='soft' color={color} sx={{
        p: 2,
        display: 'flex',
        alignItems: "flex-start",
        flexDirection: 'row',
        border: '2px solid',
        borderColor: `${color}.solidBg`
    }}>
        <Box>
            <Typography level='h2'>{count}</Typography>
            <Typography level='body-md'>{caption}</Typography>
        </Box>
        <Box
            sx={{
                width: 40,
                height: 40,
                borderRadius: 'md',
                bgcolor: 'background.surface',
                color: `${color}.solidBg`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease-in-out'
            }}
        >
            {icon || <Briefcase size={24} />}
        </Box>
    </Card>
);