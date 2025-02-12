import React from 'react'
import { useAuth } from '../../../auth/AuthProvider';
import { useJobscape } from '../JobscapeProvider';
import { useAlert } from '../../../shared/AlertProvider';
import { FormProvider, useForm } from 'react-hook-form';
import { IApplicant } from '../helpers/job.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicantFormSchema } from '../helpers/validationSchema';
import { defaultApplicant } from '../helpers/job.constants';
import FormHeader from '../forms/FormHeader';
import Container from '@mui/joy/Container';
import CompactFooter from '../components/CompactFooter';
import ApplicantForm from '../forms/ApplicantForm';
import { AxiosError } from 'axios';

const RegisterApplicant: React.FC = () => {
    const { user } = useAuth();
    const { profileService } = useJobscape();
    const { alert } = useAlert();

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
            alert("You are now registered as Applicant on Jobscape", 'success');
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