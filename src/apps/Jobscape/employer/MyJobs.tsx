import Typography from '@mui/joy/Typography';
import React, { useCallback } from 'react';
import { useApiClient } from '../../../shared/useApiClient';
import { useJobscape } from '../JobscapeProvider';
import JobsOverview from './JobsOverview';

const MyJobs: React.FC = () => {
    const { employerService } = useJobscape();

    const fetchAllJobs = useCallback(() => {
        return employerService!.fetchAllJobs();
    }, [employerService]);

    const { data, loading, error } = useApiClient(fetchAllJobs, [], true);

    return (
        <>
            <Typography level='title-md' sx={{ mb: 4 }}>
                Jobs posted: {data?.count || 0}
            </Typography>

            <JobsOverview jobs={data?.jobs || []} />
        </>
    )
}

export default MyJobs