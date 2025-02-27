import React from 'react'
import { useAuth } from '@/auth/AuthProvider';
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider';
import { FormProvider, useForm } from 'react-hook-form';
import { IApplicant } from '@/apps/Jobscape/helpers/job.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicantFormSchema } from '@/apps/Jobscape/helpers/validationSchema';
import { defaultApplicant } from '@/apps/Jobscape/helpers/job.constants';
import FormHeader from '@/apps/Jobscape/forms/FormHeader';
import Container from '@mui/joy/Container';
import CompactFooter from '@/apps/Jobscape/components/CompactFooter';
import ApplicantForm from '@/apps/Jobscape/forms/ApplicantForm';
import { AxiosError } from 'axios';
import { toastService } from '@/shared/toastr';

const RegisterApplicant: React.FC = () => {
    const { user } = useAuth();
    const { profileService } = useJobscape();

    const methods = useForm<IApplicant>({
        resolver: zodResolver(applicantFormSchema),
        defaultValues: defaultApplicant
    });

    const onSubmit = async (data: IApplicant) => {
        console.log("yes", data)
        try {
            await profileService.registerAsApplicant({
                ...data,
                userId: user!.id,
            });
            toastService.success("You are now registered as Candidate on Jobscape");
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
            <FormHeader title="Register as Applicant" />
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <FormProvider {...methods}>
                    <ApplicantForm
                        onSubmit={onSubmit}
                        btnLabel="Register"
                    />
                </FormProvider>
            </Container>
            <CompactFooter />
        </>
    )
}

export default RegisterApplicant