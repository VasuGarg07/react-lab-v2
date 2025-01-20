import Typography from '@mui/joy/Typography'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAlert } from '../../../shared/AlertProvider';
import { useJobscape } from '../JobscapeProvider';
import { IJob } from '../helpers/job.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultJob } from '../helpers/job.constants';
import JobForm from '../forms/JobForm';
import { AxiosError } from 'axios';
import { JobSchema } from '../helpers/validationSchema';

const PostJob: React.FC = () => {
    const { alert } = useAlert();
    const { profileId, employerService } = useJobscape();

    const methods = useForm<IJob>({
        resolver: zodResolver(JobSchema),
        defaultValues: defaultJob
    });

    const onSubmit = async (data: IJob) => {
        try {
            await employerService!.postNewJob({
                ...data, postedBy: profileId!
            });
            alert("New Job Posted", 'success');
        } catch (error: any) {
            console.error(error);
            let errorMessage = "Something Went Wrong. Please try again later."
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.error;
            }
            alert(errorMessage, 'danger');
        }
    };

    return (
        <>
            <Typography level='title-md' sx={{ mb: 3 }}>Post New Job</Typography>
            <FormProvider {...methods}>
                <JobForm
                    onSubmit={onSubmit}
                    btnLabel="Post"
                />
            </FormProvider>
        </>
    )
}

export default PostJob