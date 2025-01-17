import React from 'react'
import { useAuth } from '../../../auth/AuthProvider';
import { useJobscape } from '../JobscapeProvider';
import { useAlert } from '../../../shared/AlertProvider';
import { FormProvider, useForm } from 'react-hook-form';
import { IApplicant } from '../helpers/job.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicantSchema } from '../helpers/validationSchema';
import { defaultApplicant } from '../helpers/job.constants';
import FormHeader from '../forms/FormHeader';
import Container from '@mui/joy/Container';
import FormFooter from '../forms/FormFooter';
import ApplicantForm from '../forms/ApplicantForm';

const RegisterApplicant: React.FC = () => {
    const { user } = useAuth();
    const { profileService } = useJobscape();
    const { alert } = useAlert();

    const methods = useForm<IApplicant>({
        resolver: zodResolver(applicantSchema),
        defaultValues: defaultApplicant
    });

    const onSubmit = async (data: IApplicant) => {
        try {
            await profileService.registerAsApplicant({
                ...data,
                userId: user!.id,
            });
            alert("You are now registered as Applicant on Jobscape", 'success');
        } catch (error: any) {
            console.error('Error registering employer:', error);
            alert("Something Went Wrong", 'danger');
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
            <FormFooter />
        </>
    )
}

export default RegisterApplicant