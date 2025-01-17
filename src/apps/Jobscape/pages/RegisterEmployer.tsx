import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from '@mui/joy';
import React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from '../../../auth/AuthProvider';
import Footer from '../components/Footer';
import EmployerForm from '../forms/EmployerForm';
import FormHeader from '../forms/FormHeader';
import { DefaultEmployer } from '../helpers/job.constants';
import { IEmployer } from '../helpers/job.types';
import { employerFormSchema } from "../helpers/validationSchema";
import { useJobscape } from '../JobscapeProvider';
import { useAlert } from "../../../shared/AlertProvider";


const RegisterEmployer: React.FC = () => {
    const { user } = useAuth();
    const { profileService } = useJobscape();
    const { alert } = useAlert();

    const methods = useForm<IEmployer>({
        resolver: zodResolver(employerFormSchema),
        defaultValues: DefaultEmployer
    });

    const onSubmit = async (data: IEmployer) => {
        try {
            await profileService.registerAsEmployer({
                ...data,
                userId: user!.id,
            });
            alert("You are now registered as Employer on Jobscape", 'success');
        } catch (error: any) {
            console.error('Error registering employer:', error);
            alert("Something Went Wrong", 'danger');
        }
    };

    return (
        <>
            <FormHeader title="Register as Employer" />
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <FormProvider {...methods}>
                    <EmployerForm
                        defaultValues={DefaultEmployer}
                        onSubmit={onSubmit}
                        btnLabel="Register"
                    />
                </FormProvider>
            </Container>
            <Footer compact />
        </>
    );
};

export default RegisterEmployer;