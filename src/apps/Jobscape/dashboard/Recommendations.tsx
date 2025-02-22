import React, { useCallback } from 'react'
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider'
import { JobsCardListResponse } from '@/apps/Jobscape/helpers/response.types';
import { useApiClient } from '@/shared/useApiClient';
import { useNavigate } from 'react-router';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import { JobCard } from '@/apps/Jobscape/components/JobCard';
import { toastService } from '@/providers/toastr';

const Recommendations: React.FC = () => {

    const { applicantService } = useJobscape();
    const navigate = useNavigate();

    if (!applicantService) return;

    const fetchRecommendations = useCallback(() => {
        return applicantService.fetchRecommendedJobs();
    }, [applicantService]);

    const { data, loading, error } = useApiClient<JobsCardListResponse, []>(fetchRecommendations, [], true)

    const handleCardClick = (id: string) => navigate(id);


    if (loading && !data) {
        return <Typography level="body-lg" sx={{ textAlign: 'center', my: 4 }}>
            Loading companies...
        </Typography>;
    }

    if (error || !data) {
        toastService.error('Failed to load recommended jobs');
        return <Typography color="danger">Failed to load job details</Typography>;
    }

    const { jobs, count } = data;

    return (
        <>
            <Typography level='title-md'> Recommended Jobs: {count || 0} </Typography>
            <Grid
                container
                spacing={2}
                sx={{ my: 4 }}
            >
                {jobs.map(job => (
                    <Grid key={job.id} xs={12} md={6}>
                        <JobCard
                            info={job}
                            onClick={handleCardClick}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Recommendations