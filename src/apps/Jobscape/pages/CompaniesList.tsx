import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactPagination from 'react-responsive-pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CompactFooter from '../components/CompactFooter';
import { CompanyCard } from '../components/CompanyCard';
import JobNav from '../components/JobNav';
import { CompaniesCardListResponse } from '../helpers/response.types';
import { useJobscape } from '../JobscapeProvider';
import { toastService } from '../../../providers/toastr';

const ITEMS_PER_PAGE = 10;

const CompaniesList: React.FC = () => {
    const { role, applicantService } = useJobscape();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get URL params with defaults
    const currentPage = Number(searchParams.get('page')) || 1;
    const searchQuery = searchParams.get('search') || '';

    // Local states
    const [searchInput, setSearchInput] = useState(searchQuery);
    const [data, setData] = useState<CompaniesCardListResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    // Calculate total pages
    const totalPages = data ? Math.ceil(data.count / data.limit) : 0;

    // Fetch companies
    const fetchCompanies = async () => {
        if (!applicantService) return;

        setIsLoading(true);
        setError(false);
        try {
            const result = await applicantService.fetchAllCompanies(
                currentPage,
                ITEMS_PER_PAGE,
                searchQuery
            );

            if (result.success) {
                setData(result);
            } else {
                toastService.error('Failed to load companies');
                setError(true);
            }
        } catch (err) {
            toastService.error('Failed to load companies');
            setError(true);
            console.error('Error fetching companies:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data when page or search changes
    useEffect(() => {
        fetchCompanies();
    }, [currentPage, searchQuery]);

    // Update URL params
    const updateUrlParams = (page: number, search: string) => {
        const params = new URLSearchParams();
        if (page > 1) params.set('page', page.toString());
        if (search) params.set('search', search);
        setSearchParams(params);
    };

    // Handle search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateUrlParams(1, searchInput); // Reset to page 1 when searching
    };

    // Handle pagination
    const handlePageChange = (page: number) => {
        updateUrlParams(page, searchQuery);
        window.scrollTo(0, 0);
    };

    const handleCardClick = (id: string) => navigate(id);

    if (error) return (
        <Typography color="danger" sx={{ mt: 4, textAlign: 'center' }}>
            {error}
        </Typography>
    );

    return (
        <>
            <JobNav userType={role || 'none'} />
            <Container maxWidth="lg" sx={{
                my: 4,
                minHeight: 'calc(100dvh - 186px)',
            }}>
                {/* Header and Search */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 2,
                    mb: 4
                }}>
                    <Typography level="h3">
                        Find Employers
                    </Typography>

                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
                        <Input
                            placeholder="Search companies..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            sx={{ minWidth: 240, flex: 1 }}
                        />
                        <Button
                            type="submit"
                            variant="solid"
                            color="primary"
                            startDecorator={<Search size={20} />}
                            loading={isLoading}
                        >
                            Search
                        </Button>
                    </form>
                </Box>

                {/* Loading State */}
                {isLoading && !data && (
                    <Typography level="body-lg" sx={{ textAlign: 'center', my: 4 }}>
                        Loading companies...
                    </Typography>
                )}

                {/* Companies Grid */}
                {data?.companies && (
                    <>
                        <Grid
                            container
                            spacing={2}
                            sx={{ mb: 4 }}
                        >
                            {data.companies.map(company => (
                                <Grid key={company.id} xs={12} md={6}>
                                    <CompanyCard
                                        info={company}
                                        onClick={handleCardClick}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                my: 4
                            }}>
                                <ReactPagination
                                    total={totalPages}
                                    current={currentPage}
                                    onPageChange={handlePageChange}
                                    maxWidth={300}
                                />
                            </Box>
                        )}

                        {/* No Results */}
                        {data.companies.length === 0 && (
                            <Typography
                                level="body-lg"
                                sx={{ textAlign: 'center', my: 4 }}
                            >
                                No companies found{searchQuery ? ` for "${searchQuery}"` : ''}.
                            </Typography>
                        )}
                    </>
                )}
            </Container>
            <CompactFooter />
        </>
    );
};

export default CompaniesList;