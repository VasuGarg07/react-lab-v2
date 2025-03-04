import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from '@mui/joy';
import { AxiosError } from "axios";
import React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from '@/auth/AuthProvider';
import EmployerForm from '@/apps/Jobscape/forms/EmployerForm';
import CompactFooter from "@/apps/Jobscape/components/CompactFooter";
import FormHeader from '@/apps/Jobscape/forms/FormHeader';
import { defaultEmployer } from '@/apps/Jobscape/helpers/job.constants';
import { IEmployer } from '@/apps/Jobscape/helpers/job.types';
import { employerFormSchema } from "@/apps/Jobscape/helpers/validationSchema";
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider';
import { toastService } from "@/shared/toastr";


const RegisterEmployer: React.FC = () => {
    const { user } = useAuth();
    const { profileService } = useJobscape();
    const navigate = useNavigate();

    const methods = useForm<IEmployer>({
        resolver: zodResolver(employerFormSchema),
        defaultValues: defaultEmployer
    });

    const onSubmit = async (data: IEmployer) => {
        try {
            await profileService.registerAsEmployer({
                ...data,
                userId: user!.id,
            });
            toastService.success("You are now registered as Employer on Jobscape");
            navigate('/jobscape');
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
            <FormHeader title="Register as Employer" />
            <Container maxWidth="lg" sx={{
                my: 4,
                minHeight: 'calc(100dvh - 186px)',
            }}>
                <FormProvider {...methods}>
                    <EmployerForm
                        onSubmit={onSubmit}
                        btnLabel="Register"
                    />
                </FormProvider>
            </Container>
            <CompactFooter />
        </>
    );
};

export default RegisterEmployer;