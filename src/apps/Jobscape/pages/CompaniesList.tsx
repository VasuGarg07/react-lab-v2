import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiClient } from '../../../shared/useApiClient';
import CompactFooter from '../components/CompactFooter';
import { CompanyCard } from '../components/CompanyCard';
import JobNav from '../components/JobNav';
import { useJobscape } from '../JobscapeProvider';

const CompaniesList: React.FC = () => {
    const { role, applicantService } = useJobscape();
    const navigate = useNavigate();

    const fetchCompanies = useCallback(() => {
        return applicantService!.fetchAllCompanies();
    }, [applicantService]);

    const { data, loading, error } = useApiClient(fetchCompanies, [], true);

    // Handle loading and error states
    if (loading) return <Typography>Loading companies list...</Typography>;
    if (error) return <Typography color="danger">Failed to load job details.</Typography>;


    const handleCardClick = (id: string) => navigate(id);

    return (
        <>
            <JobNav userType={role!} />
            <Container maxWidth="lg" sx={{
                my: 4,
                minHeight: 'calc(100dvh - 186px)',
            }}>
                <Typography level="h3" sx={{ mb: 2 }}>
                    Find Employers
                </Typography>

                {data?.companies.map(company => (
                    <CompanyCard key={company.id} info={company} onClick={handleCardClick} />
                ))}
            </Container>
            <CompactFooter />
        </>
    )
}

export default CompaniesList;