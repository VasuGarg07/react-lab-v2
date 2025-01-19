import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from '@mui/joy';
import { AxiosError } from "axios";
import React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../auth/AuthProvider';
import { useAlert } from "../../../shared/AlertProvider";
import EmployerForm from '../forms/EmployerForm';
import CompactFooter from "../components/CompactFooter";
import FormHeader from '../forms/FormHeader';
import { defaultEmployer } from '../helpers/job.constants';
import { IEmployer } from '../helpers/job.types';
import { employerFormSchema } from "../helpers/validationSchema";
import { useJobscape } from '../JobscapeProvider';


const RegisterEmployer: React.FC = () => {
    const { user } = useAuth();
    const { profileService } = useJobscape();
    const { alert } = useAlert();
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
            alert("You are now registered as Employer on Jobscape", 'success');
            navigate('/jobscape');
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
            <FormHeader title="Register as Employer" />
            <Container maxWidth="lg" sx={{ my: 4 }}>
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