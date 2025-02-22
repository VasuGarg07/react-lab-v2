import Typography from '@mui/joy/Typography';
import React, { useCallback } from 'react';
import { useApiClient } from '@/shared/useApiClient';
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider';
import JobsOverview from '@/apps/Jobscape/dashboard/JobsOverview';

const SavedJobs: React.FC = () => {
    const { applicantService, role } = useJobscape();

    const fetchSavedJobs = useCallback(() => {
        return applicantService!.fetchSavedJobs();
    }, [applicantService]);

    const { data, loading, error } = useApiClient(fetchSavedJobs, [], true);

    // Handle loading and error states
    if (loading) return <Typography>Loading job details...</Typography>;
    if (error || !data) return <Typography color="danger">Failed to load job details.</Typography>;

    return (
        <>
            <Typography level='title-md' sx={{ mb: 4 }}>
                Saved Jobs: {data.count || 0}
            </Typography>
            <JobsOverview jobs={data.jobs} role={role} />
        </>
    )
}

export default SavedJobs