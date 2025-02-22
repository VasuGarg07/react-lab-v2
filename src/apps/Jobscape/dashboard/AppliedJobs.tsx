import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { MapPin } from 'lucide-react';
import React, { useCallback } from 'react';
import { useApiClient } from '@/shared/useApiClient';
import { formatString } from '@/shared/utilities';
import FeaturedChip from '@/apps/Jobscape/components/FeaturedChip';
import StyledTable from '@/apps/Jobscape/components/StyledTable';
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider';
import { toastService } from '@/providers/toastr';

const AppliedJobs: React.FC = () => {
    const { applicantService } = useJobscape();

    if (!applicantService) return;

    const fetchApplications = useCallback(() => {
        return applicantService.fetchAppliedJobs();
    }, [applicantService]);

    const { data, loading, error } = useApiClient(fetchApplications, [], true);

    if (loading && !data) {
        return <Typography level="body-lg" sx={{ textAlign: 'center', my: 4 }}>
            Loading Applications...
        </Typography>;
    }

    if (error || !data) {
        toastService.error('Failed to load recommended jobs');
        return <Typography color="danger">Failed to load job applications</Typography>;
    }


    return (
        <>
            <Typography level='title-md' marginBottom={2}> Applied Jobs: {data.count || 0} </Typography>
            <Sheet sx={{ background: 'transparent' }}>
                <StyledTable hoverRow>
                    <thead>
                        <tr>
                            <th style={{ width: '40%', borderRadius: '4px 0 0 4px' }}> Title </th>
                            <th style={{ width: '20%', textAlign: 'center' }}> Salary </th>
                            <th style={{ width: '20%', textAlign: 'center' }}> Location </th>
                            <th style={{ width: '20%', textAlign: 'center', borderRadius: '0 4px 4px 0' }}> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.jobs.map((job) => (
                                <tr key={job.id} className={job.isFeatured ? "featured-job" : ''}>
                                    <td>
                                        <Stack spacing={0.5}>
                                            <Stack direction='row' spacing={1} alignItems='center'>
                                                <Box
                                                    component="img"
                                                    src={job.logoURL}
                                                    alt={job.companyName}
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 'md',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <Box>
                                                    <Stack direction='row' spacing={0.5} alignItems='center'>
                                                        <Typography level="title-sm" overflow='hidden' textOverflow='ellipsis'>{job.title}</Typography>
                                                        {job.isFeatured && (<FeaturedChip />)}
                                                    </Stack>
                                                    <Typography level="body-xs" sx={{ display: 'flex', gap: 1, color: 'neutral.400' }}>
                                                        {job.companyName} • {' '}
                                                        {formatString(job.employmentType)}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Typography level="body-sm"> {job.salaryRange} </Typography>
                                    </td>
                                    <td style={{
                                        textAlign: 'center',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        <Typography startDecorator={<MapPin size={16} />} level="body-sm"> {job.location} </Typography>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {<Chip
                                            color='primary'
                                            variant="soft"
                                            size="sm"
                                            sx={{ textTransform: 'capitalize' }}
                                        >
                                            {job.status || 'pending'}
                                        </Chip>}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </StyledTable>
            </Sheet>
        </>
    )
}

export default AppliedJobs