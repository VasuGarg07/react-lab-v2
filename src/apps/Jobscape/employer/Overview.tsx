import { Box, Button, Card, CardProps, Chip, IconButton, Sheet, Stack, Table, Typography } from '@mui/joy';
import { Briefcase, Clock, Eye, MoreVertical, MoveRight, Users } from 'lucide-react';
import React, { useCallback } from 'react';
import { useApiClient } from '../../../shared/useApiClient';
import { EmployerResponse, JobResponse } from '../helpers/job.types';
import { useJobscape } from '../JobscapeProvider';
import { formatString } from '../../../shared/utilities';

const Overview: React.FC = () => {

    const { profile, employerService } = useJobscape();

    const employer = profile as EmployerResponse;

    const fetchDashboard = useCallback(() => {
        return employerService!.fetchEmployerDashboard();
    }, [employerService]);


    const { data, loading, error } = useApiClient(fetchDashboard, [], true);

    if (!data) {
        console.log(loading, error);
        return;
    }

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
                    count={data.jobSummary.totalJobs}
                    caption='Total Jobs'
                    color="primary"
                />
                <StatCard
                    count={data.jobSummary.activeJobs}
                    caption='Active Jobs'
                    color="warning"
                />
                <StatCard
                    count={data.jobSummary.archivedJobs}
                    caption='Archive Jobs'
                    color="neutral"
                />
            </Stack>

            <Stack justifyContent='space-between' direction='row' sx={{ mb: 2 }}>
                <Typography level='body-sm'>Recently Posted Jobs</Typography>
                <Button
                    size='sm'
                    color='neutral'
                    variant='plain'
                    endDecorator={<MoveRight size={16} />}
                    sx={{ color: "neutral.500" }}
                >
                    View All
                </Button>
            </Stack>

            <JobsOverview jobs={data.recentJobs} />
        </>
    )
}

export default Overview;


interface StatCardProps {
    color: CardProps['color'],
    count: number,
    caption: string;
    icon?: JSX.Element;
}

const StatCard: React.FC<StatCardProps> = ({ color, count, caption, icon }) => (
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
)

const JobsOverview: React.FC<{ jobs: JobResponse[] }> = ({ jobs }) => {


    const getStatusChip = (job: JobResponse) => {
        const isExpired = job.applicationDeadline ?
            job.applicationDeadline < Math.floor(Date.now() / 1000) :
            false;

        return (
            <Chip
                variant="soft"
                color={isExpired ? 'danger' : 'success'}
                startDecorator={isExpired ? <Clock size={16} /> : null
                }
                size="sm"
            >
                {isExpired ? 'Expired' : 'Active'}
            </Chip>
        );
    };

    return (
        <Sheet variant="outlined" sx={{ borderRadius: 'sm' }}>
            <Table
                stickyHeader
                hoverRow
                sx={{
                    '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                    '--Table-headerUnderlineThickness': '1px',
                    '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                }}
            >
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}> JOBS </th>
                        <th style={{ width: '20%', textAlign: 'center' }}> STATUS </th>
                        <th style={{ width: '20%', textAlign: 'center' }}> EXP. REQUIRED </th>
                        <th style={{ width: '20%', textAlign: 'center' }}> ACTIONS </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        jobs.map((job) => (
                            <tr key={job.id} >
                                <td>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Typography level="title-sm" > {job.title} </Typography>
                                        < Typography level="body-xs" sx={{ display: 'flex', gap: 1 }}>
                                            {formatString(job.jobLevel)} • {' '}
                                            {formatString(job.employmentType)}
                                        </Typography>
                                    </Box>
                                </td>
                                <td> {getStatusChip(job)} </td>
                                <td>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Users size={16} />
                                        < Typography level="body-sm" >
                                            {job.experienceRequired} Years
                                        </Typography>
                                    </Box>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            size="sm"
                                            variant="plain"
                                            color="primary"
                                            startDecorator={< Eye size={16} />}
                                        >
                                            View Applications
                                        </Button>
                                        < IconButton
                                            size="sm"
                                            variant="plain"
                                            color="neutral"
                                        >
                                            <MoreVertical size={16} />
                                        </IconButton>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Sheet>
    );
};