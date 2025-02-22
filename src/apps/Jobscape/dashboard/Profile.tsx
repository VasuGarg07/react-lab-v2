import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '@mui/joy/Typography';
import { AxiosError } from 'axios';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import EmployerForm from '../forms/EmployerForm';
import { ApplicantResponse, EmployerResponse, IApplicant, IEmployer } from '../helpers/job.types';
import { applicantFormSchema, employerFormSchema } from '../helpers/validationSchema';
import { useJobscape } from '../JobscapeProvider';
import ApplicantForm from '../forms/ApplicantForm';
import { toastService } from '../../../providers/toastr';

const EmployerProfile: React.FC = () => {
    const { profile, profileService, updateProfile } = useJobscape();

    const employer = profile as EmployerResponse;

    const methods = useForm<IEmployer>({
        resolver: zodResolver(employerFormSchema),
        defaultValues: employer
    });

    const onSubmit = async (data: IEmployer) => {
        try {
            const response = await profileService.updateUserProfile(data, "employer");
            updateProfile(response.profile)
            toastService.success("Profile Updated");
        } catch (error: any) {
            console.error(error);
            let errorMessage = "Something Went Wrong. Please try again later."
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.error;
            }
            toastService.error(errorMessage);
        }
    };

    return (
        <>
            <Typography level='title-md' sx={{ mb: 3 }}>Update Profile</Typography>
            <FormProvider {...methods}>
                <EmployerForm
                    onSubmit={onSubmit}
                    btnLabel="Update"
                />
            </FormProvider>
        </>
    )
}

const ApplicantProfile: React.FC = () => {
    const { profile, profileService, updateProfile } = useJobscape();

    const applicant = profile as ApplicantResponse;

    const methods = useForm<IApplicant>({
        resolver: zodResolver(applicantFormSchema),
        defaultValues: applicant
    });

    const onSubmit = async (data: IApplicant) => {
        try {
            const response = await profileService.updateUserProfile(data, "applicant");
            updateProfile(response.profile)
            toastService.success("Profile Updated");
        } catch (error: any) {
            console.error(error);
            let errorMessage = "Something Went Wrong. Please try again later."
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.error;
            }
            toastService.error(errorMessage);
        }
    };

    return (
        <>
            <Typography level='title-md' sx={{ mb: 3 }}>Update Profile</Typography>
            <FormProvider {...methods}>
                <ApplicantForm
                    onSubmit={onSubmit}
                    btnLabel="Update"
                />
            </FormProvider>
        </>
    )
}

export { ApplicantProfile, EmployerProfile }