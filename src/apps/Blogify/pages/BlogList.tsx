import { Box, CircularProgress } from '@mui/joy';
import { useLoaderData, useSearchParams, useNavigation } from 'react-router';
import BlogGallery from '@/apps/Blogify/components/BlogGallery';
import { BlogListResponse } from '@/apps/Blogify/helpers/blog.constants';

const BlogListPage = () => {
    const response = useLoaderData() as BlogListResponse;
    const [_, setPage] = useSearchParams();
    const navigation = useNavigation();

    const handlePageChange = (page: number) => {
        setPage(prev => {
            prev.set('page', page.toString());
            return prev;
        });
    };

    if (navigation.state === 'loading') {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <BlogGallery
                blogListResponse={response}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default BlogListPage;