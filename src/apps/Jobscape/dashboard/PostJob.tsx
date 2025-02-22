import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '@mui/joy/Typography';
import { AxiosError } from 'axios';
import React, { useEffect, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useJobscape } from '../JobscapeProvider';
import JobForm from '../forms/JobForm';
import { defaultJob } from '../helpers/job.constants';
import { IJob } from '../helpers/job.types';
import { JobSchema } from '../helpers/validationSchema';
import { useApiClient } from '../../../shared/useApiClient';
import { JobDetailsResponse } from '../helpers/response.types';
import { toastService } from '../../../providers/toastr';

const PostJob: React.FC = () => {
    const navigate = useNavigate();
    const { profileId, employerService } = useJobscape();
    const { jobId } = useParams<{ jobId?: string }>();  // jobId may be undefined for /post-job

    // Prepare the fetch function to get job details only if jobId exists
    const fetchJobDetails = useCallback(async () => {
        if (!jobId) return null;  // No jobId means it's a new job, return null
        return await employerService!.fetchJobDetails(jobId);
    }, [employerService, jobId]);

    // Use the hook only when jobId is present
    const { data: jobData, loading, error } = useApiClient<JobDetailsResponse | null, [string]>(
        fetchJobDetails,
        jobId ? ([jobId] as [string]) : undefined,
        !!jobId  // Fetch only if jobId exists
    );

    // Form handling
    const methods = useForm<IJob>({
        resolver: zodResolver(JobSchema),
        defaultValues: defaultJob,  // Default values for new job
    });

    // When job data is fetched, update the form values
    useEffect(() => {
        if (jobData && jobData.job) {
            methods.reset(jobData.job);  // Populate form with fetched data for editing
        }
    }, [jobData, methods]);

    // Submit handler
    const onSubmit = async (data: IJob) => {
        try {
            if (jobId) {
                // Update existing job
                await employerService!.updateJob(jobId, {
                    ...data,
                    postedBy: profileId!
                });
                toastService.success("Job Updated Successfully");
            } else {
                // Create new job
                await employerService!.postNewJob({
                    ...data,
                    postedBy: profileId!
                });
                toastService.success("New Job Posted");
            }
            navigate('/jobscape/employer/jobs');
        } catch (error: any) {
            console.error(error);
            let errorMessage = "Something Went Wrong. Please try again later.";
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.error || errorMessage;
            }
            toastService.error(errorMessage);
        }
    };

    // Handle loading and error states
    if (loading) return <Typography>Loading job details...</Typography>;
    if (error) return <Typography color="danger">Failed to load job details.</Typography>;

    return (
        <>
            <Typography level='title-md' sx={{ mb: 3 }}>
                {jobId ? 'Edit Job' : 'Post New Job'}
            </Typography>
            <FormProvider {...methods}>
                <JobForm
                    onSubmit={onSubmit}
                    btnLabel={jobId ? "Update" : "Post"}
                />
            </FormProvider>
        </>
    );
};

export default PostJob;
