import React from 'react'
import { useJobscape } from '../JobscapeProvider'
import { useAuth } from '../../../auth/AuthProvider';
import { useAlert } from '../../../shared/AlertProvider';
import { EmployerResponse, IEmployer } from '../helpers/job.types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employerFormSchema } from '../helpers/validationSchema';
import { AxiosError } from 'axios';
import Typography from '@mui/joy/Typography';
import EmployerForm from '../forms/EmployerForm';

const Profile: React.FC = () => {
    const { profile, profileService, updateProfile } = useJobscape();
    const { alert } = useAlert();

    const employer = profile as EmployerResponse;

    const methods = useForm<IEmployer>({
        resolver: zodResolver(employerFormSchema),
        defaultValues: employer
    });

    const onSubmit = async (data: IEmployer) => {
        try {
            const response = await profileService.updateUserProfile(data, "employer");
            updateProfile(response.profile)
            alert("Profile Updated", 'success');
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

export default Profile