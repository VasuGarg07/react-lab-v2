import { Container } from '@mui/joy';
import React, { useState } from 'react';
import { useAuth } from '../../../auth/AuthProvider';
import Footer from '../components/Footer';
import EmployerForm from '../forms/EmployerForm';
import FormHeader from '../forms/FormHeader';
import { DefaultEmployer } from '../helpers/job.constants';
import { IEmployer } from '../helpers/job.types';
import { useJobscape } from '../JobscapeProvider';

const RegisterEmployer: React.FC = () => {
    const [employer, setEmployer] = useState<IEmployer>(DefaultEmployer);
    const { user } = useAuth();
    const { profileService } = useJobscape();

    const handleSubmit = async () => {
        console.log(employer)
        try {
            employer.userId = user!.id;
            await profileService.registerAsEmployer(employer);
            // Add success handling here if needed
        } catch (error) {
            console.error('Error registering employer:', error);
            // Add error handling here if needed
        }
    };

    return (
        <>
            <FormHeader title="Register as Employer" />
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <EmployerForm
                    data={employer}
                    setData={setEmployer}
                    btnLabel="Register"
                    handleSubmit={handleSubmit}
                />
            </Container>
            <Footer compact />
        </>
    );
};

export default RegisterEmployer;